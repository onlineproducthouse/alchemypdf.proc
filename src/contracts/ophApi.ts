export type DefaultHTTPResponse = {
  message: string
  statusCode: number
}

export type OphHtmlToPdfCompleteRequest = {
  success: boolean
  htmlToPdfRequestId: number
  htmlToPdfRequestActionKey: string
  htmlToPdfRequestPayload: string
  pdfString: string
}

export type OphHtmlToPdfPullResponse = {
  htmlToPdfRequestId: number
  htmlToPdfRequestActionKey: string
  htmlToPdfRequestPayload: string
  htmlString: string
}
