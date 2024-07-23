import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SearchResultsState {
  query: string;
  page: number;
  details: number | null;
  isLoading: boolean;
}

const initialState: SearchResultsState = {
  query: '',
  page: 1,
  details: null,
  isLoading: false,
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
    setIsLoading: (state, action: PayloadAction<boolean>) => ({
      ...state,
      isLoading: action.payload,
    }),
  },
});

const searchResultsReducer = searchResultsSlice.reducer;

export const { setQuery, setPage, setDetails, setIsLoading } = searchResultsSlice.actions;
export default searchResultsReducer;
