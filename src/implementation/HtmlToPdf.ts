import { HtmlToPdfRequest, HtmlToPdfResponse } from "../contracts";
import { IHtmlToPdf, IPuppeteerUtil } from "../interface";

type HtmlToPdfInitParams = {
  puppeteerUtil: IPuppeteerUtil
}

export default async function HtmlToPdf({ puppeteerUtil }: HtmlToPdfInitParams): Promise<IHtmlToPdf> {
  const convert = async ({ htmlText }: HtmlToPdfRequest): Promise<HtmlToPdfResponse> => {
    const _pdf = await puppeteerUtil.convertHtmlToPdf({ htmlText })

    return {
      htmlBuffer: _pdf.buffer,
      htmlBufferString: _pdf.buffer.toString(),
    }
  }

  return {
    convert,
  }
}