import React from 'react';
import { 
  Navigation, 
  Lock, 
  Sparkles, 
  MessageSquare, 
  Eye, 
  HelpCircle,
  Sliders
} from 'lucide-react';
import { StrategicMode } from '../../types';

interface PresenterDockProps {
  mode: StrategicMode;
  isSarahCursorActive: boolean;
  onToggleSarahCursor: () => void;
  isSarahLockActive: boolean;
  onToggleSarahLock: () => void;
  onTriggerCoPrompt: () => void;
  isCommentsOpen: boolean;
  onToggleComments: () => void;
  isSpectatingSarah: boolean;
  onToggleSpectateSarah: () => void;
}

export const PresenterDock: React.FC<PresenterDockProps> = ({
  mode,
  isSarahCursorActive,
  onToggleSarahCursor,
  isSarahLockActive,
  onToggleSarahLock,
  onTriggerCoPrompt,
  isCommentsOpen,
  onToggleComments,
  isSpectatingSarah,
  onToggleSpectateSarah
}) => {
  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 select-none">
      <div className="glass-dock px-3 py-2 rounded-2xl flex items-center gap-2 border border-white/15 shadow-2xl">
        {/* Label */}
        <div className="hidden lg:flex items-center gap-1.5 px-2 text-[11px] font-semibold tracking-wider uppercase text-zinc-400 border-r border-white/10">
          <Sliders className="size-3.5 text-blue-400" />
          <span>Pitch Controls</span>
        </div>

        {mode === 'collab' ? (
          <>
            {/* 1. Toggle Sarah's 3D Spatial Cursor */}
            <button
              onClick={onToggleSarahCursor}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 border ${
                isSarahCursorActive
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-xs'
                  : 'bg-zinc-800/80 text-zinc-400 border-white/5 hover:text-zinc-200'
              }`}
            >
              <Navigation className={`size-3.5 ${isSarahCursorActive ? 'text-emerald-400' : ''}`} />
              <span>3D Cursor {isSarahCursorActive ? 'ON' : 'OFF'}</span>
            </button>

            {/* 2. Toggle Sarah's Selection Lock */}
            <button
              onClick={onToggleSarahLock}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 border ${
                isSarahLockActive
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-xs'
                  : 'bg-zinc-800/80 text-zinc-400 border-white/5 hover:text-zinc-200'
              }`}
            >
              <Lock className={`size-3.5 ${isSarahLockActive ? 'text-emerald-400' : ''}`} />
              <span>Lock Object {isSarahLockActive ? 'LOCKED' : 'FREE'}</span>
            </button>

            {/* 3. Trigger Co-Prompting Banner */}
            <button
              onClick={onTriggerCoPrompt}
              className="px-3 py-1.5 rounded-xl text-xs font-medium bg-zinc-800/80 hover:bg-zinc-700/80 text-zinc-300 hover:text-white border border-white/10 transition-all flex items-center gap-1.5"
            >
              <Sparkles className="size-3.5 text-blue-400" />
              <span>Trigger Co-Prompt</span>
            </button>

            {/* 4. Toggle 3D Spatial Critique Pins */}
            <button
              onClick={onToggleComments}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 border ${
                isCommentsOpen
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                  : 'bg-zinc-800/80 text-zinc-400 border-white/5 hover:text-zinc-200'
              }`}
            >
              <MessageSquare className="size-3.5 text-rose-400" />
              <span>Spatial Critiques</span>
            </button>

            {/* 5. Spectate Mode */}
            <button
              onClick={onToggleSpectateSarah}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 border ${
                isSpectatingSarah
                  ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
                  : 'bg-zinc-800/80 text-zinc-400 border-white/5 hover:text-zinc-200'
              }`}
            >
              <Eye className="size-3.5 text-indigo-400" />
              <span>{isSpectatingSarah ? 'Exit Follow' : 'Follow Sarah'}</span>
            </button>
          </>
        ) : (
          <div className="flex items-center gap-2 px-2 text-xs text-zinc-300">
            <span className="font-medium text-blue-400">Idea 1 Demo:</span>
            <span>Use the 4-step sidebar to guide the student journey, or open Teacher Hub above.</span>
          </div>
        )}
      </div>
    </div>
  );
};
