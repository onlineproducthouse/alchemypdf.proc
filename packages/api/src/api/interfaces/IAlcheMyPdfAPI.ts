import {
  AlcheMyPdfCreateRequest,
  AlcheMyPdfRequest,
  AlcheMyPdfCompleteRequest,
  DefaultHTTPResponse,
  AlcheMyPdfCallbackRequest,
} from "@alchemypdf.proc/contracts"
import { AxiosResponse } from "axios"

export interface IAlcheMyPdfAPI {
  create(request: AlcheMyPdfCreateRequest): Promise<AxiosResponse<DefaultHTTPResponse>>
  complete(request: AlcheMyPdfCompleteRequest): Promise<AxiosResponse<DefaultHTTPResponse>>
  getPending(): Promise<AxiosResponse<AlcheMyPdfRequest>>
  getByClientReference(clientReference: string): Promise<AxiosResponse<AlcheMyPdfRequest[]>>
  getWithContentByClientReference(clientReference: string): Promise<AxiosResponse<AlcheMyPdfRequest[]>>
  callback(url: string, request: AlcheMyPdfCallbackRequest): Promise<AxiosResponse<DefaultHTTPResponse>>
}