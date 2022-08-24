import * as yup from 'yup';
import moment from 'moment';
import { toast } from 'react-toastify';
import { TAppBookMaker } from '../../models/bookmarkers.model';
import { apiServer } from '../../services/services';
import { UserUtils } from '../../utils/functions/user-utils';
import handleError from '../../utils/functions/error-handler';
import { MethodTypes } from '../../utils/common.definitions';

const { getUserToken } = UserUtils;

export const paymentMethods = ['Visa', 'MasterCard', 'Verve', 'inter-switch'];

export interface IPayment {
  paymentMethod: string;
  min: string;
  max: string;
  duration: string;
  currency: string;
  id: string;
}
export interface IAddBookmakerSchema {
  name: string;
  website: string;
  deposit: string;
  welcomeBonus: string;
  registrationLink: string;
  dateFounded: string;
  ios: boolean;
  liveStreaming: boolean;
  liveBetting: boolean;
  license: string;
  email: string;
  cashout: boolean;
  android: boolean;
  helpDesk: string;
  hq: string;
}

export type TBettingOptions = {
  cashout: boolean;
  liveStreaming: boolean;
  liveBetting: boolean;
};

export type TApp = { ios: boolean; android: boolean };

export type TPrepareBookmakerData = {
  values: IAddBookmakerSchema;
  files: any;
  app: TApp;
  telephone: any;
  bettingOptions: TBettingOptions;
  diller: string[];
  playableSports: string[];
  deposit: IPayment[];
  withdrawal: IPayment[];
};

export const prepareBookmakerData = ({
  values,
  files,
  app,
  diller,
  deposit,
  telephone,
  withdrawal,
  bettingOptions,
  playableSports,
}: TPrepareBookmakerData): any => {
  let dillerTypes;
  dillerTypes = diller;
  const dateFounded = moment(values.dateFounded).format('YYYY-MM-DD');
  const about = {
    dateFounded,
    hq: values.hq,
    telephone: telephone?.phoneInput,
    license: values.license,
    website: values.website,
    email: values.email,
    helpDesk: values.helpDesk,
  };
  const postDeposit = deposit.map(({ id, ...rest }) => rest);
  const postWithdrawal = withdrawal.map(({ id, ...rest }) => rest);

  const formData = new FormData();
  if (files) {
    formData.append('logo', files);
  }

  if (!dillerTypes.length) {
    dillerTypes = ['en'];
  }
  formData.append('name', values.name);
  formData.append('app', JSON.stringify(app));
  formData.append('about', JSON.stringify(about));
  formData.append('diller', JSON.stringify(dillerTypes));
  formData.append('deposit', JSON.stringify(postDeposit));
  formData.append('welcomeBonus', values.welcomeBonus);
  formData.append('withdrawal', JSON.stringify(postWithdrawal));
  formData.append('registrationLink', values.registrationLink);
  formData.append('playableSports', JSON.stringify(playableSports));
  formData.append('bettingOptions', JSON.stringify(bettingOptions));
  return formData;
};

export const AddBookmakerSchema = yup.object().shape({
  name: yup.string().required(),
  website: yup.string().optional(),
  helpDesk: yup.string().optional(),
  hq: yup.string().optional(),
  deposit: yup.string().optional(),
  welcomeBonus: yup.string().optional(),
  registrationLink: yup.string().optional(),
  dateFounded: yup.date().typeError(' Valid date format (e.g 12-12-2021)').optional(),
  license: yup.string().optional(),
  email: yup.string().email().optional(),
});

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

const headers = {
  'content-Type': 'application/json',
  Authorization: getUserToken(),
};

export type TMethods = 'post' | 'get' | 'patch' | 'put' | 'delete';

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
export const onErrorBMK = (err: any) => {
  const error = handleError(err);
  toast.error(error.message);
};

type TOptions = {
  method: TMethods;
  url: string;
  data?: any;
};

export const bookmakerApiMiddleware = <T>({ method, url, data }: TOptions): Promise<T> => {
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

export const mockedWhiteListedB = [];
