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
const port: number = parseInt(process.env.PORT || "3000", 10)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(RequestIdGenerator())
app.use(ApiKeyValidator())

app.post('/api/v1/convert', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await ioc.htmlToPdfService.convert(req.body)
    res.json(response)
  } catch (error) {
    next(error)
  }
})

app.use((error: Error, req: Request, res: Response, _next: NextFunction) => {
  console.log(error)
  res.json(req.body)
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
