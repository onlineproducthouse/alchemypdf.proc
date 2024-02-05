import { IHtmlToPdf } from "./interface";
import { HtmlToPdf, PuppeteerUtil } from "./implementation";

type IoC = {
  htmlToPdfService: IHtmlToPdf
}

const htmlToPdfService = HtmlToPdf({
  puppeteerUtil: PuppeteerUtil()
})

const getIoC = (): IoC => {
  return {
    htmlToPdfService,
  }
}

export default getIoC()