import { AxiosResponse } from 'axios'
import { HTTPRequest } from '../utilities'
import { } from '../interface'
import {
  DefaultHTTPResponse,
  CallbackRequest,
  CompleteRequest,
} from "../contracts"
import { Config } from '../config'
import IAlcheMyPdfApi from '../interface'

const getHTTPRequestHeaders = (cfg: Config) => ({
  'x-api-key': cfg.apiKey,
  'content-type': "application/json",
})

const getUrl = (cfg: Config) => `${cfg.protocol}://${cfg.host}:${cfg.port}`

const AlcheMyPdfApi = (cfg: Config): IAlcheMyPdfApi => {
  const url = getUrl(cfg)

  const getPending = async (): Promise<AxiosResponse<DefaultHTTPResponse>> => {
    try {
      return await HTTPRequest<undefined, DefaultHTTPResponse>({
        method: 'GET',
        url: url + "/api/v1/Request/GetPending",
        headers: getHTTPRequestHeaders(cfg),
        data: undefined,
      })
    } catch (error) {
      throw error
    }
  }

  const callback = async (url: string, data: CallbackRequest): Promise<AxiosResponse<DefaultHTTPResponse>> => {
    try {
      return await HTTPRequest<CallbackRequest, DefaultHTTPResponse>({
        method: 'POST',
        url,
        headers: getHTTPRequestHeaders(cfg),
        data,
      })
    } catch (error) {
      throw error
    }
  }

  const complete = async (data: CompleteRequest): Promise<AxiosResponse<DefaultHTTPResponse>> => {
    try {
      return await HTTPRequest<CompleteRequest, DefaultHTTPResponse>({
        method: 'POST',
        url: url + "/api/v1/Request/Complete",
        headers: getHTTPRequestHeaders(cfg),
        data,
      })
    } catch (error) {
      throw error
    }
  }

  return {
    getPending,
    callback,
    complete,
  }
}

export default AlcheMyPdfApi
