import React from 'react';
import { ExternalLink } from 'lucide-react';
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
    <header className="sticky top-0 z-50 w-full h-12 bg-surface bg-[#131314] border-b border-outline-variant border-[#232426] px-md px-4 select-none text-xs text-on-surface-variant font-sans">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
        
        {/* Left: Brand Identity & Geometric Monogram */}
        <div className="flex items-center gap-3">
          <div
            className="flex items-center gap-2 group cursor-pointer"
            onClick={() => onToggleLandingView ? onToggleLandingView(true) : handleRoleSelect('student')}
            title="SHOW3D Executive Overview"
          >
            <div className="w-6 h-6 rounded-full border border-custom-text-muted border-[#9A9DA3]/60 flex items-center justify-center font-h4 font-bold text-xs text-on-surface text-[#e5e2e3] group-hover:border-primary group-hover:text-primary transition-colors">
              S
            </div>
            <span className="font-h4 font-bold tracking-tighter text-on-surface text-[#e5e2e3] text-sm">
              SHOW3D
            </span>
          </div>

          <span className="hidden sm:inline-flex items-center text-[10px] font-mono px-1.5 py-0.5 rounded border border-[#232426] bg-[#0d0e0f] text-[#9A9DA3]">
            SYS // SG_MOE_D&T
          </span>
        </div>

        {/* Center: Horizontal Mode / View Tabs with Active Bottom Indicator Line */}
        <nav className="h-full flex items-center gap-4 sm:gap-6 text-xs sm:text-[13px] font-medium" aria-label="Main Navigation">
          {onToggleLandingView && (
            <button
              onClick={() => onToggleLandingView(true)}
              className={`pb-3 relative top-[6px] transition-colors border-b-2 ${
                isOverviewActive
                  ? 'text-primary text-[#5E6BFF] border-primary border-[#5E6BFF] font-semibold'
                  : 'text-on-surface-variant text-[#9A9DA3] hover:text-on-surface hover:text-[#e5e2e3] border-transparent'
              }`}
            >
              Overview
            </button>
          )}

          <button
            onClick={() => handleRoleSelect('student')}
            className={`pb-3 relative top-[6px] transition-colors border-b-2 ${
              isStudentActive
                ? 'text-primary text-[#5E6BFF] border-primary border-[#5E6BFF] font-semibold'
                : 'text-on-surface-variant text-[#9A9DA3] hover:text-on-surface hover:text-[#e5e2e3] border-transparent'
            }`}
          >
            Student Learning Mode
          </button>

          <button
            onClick={() => handleRoleSelect('facilitator')}
            className={`pb-3 relative top-[6px] transition-colors border-b-2 ${
              isFacilitatorActive
                ? 'text-primary text-[#5E6BFF] border-primary border-[#5E6BFF] font-semibold'
                : 'text-on-surface-variant text-[#9A9DA3] hover:text-on-surface hover:text-[#e5e2e3] border-transparent'
            }`}
          >
            Facilitator Mode
          </button>
        </nav>

        {/* Right: Module Quick-Select Segmented Bar & Canvas Trigger */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Module numbers M01-M06 inside a crisp #101112 container */}
          <div className="hidden lg:flex items-center gap-1 bg-[#101112] border border-[#1B1C1E] rounded p-xs p-1">
            <span className="text-[10px] font-mono text-[#9A9DA3] px-1 uppercase tracking-wider">
              Module:
            </span>
            {LEARNING_MODULES.map((m) => {
              const isActive = !isLandingView && m.id === activeModuleId;
              const moduleLabel = `M0${m.id}`;
              return (
                <button
                  key={m.id}
                  onClick={() => handleModuleSelect(m.id)}
                  className={`px-2 py-0.5 rounded text-[11px] font-mono transition-all flex items-center justify-center ${
                    isActive
                      ? 'bg-[#191A1C] text-primary text-[#5E6BFF] font-bold shadow'
                      : 'text-[#9A9DA3] hover:text-[#e5e2e3] hover:bg-[#151617]'
                  }`}
                  title={`${m.code}: ${m.title}`}
                >
                  {moduleLabel}
                </button>
              );
            })}
          </div>

          {/* Try Show3D Canvas Button styled as Romer primary action */}
          <button
            onClick={handleCanvasTrigger}
            className="bg-[#5E6BFF] hover:bg-[#4a57f5] text-[#F0F1F2] rounded py-1.5 px-3 font-label-sm text-xs font-medium flex items-center gap-1.5 transition-colors shadow-sm"
            title="Open core Show3D WebGL CAD modeling engine in dedicated window"
          >
            <ExternalLink className="size-3 text-[#F0F1F2]" />
            <span className="hidden sm:inline">Try Show3D Canvas</span>
          </button>
        </div>

      </div>
    </header>
  );
};
