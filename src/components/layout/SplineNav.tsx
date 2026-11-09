import React, { useState } from 'react';
import { AppViewMode } from '../../types';
import { 
  Sparkles, 
  ChevronDown, 
  GraduationCap, 
  BookOpen, 
  Users, 
  ArrowUpRight, 
  Layers, 
  ExternalLink,
  ShieldCheck,
  Check,
  Building2,
  Lock,
  FileText
} from 'lucide-react';

interface SplineNavProps {
  viewMode: AppViewMode;
  onNavigateMode: (mode: AppViewMode) => void;
  onOpenTeacherHub?: () => void;
  onLaunchCanvasModal?: () => void;
  onOpenSafetyModal?: () => void;
  onOpenProcurementModal?: () => void;
  onOpenPedagogyModal?: () => void;
}

export const SplineNav: React.FC<SplineNavProps> = ({
  viewMode,
  onNavigateMode,
  onOpenTeacherHub,
  onLaunchCanvasModal,
  onOpenSafetyModal,
  onOpenProcurementModal,
  onOpenPedagogyModal,
}) => {
  const [productsOpen, setProductsOpen] = useState(false);
  const [researchOpen, setResearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full h-14 bg-[#08090c]/85 backdrop-blur-xl border-b border-white/[0.08] select-none text-xs text-zinc-300 font-sans px-4 sm:px-6">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
        {/* Left: Brand + Menu */}
        <div className="flex items-center gap-8">
          {/* Spline-style Logo */}
          <button
            onClick={() => onNavigateMode('landing')}
            className="flex items-center gap-2.5 text-white hover:opacity-90 transition-opacity group"
          >
            <div className="size-6 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-sm shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Layers className="size-3.5" />
            </div>
            <span className="font-semibold text-sm tracking-tight text-white">
              Show3D
            </span>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-white/[0.06] text-zinc-400 border border-white/[0.08]">
              Edu
            </span>
          </button>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-zinc-400">
            {/* Curriculum Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setProductsOpen(!productsOpen);
                  setResearchOpen(false);
                }}
                onBlur={() => setTimeout(() => setProductsOpen(false), 200)}
                className="flex items-center gap-1.5 text-zinc-300 hover:text-white transition-colors py-1"
              >
                <span>Curriculum</span>
                <ChevronDown className="size-3.5 text-zinc-500" />
              </button>

              {productsOpen && (
                <div className="absolute top-8 left-0 w-64 p-2 rounded-xl spline-glass-panel border border-white/[0.1] shadow-2xl z-50 space-y-1">
                  <div className="px-3 py-2 text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                    IMDA Code for Fun · 6 Modules
                  </div>
                  <button
                    onClick={() => {
                      onNavigateMode('hub');
                      setProductsOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/[0.06] transition-colors flex items-center justify-between group"
                  >
                    <div>
                      <div className="text-white text-xs font-medium">Overview & Syllabus</div>
                      <div className="text-[11px] text-zinc-400">10-hour spatial AI pathway</div>
                    </div>
                    <ArrowUpRight className="size-3 text-zinc-500 group-hover:text-white" />
                  </button>
                  <button
                    onClick={() => {
                      onNavigateMode('lesson');
                      setProductsOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/[0.06] transition-colors flex items-center justify-between group"
                  >
                    <div>
                      <div className="text-white text-xs font-medium">Read Lessons (Guided)</div>
                      <div className="text-[11px] text-blue-400">Slides, visual concepts & quizzes</div>
                    </div>
                    <BookOpen className="size-3 text-blue-400" />
                  </button>
                  <button
                    onClick={() => {
                      onNavigateMode('studio');
                      setProductsOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/[0.06] transition-colors flex items-center justify-between group"
                  >
                    <div>
                      <div className="text-white text-xs font-medium">3D Studio Sandbox</div>
                      <div className="text-[11px] text-purple-400">Courtyard Shading Structure</div>
                    </div>
                    <span className="size-1.5 rounded-full bg-purple-500 animate-pulse" />
                  </button>
                </div>
              )}
            </div>

            {/* Governance & Pedagogy Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setResearchOpen(!researchOpen);
                  setProductsOpen(false);
                }}
                onBlur={() => setTimeout(() => setResearchOpen(false), 200)}
                className="flex items-center gap-1.5 text-zinc-300 hover:text-white transition-colors py-1"
              >
                <span>Governance & Pedagogy</span>
                <ChevronDown className="size-3.5 text-zinc-500" />
              </button>

              {researchOpen && (
                <div className="absolute top-8 left-0 w-72 p-2 rounded-xl spline-glass-panel border border-white/[0.1] shadow-2xl z-50 space-y-1">
                  <div className="px-3 py-2 text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                    MOE Compliance & Learning Science
                  </div>
                  {onOpenSafetyModal && (
                    <button
                      onClick={() => {
                        onOpenSafetyModal();
                        setResearchOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/[0.06] transition-colors flex items-center gap-2.5 group"
                    >
                      <ShieldCheck className="size-4 text-emerald-400 shrink-0" />
                      <div>
                        <div className="text-white text-xs font-medium">Student Safety & PDPA</div>
                        <div className="text-[11px] text-zinc-400">Age 13+, SSO, 0% model training</div>
                      </div>
                    </button>
                  )}
                  {onOpenProcurementModal && (
                    <button
                      onClick={() => {
                        onOpenProcurementModal();
                        setResearchOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/[0.06] transition-colors flex items-center gap-2.5 group"
                    >
                      <Building2 className="size-4 text-blue-400 shrink-0" />
                      <div>
                        <div className="text-white text-xs font-medium">GeBIZ & Procurement</div>
                        <div className="text-[11px] text-zinc-400">Enrichment budgets, ALP, Opp Fund</div>
                      </div>
                    </button>
                  )}
                  {onOpenPedagogyModal && (
                    <button
                      onClick={() => {
                        onOpenPedagogyModal();
                        setResearchOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/[0.06] transition-colors flex items-center gap-2.5 group"
                    >
                      <GraduationCap className="size-4 text-purple-400 shrink-0" />
                      <div>
                        <div className="text-white text-xs font-medium">Pedagogy Framework</div>
                        <div className="text-[11px] text-zinc-400">Constructionism, 5 Phases & Four Learns</div>
                      </div>
                    </button>
                  )}
                </div>
              )}
            </div>

            <button
              onClick={() => onNavigateMode('hub')}
              className={`hover:text-white transition-colors ${
                viewMode === 'hub' ? 'text-white font-medium' : ''
              }`}
            >
              Modules
            </button>

            <button
              onClick={() => onNavigateMode('teacher')}
              className={`hover:text-white transition-colors flex items-center gap-1.5 ${
                viewMode === 'teacher' ? 'text-white font-medium' : ''
              }`}
            >
              <span>Teacher Facilitator</span>
              <span className="size-1.5 rounded-full bg-emerald-400" />
            </button>

            <a
              href="#schools"
              onClick={(e) => {
                if (viewMode !== 'landing') {
                  e.preventDefault();
                  onNavigateMode('landing');
                }
              }}
              className="hover:text-white transition-colors"
            >
              Singapore Schools
            </a>
          </nav>
        </div>

        {/* Center: Perspective Pill Switcher (Interactive Prototype Navigation) */}
        <div className="flex items-center bg-[#12141c] border border-white/[0.08] p-0.5 rounded-full">
          <button
            onClick={() => onNavigateMode('landing')}
            className={`px-3 py-1 rounded-full text-[11px] transition-all font-medium ${
              viewMode === 'landing'
                ? 'bg-white/10 text-white shadow-xs'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => onNavigateMode('lesson')}
            className={`px-3 py-1 rounded-full text-[11px] transition-all font-medium flex items-center gap-1.5 ${
              viewMode === 'lesson'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <BookOpen className="size-3 text-blue-300" />
            <span>Read Lessons</span>
          </button>
          <button
            onClick={() => onNavigateMode('hub')}
            className={`px-3 py-1 rounded-full text-[11px] transition-all font-medium ${
              viewMode === 'hub'
                ? 'bg-white/10 text-white shadow-xs'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Syllabus (6)
          </button>
          <button
            onClick={() => onNavigateMode('studio')}
            className={`px-3 py-1 rounded-full text-[11px] transition-all font-medium flex items-center gap-1.5 ${
              viewMode === 'studio'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <span>3D Studio</span>
          </button>
          <button
            onClick={() => onNavigateMode('teacher')}
            className={`px-3 py-1 rounded-full text-[11px] transition-all font-medium flex items-center gap-1 ${
              viewMode === 'teacher'
                ? 'bg-white/10 text-white shadow-xs'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Users className="size-3 text-emerald-400" />
            <span className="hidden sm:inline">Teacher</span>
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onLaunchCanvasModal}
            className="hidden sm:flex items-center gap-1.5 text-zinc-300 hover:text-white transition-colors py-1.5 px-3 rounded-lg hover:bg-white/[0.05] border border-transparent hover:border-white/[0.06]"
          >
            <ExternalLink className="size-3.5 text-blue-400" />
            <span>Try Show3D Canvas</span>
          </button>

          <button
            onClick={() => onNavigateMode('studio')}
            className="px-3.5 py-1.5 rounded-full bg-white hover:bg-zinc-200 text-black font-semibold text-xs transition-all shadow-md active:scale-95 flex items-center gap-1.5"
          >
            <span>Open Studio</span>
            <ArrowUpRight className="size-3 text-black" />
          </button>
        </div>
      </div>
    </header>
  );
};
