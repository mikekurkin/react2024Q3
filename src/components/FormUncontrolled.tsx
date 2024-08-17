import { hash } from 'bcryptjs';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ValidationError } from 'yup';
import { formEntrySchema } from '../schemas/formEntrySchema';
import { addEntry, FormDataEntryPayload } from '../state/formData/formDataSlice';
import base64 from '../utils/base64';
import CountryInput from './CountryInput';
import PasswordInput from './PasswordInput';

const FormUncontrolled = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);

  const fieldError = (fieldName: string) => validationErrors.filter((err) => err.path === fieldName).pop()?.message;

  const saveEntry: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const formEntry = Object.fromEntries(new FormData(event.currentTarget));
    formEntrySchema
      .validate(formEntry, { abortEarly: false })
      .then(async () => {
        setValidationErrors([]);
        const { avatar, newPassword, ...castFormEntry } = formEntrySchema
          .omit(['confirmNewPassword'])
          .cast(formEntry, { stripUnknown: true });
        const formDataEntry: FormDataEntryPayload = {
          ...castFormEntry,
          passwordHash: '',
          avatarB64: null,
        };
        await Promise.all([
          base64.encode(avatar as File).then((value) => (formDataEntry.avatarB64 = value)),
          hash(newPassword.toString(), 10).then((value) => (formDataEntry.passwordHash = value)),
        ]);
        console.log(formDataEntry);
        dispatch(addEntry(formDataEntry));
        navigate('/');
      })
      .catch((reason) => {
        setValidationErrors(reason.inner);
      });
  };

  return (
    <form onSubmit={saveEntry} noValidate>
      <div data-error={fieldError('firstname')}>
        <label htmlFor='name'>Name</label>
        <input type='text' id='name' name='firstname' autoComplete='firstname' />
      </div>
      <div data-error={fieldError('age')}>
        <label htmlFor='age'>Age</label>
        <input type='number' id='age' name='age' autoComplete='age' />
      </div>
      <div data-error={fieldError('email')}>
        <label htmlFor='email'>Email</label>
        <input type='email' id='email' name='email' />
      </div>
      <div data-error={fieldError('newPassword')}>
        <label htmlFor='password'>Password</label>
        <PasswordInput id='password' name='newPassword' autoComplete='new-password' />
      </div>
      <div data-error={fieldError('confirmNewPassword')}>
        <label htmlFor='confirm-password'>Password Confirmation</label>
        <PasswordInput id='confirm-password' name='confirmNewPassword' autoComplete='new-password' />
      </div>
      <div data-error={fieldError('gender')}>
        <label htmlFor='gender'>Gender</label>
        <fieldset id='gender'>
          <legend>Gender</legend>
          <div>
            <input type='radio' id='male' name='gender' value='male' />
            <label htmlFor='male'>Male</label>
          </div>
          <div>
            <input type='radio' id='female' name='gender' value='female' />
            <label htmlFor='female'>Female</label>
          </div>
        </fieldset>
      </div>
      <div data-error={fieldError('terms')}>
        <label htmlFor='terms'>Terms and Conditions</label>
        <fieldset id='terms'>
          <div>
            <input type='checkbox' id='termsCB' name='terms' value='true' />
            <label htmlFor='termsCB'>I accept T&C</label>
          </div>
        </fieldset>
      </div>
      <div data-error={fieldError('avatar')}>
        <label htmlFor='avatar'>Avatar</label>
        <input type='file' id='avatar' name='avatar' accept='.jpg,.jpeg,.png' />
      </div>
      <div data-error={fieldError('country')}>
        <label htmlFor='country'>Country</label>
        <CountryInput id='country' name='country' autoComplete='off' />
      </div>
      <button type='submit'>Submit</button>
    </form>
  );
};

export default FormUncontrolled;
