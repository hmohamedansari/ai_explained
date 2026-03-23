# Contributing to AI Academy

Thank you for contributing. This is an open-source AI education platform — good contributions
make it more accurate, more useful, and more current.

There are three types of contribution. Start with the one that fits:

- **Fix a mistake** — wrong fact, broken code, stale information
- **Improve a module** — clearer explanation, better example, missing context
- **Add a module** — new content that fills a gap in the curriculum

---

## Before You Start

1. Read [`curriculum/content-spec.md`](curriculum/content-spec.md) — the authoring standard for all modules.
2. Run the curriculum validator to check the current state:
   ```bash
   npm run curriculum:validate
   ```
3. For a new module, copy the template:
   ```bash
   cp src/content/modules/_template.mdx src/content/modules/[track]/[module-slug].mdx
   ```

---

## Contribution Workflow

```
1. Fork the repo and create a branch: git checkout -b fix/module-1-2-typo
2. Make your changes
3. Run the validator:  npm run curriculum:validate
4. If you added/renamed a module: npm run curriculum:registry
5. Run the test suite:  npm run curriculum:test
6. Open a pull request with a clear title and description
```

All PRs run the validator automatically. A failing validator blocks merge.

---

## Module Quality Bar

New modules must meet the [publication gate checklist](curriculum/content-spec.md#publication-gate-checklist)
before being merged with `status: reviewed`:

- [ ] Layer 1 is readable by a non-expert
- [ ] Production Gotcha is specific and actionable (not theoretical)
- [ ] Layer 2 code runs without modification — test it
- [ ] Layer 3 cites at least one primary source with date
- [ ] All new terms link to glossary entries
- [ ] Literacy Checkpoint link is live
- [ ] No TODO placeholders remain
- [ ] `npm run curriculum:validate` passes

Modules merged with `status: draft` are fine — they won't be published until they
reach `reviewed`.

---

## What Makes a Good Production Gotcha

The `productionGotcha` field is the most important part of Layer 1. It must describe
something that has actually bitten real production teams — not a theoretical edge case.

Good: *"Token counts include both input and output. A 4,096-token context limit doesn't
mean 4,096 tokens of input — your prompt, system message, and conversation history
all count against it."*

Not good: *"Be careful about prompt length."*

---

## Fixing Stale Content

If a module is outdated, set `status: stale` in the frontmatter and open a PR with
the updated content. The validator will flag volatile modules that haven't been
reviewed within 90 days.

---

## Issue Templates

Use the GitHub issue templates for:
- **New module proposal** — describe the gap and which track it belongs to
- **Correction** — specific error with source/evidence
- **Stale content** — module that needs updating with what changed

---

## Code of Conduct

Be constructive. Corrections and disagreements are welcome — hostility is not.
If a module explanation is wrong, say why and provide evidence. If you'd explain
it differently, show the alternative — don't just say the current version is bad.

---

## Licence

By contributing, you agree that your contributions will be licensed under the same
terms as the project: CC BY-SA 4.0 for content, MIT for code. See [`LICENSE`](LICENSE).
