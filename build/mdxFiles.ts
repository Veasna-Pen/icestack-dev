import fs from 'node:fs';
import path from 'node:path';

export const listMdxFiles = (dir: string): string[] => {
  const files: string[] = [];

  const walk = (current: string): void => {
    for (const item of fs.readdirSync(current, { withFileTypes: true })) {
      const full = path.join(current, item.name);
      if (item.isDirectory()) walk(full);
      else if (item.name.endsWith('.mdx')) files.push(full);
    }
  };

  if (fs.existsSync(dir)) walk(dir);
  return files.sort();
};
