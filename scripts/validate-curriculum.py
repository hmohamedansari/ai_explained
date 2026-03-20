#!/usr/bin/env python3
"""
Curriculum validator for AI Academy.

Checks:
  1. Unique module IDs across all track files
  2. Module ID prefix matches track file number (1.x in track-1, etc.)
  3. Valid volatility tags (stable / emerging / volatile)
  4. Valid status tags (planned / draft / reviewed / published / stale)
  5. Required file metadata (Last reviewed, Owner)
  6. Cross-references in paths.md resolve to known module IDs
  7. Cross-references in unknown-unknowns.md resolve to known module IDs
  8. Cross-references in index.md resolve to known module IDs

Usage:
  python3 scripts/validate-curriculum.py              # validate only
  python3 scripts/validate-curriculum.py --registry   # validate + write curriculum/registry.md
"""

import re
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).parent.parent
CURRICULUM_DIR = REPO_ROOT / "curriculum"
TRACKS_DIR = CURRICULUM_DIR / "tracks"

VALID_VOLATILITY = {"stable", "emerging", "volatile"}
VALID_STATUS = {"planned", "draft", "reviewed", "published", "stale"}

PERSONA_TOKENS = {
    "all", "all devs", "all → dev", "curious", "leader", "jr dev", "jr dev →",
    "sr dev", "sr dev →", "sre", "sre / sr dev", "jr dev / sre",
    "sr dev / sre", "sr dev / leader", "all devs / leader", "leader / dev",
    "leader / all", "leader / sr dev", "dev / sre", "dev",
}

# ── Parsing ──────────────────────────────────────────────────────────────────

def parse_track_modules(track_file: Path) -> list[dict]:
    """Extract module rows from the Modules table in a track file."""
    content = track_file.read_text(encoding="utf-8")
    modules = []
    in_module_table = False

    for line in content.splitlines():
        stripped = line.strip()

        # Detect the module table header
        if re.match(r"\|\s*ID\s*\|", stripped, re.IGNORECASE):
            in_module_table = True
            continue

        # Skip separator rows
        if in_module_table and re.match(r"\|[-| ]+\|", stripped):
            continue

        if in_module_table and stripped.startswith("|") and stripped.endswith("|"):
            parts = [p.strip() for p in stripped.split("|")[1:-1]]
            if len(parts) >= 5:
                mod_id, title, personas, volatility, status = (
                    parts[0], parts[1], parts[2],
                    parts[3].strip("`"), parts[4].strip("`"),
                )
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
            in_module_table = False  # Table ended

    return modules


def find_bold_module_refs(text: str) -> list[str]:
    """Find **X.Y** style module references."""
    return re.findall(r"\*\*(\d+\.\d+)\*\*", text)


def find_any_module_refs(text: str) -> list[str]:
    """Find bare X.Y module ID references (used in table cells)."""
    return re.findall(r"\b(\d+\.\d+)\b", text)


# ── Validation ────────────────────────────────────────────────────────────────

def validate() -> tuple[list[str], list[str], dict]:
    errors: list[str] = []
    warnings: list[str] = []
    all_modules: dict[str, dict] = {}

    track_files = sorted(TRACKS_DIR.glob("track-*.md"))
    if not track_files:
        errors.append(f"No track files found in {TRACKS_DIR}")
        return errors, warnings, all_modules

    # ── 1. Parse and validate each track file ─────────────────────────────
    for track_file in track_files:
        content = track_file.read_text(encoding="utf-8")

        # Required metadata
        if "> Last reviewed:" not in content:
            warnings.append(f"{track_file.name}: missing '> Last reviewed:' header")
        if "> Owner:" not in content:
            warnings.append(f"{track_file.name}: missing '> Owner:' field")

        track_num_match = re.search(r"track-(\d+)", track_file.name)
        expected_prefix = track_num_match.group(1) + "." if track_num_match else None

        modules = parse_track_modules(track_file)
        if not modules:
            warnings.append(f"{track_file.name}: no modules found in module table")

        for mod in modules:
            mod_id = mod["id"]

            # Duplicate check
            if mod_id in all_modules:
                errors.append(
                    f"Duplicate module ID {mod_id} in {track_file.name} "
                    f"(already defined in {all_modules[mod_id]['file']})"
                )
            else:
                all_modules[mod_id] = mod

            # ID prefix matches track
            if expected_prefix and not mod_id.startswith(expected_prefix):
                errors.append(
                    f"{track_file.name}: module {mod_id} has wrong prefix "
                    f"(expected {expected_prefix}x)"
                )

            # Volatility
            if mod["volatility"] not in VALID_VOLATILITY:
                errors.append(
                    f"{track_file.name}: module {mod_id} has invalid volatility "
                    f"'{mod['volatility']}' — must be one of: {', '.join(sorted(VALID_VOLATILITY))}"
                )

            # Status
            if mod["status"] not in VALID_STATUS:
                errors.append(
                    f"{track_file.name}: module {mod_id} has invalid status "
                    f"'{mod['status']}' — must be one of: {', '.join(sorted(VALID_STATUS))}"
                )

    # ── 2. Check metadata on other curriculum files ────────────────────────
    other_files = [
        CURRICULUM_DIR / "paths.md",
        CURRICULUM_DIR / "vision.md",
        CURRICULUM_DIR / "personas.md",
        CURRICULUM_DIR / "content-spec.md",
        CURRICULUM_DIR / "unknown-unknowns.md",
        CURRICULUM_DIR / "glossary-system.md",
        CURRICULUM_DIR / "labs.md",
        CURRICULUM_DIR / "index.md",
    ]
    for f in other_files:
        if not f.exists():
            warnings.append(f"Expected curriculum file not found: {f.name}")
            continue
        content = f.read_text(encoding="utf-8")
        if "> Last reviewed:" not in content:
            warnings.append(f"{f.name}: missing '> Last reviewed:' header")
        if "> Owner:" not in content:
            warnings.append(f"{f.name}: missing '> Owner:' field")

    # ── 3. Cross-references in paths.md ───────────────────────────────────
    paths_file = CURRICULUM_DIR / "paths.md"
    if paths_file.exists():
        for ref in find_bold_module_refs(paths_file.read_text(encoding="utf-8")):
            if ref not in all_modules:
                errors.append(f"paths.md: references unknown module ID {ref}")

    # ── 4. Cross-references in unknown-unknowns.md ────────────────────────
    uu_file = CURRICULUM_DIR / "unknown-unknowns.md"
    if uu_file.exists():
        for line in uu_file.read_text(encoding="utf-8").splitlines():
            stripped = line.strip()
            if not stripped.startswith("|") or re.match(r"\|[-| ]+\|", stripped):
                continue
            parts = [p.strip() for p in stripped.split("|")[1:-1]]
            if len(parts) < 3:
                continue
            # "Where Taught" is the last column
            where_col = parts[-1]
            for ref in find_any_module_refs(where_col):
                if ref not in all_modules:
                    errors.append(
                        f"unknown-unknowns.md: 'Where Taught' column references unknown module ID {ref}"
                    )

    # ── 5. Cross-references in index.md ───────────────────────────────────
    index_file = CURRICULUM_DIR / "index.md"
    if index_file.exists():
        for ref in find_any_module_refs(index_file.read_text(encoding="utf-8")):
            if ref not in all_modules:
                errors.append(f"index.md: references unknown module ID {ref}")

    return errors, warnings, all_modules


# ── Registry generation ───────────────────────────────────────────────────────

def generate_registry(all_modules: dict) -> str:
    lines = [
        "# Curriculum Module Registry",
        "> Auto-generated by `scripts/validate-curriculum.py --registry`. Do not edit manually.",
        f"> Last generated: see git log.",
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

def main():
    update_registry = "--registry" in sys.argv

    print("AI Academy — Curriculum Validator")
    print("=" * 50)

    errors, warnings, all_modules = validate()

    if warnings:
        print(f"\nWarnings ({len(warnings)}):")
        for w in warnings:
            print(f"  ⚠  {w}")

    if errors:
        print(f"\nErrors ({len(errors)}):")
        for e in errors:
            print(f"  ✗  {e}")

    print(f"\nModules found: {len(all_modules)}")

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
