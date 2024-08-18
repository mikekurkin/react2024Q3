import { combineReducers, configureStore } from '@reduxjs/toolkit';
import countriesReducer from './countries/countriesSlice';
import formDataReducer from './formData/formDataSlice';

const rootReducer = combineReducers({
  countries: countriesReducer,
  formData: formDataReducer,
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
