import express, { Express } from "express"
import bodyParser from "body-parser"
import ioc from "./ioc"
import {
  ApiKeyValidator,
  RequestIdGenerator,
} from "./middleware"
import { _config } from "./config"
import cors from "cors"

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

app.use(ApiKeyValidator(__config))

app.post('/api/v1/convert', async (req: any, res: any, next: any) => {
  console.log('/api/v1/convert')
  try {
    const response = await ioc.htmlToPdfService.convert(req.body)
    return res.json(response)
  } catch (error) {
    return next(error)
  }
})

app.use((error: Error, _req: any, res: any, _next: any) => {
  console.log(error)
  return res.status(500).send({
  statusCode: 500,
  message: error.message
  })
})

app.listen(__config.port, () => console.log(`[server]: HTML 2 PDF Converter is running at: ${__config.protocol}://${__config.host}:${__config.port}`))
