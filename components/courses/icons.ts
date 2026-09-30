import { CircleHelp, CodeXml, Hammer, Lightbulb, ListChecks, Target } from 'lucide-react';
import type { IconComponent, LessonSectionId } from '../../types';

export const LESSON_SECTION_ICONS: Record<LessonSectionId, IconComponent> = {
  problem: Target,
  idea: Lightbulb,
  example: CodeXml,
  'try-it': Hammer,
  check: CircleHelp,
  takeaways: ListChecks
};
