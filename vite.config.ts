import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mdx from '@mdx-js/rollup';
import remarkGfm from 'remark-gfm';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import rehypeShiki from '@shikijs/rehype';
import { fenceLanguages } from './build/fenceLanguages';
import { courseIndexPlugin, knowledgeIndexPlugin } from './build/contentIndexPlugin';
import { CODE_THEME, PLAIN_LANGUAGE } from './constants/code';
import { dropThemeBackground } from './utils/code';

export default defineConfig({
  server: {
    port: 3000,
    host: '0.0.0.0'
  },
  plugins: [
    {
      enforce: 'pre',
      ...mdx({
        remarkPlugins: [remarkGfm, remarkFrontmatter, remarkMdxFrontmatter],
        rehypePlugins: [
          [
            rehypeShiki,
            {
              theme: CODE_THEME,
              langs: [
                PLAIN_LANGUAGE,
                ...fenceLanguages([path.resolve(__dirname, 'knowledge'), path.resolve(__dirname, 'courses')])
              ],
              fallbackLanguage: PLAIN_LANGUAGE,
              addLanguageClass: true,
              transformers: [dropThemeBackground]
            }
          ]
        ],
        providerImportSource: '@mdx-js/react'
      })
    },
    react(),
    knowledgeIndexPlugin(),
    courseIndexPlugin()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.')
    }
  }
});
