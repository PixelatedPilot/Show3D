import React, { useState } from 'react';
import { EduState, EduStage, CameraViewPreset } from '../../types';
import { LEARNING_MODULES, MODULE_QUIZZES } from '../../store/appStore';
import { MODULE_LESSONS } from '../../data/moduleLessons';
import { SplineViewportMock } from '../studio/SplineViewportMock';
import { 
  ArrowRight, 
  ArrowLeft,
  Check, 
  RotateCcw,
  Sun,
  Layers,
  Award,
  Download,
  Eye,
  CheckCircle2,
  XCircle,
  Sparkles,
  BookOpen,
  Lightbulb,
  Compass,
  Star,
  ChevronRight,
  ShieldCheck,
  Maximize2,
  Sliders
} from 'lucide-react';

interface ModuleStepFlowProps {
  eduState: EduState;
  onUpdateEduState: (updates: Partial<EduState>) => void;
  onTriggerGenerate: () => void;
  onOpenCertificateModal: () => void;
  onSelectModule: (id: number) => void;
  onRecordQuizScore: (moduleId: number, score: number) => void;
  onOpenStudio?: () => void;
}

export const ModuleStepFlow: React.FC<ModuleStepFlowProps> = ({
  eduState,
  onUpdateEduState,
  onTriggerGenerate,
  onOpenCertificateModal,
  onSelectModule,
  onRecordQuizScore,
  onOpenStudio,
}) => {
  const activeModuleId = eduState.activeModuleId || 1;
  const currentModule = LEARNING_MODULES.find((m) => m.id === activeModuleId) || LEARNING_MODULES[0];
  const lessonData = MODULE_LESSONS[activeModuleId] || MODULE_LESSONS[1];
  const quizData = MODULE_QUIZZES[activeModuleId];
  const currentStage = eduState.currentStage || 'mission';

  // Sub-slide tracker for Stage 1 (Interactive Lesson Slides)
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);

  // Local state for Stage 2 recipe blocks (Module 2)
  const [selectedDevice, setSelectedDevice] = useState<'phone' | 'earbuds' | 'dual'>('phone');
  const [selectedFeature, setSelectedFeature] = useState<'cable' | 'tilt' | 'acoustic'>('tilt');
  const [selectedStyle, setSelectedStyle] = useState<'hex' | 'minimal' | 'cyber'>('hex');

  // Local state for Stage 3 quiz selection
  const [selectedQuizOptionId, setSelectedQuizOptionId] = useState<string | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  // Local state for Module 5 peer critique reply
  const [critiqueReplied, setCritiqueReplied] = useState<boolean>(false);

  // Stage transition helper
  const handleSetStage = (stage: EduStage) => {
    onUpdateEduState({ currentStage: stage });
    if (stage === 'mission') {
      setCurrentSlideIndex(0);
    }
    if (stage === 'quiz') {
      setSelectedQuizOptionId(null);
      setQuizSubmitted(false);
    }
  };

  // Advance to next module
  const handleNextModule = () => {
    if (activeModuleId < 6) {
      onSelectModule(activeModuleId + 1);
      onUpdateEduState({ currentStage: 'mission' });
      setCurrentSlideIndex(0);
    }
  };

  // Current slide & quiz question
  const currentSlide = lessonData.slides[currentSlideIndex] || lessonData.slides[0];
  const currentQuestion = quizData?.questions[0];
  const selectedOption = currentQuestion?.options.find((o) => o.id === selectedQuizOptionId);
  const isCorrect = selectedOption?.isCorrect;

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden select-none font-sans bg-[#121214] text-zinc-200">
      {/* Top Breadcrumb & Step Navigation Bar (Apple HIG Segmented Bar) */}
      <div className="h-12 px-4 border-b border-zinc-800 bg-[#18181b] flex items-center justify-between z-30 shrink-0">
        {/* Left: Module title & duration */}
        <div className="flex items-center gap-2 text-xs">
          <span className="font-semibold text-white tracking-tight">
            {currentModule.code}: {currentModule.title}
          </span>
          <span className="text-zinc-600 hidden sm:inline">·</span>
          <span className="text-zinc-400 font-mono text-[11px] hidden sm:inline">
            {currentModule.badgeName} Badge
          </span>
        </div>

        {/* Center: The 4 Step Progress Pills */}
        <div className="flex items-center bg-zinc-900 border border-zinc-800 p-0.5 rounded-lg shadow-inner">
          {[
            { id: 'mission' as EduStage, label: '📖 1. Read Lesson' },
            { id: 'try' as EduStage, label: '🛠️ 2. Practice' },
            { id: 'quiz' as EduStage, label: '🎯 3. Quiz' },
            { id: 'mastery' as EduStage, label: '🏆 4. Badge' },
          ].map((s) => {
            const isActive = currentStage === s.id;
            return (
              <button
                key={s.id}
                onClick={() => handleSetStage(s.id)}
                className={`px-3 py-1 rounded-md text-xs transition-colors font-medium ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs font-semibold'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {s.label}
              </button>
            );
          })}
        </div>

        {/* Right: Quick Module Switcher & Studio Jump */}
        <div className="flex items-center gap-2">
          {onOpenStudio && (
            <button
              onClick={onOpenStudio}
              className="px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white border border-zinc-700 text-xs font-medium transition-colors flex items-center gap-1.5 hidden md:flex"
              title="Open full 3D CAD modeling sandbox with Spline inspector controls"
            >
              <Sliders className="size-3.5 text-blue-400" />
              <span>3D Studio</span>
            </button>
          )}

          <div className="flex items-center gap-1">
            <span className="text-[11px] font-mono text-zinc-500 hidden lg:inline mr-1">Modules:</span>
            {LEARNING_MODULES.map((m) => (
              <button
                key={m.id}
                onClick={() => {
                  onSelectModule(m.id);
                  onUpdateEduState({ currentStage: 'mission' });
                  setCurrentSlideIndex(0);
                }}
                className={`size-6 rounded-md text-[11px] font-mono font-medium transition-colors flex items-center justify-center ${
                  m.id === activeModuleId
                    ? 'bg-blue-600 text-white font-bold'
                    : eduState.completedQuizModuleIds.includes(m.id)
                    ? 'bg-zinc-800 text-emerald-400 border border-emerald-500/30'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
                title={`${m.code}: ${m.title}`}
              >
                {m.id}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Learning Flow Stage */}
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden relative">
        {/* ========================================================================= */}
        {/* STAGE 1: THE INTERACTIVE LESSON SLIDES (LEARN) */}
        {/* ========================================================================= */}
        {currentStage === 'mission' && currentSlide && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex items-center justify-center">
            <div className="max-w-2xl w-full p-6 sm:p-8 rounded-2xl border border-zinc-800 bg-[#18181b]/90 space-y-6 shadow-2xl">
              {/* Slide Progress Dots */}
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-blue-400 font-medium">
                    {currentSlide.badge}
                  </span>
                  <span className="text-zinc-600">·</span>
                  <span className="text-[11px] text-zinc-400 font-mono">
                    Slide {currentSlideIndex + 1} of {lessonData.slides.length}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  {lessonData.slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentSlideIndex(i)}
                      className={`h-1.5 rounded-full transition-all ${
                        i === currentSlideIndex
                          ? 'w-6 bg-blue-500'
                          : 'w-2 bg-zinc-700 hover:bg-zinc-500'
                      }`}
                      title={`Slide ${i + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Title & Subtitle */}
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
                  {currentSlide.title}
                </h2>
                <p className="text-xs sm:text-sm text-zinc-400">
                  {currentSlide.subtitle}
                </p>
              </div>

              {/* Lesson Paragraphs */}
              <div className="space-y-3 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {currentSlide.paragraphs.map((p, idx) => (
                  <p key={idx} className="whitespace-pre-line">
                    {p}
                  </p>
                ))}
              </div>

              {/* Key Concept Callout Box */}
              <div className="p-4 rounded-xl border border-blue-900/40 bg-blue-950/20 space-y-1">
                <div className="text-xs font-semibold text-blue-400 flex items-center gap-1.5">
                  <Lightbulb className="size-3.5" />
                  <span>Key Concept: {currentSlide.keyConcept.term}</span>
                </div>
                <div className="text-xs text-zinc-300 leading-relaxed">
                  {currentSlide.keyConcept.definition}
                </div>
              </div>

              {/* Pro Tip Callout */}
              <div className="p-3 rounded-lg bg-zinc-900/80 border border-zinc-800 text-[11px] text-zinc-400 flex items-start gap-2">
                <span className="font-semibold text-zinc-300 shrink-0">Pro Tip:</span>
                <span>{currentSlide.proTip}</span>
              </div>

              {/* Slide Navigation Actions */}
              <div className="pt-3 border-t border-zinc-800 flex items-center justify-between">
                <button
                  disabled={currentSlideIndex === 0}
                  onClick={() => setCurrentSlideIndex((prev) => Math.max(0, prev - 1))}
                  className={`px-4 py-2 rounded-xl text-xs font-medium transition-colors flex items-center gap-1.5 ${
                    currentSlideIndex > 0
                      ? 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800'
                      : 'text-zinc-600 cursor-not-allowed'
                  }`}
                >
                  <ArrowLeft className="size-3.5" />
                  <span>Previous</span>
                </button>

                {currentSlideIndex < lessonData.slides.length - 1 ? (
                  <button
                    onClick={() => setCurrentSlideIndex((prev) => prev + 1)}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs transition-colors flex items-center gap-2 shadow-xs"
                  >
                    <span>Next Slide</span>
                    <ArrowRight className="size-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => handleSetStage('try')}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs transition-colors flex items-center gap-2 shadow-xs"
                  >
                    <span>Start Hands-On Studio →</span>
                    <Sparkles className="size-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STAGE 2: TACTILE HANDS-ON INTERACTIVE STAGE */}
        {/* ========================================================================= */}
        {currentStage === 'try' && (
          <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
            {/* 70% Height Hero Stage */}
            <div className="flex-1 min-h-0 relative bg-zinc-950 flex flex-col items-center justify-center p-4">
              {/* MODULE 1: 3D Orbit & Wireframe Skeleton */}
              {activeModuleId === 1 && (
                <div className="h-full w-full relative rounded-xl overflow-hidden border border-zinc-800/80">
                  <SplineViewportMock
                    eduState={eduState}
                    onUpdateEduState={onUpdateEduState}
                  />

                  {/* On-canvas control pill */}
                  <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-zinc-900/90 backdrop-blur-md border border-zinc-800 p-1.5 rounded-lg text-xs">
                    <button
                      onClick={() => onUpdateEduState({ wireframeMode: !eduState.wireframeMode })}
                      className={`px-3 py-1 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5 ${
                        eduState.wireframeMode
                          ? 'bg-blue-600 text-white'
                          : 'bg-zinc-800 text-zinc-300 hover:text-white'
                      }`}
                    >
                      <Layers className="size-3.5" />
                      <span>{eduState.wireframeMode ? 'Wireframe Skeleton: ON' : 'Show Wireframe Skeleton'}</span>
                    </button>
                    <span className="text-[11px] text-zinc-400 font-mono pr-2">
                      Drag to orbit 360°
                    </span>
                  </div>
                </div>
              )}

              {/* MODULE 2: The Prompt Forge Recipe Builder */}
              {activeModuleId === 2 && (
                <div className="max-w-2xl w-full p-6 rounded-2xl border border-zinc-800 bg-[#18181b] space-y-5">
                  <div className="space-y-1">
                    <h3 className="text-base font-semibold text-white">Assemble Your 3D Prompt Recipe</h3>
                    <p className="text-xs text-zinc-400">
                      Tap one block from each category to build a functional 3D prompt recipe.
                    </p>
                  </div>

                  {/* Category 1: Device Cradle */}
                  <div className="space-y-1.5">
                    <div className="text-[11px] font-mono uppercase text-zinc-400">1. Device Type:</div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      {[
                        { id: 'phone', label: 'Smartphone Stand' },
                        { id: 'earbuds', label: 'Earbuds & Phone Dock' },
                        { id: 'dual', label: 'Dual Tablet Cradle' },
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setSelectedDevice(item.id as any)}
                          className={`p-2.5 rounded-lg border text-left font-medium transition-colors ${
                            selectedDevice === item.id
                              ? 'bg-blue-600 border-blue-500 text-white'
                              : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Category 2: Functional Feature */}
                  <div className="space-y-1.5">
                    <div className="text-[11px] font-mono uppercase text-zinc-400">2. Functional Engineering:</div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      {[
                        { id: 'tilt', label: '60° Ergonomic Viewing Tilt' },
                        { id: 'cable', label: 'Hidden Cable Pass-Through' },
                        { id: 'acoustic', label: 'Acoustic Sound Chamber' },
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setSelectedFeature(item.id as any)}
                          className={`p-2.5 rounded-lg border text-left font-medium transition-colors ${
                            selectedFeature === item.id
                              ? 'bg-blue-600 border-blue-500 text-white'
                              : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Category 3: Form Style */}
                  <div className="space-y-1.5">
                    <div className="text-[11px] font-mono uppercase text-zinc-400">3. Aesthetic Geometry:</div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      {[
                        { id: 'hex', label: 'Hexagonal Geometric Base' },
                        { id: 'minimal', label: 'Minimalist Clean Chamfers' },
                        { id: 'cyber', label: 'Cyberpunk Aerodynamic Wings' },
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setSelectedStyle(item.id as any)}
                          className={`p-2.5 rounded-lg border text-left font-medium transition-colors ${
                            selectedStyle === item.id
                              ? 'bg-blue-600 border-blue-500 text-white'
                              : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Live Prompt Preview */}
                  <div className="p-3.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs font-mono space-y-1">
                    <div className="text-[10px] text-zinc-500 uppercase">Generated Prompt Recipe:</div>
                    <div className="text-blue-300 leading-relaxed font-sans">
                      "A sleek 3D {selectedDevice === 'phone' ? 'smartphone stand' : selectedDevice === 'earbuds' ? 'earbuds dock' : 'tablet cradle'} featuring {selectedFeature === 'tilt' ? 'a 60-degree ergonomic viewing tilt' : selectedFeature === 'cable' ? 'a recessed cable pass-through notch' : 'an acoustic sound amplifier chamber'}, built on a {selectedStyle === 'hex' ? 'weighted hexagonal base' : selectedStyle === 'minimal' ? 'clean beveled block' : 'cyberpunk aerodynamic chassis'}."
                    </div>
                  </div>
                </div>
              )}

              {/* MODULE 3: Live 3D AI Synthesis Stage */}
              {activeModuleId === 3 && (
                <div className="h-full w-full relative rounded-xl overflow-hidden border border-zinc-800/80 flex items-center justify-center">
                  <SplineViewportMock
                    eduState={eduState}
                    onUpdateEduState={onUpdateEduState}
                  />

                  {/* Floating Action Trigger */}
                  <div className="absolute bottom-6 z-20 flex items-center gap-3 bg-zinc-900/95 backdrop-blur-md border border-zinc-800 px-4 py-2.5 rounded-xl shadow-xl">
                    <button
                      onClick={onTriggerGenerate}
                      className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs transition-colors flex items-center gap-2 shadow-xs"
                    >
                      <Sparkles className="size-3.5" />
                      <span>{eduState.isGenerating ? 'Synthesizing 3D Geometry...' : 'Synthesize 3D Model'}</span>
                    </button>
                    <span className="text-xs text-zinc-400 font-mono">
                      {eduState.isGenerating ? `${eduState.generationProgress}% processed` : 'WebGL 3D Synthesis Ready'}
                    </span>
                  </div>
                </div>
              )}

              {/* MODULE 4: The Material Lab */}
              {activeModuleId === 4 && (
                <div className="h-full w-full relative rounded-xl overflow-hidden border border-zinc-800/80">
                  <SplineViewportMock
                    eduState={eduState}
                    onUpdateEduState={onUpdateEduState}
                  />

                  {/* Material Switcher Bar */}
                  <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2 bg-zinc-900/95 backdrop-blur-md border border-zinc-800 p-2 rounded-xl text-xs shadow-xl">
                    <span className="text-zinc-400 font-medium px-1">Material Finish:</span>
                    {[
                      { id: 'cyber', label: 'Cyber Neon', color: '#0A84FF' },
                      { id: 'stealth', label: 'Stealth Matte', color: '#27272A' },
                      { id: 'timber', label: 'Eco Bamboo', color: '#D97706' },
                      { id: 'silver', label: 'Anodized Silver', color: '#E4E4E7' },
                    ].map((mat) => (
                      <button
                        key={mat.id}
                        onClick={() => {
                          onUpdateEduState({
                            dockFinish: mat.id as any,
                            canopyColor: mat.color
                          });
                        }}
                        className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors flex items-center gap-2 ${
                          (eduState.dockFinish || 'cyber') === mat.id
                            ? 'bg-zinc-800 border-blue-500 text-white shadow-xs'
                            : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                        }`}
                      >
                        <div className="size-2.5 rounded-full border border-zinc-700" style={{ backgroundColor: mat.color }} />
                        <span>{mat.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* MODULE 5: Ergonomics & Peer Lab */}
              {activeModuleId === 5 && (
                <div className="h-full w-full relative rounded-xl overflow-hidden border border-zinc-800/80">
                  <SplineViewportMock
                    eduState={eduState}
                    onUpdateEduState={onUpdateEduState}
                  />

                  {/* Ergonomics Test & Peer Critique Overlay */}
                  <div className="absolute top-4 left-4 z-20 max-w-sm bg-zinc-900/95 backdrop-blur-md border border-zinc-800 p-4 rounded-xl text-xs space-y-3 shadow-xl">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white">Ergonomics & Classmate Pins</span>
                      <button
                        onClick={() => onUpdateEduState({ ergonomicAngleTested: !eduState.ergonomicAngleTested })}
                        className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                          eduState.ergonomicAngleTested
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            : 'bg-zinc-800 text-zinc-400'
                        }`}
                      >
                        {eduState.ergonomicAngleTested ? '60° TILT VERIFIED ✓' : 'TEST 60° ANGLE'}
                      </button>
                    </div>

                    {/* Classmate feedback pins */}
                    <div className="space-y-1.5">
                      <div className="text-[10px] text-zinc-500 uppercase font-mono">Peer Feedback from Maya (Class 3-Faith):</div>
                      <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-300 leading-relaxed text-xs">
                        "The 60° angle is great for viewing phone notes during study, but consider widening the cable notch by 5mm so braided charging cables don’t bend."
                      </div>
                    </div>

                    <button
                      onClick={() => setCritiqueReplied(true)}
                      className="w-full py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs transition-colors"
                    >
                      {critiqueReplied ? 'Revision Applied to 3D Model ✓' : 'Accept Suggestion & Apply Revision'}
                    </button>
                  </div>
                </div>
              )}

              {/* MODULE 6: Creator Showcase & Graduation */}
              {activeModuleId === 6 && (
                <div className="max-w-xl w-full p-6 rounded-2xl border border-zinc-800 bg-[#18181b] space-y-5 text-xs">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                    <div>
                      <h3 className="text-base font-semibold text-white">Creator Ownership Scorecard</h3>
                      <p className="text-zinc-400 text-xs">Evidence of Human Creative Intent</p>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono">
                      92% Human Designer
                    </div>
                  </div>

                  <div className="space-y-2">
                    {[
                      { task: 'Problem Need & Device Definition', human: '100% You', role: 'Ergonomic study companion' },
                      { task: 'Prompt Recipe Strategy', human: '100% You', role: 'Functional features & geometry' },
                      { task: 'Surface Material & Texture', human: '100% You', role: 'Chosen finish and durability' },
                      { task: 'Ergonomic Angle Refinement', human: '100% You', role: 'Tested 60° video call angle' },
                    ].map((row, i) => (
                      <div key={i} className="p-2.5 rounded-lg border border-zinc-800 bg-zinc-900/60 flex items-center justify-between">
                        <span className="font-medium text-white">{row.task}</span>
                        <span className="text-emerald-400 font-mono font-medium">{row.human}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-zinc-800 flex items-center justify-between">
                    <span className="text-zinc-400">Verified for Singapore MOE EdTech Standards</span>
                    <button
                      onClick={onOpenCertificateModal}
                      className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs transition-colors flex items-center gap-1.5 shadow-xs"
                    >
                      <Award className="size-3.5" />
                      <span>View Official Certificate</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 30% Height Guidance & Action Dock */}
            <div className="h-20 px-6 border-t border-zinc-800 bg-[#18181b] flex items-center justify-between z-30 shrink-0">
              <div className="space-y-0.5 max-w-lg">
                <div className="text-xs font-semibold text-white flex items-center gap-2">
                  <span className="size-2 rounded-full bg-blue-500" />
                  <span>
                    {activeModuleId === 1
                      ? 'Orbit around the 3D model in 360° to inspect volume and wireframes.'
                      : activeModuleId === 2
                      ? 'Select your prompt recipe ingredients above.'
                      : activeModuleId === 3
                      ? 'Generate and orbit the synthesized 3D mesh.'
                      : activeModuleId === 4
                      ? 'Switch finishes to see light reflect off different materials.'
                      : activeModuleId === 5
                      ? 'Test the 60° ergonomic viewing angle and apply peer feedback.'
                      : 'Review your Creator Ownership Scorecard.'}
                  </span>
                </div>
                <div className="text-[11px] text-zinc-400">
                  When you're ready, proceed to the knowledge check to test what you learned.
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleSetStage('mission')}
                  className="px-3 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 text-xs font-medium transition-colors"
                >
                  Review Lesson
                </button>
                <button
                  onClick={() => handleSetStage('quiz')}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs transition-all flex items-center gap-2 shadow-sm shadow-blue-900/30"
                >
                  <span>Check Understanding</span>
                  <ArrowRight className="size-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STAGE 3: THE FORMATIVE KNOWLEDGE CHECK */}
        {/* ========================================================================= */}
        {currentStage === 'quiz' && currentQuestion && (
          <div className="flex-1 overflow-y-auto p-6 sm:p-12 flex items-center justify-center">
            <div className="max-w-xl w-full p-8 rounded-2xl border border-zinc-800 bg-[#18181b] space-y-6 shadow-xl">
              <div className="space-y-1.5 border-b border-zinc-800 pb-4">
                <div className="flex items-center gap-2 text-xs font-mono text-blue-400">
                  <Award className="size-3.5" />
                  <span>Knowledge Check · {currentModule.title}</span>
                </div>
                <h3 className="text-lg font-semibold text-white leading-snug">
                  {currentQuestion.question}
                </h3>
                {currentQuestion.contextNote && (
                  <p className="text-xs text-zinc-400">{currentQuestion.contextNote}</p>
                )}
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {currentQuestion.options.map((opt) => {
                  const isChosen = selectedQuizOptionId === opt.id;
                  let cardClass = 'bg-zinc-900/60 border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:text-white';

                  if (quizSubmitted) {
                    if (opt.isCorrect) {
                      cardClass = 'bg-emerald-950/20 border-emerald-500 text-emerald-200';
                    } else if (isChosen) {
                      cardClass = 'bg-rose-950/20 border-rose-500 text-rose-200';
                    }
                  } else if (isChosen) {
                    cardClass = 'bg-zinc-800 border-blue-500 text-white';
                  }

                  return (
                    <button
                      key={opt.id}
                      disabled={quizSubmitted}
                      onClick={() => setSelectedQuizOptionId(opt.id)}
                      className={`w-full p-3.5 rounded-xl border text-left text-xs transition-all flex items-start gap-3 ${cardClass}`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {quizSubmitted ? (
                          opt.isCorrect ? (
                            <CheckCircle2 className="size-4 text-emerald-400" />
                          ) : isChosen ? (
                            <XCircle className="size-4 text-rose-400" />
                          ) : (
                            <div className="size-4 rounded-full border border-zinc-700" />
                          )
                        ) : (
                          <div
                            className={`size-4 rounded-full border flex items-center justify-center ${
                              isChosen ? 'border-blue-500 bg-blue-500' : 'border-zinc-700'
                            }`}
                          >
                            {isChosen && <div className="size-1.5 rounded-full bg-white" />}
                          </div>
                        )}
                      </div>
                      <span className="leading-relaxed">{opt.text}</span>
                    </button>
                  );
                })}
              </div>

              {/* Feedback box */}
              {quizSubmitted && selectedOption && (
                <div
                  className={`p-4 rounded-xl border text-xs leading-relaxed ${
                    isCorrect
                      ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                      : 'bg-rose-950/30 border-rose-500/40 text-rose-200'
                  }`}
                >
                  <div className="font-semibold mb-1">
                    {isCorrect ? 'Awesome job! 🎉' : 'Keep thinking! 💡'}
                  </div>
                  <div>{selectedOption.explanation}</div>
                </div>
              )}

              {/* Actions */}
              <div className="pt-2 flex items-center justify-between border-t border-zinc-800">
                {!quizSubmitted ? (
                  <button
                    disabled={!selectedQuizOptionId}
                    onClick={() => {
                      setQuizSubmitted(true);
                      if (selectedOption?.isCorrect) {
                        onRecordQuizScore(activeModuleId, 100);
                      }
                    }}
                    className={`px-5 py-2.5 rounded-xl font-medium text-xs transition-all ${
                      selectedQuizOptionId
                        ? 'bg-blue-600 hover:bg-blue-500 text-white cursor-pointer'
                        : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                    }`}
                  >
                    Check Answer
                  </button>
                ) : isCorrect ? (
                  <button
                    onClick={() => handleSetStage('mastery')}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs transition-all flex items-center gap-2 ml-auto"
                  >
                    <span>View Summary & Claim Badge →</span>
                    <ArrowRight className="size-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setQuizSubmitted(false);
                      setSelectedQuizOptionId(null);
                    }}
                    className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-medium text-xs transition-colors flex items-center gap-1.5"
                  >
                    <RotateCcw className="size-3.5" />
                    <span>Try Again</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STAGE 4: SUMMARY & BADGE CELEBRATION */}
        {/* ========================================================================= */}
        {currentStage === 'mastery' && (
          <div className="flex-1 overflow-y-auto p-6 sm:p-10 flex items-center justify-center">
            <div className="max-w-lg w-full p-8 rounded-2xl border border-zinc-800 bg-[#18181b] space-y-6 shadow-xl">
              {/* Badge Icon & Milestone */}
              <div className="text-center space-y-2">
                <div className="size-16 rounded-full bg-emerald-500/10 border-2 border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                  <Award className="size-8" />
                </div>
                <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                  Badge Unlocked!
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  {currentModule.badgeName}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed max-w-xs mx-auto">
                  You completed {currentModule.title} and mastered its core concepts.
                </p>
              </div>

              {/* Key Takeaways / Revision Notes */}
              <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/60 space-y-2 text-xs">
                <div className="font-semibold text-white flex items-center gap-1.5">
                  <BookOpen className="size-3.5 text-blue-400" />
                  <span>Key Takeaways (Revision Notes):</span>
                </div>
                <ul className="space-y-1.5 text-zinc-300">
                  {lessonData.keyTakeaways.map((takeaway, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold shrink-0">✓</span>
                      <span className="leading-relaxed">{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Progress Tracker */}
              <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1.5 text-xs text-left">
                <div className="flex items-center justify-between text-zinc-400 font-mono text-[11px]">
                  <span>Curriculum Progress:</span>
                  <span className="text-emerald-400 font-semibold">{activeModuleId} of 6 Modules Done</span>
                </div>
                <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                    style={{ width: `${(activeModuleId / 6) * 100}%` }}
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 flex items-center justify-center gap-3">
                {activeModuleId < 6 ? (
                  <button
                    onClick={handleNextModule}
                    className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>Continue to Module {activeModuleId + 1}</span>
                    <ArrowRight className="size-4" />
                  </button>
                ) : (
                  <button
                    onClick={onOpenCertificateModal}
                    className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Award className="size-4" />
                    <span>Claim Your Official MOE Certificate</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
