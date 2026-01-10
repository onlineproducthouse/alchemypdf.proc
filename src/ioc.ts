import { IHtmlToPdf, IAlcheMyPdfApi } from "./interface";
import { HtmlToPdf, AlcheMyPdfApi, PuppeteerUtil } from "./implementation";
import { _config, Config } from "./config";

export type IoC = {
  htmlToPdfService: IHtmlToPdf
  alcheMyPdfApi: IAlcheMyPdfApi
}

export const getIoC = async (config: Config): Promise<IoC> => ({
  htmlToPdfService: HtmlToPdf({ puppeteerUtil: await PuppeteerUtil() }),
  alcheMyPdfApi: AlcheMyPdfApi(config)
})
