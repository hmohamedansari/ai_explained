# Site Strategy
> Status: Draft — under review
> Last updated: 2026-03-22

Four goals for the site. Each section lists what exists, what's missing, and the decisions needed before building.

Anything requiring a dedicated server (user accounts, hosted labs, LMS features) is explicitly deferred to the next project.

---

## Goal 1: Personal Brand

Build visibility and trust as the creator and curator — not a faceless wiki.

### What we have
- None yet. No author presence is designed into the site.

### Missing
- [ ] **Author / about page** — your story, credentials, why you built this. The brand anchor — everything else points here.
- [ ] **"Built by [you]" attribution** — footer, GitHub README, and open graph metadata on every page.
- [ ] **Social links** — LinkedIn, X/Twitter, GitHub.
- [ ] **Newsletter signup** — lowest-effort, highest-return brand tool. Static embed, no server. Platform decision needed (see Decisions below).
  - **Privacy prerequisites (must be done before signup goes live):** privacy policy page, consent language on the form ("I agree to receive emails — unsubscribe any time"), data processor disclosure (which platform stores the emails and where), and a working unsubscribe link in every email. Without these, the signup is a launch blocker in GDPR jurisdictions. These are not optional polish — they are legal requirements for email collection in most markets.
- [ ] **RSS feed** — Astro generates this for free. Devs who won't give an email will subscribe via RSS.
- [ ] **Blog / notes section** — your running commentary on AI developments. Differentiates the site from a faceless reference wiki. Even one post per month compounds over time.
- [ ] **Open Graph / social card images** — branded image when a module link is shared on LinkedIn or X. Astro plugin, one-line config. Important for brand impressions.

### Notes
Linux Journey has no author identity — that's why you've never heard of who made it. You want the opposite.

---

## Goal 2: Open Source / Community Contributions

Anyone can raise a PR to update or add content.

### What we have
- Modular curriculum (one module per file — ideal for focused PRs)
- Curriculum validator (automated PR quality gate)
- 3-layer content schema in `content-spec.md`

### Missing
- [ ] **License** — undefined. Critical before going public. Decision needed (see Decisions below).
- [ ] **CONTRIBUTING.md** — how to propose a new module, fix a mistake, translate content. Must reference the validator and module template.
- [ ] **Module template** — a fill-in-the-blank `.md` file contributors copy when adding a module. Enforces the 3-layer schema without requiring contributors to read `content-spec.md` first.
- [ ] **GitHub issue templates** — three types: `new-module`, `correction`, `stale-content`. Just files in `.github/ISSUE_TEMPLATE/`.
- [ ] **GitHub Discussions** — free community Q&A, no server. Where learners ask questions and contributors discuss proposals.
- [ ] **"Good first issue" labels and examples** — fixing a typo, adding a glossary term, updating a "last reviewed" date. Needed to attract first-time contributors.
- [ ] **Content governance doc** — who approves PRs? What's the review process? Even if it's just you initially, document it. Lowers ambiguity for contributors.
- [ ] **Contributor wall** — a page or footer section showing GitHub contributors. Motivates contribution, builds community.
- [ ] **"Suggest an edit" link on every page** — links directly to the source file on GitHub. The single mechanic that actually drives OSS content contributions.

---

## Goal 3: Linux Journey Inspired

Clean, lesson-based, zero friction. The mechanics that make Linux Journey work.

### What we have
- Astro SSG (static, fast, correct tech choice)
- Chapter / track structure already designed

### Missing
- [ ] **Chapter / lesson navigation** — sidebar with lesson list and progress indicators.
- [ ] **localStorage progress tracking** — "mark as read" per lesson, stored client-side. No server, no login. Linux Journey uses exactly this.
- [ ] **Simple inline quizzes** — 3–5 questions per module, client-side JS only, no backend. Score stored in localStorage. The key engagement mechanic from Linux Journey. Replaces the practice-test need until the LMS.
- [ ] **"Next lesson →" at the bottom of every page** — removes the "what do I read next?" decision.
- [ ] **Mobile-first layout** — most of the audience will be reading on a phone.
- [ ] **Print / save as PDF** — CSS print media query. Learners print things they want to keep.

### Notes
Do not copy the one thing Linux Journey gets wrong: no author identity.

---

## Goal 4: Freely Available Tools

Link to free resources so learners can practice without spending money.

### What we have
- None yet. No external tools index.

### Missing
- [ ] **Tools index per track** — a curated table of free tools for each track. All 9 tracks need coverage; contributors should not assume a track is out of scope if it is not listed here. Starter examples:
  - Track 1 (Foundations) → Anthropic free tier, HuggingFace Spaces, OpenRouter free models
  - Track 2 (RAG) → LangSmith free tier, Weaviate sandbox, Cohere free API, Qdrant free tier
  - Track 3 (Protocols) → MCP Inspector, LangGraph Studio, AG-UI playground
  - Track 4 (Agents) → LangGraph Studio, CrewAI free tier, AutoGen local, E2B sandbox free tier
  - Track 5 (Infrastructure) → Ollama, LM Studio, Google Colab, HuggingFace Inference API free tier
  - Track 6 (Evaluation) → Langfuse free tier, RAGAS library, Promptfoo (open source)
  - Track 7 (Safety) → Garak (open source red-teaming), Promptfoo adversarial mode, OWASP LLM checklist
  - Track 8 (Strategy) → No-code tools: HuggingFace Spaces demos, vendor pricing calculators (Anthropic, OpenAI, Google)
  - Track 9 (Multimodal) → Whisper (open source), LLaVA via Ollama, HuggingFace multimodal Spaces
- [ ] **Google Colab links** — for every code-heavy module, a runnable Colab notebook as the zero-friction alternative to local setup. Contributors can add these.
- [ ] **"Free tier" / "No card required" badges** — learners notice this. Removes the biggest friction point.
- [ ] **Version / last-verified dates on tool links** — free tiers change. Links need a "verified YYYY-MM" date.

---

## What to add (not in the original four goals)

These are worth adding to the plan:

- [ ] **Changelog / "What's new"** — as the curriculum grows, returning learners need to know what changed. A simple `CHANGELOG.md` rendered on the site. Also a newsletter content source.
- [ ] **SEO basics** — Astro generates static HTML which Google indexes well. Needs: descriptive `<title>` and `<meta description>` per page, structured data for breadcrumbs, `sitemap.xml` (Astro plugin). Low effort, high return.
- [ ] **Contributor attribution on module pages** — show who wrote or reviewed a module. Incentivises quality contributions and adds credibility.

---

## Decisions needed before building

Recommendations are point-in-time opinions, not permanent conclusions. Each row has a "verified" date — re-evaluate before acting if more than 6 months have passed.

| # | Decision | Options | Recommendation | Verified |
|---|---|---|---|---|
| 1 | **Content license** | CC BY-SA 4.0 / CC BY 4.0 / CC0 | CC BY-SA 4.0 — attribution + share-alike protects content while keeping it open | 2026-03 |
| 2 | **Code license** | MIT / Apache 2.0 | MIT — simpler | 2026-03 |
| 3 | **Newsletter platform** | Beehiiv / Buttondown / ConvertKit | Beehiiv free tier — strong dev audience fit and clean embed UX at time of writing | 2026-03 |
| 4 | **Client-side progress** | localStorage (Linux Journey style) / none | localStorage — adds polish, no server needed | 2026-03 |
| 5 | **Inline quizzes** | Client-side JS / none for now | Simple JS quiz component is worth it — the key engagement mechanic | 2026-03 |
| 6 | **Hosting** | GitHub Pages / Netlify / Cloudflare Pages | Cloudflare Pages — strong global performance and free tier at time of writing | 2026-03 |
| 7 | **Privacy policy** | Write from scratch / use a generator (e.g. Iubenda, Termly free tier) | Generator for v1 — faster to ship, covers GDPR basics; review with a lawyer before significant traffic | 2026-03 |

---

## Suggested build order

Work through this list top to bottom. Items in the same group can be done in parallel.

**Group 1 — Decisions (do first, nothing else is blocked on these)**
1. Agree content and code license
2. Choose newsletter platform
3. Choose hosting
4. Decide privacy policy approach (blocks newsletter signup going live)

**Group 2 — Foundation (brand + OSS infrastructure)**
4. Author / about page
5. CONTRIBUTING.md + module template
6. GitHub issue templates (3 types)
7. LICENSE files (content + code)

**Group 3 — Content (can overlap with Group 2)**
8. Tools index (one table per track)
9. Google Colab notebooks for code-heavy modules

**Group 4 — Site mechanics (Linux Journey feel)**
10. Lesson navigation sidebar
11. localStorage progress + "mark as read"
12. Inline quiz component (client-side JS)
13. "Next lesson →" footer nav
14. "Suggest an edit" link on every page

**Group 5 — Growth hooks**
15. Newsletter signup embed
16. RSS feed
17. Open Graph social card images
18. SEO metadata + sitemap.xml
19. Changelog page
20. Contributor wall

---

## Explicitly deferred (next project — LMS)

- User accounts and server-side progress
- Hosted lab environments
- Practice tests with scoring
- Hands-on AI sandboxes
- Marketing
