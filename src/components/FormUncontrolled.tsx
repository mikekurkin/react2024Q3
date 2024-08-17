import { hash } from 'bcryptjs';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ValidationError } from 'yup';
import { formEntrySchema } from '../schemas/formEntrySchema';
import { addEntry, FormDataEntry } from '../state/formData/formDataSlice';
import base64 from '../utils/base64';
import CountryInput from './CountryInput';

const FormUncontrolled = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);

  const saveEntry: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const formEntry = Object.fromEntries(new FormData(event.currentTarget));
    formEntrySchema
      .validate(formEntry, { abortEarly: false })
      .then(async () => {
        setValidationErrors([]);
        const { avatar, newPassword, ...castFormEntry } = formEntrySchema.cast(formEntry, { stripUnknown: true });
        const formDataEntry: FormDataEntry = {
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
    <form onSubmit={saveEntry}>
      <div>
        <label htmlFor='name'>Name</label>
        <input type='text' id='name' name='firstname' autoComplete='firstname' />
      </div>
      <div>
        <label htmlFor='age'>Age</label>
        <input type='number' id='age' name='age' autoComplete='age' />
      </div>
      <div>
        <label htmlFor='email'>Email</label>
        <input type='email' id='email' name='email' />
      </div>
      <div>
        <label htmlFor='password'>Password</label>
        <input type='password' id='password' name='newPassword' autoComplete='new-password' />
      </div>
      <div>
        <label htmlFor='confirm-password'>Password Confirmation</label>
        <input type='password' id='confirm-password' name='confirmNewPassword' autoComplete='new-password' />
      </div>
      <div>
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
      <div>
        <label htmlFor='terms'>Terms and Conditions</label>
        <fieldset id='terms'>
          <div>
            <input type='checkbox' id='terms' name='terms' value='true' />
            <label htmlFor='terms'>I accept T&C</label>
          </div>
        </fieldset>
      </div>
      <div>
        <label htmlFor='avatar'>Avatar</label>
        <input type='file' id='avatar' name='avatar' accept='.jpg,.jpeg,.png' />
      </div>
      <div>
        <label htmlFor='country'>Country</label>
        <CountryInput id='country' name='country' autoComplete='off' />
      </div>
      <button type='submit'>Submit</button>
      <p>
        {validationErrors.map((e: ValidationError) => (
          <div>{`${e.path}: ${e.message}`}</div>
        ))}
      </p>
    </form>
  );
};

export default FormUncontrolled;
