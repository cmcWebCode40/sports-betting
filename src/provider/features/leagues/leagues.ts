import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  IPopularLeagues,
  ILeagueState,
  TMatches,
  IBetsOddsBug,
} from '../../../models/leagues.model';
import { apiServer } from '../../../services/services';
import { groupMatchesByLeague } from '../../../utils/common.helpers';

const initialState: ILeagueState = {
  popularLeagues: [],
  isLoading: false,
  allCountry: [],
  leaguesByCountry: [],
  selectedLeague: '',
  betsOdds: null,
  activeLeagueUrl: '',
  matchDate: JSON.stringify(new Date()),
  processingMatches: false,
  selectedMatchesByLeague: [],
  // original datastructure of matches from brookers API
  defaultMatchesData: [],
};

export const getBySports = createAsyncThunk('sports_leagues/getBySports', async (sport: string) => {
  const response = await apiServer.get(`/sports/${sport}`);
  return response.data.data;
});

export const sportsLeagues = createSlice({
  name: 'sports_leagues',
  initialState,
  reducers: {
    addLeaguesByCountry: (state, action: PayloadAction<any>) => {
      const data = action.payload;
      state.leaguesByCountry = data?.data;
    },
    setMatches: (state, action: PayloadAction<{ data: { data: TMatches[] }; url: string }>) => {
      const { data, url } = action.payload;
      state.defaultMatchesData = data.data;
      state.selectedMatchesByLeague = groupMatchesByLeague(data.data);
      state.activeLeagueUrl = url;
      state.processingMatches = !state.processingMatches;
    },
    setSelectedLeague: (state, action: PayloadAction<any[]>) => {
      state.selectedMatchesByLeague = action.payload;
    },
    setProcessingMatches: (state /* action */) => {
      state.processingMatches = !state.processingMatches;
    },
    setBetsOdds: (state, action: PayloadAction<{ data: IBetsOddsBug[] } | any>) => {
      state.betsOdds = action.payload.data;
    },
  },
  extraReducers: {
    [getBySports.pending.toString()]: (state) => {
      state.isLoading = true;
    },
    [getBySports.fulfilled.toString()]: (
      state,
      action: PayloadAction<{ leagues: IPopularLeagues[]; countries: string[] }>,
    ) => {
      state.isLoading = false;
      const data = action.payload;

      state.allCountry = data.countries;
      // state.popularLeagues = data.leagues.slice(0, 6);
    },
    [getBySports.rejected.toString()]: (state) => {
      state.isLoading = false;
    },
  },
});

export const {
  addLeaguesByCountry,
  setMatches,
  setBetsOdds,
  setSelectedLeague,
  setProcessingMatches,
} = sportsLeagues.actions;

export default sportsLeagues.reducer;
