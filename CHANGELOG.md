# Changelog

All notable changes to AI Explained are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [Unreleased]

---

## [0.3.0] — 2026-03-23

### Added
- **Tools index** (`/tools`): 28 free tools across all 9 tracks, categorised as Free / Free tier / Open source with verified dates and jump navigation
- **RSS feed** (`/rss.xml`): all published modules in curriculum order; autodiscovery `<link>` on every page
- **SEO**: `BreadcrumbList` + `LearningResource` JSON-LD on module and track pages; optional `seoTitle` / `seoDescription` frontmatter fields for modules
- **Sitemap**: `sitemap-index.xml` generated at build via `@astrojs/sitemap`
- **OG images**: branded 1200×630 PNG generated at build time for each published module (`/og/{track}/{module}.png`)
- **Changelog**: this page

### Changed
- Footer: fixed placeholder GitHub URL; added Tools, RSS, and Changelog links
- Header: added Tools nav link

---

## [0.2.0] — 2026-03-23

### Added
- **Sidebar navigation**: track module list with localStorage-backed read/unread progress dots; updates live without page reload via `module:read` CustomEvent
- **Mark as read**: button at the bottom of every module, persisted to localStorage; abstraction layer in `src/utils/progress.ts` designed for future swap to server-backed store
- **Inline quiz**: client-side multiple-choice quiz component with per-question feedback, final score, retry, and localStorage score persistence
- **Quiz data**: 5 questions for module 1.1 (What is an LLM?)
- **GitHub issue templates**: `new-module`, `correction`, `stale-content`

### Changed
- Layout: module pages now use a two-column layout (sidebar + content)

---

## [0.1.0] — 2026-03-23

### Added
- **Content schema**: 9-track curriculum with 3-layer progressive disclosure (Surface / Guided / Deep Dive)
- **First published module**: 1.1 — What is an LLM? (Foundations track), covering stateless function mental model, tokens, context window, temperature, inference, and architecture implications across all three layers
- **Quiz schema**: multiple-choice only; `answer` validated as integer index within `options[]` bounds at build time
- **Routing**: `/learn/[track]/[module]` URL structure with prev/next navigation
- **Open source foundation**: dual license (CC BY-SA 4.0 content + MIT code), `CONTRIBUTING.md`, contributor module template
- **Redirect**: `/learn/how-agents-work` → `/learn` for old prototype URLs
