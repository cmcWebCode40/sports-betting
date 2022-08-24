import { toast } from 'react-toastify';
import { apiServer } from '../../services/services';
import { MethodTypes } from '../../utils/common.definitions';
import handleError from '../../utils/functions/error-handler';
import { UserUtils } from '../../utils/functions/user-utils';

const { getUserToken } = UserUtils;

export type TBannerItem = {
  id: number;
  title: string;
  link: string;
  createdAt: string;
  updatedAt: string;
};

export type TBannerResponse = {
  data: {
    data: TBannerItem[];
  };
  message: string;
  status: string;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const onErrorBannner = (err: any) => {
  const error = handleError(err);
  toast.error(error.message);
};

export interface IContentMgtFn<T> {
  method?: 'post' | 'get' | 'patch' | 'put' | 'delete';
  endPoint: string;
  data?: T;
}

const headers = {
  'content-Type': 'application/json',
  Authorization: getUserToken(),
};
export const mediaMiddlewareService = <TData, TResponse>({
  data,
  endPoint,
  method,
}: IContentMgtFn<TData>): Promise<TResponse> => {
  switch (method) {
    case MethodTypes.GET: {
      return apiServer[method](`/${endPoint}`, { headers });
    }
    case MethodTypes.POST: {
      return apiServer[method](`/${endPoint}`, data, { headers });
    }
    case MethodTypes.PATCH: {
      return apiServer[method](`/${endPoint}`, data, { headers });
    }
    default:
      return apiServer.get(`/${endPoint}`, { headers });
  }
};
