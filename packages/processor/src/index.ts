import { getIoC, IoC } from "./ioc"
import { AlcheMyPdfRequest, DefaultHTTPResponse } from "@alchemypdf.proc/contracts"
import { AxiosResponse } from "axios"
import { getConfig } from "./config"

const runProcessor = async (ioc: IoC): Promise<void> => {
  let payload: AlcheMyPdfRequest | undefined

  try {
    console.log("[alchemypdf.proc]: starting")

    console.log("[alchemypdf.proc]: getting pending request")
    const getPendingRequest: AxiosResponse<unknown> = await ioc.alcheMyPdfAPI.getPending()
    if (getPendingRequest.status !== 200)
      throw new Error((getPendingRequest.data as DefaultHTTPResponse).message)

    payload = getPendingRequest.data as AlcheMyPdfRequest

    console.log("[alchemypdf.proc]: converting HTML to PDF")
    const convertHtml = await ioc.htmlToPdfService.convert({ htmlText: payload.content })

    console.log("[alchemypdf.proc]: executing callback")

    const callbackUrl = ioc.config.overrideCallback()
      ? ioc.config.callbackUrl()
      : payload.callbackUrl

    const _callback = await ioc.alcheMyPdfAPI.callback(callbackUrl, {
      pdfString: convertHtml.htmlBase64,
      success: true
    })
    if (_callback.status !== 200)
      throw new Error((_callback.data as DefaultHTTPResponse).message)

    console.log("[alchemypdf.proc]: executing completing request")
    const _complete = await ioc.alcheMyPdfAPI.complete({ requestId: payload?.requestId || 0, success: true })
    if (_complete.status !== 200)
      throw new Error((_complete.data as DefaultHTTPResponse).message)
  } catch (error: unknown) {
    console.log("[alchemypdf.proc]: an error occurred", error as Error)
    if (payload)
      await ioc.alcheMyPdfAPI.complete({ requestId: payload?.requestId || 0, success: false })
  }

  setTimeout(async () => await runProcessor(ioc), 15000)
}

(async () => {
  const ioc = await getIoC(getConfig())
  await runProcessor(ioc)
})()
