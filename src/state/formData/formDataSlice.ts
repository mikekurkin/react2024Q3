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

export interface FormDataEntryPayload extends Omit<FormDataEntry, 'createdAt'> {}

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
    addEntry: (state, { payload }: PayloadAction<FormDataEntryPayload>) => {
      state.entries.push({ ...payload, createdAt: new Date() });
    },
  },
});

const formDataReducer = formDataSlice.reducer;

export const { addEntry } = formDataSlice.actions;
export default formDataReducer;
