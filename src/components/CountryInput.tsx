import { useSelector } from 'react-redux';
import { RootState } from '../state/store';
import AutoCompleteInput from './AutoCompleteInput';

interface CountryInputProps extends React.HTMLProps<HTMLInputElement> {
  count?: number;
}

const CountryInput = ({ count = 5, ...inputProps }: CountryInputProps) => {
  const countrySuggestions = useSelector((state: RootState) => state.countries.countriesList);

  return <AutoCompleteInput {...inputProps} suggestions={countrySuggestions} count={count} />;
};

export default CountryInput;
