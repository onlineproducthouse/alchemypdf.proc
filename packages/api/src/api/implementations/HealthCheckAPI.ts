import { AxiosResponse } from 'axios';
import { DefaultHTTPResponse } from '@alchemypdf.proc/contracts';
import { HTTPRequest } from '@alchemypdf.proc/utilities';
import { IHealthCheckAPI, IAPIConfig } from '../interfaces';
import { getHTTPRequestHeaders } from '../../helpers';

const HealthCheckAPI = (payload: IAPIConfig): IHealthCheckAPI => {
  const ping = async (): Promise<AxiosResponse<DefaultHTTPResponse>> => {
    try {
      return await HTTPRequest<undefined, DefaultHTTPResponse>({
        method: 'GET',
        url: `${payload.config.apiHost()}/api/HealthCheck/Ping`,
        headers: getHTTPRequestHeaders(payload),
        data: undefined,
      });
    } catch (error) {
      throw error;
    }
  };

  return { ping };
};

export default HealthCheckAPI;
