import React from 'react';
import { ExternalLink, Sparkles, BookOpen, Users, Compass } from 'lucide-react';
import { LEARNING_MODULES } from '../../store/appStore';

export interface AppleTopNavProps {
  activeMode: 'student' | 'facilitator';
  onSwitchMode?: (mode: 'student' | 'facilitator') => void;
  onSelectRole?: (mode: 'student' | 'facilitator') => void;
  activeModuleId: number;
  onSelectModule: (id: number) => void;
  onLaunchCanvasModal?: () => void;
  onOpenCanvas?: () => void;
  isLandingView?: boolean;
  onToggleLandingView?: (show: boolean) => void;
}

export const AppleTopNav: React.FC<AppleTopNavProps> = ({
  activeMode,
  onSwitchMode,
  onSelectRole,
  activeModuleId,
  onSelectModule,
  onLaunchCanvasModal,
  onOpenCanvas,
  isLandingView = false,
  onToggleLandingView,
}) => {
  const handleRoleSelect = (role: 'student' | 'facilitator') => {
    if (onToggleLandingView) {
      onToggleLandingView(false);
    }
    if (onSwitchMode) {
      onSwitchMode(role);
    }
    if (onSelectRole) {
      onSelectRole(role);
    }
  };

  const handleCanvasTrigger = () => {
    if (onLaunchCanvasModal) {
      onLaunchCanvasModal();
    }
    if (onOpenCanvas) {
      onOpenCanvas();
    }
  };

  const handleModuleSelect = (id: number) => {
    if (onToggleLandingView) {
      onToggleLandingView(false);
    }
    onSelectModule(id);
  };

  const isOverviewActive = isLandingView;
  const isStudentActive = !isLandingView && activeMode === 'student';
  const isFacilitatorActive = !isLandingView && activeMode === 'facilitator';

  return (
    <header className="sticky top-0 z-50 w-full h-14 bg-[#0a0a0c]/80 backdrop-blur-xl border-b border-white/[0.08] px-4 select-none text-xs font-sans transition-all">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between gap-4">
        
        {/* Left: Clean Brand Identity */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onToggleLandingView ? onToggleLandingView(true) : handleRoleSelect('student')}
            className="flex items-center gap-2.5 group transition-opacity hover:opacity-90"
            title="Show3D Programme Home"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center font-bold text-xs text-white shadow-sm">
              S
            </div>
            <div className="flex flex-col text-left">
              <span className="font-bold tracking-tight text-white text-sm leading-none">
                SHOW3D
              </span>
              <span className="text-[10px] text-slate-400 font-medium tracking-wide mt-0.5">
                AI Creator Programme
              </span>
            </div>
          </button>
        </div>

        {/* Center: Apple HIG Segmented Control Pill */}
        <nav 
          className="inline-flex p-1 rounded-full bg-white/[0.06] border border-white/[0.08] shadow-inner"
          aria-label="View Mode Switcher"
        >
          {onToggleLandingView && (
            <button
              onClick={() => onToggleLandingView(true)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                isOverviewActive
                  ? 'bg-white text-black shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Compass className="size-3.5" />
              <span>Overview</span>
            </button>
          )}

          <button
            onClick={() => handleRoleSelect('student')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
              isStudentActive
                ? 'bg-white text-black shadow-sm font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="size-3.5" />
            <span>Student Classroom</span>
          </button>

          <button
            onClick={() => handleRoleSelect('facilitator')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
              isFacilitatorActive
                ? 'bg-white text-black shadow-sm font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Users className="size-3.5" />
            <span>Instructor Hub</span>
          </button>
        </nav>

        {/* Right: Quick Module Filter (only visible in Student view) & 3D Canvas Launch */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Module numbers M01-M06: only rendered when in Student view to eliminate noise */}
          {isStudentActive && (
            <div className="hidden lg:flex items-center gap-1 bg-white/[0.04] border border-white/[0.08] rounded-full p-1 animate-in fade-in duration-200">
              <span className="text-[10px] text-slate-400 px-2 uppercase tracking-wider font-medium">
                Module:
              </span>
              {LEARNING_MODULES.map((m) => {
                const isActive = m.id === activeModuleId;
                return (
                  <button
                    key={m.id}
                    onClick={() => handleModuleSelect(m.id)}
                    className={`px-2 py-0.5 rounded-full text-[11px] font-mono transition-all ${
                      isActive
                        ? 'bg-blue-600 text-white font-bold shadow-sm'
                        : 'text-slate-400 hover:text-white hover:bg-white/[0.06]'
                    }`}
                    title={`${m.code}: ${m.title}`}
                  >
                    M0{m.id}
                  </button>
                );
              })}
            </div>
          )}

          {/* Try Show3D Canvas Button */}
          <button
            onClick={handleCanvasTrigger}
            className="bg-white/10 hover:bg-white/15 text-white border border-white/10 rounded-full py-1.5 px-3.5 text-xs font-medium flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
            title="Open interactive Show3D Canvas modal"
          >
            <ExternalLink className="size-3 text-blue-400" />
            <span className="hidden sm:inline">3D Canvas</span>
          </button>
        </div>

      </div>
    </header>
  );
};
