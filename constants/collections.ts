import type { CollectionId } from '../types';

export const COLLECTION_IDS: readonly CollectionId[] = ['problems', 'patterns', 'tradeoffs', 'implementations'];

export const KNOWLEDGE_PATH_PATTERN = /^knowledge\/([^/]+)\/([^/]+)\/(en|km)\.mdx$/;

export const isCollectionId = (value: string | undefined): value is CollectionId =>
  !!value && COLLECTION_IDS.includes(value as CollectionId);
