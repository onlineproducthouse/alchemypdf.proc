import * as dotenv from "dotenv"

dotenv.config()

export type Config = {
  protocol: string
  host: string
  port: number
  apiKeyList: string[]

  ophApiProtocol: string
  ophApiHost: string
  ophApiPort: number
  ophApiApiKey: string
}

export const _config = (): Config => ({
  protocol: process.env.HTMLTOPDF_PROTOCOL || "http",
  host: process.env.HTMLTOPDF_HOST || "localhost",
  port: parseInt(process.env.HTMLTOPDF_PORT || "7891", 10),
  apiKeyList: (process.env.HTMLTOPDF_KEYS || "").split(",").filter(key => !!key),

  ophApiProtocol: process.env.API_PROTOCOL || "http",
  ophApiHost: process.env.API_HOST || "localhost",
  ophApiPort: parseInt(process.env.API_PORT || "7890", 10),
  ophApiApiKey: (process.env.API_KEYS || "").split(",").filter(key => !!key)[0],
})