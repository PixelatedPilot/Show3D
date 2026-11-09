import React from 'react';
import { AppViewMode } from '../../types';
import { RotateCcw, GraduationCap, BookOpen, Users, Home } from 'lucide-react';

interface TopHeaderProps {
  viewMode: AppViewMode;
  onNavigateMode: (mode: AppViewMode) => void;
  onResetChallenge: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  viewMode,
  onNavigateMode,
  onResetChallenge
}) => {
  return (
    <header className="h-12 px-4 flex items-center justify-between border-b border-zinc-800 bg-[#18181b] z-40 select-none text-xs text-zinc-300 shrink-0 font-sans">
      {/* Left: Window Controls + Brand */}
      <div className="flex items-center gap-3">
        {/* macOS Window Controls */}
        <div className="flex items-center gap-1.5 mr-1 hidden sm:flex">
          <div className="size-3 rounded-full bg-[#ff5f56] border border-[#e0443e]/50" />
          <div className="size-3 rounded-full bg-[#ffbd2e] border border-[#dea123]/50" />
          <div className="size-3 rounded-full bg-[#27c93f] border border-[#1aab29]/50" />
        </div>

        <div className="h-4 w-px bg-zinc-800 hidden sm:block" />

        {/* Brand & Project Breadcrumb */}
        <button
          onClick={() => onNavigateMode('landing')}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <span className="font-semibold text-white tracking-tight">Show3D</span>
          <span className="text-zinc-600">/</span>
          <span className="text-zinc-400 font-normal truncate max-w-[140px] sm:max-w-none">
            {viewMode === 'landing'
              ? 'Programme Home'
              : viewMode === 'teacher'
              ? 'Teacher Facilitator Dashboard'
              : viewMode === 'hub'
              ? 'Curriculum Library'
              : 'Interactive Module Studio'}
          </span>
        </button>
      </div>

      {/* Center: Explicit View / Perspective Switcher */}
      <div className="flex items-center bg-zinc-900 border border-zinc-800 p-0.5 rounded-lg shadow-inner">
        <button
          onClick={() => onNavigateMode('landing')}
          className={`px-2.5 py-1.5 rounded-md text-xs transition-all font-medium flex items-center gap-1.5 ${
            viewMode === 'landing'
              ? 'bg-zinc-800 text-white shadow-xs font-semibold'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
          title="Return to Step 0 Landing Page"
        >
          <Home className={`size-3.5 ${viewMode === 'landing' ? 'text-blue-400' : 'text-zinc-500'}`} />
          <span className="hidden sm:inline">Home</span>
        </button>

        <button
          onClick={() => onNavigateMode('studio')}
          className={`px-3 py-1.5 rounded-md text-xs transition-all font-medium flex items-center gap-1.5 ${
            viewMode === 'studio'
              ? 'bg-zinc-800 text-white shadow-xs font-semibold'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
          title="Switch to Student Studio (Interactive Module Workbench)"
        >
          <GraduationCap className={`size-3.5 ${viewMode === 'studio' ? 'text-blue-400' : 'text-zinc-500'}`} />
          <span>Student Studio</span>
        </button>

        <button
          onClick={() => onNavigateMode('hub')}
          className={`px-3 py-1.5 rounded-md text-xs transition-all font-medium flex items-center gap-1.5 ${
            viewMode === 'hub'
              ? 'bg-zinc-800 text-white shadow-xs font-semibold'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
          title="Switch to Curriculum Overview (6 Modules)"
        >
          <BookOpen className={`size-3.5 ${viewMode === 'hub' ? 'text-blue-400' : 'text-zinc-500'}`} />
          <span>Curriculum</span>
        </button>

        <button
          onClick={() => onNavigateMode('teacher')}
          className={`px-3 py-1.5 rounded-md text-xs transition-all font-medium flex items-center gap-1.5 ${
            viewMode === 'teacher'
              ? 'bg-blue-600 text-white shadow-xs font-semibold'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
          title="Switch to Teacher Facilitation View (Class Roster & Rubrics)"
        >
          <Users className={`size-3.5 ${viewMode === 'teacher' ? 'text-white' : 'text-zinc-500'}`} />
          <span>Teacher View</span>
        </button>
      </div>

      {/* Right: Active Role Indicator & Actions */}
      <div className="flex items-center gap-2.5">
        <button
          onClick={() => onNavigateMode(viewMode === 'teacher' ? 'studio' : 'teacher')}
          className="hidden md:flex items-center gap-1.5 text-zinc-300 font-mono text-[11px] px-2.5 py-1 rounded-md bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 transition-colors"
          title="Click to toggle perspective"
        >
          <span className="text-zinc-500">Perspective:</span>
          <span className={viewMode === 'teacher' ? 'text-blue-400 font-semibold' : 'text-emerald-400 font-semibold'}>
            {viewMode === 'teacher' ? 'Teacher (Mr. Tan)' : 'Student (Ethan)'}
          </span>
        </button>

        {viewMode === 'studio' && (
          <button
            onClick={onResetChallenge}
            className="p-1 rounded-md bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 transition-colors"
            title="Reset Studio Challenge"
          >
            <RotateCcw className="size-3.5" />
          </button>
        )}
      </div>
    </header>
  );
};
