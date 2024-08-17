import * as yup from 'yup';
import { store } from '../state/store';
import { fileSizeValidator, fileTypeValidator } from '../utils/fileValidators';

export const formEntrySchema = yup
  .object()
  .shape({
    firstname: yup.string().required(),
    age: yup.number().positive().required(),
    email: yup.string().email().required(),
    newPassword: yup.string().required(),
    confirmNewPassword: yup
      .string()
      .required()
      .oneOf([yup.ref('newPassword')], 'Confirmation should match'),
    gender: yup.string().oneOf(['male', 'female']).defined(),
    terms: yup.boolean().isTrue().required(),
    avatar: yup
      .mixed()
      .default(null)
      .test('fileType', 'File not supported', fileTypeValidator(['image/jpg', 'image/jpeg', 'image/png']))
      .test('fileSize', 'File too large', fileSizeValidator(2097152)),
    country: yup
      .string()
      .oneOf(store.getState().countries.countriesList, 'Country must be one from the list')
      .required(),
    createdAt: yup.date().default(new Date()),
  })
  .omit(['confirmNewPassword'])
  .camelCase();

export interface FormEntry extends yup.InferType<typeof formEntrySchema> {}
