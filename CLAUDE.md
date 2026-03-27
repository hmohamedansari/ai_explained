# ai_explained — Claude Code Context

## What this project is

"AI Explained" — a free, open-source AI literacy platform for developers and tech leaders.
Published as an Astro SSG site. Every concept is a module with three progressive layers of depth.

---

## Voice and tone

**Conversational, not textbook.** Write like a senior engineer explaining to a smart colleague,
not like an academic paper. If a sentence sounds like it belongs in a university syllabus, rewrite it.

**Practical, not theoretical.** Every concept must be grounded in what happens in production.
Inspiration: LPIC certifications — direct, skills-focused, no fluff.

**Vendor-agnostic, but not sterile.** Do not position any one provider (Anthropic, OpenAI, Google,
Mistral, etc.) as "the right way." Use real provider examples to make concepts concrete — that's
fine and necessary — but the learner must walk away with portable knowledge, not vendor lock-in.
Wrong: "Use Claude's tool_use for best results." Right: "Most providers implement tool use via a
tools array in the request — here's the pattern."

**No preamble.** Never open with "In this module, we will learn..." or "By the end of this module..."
Start with the thing itself.

---

## Current information — verify before writing

Model names and APIs change fast. Before using any model ID, embedding model, or API feature,
verify it is current. Known gotchas:

- `text-embedding-004` (Google) — shut down January 14, 2026. Use `gemini-embedding-001`.
- Model IDs like `claude-opus-4-6-20251101` change with versions — use the current documented ID.
- MCP transport: current spec is Streamable HTTP (with optional SSE). Legacy HTTP+SSE is deprecated.
- `stop_reason: end_turn` does NOT mean refusal — refusals are `end_turn` with content explaining
  the refusal, not a distinct stop reason.

When in doubt, write the concept without pinning a specific model ID, or use a generic placeholder
like `"model": "your-preferred-model"`.

---

## File structure

```
src/content/modules/{track_slug}/{kebab-case-title}.mdx   ← module content
src/content/quizzes/{moduleId}.json                        ← quiz (required, one per module)
```

Track slugs:
- Track 1 → `foundations`
- Track 2 → `rag`
- Track 3 → `protocols`
- Track 4 → `agents`
- Track 5 → `infrastructure`
- Track 6 → `evaluation`
- Track 7 → `safety`
- Track 8 → `strategy`
- Track 9 → `multimodal`

---

## Curriculum specs

Before writing any module, read its entry in the relevant track file:
```
curriculum/tracks/track-5-infrastructure.md
curriculum/tracks/track-6-evaluation.md
curriculum/tracks/track-7-safety.md
curriculum/tracks/track-8-strategy.md
curriculum/tracks/track-9-multimodal.md
```

Each entry has: key concepts, personas, production gotcha, volatility, and notes.
Use this as the source of truth. Do not invent concepts not listed there.

---

## Module format

**Quality benchmark:** `src/content/modules/agents/what-is-an-agent.mdx` — match this depth,
style, and code quality.

### Frontmatter

```yaml
---
moduleId: "5.1"
title: "Module Title"
description: "2-3 sentence plain-English summary. Why does this matter in production?"
track: "infrastructure"
order: 1
personas: ["junior", "senior", "sre"]   # from curriculum spec
volatility: "stable"                     # from curriculum spec: stable | emerging | volatile
status: "draft"
lastReviewed: "2026-03-25"
estimatedMinutes:
  layer1: 5
  layer2: 15
  layer3: 30
productionGotcha: "One sentence. Specific. Matches the gotcha in the curriculum spec."
draft: false
---
```

### Three-layer structure

**Layer 1 — Surface** (always visible, < 3 min)
- Plain English — assume intelligent, not experienced
- One comparison table or ASCII diagram
- Production Gotcha callout block
- No jargon without a definition

**Layer 2 — Guided** (10–20 min)
- Working, annotated code — no pseudocode, must run as-is
- Before vs. After comparison where applicable
- Cover the most common mistake first, not the most interesting edge case

**Layer 3 — Deep Dive** (30+ min)
- Why this design was chosen over alternatives
- Named taxonomy of production failure modes
- At least one primary source (paper, RFC, official docs) with author and year

Use `---` between layers.

---

## Quiz format

Every module requires a quiz at `src/content/quizzes/{moduleId}.json`.
Five questions per quiz. All multiple-choice. No true/false, no code-spot.

**Question quality bar:**
- Scenario-based, not definition recall ("You deployed X and Y happened — why?")
- Wrong answers must be plausible — common misconceptions, not obvious nonsense
- Explanations must address *why* the wrong answers are wrong, not just confirm the right one
- Vary difficulty: 2 accessible, 2 intermediate, 1 that requires real understanding

```json
{
  "title": "Module Title — Check your understanding",
  "moduleId": "5.1",
  "questions": [
    {
      "id": "5.1-q1",
      "type": "multiple-choice",
      "question": "Scenario-based question here?",
      "options": [
        "Plausible wrong answer",
        "Plausible wrong answer",
        "Correct answer",
        "Plausible wrong answer"
      ],
      "answer": 2,
      "explanation": "Why the correct answer is right AND why the common wrong answers are wrong. 2-4 sentences.",
      "personas": ["junior", "senior", "sre"]
    }
  ]
}
```

Reference: `src/content/quizzes/2.6.json` is a high-quality example — match this standard.

---

## Quality gate — before committing

- [ ] No placeholder text ("Write your X here", TODO, etc.)
- [ ] Layer 2 code is real and runs without modification
- [ ] Layer 3 has at least one primary source with date
- [ ] `productionGotcha` matches the curriculum spec (substance, not word-for-word)
- [ ] `draft: false`, `status: "draft"`
- [ ] All model names and API features verified as current (not deprecated)
- [ ] Tone is conversational — no textbook preamble, no "in this module"
- [ ] No provider positioned as "the right way"
- [ ] Quiz file exists at `src/content/quizzes/{moduleId}.json` with 5 questions
- [ ] `npm run build` passes with no errors

---

## Build command

```bash
npm run build
```

Run before every commit. Fix all errors before committing.

---

## Commit format

One commit per module. Include both the MDX and the quiz JSON in the same commit.

```
feat(track-5): add module 5.1 — Local LLM Stack
```
