import { createContext } from 'react';

export type Theme = 'light' | 'dark';

const ThemeContext = createContext<Theme>('light');

export default ThemeContext;
