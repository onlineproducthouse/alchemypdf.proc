import * as puppeteer from "puppeteer"
import { PuppeteerToPdfRequest, PuppeteerToPdfResponse } from "@alchemypdf.proc/contracts"
import { IPuppeteerUtil } from "../interface"

export default async function PuppeteerUtil(): Promise<IPuppeteerUtil> {
  // setup browser
  const _launchBrowser = async (): Promise<puppeteer.Browser> => {
    console.log("launching browser")
    const b = await puppeteer.launch({
      headless: "shell",
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-gpu',
        '--disable-dev-shm-usage',
      ],
      executablePath: '/usr/bin/chromium', // '/usr/bin/chromium',
      timeout: 0,
      protocolTimeout: 300000,
    })

    console.log("returning browser")
    return b
  }

  let _browser: puppeteer.Browser = await _launchBrowser()

  const _getBrowser = async (): Promise<puppeteer.BrowserContext> => {
    if (!!_browser)
      return await _browser.createBrowserContext()

    console.log("browser not found, launching new browser")
    _browser = await _launchBrowser()
    return _browser.createBrowserContext()
  }

  const convertHtmlToPdf = async (payload: PuppeteerToPdfRequest): Promise<PuppeteerToPdfResponse> => {
    try {
      console.log("creating new browser context")
      const _browser = await _getBrowser()
      console.log("creating new page")
      const page = await _browser.newPage()

      console.log("setting content")
      await page.setContent(payload.htmlText, {
        waitUntil: 'networkidle2',
      })

      console.log("generating pdf")
      const rawPdf = await page.pdf({
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

      await _browser.close()

      console.log("returning buffer")

      return {
        base64: Buffer.from(rawPdf.buffer).toString('base64'),
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