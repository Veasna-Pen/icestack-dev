import type { ComponentType } from 'react';
import type { CollectionId } from './knowledge';

export type ThemeMode = 'light' | 'dark';

export type IconComponent = ComponentType<{ className?: string }>;

export type NavId = CollectionId | 'how-to-think';
