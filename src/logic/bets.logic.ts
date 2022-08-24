import moment from 'moment';
import { IBetsOddsBug } from '../models/leagues.model';
import { apiServer } from '../services/services';
import { UserUtils } from '../utils/functions/user-utils';

const { getUserToken } = UserUtils;

type TQueries = {
  date: any;
  sport: string;
  name: string;
  country: string;
  code?: string;
  datedFormatted?: boolean;
};

export const generateBetDetailsQueryUrl = ({
  date,
  sport,
  name: league,
  country,
  code,
  datedFormatted,
}: TQueries): string => {
  const FormattedDate = datedFormatted
    ? date
    : moment
        .utc(date)
        .format('YYYY-MM-DD')
        ?.replace(/[^\w\s]/gi, '');

  const leagueValue = league ? `league=${league}` : '';
  const codeValue = code ? `&code=${code}` : '';
  const countryValue = country ? `&country=${country}` : '';

  const url = `sports/${sport}/date/${FormattedDate}?${leagueValue}${countryValue}${codeValue}`;

  return url;
};

export type TBetsOddsResponse = {
  status: string;
  message: string;
  data: IBetsOddsBug[];
};

enum EMethods {
  GET = 'get',
  POST = 'post',
  PATCH = 'patch',
  DELETE = 'delete',
}

type TOptions = {
  method: string;
  url: string;
  data?: string;
};

const headers = {
  'content-Type': 'application/json',
  Authorization: getUserToken(),
};

export const betsApiMiddleware = <T>({ method, url, data }: TOptions): Promise<T | any> => {
  switch (method) {
    case EMethods.GET:
      return apiServer[method](url, { headers });
    case EMethods.POST:
      return apiServer[method](url, data, { headers });
    case EMethods.PATCH:
      return apiServer[method](url, data, { headers });
    case EMethods.DELETE:
      return apiServer[method](url, { headers });
    default:
      return apiServer.get(url);
  }
};
