import fs from 'node:fs';
import path from 'node:path';
import type { CollectionId, Language, RoadmapId } from '../types';
import { COLLECTION_IDS, KNOWLEDGE_PATH_PATTERN, isCollectionId } from '../constants/collections';
import { COURSE_PATH_PATTERN, DEFAULT_LESSON_MINUTES } from '../constants/courses';
import { DEFAULT_LANGUAGE, LANGUAGES } from '../constants/i18n';
import { ROADMAP_IDS } from '../constants/roadmaps';
import {
  CONTENT_LICENSE_URL,
  SEARCH_ALTERNATE_NAMES,
  SEARCH_SITE_NAME,
  SHARE_IMAGE,
  SITE_NAME,
  SITE_URL
} from '../constants/site';
import { asDate, asNumber, asString, asStrings } from '../utils/frontmatter';
import { collectionKey, roadmapKey } from '../utils/i18n';
import {
  collectionUrl,
  contributeUrl,
  courseUrl,
  coursesUrl,
  homeUrl,
  howToThinkUrl,
  lessonUrl,
  roadmapUrl,
  roadmapsUrl,
  topicUrl
} from '../utils/routes';
import { absoluteUrl, metaDescription } from '../utils/seo';
import { readEntries } from './contentIndexPlugin';

export interface SitePage {
  path: string;
  lang: Language;
  title: string;
  description: string;
  canonical: string;
  alternates: Partial<Record<Language, string>>;
  type: 'website' | 'article';
  updated?: string;
  jsonLd: object[];
}

type ByLanguage<T> = Partial<Record<Language, T>>;

interface ContentMeta {
  title: string;
  summary: string;
  updated?: string;
  contributors: string[];
  minutes: number;
}

const DATE = /^\d{4}-\d{2}-\d{2}$/;

const toMeta = (fm: Record<string, unknown>, fallbackTitle: string): ContentMeta => {
  const title = asString(fm.title, fallbackTitle);
  const updated = asDate(fm.updated);
  return {
    title,
    summary: asString(fm.summary) || asString(fm.question, title),
    updated: updated && DATE.test(updated) ? updated : undefined,
    contributors: asStrings(fm.contributors),
    minutes: asNumber(fm.minutes, DEFAULT_LESSON_MINUTES)
  };
};

const loadMessages = (root: string): Record<Language, Record<string, unknown>> => {
  const load = (lang: Language): Record<string, unknown> => {
    const dir = path.join(root, 'i18n', 'locales', lang);
    if (!fs.existsSync(dir)) return {};
    return Object.fromEntries(
      fs
        .readdirSync(dir)
        .filter(file => file.endsWith('.json'))
        .map(file => [path.basename(file, '.json'), JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8'))])
    );
  };
  return { en: load('en'), km: load('km') };
};

const lookup = (messages: Record<string, unknown>, key: string): string | undefined => {
  const value = key.split('.').reduce<unknown>((node, part) => (node as Record<string, unknown>)?.[part], messages);
  return typeof value === 'string' ? value.replace(/<[^>]+>/g, '') : undefined;
};

const eachLanguage = <T>(entry: ByLanguage<T>): { lang: Language; shown: Language; page: T }[] =>
  LANGUAGES.flatMap(lang => {
    const shown = entry[lang] ? lang : LANGUAGES.find(other => entry[other]);
    return shown ? [{ lang, shown, page: entry[shown] as T }] : [];
  });

const availableIn = <T>(entry: ByLanguage<T>, url: (lang: Language) => string): ByLanguage<string> =>
  Object.fromEntries(LANGUAGES.filter(lang => entry[lang]).map(lang => [lang, url(lang)]));

const organization = {
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: absoluteUrl(SHARE_IMAGE.path)
};

const breadcrumbs = (items: [string, string][]): object => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, itemPath], index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name,
    item: absoluteUrl(itemPath)
  }))
});

const authors = (contributors: string[]): object[] =>
  contributors.map(name => ({ '@type': 'Person', name, url: `https://github.com/${name}` }));

export const sitePages = (root: string): SitePage[] => {
  const messages = loadMessages(root);
  const t = (lang: Language, key: string): string =>
    lookup(messages[lang], key) ?? lookup(messages[DEFAULT_LANGUAGE], key) ?? key;

  const pages: SitePage[] = [];
  const bothLanguages = (url: (lang: Language) => string): ByLanguage<string> =>
    Object.fromEntries(LANGUAGES.map(lang => [lang, url(lang)]));

  const addStatic = (
    url: (lang: Language) => string,
    title: (lang: Language) => string,
    description: (lang: Language) => string,
    trail: (lang: Language) => [string, string][]
  ): void => {
    for (const lang of LANGUAGES) {
      pages.push({
        path: url(lang),
        lang,
        title: title(lang),
        description: metaDescription(description(lang)),
        canonical: url(lang),
        alternates: bothLanguages(url),
        type: 'website',
        jsonLd: trail(lang).length > 1 ? [breadcrumbs(trail(lang))] : []
      });
    }
  };

  const home = (lang: Language): [string, string] => [SITE_NAME, homeUrl(lang)];

  for (const lang of LANGUAGES) {
    pages.push({
      path: homeUrl(lang),
      lang,
      title: t(lang, 'meta.homeTitle'),
      description: metaDescription(t(lang, 'home.heroLead')),
      canonical: homeUrl(lang),
      alternates: bothLanguages(homeUrl),
      type: 'website',
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: SEARCH_SITE_NAME,
          alternateName: SEARCH_ALTERNATE_NAMES,
          // Google reads a site name only from the domain root, so every home page names that URL.
          url: absoluteUrl('/'),
          inLanguage: lang,
          description: metaDescription(t(lang, 'home.heroLead')),
          publisher: organization
        }
      ]
    });
  }

  const navPage = (url: (lang: Language) => string, label: string, lead: string): void =>
    addStatic(
      url,
      lang => t(lang, label),
      lang => t(lang, lead),
      lang => [home(lang), [t(lang, label), url(lang)]]
    );

  navPage(howToThinkUrl, 'nav.howToThink', 'howToThink.lead');
  navPage(contributeUrl, 'nav.contribute', 'contribute.lead');
  navPage(roadmapsUrl, 'nav.roadmaps', 'roadmaps.lead');
  navPage(coursesUrl, 'nav.courses', 'courses.lead');

  for (const id of ROADMAP_IDS as readonly RoadmapId[]) {
    addStatic(
      lang => roadmapUrl(lang, id),
      lang => t(lang, roadmapKey(id, 'label')),
      lang => t(lang, roadmapKey(id, 'summary')),
      lang => [
        home(lang),
        [t(lang, 'nav.roadmaps'), roadmapsUrl(lang)],
        [t(lang, roadmapKey(id, 'label')), roadmapUrl(lang, id)]
      ]
    );
  }

  for (const id of COLLECTION_IDS) {
    addStatic(
      lang => collectionUrl(lang, id),
      lang => t(lang, collectionKey(id, 'label')),
      lang => t(lang, collectionKey(id, 'description')),
      lang => [home(lang), [t(lang, collectionKey(id, 'label')), collectionUrl(lang, id)]]
    );
  }

  const topics = new Map<string, { collection: CollectionId; slug: string; byLang: ByLanguage<ContentMeta> }>();
  for (const { sourcePath, frontmatter } of readEntries(path.join(root, 'knowledge'), root)) {
    const match = sourcePath.match(KNOWLEDGE_PATH_PATTERN);
    if (!match || !isCollectionId(match[1])) continue;
    const [, collection, slug, lang] = match as unknown as [string, CollectionId, string, Language];
    const ref = `${collection}/${slug}`;
    const topic = topics.get(ref) ?? { collection, slug, byLang: {} };
    topic.byLang[lang] = toMeta(frontmatter, slug);
    topics.set(ref, topic);
  }

  for (const { collection, slug, byLang } of topics.values()) {
    const url = (lang: Language): string => topicUrl(lang, { collection, slug });
    for (const { lang, shown, page } of eachLanguage(byLang)) {
      const description = metaDescription(page.summary);
      pages.push({
        path: url(lang),
        lang,
        title: page.title,
        description,
        canonical: url(shown),
        alternates: availableIn(byLang, url),
        type: 'article',
        updated: page.updated,
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'TechArticle',
            headline: page.title,
            description,
            inLanguage: shown,
            url: absoluteUrl(url(shown)),
            mainEntityOfPage: absoluteUrl(url(shown)),
            ...(page.updated && { dateModified: page.updated }),
            ...(page.contributors.length && { author: authors(page.contributors) }),
            publisher: organization,
            license: CONTENT_LICENSE_URL,
            isAccessibleForFree: true
          },
          breadcrumbs([
            home(lang),
            [t(lang, collectionKey(collection, 'label')), collectionUrl(lang, collection)],
            [page.title, url(lang)]
          ])
        ]
      });
    }
  }

  const courses = new Map<string, { byLang: ByLanguage<ContentMeta>; lessons: Map<string, ByLanguage<ContentMeta>> }>();
  for (const { sourcePath, frontmatter } of readEntries(path.join(root, 'courses'), root)) {
    const match = sourcePath.match(COURSE_PATH_PATTERN);
    if (!match) continue;
    const [, courseSlug, , lessonSlug, lang] = match as unknown as [
      string,
      string,
      string,
      string | undefined,
      Language
    ];
    const course = courses.get(courseSlug) ?? { byLang: {}, lessons: new Map() };
    if (lessonSlug) {
      course.lessons.set(lessonSlug, { ...course.lessons.get(lessonSlug), [lang]: toMeta(frontmatter, lessonSlug) });
    } else {
      course.byLang[lang] = toMeta(frontmatter, courseSlug);
    }
    courses.set(courseSlug, course);
  }

  for (const [courseSlug, { byLang, lessons }] of courses) {
    const url = (lang: Language): string => courseUrl(lang, courseSlug);
    const courseIn = new Map(eachLanguage(byLang).map(entry => [entry.lang, entry]));
    for (const { lang, shown, page } of courseIn.values()) {
      const description = metaDescription(page.summary);
      pages.push({
        path: url(lang),
        lang,
        title: page.title,
        description,
        canonical: url(shown),
        alternates: availableIn(byLang, url),
        type: 'website',
        updated: page.updated,
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'Course',
            name: page.title,
            description,
            inLanguage: shown,
            url: absoluteUrl(url(shown)),
            provider: organization,
            isAccessibleForFree: true,
            license: CONTENT_LICENSE_URL
          },
          breadcrumbs([home(lang), [t(lang, 'nav.courses'), coursesUrl(lang)], [page.title, url(lang)]])
        ]
      });
    }

    for (const [lessonSlug, lessonByLang] of lessons) {
      const lessonPath = (lang: Language): string => lessonUrl(lang, { course: courseSlug, slug: lessonSlug });
      for (const { lang, shown, page } of eachLanguage(lessonByLang)) {
        const course = courseIn.get(lang);
        if (!course) continue;
        const description = metaDescription(page.summary);
        pages.push({
          path: lessonPath(lang),
          lang,
          title: `${page.title} · ${course.page.title}`,
          description,
          canonical: lessonPath(shown),
          alternates: availableIn(lessonByLang, lessonPath),
          type: 'article',
          updated: page.updated,
          jsonLd: [
            {
              '@context': 'https://schema.org',
              '@type': 'LearningResource',
              name: page.title,
              description,
              inLanguage: shown,
              url: absoluteUrl(lessonPath(shown)),
              learningResourceType: 'lesson',
              timeRequired: `PT${page.minutes}M`,
              isPartOf: { '@type': 'Course', name: course.page.title, url: absoluteUrl(url(course.shown)) },
              ...(page.updated && { dateModified: page.updated }),
              ...(page.contributors.length && { author: authors(page.contributors) }),
              publisher: organization,
              isAccessibleForFree: true,
              license: CONTENT_LICENSE_URL
            },
            breadcrumbs([
              home(lang),
              [t(lang, 'nav.courses'), coursesUrl(lang)],
              [course.page.title, url(lang)],
              [page.title, lessonPath(lang)]
            ])
          ]
        });
      }
    }
  }

  return pages;
};
