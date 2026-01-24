import * as dotenv from "dotenv"

dotenv.config()

export type Config = {
  protocol: string
  host: string
  port: number
  apiKeyList: string[]
}

export const _config = (): Config => ({
  protocol: process.env.HTMLTOPDF_PROTOCOL || "http",
  host: process.env.HTMLTOPDF_HOST || "localhost",
  port: parseInt(process.env.HTMLTOPDF_PORT || "3000", 10),
  apiKeyList: (process.env.HTMLTOPDF_KEYS || "").split(",").filter(key => !!key),
})