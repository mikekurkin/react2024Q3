import { useEffect, useState } from 'react';
import { Theme } from '../context/ThemeContext';

export function usePreferredTheme(): [Theme, (theme: Theme) => void] {
  const darkThemeMatcher = window.matchMedia('(prefers-color-scheme: dark)');

  const [preferredTheme, setPreferredTheme] = useState<Theme>(darkThemeMatcher.matches ? 'dark' : 'light');

  useEffect(() => {
    const updateTheme = (e: MediaQueryListEvent) => {
      setPreferredTheme(e.matches ? 'dark' : 'light');
    };

    darkThemeMatcher.addEventListener('change', updateTheme);

    return () => {
      darkThemeMatcher.removeEventListener('change', updateTheme);
    };
  }, [darkThemeMatcher, preferredTheme]);

  return [preferredTheme, setPreferredTheme];
}
