import { AxiosResponse } from 'axios';

import { MethodTypes } from '../../utils/common.definitions';
import { apiServer } from '../../services/services';
import { UserUtils } from '../../utils/functions/user-utils';
import { SiteSettingModel } from '../../models';

const { getUserToken } = UserUtils;

const headers = {
  Authorization: getUserToken(),
  'Content-Type': 'application/json',
};

type ResponseData = {
  data: SiteSettingModel;
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
) => Promise<ResponseData | undefined>;

export const siteSettingsMiddleware: UserSettingsMiddleware = async ({ method, formData }) => {
  let api: AxiosResponse<ResponseData>;
  switch (method) {
    case MethodTypes.GET:
      api = await apiServer[method](`/site-details`, { headers });
      return api.data;
    case MethodTypes.POST:
    case MethodTypes.PATCH:
      api = await apiServer[method](`/site-details`, formData, { headers });
      return api.data;
    default:
      return undefined;
  }
};
