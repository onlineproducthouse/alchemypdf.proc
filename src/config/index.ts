import * as dotenv from "dotenv"

dotenv.config()

export type Config = {
  port: number
  apiKeyList: string[]
}

export const _config = (): Config => ({
  port: parseInt(process.env.HTMLTOPDF_PORT || "3000", 10),
  apiKeyList: (process.env.HTMLTOPDF_KEYS || "").split(",").filter(key => !!key),
})