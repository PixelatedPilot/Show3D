import React, { useState } from 'react';
import { ModuleQuizData } from '../../types';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Award } from 'lucide-react';

interface ModuleQuizProps {
  quizData: ModuleQuizData;
  onComplete: (score: number) => void;
  onNextModule?: () => void;
  nextModuleTitle?: string;
}

export const ModuleQuiz: React.FC<ModuleQuizProps> = ({
  quizData,
  onComplete,
  onNextModule,
  nextModuleTitle
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  const handleSelectOption = (questionId: string, optionId: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionId
    }));
  };

  const allAnswered = quizData.questions.every((q) => selectedAnswers[q.id]);

  // Calculate score
  const correctCount = quizData.questions.filter((q) => {
    const chosen = selectedAnswers[q.id];
    const opt = q.options.find((o) => o.id === chosen);
    return opt?.isCorrect;
  }).length;

  const scorePercentage = Math.round((correctCount / quizData.questions.length) * 100);

  const handleCheckAnswers = () => {
    setShowResults(true);
    onComplete(scorePercentage);
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };

  return (
    <div className="p-6 rounded-xl border border-zinc-800 bg-[#161618] space-y-6 text-zinc-200 font-sans">
      {/* Quiz Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-blue-400 font-medium">
              Check Understanding
            </span>
            <span className="text-zinc-600">·</span>
            <span className="text-xs text-zinc-400 font-mono">{quizData.moeDomain}</span>
          </div>
          <h3 className="text-base font-semibold text-white tracking-tight">
            Formative Knowledge Check · {quizData.moduleTitle}
          </h3>
        </div>

        {showResults && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700">
            <Award className="size-4 text-emerald-400" />
            <span className="text-xs font-mono font-medium text-white">
              Score: {scorePercentage}% ({correctCount}/{quizData.questions.length})
            </span>
          </div>
        )}
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {quizData.questions.map((q, qIndex) => {
          const selectedOptionId = selectedAnswers[q.id];
          const selectedOption = q.options.find((o) => o.id === selectedOptionId);
          const isQuestionCorrect = selectedOption?.isCorrect;

          return (
            <div key={q.id} className="space-y-3">
              <div className="flex items-start gap-2.5">
                <span className="size-5 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-300 text-[11px] font-mono flex items-center justify-center shrink-0 mt-0.5">
                  {qIndex + 1}
                </span>
                <div className="space-y-1">
                  <div className="text-xs font-medium text-white leading-relaxed">
                    {q.question}
                  </div>
                  {q.contextNote && (
                    <div className="text-[11px] text-zinc-500 font-sans">
                      {q.contextNote}
                    </div>
                  )}
                </div>
              </div>

              {/* Options */}
              <div className="space-y-2 pl-7">
                {q.options.map((opt) => {
                  const isChosen = selectedOptionId === opt.id;
                  let cardStyle = 'bg-zinc-900/60 border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:text-white';

                  if (showResults) {
                    if (opt.isCorrect) {
                      cardStyle = 'bg-emerald-950/20 border-emerald-500/60 text-emerald-200';
                    } else if (isChosen && !opt.isCorrect) {
                      cardStyle = 'bg-rose-950/20 border-rose-500/60 text-rose-200';
                    } else {
                      cardStyle = 'bg-zinc-900/30 border-zinc-800/60 text-zinc-500';
                    }
                  } else if (isChosen) {
                    cardStyle = 'bg-zinc-800 border-blue-500 text-white shadow-xs';
                  }

                  return (
                    <button
                      key={opt.id}
                      disabled={showResults}
                      onClick={() => handleSelectOption(q.id, opt.id)}
                      className={`w-full p-3 rounded-lg border text-left text-xs transition-all flex items-start gap-3 ${cardStyle}`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {showResults ? (
                          opt.isCorrect ? (
                            <CheckCircle2 className="size-3.5 text-emerald-400" />
                          ) : isChosen ? (
                            <XCircle className="size-3.5 text-rose-400" />
                          ) : (
                            <div className="size-3.5 rounded-full border border-zinc-700" />
                          )
                        ) : (
                          <div
                            className={`size-3.5 rounded-full border flex items-center justify-center transition-colors ${
                              isChosen ? 'border-blue-500 bg-blue-500' : 'border-zinc-700'
                            }`}
                          >
                            {isChosen && <div className="size-1 rounded-full bg-white" />}
                          </div>
                        )}
                      </div>
                      <span className="leading-relaxed">{opt.text}</span>
                    </button>
                  );
                })}

                {/* Instant Feedback Explanation */}
                {showResults && selectedOption && (
                  <div
                    className={`mt-2 p-3 rounded-lg border text-xs leading-relaxed ${
                      isQuestionCorrect
                        ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                        : 'bg-rose-950/30 border-rose-500/40 text-rose-200'
                    }`}
                  >
                    <div className="font-semibold mb-0.5">
                      {isQuestionCorrect ? 'Understanding Confirmed:' : 'Pedagogical Explanation:'}
                    </div>
                    <div>{selectedOption.explanation}</div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Quiz Actions */}
      <div className="pt-4 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-3">
        {!showResults ? (
          <div className="flex items-center justify-between w-full">
            <span className="text-[11px] text-zinc-500">
              {allAnswered ? 'All questions answered. Click check.' : 'Select an answer for each question above.'}
            </span>
            <button
              disabled={!allAnswered}
              onClick={handleCheckAnswers}
              className={`px-4 py-2 rounded-lg font-medium text-xs transition-colors flex items-center gap-1.5 ${
                allAnswered
                  ? 'bg-blue-600 hover:bg-blue-500 text-white cursor-pointer shadow-xs'
                  : 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700/50'
              }`}
            >
              <span>Check Understanding</span>
              <ArrowRight className="size-3.5" />
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between w-full">
            <button
              onClick={handleReset}
              className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 text-xs transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="size-3" />
              <span>Retry Quiz</span>
            </button>

            {onNextModule && (
              <button
                onClick={onNextModule}
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs transition-colors flex items-center gap-2 shadow-xs"
              >
                <span>Continue to {nextModuleTitle || 'Next Module'}</span>
                <ArrowRight className="size-3.5" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
