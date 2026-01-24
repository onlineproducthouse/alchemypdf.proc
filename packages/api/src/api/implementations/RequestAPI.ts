import { AxiosResponse } from 'axios';
import { HTTPRequest } from '@alchemypdf.proc/utilities';
import { IAPIConfig, IRequestAPI } from '../interfaces';
import { RequestCreateRequest, RequestGetResponse, RequestCompleteRequest, DefaultHTTPResponse } from '@alchemypdf.proc/contracts';
import { getHTTPRequestHeaders } from '../../helpers';

const RequestAPI = (payload: IAPIConfig): IRequestAPI => {
  const create = async (request: RequestCreateRequest): Promise<AxiosResponse<DefaultHTTPResponse>> => {
    try {
      return await HTTPRequest<RequestCreateRequest, DefaultHTTPResponse>({
        method: "POST",
        url: `${payload.config.apiUrl()}/Request/Create`,
        headers: getHTTPRequestHeaders(payload),
        data: request,
      })
    } catch (error) {
      throw error
    }
  }

  const complete = async (request: RequestCompleteRequest): Promise<AxiosResponse<DefaultHTTPResponse>> => {
    try {
      return await HTTPRequest<RequestCompleteRequest, DefaultHTTPResponse>({
        method: "POST",
        url: `${payload.config.apiUrl()}/Request/Complete`,
        headers: getHTTPRequestHeaders(payload),
        data: request,
      })
    } catch (error) {
      throw error
    }
  }

  const getPending = async (): Promise<AxiosResponse<RequestGetResponse>> => {
    try {
      return await HTTPRequest<undefined, RequestGetResponse>({
        method: "GET",
        url: `${payload.config.apiUrl()}/Request/GetPending`,
        headers: getHTTPRequestHeaders(payload),
        data: undefined,
      })
    } catch (error) {
      throw error
    }
  }

  const getByClientReference = async (clientReference: string): Promise<AxiosResponse<RequestGetResponse[]>> => {
    try {
      return await HTTPRequest<undefined, RequestGetResponse[]>({
        method: "GET",
        url: `${payload.config.apiUrl()}/Request/GetByClientReference/${clientReference}`,
        headers: getHTTPRequestHeaders(payload),
        data: undefined,
      })
    } catch (error) {
      throw error
    }
  }

  const getWithContentByClientReference = async (clientReference: string): Promise<AxiosResponse<RequestGetResponse[]>> => {
    try {
      return await HTTPRequest<undefined, RequestGetResponse[]>({
        method: "GET",
        url: `${payload.config.apiUrl()}/Request/GetWithContentByClientReference/${clientReference}`,
        headers: getHTTPRequestHeaders(payload),
        data: undefined,
      })
    } catch (error) {
      throw error
    }
  }

  return {
    create,
    complete,
    getByClientReference,
    getPending,
    getWithContentByClientReference,
  };
};

export default RequestAPI;
