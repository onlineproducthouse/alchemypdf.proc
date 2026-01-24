import {
  RequestCreateRequest,
  RequestGetResponse,
  RequestCompleteRequest,
  DefaultHTTPResponse,
} from "@alchemypdf.proc/contracts"
import { AxiosResponse } from "axios"

export interface IRequestAPI {
  create(request: RequestCreateRequest): Promise<AxiosResponse<DefaultHTTPResponse>>
  complete(request: RequestCompleteRequest): Promise<AxiosResponse<DefaultHTTPResponse>>
  getPending(): Promise<AxiosResponse<RequestGetResponse>>
  getByClientReference(clientReference: string): Promise<AxiosResponse<RequestGetResponse[]>>
  getWithContentByClientReference(clientReference: string): Promise<AxiosResponse<RequestGetResponse[]>>
}