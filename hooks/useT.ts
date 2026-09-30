import { useTranslation } from 'react-i18next';
import type { Language } from '../types';

export const useT = (lang: Language) => useTranslation('translation', { lng: lang }).t;
