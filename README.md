# IceStack

**Think before you code.**

Open-source knowledge for better engineering decisions, in English and ខ្មែរ (Khmer).

AI can generate code and answers in seconds. What it can't do is know your context, weigh the trade-offs you will live with, or own the decision. IceStack is a problem-first knowledge base that trains that part: how to get from a real software problem to a decision you can defend and verify.

It is not another course platform, and it doesn't try to beat AI at writing code. Even its short courses start from a problem: every lesson opens with a situation you will meet at work, explains one idea, and ends with questions you check yourself against.

|                      | The path                                                                                                  |
| -------------------- | --------------------------------------------------------------------------------------------------------- |
| Traditional learning | Course → Lesson → Quiz                                                                                    |
| AI coding assistant  | Problem → Generated solution                                                                              |
| **IceStack**         | **Problem → Context → Diagnose → Alternatives → Trade-offs → Decision → Implement → Verify → Understand** |

## Questions it answers

- When should I use Redis?
- When should I _not_ use microservices?
- Should this operation be synchronous or asynchronous?
- Should I add a retry?
- Do I need Kafka?
- Why is my database slow?
- Should I cache this?
- When does a monolith become a problem?

The focus is on engineering decisions, not on technologies.

## The method

Every page walks the same nine steps:

```text
State the problem → Understand context → Diagnose → Explore alternatives → Evaluate trade-offs
                  → Make the decision → Implement → Verify → Learn why
```

and uses the same template, so readers always know where to look:

```markdown
# Problem ← the page title

## Context

## Symptoms

## Diagnose

## Options

## Trade-offs

## Decision

## Implementation

## Verification

## Why

## When Not To Use

## Common Mistakes
```

Learn the steps once and you can reason through problems that no page covers yet.

## How the repository works

The repository is the source of truth; the website is a better interface to it.

```text
GitHub repository  →  structured knowledge  →  website · search · AI assistant
```

```text
knowledge/
├── problems/          should-i-use-redis, should-i-use-kafka, database-is-slow, when-to-use-microservices
├── patterns/          caching, retry, idempotency, rate-limiting
├── tradeoffs/         monolith-vs-microservices, sync-vs-async, sql-vs-nosql
├── implementations/   nodejs, nestjs, laravel, python
└── TEMPLATE.md

courses/
├── caching-basics/        en.mdx (overview), 01-what-is-a-cache/, 02-cache-aside/, …
├── database-performance/  measure first, indexes, N+1, pagination
├── reliable-apis/         timeouts, retries, idempotency, circuit breakers
├── background-jobs/       what to move, queues and workers, dead-letter queues, backpressure
├── shipping-safely/       health checks, graceful shutdown, feature flags, zero-downtime migrations
├── auth-basics/           sessions and tokens, storing passwords, logging out, CORS
└── TEMPLATE.md            the lesson template
```

Each topic is a folder holding `en.mdx` and, optionally, `km.mdx`. The site's navigation (Problems → How to Think → Patterns → Trade-offs → Implementation), its search, and the reasoning path on every page are generated from these files.

A course is a folder with an overview (`en.mdx`) and one numbered folder per lesson. Every lesson uses the same six sections: **The problem → The idea → Example → Try it → Check yourself → Key takeaways**. See [courses/README.md](courses/README.md).

## Contributing

IceStack shouldn't depend on one person writing everything. If you have debugged it, operated it or regretted it in production, your experience belongs here:

- real problems you've had to answer
- different approaches, and the trade-offs you found
- production lessons, anonymized
- implementation examples in your stack
- common mistakes
- Khmer translations and reviews

Start with [CONTRIBUTING.md](CONTRIBUTING.md) and [knowledge/TEMPLATE.md](knowledge/TEMPLATE.md), or open a **New topic** issue.

## English + ខ្មែរ

The community starts with Cambodian developers, and every page is written for a global audience. Khmer makes the concepts accessible; English keeps the technical terms (cache, retry, idempotency, trade-off) that developers use at work.

A page can ship in English first. The site shows the English version until a Khmer one exists, and flags Khmer translations that haven't been reviewed yet.

## Running the site

Requires Node.js 20.19 or newer (`.nvmrc` pins 22).

```bash
npm install
npm run dev           # http://localhost:3000
npm run build         # production build in dist/
npm run typecheck     # tsc --noEmit
npm run format:check  # prettier
```

No API keys or environment variables are needed. The AI assistant panel is a preview for now: it will be a thinking partner that asks about your context before recommending anything, running as a separate service that isn’t connected yet.

Built with Vite, React 19, React Router and MDX. [ARCHITECTURE.md](ARCHITECTURE.md) explains how the code is organized.

## Community

- [Contributing guide](CONTRIBUTING.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)
- [Security policy](SECURITY.md)

## License

- **Code** (the website): [MIT](LICENSE)
- **Content** (`knowledge/` and `courses/`): [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Share and adapt it for any purpose, including commercially, as long as you credit "IceStack contributors" with a link to the original page, link to the licence, and say if you changed it.

The IceStack name and logo are not covered by either licence.
