import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SearchResultsState {
  query: string;
  page: number;
  details: number | null;
}

const initialState: SearchResultsState = {
  query: '',
  page: 1,
  details: null,
};

const searchResultsSlice = createSlice({
  name: 'searchResults',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => ({
      ...state,
      page: 1,
      details: null,
      query: action.payload,
    }),
    setPage: (state, action: PayloadAction<number>) => ({
      ...state,
      details: null,
      page: action.payload,
    }),
    setDetails: (state, action: PayloadAction<number | null>) => ({
      ...state,
      details: action.payload,
    }),
  },
});

const searchResultsReducer = searchResultsSlice.reducer;

export const { setQuery, setPage, setDetails } = searchResultsSlice.actions;
export default searchResultsReducer;
