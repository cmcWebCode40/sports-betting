import { toast } from 'react-toastify';
import { apiServer } from '../../services/services';
import { UserUtils } from '../../utils/functions/user-utils';
import handleError from '../../utils/functions/error-handler';

const { getUserToken } = UserUtils;

const headers = {
  'content-Type': 'application/json',
  Authorization: getUserToken(),
};

export type TMethods = 'post' | 'get' | 'patch' | 'put';

export interface IFnParams {
  url?: string | undefined;
  method?: TMethods;
  data?: unknown;
  params?: string;
}
export interface IEmptyResponseData {
  status: string;
  message: string;
  data: null;
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const onErrorSMF = (err: any) => {
  const error = handleError(err);
  toast.error(error.message);
};

export const siteMapFn = <TResponse>({ method, data, params }: IFnParams): Promise<TResponse> => {
  if (method === 'get') {
    return apiServer.get(`/bookmakers/${params || ''}`, { headers });
  }
  return apiServer.post(`/bookmakers`, data, { headers });
};
