#!/usr/bin/env python3
"""
Tests for scripts/validate-curriculum.py

Runs the validator against small fixture directories rather than the real
curriculum, so tests are fast, isolated, and safe to run in CI.

Usage:
  python3 scripts/tests/test_validator.py
"""

import sys
import textwrap
import tempfile
import shutil
from pathlib import Path

# Import validator functions directly.
# The filename uses hyphens so we load it via importlib.
import importlib.util
_spec = importlib.util.spec_from_file_location(
    "validate_curriculum",
    Path(__file__).parent.parent / "validate-curriculum.py",
)
_mod = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_mod)
validate = _mod.validate
has_valid_persona = _mod.has_valid_persona
extract_cross_ref_section = _mod.extract_cross_ref_section
check_paths_optional_convention = _mod.check_paths_optional_convention

FIXTURES = Path(__file__).parent / "fixtures"
PASS = "\033[32mPASS\033[0m"
FAIL = "\033[31mFAIL\033[0m"

_results: list[tuple[str, bool]] = []


def assert_that(description: str, condition: bool) -> None:
    status = PASS if condition else FAIL
    print(f"  [{status}] {description}")
    _results.append((description, condition))


# ── Unit tests ────────────────────────────────────────────────────────────────

def test_has_valid_persona():
    print("\nhas_valid_persona()")
    assert_that("'All' is valid",            has_valid_persona("All"))
    assert_that("'Jr Dev → Sr Dev' is valid", has_valid_persona("Jr Dev → Sr Dev"))
    assert_that("'SRE / Sr Dev' is valid",   has_valid_persona("SRE / Sr Dev"))
    assert_that("'Leader / All' is valid",   has_valid_persona("Leader / All"))
    assert_that("'Wizard / Magician' is invalid", not has_valid_persona("Wizard / Magician"))
    assert_that("empty string is invalid",   not has_valid_persona(""))


def test_extract_cross_ref_section():
    print("\nextract_cross_ref_section()")
    content = textwrap.dedent("""\
        ## Something Else
        Some prose.

        ## Cross-Reference Map

        | Module | Referenced in |
        |---|---|
        | 1.1 Foo | Paths A, B |
        | 2.3 Bar | Path C |

        ## Next Section
        More prose.
    """)
    section = extract_cross_ref_section(content)
    assert_that("extracts table rows",   "1.1 Foo" in section)
    assert_that("stops before next ##", "Next Section" not in section)
    assert_that("returns empty string when section absent",
                extract_cross_ref_section("## Other\nno cross ref") == "")


# ── Integration tests against fixture directories ─────────────────────────────

def test_valid_fixtures():
    print("\nValid fixtures (should produce 0 errors, 0 warnings)")
    valid_dir = FIXTURES / "valid"
    tracks_dir = valid_dir / "tracks"
    errors, warnings, modules = validate(
        curriculum_dir=valid_dir,
        tracks_dir=tracks_dir,
    )
    # We don't have index.md / paths.md / etc. in the fixture — that's fine,
    # the validator only warns when those files are present.
    assert_that("no errors",          len(errors) == 0)
    assert_that("modules parsed",     len(modules) == 5)  # 3 in track-1, 2 in track-2


def test_wrong_track_prefix():
    print("\nInvalid fixture: wrong track prefix")
    d = FIXTURES / "invalid" / "tracks"
    # Point at a dir with only track-1-bad-ids.md
    with _temp_tracks_dir([d / "track-1-bad-ids.md"]) as (cdir, tdir):
        errors, _, _ = validate(curriculum_dir=cdir, tracks_dir=tdir)
    assert_that("reports wrong-prefix error", any("wrong prefix" in e for e in errors))


def test_duplicate_module_ids():
    print("\nInvalid fixture: duplicate module IDs")
    d = FIXTURES / "invalid" / "tracks"
    with _temp_tracks_dir([d / "track-2-duplicates.md"]) as (cdir, tdir):
        errors, _, _ = validate(curriculum_dir=cdir, tracks_dir=tdir)
    assert_that("reports duplicate ID error", any("Duplicate" in e for e in errors))


def test_bad_tags():
    print("\nInvalid fixture: bad volatility and status tags")
    d = FIXTURES / "invalid" / "tracks"
    with _temp_tracks_dir([d / "track-3-bad-tags.md"]) as (cdir, tdir):
        errors, _, _ = validate(curriculum_dir=cdir, tracks_dir=tdir)
    assert_that("reports invalid volatility", any("invalid volatility" in e for e in errors))
    assert_that("reports invalid status",     any("invalid status" in e for e in errors))


def test_missing_metadata():
    print("\nInvalid fixture: missing Owner and Last reviewed")
    d = FIXTURES / "invalid" / "tracks"
    with _temp_tracks_dir([d / "track-4-missing-metadata.md"]) as (cdir, tdir):
        errors, _, _ = validate(curriculum_dir=cdir, tracks_dir=tdir)
    assert_that("missing Last reviewed is an error",
                any("Last reviewed" in e for e in errors))
    assert_that("missing Owner is an error",
                any("Owner" in e for e in errors))


def test_bad_persona_is_warning():
    print("\nInvalid fixture: unrecognised persona (should be warning, not error)")
    d = FIXTURES / "invalid" / "tracks"
    with _temp_tracks_dir([d / "track-5-bad-persona.md"]) as (cdir, tdir):
        errors, warnings, _ = validate(curriculum_dir=cdir, tracks_dir=tdir)
    assert_that("no errors from bad persona",      not any("persona" in e for e in errors))
    assert_that("warning emitted for bad persona", any("persona" in w for w in warnings))


def test_paths_optional_convention():
    print("\nCheck 10: numbered list items inside Optional sections")
    with tempfile.TemporaryDirectory() as tmp:
        paths_file = Path(tmp) / "paths.md"

        # Violation: numbered item inside an Optional section
        paths_file.write_text(textwrap.dedent("""\
            > Last reviewed: 2026-01-01
            > Owner: x

            ## Path X: Test

            ### Extended (2 modules)
            1. **1.1** — Core module

            **Optional Extensions**
            2. **1.2** — Should be a bullet, not numbered
        """))
        errors = check_paths_optional_convention(paths_file)
        assert_that(
            "numbered item in Optional section is an error",
            any("numbered list item" in e and "1.2" in e for e in errors),
        )

        # Cross-contamination: same ID in core and optional
        paths_file.write_text(textwrap.dedent("""\
            > Last reviewed: 2026-01-01
            > Owner: x

            ## Path X: Test

            ### Extended (2 modules)
            1. **1.1** — Core module
            2. **1.2** — Also core

            **Optional Extensions**
            - **1.2** — Duplicate in optional section
        """))
        errors = check_paths_optional_convention(paths_file)
        assert_that(
            "same ID in core and optional is an error",
            any("both a core" in e and "1.2" in e for e in errors),
        )

        # Clean path: no violations
        paths_file.write_text(textwrap.dedent("""\
            > Last reviewed: 2026-01-01
            > Owner: x

            ## Path X: Test

            ### Extended (2 modules)
            1. **1.1** — Core module
            2. **1.2** — Also core

            **Optional Extensions**
            - **1.3** — Correctly bulleted optional
        """))
        errors = check_paths_optional_convention(paths_file)
        assert_that(
            "clean paths.md produces no convention errors",
            len(errors) == 0,
        )


def test_paths_md_unknown_ref():
    print("\nInvalid: paths.md references a non-existent module ID")
    with tempfile.TemporaryDirectory() as tmp:
        cdir = Path(tmp)
        tdir = cdir / "tracks"
        tdir.mkdir()
        # One valid track file
        (tdir / "track-1-minimal.md").write_text(
            (FIXTURES / "valid" / "tracks" / "track-1-minimal.md").read_text()
        )
        # paths.md that references an ID not in the track
        (cdir / "paths.md").write_text(
            "> Last reviewed: 2026-01-01\n> Owner: x\n\n**9.9** — Ghost Module\n"
        )
        errors, _, _ = validate(curriculum_dir=cdir, tracks_dir=tdir)
    assert_that("reports unknown ID in paths.md",
                any("paths.md" in e and "9.9" in e for e in errors))


# ── Helpers ───────────────────────────────────────────────────────────────────

class _temp_tracks_dir:
    """Context manager: creates a temp curriculum dir containing only the
    specified track files, then cleans up."""

    def __init__(self, track_files: list[Path]):
        self._src = track_files
        self._tmp: tempfile.TemporaryDirectory | None = None

    def __enter__(self) -> tuple[Path, Path]:
        self._tmp = tempfile.TemporaryDirectory()
        cdir = Path(self._tmp.name)
        tdir = cdir / "tracks"
        tdir.mkdir()
        for src in self._src:
            shutil.copy(src, tdir / src.name)
        return cdir, tdir

    def __exit__(self, *_):
        if self._tmp:
            self._tmp.cleanup()


# ── Runner ────────────────────────────────────────────────────────────────────

def main() -> None:
    print("Curriculum Validator — Test Suite")
    print("=" * 50)

    test_has_valid_persona()
    test_extract_cross_ref_section()
    test_valid_fixtures()
    test_wrong_track_prefix()
    test_duplicate_module_ids()
    test_bad_tags()
    test_missing_metadata()
    test_bad_persona_is_warning()
    test_paths_optional_convention()
    test_paths_md_unknown_ref()

    passed = sum(1 for _, ok in _results if ok)
    failed = sum(1 for _, ok in _results if not ok)
    total  = len(_results)

    print(f"\n{'=' * 50}")
    print(f"Results: {passed}/{total} passed", end="")
    if failed:
        print(f", {failed} FAILED")
        sys.exit(1)
    else:
        print()
        sys.exit(0)


if __name__ == "__main__":
    main()
