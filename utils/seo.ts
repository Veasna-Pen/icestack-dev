import { SITE_NAME, SITE_URL } from '../constants/site';

const DESCRIPTION_MAX = 160;

export const pageTitle = (name: string): string => `${name} · ${SITE_NAME}`;

export const absoluteUrl = (path: string): string => `${SITE_URL}${path}`;

export const metaDescription = (text: string): string => {
  const plain = text
    .replace(/<[^>]+>/g, '')
    .replace(/`|\*\*/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (plain.length <= DESCRIPTION_MAX) return plain;
  const cut = plain.slice(0, DESCRIPTION_MAX - 1);
  return `${cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:.]$/, '')}…`;
};
