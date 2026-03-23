import { defineCollection, z } from 'astro:content';

const PERSONA = z.enum(['curious', 'leader', 'junior', 'senior', 'sre']);

// ── Tracks ─────────────────────────────────────────────────────────────────
// Metadata for each of the 9 learning tracks.
// One JSON file per track at src/content/tracks/[slug].json
const tracks = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number(),
    icon: z.string(),
    color: z.string(),
    volatility: z.enum(['stable', 'emerging', 'volatile']),
    personas: z.array(PERSONA),
  }),
});

// ── Modules ────────────────────────────────────────────────────────────────
// MDX content files at src/content/modules/[track-slug]/[module-slug].mdx
// The body contains all three progressive-disclosure layers.
// Files prefixed with _ (e.g. _template.mdx) are excluded by Astro.
const modules = defineCollection({
  type: 'content',
  schema: z.object({
    moduleId: z.string(),           // curriculum ID, e.g. "1.1"
    title: z.string(),
    description: z.string(),       // Layer 1 summary — 2-3 plain-English sentences
    track: z.string(),             // track slug, e.g. "foundations"
    order: z.number(),             // position within the track
    personas: z.array(PERSONA),
    volatility: z.enum(['stable', 'emerging', 'volatile']),
    status: z.enum(['planned', 'draft', 'reviewed', 'published', 'stale']),
    lastReviewed: z.string(),      // ISO date YYYY-MM-DD
    estimatedMinutes: z.object({
      layer1: z.number(),          // Surface — always visible
      layer2: z.number().optional(), // Guided — toggle for non-devs
      layer3: z.number().optional(), // Deep Dive — toggle for all
    }).optional(),
    productionGotcha: z.string().optional(), // shown as a callout in Layer 1
    draft: z.boolean().default(false),
    // Optional SEO overrides — use when the display title/description is too
    // long for a good search snippet. Falls back to title/description if absent.
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
  }),
});

// ── Quizzes ────────────────────────────────────────────────────────────────
// Per-module quiz questions at src/content/quizzes/[module-id].json
const quizzes = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    moduleId: z.string(),          // matches modules.moduleId, e.g. "1.1"
    questions: z.array(z.object({
      id: z.string(),
      // Only multiple-choice is supported by the Quiz renderer.
      // true-false: author as multiple-choice with options: ["True", "False"].
      // code-spot: deferred — needs a different renderer (not yet designed).
      type: z.literal('multiple-choice'),
      question: z.string(),
      options: z.array(z.string()).min(2), // multiple-choice needs at least 2 options
      answer: z.number().int(),       // index into options[]
      explanation: z.string(),
      personas: z.array(PERSONA)
        .default(['curious', 'leader', 'junior', 'senior', 'sre']),
    }).superRefine((q, ctx) => {
      if (q.answer < 0 || q.answer >= q.options.length) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['answer'],
          message: `answer ${q.answer} is out of range — options has ${q.options.length} item(s) (valid: 0–${q.options.length - 1})`,
        });
      }
    })),
  }),
});

export const collections = { tracks, modules, quizzes };
