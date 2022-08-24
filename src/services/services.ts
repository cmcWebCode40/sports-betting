import axios from 'axios';
import envKeys from '../config/env.config';
import { SELECTED_LANG } from '../constants/local-storage.constants';
import { MethodTypes } from '../utils/common.definitions';
import { UserUtils } from '../utils/functions/user-utils';

const { BASE_URL } = envKeys;
const { getUserToken } = UserUtils;

const items: any = localStorage.getItem(SELECTED_LANG);

const lng = JSON.parse(items);

axios.defaults.params = {};
axios.defaults.params.lng = lng?.code || 'en';

export const apiServer = axios.create({
  baseURL: BASE_URL,
});

type TOptions = {
  method: string;
  url: string;
  data?: any;
};

const headers = {
  'content-Type': 'application/json',
  Authorization: getUserToken(),
};

export const serviceApiMiddleware = <T>({ method, url, data }: TOptions): Promise<T> => {
  switch (method) {
    case MethodTypes.GET:
      return apiServer[method](url, { headers });
    case MethodTypes.POST:
      return apiServer[method](url, data, { headers });
    case MethodTypes.PATCH:
      return apiServer[method](url, data, { headers });
    case MethodTypes.DELETE:
      return apiServer[method](url, { headers });
    default:
      return apiServer.get(url);
  }
};
