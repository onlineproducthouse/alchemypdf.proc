import { getIoC, IoC } from "./ioc"
import { _config } from "./config"
import { AxiosResponse } from "axios"
import { DefaultHTTPResponse, OphHtmlToPdfPullResponse } from "./contracts"

const runProcessor = async (ioc: IoC): Promise<void> => {
  let payload: OphHtmlToPdfPullResponse | undefined

  try {
    const healthCheck = await ioc.ophApi.healthCheck()
    if (healthCheck.status !== 200)
      throw new Error("oph api unavailable")

    const newRequest: AxiosResponse<unknown> = await ioc.ophApi.pull()
    if (newRequest.status !== 200)
      throw new Error((newRequest.data as DefaultHTTPResponse).message)

    payload = newRequest.data as OphHtmlToPdfPullResponse

    const convertHtml = await ioc.htmlToPdfService.convert({
      htmlText: payload.htmlString,
    })

    const completeRequest = await ioc.ophApi.complete({
      success: true,
      htmlToPdfRequestId: payload.htmlToPdfRequestId,
      htmlToPdfRequestActionKey: payload.htmlToPdfRequestActionKey,
      htmlToPdfRequestPayload: payload.htmlToPdfRequestPayload,
      pdfString: convertHtml.htmlBase64,
    })
    if (completeRequest.status !== 200)
      throw new Error(completeRequest.data.message)

    console.log("request processed successfully")
  } catch (error) {
    if (payload)
      await ioc.ophApi.complete({
        success: false,
        htmlToPdfRequestId: payload.htmlToPdfRequestId,
        htmlToPdfRequestActionKey: payload.htmlToPdfRequestActionKey,
        htmlToPdfRequestPayload: payload.htmlToPdfRequestPayload,
        pdfString: "",
      })
  }

  console.log("cooling off")
  setTimeout(() => { runProcessor(ioc) }, 60000)
}

(async () => {
  const ioc = await getIoC(_config())
  await runProcessor(ioc)
})()
