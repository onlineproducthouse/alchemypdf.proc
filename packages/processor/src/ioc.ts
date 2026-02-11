import { IHtmlToPdf } from "./interface";
import { HtmlToPdf, PuppeteerUtil } from "./implementation";
import { IAlcheMyPdfAPI, api } from "@alchemypdf.proc/api";
import { IConfig } from "@alchemypdf.proc/config";

export type IoC = {
  config: IConfig
  htmlToPdfService: IHtmlToPdf
  alcheMyPdfAPI: IAlcheMyPdfAPI
}

export const getIoC = async (config: IConfig): Promise<IoC> => ({
  config,
  htmlToPdfService: HtmlToPdf({ puppeteerUtil: await PuppeteerUtil() }),
  alcheMyPdfAPI: api({ config }).alcheMyPdf()
})
