import express, { Express, Request, Response, NextFunction } from "express"
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
app.use(ApiKeyValidator(__config))

app.get('/HealthCheck/Ping', async (_: Request, res: Response) => {
  return res.status(200)
})

app.post('/api/v1/convert', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await ioc.htmlToPdfService.convert(req.body)
    return res.json(response)
  } catch (error) {
    return next(error)
  }
})

app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
  return res.status(500).send({
    statusCode: 500,
    message: error.message
  })
})

app.listen(__config.port, () => {
  console.log(`[server]: Server is running at http://localhost:${__config.port}`)
})
