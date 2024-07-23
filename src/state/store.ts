import { configureStore } from '@reduxjs/toolkit';
import { swApi } from '../services/swApi/sw';
import searchBarReducer from './searchBar/searchBarSlice';
import searchResultsReducer from './searchResults/searchResultsSlice';

export const store = configureStore({
  reducer: {
    searchBar: searchBarReducer,
    searchResults: searchResultsReducer,
    [swApi.reducerPath]: swApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(swApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
