export type AlcheMyPdfCreateRequest = {
  callbackUrl: string
  clientReference: string
  content: string
}

export type AlcheMyPdfRequest = {
  attemptCount: number
  callbackUrl: string
  clientReference: string
  content: string
  createdAt: string
  requestExternalId: string
  requestId: number
  requestStateKey: string
  updatedAt: string
}

export type AlcheMyPdfCompleteRequest = {
  requestId: number
  success: boolean
}

export type AlcheMyPdfCallbackRequest = {
  pdfString: string
  success: boolean
}