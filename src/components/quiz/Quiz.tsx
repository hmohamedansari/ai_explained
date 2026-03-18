import { useState } from 'react';

interface Question {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'code-spot';
  question: string;
  options?: string[];
  answer: string | number;
  explanation: string;
}

interface QuizProps {
  title: string;
  questions: Question[];
  audience?: string;
}

type AnswerState = Record<string, { selected: number | null; locked: boolean }>;

export default function Quiz({ title, questions, audience }: QuizProps) {
  const filtered = audience
    ? questions // filtering by audience is handled server-side before passing
    : questions;

  const [answers, setAnswers] = useState<AnswerState>(() =>
    Object.fromEntries(filtered.map(q => [q.id, { selected: null, locked: false }]))
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

  const allAnswered = filtered.every(q => answers[q.id].locked);
  const score = filtered.filter(q => {
    const state = answers[q.id];
    return state.locked && state.selected === Number(q.answer);
  }).length;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">{title}</h2>
        {showResults && (
          <div className="text-sm font-medium px-3 py-1.5 rounded-full bg-brand-950/50 border border-brand-500/30 text-brand-300">
            {score} / {filtered.length} correct
          </div>
        )}
      </div>

      {filtered.map((q, qi) => {
        const state = answers[q.id];
        const isCorrect = state.locked && state.selected === Number(q.answer);
        const isWrong = state.locked && state.selected !== Number(q.answer);

        return (
          <div key={q.id} className="p-6 rounded-xl border border-white/10 bg-surface-1 space-y-4">
            {/* Question */}
            <div className="flex gap-3">
              <span className="text-xs font-mono text-slate-500 mt-0.5 shrink-0">Q{qi + 1}</span>
              <pre className="text-slate-200 text-sm leading-relaxed whitespace-pre-wrap font-sans">
                {q.question}
              </pre>
            </div>

            {/* Options */}
            <div className="space-y-2 ml-6">
              {q.options?.map((opt, i) => {
                const isSelected = state.selected === i;
                const isAnswerKey = i === Number(q.answer);

                let cls =
                  'flex items-start gap-3 w-full text-left px-4 py-3 rounded-lg border text-sm transition-all ';

                if (!state.locked) {
                  cls += isSelected
                    ? 'border-brand-500 bg-brand-950/40 text-white'
                    : 'border-white/10 bg-surface-2 text-slate-300 hover:border-white/25 hover:text-white';
                } else {
                  if (isAnswerKey) {
                    cls += 'border-green-500/50 bg-green-950/30 text-green-300';
                  } else if (isSelected && !isAnswerKey) {
                    cls += 'border-red-500/50 bg-red-950/30 text-red-300';
                  } else {
                    cls += 'border-white/5 bg-surface-2 text-slate-500';
                  }
                }

                return (
                  <button
                    key={i}
                    className={cls}
                    onClick={() => handleSelect(q.id, i)}
                    disabled={state.locked}
                  >
                    <span className="shrink-0 mt-0.5 w-5 h-5 rounded-full border flex items-center justify-center text-xs font-mono
                                     border-current opacity-60">
                      {String.fromCharCode(65 + i)}
                    </span>
                    {opt}
                  </button>
                );
              })}
            </div>

            {/* Check / Explanation */}
            <div className="ml-6">
              {!state.locked ? (
                <button
                  onClick={() => handleCheck(q.id)}
                  disabled={state.selected === null}
                  className="btn-secondary text-xs py-1.5 px-4 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Check answer
                </button>
              ) : (
                <div className={[
                  'p-4 rounded-lg border text-sm leading-relaxed',
                  isCorrect
                    ? 'border-green-500/30 bg-green-950/20 text-green-300'
                    : 'border-red-500/30 bg-red-950/20 text-red-300',
                ].join(' ')}>
                  <p className="font-medium mb-1">{isCorrect ? '✓ Correct' : '✗ Not quite'}</p>
                  <p className="text-slate-300">{q.explanation}</p>
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Final results */}
      {allAnswered && !showResults && (
        <div className="text-center pt-4">
          <button
            onClick={() => setShowResults(true)}
            className="btn-primary"
          >
            See my score
          </button>
        </div>
      )}

      {showResults && (
        <div className="p-6 rounded-xl border border-brand-500/30 bg-brand-950/20 text-center space-y-3">
          <div className="text-4xl font-bold text-white">
            {score}<span className="text-slate-500 text-2xl">/{filtered.length}</span>
          </div>
          <p className="text-slate-400">
            {score === filtered.length
              ? 'Perfect score. You\'ve got this.'
              : score >= filtered.length * 0.7
              ? 'Solid understanding. Review the explanations for the ones you missed.'
              : 'Keep at it — re-read the lesson and try again.'}
          </p>
          <button
            onClick={() => {
              setAnswers(Object.fromEntries(filtered.map(q => [q.id, { selected: null, locked: false }])));
              setShowResults(false);
            }}
            className="btn-secondary text-sm"
          >
            Retry
          </button>
        </div>
      )}
    </div>
  );
}
