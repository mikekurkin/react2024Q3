import { ChangeEventHandler, forwardRef, useState } from 'react';
import passwordEntropy from '../utils/passwordEntropy';

interface PasswordInputProps extends React.HTMLProps<HTMLInputElement> {}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(({ ...inputProps }, ref) => {
  const [value, setValue] = useState(inputProps.value ?? '');
  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.target.value);
    if (inputProps.onChange) inputProps.onChange(event);
  };

  return (
    <input
      {...inputProps}
      type='password'
      value={value}
      onChange={handleChange}
      ref={ref}
      data-strength={Math.min(Math.round(passwordEntropy(value.toString()) / 20), 5)}
    />
  );
});

export default PasswordInput;
