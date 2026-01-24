export type RequestCreateRequest = {
  callbackUrl: string
  clientReference: string
  content: string
}

export type RequestCompleteRequest = {
  requestId: number
  success: boolean
}

export type RequestGetResponse = {
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