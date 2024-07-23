import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
});

const searchBarReducer = searchBarSlice.reducer;

export const { setValue } = searchBarSlice.actions;
export default searchBarReducer;
