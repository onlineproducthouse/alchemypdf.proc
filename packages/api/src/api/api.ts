import { IAPI } from "./IAPI"
import { IAPIConfig } from "./interfaces"
import {
  HealthCheckAPI,
  RequestAPI,
} from "./implementations"

export const api = (initConfig: IAPIConfig): IAPI => ({
  healthCheck: () => HealthCheckAPI({ ...initConfig }),
  request: () => RequestAPI({ ...initConfig }),
})