import React from 'react';
import { ExternalLink, BookOpen, Users, Compass, FlaskConical } from 'lucide-react';
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
    <header className="sticky top-0 z-50 w-full h-16 bg-[#131314]/90 backdrop-blur-xl border-b border-white/[0.08] px-4 sm:px-6 select-none text-xs font-sans transition-all">
      <div className="max-w-[1400px] mx-auto h-full flex items-center justify-between gap-4">
        
        {/* Left: Google Labs-Inspired Wordmark + Section Anchors */}
        <div className="flex items-center gap-6 shrink-0">
          <button
            id="nav-brand-home"
            onClick={() => onToggleLandingView ? onToggleLandingView(true) : handleRoleSelect('student')}
            className="flex items-center gap-2.5 group transition-opacity hover:opacity-90"
            title="Show3D Labs: Singapore's home for 3D AI experiments"
          >
            <div className="w-8 h-8 rounded-full bg-[#1E1F22] border border-white/[0.12] flex items-center justify-center text-[#A8C7FA] group-hover:bg-[#282A2E] transition-colors">
              <FlaskConical className="size-4" />
            </div>
            <div className="flex items-baseline gap-1.5 text-left">
              <span className="font-display font-bold tracking-tight text-white text-base leading-none">
                Show3D
              </span>
              <span className="font-display font-normal text-[#9AA0A6] text-base leading-none">
                Labs
              </span>
            </div>
          </button>

          {/* Google Labs Top Anchor Links (visible on Landing View) */}
          {isOverviewActive && (
            <div className="hidden xl:flex items-center gap-5 text-xs font-medium text-[#9AA0A6] pl-2 border-l border-white/[0.08]">
              <a href="#experiments" className="hover:text-white transition-colors">
                Experiments
              </a>
              <a href="#about-labs" className="hover:text-white transition-colors">
                About
              </a>
              <a href="#beyond-the-lab" className="hover:text-white transition-colors">
                Beyond the Lab
              </a>
              <a href="#stay-connected" className="hover:text-white transition-colors">
                Stay connected
              </a>
            </div>
          )}
        </div>

        {/* Center: Google Labs Dark Mode Pill Switcher */}
        <nav 
          className="inline-flex p-1 rounded-full bg-[#1E1F22] border border-white/[0.08]"
          aria-label="View Mode Switcher"
        >
          {onToggleLandingView && (
            <button
              id="nav-mode-overview"
              onClick={() => onToggleLandingView(true)}
              className={`px-3 sm:px-4 py-1.5 min-h-[38px] rounded-full text-xs font-medium transition-all flex items-center gap-1.5 labs-pill-btn ${
                isOverviewActive
                  ? 'bg-[#E3E3E3] text-[#131314] font-semibold'
                  : 'text-[#9AA0A6] hover:text-white'
              }`}
            >
              <Compass className="size-3.5 shrink-0" />
              <span className="hidden sm:inline">Labs Home</span>
              <span className="sm:hidden">Labs</span>
            </button>
          )}

          <button
            id="nav-mode-student"
            onClick={() => handleRoleSelect('student')}
            className={`px-3 sm:px-4 py-1.5 min-h-[38px] rounded-full text-xs font-medium transition-all flex items-center gap-1.5 labs-pill-btn ${
              isStudentActive
                ? 'bg-[#E3E3E3] text-[#131314] font-semibold'
                : 'text-[#9AA0A6] hover:text-white'
            }`}
          >
            <BookOpen className="size-3.5 shrink-0" />
            <span className="hidden sm:inline">Student Lab</span>
            <span className="sm:hidden">Student</span>
          </button>

          <button
            id="nav-mode-facilitator"
            onClick={() => handleRoleSelect('facilitator')}
            className={`px-3 sm:px-4 py-1.5 min-h-[38px] rounded-full text-xs font-medium transition-all flex items-center gap-1.5 labs-pill-btn ${
              isFacilitatorActive
                ? 'bg-[#E3E3E3] text-[#131314] font-semibold'
                : 'text-[#9AA0A6] hover:text-white'
            }`}
          >
            <Users className="size-3.5 shrink-0" />
            <span className="hidden sm:inline">Instructor Hub</span>
            <span className="sm:hidden">Instructor</span>
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
