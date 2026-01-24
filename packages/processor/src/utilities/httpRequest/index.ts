import Axios, {
  Method,
  AxiosResponse,
  AxiosRequestConfig,
  AxiosError,
} from 'axios';

type HTTPRequestPayload<T> = {
  method: Method
  url: string
  headers: {
    [key: string]: string
  }
  data: T
}

export async function HTTPRequest<ReqPayload, RespPayload>(payload: HTTPRequestPayload<ReqPayload>): Promise<AxiosResponse<RespPayload>> {
  try {
    if (payload.method !== 'POST' && payload.method !== 'GET')
      throw new Error('HTTP method not supported');

    const requestConfig: AxiosRequestConfig<any> = {
      url: payload.url,
      method: payload.method,
      headers: { ...payload.headers },
    };

    if (payload.method === 'POST')
      requestConfig.data = payload.data

    return await Axios(requestConfig);
  } catch (error: unknown) {
    const axiosError = error as AxiosError<any>;

    if (axiosError.isAxiosError)
      return axiosError.response as AxiosResponse<RespPayload>

    const e = error as Error;
    throw new Error(e.message);
  }
}
