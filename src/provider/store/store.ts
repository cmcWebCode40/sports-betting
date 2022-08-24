import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import leagues from '../features/leagues/leagues';
import auth from '../features/auth/auth';
import bookmarkers from '../features/bookmarkers';
import coupons from '../features/coupon/coupon';
import liveMatch from '../features/livescore/index';

export const store = configureStore({
  reducer: {
    authentication: auth,
    sportsLeagues: leagues,
    bookmarkers,
    coupons,
    liveMatch,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [
        'bookmarker_list/getAllBookmarkers/fulfilled',
        'app/details/fulfilled',
        'bookmarker_list/getAllBookmarkers/pending',
      ],
      ignoredActionPaths: [
        'meta.arg',
        'bookmarker_list/getAllBookmarkers/fulfilled',
        'app/details/fulfilled',
        'bookmarker_list/getAllBookmarkers/pending',
      ],
    },
  }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
