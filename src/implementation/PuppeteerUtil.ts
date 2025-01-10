import puppeteer from "puppeteer"
import { PuppeteerToPdfRequest, PuppeteerToPdfResponse } from "../contracts"
import { IPuppeteerUtil } from "../interface"

export default function PuppeteerUtil(): IPuppeteerUtil {
  const convertHtmlToPdf = async (payload: PuppeteerToPdfRequest): Promise<PuppeteerToPdfResponse> => {
    try {
      const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        executablePath: '/usr/bin/chromium-browser',
      })

      const page = await browser.newPage()
      await page.setContent(payload.htmlText)

      const buffer = await page.pdf({
        format: 'A4',
        scale: 0.7,
        margin: {
          bottom: "8mm",
          top: "8mm",
          left: "8mm",
          right: "8mm",
        },
      })

      await browser.close()

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