import React from 'react';
import { ExternalLink, BookOpen, Users, Compass, FlaskConical, Box } from 'lucide-react';
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
    <header className="sticky top-0 z-50 w-full h-16 bg-[#000000]/85 backdrop-blur-xl border-b border-white/[0.08] px-4 sm:px-6 select-none text-xs font-sans transition-all">
      <div className="max-w-[1400px] mx-auto h-full flex items-center justify-between gap-4">
        
        {/* Left: Apple HIG Wordmark + Section Anchors */}
        <div className="flex items-center gap-6 shrink-0">
          <button
            id="nav-brand-home"
            onClick={() => onToggleLandingView ? onToggleLandingView(true) : handleRoleSelect('student')}
            className="flex items-center gap-2.5 group transition-opacity hover:opacity-90"
            title="Show3D Academy: Spatial AI & 3D Creator Programme"
          >
            <div className="w-8 h-8 rounded-full bg-[#1C1C1E] border border-white/[0.12] flex items-center justify-center text-[#0A84FF] group-hover:bg-[#2C2C2E] transition-colors">
              <Box className="size-4" />
            </div>
            <div className="flex items-baseline gap-1.5 text-left">
              <span className="font-display font-bold tracking-tight text-white text-base leading-none">
                Show3D
              </span>
              <span className="font-display font-normal text-[#86868B] text-base leading-none">
                Academy
              </span>
            </div>
          </button>

          {/* Apple HIG Top Anchor Links (visible on Landing View) */}
          {isOverviewActive && (
            <div className="hidden xl:flex items-center gap-5 text-xs font-medium text-[#86868B] pl-2 border-l border-white/[0.08]">
              <a href="#difference" className="hover:text-white transition-colors">
                Philosophy
              </a>
              <a href="#curriculum" className="hover:text-white transition-colors">
                Curriculum
              </a>
              <a href="#outcomes" className="hover:text-white transition-colors">
                Outcomes
              </a>
              <a href="#gravity-lab" className="hover:text-[#64D2FF] transition-colors">
                Physics Lab
              </a>
              <a href="#safety" className="hover:text-white transition-colors">
                Safety &amp; PDPA
              </a>
              <a href="#lineup" className="hover:text-white transition-colors">
                Cohorts
              </a>
              <a href="#faq" className="hover:text-white transition-colors">
                FAQ
              </a>
            </div>
          )}
        </div>

        {/* Center: Apple HIG Segmented Control Switcher */}
        <nav 
          className="inline-flex p-1 rounded-full bg-[#1C1C1E] border border-white/[0.08]"
          aria-label="View Mode Switcher"
        >
          {onToggleLandingView && (
            <button
              id="nav-mode-overview"
              onClick={() => onToggleLandingView(true)}
              className={`px-3 sm:px-4 py-1.5 min-h-[38px] rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                isOverviewActive
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'text-[#86868B] hover:text-white'
              }`}
            >
              <Compass className="size-3.5 shrink-0" />
              <span className="hidden sm:inline">Overview</span>
              <span className="sm:hidden">Home</span>
            </button>
          )}

          <button
            id="nav-mode-student"
            onClick={() => handleRoleSelect('student')}
            className={`px-3 sm:px-4 py-1.5 min-h-[38px] rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
              isStudentActive
                ? 'bg-white text-black font-semibold shadow-sm'
                : 'text-[#86868B] hover:text-white'
            }`}
          >
            <BookOpen className="size-3.5 shrink-0" />
            <span className="hidden sm:inline">Student Lab</span>
            <span className="sm:hidden">Student</span>
          </button>

          <button
            id="nav-mode-facilitator"
            onClick={() => handleRoleSelect('facilitator')}
            className={`px-3 sm:px-4 py-1.5 min-h-[38px] rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
              isFacilitatorActive
                ? 'bg-white text-black font-semibold shadow-sm'
                : 'text-[#86868B] hover:text-white'
            }`}
          >
            <Users className="size-3.5 shrink-0" />
            <span className="hidden sm:inline">Facilitator Hub</span>
            <span className="sm:hidden">Hub</span>
          </button>
        </nav>

        {/* Right: Quick Module Filter (only visible in Student view) & 3D Canvas Launch */}
        <div className="flex items-center gap-2.5 shrink-0">
          {isStudentActive && (
            <div className="hidden lg:flex items-center gap-1 bg-[#1E1F22] border border-white/[0.08] rounded-full p-1">
              <span className="text-[10px] text-[#9AA0A6] px-2.5 uppercase tracking-wider font-mono">
                Exp:
              </span>
              {LEARNING_MODULES.map((m) => {
                const isActive = m.id === activeModuleId;
                return (
                  <button
                    key={m.id}
                    id={`nav-module-${m.id}`}
                    onClick={() => handleModuleSelect(m.id)}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-mono transition-all labs-pill-btn ${
                      isActive
                        ? 'bg-[#A8C7FA] text-[#062E6F] font-bold'
                        : 'text-[#9AA0A6] hover:text-white hover:bg-white/[0.06]'
                    }`}
                    title={`${m.code}: ${m.title}`}
                  >
                    M0{m.id}
                  </button>
                );
              })}
            </div>
          )}

          {/* Try Show3D Canvas Pill Button */}
          <button
            id="nav-launch-canvas"
            onClick={handleCanvasTrigger}
            className="bg-[#A8C7FA] hover:bg-[#D3E3FD] text-[#062E6F] rounded-full py-2 px-4 text-xs font-semibold flex items-center gap-1.5 transition-all labs-pill-btn"
            title="Open interactive Show3D Canvas modal"
          >
            <span className="hidden sm:inline">Try 3D Canvas</span>
            <span className="sm:hidden">Canvas</span>
            <ExternalLink className="size-3.5" />
          </button>
        </div>

      </div>
    </header>
  );
};
