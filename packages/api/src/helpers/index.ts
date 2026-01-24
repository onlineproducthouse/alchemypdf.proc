import { IAPIConfig } from "../api/interfaces";

export const getHTTPRequestHeaders = (payload: IAPIConfig) => ({
  'x-api-key': payload.config.apiKey(),
})