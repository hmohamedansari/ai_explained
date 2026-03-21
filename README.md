# AI Academy

The definitive hands-on education platform for AI — from "what is an LLM?" to designing production multi-agent systems. Serves five audiences without watering down either end.

Live: **https://hmohamedansari.github.io/ai_explained**

---

## What This Is

A statically-generated learning platform with:
- **5 audience-tailored learning paths** — Curious Beginner, Tech Leader, Junior Dev, Senior Dev, SRE/DevOps (+ Multimodal Specialist extension)
- **9 curriculum tracks** — 83 planned modules covering foundations through production multi-agent systems, evaluation, safety, and strategy
- **Progressive disclosure** — every module has three layers: plain-English summary, guided walkthrough with code, and deep-dive architecture analysis
- **MDX lessons** — rich content with embedded components and syntax-highlighted code
- **Interactive quizzes** — per-question checking, explanations, scoring, retry
- **GitHub Pages deployment** — every push to `main` builds and deploys automatically

---

## Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | [Astro 4](https://astro.build) | Static output, React islands for interactivity, MDX for content |
| Interactivity | React + Framer Motion | Quiz, role selector, Deep Dive toggles |
| Styling | Tailwind CSS + Typography plugin | Utility-first, prose styling for lesson content |
| Content | Astro Content Collections | Type-safe frontmatter, validated schemas, `getCollection` queries |
| Diagrams | Mermaid.js | Architecture flows with no image dependencies |
| Deployment | GitHub Actions → GitHub Pages | Zero infrastructure, triggers on push to `main` |

---

## Project Structure

```
ai_explained/
│
├── curriculum/                    # Curriculum planning (not site content)
│   ├── index.md                   # TOC, publication gates, review cadence
│   ├── vision.md                  # Platform vision, design principles
│   ├── personas.md                # Audience definitions
│   ├── tracks/                    # One file per curriculum track (9 total)
│   │   ├── track-1-foundations.md
│   │   ├── track-2-rag.md
│   │   └── ...
│   ├── paths.md                   # Learning paths A–F (MVP + extended)
│   ├── content-spec.md            # Authoring standards, progressive disclosure spec
│   ├── unknown-unknowns.md        # Production gotchas surfaced early
│   ├── glossary-system.md         # Glossary and concept card system
│   ├── labs.md                    # Interactive lab specs
│   └── registry.md                # Auto-generated module index (83 modules)
│
├── scripts/
│   ├── validate-curriculum.py     # Curriculum validator (see below)
│   └── tests/                     # Validator test suite + fixtures
│
└── src/
    ├── content/                   # Published site content
    │   ├── config.ts              # Zod schemas for all collections
    │   ├── concepts/              # Lesson files (.mdx)
    │   ├── modules/               # Module metadata (.json)
    │   └── quizzes/               # Quiz questions (.json)
    │
    ├── components/
    │   ├── layout/                # Header, Footer, Sidebar, LessonProgress
    │   ├── onboarding/            # RoleSelector.tsx (React island)
    │   └── quiz/                  # Quiz.tsx (React island)
    │
    ├── layouts/
    │   ├── BaseLayout.astro       # HTML shell, meta tags
    │   └── LessonLayout.astro     # Sidebar + content + right rail
    │
    └── pages/
        ├── index.astro            # Landing page
        ├── onboarding.astro       # Audience selector → learning path
        ├── paths/                 # One page per learning path
        └── learn/
            └── [module]/
                ├── index.astro        # Module overview + lesson list
                ├── [lesson].astro     # Individual lesson page
                └── [lesson]/
                    └── quiz.astro     # Quiz for that lesson
```

---

## Curriculum Tracks

| Track | Topic | Modules |
|---|---|---|
| 1 | How AI Actually Works (Foundations) | 10 |
| 2 | Knowledge & Memory (RAG & Context Engineering) | 11 |
| 3 | Interaction & Protocols (Tools, MCP & the Agentic Web) | 9 |
| 4 | Agentic Brains (Orchestration & Architecture) | 11 |
| 5 | Engine Room (Infrastructure, Serving & Fine-Tuning) | 10 |
| 6 | Control Room (Evaluation & LLMOps) | 10 |
| 7 | Safety, Red Teaming & Compliance | 10 |
| 8 | AI Strategy & Organisational Integration | 7 |
| 9 | Multimodal AI (Deep Dive) | 5 |

Full details in [`curriculum/`](curriculum/). Module registry in [`curriculum/registry.md`](curriculum/registry.md).

---

## Curriculum Validator

A Python script enforces consistency across all curriculum planning files.

```bash
npm run curriculum:validate          # validate — exits 1 on errors
npm run curriculum:registry          # validate + regenerate registry.md
npm run curriculum:test              # run the validator test suite
```

Checks: unique module IDs, track-prefix alignment, valid volatility/status tags, required metadata fields, cross-reference integrity across `paths.md`, `unknown-unknowns.md`, and `index.md`.

Add as a pre-push hook:
```bash
# .git/hooks/pre-push  (chmod +x)
python3 scripts/validate-curriculum.py || exit 1
```

---

## How Routing Works

Astro generates all routes at build time from the content collections.

| URL | Source |
|---|---|
| `/` | `src/pages/index.astro` |
| `/onboarding` | `src/pages/onboarding.astro` |
| `/paths/tech-leader` | `src/pages/paths/tech-leader.astro` |
| `/learn` | `src/pages/learn/index.astro` |
| `/learn/how-agents-work` | `src/pages/learn/[module]/index.astro` |
| `/learn/how-agents-work/tools` | `src/pages/learn/[module]/[lesson].astro` |
| `/learn/how-agents-work/tools/quiz` | `src/pages/learn/[module]/[lesson]/quiz.astro` |

Dynamic routes call `getStaticPaths()` at build time, querying content collections to generate one HTML file per entry.

---

## How to Add Content

### Add a lesson

1. Create `src/content/concepts/your-lesson-slug.mdx`
2. Add frontmatter:

```yaml
---
title: "Your Lesson Title"
description: "One-line description shown in listings and meta tags."
module: "how-agents-work"
order: 4
audiences: ["tech-leader", "new-dev", "experienced-dev", "sre-devops"]
estimatedMinutes: 10
tags: ["tag1", "tag2"]
draft: false
---
```

3. Write lesson content in MDX. Routes, sidebar, and navigation update automatically on the next build.

### Add a quiz

Create `src/content/quizzes/your-lesson-slug.json`:

```json
{
  "title": "Quiz Title",
  "concept": "your-lesson-slug",
  "questions": [
    {
      "id": "q1",
      "type": "multiple-choice",
      "question": "Your question?",
      "options": ["A", "B", "C", "D"],
      "answer": 1,
      "explanation": "Shown after the user checks.",
      "audiences": ["tech-leader", "new-dev", "experienced-dev", "sre-devops"]
    }
  ]
}
```

Supported types: `multiple-choice`, `true-false`, `code-spot`. The `answer` field is a zero-based index into `options`.

### Add a module

Create `src/content/modules/your-module-slug.json`:

```json
{
  "title": "Module Title",
  "description": "What this module covers.",
  "order": 2,
  "icon": "🔐",
  "color": "brand",
  "audiences": ["tech-leader", "new-dev", "experienced-dev", "sre-devops"]
}
```

---

## Local Development

```bash
npm install
npm run dev        # dev server at localhost:4321
npm run build      # production build → dist/
npm run preview    # serve the production build locally
```

---

## Deployment

Handled by `.github/workflows/deploy.yml`. On every push to `main`:

1. GitHub Actions checks out the repo
2. Runs `npm ci && npm run build`
3. Uploads `dist/` as a Pages artifact
4. Deploys to GitHub Pages

**One-time setup:** Repo → Settings → Pages → Source → set to **GitHub Actions**.

---

## Site Content Status

| Module | Lessons | Status |
|---|---|---|
| How AI Agents Work | architecture-overview, what-is-an-llm, skills, tools, mcp | Live (partial audience coverage) |

Full curriculum of 83 modules is planned across 9 tracks. See [`curriculum/`](curriculum/) for the roadmap.
