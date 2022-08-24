import { createSlice } from '@reduxjs/toolkit';
import { ILiveScore } from '../../../models/leagues.model';
import { LIVE_WATCH } from '../../../constants/local-storage.constants';
import { AppUtils } from '../../../utils/functions/app-utils';

const { saveLocalStoreItem, getLocalStoreItem } = AppUtils;

const liveWatchData = getLocalStoreItem({ name: LIVE_WATCH, type: [] });

interface ILiveScoreWatchState {
  watchList: ILiveScore[];
}

const initialState: ILiveScoreWatchState = {
  watchList: liveWatchData,
};

export const LivescoreWatchList = createSlice({
  name: 'livescore_watchList',
  initialState,
  reducers: {
    onAddMatch: (state, action) => {
      const item = action.payload;
      const isItemExist = state.watchList.filter((live: ILiveScore) => live.code === item.code);

      if (isItemExist.length) {
        const newState = state.watchList.map((live: ILiveScore) =>
          live.code === item.code ? item : live,
        );
        state.watchList = newState;
        saveLocalStoreItem({
          data: newState,
          name: LIVE_WATCH,
        });
      } else {
        state.watchList.push(item);
        saveLocalStoreItem({
          data: state.watchList,
          name: LIVE_WATCH,
        });
      }
      return state;
    },
    onRemoveAllMatch: (state /* action */) => {
      state.watchList = [];
      saveLocalStoreItem({
        data: [],
        name: LIVE_WATCH,
      });
      return state;
    },
    onRemoveMatch: (state, action) => {
      const itemId = action.payload;
      const newState = state.watchList.filter((live: ILiveScore) => live.code !== itemId);
      state.watchList = newState;
      saveLocalStoreItem({
        data: newState,
        name: LIVE_WATCH,
      });
      return state;
    },
  },
});

export const { onAddMatch, onRemoveAllMatch, onRemoveMatch } = LivescoreWatchList.actions;

export default LivescoreWatchList.reducer;
