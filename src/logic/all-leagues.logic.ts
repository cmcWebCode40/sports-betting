import { apiServer } from '../services/services';

export interface ITLeagues {
  eid: string;
  name: string;
  url: string;
  country: string;
}

export const getByLeagueCountryFn = <TResponse>(url: string): Promise<TResponse> => {
  return apiServer.get(`/bet/${url}`);
};
