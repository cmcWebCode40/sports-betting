import { toast } from 'react-toastify';
import { IErrorArgs } from '../models/error-handler.model';
import { apiServer } from '../services/services';
import handleError from '../utils/functions/error-handler';

export interface IEmptyResponseDataHL {
  status: string;
  message: string;
  data: null;
}

const headers = {
  'content-Type': 'application/json',
};

export type TMethods = 'post' | 'get' | 'patch' | 'put';

export interface IFnParams {
  sport: string | undefined;
  method?: TMethods;
  data?: unknown;
}

export const onErrorLS = (error: IErrorArgs): void | Promise<unknown> => {
  const errorDetails = handleError(error);
  toast.error(errorDetails.message);
};

export const liveScoreFn = <TResponse>({ sport, method, data }: IFnParams): Promise<TResponse> => {
  if (method === 'get') {
    return apiServer.get(`/sports/${sport}/inlive`);
  }
  return apiServer.post(`/bookmakers/rating`, data, { headers });
};
