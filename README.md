# AI Explained

AI systems learning for engineers who prefer evidence to magic.

The current release begins with **Automation to Agents**: a seven-part journey that starts with deterministic automation, makes state and reliability visible, then shows exactly where an LLM belongs in an engineering system.

Live site: [ai.hmohamedansari.com](https://ai.hmohamedansari.com)

## What is here now

- A learner-first homepage and curriculum map.
- The published **Automation to Agents** foundation journey.
- Short quizzes and local progress tracking.
- The Engineering Troubleshooting Workbench concept: a small, local Python application that grows from explicit rules into a bounded, tool-using system.
- An Advanced roadmap for MCP, A2A and multi-agent systems.
- A production roadmap for observability, reliability and security.

Earlier lessons remain in the repository during the staged migration. They are reference material, not the recommended place to begin.

## Run locally

```bash
npm install
npm run dev
```

Build the static site:

```bash
npm run build
```

## Stack

- [Astro](https://astro.build) with MDX content collections
- React islands for quizzes and progress
- Tailwind CSS
- GitHub Actions and GitHub Pages

## Content and publishing

Published lessons live in `src/content/modules/`; their quiz data lives in `src/content/quizzes/`. Curriculum journeys are defined in `src/content/journeys/` and tracks in `src/content/tracks/`.

Every change to `main` is built and published by GitHub Actions. The site is intentionally static: learner progress stays in the browser, and the course does not collect a learner account or email address.

## Direction

The next substantial learning journey is **Agents in Production**: Kubernetes, OpenTelemetry, OpAMP, Grafana, SRE golden signals, reliability practice and security boundaries. The goal is not to make agents sound magical. It is to help people operate systems they can explain, observe and trust.
