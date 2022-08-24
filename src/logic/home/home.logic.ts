import { toast } from 'react-toastify';
import { TAppBookMaker } from '../../models/bookmarkers.model';
import { IErrorArgs } from '../../models/error-handler.model';
import { apiServer } from '../../services/services';
import { MethodTypes } from '../../utils/common.definitions';
import handleError from '../../utils/functions/error-handler';
import { UserUtils } from '../../utils/functions/user-utils';

const { getUserToken } = UserUtils;

export interface ITLeagues {
  eid: string;
  name: string;
  url: string;
  country: string;
}

export interface IBookMarkerResponseHL {
  status: string;
  message: string;
  data: {
    data: TAppBookMaker[];
  };
}

export interface IEmptyResponseDataHL {
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
interface IGetAllSports {
  sports: string;
  date: string;
}
export const onErrorHL = (error: IErrorArgs): void | Promise<unknown> => {
  const errorDetails = handleError(error);
  toast.error(errorDetails.message);
};

export const middlewareBookmakerApi = <TResponse>({
  method,
  data,
}: IFnParams): Promise<TResponse> => {
  switch (method) {
    case MethodTypes.GET:
      return apiServer[method](`/bookmakers/`, { headers });
    case MethodTypes.POST:
      return apiServer[method](`/bookmakers/rating`, data, { headers });
    default:
      return apiServer.get('/');
  }
};

export const getAllSports = async ({ sports, date }: IGetAllSports): Promise<any> => {
  const response = await apiServer.get(`sports/${sports}/date/${date?.replace(/[^\w\s]/gi, '')}`);
  return response;
};
