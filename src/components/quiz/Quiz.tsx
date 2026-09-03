import { useState } from 'react';
import { saveQuizScore } from '@/utils/progress';

interface Question {
  id: string;
  type: 'multiple-choice';
  question: string;
  options: string[];  // required: multiple-choice only
  answer: number;     // index into options[]
  explanation: string;
  read_more?: string;
}

interface QuizProps {
  title: string;
  moduleId: string;
  questions: Question[];
  defaultReadMore?: string;
}

type AnswerState = Record<string, { selected: number | null; locked: boolean }>;

export default function Quiz({ title, moduleId, questions, defaultReadMore }: QuizProps) {
  const [answers, setAnswers] = useState<AnswerState>(() =>
    Object.fromEntries(questions.map(q => [q.id, { selected: null, locked: false }]))
  );
  const [showResults, setShowResults] = useState(false);

  const handleSelect = (questionId: string, optionIndex: number) => {
    setAnswers(prev => {
      if (prev[questionId].locked) return prev;
      return { ...prev, [questionId]: { selected: optionIndex, locked: false } };
    });
  };

  const handleCheck = (questionId: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: { ...prev[questionId], locked: true },
    }));
  };

  const allAnswered = questions.every(q => answers[q.id].locked);
  const score = questions.filter(q => {
    const state = answers[q.id];
    return state.locked && state.selected === q.answer;
  }).length;

  const handleShowResults = () => {
    setShowResults(true);
    saveQuizScore(moduleId, score, questions.length);
  };

  const handleRetry = () => {
    setAnswers(Object.fromEntries(questions.map(q => [q.id, { selected: null, locked: false }])));
    setShowResults(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-semibold text-white min-w-0">{title}</h2>
        {showResults && (
          <div className="text-sm font-mono font-medium px-3 py-1.5 bg-brand-950/50 border border-brand-500/30 text-brand-300 shrink-0" aria-live="polite">
            {score} / {questions.length} correct
          </div>
        )}
      </div>

      {questions.map((q, qi) => {
        const state = answers[q.id];
        const isCorrect = state.locked && state.selected === q.answer;
        return (
          <fieldset key={q.id} data-testid={`quiz-question-${qi + 1}`} className="m-0 min-w-0 border-0 p-0" disabled={state.locked}>
            <legend className="sr-only">Question {qi + 1}: {q.question}</legend>
            <div data-testid="quiz-question-card" className="space-y-4 border border-white/10 border-l-4 border-l-mulberry-600 bg-surface-1 p-6">
              <div className="flex gap-3" aria-hidden="true">
                <span className="mt-0.5 shrink-0 font-mono text-xs text-mulberry-700 dark:text-mulberry-300">Q{qi + 1}</span>
                <p className="text-sm leading-relaxed text-slate-200">{q.question}</p>
              </div>

              <div className="space-y-2 sm:ml-6">
                {q.options?.map((opt, i) => {
                  const isSelected = state.selected === i;
                  const isAnswerKey = i === q.answer;

                  let cls =
                    'flex w-full items-start gap-3 border px-4 py-3 text-left text-sm transition-all ';

                  if (!state.locked) {
                    cls += isSelected
                      ? 'border-brand-500 bg-brand-950/40 text-white'
                      : 'border-white/10 bg-surface-2 text-slate-300 hover:border-white/25 hover:text-white';
                  } else if (isAnswerKey) {
                    cls += 'border-green-500/50 bg-green-950/30 text-green-300';
                  } else if (isSelected) {
                    cls += 'border-red-500/50 bg-red-950/30 text-red-300';
                  } else {
                    cls += 'border-white/5 bg-surface-2 text-slate-500';
                  }

                  return (
                    <label
                      key={i}
                      className={`${cls} cursor-pointer ${state.locked ? 'cursor-default' : ''}`}
                    >
                      <input
                        type="radio"
                        name={q.id}
                        value={i}
                        checked={isSelected}
                        onChange={() => handleSelect(q.id, i)}
                        className="sr-only"
                      />
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-current font-mono text-xs opacity-60" aria-hidden="true">{String.fromCharCode(65 + i)}</span>
                      {opt}
                    </label>
                  );
                })}
              </div>

              <div className="sm:ml-6" aria-live="polite">
                {!state.locked ? (
                  <button
                    onClick={() => handleCheck(q.id)}
                    disabled={state.selected === null}
                    className="btn-secondary px-4 py-1.5 text-xs disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    Check answer
                  </button>
                ) : (
                  <div className={[
                    'border border-l-4 border-l-mulberry-600 p-4 text-sm leading-relaxed',
                    isCorrect
                      ? 'border-green-500/30 bg-green-950/20 text-green-300'
                      : 'border-red-500/30 bg-red-950/20 text-red-300',
                  ].join(' ')}>
                    <p className="mb-1 font-medium">{isCorrect ? '✓ Correct' : '✗ Not quite'}</p>
                    <p className="text-slate-300">{q.explanation}</p>
                    {(q.read_more ?? defaultReadMore) && (
                      <a
                        href={q.read_more ?? defaultReadMore}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-block text-xs text-brand-400 transition-colors hover:text-brand-300"
                      >
                        Read more →
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </fieldset>
        );
      })}

      {/* Final results */}
      {allAnswered && !showResults && (
        <div className="text-center pt-4">
          <button onClick={handleShowResults} className="btn-primary">
            See my score
          </button>
        </div>
      )}

      {showResults && (
        <div className="p-6 border border-brand-500/30 border-t-4 border-t-mulberry-600 bg-brand-950/20 text-center space-y-3">
          <div className="text-4xl font-bold text-white">
            {score}<span className="text-slate-500 text-2xl">/{questions.length}</span>
          </div>
          <p className="text-slate-400">
            {score === questions.length
              ? "Perfect score. You've got this."
              : score >= questions.length * 0.7
              ? 'Solid understanding. Review the explanations for the ones you missed.'
              : 'Keep at it: re-read the lesson and try again.'}
          </p>
          <button onClick={handleRetry} className="btn-secondary text-sm">
            Retry
          </button>
        </div>
      )}
    </div>
  );
}
