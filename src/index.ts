import { getIoC, IoC } from "./ioc"
import { _config } from "./config"
import { AlcheMyPdfRequest, DefaultHTTPResponse } from "./contracts"
import { AxiosResponse } from "axios"

const runProcessor = async (ioc: IoC): Promise<void> => {
  let payload: AlcheMyPdfRequest | undefined

  try {
    const getPendingRequest: AxiosResponse<unknown> = await ioc.alcheMyPdfApi.getPending()
    if (getPendingRequest.status !== 200)
      throw new Error((getPendingRequest.data as DefaultHTTPResponse).message)

    payload = getPendingRequest.data as AlcheMyPdfRequest

    const convertHtml = await ioc.htmlToPdfService.convert({ htmlText: payload.content })
    const _callback = await ioc.alcheMyPdfApi.callback(payload.callbackUrl, {
      pdfString: convertHtml.htmlBase64,
      success: true
    })
    if (_callback.status !== 200)
      throw new Error((_callback.data as DefaultHTTPResponse).message)

    const _complete = await ioc.alcheMyPdfApi.complete({ requestId: payload?.requestId || 0, success: true })
    if (_complete.status !== 200)
      throw new Error((_complete.data as DefaultHTTPResponse).message)
  } catch (error: unknown) {
    if (payload)
      await ioc.alcheMyPdfApi.complete({ requestId: payload?.requestId || 0, success: false })
  }

  setTimeout(async () => await runProcessor(ioc), 15000)
}

(async () => {
  const ioc = await getIoC(_config())
  await runProcessor(ioc)
})()
