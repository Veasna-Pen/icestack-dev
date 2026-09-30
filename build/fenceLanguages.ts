import fs from 'node:fs';
import { bundledLanguages } from 'shiki/langs';
import { listMdxFiles } from './mdxFiles';

/** The info string's first word: ```ts title="x" -> ts. */
const OPENING_FENCE = /^[ \t]*(?:```|~~~)([\w+#.-]+)/gm;

const PLAIN_TEXT = new Set(['text', 'txt', 'plain', 'plaintext']);

/** Fence languages used by the content. Read at config time, so a new one needs a dev-server restart. */
export const fenceLanguages = (contentDirs: string[]): string[] => {
  const used = new Set<string>();
  for (const file of contentDirs.flatMap(dir => listMdxFiles(dir))) {
    for (const [, lang] of fs.readFileSync(file, 'utf8').matchAll(OPENING_FENCE)) used.add(lang.toLowerCase());
  }

  const unknown = [...used].filter(lang => !PLAIN_TEXT.has(lang) && !Object.hasOwn(bundledLanguages, lang));
  if (unknown.length > 0) {
    console.warn(`[highlight] No Shiki grammar for: ${unknown.join(', ')}. Those blocks render as plain text.`);
  }

  return [...used].filter(lang => Object.hasOwn(bundledLanguages, lang)).sort();
};
