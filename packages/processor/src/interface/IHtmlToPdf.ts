import { HtmlToPdfRequest, HtmlToPdfResponse } from "../contracts";

export default interface IHtmlToPdf {
  convert: (payload: HtmlToPdfRequest) => Promise<HtmlToPdfResponse>
}
