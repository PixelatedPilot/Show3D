import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  ArrowUpRight,
  BookOpen, 
  Users, 
  Sparkles, 
  ExternalLink, 
  Box, 
  CheckCircle2, 
  ShieldCheck, 
  Calendar,
  Layers,
  Award,
  Sun,
  Printer,
  Compass,
  Clock,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Cpu,
  GraduationCap,
  FlaskConical,
  Sliders,
  Terminal,
  Eye,
  Check,
  Orbit,
  Lock,
  HeartHandshake
} from 'lucide-react';
import { LEARNING_MODULES } from '../../store/appStore';
import { FallingPhysicsStage } from './FallingPhysicsStage';

export interface LandingViewProps {
  onStartLearning: () => void;
  onOpenStudio?: () => void;
  onViewCurriculum: () => void;
  onOpenTeacherView: () => void;
  onSelectModule: (id: number) => void;
  onLaunchCanvasModal?: () => void;
  onOpenSafetyModal?: () => void;
  onOpenProcurementModal?: () => void;
  onOpenPedagogyModal?: () => void;
}

type LabCategory = 'All' | 'Create' | 'Develop' | 'Explore' | 'Learn';

interface FeaturedCarouselItem {
  id: string;
  moduleId: number;
  tag: string;
  name: string;
  shortDesc: string;
  fullDesc: string;
  ctaLabel: string;
  accentHex: string;
  tintBg: string;
  pillTextHex: string;
  moeDomain: string;
}

const FEATURED_EXPERIMENTS: FeaturedCarouselItem[] = [
  {
    id: 'pavilion',
    moduleId: 3,
    tag: 'MODULE 03 · SPATIAL SYNTHESIS',
    name: 'Courtyard Tensile Pavilion',
    shortDesc: 'Engineer tropical campus shade & 450W solar micro-grids in 3D.',
    fullDesc: 'An interactive spatial AI challenge where students solve real 34°C afternoon heat on campus by balancing parabolic canopy curvature, high-albedo fabrics, and renewable solar wattage.',
    ctaLabel: 'Try it now — Courtyard Pavilion',
    accentHex: '#0A84FF',
    tintBg: '#0D2137',
    pillTextHex: '#FFFFFF',
    moeDomain: 'Learn to Use AI · Spatial Synthesis'
  },
  {
    id: 'prompt-forge',
    moduleId: 2,
    tag: 'MODULE 02 · PROMPT ARCHITECTURE',
    name: 'The Prompt Forge (PARTS)',
    shortDesc: 'Turn structured engineering logic into clean 3D geometry.',
    fullDesc: 'Replace random prompt guessing with the canonical 5-part PARTS recipe (Persona, Aim, Recipients, Theme, Structure) to synthesize watertight, printable 3D meshes.',
    ctaLabel: 'Try it now — The Prompt Forge',
    accentHex: '#FFD60A',
    tintBg: '#2C2405',
    pillTextHex: '#1C1C1E',
    moeDomain: 'Learn to Use AI · Prompt Architecture'
  },
  {
    id: 'material-lab',
    moduleId: 4,
    tag: 'MODULE 04 · PHYSICAL SHADERS',
    name: 'The Material Alchemist',
    shortDesc: 'Test real-world PBR shaders, thermal albedo, and PLA durability.',
    fullDesc: 'Experiment with Physically Based Rendering (PBR) surface finishes—comparing solar-reflective white PTFE, brushed aluminum, and eco-friendly bamboo for physical fabrication.',
    ctaLabel: 'Try it now — Material Lab',
    accentHex: '#30D158',
    tintBg: '#0E2914',
    pillTextHex: '#FFFFFF',
    moeDomain: 'Learn to Use AI · Physical Shaders'
  },
  {
    id: 'peer-lab',
    moduleId: 5,
    tag: 'MODULE 05 · COLLABORATIVE CRITIQUE',
    name: 'Ergonomics & Spatial Pins',
    shortDesc: 'Test 60° viewing angles and anchor 3D peer critique pins.',
    fullDesc: 'An experimental collaborative stage where students verify 60° ergonomic sightlines, inspect wall thickness for 3D slicing, and pin constructive D&T feedback directly onto 3D coordinates.',
    ctaLabel: 'Try it now — Ergonomics Lab',
    accentHex: '#FF375F',
    tintBg: '#2E0C14',
    pillTextHex: '#FFFFFF',
    moeDomain: 'Learn With AI · Collaborative Critique'
  },
  {
    id: 'dimension-3d',
    moduleId: 1,
    tag: 'MODULE 01 · COORDINATE GEOMETRY',
    name: 'The 3D Dimension',
    shortDesc: 'Inspect X-Y-Z coordinates and wireframe skeletons from 360°.',
    fullDesc: 'Discover how spatial computing builds true mathematical volume using vertices, edges, and polygon meshes—preparing young inventors to move beyond flat 2D screens.',
    ctaLabel: 'Try it now — The 3D Dimension',
    accentHex: '#64D2FF',
    tintBg: '#092332',
    pillTextHex: '#000000',
    moeDomain: 'Learn About AI · Coordinate Geometry'
  }
];

export interface ExperimentCardItem {
  id: number;
  category: Exclude<LabCategory, 'All'>;
  code: string;
  title: string;
  subtitle: string;
  summary: string;
  keySkill: string;
  badgeName: string;
  duration: string;
  moeLearn: string;
  studentChallenge: string;
  learningObjectives: string[];
  ctaText: string;
  accentHex: string;
  tintBg: string;
  spanWide?: boolean;
  visualKind: 'wireframe' | 'prompt' | 'synthesis' | 'materials' | 'ergonomics' | 'certificate';
}

const MODULE_VISUAL_CONFIG: Record<number, {
  category: Exclude<LabCategory, 'All'>;
  accentHex: string;
  tintBg: string;
  spanWide?: boolean;
  visualKind: 'wireframe' | 'prompt' | 'synthesis' | 'materials' | 'ergonomics' | 'certificate';
}> = {
  1: { category: 'Create', accentHex: '#64D2FF', tintBg: '#092332', spanWide: true, visualKind: 'wireframe' },
  2: { category: 'Develop', accentHex: '#FFD60A', tintBg: '#2C2405', visualKind: 'prompt' },
  3: { category: 'Create', accentHex: '#30D158', tintBg: '#0E2914', visualKind: 'synthesis' },
  4: { category: 'Develop', accentHex: '#0A84FF', tintBg: '#0D2137', visualKind: 'materials' },
  5: { category: 'Explore', accentHex: '#FF375F', tintBg: '#2E0C14', visualKind: 'ergonomics' },
  6: { category: 'Learn', accentHex: '#30D158', tintBg: '#0E2914', spanWide: true, visualKind: 'certificate' },
};

/**
 * Adapt LEARNING_MODULES from appStore into enriched Apple-grade masterclass cards.
 */
const LAB_EXPERIMENT_CARDS: ExperimentCardItem[] = LEARNING_MODULES.map((m) => {
  const cfg = MODULE_VISUAL_CONFIG[m.id] || {
    category: 'Create' as const,
    accentHex: '#0A84FF',
    tintBg: '#0D2137',
    visualKind: 'wireframe' as const,
  };
  return {
    id: m.id,
    category: cfg.category,
    code: `MODULE 0${m.id} · ${m.code.toUpperCase()}`,
    title: m.title,
    subtitle: m.keySkill,
    summary: m.summary,
    keySkill: m.keySkill,
    badgeName: m.badgeName,
    duration: m.duration,
    moeLearn: m.moeLearn,
    studentChallenge: m.studentChallenge,
    learningObjectives: m.learningObjectives,
    ctaText: `Try Masterclass 0${m.id}`,
    accentHex: cfg.accentHex,
    tintBg: cfg.tintBg,
    spanWide: cfg.spanWide,
    visualKind: cfg.visualKind,
  };
});

export const LandingView: React.FC<LandingViewProps> = ({
  onStartLearning,
  onOpenTeacherView,
  onSelectModule,
  onLaunchCanvasModal,
  onOpenSafetyModal,
  onOpenProcurementModal,
  onOpenPedagogyModal,
}) => {
  // Featured Hero Showcase State
  const [activeSlideIdx, setActiveSlideIdx] = useState<number>(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState<boolean>(false);
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  // 6-second auto-advance timer matching Apple showcase cadence
  useEffect(() => {
    if (isCarouselPaused) return;
    const interval = setInterval(() => {
      setActiveSlideIdx((prev) => (prev === FEATURED_EXPERIMENTS.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(interval);
  }, [isCarouselPaused, activeSlideIdx]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsCarouselPaused(true);
    touchStartXRef.current = e.targetTouches[0].clientX;
    touchEndXRef.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    setIsCarouselPaused(false);
    if (touchStartXRef.current !== null && touchEndXRef.current !== null) {
      const delta = touchStartXRef.current - touchEndXRef.current;
      if (delta > 45) {
        handleNextHero();
      } else if (delta < -45) {
        handlePrevHero();
      }
    }
    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };
  
  // Interactive 3D Pavilion Configurator State inside Hero
  const [previewColor, setPreviewColor] = useState<string>('#64D2FF');
  const [curvature, setCurvature] = useState<number>(0.68);
  const [hasSolar, setHasSolar] = useState<boolean>(true);

  // Category Filter State
  const [activeCategory, setActiveCategory] = useState<LabCategory>('All');

  // Camp Format State
  const [selectedFormat, setSelectedFormat] = useState<'holiday' | 'term'>('holiday');

  // FAQ Accordion State
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const activeHero = FEATURED_EXPERIMENTS[activeSlideIdx];

  const filteredExperiments = activeCategory === 'All'
    ? LAB_EXPERIMENT_CARDS
    : LAB_EXPERIMENT_CARDS.filter((item) => item.category === activeCategory);

  const handlePrevHero = () => {
    setActiveSlideIdx((prev) => (prev === 0 ? FEATURED_EXPERIMENTS.length - 1 : prev - 1));
  };

  const handleNextHero = () => {
    setActiveSlideIdx((prev) => (prev === FEATURED_EXPERIMENTS.length - 1 ? 0 : prev + 1));
  };

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#000000] text-[#F5F5F7] font-sans selection:bg-[#0A84FF] selection:text-white">
      
      {/* ========================================================================= */}
      {/* 1. APPLE HERO: "Your child won’t just use AI. They’ll command it."         */}
      {/* ========================================================================= */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-[1380px] mx-auto text-center" id="hero">
        
        {/* Apple Centered Eyebrow & Headline Lockup */}
        <div className="max-w-4xl mx-auto space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1C1C1E] border border-white/[0.12] text-xs font-mono font-medium tracking-widest text-[#0A84FF] uppercase">
            <span>Spatial AI for Young Minds · Ages 10–20</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl lg:text-[76px] font-bold tracking-[-0.035em] text-white leading-[1.05]">
            <span>Your child won’t just use AI.</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0A84FF] via-[#64D2FF] to-[#30D158]">
              They’ll command it.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-[#86868B] max-w-2xl mx-auto font-normal leading-relaxed pt-2">
            Turn screen time into real engineering capability. In one week, students master spatial AI, direct 3D geometry with human judgment, and bring home an original physical invention.
          </p>

          {/* Apple Pill CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
            <button
              id="hero-start-learning-btn"
              onClick={onStartLearning}
              className="px-7 py-3.5 min-h-[50px] rounded-full bg-[#0A84FF] hover:bg-[#0071E3] text-white font-semibold text-sm sm:text-base flex items-center gap-2 transition-all shadow-lg shadow-[#0A84FF]/25 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Try an Interactive Lesson</span>
              <ArrowRight className="size-4" />
            </button>

            <a
              href="#lineup"
              id="hero-explore-experiments-link"
              className="px-6 py-3.5 min-h-[50px] rounded-full bg-[#1C1C1E] hover:bg-[#2C2C2E] text-white border border-white/[0.12] font-medium text-sm sm:text-base flex items-center gap-2 transition-all hover:border-white/[0.24]"
            >
              <span>Explore Cohort Tracks</span>
            </a>

            <a
              href="#gravity-lab"
              id="hero-gravity-lab-link"
              className="px-6 py-3.5 min-h-[50px] rounded-full bg-[#1C1C1E] hover:bg-[#2C2C2E] text-[#64D2FF] border border-[#64D2FF]/30 font-medium text-sm sm:text-base flex items-center gap-2 transition-all"
            >
              <Orbit className="size-4" />
              <span>Defy Gravity</span>
            </a>
          </div>
        </div>

        {/* Apple HIG Interactive Stage Showcase (Live 3D Geometry + Human Levers) */}
        <div 
          className="rounded-[32px] bg-[#1C1C1E]/90 border border-white/[0.1] p-5 sm:p-8 lg:p-10 overflow-hidden transition-all shadow-2xl backdrop-blur-2xl"
          onMouseEnter={() => setIsCarouselPaused(true)}
          onMouseLeave={() => setIsCarouselPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          
          {/* Top Stage Segmented Tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-white/[0.08]">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar snap-x snap-mandatory py-1 px-1 -mx-1 sm:mx-0 sm:px-0">
              {FEATURED_EXPERIMENTS.map((exp, idx) => {
                const isSelected = idx === activeSlideIdx;
                return (
                  <button
                    key={exp.id}
                    id={`featured-tab-${exp.id}`}
                    onClick={() => setActiveSlideIdx(idx)}
                    className={`snap-start shrink-0 px-4 py-2 min-h-[40px] rounded-full text-xs font-medium transition-all flex items-center gap-2 ${
                      isSelected
                        ? 'bg-white text-[#000000] font-semibold shadow-md'
                        : 'bg-[#2C2C2E]/60 text-[#86868B] hover:text-white hover:bg-[#2C2C2E] border border-white/[0.06]'
                    }`}
                  >
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: isSelected ? '#000000' : exp.accentHex }}
                    />
                    <span>{exp.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Prev / Next Controls + Counter */}
            <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
              <span className="text-xs font-mono text-[#86868B]">
                0{activeSlideIdx + 1} / 0{FEATURED_EXPERIMENTS.length}
              </span>
              <div className="flex items-center gap-2">
                <button
                  id="featured-prev-btn"
                  onClick={handlePrevHero}
                  aria-label="Previous featured experiment"
                  className="w-9 h-9 rounded-full bg-[#2C2C2E] hover:bg-[#3A3A3C] border border-white/[0.08] flex items-center justify-center text-white transition-colors"
                >
                  <ChevronLeft className="size-4" />
                </button>
                <button
                  id="featured-next-btn"
                  onClick={handleNextHero}
                  aria-label="Next featured experiment"
                  className="w-9 h-9 rounded-full bg-[#2C2C2E] hover:bg-[#3A3A3C] border border-white/[0.08] flex items-center justify-center text-white transition-colors"
                >
                  <ChevronRight className="size-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Synchronized 6-Second Timer Progress Bar */}
          <div className="w-full h-1 bg-white/[0.06] rounded-full overflow-hidden -mt-5 mb-8" aria-hidden="true">
            <div
              key={activeSlideIdx}
              className={`h-full bg-[#0A84FF] rounded-full labs-timer-bar ${
                isCarouselPaused ? 'labs-timer-bar-paused' : ''
              }`}
            />
          </div>

          {/* Main Split Showcase Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
            
            {/* Left Column: Narrative & Levers */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono font-medium"
                style={{ backgroundColor: activeHero.tintBg, color: activeHero.accentHex }}
              >
                <span>{activeHero.tag}</span>
                <span>·</span>
                <span>{activeHero.moeDomain}</span>
              </div>

              <div className="space-y-3">
                <h2 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
                  {activeHero.name}
                </h2>
                <p className="text-base text-[#F5F5F7] font-medium">
                  {activeHero.shortDesc}
                </p>
                <p className="text-sm text-[#86868B] leading-relaxed">
                  {activeHero.fullDesc}
                </p>
              </div>

              {/* Interactive Levers: Human Intent & Direct Control */}
              <div className="p-4 rounded-2xl bg-[#000000]/60 border border-white/[0.08] space-y-3.5 backdrop-blur-md">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[#86868B] flex items-center gap-1.5">
                    <Sliders className="size-3.5 text-[#0A84FF]" />
                    <span>Real-Time Geometry Controls</span>
                  </span>
                  <span className="font-mono text-[11px] text-[#30D158] font-semibold flex items-center gap-1">
                    <CheckCircle2 className="size-3 text-[#30D158]" />
                    <span>Human Intent: 94%</span>
                  </span>
                </div>

                {/* Swatches + Curvature + Solar Controls */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#86868B]">Material Tint:</span>
                    {[
                      { hex: '#64D2FF', name: 'Sky Blue' },
                      { hex: '#30D158', name: 'Mint Leaf' },
                      { hex: '#FFD60A', name: 'Solar Amber' },
                      { hex: '#FF375F', name: 'Terracotta' },
                    ].map((swatch) => (
                      <button
                        key={swatch.hex}
                        onClick={() => setPreviewColor(swatch.hex)}
                        style={{ backgroundColor: swatch.hex }}
                        className={`w-6 h-6 rounded-full border-2 transition-transform ${
                          previewColor === swatch.hex
                            ? 'border-white scale-110 shadow-md'
                            : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                        title={`Set pigment: ${swatch.name}`}
                        aria-label={`Set pigment ${swatch.name}`}
                      />
                    ))}
                  </div>

                  <button
                    id="hero-solar-toggle"
                    onClick={() => setHasSolar(!hasSolar)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-colors flex items-center gap-1.5 ${
                      hasSolar
                        ? 'bg-[#2C2405] border-[#FFD60A]/40 text-[#FFD60A]'
                        : 'bg-[#2C2C2E] border-white/[0.08] text-[#86868B]'
                    }`}
                  >
                    <Sun className="size-3.5" />
                    <span>{hasSolar ? '450W Solar Active' : 'Solar Inactive'}</span>
                  </button>
                </div>

                {/* Curvature Tension Slider */}
                <div className="space-y-1 pt-1">
                  <div className="flex justify-between text-[11px] font-mono text-[#86868B]">
                    <span>Canopy Arch Tension</span>
                    <span className="text-white font-medium">{curvature.toFixed(2)} ratio</span>
                  </div>
                  <input
                    id="hero-curvature-slider"
                    type="range"
                    min="0.25"
                    max="1.0"
                    step="0.05"
                    value={curvature}
                    onChange={(e) => setCurvature(parseFloat(e.target.value))}
                    className="w-full accent-[#0A84FF] cursor-pointer h-1.5 bg-[#2C2C2E] rounded-lg"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  id="featured-try-now-btn"
                  onClick={() => onSelectModule(activeHero.moduleId)}
                  className="px-6 py-3 rounded-full font-semibold text-xs sm:text-sm flex items-center gap-2 bg-[#0A84FF] hover:bg-[#0071E3] text-white transition-all shadow-md shadow-[#0A84FF]/20"
                >
                  <span>{activeHero.ctaLabel}</span>
                  <ArrowUpRight className="size-4" />
                </button>

                {onLaunchCanvasModal && (
                  <button
                    id="featured-open-canvas-btn"
                    onClick={onLaunchCanvasModal}
                    className="px-5 py-3 rounded-full bg-[#2C2C2E] hover:bg-[#3A3A3C] text-white border border-white/[0.1] font-medium text-xs sm:text-sm flex items-center gap-2 transition-colors"
                  >
                    <Box className="size-4 text-[#64D2FF]" />
                    <span>Open 3D Canvas</span>
                  </button>
                )}
              </div>
            </div>

            {/* Right Column: Interactive 3D Viewport Stage */}
            <div className="lg:col-span-7">
              <div
                className="relative rounded-[24px] border border-white/[0.1] p-6 sm:p-8 min-h-[340px] sm:min-h-[390px] flex flex-col justify-between overflow-hidden transition-colors bg-[#000000]"
              >
                {/* Stage Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#86868B] border-b border-white/[0.08] pb-3">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: activeHero.accentHex }}
                    />
                    <span className="text-white font-medium">SHOW3D_STAGE // M0{activeHero.moduleId}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px]">
                    <span className="text-[#64D2FF]">X,Y,Z: WATERTIGHT</span>
                    <span>·</span>
                    <span className="text-[#30D158]">PLA PRINT READY</span>
                  </div>
                </div>

                {/* Parametric 3D SVG Render */}
                <div className="relative flex-1 flex items-center justify-center my-4">
                  <svg viewBox="0 0 440 270" className="w-full h-full max-w-lg">
                    <defs>
                      <linearGradient id="appleCanopyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={previewColor} stopOpacity="0.95" />
                        <stop offset="100%" stopColor="#1C1C1E" stopOpacity="0.85" />
                      </linearGradient>
                    </defs>

                    {/* Isometric Base Ground */}
                    <ellipse cx="220" cy="215" rx="165" ry="38" fill="#141416" stroke="#2C2C2E" strokeWidth="1.5" />
                    <path d="M 220 240 L 360 195 L 220 150 L 80 195 Z" fill="#0E0E10" stroke="#2C2C2E" strokeWidth="1" />

                    {/* Coordinates Grid */}
                    <line x1="220" y1="25" x2="220" y2="245" stroke="#2C2C2E" strokeWidth="1" strokeDasharray="3 4" />
                    <line x1="65" y1="195" x2="375" y2="195" stroke="#2C2C2E" strokeWidth="1" strokeDasharray="3 4" />

                    {/* Structural Masts */}
                    <line x1="130" y1="200" x2="130" y2="95" stroke="#86868B" strokeWidth="3.5" strokeLinecap="round" />
                    <line x1="310" y1="200" x2="310" y2="95" stroke="#86868B" strokeWidth="3.5" strokeLinecap="round" />
                    <line x1="220" y1="185" x2="220" y2="55" stroke="#F5F5F7" strokeWidth="4" strokeLinecap="round" />

                    {/* Courtyard Floor Benches */}
                    <rect x="155" y="188" width="42" height="10" rx="3" fill="#FFD60A" opacity="0.85" />
                    <rect x="243" y="188" width="42" height="10" rx="3" fill="#FFD60A" opacity="0.85" />

                    {/* Parametric Tensile Canopy responding to `curvature` and `previewColor` */}
                    <path 
                      d={`M 220 ${42 + (1 - curvature) * 28} Q 320 ${68 + curvature * 24} 355 122 Q 285 156 220 132 Q 155 156 85 122 Q 120 ${68 + curvature * 24} 220 ${42 + (1 - curvature) * 28} Z`}
                      fill="url(#appleCanopyGrad)" 
                      stroke="#FFFFFF" 
                      strokeWidth="1.75" 
                    />
                    {/* Structural Ridge Line */}
                    <path
                      d={`M 220 ${42 + (1 - curvature) * 28} L 220 132`}
                      stroke="#FFFFFF"
                      strokeWidth="1.2"
                      strokeDasharray="4 4"
                      opacity="0.7"
                    />

                    {/* Solar Array Grid */}
                    {hasSolar && (
                      <g>
                        <path d="M 192 52 L 248 52 L 264 78 L 176 78 Z" fill="#0D2137" stroke="#64D2FF" strokeWidth="1.5" />
                        <line x1="184" y1="65" x2="256" y2="65" stroke="#64D2FF" strokeWidth="0.9" opacity="0.7" />
                        <line x1="220" y1="52" x2="220" y2="78" stroke="#64D2FF" strokeWidth="0.9" opacity="0.7" />
                      </g>
                    )}

                    {/* Spatial Dimension Callouts */}
                    <g transform="translate(295, 42)">
                      <rect x="0" y="0" width="118" height="24" rx="12" fill="#1C1C1E" stroke="#2C2C2E" />
                      <text x="59" y="15" textAnchor="middle" fill="#FFD60A" fontSize="10" fontFamily="JetBrains Mono, monospace">
                        {hasSolar ? 'SOLAR: 450W ON' : 'SOLAR: 0W OFF'}
                      </text>
                    </g>

                    <g transform="translate(24, 145)">
                      <rect x="0" y="0" width="122" height="24" rx="12" fill="#1C1C1E" stroke="#2C2C2E" />
                      <text x="61" y="15" textAnchor="middle" fill="#64D2FF" fontSize="10" fontFamily="JetBrains Mono, monospace">
                        ARCH: {(curvature * 100).toFixed(0)}% TENSION
                      </text>
                    </g>
                  </svg>
                </div>

                {/* Bottom Takeaway Bar */}
                <div className="pt-3 border-t border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-[#86868B]">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5 text-white">
                      <CheckCircle2 className="size-3.5 text-[#30D158]" />
                      <span>Zero prior coding or CAD needed</span>
                    </span>
                    <span className="hidden sm:flex items-center gap-1.5 text-white">
                      <CheckCircle2 className="size-3.5 text-[#0A84FF]" />
                      <span>Takes home physical 3D print</span>
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-[#86868B]">
                    Holiday &amp; Weekend Cohorts · Max 16
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. THE PHILOSOPHY: "Screen time transformed. From passive to active."      */}
      {/* ========================================================================= */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-[1380px] mx-auto border-t border-white/[0.08]" id="difference">
        
        <div className="max-w-3xl text-left mb-16 space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-[#0A84FF] block">
            The Show3D Philosophy
          </span>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08]">
            Screen time transformed.
            <br />
            <span className="text-[#86868B]">From passive consumers to active inventors.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#86868B] leading-relaxed pt-2">
            Every parent sees it: hours lost to passive scrolling, video game loops, or letting AI generate generic school essays. Show3D was engineered as the antidote. Here, students don’t outsource their thinking. They develop spatial intuition, challenge algorithmic outputs, and prove that the most powerful intelligence in the room is their own.
          </p>
        </div>

        {/* 3 Apple Feature Pillars (Tricolon) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          
          <div className="rounded-[28px] bg-[#1C1C1E] border border-white/[0.08] p-8 space-y-4 hover:border-white/[0.18] transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#0D2137] border border-[#0A84FF]/30 flex items-center justify-center text-[#0A84FF]">
              <Sparkles className="size-6" />
            </div>
            <h3 className="font-display text-2xl font-bold text-white tracking-tight">
              Human Judgment First.
            </h3>
            <p className="text-sm text-[#86868B] leading-relaxed">
              <strong className="text-white font-medium">Zero black-box offloading.</strong> We measure creative intent. Students formulate 5-part engineering prompts (PARTS), challenge AI hallucinations, and make every final architectural call.
            </p>
            <div className="pt-2 font-mono text-xs text-[#0A84FF]">
              94% Human Intent Metric
            </div>
          </div>

          <div className="rounded-[28px] bg-[#1C1C1E] border border-white/[0.08] p-8 space-y-4 hover:border-white/[0.18] transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#2C2405] border border-[#FFD60A]/30 flex items-center justify-center text-[#FFD60A]">
              <Box className="size-6" />
            </div>
            <h3 className="font-display text-2xl font-bold text-white tracking-tight">
              True Mathematical Volume.
            </h3>
            <p className="text-sm text-[#86868B] leading-relaxed">
              <strong className="text-white font-medium">Beyond flat 2D images.</strong> Young inventors manipulate X-Y-Z vertices, polygon meshes, and ergonomic sightlines—building genuine spatial computing intuition.
            </p>
            <div className="pt-2 font-mono text-xs text-[#FFD60A]">
              Watertight .STL &amp; .GLTF
            </div>
          </div>

          <div className="rounded-[28px] bg-[#1C1C1E] border border-white/[0.08] p-8 space-y-4 hover:border-white/[0.18] transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#0E2914] border border-[#30D158]/30 flex items-center justify-center text-[#30D158]">
              <Printer className="size-6" />
            </div>
            <h3 className="font-display text-2xl font-bold text-white tracking-tight">
              Physical Manifestation.
            </h3>
            <p className="text-sm text-[#86868B] leading-relaxed">
              <strong className="text-white font-medium">Ideas they can hold.</strong> Every virtual design is sliced, verified for structural integrity, and fabricated on our precision 3D printer farm in non-toxic, eco-friendly PLA.
            </p>
            <div className="pt-2 font-mono text-xs text-[#30D158]">
              Handed Directly to Your Child
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. "SIX MASTERCLASSES" — APPLE CURRICULUM BENTO GRID                       */}
      {/* ========================================================================= */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-[1380px] mx-auto border-t border-white/[0.08]" id="curriculum">
        
        {/* Section Header + Filter Segmented Control */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 text-left">
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#0A84FF] block">
              The 6-Stage Curriculum
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Six masterclasses.
              <br />
              <span className="text-[#86868B]">One profound leap in capability.</span>
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div
            className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 px-1 rounded-full bg-[#1C1C1E] border border-white/[0.08]"
            role="tablist"
            aria-label="Masterclass categories"
          >
            {(['All', 'Create', 'Develop', 'Explore', 'Learn'] as LabCategory[]).map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  id={`filter-category-${cat.toLowerCase()}`}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 min-h-[40px] rounded-full text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-white text-black font-semibold shadow'
                      : 'text-[#86868B] hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Apple Masterclass Bento Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {filteredExperiments.map((exp, idx) => {
            const colSpanClass =
              activeCategory === 'All' && exp.spanWide
                ? 'col-span-12 lg:col-span-7'
                : activeCategory === 'All'
                ? 'col-span-12 lg:col-span-5'
                : 'col-span-12 lg:col-span-6';

            return (
              <div
                key={exp.id}
                className={`${colSpanClass} rounded-[28px] bg-[#1C1C1E] border border-white/[0.08] p-6 sm:p-8 flex flex-col justify-between text-left group hover:border-white/[0.18] transition-all`}
              >
                <div className="space-y-5">
                  {/* Metadata Row */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span
                        className="px-3 py-1 rounded-full text-[11px] font-mono font-medium"
                        style={{ backgroundColor: exp.tintBg, color: exp.accentHex }}
                      >
                        {exp.code}
                      </span>
                      <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-white/[0.05] text-[#86868B] border border-white/[0.06]">
                        {exp.moeLearn}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-[#86868B] flex items-center gap-1.5">
                      <Clock className="size-3.5" />
                      <span>{exp.duration}</span>
                    </span>
                  </div>

                  {/* Tonal Visual Plate */}
                  <div
                    className="h-36 sm:h-44 rounded-2xl border border-white/[0.08] flex items-center justify-center p-4 overflow-hidden relative"
                    style={{ backgroundColor: exp.tintBg }}
                  >
                    {exp.visualKind === 'wireframe' && (
                      <svg viewBox="0 0 240 110" className="w-48 h-28" preserveAspectRatio="xMidYMid meet">
                        <polygon points="120,12 190,42 190,88 120,104 50,88 50,42" fill="none" stroke="#64D2FF" strokeWidth="1.5" />
                        <line x1="120" y1="12" x2="120" y2="104" stroke="#64D2FF" strokeWidth="1" strokeDasharray="3 3" />
                        <line x1="50" y1="42" x2="190" y2="42" stroke="#64D2FF" strokeWidth="1" strokeDasharray="3 3" />
                        <circle cx="120" cy="12" r="3.5" fill="#FFFFFF" />
                        <circle cx="190" cy="42" r="3.5" fill="#64D2FF" />
                        <circle cx="50" cy="42" r="3.5" fill="#64D2FF" />
                        <circle cx="120" cy="58" r="4" fill="#30D158" />
                      </svg>
                    )}
                    {exp.visualKind === 'prompt' && (
                      <div className="flex flex-wrap items-center justify-center gap-2 max-w-xs">
                        {['P: Eco-Architect', 'A: Shade Canopy', 'R: Courtyard', 'T: Tensile PTFE', 'S: 3mm Ribs'].map((chip) => (
                          <span key={chip} className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-[#000000]/80 border border-[#FFD60A]/40 text-[#FFD60A] font-mono text-[11px] sm:text-xs">
                            {chip}
                          </span>
                        ))}
                      </div>
                    )}
                    {exp.visualKind === 'synthesis' && (
                      <svg viewBox="0 0 240 110" className="w-48 h-28" preserveAspectRatio="xMidYMid meet">
                        <ellipse cx="120" cy="88" rx="75" ry="14" fill="#000000" stroke="#30D158" strokeWidth="1" />
                        <path d="M 120 20 Q 175 38 190 70 Q 150 85 120 72 Q 90 85 50 70 Q 65 38 120 20 Z" fill="#30D158" fillOpacity="0.3" stroke="#30D158" strokeWidth="1.75" />
                        <line x1="120" y1="20" x2="120" y2="88" stroke="#FFFFFF" strokeWidth="2" />
                      </svg>
                    )}
                    {exp.visualKind === 'materials' && (
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-[#FFFFFF] to-[#86868B] border border-white/30 shadow-inner" title="Solar White 0.85 Albedo" />
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-[#64D2FF] to-[#0D2137] border border-[#64D2FF]/50" title="Anodized Sky Aluminum" />
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-[#30D158] to-[#0E2914] border border-[#30D158]/50" title="Biophilic PLA Filament" />
                      </div>
                    )}
                    {exp.visualKind === 'ergonomics' && (
                      <svg viewBox="0 0 240 110" className="w-48 h-28" preserveAspectRatio="xMidYMid meet">
                        <line x1="45" y1="90" x2="195" y2="90" stroke="#86868B" strokeWidth="2" />
                        <line x1="95" y1="90" x2="155" y2="22" stroke="#FF375F" strokeWidth="3" strokeLinecap="round" />
                        <path d="M 125 90 A 30 30 0 0 0 112 65" fill="none" stroke="#FFD60A" strokeWidth="1.5" strokeDasharray="2 2" />
                        <text x="138" y="75" fill="#FFD60A" fontSize="11" fontFamily="JetBrains Mono, monospace">60° TILT</text>
                        <circle cx="140" cy="38" r="6" fill="#FF375F" />
                      </svg>
                    )}
                    {exp.visualKind === 'certificate' && (
                      <div className="flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-2.5 sm:py-3 rounded-2xl bg-[#000000]/85 border border-[#30D158]/30">
                        <Award className="size-8 sm:size-9 text-[#30D158] shrink-0" />
                        <div>
                          <div className="text-[10px] font-mono uppercase text-[#30D158]">MOE 21CC VERIFIED</div>
                          <div className="text-xs sm:text-sm font-bold text-white">94.0% Human Creative Intent</div>
                          <div className="text-[10px] sm:text-[11px] font-mono text-[#86868B]">Physical PLA Print + DSA Record</div>
                        </div>
                      </div>
                    )}

                    <span className="absolute bottom-2.5 right-3 px-2.5 py-0.5 rounded-full bg-[#000000]/80 text-[10px] font-mono text-white border border-white/[0.08]">
                      Badge: {exp.badgeName}
                    </span>
                  </div>

                  {/* Title & Copy */}
                  <div className="space-y-2">
                    <div className="text-xs font-medium text-[#0A84FF] font-mono">{exp.subtitle}</div>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
                      {exp.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#86868B] leading-relaxed">
                      {exp.summary}
                    </p>
                  </div>

                  {/* Hands-On Challenge */}
                  <div className="p-3 sm:p-3.5 rounded-xl bg-[#000000]/50 border border-white/[0.06] text-xs">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#0A84FF] block mb-1">
                      Hands-On Challenge:
                    </span>
                    <span className="text-white leading-relaxed">
                      {exp.studentChallenge}
                    </span>
                  </div>

                  {/* Learning Objectives */}
                  <div className="space-y-1.5 pt-1">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-[#86868B]">
                      Key Takeaways:
                    </div>
                    <ul className="space-y-1">
                      {exp.learningObjectives.map((obj, oIdx) => (
                        <li key={oIdx} className="flex items-start gap-2 text-xs text-[#86868B]">
                          <CheckCircle2 className="size-3.5 text-[#30D158] shrink-0 mt-0.5" />
                          <span className="text-[#F5F5F7]">{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Footer Link */}
                <div className="pt-5 mt-5 border-t border-white/[0.08] flex items-center justify-between">
                  <button
                    id={`experiment-card-btn-${exp.id}`}
                    onClick={() => onSelectModule(exp.id)}
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#0A84FF] group-hover:text-white transition-colors min-h-[44px]"
                  >
                    <span>{exp.ctaText}</span>
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                  <span className="text-[11px] font-mono text-[#86868B]">
                    {exp.category}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. TANGIBLE PROOF: "Nothing stays trapped inside a browser."                */}
      {/* ========================================================================= */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-[1380px] mx-auto border-t border-white/[0.08]" id="outcomes">
        
        <div className="max-w-3xl text-left mb-16 space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-[#30D158] block">
            Tangible Outcomes &amp; Credential Proof
          </span>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08]">
            Nothing stays trapped
            <br />
            <span className="text-[#86868B]">inside a browser.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#86868B] leading-relaxed pt-2">
            Most enrichment camps leave students with a forgotten folder of digital files. Show3D creations graduate into the physical world—giving your child tangible evidence of mastery that builds lasting confidence for school and beyond.
          </p>
        </div>

        {/* 4 Proof Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          
          <div className="rounded-[28px] bg-[#1C1C1E] border border-white/[0.08] p-7 flex flex-col justify-between space-y-6 hover:border-white/[0.18] transition-all">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#0E2914] border border-[#30D158]/30 flex items-center justify-center text-[#30D158]">
                <Printer className="size-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-white tracking-tight">
                Physical 3D Print
              </h3>
              <p className="text-xs sm:text-sm text-[#86868B] leading-relaxed">
                <strong className="text-white font-medium">Fabricated in eco-PLA.</strong> Sliced on our precision printer farm and handed directly to your child at graduation to display on their study desk.
              </p>
            </div>
            <div className="pt-4 border-t border-white/[0.06] text-xs font-mono text-[#30D158]">
              Tangible Proof of Work
            </div>
          </div>

          <div className="rounded-[28px] bg-[#1C1C1E] border border-white/[0.08] p-7 flex flex-col justify-between space-y-6 hover:border-white/[0.18] transition-all">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#0D2137] border border-[#0A84FF]/30 flex items-center justify-center text-[#0A84FF]">
                <Award className="size-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-white tracking-tight">
                Verified DSA Credential
              </h3>
              <p className="text-xs sm:text-sm text-[#86868B] leading-relaxed">
                <strong className="text-white font-medium">Verifiable Certificate.</strong> Includes ID (SHOW3D-TPSS-2026-0842) documenting MOE 21CC alignment and their 94% Human Intent score for school portfolios.
              </p>
            </div>
            <div className="pt-4 border-t border-white/[0.06] text-xs font-mono text-[#0A84FF]">
              MOE 21CC &amp; DSA Ready
            </div>
          </div>

          <div className="rounded-[28px] bg-[#1C1C1E] border border-white/[0.08] p-7 flex flex-col justify-between space-y-6 hover:border-white/[0.18] transition-all">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#2C2405] border border-[#FFD60A]/30 flex items-center justify-center text-[#FFD60A]">
                <Users className="size-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-white tracking-tight">
                Parent Showcase Pitch
              </h3>
              <p className="text-xs sm:text-sm text-[#86868B] leading-relaxed">
                <strong className="text-white font-medium">Live graduation event.</strong> Parents are invited to watch their child articulate their design brief, curvature decisions, and engineering trade-offs.
              </p>
            </div>
            <div className="pt-4 border-t border-white/[0.06] text-xs font-mono text-[#FFD60A]">
              Final Day Graduation Pitch
            </div>
          </div>

          <div className="rounded-[28px] bg-[#1C1C1E] border border-white/[0.08] p-7 flex flex-col justify-between space-y-6 hover:border-white/[0.18] transition-all">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#092332] border border-[#64D2FF]/30 flex items-center justify-center text-[#64D2FF]">
                <Box className="size-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-white tracking-tight">
                30-Day Studio Access
              </h3>
              <p className="text-xs sm:text-sm text-[#86868B] leading-relaxed">
                <strong className="text-white font-medium">Continued iteration at home.</strong> Students retain full browser access after camp to continue designing, refining, and exporting 3D meshes.
              </p>
            </div>
            <div className="pt-4 border-t border-white/[0.06] text-xs font-mono text-[#64D2FF]">
              Runs in Any Web Browser
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. INTERACTIVE PHYSICS SANDBOX: "Defy Gravity." (MATTER.JS COMPLETE)       */}
      {/* ========================================================================= */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-[1380px] mx-auto border-t border-white/[0.08]" id="gravity-lab">
        <div className="max-w-3xl text-left mb-12 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-[#0A84FF] block">
            Spatial Intuition in Action
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Defy gravity.
          </h2>
          <p className="text-base sm:text-lg text-[#86868B] leading-relaxed">
            Drag, toss, or invert gravity. Our real-time physics sandbox gives students immediate tactile feedback on mass, elasticity, and spatial collisions—grounding artificial intelligence in the immutable laws of physics.
          </p>
        </div>

        {/* 100% Intact Matter.js Physics Animation Component */}
        <FallingPhysicsStage onSelectModule={onSelectModule} />
      </section>

      {/* ========================================================================= */}
      {/* 6. CHILD SAFETY & PRIVACY: "Child privacy. Built in from the first click." */}
      {/* ========================================================================= */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-[1380px] mx-auto border-t border-white/[0.08]" id="safety">
        
        <div className="max-w-3xl text-left mb-16 space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-[#30D158] block">
            Privacy &amp; Child Protection
          </span>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08]">
            Child privacy.
            <br />
            <span className="text-[#86868B]">Built in from the first click.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#86868B] leading-relaxed pt-2">
            In an era of unchecked algorithmic scraping, your child’s privacy and safety are non-negotiable. Show3D is engineered to the highest institutional standards, guaranteeing a clean, distraction-free environment.
          </p>
        </div>

        {/* 4 Apple Privacy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          
          <div className="rounded-[28px] bg-[#1C1C1E] border border-white/[0.08] p-7 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#0E2914] border border-[#30D158]/30 flex items-center justify-center text-[#30D158]">
              <Lock className="size-5" />
            </div>
            <h3 className="font-display text-lg font-bold text-white">
              Zero Model Training
            </h3>
            <p className="text-xs text-[#86868B] leading-relaxed">
              Your child’s ideas, creative prompts, and 3D geometries are strictly private. They are <strong className="text-white font-medium">never used to train public AI models</strong>. Ever.
            </p>
          </div>

          <div className="rounded-[28px] bg-[#1C1C1E] border border-white/[0.08] p-7 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#0D2137] border border-[#0A84FF]/30 flex items-center justify-center text-[#0A84FF]">
              <ShieldCheck className="size-5" />
            </div>
            <h3 className="font-display text-lg font-bold text-white">
              Singapore PDPA Compliant
            </h3>
            <p className="text-xs text-[#86868B] leading-relaxed">
              Certified for Singapore Age 13+ safety requirements with automated safe-prompt content moderation and strict data minimization.
            </p>
          </div>

          <div className="rounded-[28px] bg-[#1C1C1E] border border-white/[0.08] p-7 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#2C2405] border border-[#FFD60A]/30 flex items-center justify-center text-[#FFD60A]">
              <Users className="size-5" />
            </div>
            <h3 className="font-display text-lg font-bold text-white">
              1:8 Mentor Ratio
            </h3>
            <p className="text-xs text-[#86868B] leading-relaxed">
              Small cohorts capped at 16 students led by 2 trained educators. Real-time telemetry ensures struggling learners get immediate, personal support.
            </p>
          </div>

          <div className="rounded-[28px] bg-[#1C1C1E] border border-white/[0.08] p-7 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#092332] border border-[#64D2FF]/30 flex items-center justify-center text-[#64D2FF]">
              <Cpu className="size-5" />
            </div>
            <h3 className="font-display text-lg font-bold text-white">
              Port 443 Web Native
            </h3>
            <p className="text-xs text-[#86868B] leading-relaxed">
              Runs in any modern web browser. 100% compatible with school-issued MOE Personal Learning Devices (Chromebooks, iPads, Windows) with zero installs.
            </p>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. THE LINEUP: "Calibrated for every stage of growth." (AGE TIERS)          */}
      {/* ========================================================================= */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-[1380px] mx-auto border-t border-white/[0.08]" id="lineup">
        
        <div className="max-w-3xl text-left mb-16 space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-[#0A84FF] block">
            Age-Calibrated Cohorts
          </span>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08]">
            Calibrated for every stage
            <br />
            <span className="text-[#86868B]">of growth.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#86868B] leading-relaxed pt-2">
            Whether your child is taking their first steps beyond 2D screens or preparing an architectural portfolio for university admission, Show3D meets them with appropriate rigor.
          </p>
        </div>

        {/* 3 Age Tracks + Schedule Matrix in 12-col layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left 7 Cols: 3 Age Tracks */}
          <div className="lg:col-span-7 space-y-4 text-left flex flex-col justify-between">
            {[
              {
                age: 'UPPER PRIMARY · AGES 10–12',
                title: 'Junior Creator Track',
                project: 'Original 3D Desk Companion, Custom Mascot, or Study Organizer',
                skills: 'Playful spatial vocabulary, X-Y-Z orientation, early DSA portfolio confidence.',
                badge: 'Max 8 per mentor · Beginner Friendly',
                accent: '#30D158',
                tint: '#0E2914'
              },
              {
                age: 'SECONDARY 1–4 · AGES 13–16 (MOST POPULAR)',
                title: 'Teen Innovator Track',
                project: 'Courtyard Tensile Solar Pavilion or Sustainable Urban Prototype',
                skills: 'PARTS prompt engineering, parametric levers, mesh slicing & 94% Human Intent score.',
                badge: 'MOE D&T & 21CC Aligned',
                accent: '#0A84FF',
                tint: '#0D2137'
              },
              {
                age: 'JC, ITE & POLYTECHNIC · AGES 16–20',
                title: 'Young Specialist Track',
                project: 'Portfolio-Grade Architectural Capstone or Industrial Product Prototype',
                skills: 'Advanced polygon topology, boolean tolerances, and .GLTF / Blender / CAD workflows.',
                badge: 'University & Career Portfolio',
                accent: '#FFD60A',
                tint: '#2C2405'
              }
            ].map((tier, i) => (
              <div
                key={i}
                className="rounded-[24px] bg-[#1C1C1E] border border-white/[0.08] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-white/[0.18] transition-all"
              >
                <div className="space-y-1.5 max-w-xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold"
                      style={{ backgroundColor: tier.tint, color: tier.accent }}
                    >
                      {tier.age}
                    </span>
                    <span className="text-[11px] font-mono text-[#86868B]">{tier.badge}</span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-white">{tier.title}</h3>
                  <p className="text-xs text-white">
                    <strong className="text-[#86868B] font-normal">Capstone: </strong>
                    {tier.project}
                  </p>
                  <p className="text-xs text-[#86868B]">{tier.skills}</p>
                </div>

                <button
                  onClick={onStartLearning}
                  className="px-4 py-2.5 rounded-full bg-[#2C2C2E] hover:bg-[#3A3A3C] text-white border border-white/[0.08] text-xs font-semibold shrink-0 self-start sm:self-center flex items-center gap-1.5 transition-colors"
                >
                  <span>Try Track</span>
                  <ArrowRight className="size-3.5" />
                </button>
              </div>
            ))}
          </div>

          {/* Right 5 Cols: Schedule Selector Card */}
          <div className="lg:col-span-5 rounded-[28px] bg-[#1C1C1E] border border-white/[0.08] p-6 sm:p-8 flex flex-col justify-between text-left">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0E2914] text-[#30D158] text-[11px] font-mono">
                <span>FLEXIBLE COHORT FORMATS</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-white">
                Choose the schedule that fits your family
              </h3>
              
              <div className="grid grid-cols-2 gap-2 p-1 rounded-full bg-[#000000] border border-white/[0.08]">
                <button
                  id="format-holiday-btn"
                  onClick={() => setSelectedFormat('holiday')}
                  className={`py-2 px-3 rounded-full text-xs font-semibold transition-all ${
                    selectedFormat === 'holiday'
                      ? 'bg-white text-black'
                      : 'text-[#86868B] hover:text-white'
                  }`}
                >
                  5-Day Holiday Camp
                </button>
                <button
                  id="format-term-btn"
                  onClick={() => setSelectedFormat('term')}
                  className={`py-2 px-3 rounded-full text-xs font-semibold transition-all ${
                    selectedFormat === 'term'
                      ? 'bg-white text-black'
                      : 'text-[#86868B] hover:text-white'
                  }`}
                >
                  6-Week Weekend Lab
                </button>
              </div>

              <p className="text-xs sm:text-sm text-[#86868B] leading-relaxed pt-2">
                {selectedFormat === 'holiday'
                  ? 'Runs during Singapore March, June, September & Nov/Dec school holidays (Mon–Fri, 9:00am–12:30pm or 1:30pm–5:00pm). Includes physical 3D print graduation.'
                  : 'Runs during school terms on Saturdays or Sundays (2.0 hours per weekly session over 6 weeks). Paced for zero exam stress and deep portfolio building.'}
              </p>

              <div className="space-y-2.5 pt-2">
                {[
                  { label: 'Cohort Size', value: 'Strictly capped at 16 students' },
                  { label: 'Instructor Ratio', value: '1:8 dedicated STEM mentorship' },
                  { label: 'Physical Deliverable', value: 'Custom 3D print in eco-PLA' },
                  { label: 'Credential', value: 'MOE 21CC & DSA Verified Certificate' },
                ].map((item, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-[#000000]/60 border border-white/[0.06] flex items-center justify-between text-xs">
                    <span className="text-[#86868B]">{item.label}</span>
                    <span className="font-medium text-white">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/[0.06] flex items-center justify-between">
              <span className="text-xs text-[#86868B]">100% web-based over Port 443</span>
              <button
                onClick={onStartLearning}
                className="text-xs font-semibold text-[#0A84FF] hover:underline flex items-center gap-1"
              >
                <span>Sample Lesson</span>
                <ArrowRight className="size-3.5" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. THE TRUST VAULT: "Every parent question answered." (ACCORDION)          */}
      {/* ========================================================================= */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-[1380px] mx-auto border-t border-white/[0.08]" id="faq">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left 7 Columns: Parent FAQ Accordion */}
          <div className="lg:col-span-7 text-left space-y-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#0A84FF] block mb-2">
                Parent Questions Answered
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white">
                Everything you need to know before enrolling.
              </h2>
            </div>

            <div className="space-y-3">
              {[
                {
                  q: "Does my child need prior coding, 3D modeling, or art experience?",
                  a: "None at all. Show3D is engineered from ground zero for complete beginners. Guided micro-lessons and dedicated 1:8 mentors walk students step-by-step from their first X-Y-Z wireframe to a finished, physical 3D-printed prototype."
                },
                {
                  q: "How do I know my child is actually learning and not just letting AI do the work?",
                  a: "Show3D was specifically created as the antidote to cognitive offloading. Every module requires students to write structured PARTS engineering briefs, evaluate AI topology candidates, manipulate parametric curvature levers, and verify wall thickness. We quantify this with our 94% Human Creative Intent metric."
                },
                {
                  q: "How does this help with Direct School Admission (DSA) or school portfolios in Singapore?",
                  a: "Graduates earn an official Digital Competency Certificate with a verifiable credential ID (e.g. SHOW3D-TPSS-2026-0842) documenting MOE 21st Century Competencies (21CC), D&T curriculum alignment, and their 94% Human Intent score—providing concrete evidence of original problem-solving."
                },
                {
                  q: "What laptop or tablet does my child need to bring?",
                  a: "Show3D runs 100% inside any modern web browser over HTTPS Port 443. Students can use their school-issued MOE Personal Learning Device (PLD Chromebook, iPad, or Windows laptop) or any home laptop with zero software downloads."
                },
                {
                  q: "When and how do we receive the physical 3D-printed invention?",
                  a: "During the final modules, students verify wall thickness and prepare their 3D mesh for slicing. Our precision 3D printer farm fabricates each child's custom model in non-toxic, eco-friendly PLA filament—presented directly to your child at the graduation showcase."
                },
                {
                  q: "How is my child's privacy and online safety protected?",
                  a: "We adhere strictly to Singapore PDPA standards. Cohorts use managed SSO accounts with zero personal student emails or phone numbers collected, automated safe-prompt filters, and a strict guarantee: zero student prompts or 3D meshes are ever used to train AI models."
                }
              ].map((faq, idx) => (
                <div
                  key={idx}
                  className="rounded-[24px] bg-[#1C1C1E] border border-white/[0.08] overflow-hidden transition-colors"
                >
                  <button
                    id={`faq-toggle-${idx}`}
                    onClick={() => toggleFaq(idx)}
                    className="w-full py-4 sm:py-5 px-5 sm:px-6 min-h-[48px] text-left flex items-center justify-between text-sm sm:text-base font-semibold text-white hover:text-[#0A84FF] transition-colors"
                  >
                    <span>{faq.q}</span>
                    {expandedFaq === idx ? (
                      <ChevronUp className="size-4 text-[#0A84FF] shrink-0 ml-4" />
                    ) : (
                      <ChevronDown className="size-4 text-[#86868B] shrink-0 ml-4" />
                    )}
                  </button>
                  <div className={`labs-accordion-grid ${expandedFaq === idx ? 'open' : ''}`}>
                    <div className="labs-accordion-content">
                      <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-[#86868B] leading-relaxed border-t border-white/[0.06]">
                        {faq.a}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right 5 Columns: Dual Action Cards */}
          <div className="lg:col-span-5 space-y-6 text-left">
            
            {/* Card 1: For Parents & Young Creators */}
            <div className="rounded-[28px] bg-[#0D2137] border border-[#0A84FF]/30 p-7 sm:p-8 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#000000]/60 text-[#0A84FF] text-[11px] font-mono">
                <span>LIMITED COHORT SEATS</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Ready to shape the 3D world?
              </h3>
              <p className="text-sm text-[#F5F5F7]/80 leading-relaxed">
                Test-drive our interactive Student Lab right now in your browser, or review our child safety architecture.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  id="cta-launch-student-lab"
                  onClick={onStartLearning}
                  className="px-6 py-3.5 rounded-full bg-[#0A84FF] hover:bg-[#0071E3] text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-md"
                >
                  <span>Launch Student Lab</span>
                  <ArrowRight className="size-4" />
                </button>
                {onOpenSafetyModal && (
                  <button
                    id="cta-open-safety-modal"
                    onClick={onOpenSafetyModal}
                    className="px-5 py-3.5 rounded-full bg-[#000000]/80 hover:bg-[#000000] text-white border border-white/[0.12] font-medium text-xs sm:text-sm flex items-center gap-2 transition-colors"
                  >
                    <ShieldCheck className="size-4 text-[#30D158]" />
                    <span>Safety &amp; PDPA</span>
                  </button>
                )}
              </div>
            </div>

            {/* Card 2: For Institutional School Partners & D&T Educators */}
            <div className="rounded-[28px] bg-[#1C1C1E] border border-white/[0.08] p-7 sm:p-8 space-y-5" id="schools">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2C2405] text-[#FFD60A] text-[11px] font-mono">
                <span>INSTITUTIONAL &amp; SCHOOL PARTNERS</span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
                School Head, D&amp;T Teacher, or Enrichment Partner?
              </h3>
              <p className="text-xs sm:text-sm text-[#86868B] leading-relaxed">
                Show3D deploys as a turnkey “Vendor-Taught, Teacher-Facilitated” programme—complete with a 28-student live Facilitator Command Hub, MOE “Four Learns” rubrics, and GeBIZ quotation packs.
              </p>
              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                <button
                  id="cta-open-instructor-hub"
                  onClick={onOpenTeacherView}
                  className="px-5 py-2.5 rounded-full bg-white hover:bg-[#F5F5F7] text-black text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Users className="size-3.5" />
                  <span>Facilitator Command Hub</span>
                </button>
                {onOpenProcurementModal && (
                  <button
                    id="cta-open-procurement-modal"
                    onClick={onOpenProcurementModal}
                    className="px-4 py-2.5 rounded-full bg-[#2C2C2E] hover:bg-[#3A3A3C] text-white border border-white/[0.08] text-xs font-medium flex items-center gap-1.5 transition-colors"
                  >
                    <span>GeBIZ &amp; Funding Pack</span>
                    <ArrowUpRight className="size-3.5 text-[#FFD60A]" />
                  </button>
                )}
                {onOpenPedagogyModal && (
                  <button
                    id="cta-open-pedagogy-modal"
                    onClick={onOpenPedagogyModal}
                    className="px-4 py-2.5 rounded-full bg-[#2C2C2E] hover:bg-[#3A3A3C] text-[#86868B] hover:text-white border border-white/[0.08] text-xs font-medium flex items-center gap-1.5 transition-colors"
                  >
                    <span>MOE Pedagogy</span>
                  </button>
                )}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. FINALE CTA: "Give your child the unfair advantage of creative agency." */}
      {/* ========================================================================= */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-[1380px] mx-auto border-t border-white/[0.08] text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
            Give your child the unfair advantage of creative agency.
          </h2>
          <p className="text-base sm:text-xl text-[#86868B] leading-relaxed">
            Cohorts are strictly limited to 16 students with a 1:8 mentor ratio. Reserve your child’s seat in the upcoming school holiday cohort, or explore a free sample lesson now.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={onStartLearning}
              className="px-8 py-4 rounded-full bg-[#0A84FF] hover:bg-[#0071E3] text-white font-semibold text-base flex items-center gap-2 shadow-lg shadow-[#0A84FF]/25 transition-all"
            >
              <span>Launch Interactive Lesson</span>
              <ArrowRight className="size-5" />
            </button>
            {onOpenSafetyModal && (
              <button
                onClick={onOpenSafetyModal}
                className="px-6 py-4 rounded-full bg-[#1C1C1E] hover:bg-[#2C2C2E] text-white border border-white/[0.12] font-medium text-base flex items-center gap-2 transition-colors"
              >
                <ShieldCheck className="size-5 text-[#30D158]" />
                <span>Read Safety &amp; PDPA Spec</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. APPLE HIG DARK FOOTER                                                 */}
      {/* ========================================================================= */}
      <footer className="border-t border-white/[0.08] bg-[#0E0E10] py-14 px-4 sm:px-6 lg:px-8 text-xs text-[#86868B]">
        <div className="max-w-[1380px] mx-auto space-y-10">
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-white/[0.06]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#1C1C1E] border border-white/[0.12] flex items-center justify-center text-[#0A84FF]">
                <Box className="size-4" />
              </div>
              <div>
                <span className="font-display font-bold text-white text-base">Show3D Academy</span>
                <span className="text-[#86868B] ml-2">· Spatial AI &amp; 3D Creator Programme</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#86868B] mr-2">
                Environments:
              </span>
              <button
                onClick={onStartLearning}
                className="px-3.5 py-1.5 rounded-full bg-[#1C1C1E] hover:bg-[#2C2C2E] text-white border border-white/[0.08] transition-colors"
              >
                Student Keynote Lab
              </button>
              <button
                onClick={onOpenTeacherView}
                className="px-3.5 py-1.5 rounded-full bg-[#1C1C1E] hover:bg-[#2C2C2E] text-white border border-white/[0.08] transition-colors"
              >
                Facilitator Classroom Hub
              </button>
              {onLaunchCanvasModal && (
                <button
                  onClick={onLaunchCanvasModal}
                  className="px-3.5 py-1.5 rounded-full bg-[#1C1C1E] hover:bg-[#2C2C2E] text-[#64D2FF] border border-white/[0.08] transition-colors"
                >
                  Show3D WebGL Canvas
                </button>
              )}
              <a
                href="#gravity-lab"
                className="px-3.5 py-1.5 rounded-full bg-[#1C1C1E] hover:bg-[#2C2C2E] text-[#64D2FF] border border-white/[0.08] transition-colors"
              >
                Gravity Physics Lab
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-6">
              {onOpenSafetyModal && (
                <button onClick={onOpenSafetyModal} className="hover:text-white transition-colors">
                  Child Safety &amp; Singapore PDPA
                </button>
              )}
              {onOpenProcurementModal && (
                <button onClick={onOpenProcurementModal} className="hover:text-white transition-colors">
                  GeBIZ &amp; School Procurement
                </button>
              )}
              {onOpenPedagogyModal && (
                <button onClick={onOpenPedagogyModal} className="hover:text-white transition-colors">
                  MOE Four Learns Framework
                </button>
              )}
            </div>

            <div className="font-mono text-[11px] text-[#86868B]">
              HTTPS Port 443 Verified · Zero Student Data AI Training
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
};
