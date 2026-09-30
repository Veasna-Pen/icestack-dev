---
title: "Should I use X?"
question: "When should I use X?"
summary: "The short answer in one or two sentences: what you would do, and the main condition that changes it."
tags: [keyword, keyword]
related: [patterns/caching]
updated: "YYYY-MM-DD"
contributors: [your-github-username]
---

{/*
  Copy this file to knowledge/<collection>/<slug>/en.mdx.
  Keep the ## headings in English and in this order, in both languages.
  Patterns and trade-offs may drop a heading that doesn't apply.
  Delete this comment before opening a pull request.
*/}

## Context

The situation where this question comes up: scale (requests, rows, team size), stack, constraints and deadlines. Enough detail that readers can tell whether their situation is the same.

## Symptoms

What people observe that makes them ask the question: error messages, graphs, numbers.

## Diagnose

How to confirm the real cause before choosing anything: the commands, queries or metrics, and what their output means.

## Options

The realistic alternatives. Always include the simplest thing that could work, and doing nothing.

## Trade-offs

What each option buys and what it costs in complexity, new failure modes, money and reversibility. A table works well here.

## Decision

A default recommendation for the context above, and the conditions that would change it.

## Implementation

The smallest version that works, in real code. Link out to a full project if there is one.

## Verification

How to prove it worked, with before-and-after numbers, and how to notice when it stops working.

## Why

The principle underneath, so the lesson carries over to the next problem.

## When Not To Use

The situations where this answer is wrong.

## Common Mistakes

What people get wrong in practice, ideally from real incidents.
