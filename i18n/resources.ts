import type { Language } from '../types';
import type ai from './locales/en/ai.json';
import type collection from './locales/en/collection.json';
import type collections from './locales/en/collections.json';
import type common from './locales/en/common.json';
import type contribute from './locales/en/contribute.json';
import type courses from './locales/en/courses.json';
import type footer from './locales/en/footer.json';
import type header from './locales/en/header.json';
import type home from './locales/en/home.json';
import type howToThink from './locales/en/howToThink.json';
import type meta from './locales/en/meta.json';
import type method from './locales/en/method.json';
import type nav from './locales/en/nav.json';
import type rail from './locales/en/rail.json';
import type roadmaps from './locales/en/roadmaps.json';
import type search from './locales/en/search.json';
import type topic from './locales/en/topic.json';

export type TranslationResources = {
  ai: typeof ai;
  collection: typeof collection;
  collections: typeof collections;
  common: typeof common;
  contribute: typeof contribute;
  courses: typeof courses;
  footer: typeof footer;
  header: typeof header;
  home: typeof home;
  howToThink: typeof howToThink;
  meta: typeof meta;
  method: typeof method;
  nav: typeof nav;
  rail: typeof rail;
  roadmaps: typeof roadmaps;
  search: typeof search;
  topic: typeof topic;
};

const files = import.meta.glob<Record<string, unknown>>('./locales/*/*.json', { eager: true, import: 'default' });

const byLanguage: Record<string, Record<string, unknown>> = {};
for (const [path, content] of Object.entries(files)) {
  const match = path.match(/^\.\/locales\/([^/]+)\/([^/]+)\.json$/);
  if (!match) continue;
  const [, lang, section] = match;
  (byLanguage[lang] ??= {})[section] = content;
}

if (import.meta.env.DEV) {
  Object.keys(byLanguage.en ?? {})
    .filter(section => !byLanguage.km?.[section])
    .forEach(section => console.warn(`[i18n] locales/km/${section}.json is missing; English is shown instead.`));
}

export const messages = byLanguage as Record<Language, TranslationResources>;

export const resources = {
  en: { translation: messages.en },
  km: { translation: messages.km }
};
