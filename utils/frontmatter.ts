import type { TranslationStatus } from '../types';

export const asString = (value: unknown, fallback = ''): string => (typeof value === 'string' ? value : fallback);

export const asStrings = (value: unknown): string[] => (Array.isArray(value) ? value.map(String) : []);

export const asNumber = (value: unknown, fallback: number): number =>
  typeof value === 'number' && Number.isFinite(value) ? value : fallback;

export const asDate = (value: unknown): string | undefined => {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return value ? String(value) : undefined;
};

export const asTranslation = (value: unknown): TranslationStatus | undefined =>
  value === 'draft' || value === 'reviewed' ? value : undefined;
