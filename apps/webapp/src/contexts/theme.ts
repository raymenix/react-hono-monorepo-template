import { createContext } from 'react';

export type Theme = 'dark' | 'light' | 'system';

export type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

export type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;

  computedTheme: 'dark' | 'light';
};

export const ThemeContext = createContext<ThemeProviderState | null>(null);
