import { IHtmlToPdf } from "./interface";
import { HtmlToPdf, PuppeteerUtil } from "./implementation";

type IoC = {
  htmlToPdfService: IHtmlToPdf
}

const getIoC = (): IoC => ({
  htmlToPdfService: HtmlToPdf({
    puppeteerUtil: PuppeteerUtil()
  }),
})

export default getIoC()