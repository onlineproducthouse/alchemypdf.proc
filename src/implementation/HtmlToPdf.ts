import { HtmlToPdfRequest, HtmlToPdfResponse } from "../contracts";
import { IHtmlToPdf, IPuppeteerUtil } from "../interface";

type HtmlToPdfInitParams = {
  puppeteerUtil: IPuppeteerUtil
}

export default function HtmlToPdf({ puppeteerUtil }: HtmlToPdfInitParams): IHtmlToPdf {
  const convert = async ({ htmlText }: HtmlToPdfRequest): Promise<HtmlToPdfResponse> => {
    try {
      console.log("HtmlToPdf - convert - starting");
      const _pdf = await puppeteerUtil.convertHtmlToPdf({ htmlText })
      console.log("HtmlToPdf - convert - done");
      return { htmlBase64: _pdf.base64 }
    } catch (error) {
      throw error
    }
  }

  return {
    convert,
  }
}