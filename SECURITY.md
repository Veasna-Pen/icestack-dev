# Security policy

## Reporting a vulnerability

Please don't open a public issue for a security problem. Instead, either:

- use GitHub's **private vulnerability reporting** (the repository's **Security** tab → **Report a vulnerability**), or
- email **veasna3d@gmail.com**.

Include what you found, how to reproduce it, and what an attacker could do with it. You will get a reply within a week, and credit in the fix unless you'd rather not.

## Supported versions

Only the latest commit on `main` (and the site deployed from it) is supported.

## Secrets

IceStack is a static site with no backend, and the build needs no API keys: everything in the bundle is public. The AI assistant is planned as a separate service, so model credentials will never be shipped to the browser.

## Content

The knowledge base asks contributors to remove company names, customer data, internal hostnames and secrets. If you spot something that should not be public in a page or in the git history, report it the same way.
