import React, { useState, useEffect } from 'react';
import { EduState } from '../../types';
import { LEARNING_MODULES, MODULE_QUIZZES } from '../../store/appStore';
import { MODULE_LESSONS } from '../../data/moduleLessons';
import {
  getNextSlideStage,
  getPrevSlideStage,
  handleKeyNavigation,
  togglePartsToken,
  setCanopySwatch,
  setCanopyCurvature,
  toggleSolarArray,
} from '../../utils/workflowState';
import { 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  Lightbulb, 
  Award, 
  ExternalLink, 
  Check, 
  CheckCircle2, 
  XCircle, 
  Sun, 
  Wind, 
  Shield, 
  Trees, 
  Plus, 
  X,
  Layers,
  RotateCcw
} from 'lucide-react';

interface StudentKeynoteDeckProps {
  eduState: EduState;
  onUpdateEduState: (updates: Partial<EduState>) => void;
  onSelectModule: (id: number) => void;
  onOpenCertificateModal: () => void;
  onLaunchCanvasModal: () => void;
}

interface PromptIngredient {
  id: string;
  category: 'feature' | 'material' | 'environment';
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const DEFAULT_INGREDIENTS: PromptIngredient[] = [
  { id: 'tensile', category: 'feature', label: 'Tensile Fabric Canopy', icon: Shield },
  { id: 'benches', category: 'material', label: 'Modular Timber Benches', icon: Trees },
  { id: 'solar', category: 'feature', label: '450W Solar Roof Array', icon: Sun },
  { id: 'airflow', category: 'environment', label: 'Cross-Ventilation Draft Gaps', icon: Wind },
];

export const StudentKeynoteDeck: React.FC<StudentKeynoteDeckProps> = ({
  eduState,
  onUpdateEduState,
  onSelectModule,
  onOpenCertificateModal,
  onLaunchCanvasModal,
}) => {
  const activeModuleId = eduState.activeModuleId || 1;
  const currentModule = LEARNING_MODULES.find((m) => m.id === activeModuleId) || LEARNING_MODULES[0];
  const lessonData = MODULE_LESSONS[activeModuleId] || MODULE_LESSONS[1];
  const quizData = MODULE_QUIZZES[activeModuleId];

  // Stage in Keynote: 0, 1, 2 = 3 concept slides; 3 = Co-Design Challenge; 4 = Quiz; 5 = Badge & Summary
  const [slideIndex, setSlideIndex] = useState<number>(0);

  // Challenge Local State
  const [selectedTokens, setSelectedTokens] = useState<string[]>(['tensile', 'benches', 'solar']);
  const [canopyColor, setCanopyColor] = useState<string>('#38bdf8');
  const [curvature, setCurvature] = useState<number>(0.65);
  const [hasSolar, setHasSolar] = useState<boolean>(true);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // Quiz Local State
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isQuizSubmitted, setIsQuizSubmitted] = useState<boolean>(false);

  // Reset slide index when active module changes
  useEffect(() => {
    setSlideIndex(0);
    setSelectedOptionId(null);
    setIsQuizSubmitted(false);
  }, [activeModuleId]);

  // Keyboard Navigation (Arrow Keys & Space via handleKeyNavigation)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'ArrowRight' || e.key === 'Space' || e.key === 'ArrowLeft') {
        e.preventDefault();
        setSlideIndex((prev) => handleKeyNavigation(prev, e.key));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [slideIndex, activeModuleId]);

  const handleNext = () => {
    if (slideIndex < 5) {
      setSlideIndex((prev) => getNextSlideStage(prev));
    } else if (activeModuleId < 6) {
      onSelectModule(activeModuleId + 1);
    }
  };

  const handlePrev = () => {
    setSlideIndex((prev) => getPrevSlideStage(prev));
  };

  const handleToggleToken = (id: string) => {
    setSelectedTokens((prev) => togglePartsToken(prev, id));
  };

  const handleSimulateGeneration = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 1200);
  };

  const currentConceptSlide = lessonData.slides[slideIndex] || lessonData.slides[0];
  const currentQuizQuestion = quizData?.questions[0];
  const selectedQuizOption = currentQuizQuestion?.options.find((o) => o.id === selectedOptionId);

  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    setTouchStartX(null);
  };

  const STAGES = [
    {
      id: 0,
      title: lessonData.slides[0]?.title || 'Spatial Coordinates',
      subtitle: `MOD_0${activeModuleId} // COORDINATE_SPACE`,
    },
    {
      id: 1,
      title: lessonData.slides[1]?.title || 'Passive Climate',
      subtitle: `MOD_0${activeModuleId} // TROPICAL_SHADE`,
    },
    {
      id: 2,
      title: lessonData.slides[2]?.title || 'Structural Geometry',
      subtitle: `MOD_0${activeModuleId} // LOAD_DISTRIBUTION`,
    },
    {
      id: 3,
      title: 'Co-Design Studio',
      subtitle: `MOD_0${activeModuleId} // PARAMETRIC_ASSEMBLY`,
    },
    {
      id: 4,
      title: 'Diagnostic Check',
      subtitle: `MOD_0${activeModuleId} // FORMATIVE_EVAL`,
    },
    {
      id: 5,
      title: 'Competency Badge',
      subtitle: `MOD_0${activeModuleId} // 21CC_CREDENTIAL`,
    },
  ];

  return (
    <div className="flex-1 flex flex-row h-full overflow-hidden bg-[#131314] text-[#E3E3E3] select-none">
      
      {/* 1. Left Sidebar: Module Title & Report Stages List */}
      <aside className="w-64 shrink-0 bg-[#1A1B1E] border-r border-white/[0.07] flex flex-col justify-between p-4 select-none overflow-y-auto">
        <div className="space-y-4">
          {/* Header: Module Title + Subtitle */}
          <div className="border-b border-white/[0.07] pb-3.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#162238] border border-[#A8C7FA]/25 text-[10px] text-[#A8C7FA] font-mono font-semibold tracking-wider uppercase">
              {currentModule.code}
            </div>
            <h3 className="font-h3 text-base sm:text-lg font-display font-medium text-white tracking-tight mt-2">
              {currentModule.title}
            </h3>
            <p className="font-body-md text-xs text-[#9AA0A6] mt-1 leading-relaxed">
              Turn spatial concepts into calm architectural precision.
            </p>
          </div>

          {/* Module stages list */}
          <div className="space-y-1.5">
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#9AA0A6] px-1 mb-1 font-semibold">
              EXPERIMENT STAGES
            </div>
            {STAGES.map((stage) => {
              const isActive = slideIndex === stage.id;
              const isPast = slideIndex > stage.id;
              return (
                <button
                  key={stage.id}
                  onClick={() => setSlideIndex(stage.id)}
                  className={`w-full text-left p-2.5 rounded-2xl transition-all duration-150 flex items-start gap-2.5 ${
                    isActive
                      ? 'bg-[#282A2E] border border-white/[0.12] shadow-sm'
                      : 'border border-transparent hover:bg-[#1E1F22] text-[#9AA0A6] hover:text-[#E3E3E3]'
                  }`}
                >
                  <div className="pt-1.5 shrink-0">
                    {isActive ? (
                      <span className="block w-2 h-2 rounded-full bg-[#6DD58C]" />
                    ) : isPast ? (
                      <span className="block w-2 h-2 rounded-full bg-[#A8C7FA]/70" />
                    ) : (
                      <span className="block w-2 h-2 rounded-full bg-white/20" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className={`font-label-sm truncate leading-tight ${isActive ? 'text-white font-semibold' : 'text-[#C4C7C5]'}`}>
                      {stage.title}
                    </div>
                    <div className="text-[11px] text-[#9AA0A6] truncate mt-0.5">
                      Stage {stage.id + 1}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA: Launch 3D Canvas button in Google Labs Sky Blue #A8C7FA */}
        <div className="pt-4 border-t border-white/[0.07] shrink-0 space-y-2.5">
          <button
            onClick={onLaunchCanvasModal}
            className="w-full bg-[#A8C7FA] hover:bg-[#BBD4FB] text-[#062E6F] py-2.5 px-4 rounded-full font-label-sm font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          >
            <ExternalLink className="size-3.5" />
            <span>Launch 3D Canvas</span>
          </button>
          <div className="flex items-center justify-between text-[11px] text-[#9AA0A6] px-1">
            <span>Show3D Labs Studio</span>
            <span className="text-[#6DD58C] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6DD58C]" />
              Connected
            </span>
          </div>
        </div>
      </aside>

      {/* 2. Center Viewport: Document/Stage Toolbar + Main Stage Sheet */}
      <section 
        className="flex-1 bg-[#131314] p-6 flex flex-col min-w-0 overflow-y-auto"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Document/Stage Toolbar */}
        <div className="bg-[#1E1F22] px-4 py-2.5 rounded-full border border-white/[0.07] flex items-center justify-between mb-4 shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-xs text-white font-semibold tracking-tight truncate">
              {currentModule.title}
            </span>
            <span className="text-white/20">/</span>
            <span className="text-xs text-[#9AA0A6] hidden sm:inline truncate">
              Stage {slideIndex + 1}: {STAGES[slideIndex]?.title}
            </span>
          </div>

          {/* Center keyboard hints */}
          <div className="hidden md:flex items-center gap-1.5 text-[11px] font-mono-data text-[#9AA0A6]">
            <span>NAV:</span>
            <kbd className="px-2 py-0.5 rounded-full bg-[#131314] border border-white/[0.08] text-[10px] text-[#E3E3E3]">←</kbd>
            <kbd className="px-2 py-0.5 rounded-full bg-[#131314] border border-white/[0.08] text-[10px] text-[#E3E3E3]">→</kbd>
            <span className="mx-1 text-white/20">or</span>
            <kbd className="px-2 py-0.5 rounded-full bg-[#131314] border border-white/[0.08] text-[10px] text-[#E3E3E3]">SPACE</kbd>
          </div>

          {/* Divider and Stage Counter */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-[1px] h-4 bg-white/[0.08]" />
            <span className="font-mono-data text-xs text-[#A8C7FA] font-medium">
              Stage {slideIndex + 1} / 6
            </span>
            <div className="flex items-center gap-1.5">
              <button
                disabled={slideIndex === 0}
                onClick={handlePrev}
                aria-label="Previous Stage"
                className={`p-1.5 rounded-full border border-white/[0.08] transition-colors ${
                  slideIndex > 0 ? 'bg-[#131314] text-white hover:bg-[#282A2E]' : 'opacity-30 cursor-not-allowed text-[#9AA0A6]'
                }`}
              >
                <ArrowLeft className="size-3.5" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next Stage"
                className="p-1.5 rounded-full bg-[#A8C7FA] hover:bg-[#BBD4FB] text-[#062E6F] transition-colors"
              >
                <ArrowRight className="size-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Stage Sheet */}
        <div className="bg-[#1E1F22] border border-white/[0.07] rounded-3xl p-6 sm:p-8 relative shadow-[0_14px_40px_rgba(0,0,0,0.45)] flex-1 flex flex-col justify-between overflow-y-auto">
          {/* Stages 0-2: Visual Concept Slides */}
          {slideIndex < 3 && currentConceptSlide && (
            <div className="w-full flex-1 flex flex-col justify-between space-y-6">
              {/* Header split */}
              <div className="border-b border-white/[0.07] pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
                  <div className="inline-flex items-center gap-2.5">
                    <span className="text-[10px] px-3 py-1 rounded-full bg-[#162238] border border-[#A8C7FA]/25 text-[#A8C7FA] font-mono font-semibold uppercase tracking-wider">
                      {currentConceptSlide.badge}
                    </span>
                    <span className="text-xs text-[#9AA0A6]">
                      Concept {slideIndex + 1} of 3
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-[#9AA0A6]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#6DD58C]" />
                    <span>Self-Guided Experiment</span>
                  </div>
                </div>
                <h1 className="font-h1 text-2xl sm:text-3xl lg:text-4xl font-display font-medium text-white tracking-tight">
                  {currentConceptSlide.title}
                </h1>

                {/* Plain-language abstract with Sky Blue indicator dot */}
                <div className="mt-3 flex items-start gap-2.5 text-[#E3E3E3] font-body-lg text-sm sm:text-base">
                  <span className="w-2 h-2 rounded-full bg-[#A8C7FA] mt-2 shrink-0" />
                  <p className="leading-relaxed text-[#C4C7C5]">
                    {currentConceptSlide.subtitle}
                  </p>
                </div>
              </div>

              {/* Body Grid: Reading text + 2-Column Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start my-auto">
                {/* Reading text */}
                <div className="lg:col-span-7 space-y-3.5 font-body-md text-sm text-[#C4C7C5] leading-relaxed">
                  {currentConceptSlide.paragraphs.map((p, idx) => (
                    <p key={idx} className="whitespace-pre-line">
                      {p}
                    </p>
                  ))}
                </div>

                {/* Key Concept & Pro Tip Cards */}
                <div className="lg:col-span-5 space-y-4">
                  {/* Key Concept Card */}
                  <div className="p-5 rounded-3xl bg-[#131314] border border-white/[0.07]">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#A8C7FA]">
                        KEY CONCEPT
                      </span>
                      <Lightbulb className="size-4 text-[#A8C7FA]" />
                    </div>
                    <h3 className="text-base font-display font-medium text-white mt-1">
                      {currentConceptSlide.keyConcept.term}
                    </h3>
                    <p className="text-xs text-[#9AA0A6] mt-2 leading-relaxed">
                      {currentConceptSlide.keyConcept.definition}
                    </p>
                  </div>

                  {/* Pro Tip Card */}
                  <div className="p-5 rounded-3xl bg-[#131314] border border-white/[0.07]">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#FDD663]">
                        LABS TIP
                      </span>
                      <Sparkles className="size-4 text-[#FDD663]" />
                    </div>
                    <p className="text-xs text-[#C4C7C5] leading-relaxed mt-2">
                      {currentConceptSlide.proTip}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Stage 3: Interactive Co-Design Challenge */}
          {slideIndex === 3 && (
            <div className="w-full flex-1 flex flex-col justify-between space-y-4">
              {/* Header */}
              <div className="border-b border-[#1B1C1E] pb-3">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-semibold uppercase tracking-wider">
                    3D Co-Design Studio
                  </span>
                  <span className="text-xs text-emerald-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Creative Intent: 94%
                  </span>
                </div>
                <h2 className="font-h2 text-xl sm:text-2xl font-display font-medium text-white tracking-tight">
                  Assemble Your 3D Design Recipe
                </h2>
                <p className="font-body-md text-xs sm:text-sm text-on-surface-variant text-[#9A9DA3] mt-1">
                  Select structural tokens to combine with spatial AI. Tune canopy curve and solar array parameters to fit your school courtyard.
                </p>
              </div>

              {/* Analytical Viewport */}
              <div className="relative bg-[#050505] border border-[#232426] rounded-lg h-80 sm:h-96 flex flex-col justify-between p-4 overflow-hidden shadow-inner dot-pattern">
                {/* 60px micro-grid overlay */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-20"
                  style={{
                    backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)`,
                    backgroundSize: '60px 60px',
                  }}
                />

                {/* 4 Corner Reticles */}
                <span className="reticle-tl" />
                <span className="reticle-tr" />
                <span className="reticle-bl" />
                <span className="reticle-br" />

                {/* Top metadata bar */}
                <div className="relative z-10 flex items-center justify-between font-mono-data text-xs">
                  <div className="flex items-center gap-3">
                    <span className="text-secondary font-medium tracking-wider">SYSTEM_HASH // 0x8F22A</span>
                    <span className="text-[#232426]">|</span>
                    <span className="text-[#9A9DA3] text-[11px]">COORD: 34.22 // 11.08</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[#9A9DA3] text-[11px]">SIGNAL_DENSITY // 0.942</span>
                    <span className="px-2 py-0.5 rounded bg-black/60 border border-[#232426] text-secondary text-[10px] flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary shadow-[0_0_8px_#50d8e9] animate-pulse" />
                      PORT_443_SAFE
                    </span>
                  </div>
                </div>

                {/* SVG Architectural Wireframe with Technical Callouts */}
                <div className="relative z-10 flex-1 flex items-center justify-center">
                  <div className="relative w-80 h-64 flex items-center justify-center">
                    {/* Technical Callout: Top Right Solar Array */}
                    <div className="absolute -top-1 -right-6 font-mono-data text-[10px] text-secondary flex items-center gap-1 bg-[#101112]/90 px-2 py-0.5 rounded border border-[#232426] shadow-sm">
                      <span>Δ_SOLAR_ARRAY</span>
                      <span className="text-[#9A9DA3]">{hasSolar ? '450W // ACTV' : 'OFFLINE'}</span>
                    </div>

                    {/* Technical Callout: Left Anchor Sync */}
                    <div className="absolute top-24 -left-8 font-mono-data text-[10px] text-primary flex items-center gap-1 bg-[#101112]/90 px-2 py-0.5 rounded border border-[#232426] shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span>P_SYNC_OK</span>
                      <span className="text-[#9A9DA3]">0.992</span>
                    </div>

                    {/* Technical Callout: Curvature Sagitta */}
                    <div className="absolute bottom-6 -right-6 font-mono-data text-[10px] text-zinc-300 flex items-center gap-1 bg-[#101112]/90 px-2 py-0.5 rounded border border-[#232426] shadow-sm">
                      <span className="text-[#9A9DA3]">CURV_RATIO:</span>
                      <span className="text-secondary">{curvature.toFixed(2)}</span>
                    </div>

                    {/* SVG Wireframe */}
                    <svg viewBox="0 0 400 360" className="w-full h-full transition-all duration-300 drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
                      <defs>
                        <linearGradient id="deckCanopyGradRomer" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor={canopyColor} />
                          <stop offset="100%" stopColor="#131416" />
                        </linearGradient>
                        <linearGradient id="deckSolarGradRomer" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#50d8e9" />
                          <stop offset="100%" stopColor="#1e293b" />
                        </linearGradient>
                      </defs>

                      {/* Ground Foundation Grid */}
                      <ellipse cx="200" cy="270" rx="140" ry="40" fill="none" stroke="#232426" strokeWidth="1" strokeDasharray="3 3" />
                      <path d="M 200 290 L 340 220 L 200 160 L 60 220 Z" fill="#0d0e0f" stroke="#232426" strokeWidth="1" />
                      
                      {/* Technical axis guide lines */}
                      <line x1="200" y1="20" x2="200" y2="320" stroke="#232426" strokeWidth="0.5" strokeDasharray="2 4" />
                      <line x1="40" y1="220" x2="360" y2="220" stroke="#232426" strokeWidth="0.5" strokeDasharray="2 4" />

                      {/* Structural Columns */}
                      <line x1="120" y1="200" x2="120" y2="105" stroke="#454655" strokeWidth="3" strokeLinecap="round" />
                      <line x1="280" y1="200" x2="280" y2="105" stroke="#454655" strokeWidth="3" strokeLinecap="round" />
                      <line x1="200" y1="250" x2="200" y2="135" stroke="#35373b" strokeWidth="3" strokeLinecap="round" />
                      <line x1="200" y1="170" x2="200" y2="70"  stroke="#9A9DA3" strokeWidth="4" strokeLinecap="round" />

                      {/* Tension Cables */}
                      <line x1="120" y1="105" x2="70" y2="135" stroke="#50d8e9" strokeWidth="0.75" opacity="0.6" strokeDasharray="2 2" />
                      <line x1="280" y1="105" x2="330" y2="135" stroke="#50d8e9" strokeWidth="0.75" opacity="0.6" strokeDasharray="2 2" />

                      {/* Parametric Tensile Canopy with dynamic curvature */}
                      <path
                        d={`M 200 ${50 + (1 - curvature) * 20} Q ${290} ${75 + curvature * 20} 330 135 Q 260 170 200 145 Q 140 170 70 135 Q 110 ${75 + curvature * 20} 200 ${50 + (1 - curvature) * 20} Z`}
                        fill="url(#deckCanopyGradRomer)"
                        stroke="#A8C7FA"
                        strokeWidth="1.5"
                        opacity="0.95"
                      />

                      {/* Solar Array on Roof */}
                      {hasSolar && (
                        <path d="M 175 62 L 225 62 L 240 88 L 160 88 Z" fill="url(#deckSolarGradRomer)" stroke="#6DD58C" strokeWidth="1" />
                      )}

                      {/* Center Pivot Reticle */}
                      <circle cx="200" cy="145" r="3" fill="#6DD58C" />
                      <circle cx="200" cy="145" r="7" fill="none" stroke="#6DD58C" strokeWidth="0.5" strokeDasharray="2 2" />
                    </svg>
                  </div>
                </div>

                {/* Viewport Bottom Status Bar */}
                <div className="relative z-10 flex items-center justify-between font-mono-data text-[11px] border-t border-white/[0.08] pt-2 text-[#9AA0A6]">
                  <div className="flex items-center gap-3">
                    <span>KERNEL: WebGL2</span>
                    <span>·</span>
                    <span>LATENCY: 1.2ms</span>
                    <span>·</span>
                    <span>TOKENS_LOADED: {selectedTokens.length}</span>
                  </div>
                  <button
                    onClick={onLaunchCanvasModal}
                    className="text-[#A8C7FA] hover:text-white flex items-center gap-1 transition-colors"
                  >
                    <span>Open in 3D Viewport</span>
                    <ExternalLink className="size-3" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Stage 4: Formative Diagnostic Check */}
          {slideIndex === 4 && currentQuizQuestion && (
            <div className="w-full flex-1 flex flex-col justify-center max-w-3xl mx-auto space-y-6">
              <div className="border-b border-white/[0.08] pb-3.5">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono-data text-[10px] px-3 py-1 rounded-full bg-[#2B2210] text-[#FDD663] border border-[#FDD663]/30 uppercase tracking-widest">
                    LABS CHECK // FORMATIVE_DIAGNOSTIC
                  </span>
                  <span className="font-mono-data text-xs text-[#9AA0A6]">
                    MOE Four Learns: Learn to Inquire
                  </span>
                </div>
                <h2 className="font-h2 text-xl sm:text-2xl font-display font-medium text-white tracking-tight">
                  {currentQuizQuestion.question}
                </h2>
                {currentQuizQuestion.contextNote && (
                  <p className="font-body-md text-xs sm:text-sm text-[#9AA0A6] mt-1.5">
                    {currentQuizQuestion.contextNote}
                  </p>
                )}
              </div>

              {/* Control Queue / Decision Log Options */}
              <div className="space-y-3">
                {currentQuizQuestion.options.map((option) => {
                  const isSelected = selectedOptionId === option.id;
                  const isCorrect = option.isCorrect;
                  const showResult = isQuizSubmitted && isSelected;
                  const optTag = `OPT_${option.id.toUpperCase()}`;

                  return (
                    <button
                      key={option.id}
                      onClick={() => {
                        setSelectedOptionId(option.id);
                        setIsQuizSubmitted(true);
                      }}
                      className={`w-full p-4 rounded-2xl border text-left transition-all duration-150 flex flex-col gap-2 ${
                        showResult && isCorrect
                          ? 'bg-[#13281C] border-[#6DD58C]/50 text-white'
                          : showResult && !isCorrect
                          ? 'bg-[#2E1717] border-[#FFB4AB]/50 text-white'
                          : isSelected
                          ? 'bg-[#162238] border-[#A8C7FA]/50 text-white'
                          : 'bg-[#131314] border-white/[0.07] hover:border-white/[0.16] text-[#E3E3E3]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="font-mono-data text-xs px-2.5 py-0.5 rounded-full bg-[#1E1F22] border border-white/[0.08] text-[#9AA0A6] font-semibold">
                            {optTag}
                          </span>
                          <span className="font-body-md text-sm font-medium text-white">
                            {option.text}
                          </span>
                        </div>

                        {/* Instant Telemetry Feedback */}
                        {showResult && (
                          <span className={`font-mono-data text-[11px] px-3 py-0.5 rounded-full uppercase tracking-wider font-semibold flex items-center gap-1 ${
                            isCorrect
                              ? 'bg-[#6DD58C]/20 text-[#6DD58C] border border-[#6DD58C]/40'
                              : 'bg-[#FFB4AB]/20 text-[#FFB4AB] border border-[#FFB4AB]/40'
                          }`}>
                            {isCorrect ? (
                              <>
                                <CheckCircle2 className="size-3 text-[#6DD58C]" />
                                <span>TARGET_MET</span>
                              </>
                            ) : (
                              <>
                                <XCircle className="size-3 text-[#FFB4AB]" />
                                <span>REVIEW_NEEDED</span>
                              </>
                            )}
                          </span>
                        )}
                      </div>

                      {/* Explanatory feedback */}
                      {showResult && (
                        <div className={`mt-2 pt-2 border-t font-body-md text-xs leading-relaxed ${
                          isCorrect
                            ? 'border-[#6DD58C]/20 text-[#C4EDD0]'
                            : 'border-[#FFB4AB]/20 text-[#FFDAD6]'
                        }`}>
                          <span className="font-mono-data font-bold uppercase mr-1">
                            {isCorrect ? 'VALIDATION NOTE:' : 'DIAGNOSTIC ADVISORY:'}
                          </span>
                          {option.explanation}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Stage 5: Digital Competency Badge & Scorecard */}
          {slideIndex === 5 && (
            <div className="max-w-3xl w-full mx-auto space-y-6 my-auto">
              {/* Document Header Bar */}
              <div className="border-b border-white/[0.08] pb-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="font-mono-data text-[10px] text-[#6DD58C] uppercase tracking-widest flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#6DD58C]" />
                    GRADUATED EXPERIMENT // MOE MASTERPLAN 2030
                  </div>
                  <h2 className="font-h2 text-xl sm:text-2xl font-display font-medium text-white tracking-tight mt-1">
                    {currentModule.badgeName} Verified
                  </h2>
                </div>
                <div className="font-mono-data text-right text-xs text-[#9AA0A6]">
                  <div>DOC_ID: REP-MOE-2026-M0{activeModuleId}.pdf</div>
                  <div className="text-[#6DD58C] font-semibold">STATUS: CRITERIA_MET</div>
                </div>
              </div>

              {/* Telemetry Scorecard Card: 94.0% Human Creative Intent */}
              <div className="bg-[#131314] border border-white/[0.08] rounded-3xl p-6 relative">
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                  {/* Left Score: 94.0% in font-h2 */}
                  <div className="sm:col-span-5 text-center sm:text-left sm:border-r sm:border-white/[0.08] sm:pr-6">
                    <div className="font-mono-data text-[10px] uppercase tracking-widest text-[#9AA0A6]">
                      AUTHENTIC HUMAN INTENT
                    </div>
                    <div className="font-h2 text-4xl sm:text-5xl font-display font-medium text-white tracking-tight mt-1">
                      94.0%
                    </div>
                    <div className="font-mono-data text-xs text-[#6DD58C] mt-1.5 flex items-center justify-center sm:justify-start gap-1">
                      <Check className="size-3.5" />
                      <span>Anti-Offloading Audit: PASS</span>
                    </div>
                  </div>

                  {/* Right Metrics Grid */}
                  <div className="sm:col-span-7 grid grid-cols-2 gap-3">
                    <div className="bg-[#1E1F22] p-3 rounded-2xl border border-white/[0.07]">
                      <div className="font-mono-data text-[10px] text-[#9AA0A6]">SYNTACTIC_RIGOR</div>
                      <div className="font-mono-data text-sm font-semibold text-white mt-0.5">96.2%</div>
                      <div className="h-1 bg-[#131314] rounded-full overflow-hidden mt-1.5">
                        <div className="h-full bg-[#6DD58C] rounded-full" style={{ width: '96.2%' }} />
                      </div>
                    </div>
                    <div className="bg-[#1E1F22] p-3 rounded-2xl border border-white/[0.07]">
                      <div className="font-mono-data text-[10px] text-[#9AA0A6]">ITERATION_DEPTH</div>
                      <div className="font-mono-data text-sm font-semibold text-white mt-0.5">8 CYCLES // PASS</div>
                      <div className="h-1 bg-[#131314] rounded-full overflow-hidden mt-1.5">
                        <div className="h-full bg-[#A8C7FA] rounded-full" style={{ width: '88%' }} />
                      </div>
                    </div>
                    <div className="bg-[#1E1F22] p-3 rounded-2xl border border-white/[0.07]">
                      <div className="font-mono-data text-[10px] text-[#9AA0A6]">PORT_443_SAFE</div>
                      <div className="font-mono-data text-sm font-semibold text-[#6DD58C] mt-0.5">VERIFIED_PLD</div>
                      <div className="h-1 bg-[#131314] rounded-full overflow-hidden mt-1.5">
                        <div className="h-full bg-[#6DD58C] rounded-full" style={{ width: '100%' }} />
                      </div>
                    </div>
                    <div className="bg-[#1E1F22] p-3 rounded-2xl border border-white/[0.07]">
                      <div className="font-mono-data text-[10px] text-[#9AA0A6]">CURRICULUM_DELTA</div>
                      <div className="font-mono-data text-sm font-semibold text-white mt-0.5">+34.2% GROWTH</div>
                      <div className="h-1 bg-[#131314] rounded-full overflow-hidden mt-1.5">
                        <div className="h-full bg-[#A8C7FA] rounded-full" style={{ width: '92%' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Module Key Takeaways formatted as Clinical Decision Log */}
              <div className="bg-[#131314] border border-white/[0.08] rounded-3xl p-5">
                <div className="font-mono-data text-[10px] text-[#9AA0A6] uppercase tracking-widest mb-2.5">
                  VERIFIED OUTCOMES // DECISION_LOG
                </div>
                <div className="space-y-2">
                  {lessonData.keyTakeaways.map((takeaway, i) => (
                    <div key={i} className="flex items-start gap-2.5 font-body-md text-xs text-[#E3E3E3]">
                      <span className="font-mono-data text-[10px] text-[#6DD58C] bg-[#13281C] px-2 py-0.5 rounded-full shrink-0 mt-0.5 font-semibold">
                        PASS
                      </span>
                      <span className="leading-snug text-[#C4C7C5]">{takeaway}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions Bar: Verify & Export PDF trigger in Google Labs Sky Blue #A8C7FA */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  onClick={onOpenCertificateModal}
                  className="bg-[#A8C7FA] hover:bg-[#BBD4FB] text-[#062E6F] px-5 py-2.5 rounded-full font-label-sm font-semibold flex items-center gap-2 transition-all active:scale-[0.98]"
                >
                  <Award className="size-4" />
                  <span>Verify & Export PDF</span>
                </button>

                {activeModuleId < 6 ? (
                  <button
                    onClick={() => onSelectModule(activeModuleId + 1)}
                    className="bg-[#282A2E] hover:bg-[#33363B] text-white border border-white/[0.08] px-5 py-2.5 rounded-full font-label-sm flex items-center gap-2 transition-all"
                  >
                    <span>Next Module: M0{activeModuleId + 1}</span>
                    <ArrowRight className="size-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => onSelectModule(1)}
                    className="bg-[#282A2E] hover:bg-[#33363B] text-white border border-white/[0.08] px-5 py-2.5 rounded-full font-label-sm flex items-center gap-2 transition-all"
                  >
                    <RotateCcw className="size-3.5" />
                    <span>Review from Module 1</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Bottom Slide Controller Bar */}
          <div className="pt-4 border-t border-white/[0.07] mt-6 flex items-center justify-between shrink-0">
            <button
              disabled={slideIndex === 0}
              onClick={handlePrev}
              className={`px-4 py-2 rounded-full font-label-sm transition-all flex items-center gap-1.5 ${
                slideIndex > 0
                  ? 'bg-[#131314] hover:bg-[#282A2E] text-[#E3E3E3] border border-white/[0.08]'
                  : 'text-[#9AA0A6] opacity-30 cursor-not-allowed border border-transparent'
              }`}
            >
              <ArrowLeft className="size-3.5" />
              <span>Previous</span>
            </button>

            <div className="font-mono-data text-[11px] text-[#9AA0A6] hidden sm:block">
              Use Arrow Keys or Space to navigate stages
            </div>

            <button
              onClick={handleNext}
              className="px-5 py-2 rounded-full bg-[#A8C7FA] hover:bg-[#BBD4FB] text-[#062E6F] font-label-sm font-semibold flex items-center gap-1.5 transition-all active:scale-[0.98]"
            >
              <span>{slideIndex === 5 ? (activeModuleId < 6 ? 'Next Module' : 'Complete') : 'Next Stage'}</span>
              <ArrowRight className="size-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. Right Configuration & Telemetry Panel */}
      <aside className="w-80 shrink-0 bg-[#1A1B1E] border-l border-white/[0.07] flex flex-col justify-between p-4 select-none overflow-y-auto">
        {slideIndex === 3 ? (
          /* Co-Design Stage (Stage 3): PARTS prompt recipe tokens, Curvature & Reflectivity levers, Solar toggle */
          <div className="space-y-4">
            <div className="font-mono-data text-[10px] uppercase tracking-widest text-[#9AA0A6] border-b border-white/[0.07] pb-2">
              CONFIGURATION // CO-DESIGN CONTROLS
            </div>

            {/* PARTS Prompt Recipe Tokens */}
            <div className="space-y-3">
              <div className="text-xs font-semibold text-white flex items-center justify-between">
                <span>PARTS Prompt Recipe Tokens</span>
                <span className="font-mono-data text-[10px] text-[#6DD58C]">{selectedTokens.length} active</span>
              </div>

              {/* Selected tokens summary */}
              <div className="bg-[#131314] border border-white/[0.07] rounded-2xl p-3 space-y-2">
                <div className="font-mono-data text-[10px] text-[#9AA0A6] uppercase">Active Prompt Tokens:</div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedTokens.map((id) => {
                    const item = DEFAULT_INGREDIENTS.find((i) => i.id === id);
                    if (!item) return null;
                    return (
                      <span
                        key={item.id}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#1E1F22] text-white border border-white/[0.08] text-xs font-mono-data"
                      >
                        <item.icon className="size-3 text-[#A8C7FA]" />
                        <span className="truncate max-w-[120px]">{item.label}</span>
                        <button
                          onClick={() => handleToggleToken(item.id)}
                          className="text-[#9AA0A6] hover:text-white transition-colors ml-0.5"
                          aria-label={`Remove token ${item.label}`}
                        >
                          <X className="size-3" />
                        </button>
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Available Tokens list */}
              <div className="space-y-1.5">
                <div className="font-mono-data text-[10px] text-[#9AA0A6] uppercase">Data Source Tokens:</div>
                <div className="bg-[#131314] border border-white/[0.07] rounded-2xl overflow-hidden divide-y divide-white/[0.06]">
                  {DEFAULT_INGREDIENTS.map((item) => {
                    const isChecked = selectedTokens.includes(item.id);
                    return (
                      <div
                        key={item.id}
                        onClick={() => handleToggleToken(item.id)}
                        className="p-2.5 flex items-center justify-between cursor-pointer hover:bg-[#1E1F22] transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <item.icon className={`size-3.5 ${isChecked ? 'text-[#6DD58C]' : 'text-[#9AA0A6]'}`} />
                          <span className="text-xs text-[#E3E3E3] leading-none">{item.label}</span>
                        </div>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          readOnly
                          className="accent-[#A8C7FA] size-3.5 rounded-sm cursor-pointer pointer-events-none"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Parametric Levers */}
              <div className="space-y-3 pt-2 border-t border-white/[0.07]">
                {/* Reflectivity swatch lever */}
                <div className="bg-[#131314] border border-white/[0.07] rounded-2xl p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-white">Reflectivity Finish</span>
                    <span className="font-mono-data text-[10px] text-[#9AA0A6]">Albedo Pigment</span>
                  </div>
                  <div className="flex items-center justify-between gap-1">
                    {['#38bdf8', '#ffffff', '#10b981', '#f59e0b'].map((hex) => (
                      <button
                        key={hex}
                        onClick={() => {
                          const result = setCanopySwatch(canopyColor, hex);
                          setCanopyColor(result.canopyColor);
                        }}
                        style={{ backgroundColor: hex }}
                        aria-label={`Select pigment ${hex}`}
                        className={`size-6 rounded-full border-2 transition-all ${
                          canopyColor === hex ? 'border-white scale-110' : 'border-transparent opacity-70 hover:opacity-100'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Curvature ratio lever */}
                <div className="bg-[#131314] border border-white/[0.07] rounded-2xl p-3">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-semibold text-white">Canopy Curvature</span>
                    <span className="font-mono-data text-xs text-[#A8C7FA]">{curvature.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={curvature}
                    onChange={(e) => setCurvature(setCanopyCurvature(parseFloat(e.target.value)))}
                    className="w-full accent-[#A8C7FA] cursor-pointer"
                  />
                  <div className="flex justify-between font-mono-data text-[9px] text-[#9AA0A6] mt-1">
                    <span>FLAT (0.00)</span>
                    <span>PARABOLIC (1.00)</span>
                  </div>
                </div>

                {/* 450W Solar Array Toggle */}
                <div className="bg-[#131314] rounded-2xl p-3 border border-white/[0.07] flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-white">450W Solar Array</div>
                    <div className="font-mono-data text-[10px] text-[#9AA0A6]">Renewable micro-grid</div>
                  </div>
                  <button
                    onClick={() => {
                      const result = toggleSolarArray(hasSolar);
                      setHasSolar(result.hasSolar);
                    }}
                    className={`w-10 h-5 rounded-full p-0.5 transition-colors cursor-pointer ${
                      hasSolar ? 'bg-[#6DD58C]' : 'bg-[#282A2E]'
                    }`}
                  >
                    <div
                      className={`size-4 rounded-full bg-[#131314] transform transition-transform duration-200 ${
                        hasSolar ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Concept / Quiz / Badge Slides: Module telemetry, active learning objectives, slide navigation */
          <div className="space-y-5">
            <div className="font-mono-data text-[10px] uppercase tracking-widest text-[#9AA0A6] border-b border-white/[0.07] pb-2">
              TELEMETRY // LIVE STREAM
            </div>

            {/* Module Telemetry Blocks */}
            <div className="space-y-2.5">
              {/* NODE_DENSITY */}
              <div className="bg-[#131314] border border-white/[0.07] rounded-2xl p-3">
                <div className="flex items-center justify-between text-[#9AA0A6] text-[10px] font-mono-data">
                  <span>NODE_DENSITY</span>
                  <span className="text-[#6DD58C] font-semibold">OPTIMAL</span>
                </div>
                <div className="font-mono-data text-sm font-semibold text-white mt-1">
                  34.8 kPts/m³
                </div>
                <div className="h-1 bg-[#1E1F22] rounded-full overflow-hidden mt-2">
                  <div className="h-full bg-[#6DD58C] rounded-full" style={{ width: '74%' }} />
                </div>
              </div>

              {/* INTENT_SCORE */}
              <div className="bg-[#131314] border border-white/[0.07] rounded-2xl p-3">
                <div className="flex items-center justify-between text-[#9AA0A6] text-[10px] font-mono-data">
                  <span>INTENT_SCORE</span>
                  <span className="w-2 h-2 rounded-full bg-[#6DD58C]" />
                </div>
                <div className="font-mono-data text-sm font-semibold text-[#6DD58C] mt-1">
                  0.942 // OPTIMAL
                </div>
                <div className="h-1 bg-[#1E1F22] rounded-full overflow-hidden mt-2">
                  <div className="h-full bg-[#6DD58C] rounded-full" style={{ width: '94.2%' }} />
                </div>
              </div>

              {/* SYNC_RATE */}
              <div className="bg-[#131314] border border-white/[0.07] rounded-2xl p-3">
                <div className="flex items-center justify-between text-[#9AA0A6] text-[10px] font-mono-data">
                  <span>SYNC_RATE</span>
                  <span className="text-[#A8C7FA] font-semibold">99.2%</span>
                </div>
                <div className="font-mono-data text-sm font-semibold text-white mt-1">
                  0.992 // OK
                </div>
                <div className="h-1 bg-[#1E1F22] rounded-full overflow-hidden mt-2">
                  <div className="h-full bg-[#A8C7FA] rounded-full" style={{ width: '99.2%' }} />
                </div>
              </div>
            </div>

            {/* Active Learning Objectives Checklist */}
            <div className="space-y-2 pt-2 border-t border-white/[0.07]">
              <div className="font-mono-data text-[10px] uppercase tracking-widest text-[#9AA0A6]">
                ACTIVE LEARNING OBJECTIVES
              </div>
              <div className="space-y-1.5 text-xs text-[#E3E3E3]">
                {[
                  'Spatial coordinate reasoning',
                  'Tropical passive shade geometry',
                  'Parametric material trade-offs',
                  'Anti-cognitive offloading audit',
                ].map((obj, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 rounded-xl bg-[#131314] border border-white/[0.07]">
                    <Check className="size-3.5 text-[#6DD58C] shrink-0" />
                    <span className="truncate text-[#C4C7C5]">{obj}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Slide Navigation Controls */}
            <div className="space-y-2 pt-2 border-t border-white/[0.07]">
              <div className="font-mono-data text-[10px] uppercase tracking-widest text-[#9AA0A6]">
                STAGE NAVIGATION CONTROLS
              </div>
              <div className="grid grid-cols-6 gap-1.5">
                {[0, 1, 2, 3, 4, 5].map((idx) => {
                  const isActive = slideIndex === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSlideIndex(idx)}
                      className={`py-1.5 rounded-full font-mono-data text-xs transition-all ${
                        isActive
                          ? 'bg-[#A8C7FA] text-[#062E6F] font-bold'
                          : 'bg-[#131314] border border-white/[0.08] text-[#9AA0A6] hover:text-white hover:bg-[#1E1F22]'
                      }`}
                    >
                      0{idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Footer Actions on Right Panel */}
        <div className="pt-3 border-t border-white/[0.07] space-y-2 shrink-0">
          {slideIndex === 3 ? (
            <>
              <button
                onClick={handleSimulateGeneration}
                disabled={isGenerating}
                className={`w-full py-2.5 px-4 rounded-full font-label-sm flex items-center justify-center gap-1.5 border border-white/[0.08] bg-[#282A2E] hover:bg-[#33363B] text-[#E3E3E3] transition-all ${
                  isGenerating ? 'animate-pulse' : ''
                }`}
              >
                <Sparkles className="size-3.5 text-[#FDD663]" />
                <span>{isGenerating ? 'Synthesizing...' : 'Regenerate'}</span>
              </button>

              <button
                onClick={onLaunchCanvasModal}
                className="w-full bg-[#A8C7FA] hover:bg-[#BBD4FB] text-[#062E6F] py-2.5 px-4 rounded-full font-label-sm font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-[0.98]"
              >
                <ExternalLink className="size-3.5" />
                <span>Try in Show3D Canvas</span>
              </button>
            </>
          ) : (
            <button
              onClick={handleNext}
              className="w-full bg-[#A8C7FA] hover:bg-[#BBD4FB] text-[#062E6F] py-2.5 px-4 rounded-full font-label-sm font-semibold flex items-center gap-1.5 transition-all active:scale-[0.98]"
            >
              <span>{slideIndex === 5 ? (activeModuleId < 6 ? 'Next Module' : 'Complete') : 'Advance Stage'}</span>
              <ArrowRight className="size-3.5" />
            </button>
          )}
        </div>
      </aside>
    </div>
  );
};
