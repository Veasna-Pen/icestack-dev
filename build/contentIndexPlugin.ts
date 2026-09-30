import fs from 'node:fs';
import path from 'node:path';
import { parse as parseYaml } from 'yaml';
import type { Plugin } from 'vite';
import { listMdxFiles } from './mdxFiles';

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---/;

export interface ContentEntry {
  sourcePath: string;
  frontmatter: Record<string, unknown>;
}

interface ContentIndexOptions {
  virtualId: string;
  dir: string;
  exportName: string;
}

const serialisable = (_key: string, value: unknown): unknown =>
  value instanceof Date ? value.toISOString().slice(0, 10) : value;

export const readEntries = (contentDir: string, root: string): ContentEntry[] =>
  listMdxFiles(contentDir)
    .map(full => {
      const match = fs.readFileSync(full, 'utf8').match(FRONTMATTER);
      return {
        sourcePath: path.relative(root, full).split(path.sep).join('/'),
        frontmatter: match ? ((parseYaml(match[1]) as Record<string, unknown>) ?? {}) : {}
      };
    })
    .sort((a, b) => a.sourcePath.localeCompare(b.sourcePath));

export const contentIndexPlugin = ({ virtualId, dir, exportName }: ContentIndexOptions): Plugin => {
  const resolvedId = '\0' + virtualId;
  let contentDir = '';
  let root = '';

  return {
    name: `icestack:${dir}-index`,

    configResolved(config) {
      root = config.root;
      contentDir = path.join(root, dir);
    },

    resolveId(id) {
      return id === virtualId ? resolvedId : undefined;
    },

    load(id) {
      if (id !== resolvedId) return undefined;
      const entries = readEntries(contentDir, root);
      return `export const ${exportName} = ${JSON.stringify(entries, serialisable)};`;
    },

    configureServer(server) {
      const invalidate = (file: string): void => {
        if (!file.endsWith('.mdx') || !path.resolve(file).startsWith(contentDir)) return;
        const mod = server.moduleGraph.getModuleById(resolvedId);
        if (!mod) return;
        server.moduleGraph.invalidateModule(mod);
        server.ws.send({ type: 'full-reload' });
      };
      server.watcher.on('add', invalidate);
      server.watcher.on('unlink', invalidate);
      server.watcher.on('change', invalidate);
    }
  };
};

export const knowledgeIndexPlugin = (): Plugin =>
  contentIndexPlugin({ virtualId: 'virtual:knowledge-index', dir: 'knowledge', exportName: 'KNOWLEDGE_INDEX' });

export const courseIndexPlugin = (): Plugin =>
  contentIndexPlugin({ virtualId: 'virtual:course-index', dir: 'courses', exportName: 'COURSE_INDEX' });
