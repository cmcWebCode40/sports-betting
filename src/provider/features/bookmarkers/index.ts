import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SELECTED_LANG } from '../../../constants/local-storage.constants';
import { IAppState, TAppBookMaker } from '../../../models/bookmarkers.model';
import { apiServer } from '../../../services/services';
import TimeZoneUtils from '../../../utils/common.helpers';
import { AppUtils } from '../../../utils/functions/app-utils';

const { geDefaultTz } = TimeZoneUtils;
const initialState: IAppState = {
  bookmakersList: [],
  app: {},
  timezone: {
    active: AppUtils.getLocalStoreItem({ name: 'selected_timezone', type: null }) || geDefaultTz(),
    default: '',
    list: [],
  },
  languages: [],
  oddsBugBookmakers: [],
  sports: [],
  activeSport: {
    id: 1,
    name: 'Soccer',
    icon: 'https://cdndev.oddsbug.com/sports/soccer.svg',
  },
  isLoading: false,
  selectedLanguage: {
    code: 'en',
  },
};

export const getAppDetails = createAsyncThunk('app/details', async () => {
  const response = await apiServer.get('/site-details');
  return response;
});

export const getBookmakers = createAsyncThunk('bookmarker_list/getAllBookmarkers', async () => {
  const response = await apiServer.get('/bookmakers/list');
  return response;
});

export const bookmarkerApp = createSlice({
  name: 'bookmarker_list',
  initialState,
  reducers: {
    updateBookmaker(state, action: PayloadAction<TAppBookMaker[]>) {
      state.oddsBugBookmakers = action.payload;
    },

    setActiveLanguages(state, action: PayloadAction<any>) {
      state.selectedLanguage = action.payload;
      localStorage.setItem(SELECTED_LANG, JSON.stringify(state.selectedLanguage));
    },
    setTimeZone(state, action: PayloadAction<string>) {
      state.timezone.active = action.payload;
      AppUtils.saveLocalStoreItem({ name: 'selected_timezone', data: action.payload });
    },
    setActiveSport(state, action: PayloadAction<any>) {
      state.activeSport = action.payload;
    },
  },
  extraReducers: {
    [getAppDetails.pending.toString()]: (state) => {
      state.isLoading = true;
    },
    [getAppDetails.fulfilled.toString()]: (state, action: PayloadAction<any>) => {
      const response = action.payload?.data?.data;
      // format sports to lowercase and  change soccer to football
      const allSports = response.sports;

      state.app = response;
      state.sports = allSports;
      // eslint-disable-next-line prefer-destructuring
      state.activeSport = allSports[0];
      state.languages = response.translations;
      state.timezone.list = response.timezones;
      const selectedLanguage = localStorage.getItem(SELECTED_LANG);
      state.selectedLanguage = JSON.parse(String(selectedLanguage)) || response?.translations[0];
      state.isLoading = false;
    },
    [getAppDetails.rejected.toString()]: (state) => {
      state.isLoading = false;
    },
    [getBookmakers.fulfilled.toString()]: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      const response = action.payload;
      state.bookmakersList = response?.data?.data;
    },
  },
});

export const { updateBookmaker, setActiveSport, setActiveLanguages, setTimeZone } =
  bookmarkerApp.actions;

export default bookmarkerApp.reducer;
