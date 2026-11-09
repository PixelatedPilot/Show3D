import React, { useState } from 'react';
import { LEARNING_MODULES } from '../../store/appStore';
import { LearningModule } from '../../types';
import { CheckCircle2, Play, Lock, BookOpen, X, Sparkles, ChevronRight } from 'lucide-react';

interface ModuleNavigatorProps {
  activeModuleId: number;
  onSelectModule: (moduleId: number) => void;
}

export const ModuleNavigator: React.FC<ModuleNavigatorProps> = ({
  activeModuleId,
  onSelectModule
}) => {
  const [inspectedModule, setInspectedModule] = useState<LearningModule | null>(null);

  return (
    <>
      {/* Floating Module Track Ribbon */}
      <div className="glass-panel px-3 py-1.5 rounded-2xl border border-white/10 flex items-center gap-1.5 shadow-2xl backdrop-blur-xl bg-zinc-950/70">
        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider hidden lg:inline mr-1">
          10-Hr Track:
        </span>
        {LEARNING_MODULES.map((m) => {
          const isActive = activeModuleId === m.id;
          const isCompleted = m.status === 'completed';

          return (
            <button
              key={m.id}
              onClick={() => {
                if (m.id === 3) {
                  onSelectModule(m.id);
                } else {
                  setInspectedModule(m);
                }
              }}
              className={`px-2.5 py-1 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
                isActive
                  ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/30 ring-1 ring-blue-400'
                  : isCompleted
                  ? 'bg-white/5 text-zinc-300 hover:bg-white/10'
                  : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5'
              }`}
              title={`${m.code}: ${m.title}`}
            >
              {isCompleted ? (
                <CheckCircle2 className="size-3 text-emerald-400 shrink-0" />
              ) : isActive ? (
                <Play className="size-3 text-white fill-white shrink-0" />
              ) : (
                <Lock className="size-3 text-zinc-600 shrink-0" />
              )}
              <span className="font-mono text-[11px]">{m.code}</span>
              <span className="hidden xl:inline text-[11px] truncate max-w-[90px]">{m.title.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Module Inspector Modal */}
      {inspectedModule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="glass-panel w-full max-w-md rounded-2xl p-5 border border-white/15 bg-zinc-950/95 space-y-4 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-blue-400">{inspectedModule.code}</span>
                  <span className="text-xs text-zinc-500">· {inspectedModule.duration}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20">
                    {inspectedModule.moeLearn}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mt-1">{inspectedModule.title}</h3>
              </div>
              <button
                onClick={() => setInspectedModule(null)}
                className="text-zinc-400 hover:text-white"
              >
                <X className="size-4" />
              </button>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed">
              {inspectedModule.summary}
            </p>

            <div className="p-3 rounded-xl bg-zinc-900/60 border border-white/5 space-y-1.5 text-xs">
              <div className="font-semibold text-zinc-200">Interactive Student Challenge:</div>
              <p className="text-zinc-400 text-[11px]">{inspectedModule.studentChallenge}</p>
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
              {inspectedModule.id === 3 ? (
                <button
                  onClick={() => {
                    onSelectModule(3);
                    setInspectedModule(null);
                  }}
                  className="w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all flex items-center justify-center gap-1.5 shadow-md"
                >
                  <Sparkles className="size-3.5" />
                  <span>Launch Interactive Module 03</span>
                </button>
              ) : (
                <div className="w-full flex items-center justify-between">
                  <span className="text-[11px] text-zinc-400">
                    {inspectedModule.status === 'completed' ? 'Module already completed by cohort' : 'Upcoming curriculum module'}
                  </span>
                  <button
                    onClick={() => setInspectedModule(null)}
                    className="px-3 py-1.5 rounded-lg bg-zinc-800 text-zinc-200 hover:text-white text-xs font-medium"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
