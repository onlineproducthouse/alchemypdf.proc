import { AxiosResponse } from "axios"
import {
  DefaultHTTPResponse,
  AlcheMyPdfRequest,
  CallbackRequest,
  CompleteRequest,
} from "../contracts"

export default interface IAlcheMyPdfApi {
  getPending: () => Promise<AxiosResponse<AlcheMyPdfRequest>>
  callback: (url: string, payload: CallbackRequest) => Promise<AxiosResponse<DefaultHTTPResponse>>
  complete: (payload: CompleteRequest) => Promise<AxiosResponse<DefaultHTTPResponse>>
}
