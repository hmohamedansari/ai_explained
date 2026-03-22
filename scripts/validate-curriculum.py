#!/usr/bin/env python3
"""
Curriculum validator for AI Academy.

Checks:
  1. Unique module IDs across all track files
  2. Module ID prefix matches track file number (1.x in track-1, etc.)
  3. Valid volatility tags (stable / emerging / volatile)
  4. Valid status tags (planned / draft / reviewed / published / stale)
  5. Persona field contains at least one recognised base token
  6. Required file metadata (Last reviewed, Owner) — errors, not warnings
  7. Cross-references in paths.md resolve to known module IDs
  8. Cross-references in common-gotchas.md (Where Taught column) resolve
  9. Cross-references in Cross-Reference Map section of index.md resolve
 10. paths.md Optional sections use bullet lists, not numbered lists

Usage:
  python3 scripts/validate-curriculum.py              # validate only
  python3 scripts/validate-curriculum.py --registry   # validate + write curriculum/registry.md
  python3 scripts/validate-curriculum.py --strict     # treat warnings as errors
"""

import re
import sys
from datetime import datetime, timezone
from pathlib import Path

REPO_ROOT = Path(__file__).parent.parent
CURRICULUM_DIR = REPO_ROOT / "curriculum"
TRACKS_DIR = CURRICULUM_DIR / "tracks"

VALID_VOLATILITY = {"stable", "emerging", "volatile"}
VALID_STATUS = {"planned", "draft", "reviewed", "published", "stale"}

# At least one of these must appear (case-insensitive) in a module's persona field.
BASE_PERSONA_TOKENS = {"all", "curious", "leader", "jr dev", "sr dev", "sre", "dev"}


# ── Parsing ───────────────────────────────────────────────────────────────────

def parse_track_modules(track_file: Path) -> list[dict]:
    """Extract module rows from the Modules table in a track file.

    Robust to extra whitespace and backtick-wrapped tag values.
    Only parses the first table whose header row contains 'ID'.
    """
    content = track_file.read_text(encoding="utf-8")
    modules: list[dict] = []
    in_module_table = False

    for line in content.splitlines():
        stripped = line.strip()

        if re.match(r"\|\s*ID\s*\|", stripped, re.IGNORECASE):
            in_module_table = True
            continue

        if in_module_table and re.match(r"\|[-| :]+\|", stripped):
            continue  # separator row

        if in_module_table and stripped.startswith("|") and stripped.endswith("|"):
            parts = [p.strip() for p in stripped.split("|")[1:-1]]
            if len(parts) >= 5:
                mod_id   = parts[0]
                title    = parts[1]
                personas = parts[2]
                volatility = parts[3].strip("`")
                status     = parts[4].strip("`")
                if re.match(r"^\d+\.\d+$", mod_id):
                    modules.append({
                        "id": mod_id,
                        "title": title,
                        "personas": personas,
                        "volatility": volatility,
                        "status": status,
                        "file": track_file.name,
                    })
        elif in_module_table and not stripped.startswith("|"):
            break  # first table ended; stop — don't parse later tables

    return modules


def extract_cross_ref_section(content: str) -> str:
    """Return only the text of the Cross-Reference Map section in index.md."""
    match = re.search(
        r"##\s+Cross-Reference Map\b(.*?)(?=\n##\s|\Z)",
        content,
        re.DOTALL,
    )
    return match.group(1) if match else ""


def find_bold_module_refs(text: str) -> list[str]:
    """Find **X.Y** style module references."""
    return re.findall(r"\*\*(\d+\.\d+)\*\*", text)


def find_any_module_refs(text: str) -> list[str]:
    """Find bare X.Y module ID references."""
    return re.findall(r"\b(\d+\.\d+)\b", text)


# ── Persona validation ────────────────────────────────────────────────────────

def has_valid_persona(persona_str: str) -> bool:
    """Return True if the persona field contains at least one recognised token."""
    lower = persona_str.lower()
    return any(token in lower for token in BASE_PERSONA_TOKENS)


# ── Check 10: core vs. optional convention ────────────────────────────────────

def check_paths_optional_convention(paths_file: Path) -> list[str]:
    """Return errors for numbered list items found inside Optional sections.

    An optional section begins when a line matches ``**Optional`` (e.g.
    ``**Optional Extensions**`` or ``**Optional: Infrastructure depth**``) and
    ends at the next markdown heading (##/###) or bold-only section header
    (e.g. ``**Phase 3 — ...**``, ``**Literacy checkpoint:**``).

    Two violation types are reported:
    - A numbered list item (``1. **X.Y**``) inside an optional section.
    - The same module ID appearing in both a core numbered list and an optional
      bullet list within the same path block.
    """
    errors: list[str] = []
    content = paths_file.read_text(encoding="utf-8")

    # Split into per-path blocks at each "## Path" heading
    path_blocks = re.split(r"(?=^## Path\b)", content, flags=re.MULTILINE)

    for block in path_blocks:
        if not block.strip().startswith("## Path"):
            continue

        name_match = re.match(r"## (Path \w+[^\n]*)", block)
        path_name = name_match.group(1).strip() if name_match else "unknown path"

        in_optional = False
        core_ids: set[str] = set()
        optional_ids: set[str] = set()

        for line in block.splitlines():
            stripped = line.strip()

            # Optional section starts at a bare bold line containing "Optional"
            if re.match(r"^\*\*Optional", stripped):
                in_optional = True
                continue

            # Optional section ends at the next markdown heading or non-Optional
            # bold-only section header (e.g. **Phase**, **Literacy checkpoint:**)
            if in_optional and (
                re.match(r"^#{2,}", stripped)
                or (
                    re.match(r"^\*\*[^*]", stripped)
                    and not stripped.startswith("**Optional")
                )
            ):
                in_optional = False

            # Numbered list item: should only appear in core sections
            numbered = re.match(r"^\d+\.\s+\*\*(\d+\.\d+)\*\*", stripped)
            if numbered:
                mod_id = numbered.group(1)
                if in_optional:
                    errors.append(
                        f"paths.md ({path_name}): module {mod_id} is in an "
                        f"Optional section but uses a numbered list item — "
                        f"use a bullet (- **{mod_id}**) instead"
                    )
                else:
                    core_ids.add(mod_id)

            # Bullet item inside an optional section
            bullet = re.match(r"^-\s+\*\*(\d+\.\d+)\*\*", stripped)
            if bullet and in_optional:
                optional_ids.add(bullet.group(1))

        # Same ID in both core and optional within the same path
        for mod_id in sorted(core_ids & optional_ids):
            errors.append(
                f"paths.md ({path_name}): module {mod_id} appears in both a "
                f"core numbered list and an Optional Extensions section"
            )

    return errors


# ── Validation ────────────────────────────────────────────────────────────────

def validate(
    curriculum_dir: Path = CURRICULUM_DIR,
    tracks_dir: Path = TRACKS_DIR,
) -> tuple[list[str], list[str], dict]:
    """Run all checks. Returns (errors, warnings, all_modules).

    Accepts custom paths so the test suite can point at fixture directories.
    """
    errors: list[str] = []
    warnings: list[str] = []
    all_modules: dict[str, dict] = {}

    track_files = sorted(tracks_dir.glob("track-*.md"))
    if not track_files:
        errors.append(f"No track files found in {tracks_dir}")
        return errors, warnings, all_modules

    # ── 1–5. Parse and validate each track file ───────────────────────────
    for track_file in track_files:
        content = track_file.read_text(encoding="utf-8")

        # Metadata — required (errors, not warnings)
        if "> Last reviewed:" not in content:
            errors.append(f"{track_file.name}: missing required '> Last reviewed:' header")
        if "> Owner:" not in content:
            errors.append(f"{track_file.name}: missing required '> Owner:' field")

        track_num_match = re.search(r"track-(\d+)", track_file.name)
        expected_prefix = track_num_match.group(1) + "." if track_num_match else None

        modules = parse_track_modules(track_file)
        if not modules:
            warnings.append(f"{track_file.name}: no modules found in module table")

        for mod in modules:
            mod_id = mod["id"]

            # 1. Duplicate IDs
            if mod_id in all_modules:
                errors.append(
                    f"Duplicate module ID {mod_id} in {track_file.name} "
                    f"(already defined in {all_modules[mod_id]['file']})"
                )
            else:
                all_modules[mod_id] = mod

            # 2. ID prefix matches track number
            if expected_prefix and not mod_id.startswith(expected_prefix):
                errors.append(
                    f"{track_file.name}: module {mod_id} has wrong prefix "
                    f"(expected {expected_prefix}x)"
                )

            # 3. Volatility
            if mod["volatility"] not in VALID_VOLATILITY:
                errors.append(
                    f"{track_file.name}: module {mod_id} — invalid volatility "
                    f"'{mod['volatility']}' (must be: {', '.join(sorted(VALID_VOLATILITY))})"
                )

            # 4. Status
            if mod["status"] not in VALID_STATUS:
                errors.append(
                    f"{track_file.name}: module {mod_id} — invalid status "
                    f"'{mod['status']}' (must be: {', '.join(sorted(VALID_STATUS))})"
                )

            # 5. Persona
            if not has_valid_persona(mod["personas"]):
                warnings.append(
                    f"{track_file.name}: module {mod_id} — persona field "
                    f"'{mod['personas']}' contains no recognised token "
                    f"({', '.join(sorted(BASE_PERSONA_TOKENS))})"
                )

    # ── 6. Metadata on non-track curriculum files ─────────────────────────
    other_files = [
        curriculum_dir / "paths.md",
        curriculum_dir / "vision.md",
        curriculum_dir / "personas.md",
        curriculum_dir / "content-spec.md",
        curriculum_dir / "common-gotchas.md",
        curriculum_dir / "glossary-system.md",
        curriculum_dir / "labs.md",
        curriculum_dir / "index.md",
    ]
    for f in other_files:
        if not f.exists():
            warnings.append(f"Expected curriculum file not found: {f.name}")
            continue
        content = f.read_text(encoding="utf-8")
        if "> Last reviewed:" not in content:
            errors.append(f"{f.name}: missing required '> Last reviewed:' header")
        if "> Owner:" not in content:
            errors.append(f"{f.name}: missing required '> Owner:' field")

    # ── 7. Cross-references in paths.md ───────────────────────────────────
    paths_file = curriculum_dir / "paths.md"
    if paths_file.exists():
        for ref in find_bold_module_refs(paths_file.read_text(encoding="utf-8")):
            if ref not in all_modules:
                errors.append(f"paths.md: references unknown module ID {ref}")

    # ── 8. Cross-references in common-gotchas.md (Where Taught column) ──
    uu_file = curriculum_dir / "common-gotchas.md"
    if uu_file.exists():
        for line in uu_file.read_text(encoding="utf-8").splitlines():
            stripped = line.strip()
            if not stripped.startswith("|") or re.match(r"\|[-| :]+\|", stripped):
                continue
            parts = [p.strip() for p in stripped.split("|")[1:-1]]
            if len(parts) < 3:
                continue
            where_col = parts[-1]  # "Where Taught" is the last column
            for ref in find_any_module_refs(where_col):
                if ref not in all_modules:
                    errors.append(
                        f"common-gotchas.md: 'Where Taught' references unknown module ID {ref}"
                    )

    # ── 9. Cross-references in index.md — Cross-Reference Map section only ─
    index_file = curriculum_dir / "index.md"
    if index_file.exists():
        section = extract_cross_ref_section(index_file.read_text(encoding="utf-8"))
        for line in section.splitlines():
            stripped = line.strip()
            if not stripped.startswith("|") or re.match(r"\|[-| :]+\|", stripped):
                continue
            parts = [p.strip() for p in stripped.split("|")[1:-1]]
            if not parts:
                continue
            # First column contains "X.Y Title..." — extract the ID
            first_col = parts[0]
            for ref in find_any_module_refs(first_col):
                if ref not in all_modules:
                    errors.append(
                        f"index.md Cross-Reference Map: references unknown module ID {ref}"
                    )

    # ── 10. paths.md: Optional sections must use bullets, not numbered lists ──
    if paths_file.exists():
        errors.extend(check_paths_optional_convention(paths_file))

    return errors, warnings, all_modules


# ── Registry generation ───────────────────────────────────────────────────────

def generate_registry(all_modules: dict) -> str:
    ts = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    lines = [
        "# Curriculum Module Registry",
        "> Auto-generated by `scripts/validate-curriculum.py --registry`. Do not edit manually.",
        f"> Generated: {ts}",
        "",
        f"Total modules: {len(all_modules)}",
        "",
        "| ID | Title | Track File | Personas | Volatility | Status |",
        "|---|---|---|---|---|---|",
    ]
    for mod_id in sorted(all_modules, key=lambda x: [int(n) for n in x.split(".")]):
        m = all_modules[mod_id]
        lines.append(
            f"| {m['id']} | {m['title']} | {m['file']} | {m['personas']} "
            f"| `{m['volatility']}` | `{m['status']}` |"
        )
    return "\n".join(lines) + "\n"


# ── Entry point ───────────────────────────────────────────────────────────────

def main() -> None:
    args = sys.argv[1:]
    update_registry = "--registry" in args
    strict = "--strict" in args

    print("AI Academy — Curriculum Validator")
    print("=" * 50)
    if strict:
        print("Mode: strict (warnings treated as errors)\n")

    errors, warnings, all_modules = validate()

    if strict:
        errors.extend(warnings)
        warnings = []

    if warnings:
        print(f"Warnings ({len(warnings)}):")
        for w in warnings:
            print(f"  ⚠  {w}")
        print()

    if errors:
        print(f"Errors ({len(errors)}):")
        for e in errors:
            print(f"  ✗  {e}")
        print()

    print(f"Modules found: {len(all_modules)}")

    if update_registry and all_modules:
        registry_path = CURRICULUM_DIR / "registry.md"
        registry_path.write_text(generate_registry(all_modules), encoding="utf-8")
        print(f"Registry written → {registry_path.relative_to(REPO_ROOT)}")

    print()
    if errors:
        print(f"FAILED  {len(errors)} error(s), {len(warnings)} warning(s)")
        sys.exit(1)
    else:
        print(f"PASSED  0 errors, {len(warnings)} warning(s)")
        sys.exit(0)


if __name__ == "__main__":
    main()
