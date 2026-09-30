import { Flag, Split, Scale, Lightbulb, CodeXml, Bug } from 'lucide-react';
import type { IconComponent } from '../../types';

export type ContributionId = 'realProblems' | 'approaches' | 'tradeoffs' | 'lessons' | 'examples' | 'mistakes';

export interface ContributionType {
  id: ContributionId;
  icon: IconComponent;
}

export const CONTRIBUTION_TYPES: ContributionType[] = [
  { id: 'realProblems', icon: Flag },
  { id: 'approaches', icon: Split },
  { id: 'tradeoffs', icon: Scale },
  { id: 'lessons', icon: Lightbulb },
  { id: 'examples', icon: CodeXml },
  { id: 'mistakes', icon: Bug }
];
