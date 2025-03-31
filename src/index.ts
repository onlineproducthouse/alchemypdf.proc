import express, { Express } from "express"
import bodyParser from "body-parser"
import { getIoC, IoC } from "./ioc"
import {
  RequestIdGenerator,
} from "./middleware"
import { _config } from "./config"
import cors from "cors"
import { AxiosResponse } from "axios"
import { DefaultHTTPResponse, OphHtmlToPdfPullResponse } from "./contracts"

const __config = _config()
const app: Express = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(RequestIdGenerator())

app.get('/api/HealthCheck/Ping', async (_: any, res: any) => res.status(200).send({
  statusCode: 200,
  message: "Ok"
}))

app.use((error: Error, _req: any, res: any, _next: any) => res.status(500).send({
  statusCode: 500,
  message: error.message
}))

app.listen(__config.port, async () => {
  console.log(`[server]: HTML 2 PDF Converter is running at: ${__config.protocol}://${__config.host}:${__config.port}`)

  const ioc = await getIoC(__config)
  await runProcessor(ioc)
})

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
    console.log((error as Error).message)
    // console.log(error)

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
