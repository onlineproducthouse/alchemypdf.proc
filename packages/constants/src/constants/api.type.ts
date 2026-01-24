type ApiConstantNames = "REQUEST_STATE_KEY_PENDING"
  | "REQUEST_STATE_KEY_IN_PROGRESS"
  | "REQUEST_STATE_KEY_ATTEMPT_LIMIT_REACHED"
  | "REQUEST_STATE_KEY_COMPLETED"

export type ApiConstants = {
  [key in ApiConstantNames]: string
}
