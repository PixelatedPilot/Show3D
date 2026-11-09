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
  INITIAL_CANVAS_STUDIO_STATE,
  setStudioArchetype,
  setStudioShadingMode,
  updateStudioParametricLevers,
  addSpatialCritiquePin,
  computeMeshDiagnostics,
  CanvasModelArchetype,
  ViewportShadingMode,
} from '../../utils/canvasStudioState';
import { ConceptVisualDiagrams } from './ConceptVisualDiagrams';
import { Show3DViewport3D } from '../canvas/Show3DViewport3D';
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Lightbulb,
  Award,
  Check,
  CheckCircle2,
  AlertTriangle,
  Sun,
  Wind,
  Shield,
  Trees,
  Box,
  Layers,
  RotateCcw,
  Sliders,
  Maximize2,
  BookOpen,
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
  partsLetter: string;
  category: 'feature' | 'material' | 'environment';
  label: string;
  promptSnippet: string;
  icon: React.ComponentType<{ className?: string }>;
}

const DEFAULT_INGREDIENTS: PromptIngredient[] = [
  {
    id: 'tensile',
    partsLetter: 'A · T',
    category: 'feature',
    label: 'Tensile Fabric Canopy',
    promptSnippet: 'cantilevered tensile membrane arch',
    icon: Shield,
  },
  {
    id: 'benches',
    partsLetter: 'R · T',
    category: 'material',
    label: 'Modular Timber Benches',
    promptSnippet: 'chamfered teak seating ring (450mm height)',
    icon: Trees,
  },
  {
    id: 'solar',
    partsLetter: 'S',
    category: 'feature',
    label: '450W Solar Roof Array',
    promptSnippet: 'integrated 450W monocrystalline roof louver',
    icon: Sun,
  },
  {
    id: 'airflow',
    partsLetter: 'R · S',
    category: 'environment',
    label: 'Cross-Ventilation Draft Gaps',
    promptSnippet: 'tropical cross-ventilation perimeter channels',
    icon: Wind,
  },
];

const SWATCH_OPTIONS = [
  { hex: '#ffffff', label: 'Ceramic White' },
  { hex: '#38bdf8', label: 'Spatial Cyan' },
  { hex: '#10b981', label: 'Biophilic Emerald' },
  { hex: '#f59e0b', label: 'Solar Amber' },
];

export const StudentKeynoteDeck: React.FC<StudentKeynoteDeckProps> = ({
  eduState,
  onSelectModule,
  onOpenCertificateModal,
  onLaunchCanvasModal,
}) => {
  const activeModuleId = eduState.activeModuleId || 1;
  const currentModule =
    LEARNING_MODULES.find((m) => m.id === activeModuleId) || LEARNING_MODULES[0];
  const lessonData = MODULE_LESSONS[activeModuleId] || MODULE_LESSONS[1];
  const quizData = MODULE_QUIZZES[activeModuleId];

  // Stage in Keynote: 0, 1, 2 = 3 concept slides; 3 = Co-Design Studio; 4 = Formative Check; 5 = Competency Badge
  const [slideIndex, setSlideIndex] = useState<number>(0);

  // Stage 3 Co-Design Local State (preserved invariants for workflowState)
  const [selectedTokens, setSelectedTokens] = useState<string[]>([
    'tensile',
    'benches',
    'solar',
  ]);
  const [canopyColor, setCanopyColor] = useState<string>('#38bdf8');
  const [curvature, setCurvature] = useState<number>(0.65);
  const [hasSolar, setHasSolar] = useState<boolean>(true);
  const [wallThicknessMm, setWallThicknessMm] = useState<number>(2.8);

  // Embedded 3D Viewport Studio State
  const [studioState, setStudioState] = useState(() => ({
    ...updateStudioParametricLevers(INITIAL_CANVAS_STUDIO_STATE, {
      canopyColor: '#38bdf8',
      curvature: 0.65,
      hasSolar: true,
      ribThicknessMm: 2.8,
    }),
    activeTokens: ['tensile', 'benches', 'solar'],
  }));

  // Quiz Local State
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isQuizSubmitted, setIsQuizSubmitted] = useState<boolean>(false);

  // Sync module default archetype when active module changes
  useEffect(() => {
    setSlideIndex(0);
    setSelectedOptionId(null);
    setIsQuizSubmitted(false);
    const defaultArch: CanvasModelArchetype =
      activeModuleId === 1 || activeModuleId === 2
        ? 'primitives'
        : activeModuleId === 5
        ? 'desk_dock'
        : 'pavilion';
    setStudioState((prev) => setStudioArchetype(prev, defaultArch));
  }, [activeModuleId]);

  // Sync parametric levers into studioState
  useEffect(() => {
    setStudioState((prev) => ({
      ...updateStudioParametricLevers(prev, {
        canopyColor,
        curvature,
        hasSolar,
        ribThicknessMm: wallThicknessMm,
      }),
      activeTokens: selectedTokens,
    }));
  }, [canopyColor, curvature, hasSolar, wallThicknessMm, selectedTokens]);

  // Keyboard Navigation (Arrow Keys & Space via handleKeyNavigation)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;
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

  const handleSwatchChange = (hex: string) => {
    setCanopyColor((prev) => setCanopySwatch(prev, hex).canopyColor);
  };

  const handleCurvatureChange = (value: number) => {
    setCurvature(setCanopyCurvature(value));
  };

  const handleSolarToggle = () => {
    setHasSolar((prev) => toggleSolarArray(prev).hasSolar);
  };

  const currentConceptSlide =
    lessonData.slides[slideIndex] || lessonData.slides[0];
  const currentQuizQuestion = quizData?.questions[0];
  const meshDiag = computeMeshDiagnostics(studioState);

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
      shortLabel: '1. Concept I',
      title: lessonData.slides[0]?.title || 'Spatial Foundations',
    },
    {
      id: 1,
      shortLabel: '2. Concept II',
      title: lessonData.slides[1]?.title || 'Structural Systems',
    },
    {
      id: 2,
      shortLabel: '3. Concept III',
      title: lessonData.slides[2]?.title || 'Applied Engineering',
    },
    {
      id: 3,
      shortLabel: '4. 3D Studio',
      title: 'Interactive 3D Co-Design Studio',
    },
    {
      id: 4,
      shortLabel: '5. Quick Check',
      title: 'Formative Diagnostic Check',
    },
    {
      id: 5,
      shortLabel: '6. Mastery Badge',
      title: 'Competency & Authorship Scorecard',
    },
  ];

  // Synthesize live PARTS prompt sentence from active tokens and parameters
  const activeIngredientLabels = DEFAULT_INGREDIENTS.filter((ing) =>
    selectedTokens.includes(ing.id)
  ).map((ing) => ing.promptSnippet);

  const synthesizedPartsPrompt = `"Act as a Sustainable Industrial Designer [P]. Model a ${
    studioState.archetype === 'desk_dock'
      ? 'chamfered ergonomic desk dock'
      : studioState.archetype === 'primitives'
      ? 'multi-primitive architectural study'
      : 'modular courtyard solar pavilion'
  } [A] for a tropical Singapore secondary school [R], featuring ${
    activeIngredientLabels.length > 0
      ? activeIngredientLabels.join(', ')
      : 'clean structural ribs'
  } [T], with ${wallThicknessMm.toFixed(
    1
  )}mm wall thickness and ${(curvature * 100).toFixed(
    0
  )}% arch sagitta curvature [S]."`;

  return (
    <div
      className="flex-1 flex flex-col min-h-[calc(100vh-4rem)] bg-[#000000] text-[#F5F5F7] select-none overflow-y-auto"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 flex-1 flex flex-col gap-5">
        {/* ============================================================
            1. UNIFIED APPLE KEYNOTE TOP BAR (Single Stage & Module Bar)
           ============================================================ */}
        <header className="bg-[#1C1C1E]/90 backdrop-blur-xl border border-white/[0.08] rounded-2xl px-4 py-3 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Left: Module Identity & Pedagogical Tag */}
          <div className="flex items-center gap-3 min-w-0">
            <span className="px-2.5 py-1 rounded-lg bg-[#0A84FF]/15 border border-[#0A84FF]/30 text-[#0A84FF] font-mono text-xs font-semibold shrink-0">
              {currentModule.code}
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-semibold text-[#F5F5F7] tracking-tight truncate">
                  {currentModule.title}
                </h2>
                <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full bg-white/[0.05] text-[11px] text-[#86868B]">
                  {currentModule.duration}
                </span>
              </div>
              <p className="text-xs text-[#86868B] truncate">
                {currentModule.keySkill} · {currentModule.moeLearn}
              </p>
            </div>
          </div>

          {/* Center: 6-Stage Apple Segmented Stepper */}
          <nav
            aria-label="Lesson Stage Stepper"
            className="flex items-center gap-1 bg-[#000000] p-1 rounded-xl border border-white/[0.08] overflow-x-auto"
          >
            {STAGES.map((stage) => {
              const isActive = slideIndex === stage.id;
              const isCompleted = slideIndex > stage.id;
              return (
                <button
                  key={stage.id}
                  onClick={() => setSlideIndex(stage.id)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#2C2C2E] text-[#F5F5F7] shadow-sm border border-white/[0.1]'
                      : isCompleted
                      ? 'text-[#30D158] hover:text-[#F5F5F7] hover:bg-white/[0.04]'
                      : 'text-[#86868B] hover:text-[#F5F5F7] hover:bg-white/[0.04]'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isActive
                        ? 'bg-[#0A84FF]'
                        : isCompleted
                        ? 'bg-[#30D158]'
                        : 'bg-white/20'
                    }`}
                  />
                  <span>{stage.shortLabel}</span>
                </button>
              );
            })}
          </nav>

          {/* Right: Direct 3D Studio Launch */}
          <div className="flex items-center justify-end gap-2 shrink-0">
            <button
              onClick={onLaunchCanvasModal}
              className="px-3.5 py-1.5 rounded-full bg-[#0A84FF] hover:bg-[#0071E3] text-white text-xs font-medium flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
            >
              <Box className="size-3.5" />
              <span>Open Full 3D Studio</span>
            </button>
          </div>
        </header>

        {/* ============================================================
            2. MAIN 16:9 KEYNOTE STAGE SURFACE
           ============================================================ */}
        <main
          key={slideIndex}
          className="flex-1 bg-[#1C1C1E] border border-white/[0.08] rounded-[32px] p-6 sm:p-8 lg:p-10 shadow-[0_24px_60px_rgba(0,0,0,0.65)] flex flex-col justify-between s3d-deck-card-enter"
        >
          {/* ------------------------------------------------------------
              STAGES 0–2: VISUAL CONCEPT SLIDES (With Bespoke SVG Diagrams)
             ------------------------------------------------------------ */}
          {slideIndex < 3 && currentConceptSlide && (
            <div className="flex-1 flex flex-col justify-between gap-8">
              {/* Top Slide Header */}
              <div className="border-b border-white/[0.08] pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1.5">
                  <div className="inline-flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#0A84FF]/15 border border-[#0A84FF]/30 text-[#0A84FF] text-[11px] font-semibold tracking-wide uppercase">
                      {currentConceptSlide.badge}
                    </span>
                    <span className="text-xs text-[#86868B]">
                      Concept Slide {slideIndex + 1} of 3
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-semibold text-[#F5F5F7] tracking-tight">
                    {currentConceptSlide.title}
                  </h1>
                </div>

                {/* Practical Challenge Context Pill */}
                <div className="bg-[#000000]/60 border border-white/[0.08] rounded-2xl px-4 py-2.5 max-w-xs">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[#64D2FF]">
                    Module Challenge Goal
                  </div>
                  <div className="text-xs text-[#F5F5F7] font-medium mt-0.5 line-clamp-2">
                    {currentModule.studentChallenge}
                  </div>
                </div>
              </div>

              {/* 12-Column Apple Keynote Split: Narrative Left + Interactive Visual Right */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch my-auto">
                {/* Left 6 Columns: Narrative Copy + Key Concept & Pro Tip */}
                <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    {/* Lead Subtitle Callout */}
                    <p className="text-base sm:text-lg font-medium text-[#F5F5F7] leading-snug border-l-2 border-[#0A84FF] pl-4">
                      {currentConceptSlide.subtitle}
                    </p>

                    {/* Body Paragraphs */}
                    <div className="space-y-3.5 text-sm sm:text-[15px] text-[#86868B] leading-relaxed">
                      {currentConceptSlide.paragraphs.map((p, idx) => (
                        <p key={idx} className="text-[#F5F5F7]/85">
                          {p}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Unified Key Concept & Designer Pro Tip Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    {/* Key Concept Card */}
                    <div className="p-4 rounded-2xl bg-[#000000]/70 border border-white/[0.08] flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#0A84FF]">
                            KEY CONCEPT
                          </span>
                          <Lightbulb className="size-3.5 text-[#0A84FF]" />
                        </div>
                        <h3 className="text-sm font-semibold text-[#F5F5F7]">
                          {currentConceptSlide.keyConcept.term}
                        </h3>
                        <p className="text-xs text-[#86868B] mt-1.5 leading-relaxed">
                          {currentConceptSlide.keyConcept.definition}
                        </p>
                      </div>
                    </div>

                    {/* Designer Pro Tip Card */}
                    <div className="p-4 rounded-2xl bg-[#000000]/70 border border-white/[0.08] flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#FFD60A]">
                            STUDIO PRO TIP
                          </span>
                          <Sparkles className="size-3.5 text-[#FFD60A]" />
                        </div>
                        <p className="text-xs text-[#F5F5F7]/85 leading-relaxed mt-1">
                          {currentConceptSlide.proTip}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right 6 Columns: Bespoke Interactive SVG Visual Diagram */}
                <div className="lg:col-span-6 flex flex-col">
                  <ConceptVisualDiagrams
                    visualType={currentConceptSlide.visualType}
                    moduleId={activeModuleId}
                    slideId={currentConceptSlide.id}
                  />
                </div>
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------
              STAGE 3: INTERACTIVE 3D CO-DESIGN STUDIO (Real Three.js + PARTS)
             ------------------------------------------------------------ */}
          {slideIndex === 3 && (
            <div className="flex-1 flex flex-col justify-between gap-6">
              {/* Studio Header */}
              <div className="border-b border-white/[0.08] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="inline-flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#0A84FF]/15 border border-[#0A84FF]/30 text-[#0A84FF] text-[11px] font-semibold uppercase tracking-wider">
                      Stage 4 · Spatial Co-Design Studio
                    </span>
                    <span className="text-xs text-[#30D158] font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#30D158]" />
                      Creator Intent: 94.0%
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-display font-semibold text-[#F5F5F7] tracking-tight">
                    Configure Your PARTS Recipe & Inspect Live 3D Geometry
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  {/* Archetype Quick Switcher */}
                  <div className="flex items-center gap-1 bg-[#000000] p-1 rounded-xl border border-white/[0.08]">
                    {(
                      [
                        { id: 'pavilion', label: 'Pavilion' },
                        { id: 'desk_dock', label: 'Desk Dock' },
                        { id: 'primitives', label: 'Primitives' },
                      ] as { id: CanvasModelArchetype; label: string }[]
                    ).map((arch) => (
                      <button
                        key={arch.id}
                        onClick={() =>
                          setStudioState((prev) =>
                            setStudioArchetype(prev, arch.id)
                          )
                        }
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                          studioState.archetype === arch.id
                            ? 'bg-[#0A84FF] text-white'
                            : 'text-[#86868B] hover:text-[#F5F5F7]'
                        }`}
                      >
                        {arch.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 12-Column Split: Left 5 Cols Controls + Right 7 Cols Live Three.js Viewport */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch flex-1">
                {/* Left 5 Columns: PARTS Prompt Recipe & Physical Levers */}
                <div className="lg:col-span-5 flex flex-col justify-between gap-4 bg-[#000000]/60 border border-white/[0.08] rounded-3xl p-5">
                  {/* 1. PARTS Token Toggles */}
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#F5F5F7] flex items-center gap-1.5">
                        <Layers className="size-3.5 text-[#0A84FF]" />
                        <span>1. PARTS Structural Tokens</span>
                      </span>
                      <span className="text-[11px] font-mono text-[#86868B]">
                        {selectedTokens.length} / 4 Active
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {DEFAULT_INGREDIENTS.map((ing) => {
                        const Icon = ing.icon;
                        const isSelected = selectedTokens.includes(ing.id);
                        return (
                          <button
                            key={ing.id}
                            onClick={() => handleToggleToken(ing.id)}
                            className={`p-2.5 rounded-xl border text-left transition-all flex items-start gap-2.5 cursor-pointer ${
                              isSelected
                                ? 'bg-[#0A84FF]/15 border-[#0A84FF]/50 text-[#F5F5F7]'
                                : 'bg-[#1C1C1E] border-white/[0.06] text-[#86868B] hover:text-[#F5F5F7]'
                            }`}
                          >
                            <Icon
                              className={`size-4 mt-0.5 shrink-0 ${
                                isSelected ? 'text-[#0A84FF]' : 'text-[#86868B]'
                              }`}
                            />
                            <div className="min-w-0">
                              <div className="text-xs font-medium leading-tight truncate">
                                {ing.label}
                              </div>
                              <div className="text-[10px] font-mono text-[#64D2FF] mt-0.5">
                                [{ing.partsLetter}]
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 2. Physical Engineering Sliders & Swatches */}
                  <div className="space-y-3.5 pt-3 border-t border-white/[0.08]">
                    <div className="text-xs font-semibold text-[#F5F5F7] flex items-center gap-1.5">
                      <Sliders className="size-3.5 text-[#64D2FF]" />
                      <span>2. Physical & PBR Material Constraints</span>
                    </div>

                    {/* Swatch Picker (Preserves ALLOWED_SWATCHES) */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs text-[#86868B]">
                        Primary Albedo Swatch
                      </span>
                      <div className="flex items-center gap-2">
                        {SWATCH_OPTIONS.map((sw) => (
                          <button
                            key={sw.hex}
                            onClick={() => handleSwatchChange(sw.hex)}
                            title={sw.label}
                            aria-label={`Select swatch ${sw.label}`}
                            className={`w-6 h-6 rounded-full border transition-transform cursor-pointer ${
                              canopyColor === sw.hex
                                ? 'scale-110 ring-2 ring-[#0A84FF] border-white'
                                : 'border-white/20 opacity-75 hover:opacity-100'
                            }`}
                            style={{ backgroundColor: sw.hex }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Arch Curvature Slider */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#86868B]">
                          Canopy Arch Curvature
                        </span>
                        <span className="font-mono text-[#64D2FF]">
                          {(curvature * 100).toFixed(0)}%
                        </span>
                      </div>
                      <input
                        type="range"
                        min={0.1}
                        max={1.0}
                        step={0.05}
                        value={curvature}
                        onChange={(e) =>
                          handleCurvatureChange(parseFloat(e.target.value))
                        }
                        className="w-full accent-[#0A84FF] cursor-pointer"
                      />
                    </div>

                    {/* Wall Thickness Slider with Real Printability Check */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#86868B]">
                          Wall Thickness (FDM Slicer)
                        </span>
                        <span
                          className={`font-mono font-semibold ${
                            wallThicknessMm < 2.0
                              ? 'text-[#FFD60A]'
                              : 'text-[#30D158]'
                          }`}
                        >
                          {wallThicknessMm.toFixed(1)} mm{' '}
                          {wallThicknessMm < 2.0 ? '(Thin Wall!)' : '(Printable)'}
                        </span>
                      </div>
                      <input
                        type="range"
                        min={1.2}
                        max={5.0}
                        step={0.2}
                        value={wallThicknessMm}
                        onChange={(e) =>
                          setWallThicknessMm(parseFloat(e.target.value))
                        }
                        className="w-full accent-[#0A84FF] cursor-pointer"
                      />
                    </div>

                    {/* Solar Array Toggle */}
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-xs text-[#86868B]">
                        450W Monocrystalline Roof Array
                      </span>
                      <button
                        onClick={handleSolarToggle}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                          hasSolar
                            ? 'bg-[#30D158]/20 text-[#30D158] border border-[#30D158]/40'
                            : 'bg-[#2C2C2E] text-[#86868B] border border-white/[0.08]'
                        }`}
                      >
                        {hasSolar ? 'Active (450W)' : 'Disabled'}
                      </button>
                    </div>
                  </div>

                  {/* 3. Live Synthesized PARTS Prompt Box */}
                  <div className="p-3.5 rounded-2xl bg-[#1C1C1E] border border-white/[0.08] space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-[#0A84FF]">
                      <span>Synthesized PARTS Prompt</span>
                      <span>{meshDiag.triangleCount} Tris</span>
                    </div>
                    <p className="text-xs text-[#F5F5F7]/90 font-mono leading-relaxed">
                      {synthesizedPartsPrompt}
                    </p>
                  </div>
                </div>

                {/* Right 7 Columns: Real Interactive Three.js WebGL Viewport */}
                <div className="lg:col-span-7 flex flex-col gap-3 min-h-[380px]">
                  {/* Viewport Mode & Camera Toolbar */}
                  <div className="flex flex-wrap items-center justify-between gap-2 bg-[#000000]/70 border border-white/[0.08] rounded-2xl px-3.5 py-2">
                    <div className="flex items-center gap-1 overflow-x-auto">
                      {(
                        [
                          { id: 'pbr', label: 'PBR Studio' },
                          { id: 'wireframe', label: 'Wireframe' },
                          { id: 'clay', label: 'Clay' },
                          { id: 'stress_wall_thickness', label: 'Wall Stress' },
                          { id: 'slicer_layers', label: 'Slicer Layers' },
                        ] as { id: ViewportShadingMode; label: string }[]
                      ).map((mode) => (
                        <button
                          key={mode.id}
                          onClick={() =>
                            setStudioState((prev) =>
                              setStudioShadingMode(prev, mode.id)
                            )
                          }
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${
                            studioState.shadingMode === mode.id
                              ? 'bg-[#0A84FF] text-white'
                              : 'text-[#86868B] hover:text-[#F5F5F7]'
                          }`}
                        >
                          {mode.label}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={onLaunchCanvasModal}
                      className="text-xs text-[#64D2FF] hover:text-white font-medium flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Maximize2 className="size-3.5" />
                      <span>Full Studio</span>
                    </button>
                  </div>

                  {/* Interactive Three.js Canvas */}
                  <div className="flex-1 relative rounded-3xl overflow-hidden border border-white/[0.08] min-h-[340px]">
                    <Show3DViewport3D
                      studioState={studioState}
                      compact
                      onAddPinAtPoint={(pos) =>
                        setStudioState((prev) =>
                          addSpatialCritiquePin(prev, {
                            label: 'Student Self-Check',
                            author: 'Student Designer',
                            category: 'structural',
                            position: pos,
                            comment: `Verified ${wallThicknessMm.toFixed(1)}mm wall ribs`,
                          })
                        )
                      }
                      onExpandFullStudio={onLaunchCanvasModal}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------
              STAGE 4: FORMATIVE DIAGNOSTIC CHECK
             ------------------------------------------------------------ */}
          {slideIndex === 4 && currentQuizQuestion && (
            <div className="max-w-3xl w-full mx-auto my-auto space-y-6 py-4">
              <div className="border-b border-white/[0.08] pb-4 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#FFD60A]/15 border border-[#FFD60A]/30 text-[#FFD60A] text-xs font-semibold uppercase tracking-wide">
                    Stage 5 · Formative Diagnostic Check
                  </span>
                  <span className="text-xs text-[#86868B] font-mono">
                    {currentModule.moeLearn}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-display font-semibold text-[#F5F5F7] tracking-tight">
                  {currentQuizQuestion.question}
                </h2>
                {currentQuizQuestion.contextNote && (
                  <p className="text-sm text-[#86868B] leading-relaxed">
                    {currentQuizQuestion.contextNote}
                  </p>
                )}
              </div>

              {/* Quiz Choices */}
              <div className="space-y-3">
                {currentQuizQuestion.options.map((option) => {
                  const isSelected = selectedOptionId === option.id;
                  const isCorrect = option.isCorrect;
                  const showResult = isQuizSubmitted && isSelected;

                  return (
                    <button
                      key={option.id}
                      onClick={() => {
                        setSelectedOptionId(option.id);
                        setIsQuizSubmitted(true);
                      }}
                      className={`w-full p-5 rounded-2xl border text-left transition-all flex flex-col gap-2.5 cursor-pointer ${
                        showResult && isCorrect
                          ? 'bg-[#30D158]/10 border-[#30D158]/50 text-[#F5F5F7]'
                          : showResult && !isCorrect
                          ? 'bg-[#FFD60A]/10 border-[#FFD60A]/50 text-[#F5F5F7]'
                          : isSelected
                          ? 'bg-[#0A84FF]/15 border-[#0A84FF]/50 text-[#F5F5F7]'
                          : 'bg-[#000000]/60 border-white/[0.08] hover:border-white/[0.2] text-[#F5F5F7]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3.5">
                          <span
                            className={`w-7 h-7 rounded-full text-xs font-mono font-bold flex items-center justify-center shrink-0 ${
                              showResult && isCorrect
                                ? 'bg-[#30D158] text-black'
                                : showResult && !isCorrect
                                ? 'bg-[#FFD60A] text-black'
                                : 'bg-[#2C2C2E] text-[#F5F5F7]'
                            }`}
                          >
                            {option.id.toUpperCase()}
                          </span>
                          <span className="text-sm sm:text-base font-medium text-[#F5F5F7]">
                            {option.text}
                          </span>
                        </div>

                        {showResult && (
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 shrink-0 ${
                              isCorrect
                                ? 'bg-[#30D158]/20 text-[#30D158]'
                                : 'bg-[#FFD60A]/20 text-[#FFD60A]'
                            }`}
                          >
                            {isCorrect ? (
                              <>
                                <CheckCircle2 className="size-3.5" />
                                <span>Verified</span>
                              </>
                            ) : (
                              <>
                                <AlertTriangle className="size-3.5" />
                                <span>Review Concept</span>
                              </>
                            )}
                          </span>
                        )}
                      </div>

                      {showResult && (
                        <div
                          className={`pt-2.5 border-t text-xs sm:text-sm leading-relaxed ${
                            isCorrect
                              ? 'border-[#30D158]/25 text-[#F5F5F7]/90'
                              : 'border-[#FFD60A]/25 text-[#F5F5F7]/90'
                          }`}
                        >
                          <span className="font-semibold mr-1.5">
                            {isCorrect
                              ? 'Engineering Rationale:'
                              : 'Design Coaching Note:'}
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

          {/* ------------------------------------------------------------
              STAGE 5: DIGITAL COMPETENCY BADGE & CREATOR SCORECARD
             ------------------------------------------------------------ */}
          {slideIndex === 5 && (
            <div className="max-w-4xl w-full mx-auto my-auto space-y-6 py-2">
              {/* Top Mastery Header */}
              <div className="border-b border-white/[0.08] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#30D158] uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-[#30D158]" />
                    <span>Module Competency Verified · MOE EdTech Masterplan 2030</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-display font-semibold text-[#F5F5F7] tracking-tight mt-1">
                    {currentModule.badgeName}
                  </h2>
                </div>
                <div className="text-xs font-mono text-[#86868B] sm:text-right">
                  <div>CREDENTIAL: SHOW3D-M0{activeModuleId}-2026</div>
                  <div className="text-[#30D158] font-semibold">
                    STATUS: PORTFOLIO READY
                  </div>
                </div>
              </div>

              {/* Creator Ownership Scorecard */}
              <div className="bg-[#000000]/70 border border-white/[0.08] rounded-3xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-5 md:border-r md:border-white/[0.08] md:pr-6 space-y-1.5">
                    <div className="text-xs font-mono uppercase tracking-wider text-[#86868B]">
                      Authentic Human Authorship
                    </div>
                    <div className="text-4xl sm:text-5xl font-display font-semibold text-[#F5F5F7] tracking-tight">
                      94.0%
                    </div>
                    <div className="text-xs text-[#30D158] flex items-center gap-1.5 font-medium pt-1">
                      <Check className="size-4" />
                      <span>Anti-Cognitive-Offloading Audit: Passed</span>
                    </div>
                    <p className="text-xs text-[#86868B] leading-relaxed pt-1">
                      AI generated the initial base mesh; you directed the PARTS
                      constraints, curvature, and physical wall thickness.
                    </p>
                  </div>

                  <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="bg-[#1C1C1E] p-4 rounded-2xl border border-white/[0.07]">
                      <div className="text-[11px] font-mono text-[#86868B]">
                        PARTS PROMPT PRECISION
                      </div>
                      <div className="text-base font-semibold text-[#F5F5F7] mt-0.5">
                        96.2% Syntactic Rigor
                      </div>
                      <div className="h-1.5 bg-black rounded-full overflow-hidden mt-2">
                        <div
                          className="h-full bg-[#30D158] rounded-full"
                          style={{ width: '96.2%' }}
                        />
                      </div>
                    </div>

                    <div className="bg-[#1C1C1E] p-4 rounded-2xl border border-white/[0.07]">
                      <div className="text-[11px] font-mono text-[#86868B]">
                        SPATIAL ITERATION DEPTH
                      </div>
                      <div className="text-base font-semibold text-[#F5F5F7] mt-0.5">
                        8 Parametric Cycles
                      </div>
                      <div className="h-1.5 bg-black rounded-full overflow-hidden mt-2">
                        <div
                          className="h-full bg-[#0A84FF] rounded-full"
                          style={{ width: '88%' }}
                        />
                      </div>
                    </div>

                    <div className="bg-[#1C1C1E] p-4 rounded-2xl border border-white/[0.07]">
                      <div className="text-[11px] font-mono text-[#86868B]">
                        PHYSICAL PRINTABILITY
                      </div>
                      <div className="text-base font-semibold text-[#30D158] mt-0.5">
                        {wallThicknessMm.toFixed(1)}mm Manifold Pass
                      </div>
                      <div className="h-1.5 bg-black rounded-full overflow-hidden mt-2">
                        <div
                          className="h-full bg-[#30D158] rounded-full"
                          style={{ width: '100%' }}
                        />
                      </div>
                    </div>

                    <div className="bg-[#1C1C1E] p-4 rounded-2xl border border-white/[0.07]">
                      <div className="text-[11px] font-mono text-[#86868B]">
                        PRE → POST GROWTH
                      </div>
                      <div className="text-base font-semibold text-[#64D2FF] mt-0.5">
                        +34.2% Spatial Mastery
                      </div>
                      <div className="h-1.5 bg-black rounded-full overflow-hidden mt-2">
                        <div
                          className="h-full bg-[#64D2FF] rounded-full"
                          style={{ width: '92%' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Takeaways List */}
              <div className="bg-[#000000]/60 border border-white/[0.08] rounded-3xl p-5 space-y-3">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#86868B] flex items-center gap-2">
                  <BookOpen className="size-3.5 text-[#0A84FF]" />
                  <span>Verified Module Takeaways ({currentModule.code})</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {lessonData.keyTakeaways.map((takeaway, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-2xl bg-[#1C1C1E] border border-white/[0.06] flex items-start gap-2.5 text-xs text-[#F5F5F7]/90 leading-relaxed"
                    >
                      <span className="px-2 py-0.5 rounded-full bg-[#30D158]/15 text-[#30D158] font-mono text-[10px] font-semibold shrink-0 mt-0.5">
                        0{i + 1}
                      </span>
                      <span>{takeaway}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={onOpenCertificateModal}
                    className="bg-[#0A84FF] hover:bg-[#0071E3] text-white px-5 py-2.5 rounded-full text-xs font-semibold flex items-center gap-2 transition-all shadow-sm cursor-pointer"
                  >
                    <Award className="size-4" />
                    <span>Verify & Export Certificate</span>
                  </button>
                  <button
                    onClick={onLaunchCanvasModal}
                    className="bg-[#2C2C2E] hover:bg-[#3A3A3C] text-[#F5F5F7] border border-white/[0.08] px-4 py-2.5 rounded-full text-xs font-medium flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <Box className="size-3.5 text-[#64D2FF]" />
                    <span>Export STL / GLTF in 3D Studio</span>
                  </button>
                </div>

                {activeModuleId < 6 ? (
                  <button
                    onClick={() => onSelectModule(activeModuleId + 1)}
                    className="bg-[#30D158] hover:bg-[#28B84C] text-black px-5 py-2.5 rounded-full text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <span>Next Module: M0{activeModuleId + 1}</span>
                    <ArrowRight className="size-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => onSelectModule(1)}
                    className="bg-[#2C2C2E] hover:bg-[#3A3A3C] text-[#F5F5F7] border border-white/[0.08] px-5 py-2.5 rounded-full text-xs font-medium flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <RotateCcw className="size-3.5" />
                    <span>Review from Module 1</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* ============================================================
              3. BOTTOM KEYNOTE CONTROLLER BAR
             ============================================================ */}
          <footer className="pt-5 border-t border-white/[0.08] mt-6 flex items-center justify-between shrink-0">
            <button
              disabled={slideIndex === 0}
              onClick={handlePrev}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                slideIndex > 0
                  ? 'bg-[#2C2C2E] hover:bg-[#3A3A3C] text-[#F5F5F7] border border-white/[0.08] cursor-pointer'
                  : 'text-[#86868B] opacity-30 cursor-not-allowed'
              }`}
            >
              <ArrowLeft className="size-3.5" />
              <span>Previous Stage</span>
            </button>

            <div className="hidden sm:flex items-center gap-2 text-xs text-[#86868B]">
              <span>Stage {slideIndex + 1} of 6</span>
              <span>·</span>
              <span className="font-mono text-[11px]">
                Press ← → or Space to navigate
              </span>
            </div>

            <button
              onClick={handleNext}
              className="px-5 py-2 rounded-full bg-[#0A84FF] hover:bg-[#0071E3] text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
            >
              <span>
                {slideIndex === 5
                  ? activeModuleId < 6
                    ? `Next Module (M0${activeModuleId + 1})`
                    : 'Completed'
                  : 'Next Stage'}
              </span>
              <ArrowRight className="size-3.5" />
            </button>
          </footer>
        </main>
      </div>
    </div>
  );
};
