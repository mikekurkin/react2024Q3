import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FormDataEntry {
  firstname: string;
  age: number;
  email: string;
  passwordHash: string;
  gender: string;
  terms: boolean;
  avatarB64: string | null;
  country: string;
  createdAt: Date;
}

export interface FormData {
  entries: FormDataEntry[];
}

const initialState: FormData = {
  entries: [],
};

const formDataSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    addEntry: (state, { payload }: PayloadAction<FormDataEntry>) => {
      state.entries.push(payload);
    },
  },
});

const formDataReducer = formDataSlice.reducer;

export const { addEntry } = formDataSlice.actions;
export default formDataReducer;
