import { Target, Brain, Puzzle, Scale, CodeXml } from 'lucide-react';
import type { IconComponent, NavId } from '../../types';

export const NAV_ICONS: Record<NavId, IconComponent> = {
  problems: Target,
  'how-to-think': Brain,
  patterns: Puzzle,
  tradeoffs: Scale,
  implementations: CodeXml
};
