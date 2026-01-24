import { PuppeteerToPdfRequest, PuppeteerToPdfResponse } from "@alchemypdf.proc/contracts";

export default interface IPuppeteerUtil {
  convertHtmlToPdf: (payload: PuppeteerToPdfRequest) => Promise<PuppeteerToPdfResponse>
}