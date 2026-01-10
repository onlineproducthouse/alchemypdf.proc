import * as dotenv from "dotenv"

dotenv.config()

export type Config = {
  protocol: string
  host: string
  port: number
  apiKey: string
}

export const _config = (): Config => ({
  protocol: process.env.ALCHEMYPDFAPI_PROTOCOL || "http",
  host: process.env.ALCHEMYPDFAPI_HOST || "localhost",
  port: parseInt(process.env.ALCHEMYPDFAPI_PORT || "7891", 10),
  apiKey: (process.env.ALCHEMYPDFAPI_KEYS || "").split(",").filter(key => !!key)[0],
})