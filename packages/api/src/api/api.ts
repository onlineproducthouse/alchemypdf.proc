import { IAPI } from "./IAPI"
import { IAPIConfig } from "./interfaces"
import {
  HealthCheckAPI,
  AlcheMyPdfAPI,
} from "./implementations"

export const api = (initConfig: IAPIConfig): IAPI => ({
  healthCheck: () => HealthCheckAPI({ ...initConfig }),
  alcheMyPdf: () => AlcheMyPdfAPI({ ...initConfig }),
})