import { useState } from 'react';

interface AutoCompleteInputProps extends React.HTMLProps<HTMLInputElement> {
  suggestions: string[];
  count?: number;
}

const AutoCompleteInput = ({ suggestions, count = 5, ...inputProps }: AutoCompleteInputProps) => {
  const [value, setValue] = useState(inputProps.value?.toString() ?? '');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const validSuggestions = suggestions.filter((s) => s.toLowerCase().startsWith(value.toLowerCase())).slice(0, count);

  return (
    <>
      <input
        {...inputProps}
        type='text'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setShowSuggestions(true)}
      />
      {showSuggestions ? (
        <ul role='listbox'>
          {validSuggestions.map((s) => (
            <li
              role='option'
              onClick={() => {
                setValue(s);
                setShowSuggestions(false);
              }}
            >
              {s}
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
};

export default AutoCompleteInput;
