import {
  IHealthCheckAPI,
  IRequestAPI,
} from "./interfaces";

export interface IAPI {
  healthCheck: () => IHealthCheckAPI
  request: () => IRequestAPI
}