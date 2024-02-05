import * as dotenv from "dotenv"

dotenv.config()

export type Config = {
  port: number
  apiKeyList: string[]
}

export const _config = (): Config => ({
  port: parseInt(process.env.HTML_TO_PDF_CONVERTER_API_PORT || "3000", 10),
  apiKeyList: (process.env.HTML_TO_PDF_CONVERTER_API_KEY_LIST || "").split(";"),
})