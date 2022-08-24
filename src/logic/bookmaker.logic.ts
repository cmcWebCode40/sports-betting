import { toast } from 'react-toastify';
import { IErrorArgs } from '../models/error-handler.model';
import { apiServer } from '../services/services';
import { TAppBookMaker } from '../models/bookmarkers.model';
import { UserUtils } from '../utils/functions/user-utils';
import handleError from '../utils/functions/error-handler';

const { getUserToken } = UserUtils;

export interface ITLeagues {
  eid: string;
  name: string;
  url: string;
  country: string;
}

export interface IBookMarkerResponse {
  status: string;
  message: string;
  data: {
    data: TAppBookMaker[];
  };
}

export interface IEmptyResponseData {
  status: string;
  message: string;
  data: null;
}

const headers = {
  'content-Type': 'application/json',
  Authorization: getUserToken(),
};

export type TMethods = 'post' | 'get' | 'patch' | 'put';

export interface IFnParams {
  url?: string | undefined;
  method?: TMethods;
  data?: unknown;
}

export const onError = (error: IErrorArgs): void | Promise<unknown> => {
  const errorDetails = handleError(error);
  toast.error(errorDetails.message);
};

/**
 *
 * @todo : Remove the function
 * @returns
 */
export const bookmakerApiFn = <TResponse>({ url, method, data }: IFnParams): Promise<TResponse> => {
  if (method === 'get') {
    return apiServer.get(`/bookmakers/${url || ''}`);
  }
  return apiServer.post(`/bookmakers/rating`, data, { headers });
};
