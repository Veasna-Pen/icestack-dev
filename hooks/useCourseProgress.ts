import { STORAGE_KEYS } from '../constants/storage';
import { useCompletion } from './useCompletion';

export const useCourseProgress = (courseSlug: string) => useCompletion(STORAGE_KEYS.courseProgress, courseSlug);
