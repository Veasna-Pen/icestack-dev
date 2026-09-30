import type { RoadmapId } from '../types';
import { STORAGE_KEYS } from '../constants/storage';
import { useCompletion } from './useCompletion';

export const useRoadmapProgress = (id: RoadmapId) => useCompletion(STORAGE_KEYS.roadmapProgress, id);
