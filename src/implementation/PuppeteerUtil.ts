import puppeteer from "puppeteer"
import { PuppeteerToPdfRequest, PuppeteerToPdfResponse } from "../contracts"
import { IPuppeteerUtil } from "../interface"

export default function PuppeteerUtil(): IPuppeteerUtil {
  // setup browser
  var _browser: puppeteer.Browser

  const _launchBrowser = async (): Promise<puppeteer.Browser> => {
    console.log("launching browser")
    const b = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      executablePath: '/usr/bin/chromium-browser',
      timeout: 0,
    })

    b.on("disconnected", _launchBrowser)

    return b
  }

  (async () => {
    _browser = await _launchBrowser()
  })()

  const _getBrowser = async (): Promise<puppeteer.Browser> => {
    if (!_browser)
      _browser = await _launchBrowser()
    return _browser
  }

  const _getPage = async (): Promise<puppeteer.Page> => {
    const _browser = await _getBrowser()
    return await _browser.newPage()
  }

  const convertHtmlToPdf = async (payload: PuppeteerToPdfRequest): Promise<PuppeteerToPdfResponse> => {
    try {
      console.log("setting content")
      const page = await _getPage()
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
        base64: buffer.toString('base64'),
      }
    } catch (error) {
      throw error
    }
  }

  return {
    convertHtmlToPdf,
  }
}