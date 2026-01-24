import { AxiosResponse } from 'axios';
import { HTTPRequest } from '@alchemypdf.proc/utilities';
import { IAPIConfig, IAlcheMyPdfAPI } from '../interfaces';
import { AlcheMyPdfCreateRequest, AlcheMyPdfRequest, AlcheMyPdfCompleteRequest, DefaultHTTPResponse, AlcheMyPdfCallbackRequest } from '@alchemypdf.proc/contracts';
import { getHTTPRequestHeaders } from '../../helpers';

const AlcheMyPdfAPI = (payload: IAPIConfig): IAlcheMyPdfAPI => {
  const create = async (request: AlcheMyPdfCreateRequest): Promise<AxiosResponse<DefaultHTTPResponse>> => {
    try {
      return await HTTPRequest<AlcheMyPdfCreateRequest, DefaultHTTPResponse>({
        method: "POST",
        url: `${payload.config.apiUrl()}/Request/Create`,
        headers: getHTTPRequestHeaders(payload),
        data: request,
      })
    } catch (error) {
      throw error
    }
  }

  const complete = async (request: AlcheMyPdfCompleteRequest): Promise<AxiosResponse<DefaultHTTPResponse>> => {
    try {
      return await HTTPRequest<AlcheMyPdfCompleteRequest, DefaultHTTPResponse>({
        method: "POST",
        url: `${payload.config.apiUrl()}/Request/Complete`,
        headers: getHTTPRequestHeaders(payload),
        data: request,
      })
    } catch (error) {
      throw error
    }
  }

  const getPending = async (): Promise<AxiosResponse<AlcheMyPdfRequest>> => {
    try {
      return await HTTPRequest<undefined, AlcheMyPdfRequest>({
        method: "GET",
        url: `${payload.config.apiUrl()}/Request/GetPending`,
        headers: getHTTPRequestHeaders(payload),
        data: undefined,
      })
    } catch (error) {
      throw error
    }
  }

  const getByClientReference = async (clientReference: string): Promise<AxiosResponse<AlcheMyPdfRequest[]>> => {
    try {
      return await HTTPRequest<undefined, AlcheMyPdfRequest[]>({
        method: "GET",
        url: `${payload.config.apiUrl()}/Request/GetByClientReference/${clientReference}`,
        headers: getHTTPRequestHeaders(payload),
        data: undefined,
      })
    } catch (error) {
      throw error
    }
  }

  const getWithContentByClientReference = async (clientReference: string): Promise<AxiosResponse<AlcheMyPdfRequest[]>> => {
    try {
      return await HTTPRequest<undefined, AlcheMyPdfRequest[]>({
        method: "GET",
        url: `${payload.config.apiUrl()}/Request/GetWithContentByClientReference/${clientReference}`,
        headers: getHTTPRequestHeaders(payload),
        data: undefined,
      })
    } catch (error) {
      throw error
    }
  }

  const callback = async (url: string, request: AlcheMyPdfCallbackRequest): Promise<AxiosResponse<DefaultHTTPResponse>> => {
    try {
      return await HTTPRequest<AlcheMyPdfCallbackRequest, DefaultHTTPResponse>({
        method: "POST",
        url,
        headers: getHTTPRequestHeaders(payload),
        data: request,
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
    callback,
  };
};

export default AlcheMyPdfAPI;
