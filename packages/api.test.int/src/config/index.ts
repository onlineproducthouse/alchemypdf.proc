import * as dotenv from "dotenv"
import path from "path"
import { config } from "@alchemypdf.proc/config"

dotenv.config({ path: path.join(path.dirname + "./.env") })

export const getConfig = () => config({
  apiKey: process.env.ALCHEMYPDF_PROC_API_KEY || '',
  apiProtocol: process.env.ALCHEMYPDF_API_PROTOCOL || "http",
  apiHost: process.env.ALCHEMYPDF_API_HOST || "127.0.0.1",
  apiPort: process.env.ALCHEMYPDF_API_PORT || '7891',
  apiBasePath: process.env.ALCHEMYPDF_API_BASEPATH || '/api/v1',
  overrideCallback: process.env.ALCHEMYPDF_OVERRIDE_CALLBACK === "true",
})