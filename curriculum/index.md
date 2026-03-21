# AI Academy — Curriculum Index
> Last reviewed: 2026-03-20 | Status: Foundation draft
> Owner: [unassigned] | Reviewer: [unassigned]

This directory is the single source of truth for curriculum content. The top-level `curriculum_plan.md` is a merged snapshot kept for reference; all ongoing edits happen here.

---

## Directory Structure

```
curriculum/
├── index.md              ← This file. TOC, gates, and review cadence.
├── vision.md             ← Platform vision, design principles, tech architecture
├── personas.md           ← Audience definitions and specialisation extensions
├── tracks/
│   ├── track-1-foundations.md
│   ├── track-2-rag.md
│   ├── track-3-protocols.md
│   ├── track-4-agents.md
│   ├── track-5-infrastructure.md
│   ├── track-6-evaluation.md
│   ├── track-7-safety.md
│   ├── track-8-strategy.md
│   └── track-9-multimodal.md
├── paths.md              ← Learning paths A–F (with MVP and extended variants)
├── common-gotchas.md   ← Cross-cutting production gotchas surfaced early
├── content-spec.md       ← Progressive disclosure schema, author guidelines, tone
├── glossary-system.md    ← Glossary and concept card system
└── labs.md               ← Interactive lab scope and specs
```

---

## Volatility Legend

Used in module tables across track files to guide prioritisation and review cadence.

| Tag | Meaning |
|---|---|
| `stable` | Foundational. Unlikely to change significantly. Low review burden. |
| `emerging` | Active area of development. Revisit every 6 months. |
| `volatile` | Fast-moving. May need rewrite every 3 months. Flag before publishing. |

---

## Module Status Legend

| Status | Meaning |
|---|---|
| `planned` | Listed in curriculum, not yet authored |
| `draft` | Being written, not ready for review |
| `reviewed` | Peer-reviewed, ready for publishing decision |
| `published` | Live on site |
| `stale` | Published but flagged for update |

---

## Publication Gates

**A module cannot be published if any of the following are true:**

1. Any `TODO` placeholder remains unresolved (applies especially to literacy checkpoints in paths).
2. Module status is `draft` — it must reach `reviewed` first.
3. Layer 2 code has not been run and verified.
4. A `volatile` module has not been reviewed within the last 90 days.
5. Any linked glossary terms have no entry in the glossary system.

---

## Review Cadence

| Volatility | Review frequency | Owner |
|---|---|---|
| `stable` | Annually, or on major model/ecosystem shift | Content team |
| `emerging` | Every 6 months | Track lead |
| `volatile` | Every 3 months | Track lead, with LLM ecosystem check |

Tracks most at risk of staleness: **Track 3** (protocols), **Track 9** (multimodal), **Track 8** (AI landscape).

---

## Validation

Run the curriculum validator before committing changes to any file in this directory:

```bash
python3 scripts/validate-curriculum.py           # validate only
python3 scripts/validate-curriculum.py --registry  # validate + regenerate registry.md
```

The validator checks:
- Unique module IDs across all track files
- Module ID prefix matches track number
- Valid `volatility` and `status` tags
- Required `> Last reviewed:` and `> Owner:` fields on every file
- All module ID cross-references in `paths.md`, `common-gotchas.md`, and `index.md` resolve

Add it to CI or as a pre-push hook:
```bash
# .git/hooks/pre-push  (chmod +x)
python3 scripts/validate-curriculum.py || exit 1
```

---

## Change Impact Checklist

When editing curriculum files, check whether your change affects dependent files.

| If you change... | Also check... |
|---|---|
| A module ID | `paths.md`, `common-gotchas.md`, `index.md` cross-reference map, any track file that links to it |
| A module title | `registry.md` (regenerate with `--registry`), `paths.md` if referenced by name |
| A module's personas | `paths.md` (path may route the wrong audience), `personas.md` |
| A module's volatility | Review cadence — does it now need more or less frequent review? |
| A track file's module table | Re-run the validator. A status change from `planned` to `published` triggers publication gates. |
| `personas.md` | `paths.md` (path prerequisites), all track files (persona tags), `content-spec.md` schema |
| `paths.md` | All track files the path references — check prerequisites are still met |
| `content-spec.md` schema | All track files (metadata fields), the validator script (field names) |
| `index.md` cross-reference map | The validator (it checks IDs in this file) |

---

## Cross-Reference Map

Key modules referenced across multiple tracks — update these with care.

| Module | Referenced in |
|---|---|
| 7.4 Supply Chain Vulnerabilities | Paths B, D, E; Production Gotchas |
| 7.3 Prompt Injection | Paths C, D, F; Track 7; Track 9 |
| 1.2 Tokens & Context Windows | Paths B, C, E |
| 6.1 Why Evaluation Is Hard | Paths C, D |
| 3.7 LiteLLM | Paths C, E |
| 4.8 Sandbox Isolation | Paths D, E |
| 5.9 Fine-Tuning: When & Why | Paths D, E |
