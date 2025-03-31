import { AxiosResponse } from 'axios'
import { HTTPRequest } from '../utilities'
import { } from '../interface'
import {
  DefaultHTTPResponse,
  OphHtmlToPdfCompleteRequest,
  OphHtmlToPdfPullResponse,
} from "../contracts"
import { Config } from '../config'
import IOphHtmlToPdfApi from '../interface/IOphHtmlToPdfApi'

const getHTTPRequestHeaders = (cfg: Config) => ({
  'x-api-key': cfg.ophApiApiKey,
  'content-type': "application/json",
})

const getUrl = (cfg: Config) => {
  return `${cfg.ophApiProtocol}://${cfg.ophApiHost}:${cfg.ophApiPort}`
}

const OphHtmlToPdfApi = (cfg: Config): IOphHtmlToPdfApi => {
  const healthCheck = async (): Promise<AxiosResponse<DefaultHTTPResponse>> => {
    try {
      return await HTTPRequest<undefined, DefaultHTTPResponse>({
        method: 'GET',
        url: `${getUrl(cfg)}/api/HealthCheck/Ping`,
        headers: getHTTPRequestHeaders(cfg),
        data: undefined,
      })
    } catch (error) {
      throw error
    }
  }

  const pull = async (): Promise<AxiosResponse<OphHtmlToPdfPullResponse>> => {
    try {
      return await HTTPRequest<undefined, OphHtmlToPdfPullResponse>({
        method: 'GET',
        url: `${getUrl(cfg)}/api/v1/HtmlToPdfRequest/Pull`,
        headers: getHTTPRequestHeaders(cfg),
        data: undefined,
      })
    } catch (error) {
      throw error
    }
  }

  const complete = async (data: OphHtmlToPdfCompleteRequest): Promise<AxiosResponse<DefaultHTTPResponse>> => {
    try {
      return await HTTPRequest<OphHtmlToPdfCompleteRequest, DefaultHTTPResponse>({
        method: 'POST',
        url: `${getUrl(cfg)}/api/v1/HtmlToPdfRequest/Complete`,
        headers: getHTTPRequestHeaders(cfg),
        data,
      })
    } catch (error) {
      throw error
    }
  }

  return {
    healthCheck,
    pull,
    complete,
  }
}

export default OphHtmlToPdfApi
