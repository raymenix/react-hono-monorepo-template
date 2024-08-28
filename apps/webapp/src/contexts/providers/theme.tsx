import { useCallback, useEffect, useMemo, useState } from 'react';
import { Theme, ThemeContext, ThemeProviderProps } from '../theme';

const project = import.meta.env.PROJECT;

const storageKeys = {
  theme: `${project}-ui-theme`,
};

const allThemes: Array<Theme> = ['dark', 'light'];

export default function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem(storageKeys.theme) as Theme) || 'system');

  const deviceTheme = useMemo(() => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove(...allThemes);

    if (theme === 'system') {
      root.classList.add(deviceTheme);
      return;
    }

    root.classList.add(theme);
  }, [deviceTheme, theme]);

  const computedTheme = useMemo(() => {
    if (theme === 'system') return deviceTheme;

    return theme;
  }, [deviceTheme, theme]);

  const toggleTheme = useCallback((theme: Theme) => {
    localStorage.setItem(storageKeys.theme, theme);
    setTheme(theme);
  }, []);

  return (
    <ThemeContext.Provider
      {...props}
      value={{
        theme,
        computedTheme,
        setTheme: toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
