import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Language } from '../types';
import { STORAGE_KEYS } from '../constants/storage';
import { isLanguage, toLanguage } from '../utils/i18n';
import { readStorage, writeStorage } from '../utils/storage';

export const useLanguageParam = (): Language => toLanguage(useParams<{ lang?: string }>().lang);

export const usePersistedLanguage = (urlSegment: string | undefined) => {
  const [language, setLanguage] = useState<Language>(() =>
    isLanguage(urlSegment) ? urlSegment : toLanguage(readStorage(STORAGE_KEYS.language))
  );

  const changeLanguage = useCallback((next: Language) => {
    setLanguage(next);
    writeStorage(STORAGE_KEYS.language, next);
  }, []);

  useEffect(() => {
    if (isLanguage(urlSegment)) changeLanguage(urlSegment);
  }, [urlSegment, changeLanguage]);

  return { language, changeLanguage };
};
