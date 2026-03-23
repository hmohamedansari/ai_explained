/**
 * Client-side progress tracking — backed by localStorage.
 *
 * This is the single abstraction layer between UI components and the storage
 * mechanism. When a server-backed store is added (Phase 3 / LMS), only this
 * file needs to change.
 *
 * Key format: 'ai-academy:progress'
 * Value: JSON object mapping moduleId → true
 */

const PROGRESS_KEY = 'ai-academy:progress';
const QUIZ_KEY_PREFIX = 'ai-academy:quiz:';

// ── Module read state ────────────────────────────────────────────────────────

export function markRead(moduleId: string): void {
  const data = getProgress();
  data[moduleId] = true;
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent('module:read', { detail: { moduleId } }));
  } catch {
    // localStorage unavailable (private browsing, storage full) — silently skip
  }
}

export function isRead(moduleId: string): boolean {
  return !!getProgress()[moduleId];
}

export function getProgress(): Record<string, boolean> {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(localStorage.getItem(PROGRESS_KEY) ?? '{}');
  } catch {
    return {};
  }
}

// ── Quiz scores ──────────────────────────────────────────────────────────────

export interface QuizScore {
  score: number;
  total: number;
  completedAt: string; // ISO date
}

export function saveQuizScore(moduleId: string, score: number, total: number): void {
  try {
    const result: QuizScore = { score, total, completedAt: new Date().toISOString() };
    localStorage.setItem(`${QUIZ_KEY_PREFIX}${moduleId}`, JSON.stringify(result));
  } catch {
    // silently skip
  }
}

export function getQuizScore(moduleId: string): QuizScore | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(`${QUIZ_KEY_PREFIX}${moduleId}`);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
