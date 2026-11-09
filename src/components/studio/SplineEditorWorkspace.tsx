import React, { useState } from 'react';
import { EduState, EduStep } from '../../types';
import { SplineLeftPanel } from './SplineLeftPanel';
import { SplineViewportMock } from './SplineViewportMock';
import { SplineInspector } from './SplineInspector';
import { 
  Share2, 
  Download, 
  ExternalLink, 
  Check, 
  Sparkles, 
  RotateCcw,
  Sliders,
  Award,
  BookOpen
} from 'lucide-react';

interface SplineEditorWorkspaceProps {
  eduState: EduState;
  onUpdateEduState: (updates: Partial<EduState>) => void;
  onTriggerGenerate: () => void;
  onOpenCertificateModal: () => void;
  onLaunchCanvasModal?: () => void;
  onResetChallenge?: () => void;
  onBackToLesson?: () => void;
}

const STEPS = [
  { id: 1, label: '1. Brief' },
  { id: 2, label: '2. Prompt' },
  { id: 3, label: '3. Model & Refine' },
  { id: 4, label: '4. Present & Export' },
];

export const SplineEditorWorkspace: React.FC<SplineEditorWorkspaceProps> = ({
  eduState,
  onUpdateEduState,
  onTriggerGenerate,
  onOpenCertificateModal,
  onLaunchCanvasModal,
  onResetChallenge,
  onBackToLesson,
}) => {
  const [selectedObjectId, setSelectedObjectId] = useState<string>('canopy');
  const currentStep = eduState.step || 3;

  const handleSetStep = (step: number) => {
    onUpdateEduState({ step: step as EduStep });
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden select-none font-sans bg-[#08090c] text-zinc-200">
      {/* 1. Spline Top Floating Bar */}
      <div className="h-12 px-4 border-b border-white/[0.08] bg-[#0e1017]/90 backdrop-blur-xl flex items-center justify-between z-40 shrink-0">
        {/* Left: Project title & Curriculum tag & Back to Lesson */}
        <div className="flex items-center gap-3">
          {onBackToLesson && (
            <button
              onClick={onBackToLesson}
              className="px-2.5 py-1 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 hover:text-white border border-blue-500/30 text-xs font-medium transition-colors flex items-center gap-1.5"
              title="Return to the step-by-step reading and guided lesson slides"
            >
              <BookOpen className="size-3.5 text-blue-400" />
              <span>Read Lesson</span>
            </button>
          )}

          <div className="flex items-center gap-1.5 text-xs">
            <span className="font-semibold text-white tracking-tight">Courtyard Pavilion</span>
            <span className="text-zinc-600">/</span>
            <span className="text-zinc-400 font-mono text-[11px]">MOD 03 · Design & Technology</span>
          </div>

          <span className="px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-mono text-blue-400 hidden sm:inline">
            Learn to Use AI
          </span>
        </div>

        {/* Center: Stage Step Switcher (Spline Segmented Bar) */}
        <div className="flex items-center bg-[#161822] border border-white/[0.06] p-0.5 rounded-full">
          {STEPS.map((s) => {
            const isActive = currentStep === s.id;
            const isDone = currentStep > s.id;

            return (
              <button
                key={s.id}
                onClick={() => handleSetStep(s.id)}
                className={`px-3 py-1 rounded-full text-xs transition-all flex items-center gap-1.5 font-medium ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : isDone
                    ? 'text-zinc-300 hover:text-white'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {isDone && <Check className="size-3 text-emerald-400" />}
                <span>{s.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right: Collaborator Avatars & Export */}
        <div className="flex items-center gap-2">
          {/* Avatar Pile */}
          <div className="flex items-center -space-x-1.5 hidden sm:flex">
            <div className="size-6 rounded-full bg-blue-500 border border-[#0e1017] flex items-center justify-center text-[10px] font-bold text-white shadow" title="Teacher Tan">
              T
            </div>
            <div className="size-6 rounded-full bg-purple-500 border border-[#0e1017] flex items-center justify-center text-[10px] font-bold text-white shadow" title="Student 3-Faith">
              S
            </div>
            <div className="size-6 rounded-full bg-gradient-to-tr from-amber-400 to-rose-500 border border-[#0e1017] flex items-center justify-center text-[10px] font-bold text-white shadow" title="Show3D Agent">
              A
            </div>
          </div>

          <div className="h-4 w-px bg-white/[0.08] hidden sm:block" />

          {/* Export / Share Actions */}
          <button
            onClick={onLaunchCanvasModal}
            className="px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-zinc-300 hover:text-white text-xs font-medium border border-white/[0.08] transition-colors flex items-center gap-1.5"
          >
            <Share2 className="size-3" />
            <span className="hidden md:inline">Share</span>
          </button>

          <button
            onClick={onOpenCertificateModal}
            className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5 active:scale-95"
          >
            <Award className="size-3.5" />
            <span>Complete</span>
          </button>
        </div>
      </div>

      {/* 2. Main Studio 3-Column Layout */}
      <div className="flex-1 min-h-0 flex relative overflow-hidden">
        {/* Left: Spline Agent & Objects Panel */}
        <SplineLeftPanel
          eduState={eduState}
          onUpdateEduState={onUpdateEduState}
          onTriggerGenerate={onTriggerGenerate}
          selectedObjectId={selectedObjectId}
          onSelectObject={setSelectedObjectId}
        />

        {/* Center: Spline Spatial Viewport Mock */}
        <div className="flex-1 relative h-full min-w-0">
          <SplineViewportMock
            eduState={eduState}
            onUpdateEduState={onUpdateEduState}
            onLaunchCanvasModal={onLaunchCanvasModal}
          />
        </div>

        {/* Right: Spline Inspector Panel */}
        <SplineInspector
          eduState={eduState}
          onUpdateEduState={onUpdateEduState}
          onOpenCertificateModal={onOpenCertificateModal}
          selectedObjectId={selectedObjectId}
        />
      </div>
    </div>
  );
};
