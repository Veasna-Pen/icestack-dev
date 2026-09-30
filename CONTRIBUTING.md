# Contributing to IceStack

IceStack is an open-source knowledge base for engineering decisions. It shouldn't depend on one person writing everything: the most useful pages come from people who have debugged, operated or regretted something in production.

**Think before you code** applies to contributions too. A good page doesn't hand the reader an answer; it shows how to reach one.

## Ways to contribute

- **Real problems:** a question you had to answer at work.
- **Different approaches:** an option a page didn't consider.
- **Trade-offs:** a cost you paid that nobody mentioned.
- **Production lessons:** what actually happened, anonymized.
- **Implementation examples:** the same pattern in your stack.
- **Common mistakes:** the trap you fell into, so others don't.
- **Course lessons:** teach one skill, one problem-first lesson at a time. See [courses/README.md](courses/README.md).
- **Khmer translations and reviews:** see [Translating to Khmer](#translating-to-khmer).

Small fixes are just as welcome: a wrong command, a broken link, an unclear sentence. Every page on the site has an **Edit this page** link that opens the file on GitHub.

## How the repository is organized

```text
knowledge/
├── problems/          # "Should I use Redis?", "Why is my database slow?"
│   └── <slug>/
│       ├── en.mdx     # required
│       └── km.mdx     # optional; the site falls back to English
├── patterns/          # reusable solutions: caching, retry, idempotency, rate limiting
├── tradeoffs/         # head-to-head comparisons: sync vs async, SQL vs NoSQL
├── implementations/   # how the patterns look in one stack: Node.js, NestJS, Laravel, Python
├── README.md
└── TEMPLATE.md        # copy this to start a page
```

The path is the contract: `knowledge/<collection>/<slug>/<lang>.mdx`. The website indexes every file at that depth when it builds, so a new page shows up in navigation, search and the reasoning path without any code changes. A file at the wrong depth is skipped, and the dev server logs a warning naming it.

Courses live next to it in `courses/<course>/`: an overview (`en.mdx`) and one numbered folder per lesson (`01-what-is-a-cache/en.mdx`). Lessons use their own six-section template, [`courses/TEMPLATE.md`](courses/TEMPLATE.md); [`courses/README.md`](courses/README.md) explains the format and how to keep a lesson easy to follow.

Everything outside `knowledge/` and `courses/` is the website (Vite + React). You don't need to touch it to contribute content.

## Adding a page

1. **Look for an existing page or issue.** If there isn't one, open an issue with the **New topic** form so nobody writes the same page twice.
2. **Create the folder** `knowledge/<collection>/<slug>/`. Use a short, lowercase, hyphenated slug: `should-i-use-kafka`, `sync-vs-async`.
3. **Copy [`knowledge/TEMPLATE.md`](knowledge/TEMPLATE.md)** into the folder as `en.mdx`.
4. **Write it**, keeping the template headings (see below).
5. **Preview it** with `npm install` and `npm run dev`, then open http://localhost:3000.
6. **Open a pull request.** The pull request template has a short checklist.

### Frontmatter

```yaml
---
title: 'Should I use Redis?' # required. For problems, phrase it as the question.
question: 'When should I use Redis?' # optional: how developers ask it. Shown on the home page and searched.
summary: 'The short answer in one or two sentences.' # required
tags: [redis, caching, performance] # a few lowercase keywords
related: [patterns/caching, problems/database-is-slow] # other pages, as collection/slug
order: 1 # optional: position within the collection
updated: '2026-09-11' # quote dates
contributors: [your-github-username] # optional
translation: draft # Khmer files only, until a reviewer removes it
---
```

`related` works in both directions: if page A lists page B, both pages show each other under **Related**.

### The template

Every page in `problems`, `patterns` and `tradeoffs` uses the same `##` headings in the same order. Readers always know where to look, and each heading maps to a step of the method described on the site's **How to Think** page:

| Heading               | Step on the path        | What goes here                             |
| --------------------- | ----------------------- | ------------------------------------------ |
| _(title and summary)_ | 01 State the problem    | The question, and the short answer         |
| `## Context`          | 02 Understand context   | Scale, team, stack, constraints            |
| `## Symptoms`         | 02 Understand context   | What you observe that makes you ask        |
| `## Diagnose`         | 03 Diagnose             | How to confirm the real cause              |
| `## Options`          | 04 Explore alternatives | Realistic choices, including doing nothing |
| `## Trade-offs`       | 05 Evaluate trade-offs  | What each option buys and what it costs    |
| `## Decision`         | 06 Make the decision    | A default, and what would change it        |
| `## Implementation`   | 07 Implement            | The smallest version that works            |
| `## Verification`     | 08 Verify               | How to prove it worked                     |
| `## Why`              | 09 Learn why            | The principle underneath                   |
| `## When Not To Use`  | 09 Learn why            | Where this answer is wrong                 |
| `## Common Mistakes`  | 09 Learn why            | What people get wrong in practice          |

- Write the headings **in English in both languages**. Khmer pages show them in Khmer automatically, and anchors such as `#trade-offs` stay the same in both.
- Patterns and trade-offs may skip a heading that doesn't apply; the reasoning path shows the skipped step as dashed.
- Pages in `implementations` are free-form. One `##` per pattern is a good default.

### Writing guidelines

- **Be specific.** Versions, numbers and the commands you actually ran. "It's faster" is not a finding; "p95 fell from 900 ms to 140 ms" is.
- **Include the boring option**, and doing nothing, in every Options section.
- **Say when not to.** A recommendation without limits is marketing, so `When Not To Use` is required.
- **Share production lessons safely.** Remove company names, customer data, internal hostnames and secrets.
- **No vendor pitches.** Name a product when it matters to the decision, not to promote it.
- **Keep code small.** Show the smallest version that works and link out to full projects.
- **Prefer plain Markdown.** When you need emphasis, these components are available: `<Callout type="tip|warning|info|success" title="…">`, `<Tip>`, `<Warning>` and `<Info>`.
- **Link with relative paths from the topic folder**, for example `[Caching](../../patterns/caching)`. The same link works on GitHub and on the site, and keeps readers in their language.
- **Mind the MDX syntax.** `<` and `{` start JSX in MDX. Keep them inside backticks, or write "under 200 ms" in prose instead of a bare `<`.

## Translating to Khmer

Translating a page is one of the most useful contributions, including pages you didn't write.

- Create `km.mdx` next to `en.mdx`, or review an existing one. The site's **Contribute** page lists every page that is missing a Khmer version or still marked as a draft.
- **Keep English technical terms** (cache, retry, idempotency, index, trade-off) and explain them in Khmer. Readers will meet those words at work.
- Keep code, commands and the `##` template headings in English.
- Mark machine-assisted or unreviewed translations with `translation: draft`. The page shows a notice asking for review until a Khmer-speaking reviewer removes the flag.

## Changing the website

The site is a Vite + React 19 single-page app with no backend. [ARCHITECTURE.md](ARCHITECTURE.md) maps the code. The short version:

- `services/knowledgeService.ts` and `services/courseService.ts` load everything under `knowledge/` and `courses/`.
- `utils/method.ts` defines the nine-step method and the page template; `constants/courses.ts` the lesson sections.
- Every UI string lives in `i18n/locales/<lang>/*.json`. Add or change a string in **both** `en` and `km`, under the same key.
- `utils/ui.ts` is the design system. Use its tokens rather than hand-written colours.

Before opening a pull request, run:

```bash
npm run typecheck
npm run format        # or format:check to only check
npm run build
```

CI runs the same checks on every pull request.

## Licensing of contributions

By contributing, you agree that your code is released under the [MIT licence](LICENSE) and your written content (anything in `knowledge/` or `courses/`) under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Only contribute what you have the right to share.

## Code of Conduct

Everyone taking part is expected to follow the [Code of Conduct](CODE_OF_CONDUCT.md). Report security problems privately, as described in [SECURITY.md](SECURITY.md).
