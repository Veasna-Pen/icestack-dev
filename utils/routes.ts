import type { CollectionId, Language, LessonIdentity, NavId, RoadmapId, TopicIdentity } from '../types';
import { PRIMARY_NAV } from '../constants/navigation';

export const homeUrl = (lang: Language): string => `/${lang}`;

export const navUrl = (lang: Language, id: NavId): string => `/${lang}/${id}`;

export const howToThinkUrl = (lang: Language): string => `/${lang}/how-to-think`;

export const contributeUrl = (lang: Language): string => `/${lang}/contribute`;

export const roadmapsUrl = (lang: Language): string => `/${lang}/roadmaps`;

export const roadmapUrl = (lang: Language, id: RoadmapId): string => `/${lang}/roadmaps/${id}`;

export const coursesUrl = (lang: Language): string => `/${lang}/courses`;

export const courseUrl = (lang: Language, slug: string): string => `/${lang}/courses/${slug}`;

export const lessonUrl = (lang: Language, lesson: LessonIdentity): string =>
  `/${lang}/courses/${lesson.course}/${lesson.slug}`;

const sectionOf = (pathname: string): string | undefined => pathname.split('/').filter(Boolean)[1];

export const isRoadmapsPath = (pathname: string): boolean => sectionOf(pathname) === 'roadmaps';

export const isCoursesPath = (pathname: string): boolean => sectionOf(pathname) === 'courses';

export const isContributePath = (pathname: string): boolean => sectionOf(pathname) === 'contribute';

export const isLessonPath = (pathname: string): boolean =>
  isCoursesPath(pathname) && pathname.split('/').filter(Boolean).length === 4;

export const collectionUrl = (lang: Language, collection: CollectionId): string => `/${lang}/${collection}`;

export const topicUrl = (lang: Language, topic: TopicIdentity): string => `/${lang}/${topic.collection}/${topic.slug}`;

export const activeNavFor = (pathname: string): NavId | undefined => {
  const segment = sectionOf(pathname);
  return PRIMARY_NAV.find(id => id === segment);
};
