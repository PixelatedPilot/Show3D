import React from 'react';
import { LEARNING_MODULES } from '../../store/appStore';
import { EduState } from '../../types';
import { 
  ArrowRight, 
  CheckCircle2, 
  Play, 
  Award, 
  BookOpen, 
  Sliders, 
  Sparkles,
  Check,
  Clock,
  Layers,
  GraduationCap
} from 'lucide-react';

interface ModulesHomeProps {
  eduState: EduState;
  onEnterModule: (moduleId: number) => void;
  onOpenStudio?: (moduleId: number) => void;
  onOpenTeacherHub: () => void;
}

export const ModulesHome: React.FC<ModulesHomeProps> = ({
  eduState,
  onEnterModule,
  onOpenStudio,
  onOpenTeacherHub
}) => {
  const completedCount = eduState.completedQuizModuleIds.length;

  return (
    <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-8 max-w-5xl mx-auto w-full space-y-8 text-zinc-200 font-sans select-none">
      {/* Student Welcome Header */}
      <div className="space-y-3 border-b border-zinc-800 pb-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-400">
            <GraduationCap className="size-3.5" />
            <span>Student Learning Hub · Class 3-Faith</span>
          </div>
          <span className="text-xs font-mono text-zinc-400">
            {completedCount} of 6 Modules Completed
          </span>
        </div>

        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Spatial AI Learning Syllabus (6 Modules)
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl leading-relaxed">
            Every module includes a <strong>visual reading lesson</strong> (3 slides explaining 3D concepts), a <strong>hands-on 3D co-design challenge</strong>, and a <strong>quick knowledge check</strong>.
          </p>
        </div>

        {/* 4-Step Student Workflow Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs">
          <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-center gap-2.5">
            <span className="size-6 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center font-mono font-bold text-xs shrink-0">1</span>
            <div>
              <div className="font-semibold text-white">Read Concept</div>
              <div className="text-[11px] text-zinc-400">3-slide visual lesson</div>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-center gap-2.5">
            <span className="size-6 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center font-mono font-bold text-xs shrink-0">2</span>
            <div>
              <div className="font-semibold text-white">Practice in 3D</div>
              <div className="text-[11px] text-zinc-400">Co-design challenge</div>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-center gap-2.5">
            <span className="size-6 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center font-mono font-bold text-xs shrink-0">3</span>
            <div>
              <div className="font-semibold text-white">Knowledge Check</div>
              <div className="text-[11px] text-zinc-400">1-question check-in</div>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-center gap-2.5">
            <span className="size-6 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-mono font-bold text-xs shrink-0">4</span>
            <div>
              <div className="font-semibold text-white">Earn Badge</div>
              <div className="text-[11px] text-zinc-400">Digital portfolio unlock</div>
            </div>
          </div>
        </div>
      </div>

      {/* All 6 Modules Grid (Student-Friendly Cards) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-zinc-400 px-1">
          <span className="font-semibold text-zinc-200 text-sm">Choose a Module to Start Reading</span>
          <button
            onClick={onOpenTeacherHub}
            className="text-blue-400 hover:underline flex items-center gap-1"
          >
            <span>Teacher Facilitator Hub</span>
            <ArrowRight className="size-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {LEARNING_MODULES.map((m) => {
            const hasQuizScore = eduState.quizScores[m.id] !== undefined;
            const quizScore = eduState.quizScores[m.id];
            const isCompleted = eduState.completedQuizModuleIds.includes(m.id);
            const isCurrentlySelected = eduState.activeModuleId === m.id;

            return (
              <div
                key={m.id}
                className={`p-5 rounded-2xl border transition-all space-y-4 flex flex-col justify-between ${
                  isCurrentlySelected
                    ? 'bg-zinc-900/80 border-blue-500/40 shadow-lg shadow-blue-500/5'
                    : 'bg-zinc-900/40 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded font-mono text-[11px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        {m.code}
                      </span>
                      <span className="text-[11px] font-mono text-zinc-400 flex items-center gap-1">
                        <Clock className="size-3 text-zinc-500" />
                        <span>{m.duration}</span>
                      </span>
                    </div>

                    {isCompleted ? (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono flex items-center gap-1">
                        <CheckCircle2 className="size-3" />
                        <span>Completed ({quizScore}%)</span>
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 text-[10px] font-mono">
                        {m.moeLearn}
                      </span>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <h2 className="text-base font-semibold text-white tracking-tight flex items-center gap-2">
                      <span>{m.title}</span>
                      {isCurrentlySelected && (
                        <span className="size-2 rounded-full bg-blue-500 animate-pulse" />
                      )}
                    </h2>
                    <p className="text-xs text-zinc-300 leading-relaxed">
                      {m.summary}
                    </p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-black/30 border border-white/[0.04] space-y-1 text-xs">
                    <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                      What you will read & make:
                    </div>
                    <div className="text-[11px] text-zinc-300 font-medium">
                      🎯 {m.studentChallenge}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono text-zinc-500">
                    Badge: <strong className="text-zinc-300 font-normal">{m.badgeName}</strong>
                  </span>

                  <div className="flex items-center gap-2">
                    {onOpenStudio && (
                      <button
                        onClick={() => onOpenStudio(m.id)}
                        className="px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-xs font-medium border border-zinc-700 transition-colors flex items-center gap-1.5"
                        title="Direct access to 3D CAD modeling sandbox"
                      >
                        <Sliders className="size-3" />
                        <span className="hidden sm:inline">3D Studio</span>
                      </button>
                    )}

                    <button
                      onClick={() => onEnterModule(m.id)}
                      className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs transition-colors flex items-center gap-1.5 shadow-sm active:scale-95"
                    >
                      <BookOpen className="size-3.5" />
                      <span>{isCompleted ? 'Review Lesson' : 'Read & Start'}</span>
                      <ArrowRight className="size-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
