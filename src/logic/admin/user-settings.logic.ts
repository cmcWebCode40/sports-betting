import { AxiosResponse } from 'axios';

import { MethodTypes } from '../../utils/common.definitions';
import { apiServer } from '../../services/services';
import { UserUtils } from '../../utils/functions/user-utils';
import { Users } from '../../models';

const { getUserToken } = UserUtils;

const headers = {
  Authorization: getUserToken(),
};

type ResponseData = {
  data: Array<Users>;
  message?: string;
  status?: string;
};

type UserSettingsMiddlewareParams = {
  method?: MethodTypes;
  formData?: FormData;
  id?: string;
};

type UserSettingsMiddleware = (
  params: UserSettingsMiddlewareParams,
) => Promise<AxiosResponse<ResponseData> | undefined>;

export const userSettingsMiddleware: UserSettingsMiddleware = async ({ method, formData, id }) => {
  switch (method) {
    case MethodTypes.GET:
      return apiServer[method](`/user/user-profile`, { headers }).then((data) => data);
    case MethodTypes.PATCH:
      return apiServer[method](`/user/user-profile/${id}`, formData, { headers }).then(
        (data) => data,
      );
    case MethodTypes.DELETE:
      return apiServer[method](`/user/user-profile/${id}`, { headers }).then((data) => data);
    default:
      return undefined;
  }
};
