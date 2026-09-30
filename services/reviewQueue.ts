import type { Language, TranslatedPage } from '../types';
import { listTopics, resolveTopic, topicRef } from './knowledgeService';
import { lessonRef, listCourses, listLessons, resolveCourse, resolveLesson } from './courseService';
import { repoEditUrl, repoNewFileUrl } from '../utils/site';

export interface ReviewItem {
  key: string;
  title: string;
  folder: string;
  status: 'missing' | 'draft';
  href: string;
}

const reviewItem = (
  key: string,
  title: string,
  en: TranslatedPage,
  km: { page: TranslatedPage; isFallback: boolean } | undefined
): ReviewItem[] => {
  const folder = en.sourcePath.slice(0, en.sourcePath.lastIndexOf('/'));
  if (!km || km.isFallback) return [{ key, title, folder, status: 'missing', href: repoNewFileUrl(folder, 'km.mdx') }];
  if (km.page.translation === 'draft') {
    return [{ key, title, folder, status: 'draft', href: repoEditUrl(km.page.sourcePath) }];
  }
  return [];
};

export const buildReviewQueue = (lang: Language): ReviewItem[] => [
  ...listTopics('en').flatMap(topic => {
    const km = resolveTopic(topic.collection, topic.slug, 'km');
    const title = resolveTopic(topic.collection, topic.slug, lang)?.topic.title ?? topic.title;
    return reviewItem(`topic:${topicRef(topic)}`, title, topic, km && { page: km.topic, isFallback: km.isFallback });
  }),
  ...listCourses('en').flatMap(course => [
    ...reviewItem(
      `course:${course.slug}`,
      resolveCourse(course.slug, lang)?.page.title ?? course.title,
      course,
      resolveCourse(course.slug, 'km')
    ),
    ...listLessons(course.slug, 'en').flatMap(lesson =>
      reviewItem(
        `lesson:${lessonRef(lesson)}`,
        resolveLesson(course.slug, lesson.slug, lang)?.page.title ?? lesson.title,
        lesson,
        resolveLesson(course.slug, lesson.slug, 'km')
      )
    )
  ])
];
