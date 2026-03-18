# AI Explained

A teaching site for how AI agents actually work — built for tech leaders, developers, and SRE/DevOps engineers. No hype, no magic. Concrete mental models, real protocols, working code, and quizzes to check understanding.

Live: **https://hmohamedansari.github.io/ai_explained**

---

## What This Is

A statically-generated learning site with:
- **Role-based learning paths** — onboarding quiz routes users to a curriculum tailored to their background (tech leader / new dev / experienced dev / SRE-DevOps)
- **MDX lessons** — rich markdown with embedded components, syntax-highlighted code blocks
- **Interactive quizzes** — per-question checking, explanations, scoring, retry
- **GitHub Pages deployment** — every push to `main` builds and deploys automatically

---

## Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | [Astro 4](https://astro.build) | Static output by default, React islands for interactivity, MDX for content |
| Interactivity | React (islands) | Only hydrates components that need JS — quiz, role selector |
| Styling | Tailwind CSS + Typography plugin | Utility-first, prose styling for lesson content |
| Content | Astro Content Collections | Type-safe frontmatter, validated schemas, `getCollection` queries |
| Deployment | GitHub Actions → GitHub Pages | Zero infrastructure, triggers on push to `main` |

---

## Project Structure

```
src/
├── content/                   # All teachable content lives here
│   ├── config.ts              # Zod schemas for all collections
│   ├── concepts/              # Lesson files (.mdx) — one file = one page
│   │   ├── architecture-overview.mdx
│   │   ├── tools.mdx
│   │   └── mcp.mdx
│   ├── modules/               # Module metadata (.json) — groups lessons
│   │   └── how-agents-work.json
│   └── quizzes/               # Quiz questions (.json) — linked to a concept
│       ├── tools.json
│       └── mcp.json
│
├── components/
│   ├── layout/                # Header, Footer, Sidebar, LessonProgress (Astro)
│   ├── onboarding/            # RoleSelector.tsx (React island)
│   └── quiz/                  # Quiz.tsx (React island)
│
├── layouts/
│   ├── BaseLayout.astro       # HTML shell, meta tags
│   └── LessonLayout.astro     # Lesson page: sidebar + content + right rail
│
├── pages/
│   ├── index.astro            # Landing page
│   ├── onboarding.astro       # Role selector → routes to a learning path
│   ├── paths/
│   │   ├── tech-leader.astro
│   │   ├── new-dev.astro
│   │   ├── experienced-dev.astro
│   │   └── sre-devops.astro
│   └── learn/
│       └── [module]/
│           ├── index.astro        # Module overview + lesson list
│           ├── [lesson].astro     # Individual lesson page
│           └── [lesson]/
│               └── quiz.astro     # Quiz for that lesson
│
└── styles/
    └── global.css             # Tailwind directives + custom component classes
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

Dynamic routes (`[module]`, `[lesson]`) call `getStaticPaths()` at build time, which queries the content collections and generates one HTML file per entry.

---

## How to Add Content

### Add a new lesson

1. Create `src/content/concepts/your-lesson-slug.mdx`
2. Add frontmatter:

```yaml
---
title: "Your Lesson Title"
description: "One-line description shown in listings and meta tags."
module: "how-agents-work"      # must match a module ID in src/content/modules/
order: 4                        # position in the module's lesson list
audiences: ["tech-leader", "new-dev", "experienced-dev", "sre-devops"]
estimatedMinutes: 10
tags: ["tag1", "tag2"]
draft: false
---
```

3. Write lesson content in MDX below the frontmatter. Standard markdown works. Code blocks get syntax highlighting automatically.

That's it. Routes, sidebar, prev/next navigation, and the lesson listing all update automatically on the next build.

### Add a quiz for a lesson

Create `src/content/quizzes/your-lesson-slug.json`:

```json
{
  "title": "Quiz Title",
  "concept": "your-lesson-slug",
  "questions": [
    {
      "id": "q1",
      "type": "multiple-choice",
      "question": "Your question here?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "answer": 1,
      "explanation": "Why the answer is correct — shown after the user checks.",
      "audiences": ["tech-leader", "new-dev", "experienced-dev", "sre-devops"]
    }
  ]
}
```

Supported question types: `multiple-choice`, `true-false`, `code-spot`.
The `answer` field is a zero-based index into `options`.

### Add a new module

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

Then point lessons at it by setting `module: "your-module-slug"` in their frontmatter.

---

## Local Development

```bash
npm install
npm run dev        # starts dev server at localhost:4321
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

**One-time setup:** Go to repo → Settings → Pages → Source → set to **GitHub Actions**.

After that, every `git push origin main` deploys automatically.

---

## Content Roadmap

| Module | Status |
|---|---|
| How AI Agents Work | ✅ Live |
| Building Your First Agent | Planned |
| Auth & Security (OAuth for MCP) | Planned |
| Resources + Subscriptions | Planned |
| Multi-server Routing | Planned |
| Homelab Integration (Proxmox, K3s, Ollama) | Planned |
