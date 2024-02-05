import { PuppeteerToPdfRequest, PuppeteerToPdfResponse } from "../contracts";

export default interface IPuppeteerUtil {
  convertHtmlToPdf: (payload: PuppeteerToPdfRequest) => Promise<PuppeteerToPdfResponse>
}