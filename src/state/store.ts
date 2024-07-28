import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { swApi } from '../services/swApi/sw';
import searchBarReducer from './searchBar/searchBarSlice';
import searchResultsReducer from './searchResults/searchResultsSlice';
import selectedItemsReducer from './selectedItems/selectedItemsSlice';

const rootReducer = combineReducers({
  searchBar: searchBarReducer,
  searchResults: searchResultsReducer,
  selectedItems: selectedItemsReducer,
  [swApi.reducerPath]: swApi.reducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(swApi.middleware),
    preloadedState,
  });
};

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = typeof store.dispatch;
