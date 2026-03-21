# Scripts

This directory contains tooling that supports curriculum authoring and governance. It is not part of the site build — nothing here runs during `npm run build` or deployment.

---

## validate-curriculum.py

**What it does:** Validates the curriculum planning files in `curriculum/` for structural consistency. Exits with code `1` if any errors are found, `0` if clean.

**Why it exists:** The curriculum is split across 17+ markdown files. Without automated checks, module IDs, metadata fields, and cross-references can silently drift out of sync as the curriculum grows. This script is the single enforcement point for those constraints.

**How it works:**

1. Scans all `curriculum/tracks/track-*.md` files and parses the module table in each (the `| ID | Module | ... |` block).
2. Builds a registry of every module ID found.
3. Runs these checks across the registry and related files:

| Check | What it catches |
|---|---|
| Unique module IDs | Duplicate IDs across any two track files |
| Track-prefix alignment | A module like `2.5` appearing in `track-3-protocols.md` |
| Valid `volatility` tag | Any value other than `stable`, `emerging`, `volatile` |
| Valid `status` tag | Any value other than `planned`, `draft`, `reviewed`, `published`, `stale` |
| Valid persona field | A module whose persona string contains no recognised audience token |
| Required metadata | Missing `> Last reviewed:` or `> Owner:` header on any curriculum file |
| Cross-references in `paths.md` | `**1.1**`-style bold module IDs that point to non-existent modules |
| Cross-references in `common-gotchas.md` | Module IDs in the "Where Taught" column that don't exist |
| Cross-references in `index.md` | Module IDs in the Cross-Reference Map table that don't exist |

**Usage:**

```bash
# From the repo root:
python3 scripts/validate-curriculum.py              # validate only
python3 scripts/validate-curriculum.py --registry   # validate + regenerate curriculum/registry.md
python3 scripts/validate-curriculum.py --strict     # warnings treated as errors (for CI)

# Via npm:
npm run curriculum:validate
npm run curriculum:registry
```

**As a pre-push hook** (recommended):

```bash
# Create .git/hooks/pre-push and make it executable:
echo '#!/bin/sh\npython3 scripts/validate-curriculum.py || exit 1' > .git/hooks/pre-push
chmod +x .git/hooks/pre-push
```

**The `--registry` flag** regenerates `curriculum/registry.md` — a flat markdown table of all 83 modules with their track file, personas, volatility, and status. Useful after adding or renaming modules to keep the registry in sync.

**The `--strict` flag** promotes all warnings to errors. Use this in CI pipelines where you want a hard gate on persona fields and other soft checks.

**Requirements:** Python 3.9+. No third-party dependencies — stdlib only.

---

## tests/

The test suite for `validate-curriculum.py`. Uses small fixture files instead of the real curriculum so tests are fast, isolated, and safe to run anywhere.

**Run:**

```bash
python3 scripts/tests/test_validator.py

# Via npm:
npm run curriculum:test
```

**Structure:**

```
tests/
├── test_validator.py          # Test runner (20 assertions)
└── fixtures/
    ├── valid/
    │   └── tracks/
    │       ├── track-1-minimal.md   # 3 well-formed modules
    │       └── track-2-minimal.md   # 2 well-formed modules
    └── invalid/
        └── tracks/
            ├── track-1-bad-ids.md          # Module ID with wrong track prefix
            ├── track-2-duplicates.md       # Same ID defined twice
            ├── track-3-bad-tags.md         # Invalid volatility and status values
            ├── track-4-missing-metadata.md # Missing Owner and Last reviewed
            └── track-5-bad-persona.md      # Unrecognised persona token
```

**What's tested:**

| Test | Expected outcome |
|---|---|
| `has_valid_persona()` unit tests | Correct for known-good and known-bad inputs |
| `extract_cross_ref_section()` unit tests | Extracts only the right section; empty on miss |
| Valid fixtures | 0 errors, 5 modules parsed |
| Wrong track prefix | Error reported |
| Duplicate module IDs | Error reported |
| Invalid volatility / status tags | Errors reported |
| Missing Owner / Last reviewed | Errors (not warnings) reported |
| Unrecognised persona | Warning (not error) reported |
| `paths.md` referencing unknown module ID | Error reported |
