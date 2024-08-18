import { forwardRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../state/store';
import AutoCompleteInput from './AutoCompleteInput';

interface CountryInputProps extends React.HTMLProps<HTMLInputElement> {
  count?: number;
}

const CountryInput = forwardRef<HTMLInputElement, CountryInputProps>(({ count = 5, ...inputProps }, ref) => {
  const countrySuggestions = useSelector((state: RootState) => state.countries.countriesList);

  return <AutoCompleteInput {...inputProps} ref={ref} suggestions={countrySuggestions} count={count} />;
});

export default CountryInput;
