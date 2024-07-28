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
    setFromSearchString: (state, action: PayloadAction<string>) => {
      const { q, p, details } = Object.fromEntries(new URLSearchParams(action.payload).entries());
      return {
        ...state,
        query: q ?? state.query,
        page: parseInt(p) || state.page,
        details: isNaN(parseInt(details)) ? state.details : parseInt(details),
      };
    },
  },
});

const searchResultsReducer = searchResultsSlice.reducer;

export const { setQuery, setPage, setDetails, setFromSearchString } = searchResultsSlice.actions;
export default searchResultsReducer;
