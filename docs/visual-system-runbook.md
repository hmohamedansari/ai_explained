# Visual system runbook

This is the practical guide to changing how AI Explained looks without accidentally creating three slightly different versions of the same design.

The current system is **Pine + Mulberry**: flat surfaces, sharp corners, restrained colour, generous reading space and a clear separation between editorial text and interface labels.

## Start here

Install the dependencies once, then start the local site:

```bash
npm install
npm run dev
```

Astro prints the local address in the terminal. Keep the browser at 100% zoom while judging typography and spacing; otherwise browser zoom and site styling become difficult to tell apart.

Before handing over a visual change, run the complete release check:

```bash
npm test
```

That command validates the curriculum and public content, builds the static site, checks links, RSS and the sitemap, then runs the browser and responsive tests.

## Where the visual decisions live

| What you want to change | Source of truth |
| --- | --- |
| Light and dark colours | `src/styles/global.css`, in `:root` and `html.dark` |
| Site-wide type scale | `src/styles/global.css`, in the base `html` rule |
| Web fonts and shared component styles | `src/styles/global.css` |
| Tailwind colour names and font families | `tailwind.config.mjs` |
| Page-specific composition | The relevant file in `src/pages/`, `src/layouts/` or `src/components/` |
| Lesson typography | `.prose-lesson` in `src/styles/global.css` |
| Social preview cards | `src/utils/og-image.ts` |
| Theme selection and default | `src/layouts/BaseLayout.astro` and `src/components/layout/Header.astro` |
| Visual regression examples | `tests/e2e/accessibility-and-quiz.spec.ts-snapshots/` |

## Typography

The body and headings use **Inter**. Small interface labels, module IDs and code-adjacent metadata use **JetBrains Mono**.

The site currently starts from this root scale:

```css
html {
  font-size: 107.5%;
}
```

That turns the browser's usual 16px base into 17.2px. Most of the site uses `rem`, so headings, labels and proportional spacing grow together.

To make the whole site slightly larger or smaller, change this one percentage first. Do not increase every component independently unless a particular component is genuinely out of proportion.

When changing a font, update all of these places:

1. The Google Fonts import and explicit font declarations in `src/styles/global.css`.
2. `fontFamily.sans` or `fontFamily.mono` in `tailwind.config.mjs`.
3. The local font package and font files used by `src/utils/og-image.ts`, so generated social cards still work without a network request during the build.

Then check a lesson, an assessment, the homepage and a narrow mobile viewport. Font changes alter wrapping even when the nominal size stays the same.

## Colours

Edit semantic tokens instead of chasing individual hex values through components.

| Token | Purpose |
| --- | --- |
| `--aex-page` | Page background |
| `--aex-paper` | Primary cards and panels |
| `--aex-raised` | Secondary or hovered surfaces |
| `--aex-raised-strong` | Stronger surface separation |
| `--aex-ink` | Main text |
| `--aex-muted` | Supporting text |
| `--aex-subtle` | Quiet metadata |
| `--aex-line` | Borders and dividers |
| `--aex-pine` | Links and primary interaction |
| `--aex-pine-strong` | Strong or hovered Pine state |
| `--aex-pine-soft` | Pine-tinted background |
| `--aex-mulberry` | Secondary emphasis and focus |
| `--aex-mulberry-soft` | Mulberry-tinted background |
| `--aex-code` / `--aex-code-ink` | Code block background and text |
| `--aex-success` / `--aex-danger` | Outcome and error states |

The values in `:root` are the light theme. The values in `html.dark` are the dark theme. If you change a role, change both versions and judge them independently.

Pine should continue to answer “what can I do?” Mulberry should answer “where should I pay attention?” If both colours compete everywhere, neither remains useful.

`tailwind.config.mjs` contains the full `brand` and `mulberry` scales used by utility classes. The compatibility bridge in `global.css` maps older utilities such as `text-brand-400` and `bg-surface-1` onto the semantic tokens. For a broad theme adjustment, start with the semantic tokens. Change the Tailwind scales when a component uses a shade directly or when you are deliberately redefining the complete palette.

Generated social cards do not load the website CSS. If the Pine or Mulberry identity changes, update the matching colour values in `src/utils/og-image.ts` too.

## Shape, spacing and hierarchy

The current identity uses square corners. `global.css` deliberately flattens the common Tailwind `rounded-*` utilities, including older page markup that has not yet been rewritten.

If the design ever moves back towards rounded corners, change that compatibility rule first and then inspect cards, navigation, assessment answers, badges and code blocks. Do not remove it and assume every page will become consistent by itself.

Use spacing to show relationships:

- Keep related label, heading and description text close together.
- Give separate ideas more vertical space than elements inside one idea.
- Preserve the narrower reading column for lessons.
- Let wide tables and code blocks scroll inside their own containers on small screens.
- Avoid fixing a crowded layout with smaller text. Reconsider the container, wrapping or spacing first.

## Common changes

### Adjust the overall reading size

Change `font-size` in the base `html` rule in `src/styles/global.css`. Review at 100% browser zoom and run `npm test`.

### Tune Pine or Mulberry

1. Change the light token in `:root`.
2. Change its dark-theme partner in `html.dark`.
3. Check links, focus outlines, selected navigation, assessments and tinted panels.
4. Update the Tailwind palette if direct shade utilities should change too.
5. Update `src/utils/og-image.ts` if the brand colour changed materially.

### Change lesson typography

Use `.prose-lesson` in `src/styles/global.css`. It controls headings, paragraphs, links, lists, quotations, code and tables rendered from lesson content. Test a lesson containing all of those elements rather than judging a short page.

### Change buttons or cards

Shared `.btn-primary`, `.btn-secondary` and `.card` styles live in `src/styles/global.css`. Prefer changing those shared classes before adding one-off page rules.

### Change the homepage hero

The homepage structure lives in `src/pages/index.astro`. Its editorial treatment—including the small `// FOUNDATIONS BEFORE AGENTS` line—lives near `.home-hero` in `src/styles/global.css`.

### Change the default theme

The pre-paint theme script lives in `src/layouts/BaseLayout.astro`. It runs before the page is painted to avoid a light-to-dark flash. The visible theme control lives in `src/components/layout/Header.astro`. Change and test both sides of that behaviour together.

## Visual review checklist

Review these surfaces in both light and dark themes:

- Homepage
- Learning overview
- One long lesson with code and a table
- One assessment
- Workbench page
- Advanced and production pages
- Header, mobile menu and theme control

Also review at these widths:

- 320px: smallest supported mobile check
- 390px: common modern phone width
- 768px: tablet or narrow desktop transition
- 1440px: wide desktop

Look for clipped text, accidental horizontal page scrolling, weak focus indicators, poor contrast, awkward wrapping and elements that appear interactive but are not.

## Updating visual snapshots

The assessment snapshots are deliberate release gates. A visual test failure after an intended design change is a request to inspect the new image, not permission to accept it blindly.

After reviewing the actual and diff images produced by Playwright, refresh the baselines only when the change is correct:

```bash
npm run test:e2e -- --update-snapshots
```

Then run the full suite again:

```bash
npm test
```

Commit the snapshot files with the visual change that required them.

## Before committing

```bash
git diff --check
git status --short
npm test
```

Read the diff as a design review, not only as code. Confirm that light and dark values were handled together, the social images still match the site, the snapshots represent an intentional change and no generated test output was added.

The aim is simple: make visual changes from a small number of understandable controls, then prove that the learning experience still works everywhere.
