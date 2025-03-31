import { AxiosResponse } from "axios"
import {
  DefaultHTTPResponse,
  OphHtmlToPdfCompleteRequest,
  OphHtmlToPdfPullResponse,
} from "../contracts"

export default interface IOphHtmlToPdfApi {
  healthCheck: () => Promise<AxiosResponse<DefaultHTTPResponse>>
  pull: () => Promise<AxiosResponse<OphHtmlToPdfPullResponse>>
  complete: (payload: OphHtmlToPdfCompleteRequest) => Promise<AxiosResponse<DefaultHTTPResponse>>
}
