## What this changes

<!-- One or two sentences. Link the issue if there is one, e.g. "Closes #12". -->

## Checklist for knowledge pages

- [ ] The file lives at `knowledge/<collection>/<slug>/en.mdx` (plus `km.mdx` if translated)
- [ ] Frontmatter has `title`, `summary`, `tags` and `updated`
- [ ] Uses the template headings, in order, written in English
- [ ] Options include the simplest choice and doing nothing
- [ ] Has a `When Not To Use` section
- [ ] Numbers, versions and commands are real, not invented
- [ ] No company names, customer data, internal hostnames or secrets
- [ ] Previewed locally with `npm run dev`
- [ ] Unreviewed Khmer translations are marked `translation: draft`

## Checklist for course lessons

- [ ] The overview lives at `courses/<course>/en.mdx`, each lesson at `courses/<course>/<NN>-<lesson>/en.mdx`
- [ ] Each lesson has `title`, `summary`, `minutes` and `updated` in its frontmatter
- [ ] Uses the six lesson headings, in order, written in English: The problem, The idea, Example, Try it, Check yourself, Key takeaways
- [ ] Teaches one idea, starting from a real situation with real numbers
- [ ] "Try it" can be done in about ten minutes with common tools
- [ ] Every "Check yourself" question has its answer inside `<Answer>`
- [ ] `related` lists existing knowledge pages as `collection/slug`

## Checklist for website changes

- [ ] `npm run typecheck`, `npm run format:check` and `npm run build` pass
- [ ] New or changed UI strings are in both `i18n/locales/en` and `i18n/locales/km`
- [ ] Checked in light and dark themes, and at mobile width
