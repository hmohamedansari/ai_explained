import { defineCollection, z } from 'astro:content';

// ── Concepts ──────────────────────────────────────────────────────────────────
// Individual lesson pages — the actual teaching content
const concepts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    module: z.string(),              // slug of parent module
    order: z.number(),               // position within the module
    audiences: z.array(             // which paths surface this lesson
      z.enum(['tech-leader', 'new-dev', 'experienced-dev', 'sre-devops'])
    ).default(['tech-leader', 'new-dev', 'experienced-dev', 'sre-devops']),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    estimatedMinutes: z.number().optional(),
  }),
});

// ── Modules ───────────────────────────────────────────────────────────────────
// A module groups related lessons (e.g. "How AI Agents Work")
const modules = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number(),
    icon: z.string(),               // emoji or icon name
    color: z.string(),              // tailwind color class for accents
    audiences: z.array(
      z.enum(['tech-leader', 'new-dev', 'experienced-dev', 'sre-devops'])
    ).default(['tech-leader', 'new-dev', 'experienced-dev', 'sre-devops']),
    draft: z.boolean().default(false),
  }),
});

// ── Quizzes ───────────────────────────────────────────────────────────────────
// Evaluation questions attached to a concept or module
const quizzes = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    concept: z.string(),            // slug of the concept this quiz covers
    questions: z.array(z.object({
      id: z.string(),
      type: z.enum(['multiple-choice', 'true-false', 'code-spot']),
      question: z.string(),
      options: z.array(z.string()).optional(),
      answer: z.union([z.string(), z.number()]),
      explanation: z.string(),
      audiences: z.array(
        z.enum(['tech-leader', 'new-dev', 'experienced-dev', 'sre-devops'])
      ).default(['tech-leader', 'new-dev', 'experienced-dev', 'sre-devops']),
    })),
  }),
});

export const collections = { concepts, modules, quizzes };
