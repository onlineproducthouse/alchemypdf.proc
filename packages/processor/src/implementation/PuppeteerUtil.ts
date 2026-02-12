import * as puppeteer from "puppeteer"
import { PuppeteerToPdfRequest, PuppeteerToPdfResponse } from "@alchemypdf.proc/contracts"
import { IPuppeteerUtil } from "../interface"

export default async function PuppeteerUtil(): Promise<IPuppeteerUtil> {
  // setup browser
  const _launchBrowser = async (): Promise<puppeteer.Browser> => {
    console.log("launching browser")
    const b = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
      executablePath: '/usr/bin/chromium-browser',
      timeout: 0,
      protocolTimeout: 300000,
    })

    console.log("returning browser")
    return b
  }

  let _browser: puppeteer.Browser = await _launchBrowser()

  const _getBrowser = async (): Promise<puppeteer.Browser> => {
    if (!!_browser)
      return _browser

    console.log("browser not found, launching new browser")
    _browser = await _launchBrowser()
    return _browser
  }

  const _getPage = async (): Promise<puppeteer.Page> => {
    const _browser = await _getBrowser()
    const p = await _browser.newPage()
    return p
  }

  const convertHtmlToPdf = async (payload: PuppeteerToPdfRequest): Promise<PuppeteerToPdfResponse> => {
    try {
      console.log("creating new page")
      const page = await _getPage()

      console.log("setting content")
      await page.setContent(payload.htmlText)

      console.log("generating pdf")
      const buffer = await page.pdf({
        timeout: 0,
        format: 'A4',
        scale: 0.7,
        margin: {
          bottom: "8mm",
          top: "8mm",
          left: "8mm",
          right: "8mm",
        },
      })

      await page.close()

      console.log("returning buffer")

      return {
        base64: buffer.toString(),
      }
    } catch (error) {
      console.log((error as Error).message);
      console.log(error);
      throw error
    }
  }

  return {
    convertHtmlToPdf,
  }
}