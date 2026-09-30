# Courses

A course teaches one skill in a few short lessons. Where a knowledge page answers one question in depth, a course walks a beginner there step by step: each lesson starts from a real problem, explains one idea, and ends with questions the reader can check themselves against.

```text
courses/
├── README.md
├── TEMPLATE.md                    # copy this to start a lesson
└── <course>/                      # e.g. caching-basics
    ├── en.mdx                     # the course overview (required)
    ├── km.mdx                     # Khmer overview (optional)
    ├── 01-<lesson>/               # e.g. 01-what-is-a-cache
    │   ├── en.mdx                 # required
    │   └── km.mdx                 # optional; the site falls back to English
    └── 02-<lesson>/
        └── en.mdx
```

The path is the contract. The number in a lesson folder sets its order and is dropped from the URL: `courses/caching-basics/01-what-is-a-cache/en.mdx` is served at `/en/courses/caching-basics/what-is-a-cache`, so you can renumber lessons without breaking links. Use short, lowercase, hyphenated names.

## The course overview

`courses/<course>/en.mdx` describes the course. Everything on the course card comes from the frontmatter; the body is a short introduction shown above the lesson list.

```mdx
---
title: 'Caching, step by step'
summary: 'One or two sentences: what this course teaches and who it is for.'
level: beginner # beginner | intermediate | advanced
order: 1 # position on the Courses page
outcomes: # "By the end you can…", one short line each
  - 'Decide whether a piece of data is worth caching'
  - 'Add a cache-aside read path with a sensible TTL'
prerequisites: # what the reader should already know; leave empty for "none"
  - 'You can build a small API endpoint that reads from a database'
related: [patterns/caching, problems/should-i-use-redis] # knowledge pages, as collection/slug
updated: '2026-09-29'
contributors: [your-github-username]
---

Two or three short paragraphs: the problem this course solves, and what the reader will build or be able to do.
```

## Lessons

Copy [`TEMPLATE.md`](TEMPLATE.md) to `courses/<course>/<NN>-<lesson>/en.mdx`. Every lesson uses the same six `##` headings, in this order, so readers always know where they are:

| Heading             | What goes here                                                    |
| ------------------- | ----------------------------------------------------------------- |
| `## The problem`    | A situation the reader will meet at work, with real numbers       |
| `## The idea`       | One concept, in plain words. Define every term the first time     |
| `## Example`        | The idea worked through, step by step, with small code            |
| `## Try it`         | A short exercise the reader does on their own                     |
| `## Check yourself` | Two or three questions, each followed by an `<Answer>`            |
| `## Key takeaways`  | Three to five bullets worth remembering                           |

Write the headings in English in both languages. Khmer readers see them in Khmer, and anchors such as `#try-it` stay the same in both.

### Writing a lesson that is easy to follow

- **One idea per lesson.** If you need a second idea, write a second lesson. Aim for 10 to 15 minutes, and set `minutes` in the frontmatter.
- **Start from the problem, not the tool.** The reader should know why they need the idea before they meet it.
- **Short sentences, common words.** Many readers are learning in their second language. Define a term the first time you use it.
- **Show, then explain.** A small, runnable example beats a paragraph of theory. Keep code under about 20 lines.
- **Make "Try it" doable in ten minutes** with tools the reader already has.
- **Hide answers.** Put each answer inside `<Answer>…</Answer>` so readers try first.
- **Link to go deeper.** Put related knowledge pages in `related:`, or link inline with a path relative to the lesson folder, for example `[Caching](../../../knowledge/patterns/caching)`. The same link works on GitHub and on the site. Link to another lesson with `../02-cache-aside`.
- **Mind the MDX syntax.** `<` and `{` start JSX. Keep them inside backticks, or write "under 200 ms" in prose instead of a bare `<`.

Components available in lessons: `<Answer>`, `<Callout type="tip|warning|info|success" title="…">`, `<Tip>`, `<Warning>` and `<Info>`.

## Translating to Khmer

Add `km.mdx` next to `en.mdx`, keep the frontmatter fields, and translate the text. Keep English technical terms (cache, TTL, index, retry) and all code in English. Mark machine-assisted or unreviewed translations with `translation: draft` until a Khmer-speaking reviewer removes it. The site's **Contribute** page lists every lesson that is missing a Khmer version or still a draft.

## License

The content in this folder is licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Reuse it with credit to "IceStack contributors". The website code is [MIT](../LICENSE).
