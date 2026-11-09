import React from 'react';
import { Sparkles, MessageSquare, ChevronUp } from 'lucide-react';
import { TimelineState } from '../../types';

interface MobileGlancePillProps {
  timeline: TimelineState;
  isOpen: boolean;
  onToggle: () => void;
  isCleanMode: boolean;
}

export const MobileGlancePill: React.FC<MobileGlancePillProps> = ({
  timeline,
  isOpen,
  onToggle,
  isCleanMode
}) => {
  if (isCleanMode || isOpen) return null;

  const { aiGeneration } = timeline;

  return (
    <div className="md:hidden fixed bottom-24 left-1/2 -translate-x-1/2 z-30 select-none max-w-[92vw] animate-fadeIn">
      <button
        onClick={onToggle}
        className={`px-3.5 py-1.5 rounded-full flex items-center gap-2 border shadow-xl backdrop-blur-2xl transition-all active:scale-95 text-xs ${
          aiGeneration.active
            ? 'bg-zinc-900/90 border-emerald-500/50 text-white ring-1 ring-emerald-500/30 shadow-emerald-500/20'
            : 'bg-zinc-900/80 border-white/15 text-zinc-200 hover:bg-zinc-850'
        }`}
      >
        {aiGeneration.active ? (
          <>
            <span className="size-2 rounded-full animate-ping shrink-0" style={{ backgroundColor: aiGeneration.authorColor }} />
            <Sparkles className="size-3.5 text-emerald-400 shrink-0" />
            <span className="font-semibold truncate max-w-[190px]">
              {aiGeneration.author}: {aiGeneration.statusText}
            </span>
            <span className="font-mono text-[11px] text-emerald-300 font-bold">
              {aiGeneration.progress}%
            </span>
          </>
        ) : (
          <>
            <MessageSquare className="size-3.5 text-blue-400 shrink-0" />
            <span className="font-medium text-zinc-300">Shared AI Stream</span>
            <span className="size-1 rounded-full bg-zinc-600" />
            <span className="text-[11px] text-zinc-400">Team Log</span>
          </>
        )}
        <ChevronUp className="size-3 text-zinc-400 shrink-0 ml-0.5" />
      </button>
    </div>
  );
};
