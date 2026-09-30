import type { CollectionId, Language, NavId, RoadmapId } from '../types';
import { DEFAULT_LANGUAGE, LANGUAGES } from '../constants/i18n';

export const isLanguage = (value: unknown): value is Language => LANGUAGES.includes(value as Language);

export const toLanguage = (value: unknown): Language => (isLanguage(value) ? value : DEFAULT_LANGUAGE);

export const otherLanguage = (lang: Language): Language => (lang === 'en' ? 'km' : 'en');

const LANGUAGE_PREFIX = new RegExp(`^/(${LANGUAGES.join('|')})(?=/|$)`);

export const hasLanguagePrefix = (pathname: string): boolean => LANGUAGE_PREFIX.test(pathname);

export const stripLanguagePrefix = (pathname: string): string => pathname.replace(LANGUAGE_PREFIX, '');

export const withLanguagePrefix = (pathname: string, lang: Language): string =>
  `/${lang}${stripLanguagePrefix(pathname)}`;

type CollectionField = 'label' | 'singular' | 'description' | 'role';

export const collectionKey = <F extends CollectionField>(id: CollectionId, field: F) =>
  `collections.${id}.${field}` as const;

export const navLabelKey = (id: NavId) =>
  id === 'how-to-think' ? ('nav.howToThink' as const) : collectionKey(id, 'label');

type RoadmapField = 'label' | 'summary' | 'outcome' | 'pace';

export const roadmapKey = <F extends RoadmapField>(id: RoadmapId, field: F) => `roadmaps.roles.${id}.${field}` as const;
