import express, { Express, Request, Response, NextFunction } from "express"
import * as dotenv from "dotenv"
import bodyParser from "body-parser"
import ioc from "./ioc"
import {
  ApiKeyValidator,
  RequestIdGenerator,
} from "./middleware"

dotenv.config()

const app: Express = express()
const port: number = parseInt(process.env.API_PORT || "3000", 10)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(RequestIdGenerator())
app.use(ApiKeyValidator())

app.post('/api/v1/convert', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await ioc.htmlToPdfService.convert(req.body)
    return res.json(response)
  } catch (error) {
    return next(error)
  }
})

app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.log(error)
  return res.status(500).send(error)
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
