import {
  IHealthCheckAPI,
  IAlcheMyPdfAPI,
} from "./interfaces";

export interface IAPI {
  healthCheck: () => IHealthCheckAPI
  alcheMyPdf: () => IAlcheMyPdfAPI
}