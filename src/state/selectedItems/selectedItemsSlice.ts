import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Person } from '../../services/swApi/types';
import { setQuery } from '../searchResults/searchResultsSlice';

interface SelectionRecord {
  page: number;
  index: number;
  person: Omit<Person, 'homeworld'>;
}

export interface SelectedItemsState {
  selectionRecords: SelectionRecord[];
}

interface AddItemPayload {
  page: number;
  index: number;
  person: Person;
}

interface DelItemPayload {
  page: number;
  index: number;
}

const initialState: SelectedItemsState = { selectionRecords: [] };

const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    addSelectedItem: (state, { payload }: PayloadAction<AddItemPayload>) => {
      const { page, index, person } = payload;
      state.selectionRecords.push({ page, index, person });
    },
    delSelectedItem: (state, { payload }: PayloadAction<DelItemPayload>) => {
      const { page: delPage, index: delIndex } = payload;
      state.selectionRecords = state.selectionRecords.filter(
        (record) => !(record.page === delPage && record.index === delIndex)
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setQuery, () => initialState);
  },
});

const selectedItemsReducer = selectedItemsSlice.reducer;

export const { addSelectedItem, delSelectedItem } = selectedItemsSlice.actions;
export default selectedItemsReducer;
