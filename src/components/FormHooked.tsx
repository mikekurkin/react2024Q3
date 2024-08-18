import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { hash } from 'bcryptjs';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FormEntry, formEntrySchema } from '../schemas/formEntrySchema';
import { addEntry, FormDataEntryPayload } from '../state/formData/formDataSlice';
import base64 from '../utils/base64';
import CountryInput from './CountryInput';
import PasswordInput from './PasswordInput';

const FormHooked = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onTouched', resolver: yupResolver(formEntrySchema) });

  const fieldError = (fieldName: keyof typeof errors) => errors[fieldName]?.message;

  const saveEntry: SubmitHandler<FormEntry> = (data) => {
    const { avatar, newPassword, ...castFormEntry } = formEntrySchema
      .omit(['confirmNewPassword'])
      .cast(data, { stripUnknown: true });
    const formDataEntry: FormDataEntryPayload = {
      ...castFormEntry,
      passwordHash: '',
      avatarB64: null,
    };

    Promise.all([
      base64.encode(avatar as FileList).then((value) => (formDataEntry.avatarB64 = value)),
      hash(newPassword.toString(), 10).then((value) => (formDataEntry.passwordHash = value)),
    ]).then(() => {
      console.log(formDataEntry);
      dispatch(addEntry(formDataEntry));
      navigate('/');
    });
  };

  return (
    <form onSubmit={handleSubmit(saveEntry, console.log)} noValidate>
      <div data-error={fieldError('firstname')}>
        <label htmlFor='name'>Name</label>
        <input type='text' id='name' autoComplete='firstname' {...register('firstname')} />
      </div>
      <div data-error={fieldError('age')}>
        <label htmlFor='age'>Age</label>
        <input type='number' id='age' autoComplete='age' {...register('age')} />
      </div>
      <div data-error={fieldError('email')}>
        <label htmlFor='email'>Email</label>
        <input type='email' id='email' {...register('email')} />
      </div>
      <div data-error={fieldError('newPassword')}>
        <label htmlFor='password'>Password</label>
        <PasswordInput id='password' autoComplete='new-password' {...register('newPassword')} />
      </div>
      <div data-error={fieldError('confirmNewPassword')}>
        <label htmlFor='confirm-password'>Password Confirmation</label>
        <PasswordInput id='confirm-password' autoComplete='new-password' {...register('confirmNewPassword')} />
      </div>
      <div data-error={fieldError('gender')}>
        <label htmlFor='gender'>Gender</label>
        <fieldset id='gender'>
          <legend>Gender</legend>
          <div>
            <input type='radio' id='male' value='male' {...register('gender')} />
            <label htmlFor='male'>Male</label>
          </div>
          <div>
            <input type='radio' id='female' value='female' {...register('gender')} />
            <label htmlFor='female'>Female</label>
          </div>
        </fieldset>
      </div>
      <div data-error={fieldError('terms')}>
        <label htmlFor='terms'>Terms and Conditions</label>
        <fieldset id='terms'>
          <div>
            <input type='checkbox' id='termsCB' value='true' {...register('terms')} />
            <label htmlFor='termsCB'>I accept T&C</label>
          </div>
        </fieldset>
      </div>
      <div data-error={fieldError('avatar')}>
        <label htmlFor='avatar'>Avatar</label>
        <input type='file' id='avatar' accept='.jpg,.jpeg,.png' {...register('avatar')} />
      </div>
      <div data-error={fieldError('country')}>
        <label htmlFor='country'>Country</label>
        <Controller
          name='country'
          control={control}
          render={({ field }) => <CountryInput id='country' autoComplete='off' {...field} />}
        />
      </div>
      <button type='submit'>Submit</button>
    </form>
  );
};

export default FormHooked;
