import * as yup from 'yup';
import { store } from '../state/store';
import { fileSizeValidator, fileTypeValidator } from '../utils/fileValidators';
import { passwordEntropyValidator } from '../utils/passwordEntropy';

export const formEntrySchema = yup
  .object()
  .shape({
    firstname: yup
      .string()
      .matches(/\p{Lu}.*/gu, 'name must be capitalized')
      .required(),
    age: yup.number().typeError('age must be a number').positive().required(),
    email: yup.string().email().required(),
    newPassword: yup
      .string()
      .required()
      .test('passwordEntropy', 'password not strong enough', passwordEntropyValidator(40))
      .matches(/[`~!@#$%^&*()\-=_+[{\]}\\]/, 'password should contain special characters')
      .matches(/[0-9]/, 'password should contain digits')
      .matches(/[A-Z]/, 'password should contain uppercase letters')
      .matches(/[a-z]/, 'password should contain lowercase letters'),
    confirmNewPassword: yup
      .string()
      .required()
      .oneOf([yup.ref('newPassword')], 'confirmation should match'),
    gender: yup.string().oneOf(['male', 'female']).defined(),
    terms: yup.boolean().isTrue().required(),
    avatar: yup
      .mixed()
      .default(null)
      .test('fileType', 'file type not supported', fileTypeValidator(['image/jpg', 'image/jpeg', 'image/png']))
      .test('fileSize', 'file too large', fileSizeValidator(2097152)),
    country: yup
      .string()
      .oneOf(store.getState().countries.countriesList, 'country must be one from the list')
      .required(),
  })
  .camelCase();

export interface FormEntry extends yup.InferType<typeof formEntrySchema> {}
