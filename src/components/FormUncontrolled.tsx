import CountryInput from './CountryInput';

const FormUncontrolled = () => {
  return (
    <form>
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
        <input type='password' id='password' name='new-password' autoComplete='new-password' />
      </div>
      <div>
        <label htmlFor='confirm-password'>Password Confirmation</label>
        <input type='password' id='confirm-password' name='confirm-new-password' autoComplete='new-password' />
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
            <input type='checkbox' id='accept' name='accept' />
            <label htmlFor='accept'>I accept T&C</label>
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
      <button type='button'>Submit</button>
    </form>
  );
};

export default FormUncontrolled;
