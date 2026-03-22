# Content Specifications
> Last reviewed: 2026-03-20 | Volatility: `stable`
> Owner: [unassigned] | Reviewer: [unassigned]

Authoring standards for all curriculum modules. Every author must read this before writing a module.

---

## Progressive Disclosure: The Three Layers

Every module is authored in three explicit layers. The content schema encodes which layer each section belongs to. Authors must write all three; the UI renders them conditionally.

### Layer 1 — Surface (always visible)
- 2–3 sentence plain-English summary of what the concept is and why it matters.
- A single Mermaid.js diagram (or illustration placeholder).
- A "Production Gotcha" callout — the one thing that bites people in practice.
- Persona tags and prerequisite links.
- **Target reading time:** < 3 minutes.

### Layer 2 — Guided (visible by default for Dev personas; toggle for others)
- Step-by-step walkthrough with working, annotated code.
- "Before vs. After" comparisons where applicable.
- Common mistakes and how to identify them.
- **Target reading time:** 10–20 minutes.

### Layer 3 — Deep Dive (behind toggle for all personas)
- Architecture-level analysis: why this design was chosen over alternatives.
- Production failure modes with named taxonomy.
- Performance benchmarks or cost analysis where relevant.
- Links to primary sources (papers, RFCs, official docs).
- **Target reading time:** 30+ minutes.

---

## Content Schema (Astro Content Collections)

```typescript
{
  difficulty: 'conceptual' | 'guided' | 'deep-dive',  // maps to Layer 1/2/3
  persona: ('beginner' | 'leader' | 'junior' | 'senior' | 'sre')[],
  status: 'planned' | 'draft' | 'reviewed' | 'published' | 'stale',
  volatility: 'stable' | 'emerging' | 'volatile',
  lastReviewed: string,             // ISO date, required
  layer1_summary: string,           // required
  layer2_walkthrough?: string,      // required if difficulty >= 'guided'
  layer3_analysis?: string,         // required if difficulty == 'deep-dive'
  production_gotcha: string,        // required on all modules
  mermaid_diagram?: string,         // optional but strongly encouraged
  literacy_checkpoint?: string,     // link to a real article the learner can now read
}
```

---

## Anatomy of a Module (Rendered Output)

1. **Header:** Title, persona tags, prerequisites, estimated time per layer.
2. **Layer 1:** Summary + diagram + Production Gotcha.
3. **"Deep Dive" toggle** — renders Layers 2 and 3 on click.
4. **Layer 2:** Guided walkthrough with code.
5. **Layer 3:** Architecture analysis + benchmarks + sources.
6. **Literacy Checkpoint:** "After this module, you can read: [article link]."
7. **Glossary Links:** Every new term hyperlinked inline.

> **UI note:** The toggle label is "Show Deep Dive ↓" / "Hide Deep Dive ↑" — not "Advanced." Labels that imply difficulty create anxiety and reduce engagement.

---

## Rendering Convention: Core vs. Optional Modules

Learning path pages must visually distinguish core (required) modules from optional extensions.

| Element | Core modules | Optional extensions |
|---|---|---|
| List style | Numbered, sequential | Bulleted, grouped under "Optional Extensions" |
| Visual treatment | Normal weight, full colour | Muted/secondary style, "Optional" badge |
| Completion tracking | Counts toward path completion | Never counts toward completion percentage |
| CTA | "Start module →" | "Explore if relevant →" |

**Rule:** Optional modules must never appear in a numbered list. The numbered-vs-bullet convention in `paths.md` source files is the authoring contract that drives this rendering distinction. Do not break it.

---

## Author Guidelines

### Writing Layer 1
- Write Layer 1 first, always. If you can't explain the concept in 3 sentences, you don't understand it well enough yet.
- The "Production Gotcha" callout is mandatory. It must describe something that has actually bitten production teams — not a theoretical concern.
- Assume the reader is intelligent, not experienced. No jargon without a glossary link.

### Writing Layer 2
- Code must run. No pseudocode. Test it before committing.
- Include a "Before vs. After" comparison for modules that replace a naive approach.
- Cover the most common mistake first — not the most interesting edge case.

### Writing Layer 3
- Must cite at least one primary source (paper, RFC, official changelog). No secondary-source-only deep dives.
- Performance benchmarks must include the hardware used, the model tested, and the date — these numbers decay.
- Architecture analysis should explain *why* the design was chosen over alternatives, not just *what* the design is.

### Tone
- Direct. Architectural. Focus on *why* as much as *how*.
- No "in this tutorial we will learn..." preamble.
- No filler transitions ("Now that we've seen X, let's look at Y...").
- Assume the reader is intelligent, not experienced.

---

## Production Gotcha Callouts

If a module teaches a concept from `common-gotchas.md`, it must include an explicit callout at Layer 1:

```
> **Common Gotcha:** Most teams discover this only after a painful production failure.
> [Brief description of the failure mode and why it's non-obvious.]
```

This callout appears at Layer 1 — not buried in Layer 3.

---

## Publication Gate Checklist

Before marking a module `reviewed`, the author must confirm:

- [ ] Layer 1 written and readable by a non-expert.
- [ ] Production Gotcha is specific and actionable.
- [ ] Layer 2 code runs without modification.
- [ ] Layer 3 includes at least one primary source citation with date.
- [ ] All new terms link to glossary entries.
- [ ] Literacy Checkpoint link is live and the article is accessible.
- [ ] Module metadata fields (status, volatility, lastReviewed) are accurate.
- [ ] No TODO placeholders remain unresolved.
