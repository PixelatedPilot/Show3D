import React from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Eye, 
  EyeOff, 
  Video, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { TimelineState } from '../../types';

interface RecordingDockProps {
  timeline: TimelineState;
  onTogglePlay: () => void;
  onSeek: (time: number) => void;
  onRestart: () => void;
  isCleanMode: boolean;
  onToggleCleanMode: () => void;
}

export const RecordingDock: React.FC<RecordingDockProps> = ({
  timeline,
  onTogglePlay,
  onSeek,
  onRestart,
  isCleanMode,
  onToggleCleanMode
}) => {
  const { currentTime, duration, isPlaying, phaseTitle } = timeline;
  const isFinished = currentTime >= duration;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    const ms = Math.floor((secs - Math.floor(secs)) * 10);
    return `0${m}:${s < 10 ? '0' : ''}${s}.${ms}`;
  };

  if (isCleanMode) {
    return (
      <button
        onClick={onToggleCleanMode}
        className="fixed bottom-4 right-4 z-50 p-2.5 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/10 backdrop-blur-md shadow-xl transition-all"
        title="Restore Recording Controls (or press H)"
      >
        <Eye className="size-4" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-40 select-none max-w-xl w-[94vw] sm:w-[92vw]">
      <div className="glass-dock px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3 border border-white/15 shadow-2xl">
        {/* Play/Pause & Replay */}
        <div className="flex items-center justify-between w-full sm:w-auto gap-2">
          <div className="flex items-center gap-2">
            {isFinished ? (
              <button
                onClick={onRestart}
                className="size-9 sm:size-8 rounded-full bg-emerald-500 text-black flex items-center justify-center hover:bg-emerald-400 transition-transform active:scale-95 shadow-md font-bold"
                title="Replay 1-Min Demo from Start"
              >
                <RotateCcw className="size-4 sm:size-3.5" />
              </button>
            ) : (
              <button
                onClick={onTogglePlay}
                className="size-9 sm:size-8 rounded-full bg-white text-black flex items-center justify-center hover:bg-zinc-200 transition-transform active:scale-95 shadow-md"
                title={isPlaying ? 'Pause Demo' : 'Play Demo'}
              >
                {isPlaying ? <Pause className="size-4 sm:size-3.5 fill-current" /> : <Play className="size-4 sm:size-3.5 fill-current ml-0.5" />}
              </button>
            )}

            <button
              onClick={onRestart}
              className="size-9 sm:size-8 rounded-full bg-white/10 hover:bg-white/15 text-white flex items-center justify-center transition-transform active:scale-95 border border-white/5"
              title="Restart Demo from 00:00"
            >
              <RotateCcw className="size-4 sm:size-3.5" />
            </button>

            <div className="flex flex-col ml-1">
              <span className="text-[11px] font-mono tabular-nums text-zinc-300 font-semibold">
                {formatTime(currentTime)} <span className="text-zinc-500 font-normal">/ 01:00.0</span>
              </span>
              <span className="text-[10px] text-emerald-400 font-medium truncate max-w-[130px] sm:max-w-[200px]">
                {isFinished ? '✓ Demo Complete (Paused)' : phaseTitle}
              </span>
            </div>
          </div>

          {/* Clean Mode Button (Mobile top-right) */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={onToggleCleanMode}
              className="p-2 rounded-xl bg-zinc-800/80 hover:bg-zinc-700/80 border border-white/10 text-zinc-300 hover:text-white transition-all"
              title="Clean Mode"
            >
              <EyeOff className="size-3.5 text-blue-400" />
            </button>
          </div>
        </div>

        {/* Timeline Slider Bar */}
        <div className="flex-1 w-full sm:w-auto flex items-center gap-2">
          <input
            type="range"
            min={0}
            max={duration}
            step={0.1}
            value={currentTime}
            onChange={(e) => onSeek(parseFloat(e.target.value))}
            className="w-full h-2 sm:h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#0A84FF] focus:outline-hidden"
          />
        </div>

        {/* Clean Mode Button (Desktop) */}
        <div className="hidden sm:flex items-center gap-1.5">
          <button
            onClick={onToggleCleanMode}
            className="px-2.5 py-1 rounded-xl bg-zinc-800/80 hover:bg-zinc-700/80 border border-white/10 text-zinc-300 hover:text-white text-[11px] font-medium transition-all flex items-center gap-1.5"
            title="Hide all UI controls for clean screen recording (Press 'H')"
          >
            <EyeOff className="size-3 text-blue-400" />
            <span className="hidden md:inline">Clean Video Mode</span>
          </button>
        </div>
      </div>
    </div>
  );
};
