import fs from 'node:fs';
import path from 'node:path';
import type { Plugin } from 'vite';
import type { Language } from '../types';
import { DEFAULT_LANGUAGE, LANGUAGES, OG_LOCALES } from '../constants/i18n';
import { SHARE_IMAGE, SITE_NAME, SITE_URL } from '../constants/site';
import { homeUrl } from '../utils/routes';
import { absoluteUrl, pageTitle } from '../utils/seo';
import { sitePages, type SitePage } from './sitePages';

const escapeHtml = (text: string): string =>
  text.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const jsonLdScript = (data: object): string =>
  `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;

const meta = (attribute: 'name' | 'property', key: string, content: string): string =>
  `<meta ${attribute}="${key}" content="${escapeHtml(content)}" />`;

const link = (attributes: Record<string, string>): string =>
  `<link ${Object.entries(attributes)
    .map(([key, value]) => `${key}="${escapeHtml(value)}"`)
    .join(' ')} />`;

const alternateLinks = (alternates: Partial<Record<Language, string>>): [string, string][] => {
  const entries = LANGUAGES.filter(lang => alternates[lang]).map(lang => [lang, absoluteUrl(alternates[lang]!)]);
  const fallback = alternates[DEFAULT_LANGUAGE] ?? Object.values(alternates)[0];
  return fallback ? ([...entries, ['x-default', absoluteUrl(fallback)]] as [string, string][]) : [];
};

const replaceOnce = (html: string, pattern: RegExp, replacement: string): string => {
  if (!pattern.test(html)) throw new Error(`[seo] index.html has no match for ${pattern}`);
  return html.replace(pattern, replacement);
};

const renderPage = (template: string, page: SitePage, standalone: boolean): string => {
  const url = absoluteUrl(page.canonical);
  const tags = [
    meta('property', 'og:type', page.type),
    meta('property', 'og:title', page.title),
    meta('property', 'og:description', page.description),
    meta('property', 'og:locale', OG_LOCALES[page.lang]),
    ...LANGUAGES.filter(lang => lang !== page.lang && page.alternates[lang]).map(lang =>
      meta('property', 'og:locale:alternate', OG_LOCALES[lang])
    ),
    meta('property', 'og:image', absoluteUrl(SHARE_IMAGE.path)),
    meta('property', 'og:image:width', String(SHARE_IMAGE.width)),
    meta('property', 'og:image:height', String(SHARE_IMAGE.height)),
    meta('property', 'og:image:alt', SITE_NAME)
  ];
  if (standalone) {
    tags.push(
      meta('property', 'og:url', url),
      link({ rel: 'canonical', href: url }),
      ...alternateLinks(page.alternates).map(([hreflang, href]) => link({ rel: 'alternate', hreflang, href }))
    );
  }
  tags.push(...page.jsonLd.map(jsonLdScript));

  let html = replaceOnce(template, /<html lang="[^"]*"/, `<html lang="${page.lang}"`);
  html = replaceOnce(html, /<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(pageTitle(page.title))}</title>`);
  html = replaceOnce(html, /<meta name="description"[^>]*>/, meta('name', 'description', page.description));
  return replaceOnce(html, /<\/head>/, `  ${tags.join('\n  ')}\n</head>`);
};

const sitemap = (pages: SitePage[]): string => {
  const urls = pages
    .filter(page => page.canonical === page.path)
    .map(page => {
      const lines = [`    <loc>${absoluteUrl(page.path)}</loc>`];
      if (page.updated) lines.push(`    <lastmod>${page.updated}</lastmod>`);
      for (const [hreflang, href] of alternateLinks(page.alternates)) {
        lines.push(`    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${escapeHtml(href)}" />`);
      }
      return `  <url>\n${lines.join('\n')}\n  </url>`;
    });
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...urls,
    '</urlset>',
    ''
  ].join('\n');
};

const robots = (): string => `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;

export const seoPlugin = (): Plugin => {
  let root = '';

  return {
    name: 'icestack:seo',
    apply: 'build',

    configResolved(config) {
      root = config.root;
    },

    writeBundle(options) {
      const outDir = options.dir ?? path.join(root, 'dist');
      const indexFile = path.join(outDir, 'index.html');
      const template = fs.readFileSync(indexFile, 'utf8');
      const pages = sitePages(root);

      for (const page of pages) {
        const file = path.join(outDir, `${page.path.slice(1)}.html`);
        fs.mkdirSync(path.dirname(file), { recursive: true });
        fs.writeFileSync(file, renderPage(template, page, true));
      }

      const home = pages.find(page => page.path === homeUrl(DEFAULT_LANGUAGE));
      if (home) fs.writeFileSync(indexFile, renderPage(template, home, false));
      fs.writeFileSync(path.join(outDir, 'sitemap.xml'), sitemap(pages));
      fs.writeFileSync(path.join(outDir, 'robots.txt'), robots());
    }
  };
};
