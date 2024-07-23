import { configureStore } from '@reduxjs/toolkit';
import searchBarReducer from './searchBar/searchBarSlice';
import searchResultsReducer from './searchResults/searchResultsSlice';

export const store = configureStore({
  reducer: {
    searchBar: searchBarReducer,
    searchResults: searchResultsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
