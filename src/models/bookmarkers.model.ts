import { TZone } from '.';
import { IAllSport } from './leagues.model';

export type TBookmarkers = {
  idProvider: string;
  WebName: string;
  name: string;
  WebUrl: string;
  IsBookmaker: string;
  IsBettingExchange: string;
  Url: string;
  DefaultBetslipUrl: string;
  Active: string;
  NewTo: string;
  SetNew: string;
  PreferredCountryID: string;
  sr: number;
  IsPremium: string;
  sortKey: number;
  isNew: boolean;
  bonus: {
    id: string;
    title: string;
    text: string;
  };
  logo?: string;
};

export type TAbout = {
  hq: string;
  email: string;
  license: string;
  website: string;
  helpDesk: string;
  telephone: number;
  dateFounded: string;
};
export type TPlayableSports = {
  id: number;
  name: string;
  value: string;
  icon?: string;
  oddsbugSupported: boolean;
  createdAt: string;
  updatedAt: string;
};
export type TWithdrawal = {
  id: number;
  paymentMethod: string;
  min: number;
  max: number;
  currency: string;
  duration: string;
  createdAt: string;
  updatedAt: string;
  bookmakerId: 4;
};
export type TDeposit = {
  id: number;
  paymentMethod: string;
  min: number;
  max: number;
  currency: string;
  duration: string;
  createdAt: string;
  updatedAt: string;
  bookmakerId: 4;
};
export type TDiller = {
  id: number;
  name: string;
  oddsbugSupported: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TApp = {
  ios: boolean;
  android: boolean;
};

export type TBettingOptions = {
  cashout: boolean;
  liveBetting: boolean;
  liveStreaming: boolean;
};

export type TAppBookMaker = {
  app: TApp;
  deposit: TDeposit[];
  diller: TDiller[];
  about: TAbout;
  withdrawal: TWithdrawal[];
  playableSports: TPlayableSports[];
  bettingOptions: TBettingOptions;
  name: string;
  registrationLink: string;
  logo?: string;
  id?: string;
  rank: any;
  status: string;
  blacklistedDate: any;
  blacklistedReason: any;
  slug: string;
  createdAt: string;
  updatedAt: string;
  userRating: any;
};

export interface IAppState {
  bookmakersList: TBookmarkers[];
  sports: IAllSport[];
  app: any;
  languages: Array<TLangauage>;
  timezone: {
    list: TZone[];
    active: string;
    default: string;
  };
  activeSport: any;
  oddsBugBookmakers: any;
  isLoading: boolean;
  selectedLanguage: any;
}
export type TLangauage = {
  name: string;
  code: string;
  url: string;
  icon: string;
};
