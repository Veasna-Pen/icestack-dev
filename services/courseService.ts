import { COURSE_INDEX } from 'virtual:course-index';
import type { Course, Language, Lesson, LessonIdentity, MdxLoader, Resolved } from '../types';
import { COURSE_PATH_PATTERN, DEFAULT_LESSON_MINUTES, isCourseLevel } from '../constants/courses';
import { asDate, asNumber, asString, asStrings, asTranslation } from '../utils/frontmatter';
import { resolveRef } from './knowledgeService';

// Keep this lazy glob the only import of these files; metadata comes from `virtual:course-index`.
const loaders = import.meta.glob('/courses/**/*.mdx') as Record<string, MdxLoader>;

type ByLanguage<T> = Partial<Record<Language, T>>;

const coursesBySlug = new Map<string, ByLanguage<Course>>();
const lessonsByCourse = new Map<string, Map<string, ByLanguage<Lesson>>>();

const warn = (message: string): void => {
  if (import.meta.env.DEV) console.warn(`[courses] ${message}`);
};

for (const { sourcePath, frontmatter: fm } of COURSE_INDEX) {
  const match = sourcePath.match(COURSE_PATH_PATTERN);
  const load = loaders['/' + sourcePath];
  if (!match || !load) {
    warn(
      `Skipped ${sourcePath}. Use courses/<course>/<en|km>.mdx for the overview and ` +
        `courses/<course>/<NN>-<lesson>/<en|km>.mdx for a lesson (lowercase, hyphenated).`
    );
    continue;
  }

  const [, courseSlug, number, lessonSlug, lang] = match as unknown as [
    string,
    string,
    string | undefined,
    string | undefined,
    Language
  ];
  const shared = {
    lang,
    translation: asTranslation(fm.translation),
    sourcePath,
    related: asStrings(fm.related),
    updated: asDate(fm.updated),
    contributors: asStrings(fm.contributors),
    load
  };

  if (!lessonSlug) {
    if (fm.level !== undefined && !isCourseLevel(fm.level)) {
      warn(`${sourcePath}: level "${String(fm.level)}" is not beginner, intermediate or advanced.`);
    }
    const course: Course = {
      ...shared,
      slug: courseSlug,
      title: asString(fm.title, courseSlug),
      summary: asString(fm.summary),
      level: isCourseLevel(fm.level) ? fm.level : 'beginner',
      outcomes: asStrings(fm.outcomes),
      prerequisites: asStrings(fm.prerequisites),
      order: asNumber(fm.order, 99)
    };
    coursesBySlug.set(courseSlug, { ...coursesBySlug.get(courseSlug), [lang]: course });
    continue;
  }

  const lesson: Lesson = {
    ...shared,
    course: courseSlug,
    slug: lessonSlug,
    number: Number(number),
    title: asString(fm.title, lessonSlug),
    summary: asString(fm.summary),
    minutes: asNumber(fm.minutes, DEFAULT_LESSON_MINUTES)
  };
  const lessons = lessonsByCourse.get(courseSlug) ?? new Map<string, ByLanguage<Lesson>>();
  lessons.set(lessonSlug, { ...lessons.get(lessonSlug), [lang]: lesson });
  lessonsByCourse.set(courseSlug, lessons);
}

lessonsByCourse.forEach((_, slug) => {
  if (!coursesBySlug.has(slug)) warn(`courses/${slug}/ has lessons but no en.mdx overview, so it is hidden.`);
});

if (import.meta.env.DEV) {
  const pages = [
    ...Array.from(coursesBySlug.values()),
    ...Array.from(lessonsByCourse.values()).flatMap(lessons => Array.from(lessons.values()))
  ].flatMap(entry => Object.values(entry));
  for (const page of pages) {
    for (const ref of page.related) {
      if (!resolveRef(ref, page.lang)) warn(`${page.sourcePath}: related "${ref}" is not a knowledge page.`);
    }
  }
}

const inLanguage = <T>(entry: ByLanguage<T> | undefined, lang: Language): T | undefined =>
  entry && (entry[lang] || entry.en || entry.km);

const resolved = <T extends { lang: Language }>(page: T | undefined, lang: Language): Resolved<T> | undefined =>
  page && { page, requested: lang, isFallback: page.lang !== lang };

export const lessonRef = (lesson: LessonIdentity): string => `${lesson.course}/${lesson.slug}`;

export const listCourses = (lang: Language): Course[] =>
  Array.from(coursesBySlug.values())
    .map(entry => inLanguage(entry, lang))
    .filter((course): course is Course => !!course)
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));

export const resolveCourse = (slug: string, lang: Language): Resolved<Course> | undefined =>
  resolved(inLanguage(coursesBySlug.get(slug), lang), lang);

export const listLessons = (courseSlug: string, lang: Language): Lesson[] =>
  Array.from(lessonsByCourse.get(courseSlug)?.values() ?? [])
    .map(entry => inLanguage(entry, lang))
    .filter((lesson): lesson is Lesson => !!lesson)
    .sort((a, b) => a.number - b.number || a.slug.localeCompare(b.slug));

export const resolveLesson = (courseSlug: string, lessonSlug: string, lang: Language): Resolved<Lesson> | undefined =>
  coursesBySlug.has(courseSlug)
    ? resolved(inLanguage(lessonsByCourse.get(courseSlug)?.get(lessonSlug), lang), lang)
    : undefined;

export const courseMinutes = (courseSlug: string, lang: Language): number =>
  listLessons(courseSlug, lang).reduce((total, lesson) => total + lesson.minutes, 0);
