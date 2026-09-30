import type { ComponentType } from 'react';
import type { Language } from './i18n';

export type MdxLoader = () => Promise<{ default: ComponentType<Record<string, unknown>> }>;

export type TopicLoader = MdxLoader;

export type CollectionId = 'problems' | 'patterns' | 'tradeoffs' | 'implementations';

export type TranslationStatus = 'draft' | 'reviewed';

export interface TranslatedPage {
  lang: Language;
  translation?: TranslationStatus;
  sourcePath: string;
}

export interface Topic {
  collection: CollectionId;
  slug: string;
  lang: Language;
  title: string;
  question: string;
  summary: string;
  tags: string[];
  related: string[];
  order: number;
  updated?: string;
  contributors: string[];
  translation?: TranslationStatus;
  load: TopicLoader;
  sourcePath: string;
}

export type TopicIdentity = Pick<Topic, 'collection' | 'slug'>;

export interface ResolvedTopic {
  topic: Topic;
  requested: Language;
  isFallback: boolean;
}

export interface OutlineEntry {
  id: string;
  sectionKey?: string;
  label: string;
}
