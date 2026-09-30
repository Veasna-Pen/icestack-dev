import type { CourseLevel, LessonSectionId } from '../types';

export const COURSE_LEVELS: readonly CourseLevel[] = ['beginner', 'intermediate', 'advanced'];

export const isCourseLevel = (value: unknown): value is CourseLevel => COURSE_LEVELS.includes(value as CourseLevel);

export const LESSON_SECTIONS: readonly LessonSectionId[] = [
  'problem',
  'idea',
  'example',
  'try-it',
  'check',
  'takeaways'
];

export const DEFAULT_LESSON_MINUTES = 10;

export const COURSE_PATH_PATTERN = /^courses\/([a-z0-9-]+)\/(?:(\d+)-([a-z0-9-]+)\/)?(en|km)\.mdx$/;
