import { toast } from 'react-toastify';
import { apiServer } from '../../services/services';
import handleError from '../../utils/functions/error-handler';
import { UserUtils } from '../../utils/functions/user-utils';

const { getUserToken } = UserUtils;
export type IContentResponse = {
  data: {
    data: {
      text: string;
    };
  };
  message: string;
  status: string;
};

export type IContactResponse = {
  data: {
    email: string;
  };
  message: string;
  status: string;
};

export type THeadLineData = {
  id?: number;
  title: string;
  body: string;
  isDefault?: boolean;
};

export type FAQData = {
  id?: number;
  question: string;
  answer: string;
};

export type ContactUsData = {
  subject: string;
  email: string;
  message: string;
};

export type THeadLinesResponse = {
  data: {
    data: THeadLineData[];
  };
  message: string;
  status: string;
};

export type TFAQsResponse = {
  data: {
    data: FAQData[];
  };
  message: string;
  status: string;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const onErrorCMG = (err: any) => {
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
export const contentMgtFn = <TData, TResponse>({
  data,
  endPoint,
  method,
}: IContentMgtFn<TData>): Promise<TResponse> => {
  if (method === 'delete' || method === 'get') {
    return apiServer[method](`/${endPoint}`, { headers });
  }
  return apiServer[method || 'post'](`/${endPoint}`, data, { headers });
};
