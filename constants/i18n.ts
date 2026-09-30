import type { Language } from '../types';

export const LANGUAGES: readonly Language[] = ['en', 'km'];

export const DEFAULT_LANGUAGE: Language = 'en';

export const OG_LOCALES: Record<Language, string> = {
  en: 'en_US',
  km: 'km_KH'
};

export const LANGUAGE_FLAGS: Record<Language, string> = {
  en: '/flags/united-kingdom.png',
  km: '/flags/cambodia.png'
};
