import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setFromSearchString, setQuery } from '../searchResults/searchResultsSlice';

export interface SearchBarState {
  value: string;
}

const initialState: SearchBarState = {
  value: localStorage.getItem('searchBarValue') || '',
};

const searchBarSlice = createSlice({
  name: 'searchBar',
  initialState,
  reducers: {
    setValue: (state, action: PayloadAction<string>) => {
      localStorage.setItem('searchBarValue', action.payload);
      state.value = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setQuery, (state, action) => {
        localStorage.setItem('searchBarValue', action.payload);
        state.value = action.payload;
      })
      .addCase(setFromSearchString, (state, action) => {
        const { q } = Object.fromEntries(new URLSearchParams(action.payload).entries());
        localStorage.setItem('searchBarValue', q ?? state.value);
        state.value = q ?? state.value;
      });
  },
});

const searchBarReducer = searchBarSlice.reducer;

export const { setValue } = searchBarSlice.actions;
export default searchBarReducer;
