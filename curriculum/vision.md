# Vision, Design Principles & Technical Architecture
> Last reviewed: 2026-03-20 | Volatility: `stable`

---

## 1. Vision & Core Philosophy

**AI Academy** is the definitive hands-on education platform for AI — from "what is an LLM?" to designing production multi-agent systems. It serves everyone from absolute beginners to infrastructure engineers, without watering down either end.

### The Central Problem We Solve

Most AI education treats AI as a **model consumption problem** (pick a model, write a prompt, call an API). But production AI is a **systems engineering problem** — with typed contracts, observability, failure modes, safety constraints, and organisational integration — that *happens to involve LLMs*. We teach both realities.

---

## 2. Design Principles

- **Progressive Disclosure:** Simple summaries first. "Deep Dive" toggles reveal production-grade complexity.
- **Persona-Aware Entry Points:** Every topic has a layered entry — executive brief, guided tutorial, and architecture deep-dive.
- **Code-First for Devs:** Every dev module includes a working, runnable code snippet. No pseudocode.
- **Unknown Unknowns First:** Surface the concepts practitioners discover only after painful production failures.
- **Read Real Things:** After each path, learners should be able to read frontier engineering blogs and understand them fully.
- **Zero Jargon Gates:** No concept is assumed. Every term links to a plain-English definition.
- **Diagrams over Text:** Use Mermaid.js or SVG for architecture flows wherever possible.
- **Role-Based Filtering:** The UI allows users to "Choose their Path" on the landing page.

---

## 3. Technical Architecture

| Concern | Choice | Rationale |
|---|---|---|
| Framework | Astro 4.x (SSG) | Speed, SEO, zero-cost hosting |
| Styling | Tailwind CSS | Utility-first, consistent design tokens |
| Interactivity | React + Framer Motion | Deep Dive toggles, animated diagrams |
| Content | Astro Content Collections (typed MDX) | Schema-enforced, queryable |
| Diagrams | Mermaid.js | Architecture flows, no image dependencies |
| Hosting | Cloudflare Pages / Vercel (free tier) | Globally distributed, zero ops |
| Fonts | Geist Sans + JetBrains Mono | Geometric UI + technical code |

---

## 4. Visual Design Language

- **Layout:** Bento Grid + Glassmorphism — structured cards with semi-transparent blurred backgrounds.
- **Theme:** 'Midnight AI' — deep charcoal `#0F172A` backgrounds with cyan/violet neon accents.
- **UX Pattern:** Progressive Disclosure — see `content-spec.md` for the full spec and schema mapping.
- **Persona Indicators:** Colour-coded pill tags on every module (Leader / Apprentice / Architect / Engineer).
- **Literacy Checkpoints:** "After this, you can read:" callouts linking to real frontier articles.
