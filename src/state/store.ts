import { combineReducers, configureStore } from '@reduxjs/toolkit';
import countriesReducer from './countries/countriesSlice';

const rootReducer = combineReducers({
  countries: countriesReducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = typeof store.dispatch;
