import { IHtmlToPdf, IOphApi } from "./interface";
import { HtmlToPdf, OphHtmlToPdfApi, PuppeteerUtil } from "./implementation";
import { _config, Config } from "./config";

export type IoC = {
  htmlToPdfService: IHtmlToPdf
  ophApi: IOphApi
}

export const getIoC = async (config: Config): Promise<IoC> => ({
  htmlToPdfService: HtmlToPdf({
    puppeteerUtil: await PuppeteerUtil()
  }),
  ophApi: OphHtmlToPdfApi(config)
})
