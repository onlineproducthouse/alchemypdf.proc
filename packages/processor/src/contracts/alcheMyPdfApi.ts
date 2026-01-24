export type DefaultHTTPResponse = {
  message: string
  statusCode: number
}

export type AlcheMyPdfRequest = {
  requestId: number
  requestExternalId: string
  requestStateKey: string
  clientReference: string
  content: string
  callbackUrl: string
  attemptCount: number
  createdAt: string
  updatedAt: string
}

export type CompleteRequest = {
  requestId: number
  success: boolean
}

export type CallbackRequest = {
  pdfString: string
  success: boolean
}