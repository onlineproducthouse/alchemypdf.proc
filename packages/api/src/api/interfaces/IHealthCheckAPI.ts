import { AxiosResponse } from 'axios';
import { DefaultHTTPResponse } from '@alchemypdf.proc/contracts';

export interface IHealthCheckAPI {
  ping(): Promise<AxiosResponse<DefaultHTTPResponse>>
}
