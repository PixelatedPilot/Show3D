import React from 'react';
import { Sparkles, Clock, Users, X } from 'lucide-react';
import { TimelineState } from '../../types';

interface SharedAIFeedProps {
  timeline: TimelineState;
  isMobileSheetOpen?: boolean;
  onCloseMobileSheet?: () => void;
}

const ACTIVITY_LOG = [
  { time: 1.0, author: 'Sarah Chen', color: '#30D158', text: 'Joined room · Campus Furniture Project' },
  { time: 5.5, author: 'Sarah Chen', color: '#30D158', text: 'Inspecting Study Bench with 3D cursor' },
  { time: 10.5, author: 'Sarah Chen', color: '#30D158', text: 'Acquired Transform Lock · Aligned Bench' },
  { time: 15.5, author: 'Marcus Goh', color: '#0A84FF', text: 'Added 3D Spatial Critique #1' },
  { time: 19.5, author: 'Alex Tan', color: '#5E5CE6', text: 'Resolved Critique #1 (Chamfer 0.4mm)' },
  { time: 23.5, author: 'Sarah Chen', color: '#30D158', text: 'Generated: Tensile Canopy (100%)' },
  { time: 27.0, author: 'System', color: '#0A84FF', text: 'Tensile Canopy docked onto pillars' },
  { time: 32.5, author: 'Marcus Goh', color: '#0A84FF', text: 'Generated: Biophilic Planters with foliage' },
  { time: 36.0, author: 'System', color: '#22c55e', text: 'Planters spawned on pavilion flanks' },
  { time: 40.5, author: 'Sarah Chen', color: '#30D158', text: 'Generated: Solar Pendant Light Cluster' },
  { time: 43.0, author: 'System', color: '#f59e0b', text: 'Pendant Lights turned ON (3000K warm glow)' },
  { time: 48.0, author: 'Marcus Goh', color: '#0A84FF', text: 'Verified: 450W Solar Battery Pin #2' },
  { time: 54.0, author: 'Team', color: '#5E5CE6', text: 'All 4 Models Assembled & Synchronized' },
];

const FeedContent: React.FC<{ timeline: TimelineState }> = ({ timeline }) => {
  const { aiGeneration, currentTime } = timeline;

  return (
    <>
      {/* Streaming Prompt Composer */}
      <div className="p-3 sm:p-4 border-b border-white/10 space-y-3 bg-zinc-950/40">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-zinc-300">Live Prompt Composer</span>
            {aiGeneration.active ? (
              <span className="text-[11px] font-semibold flex items-center gap-1" style={{ color: aiGeneration.authorColor }}>
                <span className="size-1.5 rounded-full animate-ping" style={{ backgroundColor: aiGeneration.authorColor }}></span>
                {aiGeneration.author} is typing
              </span>
            ) : (
              <span className="text-[11px] text-zinc-500 font-normal">Team Co-Pilot</span>
            )}
          </div>

          <div className="relative min-h-16 sm:min-h-18 p-2.5 rounded-xl bg-zinc-950/80 border border-white/10 text-xs text-zinc-200 leading-relaxed font-mono">
            {aiGeneration.promptTyped ? (
              <span>
                {aiGeneration.promptTyped}
                <span className="text-emerald-400 animate-pulse font-bold">|</span>
              </span>
            ) : (
              <span className="text-zinc-600 font-sans italic">
                Team prompts stream here automatically...
              </span>
            )}
          </div>
        </div>

        {/* Live Generation Progress Bar */}
        {aiGeneration.active && (
          <div className="p-3 rounded-xl bg-zinc-900/80 border border-emerald-500/30 space-y-2 animate-fadeIn">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-emerald-300 flex items-center gap-1.5">
                <Sparkles className="size-3.5 animate-spin" />
                {aiGeneration.statusText}
              </span>
              <span className="text-zinc-300 tabular-nums font-mono font-bold">
                {aiGeneration.progress}%
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-200 rounded-full"
                style={{ width: `${aiGeneration.progress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Active Model Count Badge */}
        <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-1">
          <span>Active Scene Models</span>
          <span className="px-2 py-0.5 rounded-full bg-white/10 text-white font-semibold">
            {timeline.sceneModels.lightsSpawned ? '4 Models' : timeline.sceneModels.plantersSpawned ? '3 Models' : timeline.sceneModels.canopySpawned ? '2 Models' : '1 Model'}
          </span>
        </div>
      </div>

      {/* Synchronized Real-Time Room Activity Log */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2.5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
            <Clock className="size-3" />
            <span>Room Event Stream</span>
          </span>
          <span className="text-[10px] text-zinc-400 font-mono">
            {currentTime.toFixed(1)}s / 60s
          </span>
        </div>

        <div className="space-y-2">
          {ACTIVITY_LOG.map((item, idx) => {
            const isPast = currentTime >= item.time;
            const isCurrent = currentTime >= item.time && currentTime < (ACTIVITY_LOG[idx + 1]?.time ?? 99);

            return (
              <div
                key={idx}
                className={`p-2.5 rounded-xl border text-xs transition-all duration-300 ${
                  isCurrent
                    ? 'bg-zinc-800/90 border-white/20 shadow-md ring-1 ring-white/10 scale-[1.01]'
                    : isPast
                    ? 'bg-zinc-900/50 border-white/5 opacity-80'
                    : 'bg-zinc-950/30 border-transparent opacity-25'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="font-semibold" style={{ color: item.color }}>
                    {item.author}
                  </span>
                  <span className="text-zinc-500 tabular-nums font-mono text-[10px]">
                    00:{item.time < 10 ? `0${item.time.toFixed(0)}` : item.time.toFixed(0)}
                  </span>
                </div>
                <p className="text-zinc-300 leading-snug text-[11px]">
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export const SharedAIFeed: React.FC<SharedAIFeedProps> = ({
  timeline,
  isMobileSheetOpen = false,
  onCloseMobileSheet
}) => {
  return (
    <>
      {/* 1. Desktop Mode: Persistent Left Sidebar */}
      <aside className="w-80 md:w-88 shrink-0 h-full hidden md:flex flex-col glass-panel border-r border-white/10 z-30 select-none overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-white/10 bg-zinc-900/50">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Collaborative Generator
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-white/10 text-zinc-300">
              Multiplayer Sync
            </span>
          </div>
          <h2 className="text-sm font-semibold text-white tracking-tight">
            Shared AI Canvas Stream
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5 leading-snug">
            Prompts and generated meshes sync across all connected teammates in real time.
          </p>
        </div>

        <FeedContent timeline={timeline} />
      </aside>

      {/* 2. Mobile Mode: iOS-Style Frosted Bottom Sheet */}
      {isMobileSheetOpen && (
        <div className="md:hidden">
          {/* Backdrop Overlay */}
          <div
            onClick={onCloseMobileSheet}
            className="fixed inset-0 bg-black/65 backdrop-blur-xs z-50 transition-opacity animate-fadeIn"
          />

          {/* Slide-Up Bottom Sheet */}
          <div className="fixed inset-x-0 bottom-0 max-h-[82vh] h-[78vh] flex flex-col glass-panel rounded-t-3xl border-t border-white/20 z-50 overflow-hidden shadow-2xl animate-sheet-slide-up safe-pb">
            {/* Top Bar with Grab Handle & Dismiss Button */}
            <div className="pt-2.5 pb-2 px-4 border-b border-white/10 bg-zinc-900/70 relative shrink-0">
              <div className="w-10 h-1 bg-white/30 rounded-full mx-auto mb-2.5" />
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                    <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Shared AI Stream
                  </span>
                  <h3 className="text-xs font-semibold text-white">Live Multiplayer Activity</h3>
                </div>
                <button
                  onClick={onCloseMobileSheet}
                  className="p-1 rounded-full bg-zinc-800 text-zinc-400 hover:text-white border border-white/10 transition-colors"
                  title="Close Feed"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>

            {/* Scrollable Sheet Content */}
            <div className="flex-1 overflow-y-auto flex flex-col">
              <FeedContent timeline={timeline} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
