# The knowledge base

Every page on IceStack is a file in this folder. The website is a better way to read them; this folder is the source of truth.

| Folder | What it holds | Example |
| --- | --- | --- |
| [`problems/`](problems) | Real questions, reasoned from context to a decision | Should I use Redis? |
| [`patterns/`](patterns) | Reusable solutions, and when they stop working | Retry, idempotency |
| [`tradeoffs/`](tradeoffs) | Head-to-head comparisons with a clear answer for each context | Sync vs async |
| [`implementations/`](implementations) | How the patterns look in one stack | Node.js, Laravel |

Each topic is a folder holding `en.mdx` (required) and `km.mdx` (Khmer, optional). Start from [`TEMPLATE.md`](TEMPLATE.md), and read [`CONTRIBUTING.md`](../CONTRIBUTING.md) before opening a pull request.

## License

The content in this folder is licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Reuse it with credit to "IceStack contributors". The website code is [MIT](../LICENSE).
