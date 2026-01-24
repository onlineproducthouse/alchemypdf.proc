import { HtmlToPdfRequest, HtmlToPdfResponse } from "@alchemypdf.proc/contracts";

export default interface IHtmlToPdf {
  convert: (payload: HtmlToPdfRequest) => Promise<HtmlToPdfResponse>
}
