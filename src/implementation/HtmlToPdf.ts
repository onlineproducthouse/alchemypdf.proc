import { HtmlToPdfRequest, HtmlToPdfResponse } from "../contracts";
import { IHtmlToPdf, IPuppeteerUtil } from "../interface";

type HtmlToPdfInitParams = {
  puppeteerUtil: IPuppeteerUtil
}

export default function HtmlToPdf({ puppeteerUtil }: HtmlToPdfInitParams): IHtmlToPdf {
  const convert = async ({ htmlText }: HtmlToPdfRequest): Promise<HtmlToPdfResponse> => {
    try {
      const _pdf = await puppeteerUtil.convertHtmlToPdf({ htmlText })

      return {
        htmlBuffer: _pdf.buffer,
        htmlBufferString: _pdf.buffer.toString(),
      }
    } catch (error) {
      throw error
    }
  }

  return {
    convert,
  }
}