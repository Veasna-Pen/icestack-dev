# Architecture

A map of the website's code, for people changing it. To add or edit content, [CONTRIBUTING.md](CONTRIBUTING.md) is all you need.

IceStack is a Vite + React 19 single-page app with no backend. Content is MDX compiled at build time; the GitHub repository is the source of truth and the site is an interface over it.

## Layout

Dependencies flow one way:

```text
types/ ← constants/ ← utils/ ← services/ ← hooks/ ← components/ ← pages/ ← App.tsx
```

| Folder        | Holds                                                                                                |
| ------------- | ---------------------------------------------------------------------------------------------------- |
| `types/`      | Shared types, split by domain. Import from `types` (it is `export type *`, so it can't cause cycles) |
| `constants/`  | Static data and magic values: collections, navigation, roadmaps, courses, storage keys, AI settings  |
| `utils/`      | Pure helpers: `routes.ts` (every internal URL), `site.ts` (repo URLs), `ui.ts` (the design system)   |
| `services/`   | I/O: the knowledge and course indexes, the AI service boundary, runtime syntax highlighting          |
| `hooks/`      | `useT`, `useTheme`, `useLanguageParam`, `useMdxContent`, `useOutline`, progress tracking, …          |
| `components/` | Grouped by page area: `home/`, `knowledge/`, `courses/`, `roadmaps/`, `header/`, `layout/`, `mdx/`   |
| `pages/`      | One file per route. Pages compose section components; they don't lay out sections themselves         |
| `i18n/`       | i18next setup and every UI string, in `locales/<lang>/<section>.json`                                |
| `build/`      | Vite plugin code that runs in Node at build time, never in the browser                               |

## Content pipeline

`knowledge/<collection>/<slug>/<lang>.mdx` and `courses/<course>/[<NN>-<lesson>/]<lang>.mdx` are the routing contract. A new file appears on the site with no code change.

- **Metadata is eager.** `build/contentIndexPlugin.ts` reads every page's frontmatter in Node and serves it as `virtual:knowledge-index` and `virtual:course-index`. Search, the sidebar, counts and related links are synchronous.
- **Pages are lazy.** Each page's compiled MDX is loaded through one lazy `import.meta.glob` in `services/knowledgeService.ts` (and its twin in `courseService.ts`), so every page is its own chunk.
- **Keep those globs the only import of `.mdx` files.** An eager import of the same files, even just for `frontmatter`, makes Rollup merge every page back into the entry chunk.
- **The method is data.** `utils/method.ts` defines the nine stages and the page template's `##` headings; `constants/courses.ts` the six lesson sections. Their copy is in the locale files. The home page, How to Think, Contribute and the reasoning rail all render from them.
- **Code is highlighted twice, with one theme.** MDX fences are highlighted at build time by `@shikijs/rehype`, which loads exactly the languages `build/fenceLanguages.ts` finds in the content (restart the dev server after using a new one). Code that only exists at runtime, such as AI answers, goes through `services/highlighter.ts`, which lazy-loads Shiki in the browser.

## Internationalization

- Every UI string lives in `i18n/locales/en/*.json` and `i18n/locales/km/*.json`. The file name is the first key segment: `home.json` holds `home.*`.
- Add or change a string **in both languages, same file, same key**. The English files type `t()`, so a misspelled key fails `npm run typecheck`.
- The language comes from the URL (`/:lang/...`). Components call `const t = useT(lang)` rather than relying on i18next's global language.
- English is the default; a page missing in Khmer falls back to English with a notice.

## Styling

Tailwind is loaded from the Play CDN with its config inline in `index.html` (there is no `tailwind.config.js` or PostCSS). `utils/ui.ts` is the design system: surfaces, radii, focus rings, cards, chips and page-title sizes. Use its tokens instead of hand-writing colours or layout, and give every page the shared `container`.

## AI assistant

The assistant panel (`components/AiAssistant.tsx`) is UI only for now. It talks to `services/aiService.ts`, the boundary for a future external service: `askAssistant(request)` takes an `AiRequest` (the question, the page the reader is on as `AiContext`, the conversation so far and the language) and returns an `AiReply` (`ok` with Markdown text, `unavailable`, or `error`). Today it always returns `unavailable` and the panel shows a "not connected yet" notice. Connecting a service means implementing that function and setting `AI_SERVICE_CONNECTED`; the prompt and model credentials belong in the service, never in the browser.

Replies are untrusted: it is rendered through react-markdown with the default URL sanitizer, links open with `noopener noreferrer`, and code goes through Shiki, which escapes every token.

## Checks

```bash
npm run typecheck     # tsc --noEmit
npm run format:check  # prettier
npm run build
```

CI runs all three on every pull request. There is no test runner yet.
