import type { TFunction } from 'i18next';
import type { CourseLevel, LessonSectionId } from '../types';
import { LESSON_SECTIONS } from '../constants/courses';
import { messages } from '../i18n/resources';

type LessonSectionField = 'heading' | 'hint';

export const lessonSectionKey = <F extends LessonSectionField>(id: LessonSectionId, field: F) =>
  `courses.sections.${id}.${field}` as const;

export const levelKey = (level: CourseLevel) => `courses.levels.${level}` as const;

export const englishLessonHeading = (id: LessonSectionId): string => messages.en.courses.sections[id].heading;

const normalizeHeading = (text: string): string => text.toLowerCase().replace(/[^\p{L}\p{M}\p{N}]+/gu, '');

const SECTION_LOOKUP = new Map<string, LessonSectionId>();
LESSON_SECTIONS.forEach(id =>
  [id, messages.en.courses.sections[id].heading, messages.km.courses.sections[id].heading].forEach(label =>
    SECTION_LOOKUP.set(normalizeHeading(label), id)
  )
);

export const resolveLessonSection = (headingText: string): LessonSectionId | undefined =>
  SECTION_LOOKUP.get(normalizeHeading(headingText));

export const formatMinutes = (t: TFunction, total: number): string =>
  total < 60
    ? t('courses.minutes', { minutes: total })
    : t('courses.hoursMinutes', { hours: Math.floor(total / 60), minutes: total % 60 });
