import { useCallback, useEffect, useState } from 'react';
import type { ThemeMode } from '../types';
import { STORAGE_KEYS } from '../constants/storage';
import { readStorage, writeStorage } from '../utils/storage';

const initialTheme = (): ThemeMode => {
  const saved = readStorage(STORAGE_KEYS.theme);
  if (saved === 'dark' || saved === 'light') return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const useTheme = () => {
  const [themeMode, setThemeMode] = useState<ThemeMode>(initialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', themeMode === 'dark');
  }, [themeMode]);

  const toggleTheme = useCallback(() => {
    const next: ThemeMode = themeMode === 'dark' ? 'light' : 'dark';
    writeStorage(STORAGE_KEYS.theme, next);
    setThemeMode(next);
  }, [themeMode]);

  return { themeMode, toggleTheme };
};
