import { _config, Config } from "./config";

export type IoC = {
  htmlToPdfService: IHtmlToPdf
}

export const getIoC = async (config: Config): Promise<IoC> => ({
  htmlToPdfService: HtmlToPdf({ puppeteerUtil: await PuppeteerUtil() }),
})
