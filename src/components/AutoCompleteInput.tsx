import { forwardRef, useState } from 'react';

interface AutoCompleteInputProps extends React.HTMLProps<HTMLInputElement> {
  suggestions: string[];
  count?: number;
}

const AutoCompleteInput = forwardRef<HTMLInputElement, AutoCompleteInputProps>(
  ({ suggestions, count = 5, ...inputProps }, ref) => {
    const [value, setValue] = useState(inputProps.value?.toString() ?? '');
    const [inputFocused, setInputFocused] = useState(false);
    const [hoveringSuggestions, setHoveringSuggestions] = useState(false);
    const validSuggestions = suggestions.filter((s) => s.toLowerCase().startsWith(value.toLowerCase())).slice(0, count);
    const [selectedSuggestion, setSelectedSuggestion] = useState<number | null>(null);

    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
      switch (e.key) {
        case 'Tab':
        case 'Enter':
          if (inputFocused && validSuggestions.length > 0) {
            e.preventDefault();
            setValue(validSuggestions[selectedSuggestion ?? 0]);
            setInputFocused(false);
          }
          break;
        case 'ArrowDown':
          if (inputFocused && validSuggestions.length > 0 && (selectedSuggestion ?? -1) < validSuggestions.length - 1) {
            e.preventDefault();
            setSelectedSuggestion((selectedSuggestion ?? -1) + 1);
          }
          break;
        case 'ArrowUp':
          if (inputFocused && validSuggestions.length > 0 && (selectedSuggestion ?? -1) > 0) {
            e.preventDefault();
            setSelectedSuggestion((selectedSuggestion ?? -1) - 1);
          }
          break;
        case 'Escape':
          setInputFocused(false);
          break;
        default:
          setSelectedSuggestion(null);
          setInputFocused(true);
      }
    };

    return (
      <div role='autocomplete'>
        <input
          {...inputProps}
          type='text'
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
            if (inputProps.onChange) inputProps.onChange(event);
          }}
          onKeyDown={(event) => {
            handleKeyDown(event);
            if (inputProps.onKeyDown) inputProps.onKeyDown(event);
          }}
          onFocus={(event) => {
            setInputFocused(true);
            if (inputProps.onFocus) inputProps.onFocus(event);
          }}
          onBlur={(event) => {
            setInputFocused(false);
            if (inputProps.onBlur) inputProps.onBlur(event);
          }}
          ref={ref}
        />
        {inputFocused || hoveringSuggestions ? (
          <ul
            role='listbox'
            onMouseOver={() => setHoveringSuggestions(true)}
            onMouseOut={() => setHoveringSuggestions(false)}
          >
            {validSuggestions.map((s, i) => (
              <li
                className={i == selectedSuggestion ? 'active' : ''}
                role='option'
                onClick={() => {
                  setValue(s);
                  setHoveringSuggestions(false);
                }}
              >
                {s}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    );
  }
);

export default AutoCompleteInput;
