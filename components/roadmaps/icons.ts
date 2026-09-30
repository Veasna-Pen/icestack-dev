import { Container, Globe, Monitor, Palette, Server, Smartphone } from 'lucide-react';
import type { IconComponent, RoadmapId } from '../../types';

export const ROADMAP_ICONS: Record<RoadmapId, IconComponent> = {
  'web-developer': Globe,
  'frontend-developer': Monitor,
  'backend-developer': Server,
  'mobile-developer': Smartphone,
  'ux-ui-designer': Palette,
  devops: Container
};
