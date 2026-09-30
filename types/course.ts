import type { Language } from './i18n';
import type { MdxLoader, TranslatedPage } from './knowledge';

export type CourseLevel = 'beginner' | 'intermediate' | 'advanced';

export interface Course extends TranslatedPage {
  slug: string;
  title: string;
  summary: string;
  level: CourseLevel;
  outcomes: string[];
  prerequisites: string[];
  related: string[];
  order: number;
  updated?: string;
  contributors: string[];
  load: MdxLoader;
}

export interface Lesson extends TranslatedPage {
  course: string;
  slug: string;
  number: number;
  title: string;
  summary: string;
  minutes: number;
  related: string[];
  updated?: string;
  contributors: string[];
  load: MdxLoader;
}

export type LessonIdentity = Pick<Lesson, 'course' | 'slug'>;

export interface Resolved<T> {
  page: T;
  requested: Language;
  isFallback: boolean;
}

export type LessonSectionId = 'problem' | 'idea' | 'example' | 'try-it' | 'check' | 'takeaways';
