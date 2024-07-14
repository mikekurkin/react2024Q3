import { useState } from 'react';

export function useLocalStorage(key: string): [string, (newValue: string) => void] {
  const [value, setValue] = useState(localStorage.getItem(key) || '');

  return [
    value,
    (newValue: string) => {
      localStorage.setItem(key, newValue);
      setValue(newValue);
    },
  ];
}
