export interface IPopularLeagues {
  eid: string;
  name: string;
  url: string;
  country: string;
}

export interface IAllSport {
  id: number;
  name: string;
  value: string;
  icon: string;
}

export interface ILeagueState {
  popularLeagues: IPopularLeagues[];
  isLoading: boolean;
  allCountry: string[];
  leaguesByCountry: IPopularLeagues[];
  selectedLeague: string;
  matchDate: any;
  activeLeagueUrl: string;
  betsOdds: TBookieOdds | any;
  processingMatches: boolean;
  selectedMatchesByLeague: any;
  defaultMatchesData: any;
}

export type TMatches = {
  id?: string;
  away: string;
  code: string;
  country: string;
  day: string;
  home: string;
  hour: string;
  league: string;
  match: string;
  sports: string;
  status: string;
  url: string;
  year: string;
  homeLogo: string;
  awayLogo: string;
  countryLogo: string;
};

export type TFormattedMatches = {
  league: string;
  matches: TMatches[];
  countryLogo: string;
  country: string;
};

export type TLive = {
  status: string;
  ['short-status']: string;
  ['partial-score']: string;
  score: string;
  stageTypeId: number;
  stageId: number;
  liveIcon: boolean;
};

type TScores = {
  homeScore: string;
  awayScore: string;
};

export interface ILiveScore extends TMatches, TScores {
  live: TLive;
  score: {
    awayScore: string;
    homeScore: string;
  };
}

export type TSports = {
  id: number;
  name: string;
  value: string;
  icon: string;
  oddsbugSupported: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TOdds = {
  ['0']: number;
  ['1']: number;
  ['2']: number;
};

export type TMvt = {
  ['0']: string;
  ['1']: string;
  ['2']: string;
};

export type TBookieOdds = {
  id: number;
  bsId: string;
  name: string;
  bookieLogo: string;
  odds: TOdds;
  mvt: TMvt;
};

export interface IBetsOddsBug {
  market: string;
  oddsName: string[];
  bookieOdds: TBookieOdds[];
}

export interface ILiveBets extends TMatches, TOdds, TLive {
  timeSec: string;
  date: number;
  gameStatus: number;
}

export enum ELiveIcon {
  SOCCER = 'soccer',
  BASKETBALL = 'basketball',
  TENNIS = 'tennis',
  ESPORTS = 'esports',
}

/**
 * standings @types declarations
 */

export type TGameType = 'all' | 'home' | 'away';

export type TeamGameRecords = {
  win: number;
  draw: number;
  lose: number;
  goals: {
    for: number;
    against: number;
  };
  played: number;
};

export type TeamStandingsList = {
  season: number;
  group: string;
  rank: number;
  points: number;
  form: string;
  goalsDiff: string;
  status: string;
  decription: any;
  all: TeamGameRecords;
  home: TeamGameRecords;
  away: TeamGameRecords;
};

export type TypeStandingRecords = {
  seasons: number[];
  standing: TeamStandingsList[];
};

export type TranslationsSchema = {
  title: string;
  translations: string[];
};
