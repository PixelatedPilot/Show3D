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
  Orbit
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
    tag: 'CREATE · MODULE 03',
    name: 'Courtyard Tensile Pavilion',
    shortDesc: 'Engineer tropical campus shade & 450W solar micro-grids in 3D.',
    fullDesc: 'An interactive spatial AI challenge where students solve real 34°C afternoon heat on campus by balancing parabolic canopy curvature, high-albedo fabrics, and renewable solar wattage.',
    ctaLabel: 'Try it now — Courtyard Pavilion',
    accentHex: '#A8C7FA',
    tintBg: '#162238',
    pillTextHex: '#062E6F',
    moeDomain: 'Learn to Use AI · Spatial Synthesis'
  },
  {
    id: 'prompt-forge',
    moduleId: 2,
    tag: 'DEVELOP · MODULE 02',
    name: 'The Prompt Forge (PARTS)',
    shortDesc: 'Turn structured engineering logic into clean 3D geometry.',
    fullDesc: 'Replace random prompt guessing with the canonical 5-part PARTS recipe (Persona, Aim, Recipients, Theme, Structure) to synthesize watertight, printable 3D meshes.',
    ctaLabel: 'Try it now — The Prompt Forge',
    accentHex: '#FDD663',
    tintBg: '#2B2210',
    pillTextHex: '#3D2C00',
    moeDomain: 'Learn to Use AI · Prompt Architecture'
  },
  {
    id: 'material-lab',
    moduleId: 4,
    tag: 'DEVELOP · MODULE 04',
    name: 'The Material Alchemist',
    shortDesc: 'Test real-world PBR shaders, thermal albedo, and PLA durability.',
    fullDesc: 'Experiment with Physically Based Rendering (PBR) surface finishes—comparing solar-reflective white PTFE, brushed aluminum, and eco-friendly bamboo for physical fabrication.',
    ctaLabel: 'Try it now — Material Lab',
    accentHex: '#6DD58C',
    tintBg: '#13281C',
    pillTextHex: '#073818',
    moeDomain: 'Learn to Use AI · Physical Shaders'
  },
  {
    id: 'peer-lab',
    moduleId: 5,
    tag: 'EXPLORE · MODULE 05',
    name: 'Ergonomics & Spatial Pins',
    shortDesc: 'Test 60° viewing angles and anchor 3D peer critique pins.',
    fullDesc: 'An experimental collaborative stage where students verify 60° ergonomic sightlines, inspect wall thickness for 3D slicing, and pin constructive D&T feedback directly onto 3D coordinates.',
    ctaLabel: 'Try it now — Ergonomics Lab',
    accentHex: '#FFB4AB',
    tintBg: '#2E1717',
    pillTextHex: '#5C110B',
    moeDomain: 'Learn With AI · Collaborative Critique'
  },
  {
    id: 'dimension-3d',
    moduleId: 1,
    tag: 'CREATE · MODULE 01',
    name: 'The 3D Dimension',
    shortDesc: 'Inspect X-Y-Z coordinates and wireframe skeletons from 360°.',
    fullDesc: 'Discover how spatial computing builds true mathematical volume using vertices, edges, and polygon meshes—preparing young inventors to move beyond flat 2D screens.',
    ctaLabel: 'Try it now — The 3D Dimension',
    accentHex: '#A8C7FA',
    tintBg: '#162238',
    pillTextHex: '#062E6F',
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
  1: { category: 'Create', accentHex: '#A8C7FA', tintBg: '#162238', spanWide: true, visualKind: 'wireframe' },
  2: { category: 'Develop', accentHex: '#FDD663', tintBg: '#2B2210', visualKind: 'prompt' },
  3: { category: 'Create', accentHex: '#6DD58C', tintBg: '#13281C', visualKind: 'synthesis' },
  4: { category: 'Develop', accentHex: '#A8C7FA', tintBg: '#1F2430', visualKind: 'materials' },
  5: { category: 'Explore', accentHex: '#FFB4AB', tintBg: '#2E1816', visualKind: 'ergonomics' },
  6: { category: 'Learn', accentHex: '#6DD58C', tintBg: '#13281C', spanWide: true, visualKind: 'certificate' },
};

/**
 * Adapt LEARNING_MODULES from appStore into enriched Google Labs experiment cards.
 */
const LAB_EXPERIMENT_CARDS: ExperimentCardItem[] = LEARNING_MODULES.map((m) => {
  const cfg = MODULE_VISUAL_CONFIG[m.id] || {
    category: 'Create' as const,
    accentHex: '#A8C7FA',
    tintBg: '#162238',
    visualKind: 'wireframe' as const,
  };
  return {
    id: m.id,
    category: cfg.category,
    code: `EXPERIMENT 0${m.id} · ${m.code.toUpperCase()}`,
    title: m.title,
    subtitle: m.keySkill,
    summary: m.summary,
    keySkill: m.keySkill,
    badgeName: m.badgeName,
    duration: m.duration,
    moeLearn: m.moeLearn,
    studentChallenge: m.studentChallenge,
    learningObjectives: m.learningObjectives,
    ctaText: `Try it now — ${m.title}`,
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
  // Featured Hero Carousel State (replicating labs.google top showcase)
  const [activeSlideIdx, setActiveSlideIdx] = useState<number>(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState<boolean>(false);
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  // 6-second auto-advance timer matching Google Labs hero timer
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
  const [previewColor, setPreviewColor] = useState<string>('#A8C7FA');
  const [curvature, setCurvature] = useState<number>(0.68);
  const [hasSolar, setHasSolar] = useState<boolean>(true);

  // Category Filter State (replicating labs.google "All | Create | Develop | Explore | Learn")
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
    <div className="flex-1 overflow-y-auto bg-[#131314] text-[#E3E3E3] font-sans selection:bg-[#A8C7FA] selection:text-[#062E6F]">
      
      {/* ========================================================================= */}
      {/* 1. GOOGLE LABS DARK HERO & FEATURED EXPERIMENTS CAROUSEL                  */}
      {/* ========================================================================= */}
      <section className="relative pt-10 pb-16 px-4 sm:px-6 lg:px-8 max-w-[1380px] mx-auto">
        
        {/* Asymmetric Editorial Header with Google Labs Inline Visual Punctuation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-10">
          <div className="lg:col-span-8 text-left">
            <h1 className="font-display text-3xl sm:text-5xl lg:text-[68px] font-bold tracking-[-0.035em] text-white leading-[1.08] sm:leading-[1.04]">
              <span>Singapore’s home for </span>
              {/* Inline Visual Punctuation Capsule 1 (Google Labs signature inline type visual) */}
              <span className="inline-flex items-center justify-center align-middle mx-1 px-3 sm:px-3.5 py-1 rounded-full bg-[#162238] border border-[#A8C7FA]/30 text-[#A8C7FA] -translate-y-0.5 sm:-translate-y-1">
                <Box className="size-5 sm:size-8 stroke-[2.2]" />
              </span>
              <span>spatial AI experiments &amp; </span>
              {/* Inline Visual Punctuation Capsule 2 */}
              <span className="inline-flex items-center justify-center align-middle mx-1 px-3 sm:px-3.5 py-1 rounded-full bg-[#13281C] border border-[#6DD58C]/30 text-[#6DD58C] -translate-y-0.5 sm:-translate-y-1">
                <Printer className="size-5 sm:size-8 stroke-[2.2]" />
              </span>
              <span>3D invention.</span>
            </h1>
          </div>

          <div className="lg:col-span-4 text-left lg:pl-4 space-y-5">
            <p className="text-sm sm:text-base lg:text-lg text-[#9AA0A6] leading-relaxed font-normal">
              Turn screen time into real engineering power. Ages 10–20 master spatial AI, shape original 3D prototypes with human judgment, and take home their own physical 3D print.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <button
                id="hero-start-learning-btn"
                onClick={onStartLearning}
                className="px-6 py-3.5 min-h-[48px] rounded-full bg-[#A8C7FA] hover:bg-[#D3E3FD] text-[#062E6F] font-semibold text-sm flex items-center gap-2 labs-pill-btn"
              >
                <span>Try an Interactive Lesson</span>
                <ArrowRight className="size-4" />
              </button>
              <a
                href="#experiments"
                id="hero-explore-experiments-link"
                className="px-5 py-3.5 min-h-[48px] rounded-full bg-[#1E1F22] hover:bg-[#282A2E] text-[#E3E3E3] border border-white/[0.08] font-medium text-sm flex items-center gap-2 labs-pill-btn"
              >
                <span>Explore 6 Lab Modules</span>
              </a>
              <a
                href="#gravity-lab"
                id="hero-gravity-lab-link"
                className="px-5 py-3.5 min-h-[48px] rounded-full bg-[#162238] hover:bg-[#1E2D4A] text-[#A8C7FA] border border-[#A8C7FA]/30 font-medium text-sm flex items-center gap-2 labs-pill-btn"
              >
                <Orbit className="size-4" />
                <span>Defy Gravity</span>
              </a>
            </div>
          </div>
        </div>

        {/* Google Labs Featured Experiment Stage Card (5-Slide Interactive Showcase) */}
        <div 
          className="rounded-[32px] bg-[#1E1F22] border border-white/[0.08] p-5 sm:p-8 lg:p-10 overflow-hidden transition-colors"
          onMouseEnter={() => setIsCarouselPaused(true)}
          onMouseLeave={() => setIsCarouselPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          
          {/* Top Selector Pills Bar (Replicating Google Flow Music / Stitch / Dreambeans / CC / Playground) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-white/[0.08]">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar snap-x snap-mandatory py-1 px-1 -mx-1 sm:mx-0 sm:px-0">
              {FEATURED_EXPERIMENTS.map((exp, idx) => {
                const isSelected = idx === activeSlideIdx;
                return (
                  <button
                    key={exp.id}
                    id={`featured-tab-${exp.id}`}
                    onClick={() => setActiveSlideIdx(idx)}
                    className={`snap-start shrink-0 px-4 py-2 min-h-[40px] rounded-full text-xs font-medium transition-all flex items-center gap-2 labs-pill-btn ${
                      isSelected
                        ? 'bg-[#E3E3E3] text-[#131314] font-semibold'
                        : 'bg-[#131314]/60 text-[#9AA0A6] hover:text-white hover:bg-[#282A2E] border border-white/[0.06]'
                    }`}
                  >
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: isSelected ? '#131314' : exp.accentHex }}
                    />
                    <span>{exp.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Prev / Next Carousel Controls + Counter */}
            <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
              <span className="text-xs font-mono text-[#9AA0A6]">
                0{activeSlideIdx + 1} / 0{FEATURED_EXPERIMENTS.length}
              </span>
              <div className="flex items-center gap-2">
                <button
                  id="featured-prev-btn"
                  onClick={handlePrevHero}
                  aria-label="Previous featured experiment"
                  className="w-10 h-10 rounded-full bg-[#131314] hover:bg-[#282A2E] border border-white/[0.08] flex items-center justify-center text-[#E3E3E3] labs-pill-btn"
                >
                  <ChevronLeft className="size-4" />
                </button>
                <button
                  id="featured-next-btn"
                  onClick={handleNextHero}
                  aria-label="Next featured experiment"
                  className="w-10 h-10 rounded-full bg-[#131314] hover:bg-[#282A2E] border border-white/[0.08] flex items-center justify-center text-[#E3E3E3] labs-pill-btn"
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
              className={`h-full bg-[#A8C7FA] rounded-full labs-timer-bar ${
                isCarouselPaused ? 'labs-timer-bar-paused' : ''
              }`}
            />
          </div>

          {/* Main Split Showcase Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Experiment Narrative & "Try it now — [Name]" CTA */}
            <div className="lg:col-span-5 text-left space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono font-medium"
                style={{ backgroundColor: activeHero.tintBg, color: activeHero.accentHex }}
              >
                <span>{activeHero.tag}</span>
                <span>·</span>
                <span>{activeHero.moeDomain}</span>
              </div>

              <div className="space-y-3">
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
                  {activeHero.name}
                </h2>
                <p className="text-base text-[#E3E3E3] font-medium">
                  {activeHero.shortDesc}
                </p>
                <p className="text-sm text-[#9AA0A6] leading-relaxed">
                  {activeHero.fullDesc}
                </p>
              </div>

              {/* Interactive Levers for Slide 1 (Courtyard Pavilion) or Key Highlights for other slides */}
              <div className="p-4 rounded-2xl bg-[#131314] border border-white/[0.06] space-y-3.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[#9AA0A6] flex items-center gap-1.5">
                    <Sliders className="size-3.5 text-[#A8C7FA]" />
                    <span>Live Lab Parameters</span>
                  </span>
                  <span className="font-mono text-[11px] text-[#6DD58C]">
                    Human Intent: 94%
                  </span>
                </div>

                {/* Swatches + Curvature + Solar Controls */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#9AA0A6]">Albedo Tint:</span>
                    {[
                      { hex: '#A8C7FA', name: 'Sky Blue' },
                      { hex: '#6DD58C', name: 'Mint Leaf' },
                      { hex: '#FDD663', name: 'Solar Amber' },
                      { hex: '#FFB4AB', name: 'Terracotta' },
                    ].map((swatch) => (
                      <button
                        key={swatch.hex}
                        onClick={() => setPreviewColor(swatch.hex)}
                        style={{ backgroundColor: swatch.hex }}
                        className={`w-6 h-6 rounded-full border-2 transition-transform ${
                          previewColor === swatch.hex
                            ? 'border-white scale-110'
                            : 'border-transparent opacity-70 hover:opacity-100'
                        }`}
                        title={`Set pigment: ${swatch.name}`}
                        aria-label={`Set pigment ${swatch.name}`}
                      />
                    ))}
                  </div>

                  <button
                    id="hero-solar-toggle"
                    onClick={() => setHasSolar(!hasSolar)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-colors flex items-center gap-1.5 labs-pill-btn ${
                      hasSolar
                        ? 'bg-[#2B2210] border-[#FDD663]/40 text-[#FDD663]'
                        : 'bg-[#1E1F22] border-white/[0.08] text-[#9AA0A6]'
                    }`}
                  >
                    <Sun className="size-3.5" />
                    <span>{hasSolar ? '450W Solar On' : 'Solar Array Off'}</span>
                  </button>
                </div>

                {/* Curvature Tension Slider */}
                <div className="space-y-1 pt-1">
                  <div className="flex justify-between text-[11px] font-mono text-[#9AA0A6]">
                    <span>Canopy Arch Tension</span>
                    <span className="text-white">{curvature.toFixed(2)} ratio</span>
                  </div>
                  <input
                    id="hero-curvature-slider"
                    type="range"
                    min="0.25"
                    max="1.0"
                    step="0.05"
                    value={curvature}
                    onChange={(e) => setCurvature(parseFloat(e.target.value))}
                    className="w-full accent-[#A8C7FA] cursor-pointer h-1.5 bg-[#282A2E] rounded-lg"
                  />
                </div>
              </div>

              {/* Google Labs Signature "Try it now — [Experiment]" Pill CTA */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  id="featured-try-now-btn"
                  onClick={() => onSelectModule(activeHero.moduleId)}
                  style={{ backgroundColor: activeHero.accentHex, color: activeHero.pillTextHex }}
                  className="px-6 py-3.5 rounded-full font-semibold text-xs sm:text-sm flex items-center gap-2 labs-pill-btn hover:opacity-95"
                >
                  <span>{activeHero.ctaLabel}</span>
                  <ArrowUpRight className="size-4" />
                </button>

                {onLaunchCanvasModal && (
                  <button
                    id="featured-open-canvas-btn"
                    onClick={onLaunchCanvasModal}
                    className="px-5 py-3.5 rounded-full bg-[#131314] hover:bg-[#282A2E] text-[#E3E3E3] border border-white/[0.08] font-medium text-xs sm:text-sm flex items-center gap-2 labs-pill-btn"
                  >
                    <Box className="size-4 text-[#A8C7FA]" />
                    <span>Open 3D Canvas</span>
                  </button>
                )}
              </div>
            </div>

            {/* Right Column: Interactive 3D Viewport Stage */}
            <div className="lg:col-span-7">
              <div
                className="relative rounded-[24px] border border-white/[0.08] p-6 sm:p-8 min-h-[340px] sm:min-h-[390px] flex flex-col justify-between overflow-hidden transition-colors"
                style={{ backgroundColor: '#131314' }}
              >
                {/* Top Stage Telemetry Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#9AA0A6] border-b border-white/[0.06] pb-3">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: activeHero.accentHex }}
                    />
                    <span className="text-white font-medium">SHOW3D_STAGE // M0{activeHero.moduleId}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px]">
                    <span>X,Y,Z: WATER_TIGHT</span>
                    <span>·</span>
                    <span className="text-[#6DD58C]">PLA PRINT READY</span>
                  </div>
                </div>

                {/* Interactive Parametric 3D SVG Render */}
                <div className="relative flex-1 flex items-center justify-center my-4">
                  <svg viewBox="0 0 440 270" className="w-full h-full max-w-lg">
                    <defs>
                      <linearGradient id="labsCanopyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={previewColor} stopOpacity="0.95" />
                        <stop offset="100%" stopColor="#1E1F22" stopOpacity="0.9" />
                      </linearGradient>
                    </defs>

                    {/* Base Isometric Platform */}
                    <ellipse cx="220" cy="215" rx="165" ry="38" fill="#1B1C20" stroke="#2E3035" strokeWidth="1.5" />
                    <path d="M 220 240 L 360 195 L 220 150 L 80 195 Z" fill="#16171A" stroke="#2E3035" strokeWidth="1" />

                    {/* Coordinate Axis Reference Lines */}
                    <line x1="220" y1="25" x2="220" y2="245" stroke="#2E3035" strokeWidth="1" strokeDasharray="3 4" />
                    <line x1="65" y1="195" x2="375" y2="195" stroke="#2E3035" strokeWidth="1" strokeDasharray="3 4" />

                    {/* Structural Masts */}
                    <line x1="130" y1="200" x2="130" y2="95" stroke="#9AA0A6" strokeWidth="3.5" strokeLinecap="round" />
                    <line x1="310" y1="200" x2="310" y2="95" stroke="#9AA0A6" strokeWidth="3.5" strokeLinecap="round" />
                    <line x1="220" y1="185" x2="220" y2="55" stroke="#E3E3E3" strokeWidth="4" strokeLinecap="round" />

                    {/* Modular Timber Benches on Courtyard Floor */}
                    <rect x="155" y="188" width="42" height="10" rx="3" fill="#FDD663" opacity="0.85" />
                    <rect x="243" y="188" width="42" height="10" rx="3" fill="#FDD663" opacity="0.85" />

                    {/* Parametric Tensile Canopy responding to `curvature` and `previewColor` */}
                    <path 
                      d={`M 220 ${42 + (1 - curvature) * 28} Q 320 ${68 + curvature * 24} 355 122 Q 285 156 220 132 Q 155 156 85 122 Q 120 ${68 + curvature * 24} 220 ${42 + (1 - curvature) * 28} Z`}
                      fill="url(#labsCanopyGrad)" 
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

                    {/* 450W Solar Array Grid */}
                    {hasSolar && (
                      <g>
                        <path d="M 192 52 L 248 52 L 264 78 L 176 78 Z" fill="#162238" stroke="#A8C7FA" strokeWidth="1.5" />
                        <line x1="184" y1="65" x2="256" y2="65" stroke="#A8C7FA" strokeWidth="0.9" opacity="0.7" />
                        <line x1="220" y1="52" x2="220" y2="78" stroke="#A8C7FA" strokeWidth="0.9" opacity="0.7" />
                      </g>
                    )}

                    {/* Spatial Dimension Callout Pills */}
                    <g transform="translate(295, 42)">
                      <rect x="0" y="0" width="118" height="24" rx="12" fill="#1E1F22" stroke="#2E3035" />
                      <text x="59" y="15" textAnchor="middle" fill="#FDD663" fontSize="10" fontFamily="JetBrains Mono, monospace">
                        {hasSolar ? 'SOLAR: 450W ON' : 'SOLAR: 0W OFF'}
                      </text>
                    </g>

                    <g transform="translate(24, 145)">
                      <rect x="0" y="0" width="122" height="24" rx="12" fill="#1E1F22" stroke="#2E3035" />
                      <text x="61" y="15" textAnchor="middle" fill="#A8C7FA" fontSize="10" fontFamily="JetBrains Mono, monospace">
                        ARCH: {(curvature * 100).toFixed(0)}% TENSION
                      </text>
                    </g>
                  </svg>
                </div>

                {/* Bottom Stage Takeaway Bar */}
                <div className="pt-3 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-[#9AA0A6]">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5 text-[#E3E3E3]">
                      <CheckCircle2 className="size-3.5 text-[#6DD58C]" />
                      <span>Zero prior coding or CAD required</span>
                    </span>
                    <span className="hidden sm:flex items-center gap-1.5 text-[#E3E3E3]">
                      <CheckCircle2 className="size-3.5 text-[#A8C7FA]" />
                      <span>Takes home physical 3D print</span>
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-[#9AA0A6]">
                    Singapore Holiday &amp; Weekend Cohorts
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. "BE THE FIRST TO EXPERIMENT" — GOOGLE LABS FILTERABLE DIRECTORY        */}
      {/* ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-[1380px] mx-auto border-t border-white/[0.08]" id="experiments">
        
        {/* Section Header + Category Filter Bar ("All | Create | Develop | Explore | Learn") */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2 text-left">
            <span className="text-xs font-mono uppercase tracking-widest text-[#A8C7FA] block">
              6 Hands-On Curriculum Experiments
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Be the first to experiment
            </h2>
          </div>

          {/* Exact Google Labs Category Filter Pills (Mobile Horizontal Scroll-Snap) */}
          <div
            className="w-full md:w-auto flex items-center gap-2 overflow-x-auto no-scrollbar snap-x snap-mandatory py-1 px-1 -mx-1 sm:mx-0 sm:px-0 sm:flex-wrap"
            role="tablist"
            aria-label="Experiment categories"
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
                  className={`snap-start shrink-0 px-4 py-2 min-h-[44px] rounded-full text-xs font-semibold transition-all labs-pill-btn ${
                    isActive
                      ? 'bg-[#E3E3E3] text-[#131314] shadow'
                      : 'text-[#9AA0A6] hover:text-white hover:bg-white/[0.05] bg-[#1E1F22] border border-white/[0.06]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Asymmetric Google Labs Experiment Bento Cards Grid */}
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
                style={{ '--stagger-index': idx } as React.CSSProperties}
                className={`${colSpanClass} labs-card labs-card-interactive labs-card-waterfall p-5 sm:p-8 flex flex-col justify-between text-left group`}
              >
                <div className="space-y-5">
                  {/* Top Metadata Pill Row */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span
                        className="px-3 py-1 rounded-full text-[11px] font-mono font-medium"
                        style={{ backgroundColor: exp.tintBg, color: exp.accentHex }}
                      >
                        {exp.code}
                      </span>
                      <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-white/[0.05] text-[#C4C7C5] border border-white/[0.06]">
                        {exp.moeLearn}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-[#9AA0A6] flex items-center gap-1.5">
                      <Clock className="size-3.5" />
                      <span>{exp.duration}</span>
                    </span>
                  </div>

                  {/* Custom Tonal Visual Plate inside each Experiment Card */}
                  <div
                    className="h-36 sm:h-44 rounded-2xl border border-white/[0.06] flex items-center justify-center p-4 overflow-hidden relative"
                    style={{ backgroundColor: exp.tintBg }}
                  >
                    {exp.visualKind === 'wireframe' && (
                      <svg viewBox="0 0 240 110" className="w-48 h-28" preserveAspectRatio="xMidYMid meet">
                        <polygon points="120,12 190,42 190,88 120,104 50,88 50,42" fill="none" stroke="#A8C7FA" strokeWidth="1.5" />
                        <line x1="120" y1="12" x2="120" y2="104" stroke="#A8C7FA" strokeWidth="1" strokeDasharray="3 3" />
                        <line x1="50" y1="42" x2="190" y2="42" stroke="#A8C7FA" strokeWidth="1" strokeDasharray="3 3" />
                        <circle cx="120" cy="12" r="3.5" fill="#FFFFFF" />
                        <circle cx="190" cy="42" r="3.5" fill="#A8C7FA" />
                        <circle cx="50" cy="42" r="3.5" fill="#A8C7FA" />
                        <circle cx="120" cy="58" r="4" fill="#6DD58C" />
                      </svg>
                    )}
                    {exp.visualKind === 'prompt' && (
                      <div className="flex flex-wrap items-center justify-center gap-2 max-w-xs">
                        {['P: Eco-Architect', 'A: Shade Canopy', 'R: Courtyard', 'T: Tensile PTFE', 'S: 3mm Ribs'].map((chip) => (
                          <span key={chip} className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-[#131314]/80 border border-[#FDD663]/40 text-[#FDD663] font-mono text-[11px] sm:text-xs">
                            {chip}
                          </span>
                        ))}
                      </div>
                    )}
                    {exp.visualKind === 'synthesis' && (
                      <svg viewBox="0 0 240 110" className="w-48 h-28" preserveAspectRatio="xMidYMid meet">
                        <ellipse cx="120" cy="88" rx="75" ry="14" fill="#131314" stroke="#6DD58C" strokeWidth="1" />
                        <path d="M 120 20 Q 175 38 190 70 Q 150 85 120 72 Q 90 85 50 70 Q 65 38 120 20 Z" fill="#6DD58C" fillOpacity="0.3" stroke="#6DD58C" strokeWidth="1.75" />
                        <line x1="120" y1="20" x2="120" y2="88" stroke="#FFFFFF" strokeWidth="2" />
                      </svg>
                    )}
                    {exp.visualKind === 'materials' && (
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-[#FFFFFF] to-[#9AA0A6] border border-white/30 shadow-inner" title="Solar White 0.85 Albedo" />
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-[#A8C7FA] to-[#162238] border border-[#A8C7FA]/50" title="Anodized Sky Aluminum" />
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-[#6DD58C] to-[#13281C] border border-[#6DD58C]/50" title="Biophilic PLA Filament" />
                      </div>
                    )}
                    {exp.visualKind === 'ergonomics' && (
                      <svg viewBox="0 0 240 110" className="w-48 h-28" preserveAspectRatio="xMidYMid meet">
                        <line x1="45" y1="90" x2="195" y2="90" stroke="#9AA0A6" strokeWidth="2" />
                        <line x1="95" y1="90" x2="155" y2="22" stroke="#FFB4AB" strokeWidth="3" strokeLinecap="round" />
                        <path d="M 125 90 A 30 30 0 0 0 112 65" fill="none" stroke="#FDD663" strokeWidth="1.5" strokeDasharray="2 2" />
                        <text x="138" y="75" fill="#FDD663" fontSize="11" fontFamily="JetBrains Mono, monospace">60° TILT</text>
                        <circle cx="140" cy="38" r="6" fill="#FFB4AB" />
                      </svg>
                    )}
                    {exp.visualKind === 'certificate' && (
                      <div className="flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-2.5 sm:py-3 rounded-2xl bg-[#131314]/85 border border-[#6DD58C]/30">
                        <Award className="size-8 sm:size-9 text-[#6DD58C] shrink-0" />
                        <div>
                          <div className="text-[10px] font-mono uppercase text-[#6DD58C]">MOE 21CC VERIFIED</div>
                          <div className="text-xs sm:text-sm font-bold text-white">94.0% Human Creative Intent</div>
                          <div className="text-[10px] sm:text-[11px] font-mono text-[#9AA0A6]">Physical PLA Print + DSA Record</div>
                        </div>
                      </div>
                    )}

                    <span className="absolute bottom-2.5 right-3 px-2.5 py-0.5 rounded-full bg-[#131314]/80 text-[10px] font-mono text-[#E3E3E3] border border-white/[0.08]">
                      Badge: {exp.badgeName}
                    </span>
                  </div>

                  {/* Title & Copy */}
                  <div className="space-y-2">
                    <div className="text-xs font-medium text-[#A8C7FA] font-mono">{exp.subtitle}</div>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
                      {exp.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#9AA0A6] leading-relaxed">
                      {exp.summary}
                    </p>
                  </div>

                  {/* Hands-On Student Challenge */}
                  <div className="p-3 sm:p-3.5 rounded-xl bg-[#131314]/80 border border-white/[0.06] text-xs">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#A8C7FA] block mb-1">
                      Hands-On Challenge:
                    </span>
                    <span className="text-[#E3E3E3] leading-relaxed">
                      {exp.studentChallenge}
                    </span>
                  </div>

                  {/* 3 Learning Objectives Takeaways */}
                  <div className="space-y-1.5 pt-1">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-[#9AA0A6]">
                      Learning Takeaways:
                    </div>
                    <ul className="space-y-1">
                      {exp.learningObjectives.map((obj, oIdx) => (
                        <li key={oIdx} className="flex items-start gap-2 text-xs text-[#9AA0A6]">
                          <CheckCircle2 className="size-3.5 text-[#6DD58C] shrink-0 mt-0.5" />
                          <span className="text-[#C4C7C5]">{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Footer: Google Labs "Try it now — [Experiment]" Link */}
                <div className="pt-5 mt-5 border-t border-white/[0.06] flex items-center justify-between">
                  <button
                    id={`experiment-card-btn-${exp.id}`}
                    onClick={() => onSelectModule(exp.id)}
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-white group-hover:text-[#A8C7FA] transition-colors min-h-[44px]"
                  >
                    <span>{exp.ctaText}</span>
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                  <span className="text-[11px] font-mono text-[#9AA0A6]">
                    {exp.category}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. "ABOUT SHOW3D LABS" & 5-STEP CO-DESIGN WORKFLOW                        */}
      {/* ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-[1380px] mx-auto border-t border-white/[0.08]" id="about-labs">
        
        {/* About Show3D Labs Split Statement (Replicating "About Google Labs" block) */}
        <div className="rounded-[32px] bg-[#1E1F22] border border-white/[0.08] p-8 sm:p-12 mb-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 text-left space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#162238] text-[#A8C7FA] text-xs font-mono">
                <FlaskConical className="size-3.5" />
                <span>ABOUT SHOW3D LABS</span>
              </div>
              <h2 className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight leading-[1.1]">
                From passive screen consumer to active 3D inventor.
              </h2>
              <p className="text-base text-[#9AA0A6] leading-relaxed max-w-2xl">
                At Show3D Labs, every student project begins with a bold question: <em className="text-white not-italic font-medium">How can spatial AI help solve real physical problems without replacing human judgment?</em> Our mentor-guided cohorts teach young creators ages 10–20 to direct AI with mathematical precision, critique 3D meshes, and fabricate tangible inventions.
              </p>
            </div>

            {/* Format Switcher Card (5-Day Holiday Camp vs 6-Week Weekend Masterclass) */}
            <div className="lg:col-span-5 p-6 rounded-3xl bg-[#131314] border border-white/[0.08] space-y-4 text-left">
              <div className="text-xs font-mono uppercase tracking-wider text-[#6DD58C]">
                Choose Your Lab Cohort Schedule
              </div>
              <div className="grid grid-cols-2 gap-2 p-1 rounded-full bg-[#1E1F22] border border-white/[0.08]">
                <button
                  id="format-holiday-btn"
                  onClick={() => setSelectedFormat('holiday')}
                  className={`py-2 px-3 rounded-full text-xs font-semibold transition-all labs-pill-btn ${
                    selectedFormat === 'holiday'
                      ? 'bg-[#E3E3E3] text-[#131314]'
                      : 'text-[#9AA0A6] hover:text-white'
                  }`}
                >
                  5-Day Holiday Camp
                </button>
                <button
                  id="format-term-btn"
                  onClick={() => setSelectedFormat('term')}
                  className={`py-2 px-3 rounded-full text-xs font-semibold transition-all labs-pill-btn ${
                    selectedFormat === 'term'
                      ? 'bg-[#E3E3E3] text-[#131314]'
                      : 'text-[#9AA0A6] hover:text-white'
                  }`}
                >
                  6-Week Weekend Lab
                </button>
              </div>
              <p className="text-xs text-[#9AA0A6] leading-relaxed">
                {selectedFormat === 'holiday'
                  ? 'Runs during Singapore March, June, September & Nov/Dec school holidays (Mon–Fri, 9:00am–12:30pm or 1:30pm–5:00pm). Includes physical 3D print graduation.'
                  : 'Runs during school terms on Saturdays or Sundays (2.0 hours per weekly session over 6 weeks). Paced for zero exam stress and deep portfolio building.'}
              </p>
              <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-xs">
                <span className="text-[#E3E3E3] font-medium">1:8 Instructor-to-Student Ratio</span>
                <span className="font-mono text-[#A8C7FA]">Ages 10–20</span>
              </div>
            </div>
          </div>
        </div>

        {/* 5-Step Lab Method Horizontal Progression */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            {
              step: '01',
              title: 'Discover a Need',
              desc: 'Investigate real environmental constraints like Singapore’s 34°C courtyard heat or study desk ergonomics.',
              outcome: 'Design Brief',
              accent: '#A8C7FA'
            },
            {
              step: '02',
              title: 'Prompt with PARTS',
              desc: 'Assemble structured Persona, Aim, Recipients, Theme, and Structure tokens without random guessing.',
              outcome: '3D Mesh Candidates',
              accent: '#FDD663'
            },
            {
              step: '03',
              title: 'Critique Topology',
              desc: 'Compare AI candidates, inspect X-Y-Z wireframes, spot non-manifold flaws, and verify stability.',
              outcome: 'Verified Geometry',
              accent: '#A8C7FA'
            },
            {
              step: '04',
              title: 'Tune with Levers',
              desc: 'Take human control: adjust parabolic curvature, solar wattage, albedo pigments, and 3mm wall thickness.',
              outcome: 'Print-Ready .STL',
              accent: '#6DD58C'
            },
            {
              step: '05',
              title: 'Showcase & Print',
              desc: 'Present engineering decisions to parents at graduation and bring home your physical 3D-printed invention.',
              outcome: 'Physical 3D Print',
              accent: '#6DD58C'
            }
          ].map((item) => (
            <div
              key={item.step}
              className="rounded-[24px] bg-[#1E1F22] border border-white/[0.08] p-6 flex flex-col justify-between text-left hover:border-white/[0.18] transition-colors"
            >
              <div>
                <div className="text-xs font-mono font-bold" style={{ color: item.accent }}>
                  STEP {item.step}
                </div>
                <h3 className="font-display text-lg font-bold text-white mt-1.5 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-[#9AA0A6] leading-relaxed">
                  {item.desc}
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-[#E3E3E3]">
                <span>Output</span>
                <span style={{ color: item.accent }}>{item.outcome}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SHOW3D GRAVITY & PHYSICS LAB (MATTER.JS INTERACTIVE FALLING ELEMENTS)     */}
      {/* ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-[1380px] mx-auto border-t border-white/[0.08]" id="gravity-lab">
        <FallingPhysicsStage onSelectModule={onSelectModule} />
      </section>

      {/* ========================================================================= */}
      {/* 4. "LIFE BEYOND THE LAB" — GRADUATED TANGIBLE OUTCOMES & AGE TIERS        */}
      {/* ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-[1380px] mx-auto border-t border-white/[0.08]" id="beyond-the-lab">
        
        {/* Replicating labs.google "Life beyond the Lab" Header */}
        <div className="max-w-3xl text-left mb-14 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-[#6DD58C] block">
            Tangible Family &amp; Portfolio Payoff
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Life beyond the Lab
          </h2>
          <p className="text-base text-[#9AA0A6] leading-relaxed">
            At Show3D Labs, student creations don’t stay trapped inside a browser tab. Every digital experiment outgrows the virtual viewport and graduates into real physical artifacts, verified school portfolio credentials, and lasting spatial intuition.
          </p>
        </div>

        {/* Google Labs "Formerly [Lab Stage] → [Graduated Deliverable]" Transformation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {[
            {
              fromLabel: 'Virtual 3D Mesh',
              toTitle: 'Physical 3D-Printed Invention',
              desc: 'Every student’s custom-engineered 3D model is sliced and fabricated in eco-friendly PLA filament—ready to hold in their hands and display on their study desk.',
              accent: '#6DD58C',
              tint: '#13281C',
              cta: 'Inspect 3D Canvas',
              onClick: onLaunchCanvasModal || onStartLearning
            },
            {
              fromLabel: 'PARTS Prompt Log',
              toTitle: 'Verified DSA & 21CC Portfolio Badge',
              desc: 'Graduates receive an official Digital Certificate with a verifiable credential ID (SHOW3D-TPSS-2026-0842) proving 94% Human Creative Intent for Direct School Admission (DSA).',
              accent: '#A8C7FA',
              tint: '#162238',
              cta: 'Try Student Lab',
              onClick: onStartLearning
            },
            {
              fromLabel: 'Peer Critique Pins',
              toTitle: 'Live Parent Showcase Pitch',
              desc: 'Parents are invited to the final session to watch their child articulate their engineering trade-offs, curvature ratios, and anti-cognitive offloading decisions.',
              accent: '#FDD663',
              tint: '#2B2210',
              cta: 'View Pedagogy',
              onClick: onOpenPedagogyModal || onStartLearning
            },
            {
              fromLabel: 'Classroom Viewport',
              toTitle: '30-Day Home Studio Access',
              desc: 'Students keep full browser access for 30 days after camp to continue experimenting, iterating new inventions, and exporting .GLTF and .STL files at home.',
              accent: '#A8C7FA',
              tint: '#162238',
              cta: 'Launch Studio',
              onClick: onLaunchCanvasModal || onStartLearning
            },
            {
              fromLabel: 'Guided Scaffolding',
              toTitle: '1:8 Dedicated STEM Mentorship',
              desc: 'Small-group cohorts led by trained educators ensure every learner receives personalized feedback on geometry, ergonomics, and prompt architecture.',
              accent: '#FFB4AB',
              tint: '#2E1717',
              cta: 'Explore Instructor Hub',
              onClick: onOpenTeacherView
            },
            {
              fromLabel: 'Classroom Sandbox',
              toTitle: '100% Child-Safe PDPA Environment',
              desc: 'School SSO login, zero personal emails required, automated safe-prompt filters, and a strict guarantee: zero student work is ever used to train AI models.',
              accent: '#6DD58C',
              tint: '#13281C',
              cta: 'Read Safety Spec',
              onClick: onOpenSafetyModal || onStartLearning
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="labs-card p-7 flex flex-col justify-between text-left"
            >
              <div className="space-y-4">
                {/* Google Labs "Formerly X -> Y" transformation pill */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono"
                  style={{ backgroundColor: item.tint, color: item.accent }}
                >
                  <span className="opacity-75">{item.fromLabel}</span>
                  <span>→</span>
                  <span className="font-semibold">Graduated Outcome</span>
                </div>

                <h3 className="font-display text-xl font-bold text-white tracking-tight">
                  {item.toTitle}
                </h3>

                <p className="text-xs sm:text-sm text-[#9AA0A6] leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-5 mt-6 border-t border-white/[0.06]">
                <button
                  onClick={item.onClick}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#E3E3E3] hover:text-[#A8C7FA] transition-colors"
                >
                  <span>{item.cta}</span>
                  <ArrowUpRight className="size-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 3 Age-Tailored Cohort Tracks + Comparison Matrix in asymmetric 12-col layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch" id="tiers">
          
          {/* Left 7 Cols: 3 Age Tracks stacked cleanly */}
          <div className="lg:col-span-7 space-y-4 text-left flex flex-col justify-between">
            <div className="mb-2">
              <span className="text-xs font-mono uppercase tracking-wider text-[#A8C7FA]">
                Age-Calibrated Cohort Tracks
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
                Tailored for every stage of growth
              </h3>
            </div>

            {[
              {
                age: 'UPPER PRIMARY · AGES 10–12',
                title: 'Junior Creator Track',
                project: 'Original 3D Desk Companion, Custom Mascot, or Study Organizer',
                skills: 'Playful spatial vocabulary, X-Y-Z orientation, early DSA portfolio confidence.',
                badge: 'Max 8 Students · Beginner Friendly',
                accent: '#6DD58C',
                tint: '#13281C'
              },
              {
                age: 'SECONDARY 1–4 · AGES 13–16 (MOST POPULAR)',
                title: 'Teen Innovator Track',
                project: 'Courtyard Tensile Solar Pavilion or Sustainable Urban Prototype',
                skills: 'PARTS prompt engineering, parametric levers, mesh slicing & 94% Human Intent score.',
                badge: 'MOE D&T & 21CC Aligned',
                accent: '#A8C7FA',
                tint: '#162238'
              },
              {
                age: 'JC, ITE & POLYTECHNIC · AGES 16–20',
                title: 'Young Specialist Track',
                project: 'Portfolio-Grade Architectural Capstone or Industrial Product Prototype',
                skills: 'Advanced polygon topology, boolean tolerances, and .GLTF / Blender / CAD workflows.',
                badge: 'University & Career Portfolio',
                accent: '#FDD663',
                tint: '#2B2210'
              }
            ].map((tier, i) => (
              <div
                key={i}
                className="rounded-[24px] bg-[#1E1F22] border border-white/[0.08] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-white/[0.16] transition-colors"
              >
                <div className="space-y-1.5 max-w-xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold"
                      style={{ backgroundColor: tier.tint, color: tier.accent }}
                    >
                      {tier.age}
                    </span>
                    <span className="text-[11px] font-mono text-[#9AA0A6]">{tier.badge}</span>
                  </div>
                  <h4 className="font-display text-xl font-bold text-white">{tier.title}</h4>
                  <p className="text-xs text-[#E3E3E3]">
                    <strong className="text-[#9AA0A6] font-normal">Capstone: </strong>
                    {tier.project}
                  </p>
                  <p className="text-xs text-[#9AA0A6]">{tier.skills}</p>
                </div>

                <button
                  onClick={onStartLearning}
                  className="px-4 py-2.5 rounded-full bg-[#131314] hover:bg-[#282A2E] text-[#E3E3E3] border border-white/[0.08] text-xs font-semibold shrink-0 self-start sm:self-center flex items-center gap-1.5 labs-pill-btn"
                >
                  <span>Try Track</span>
                  <ArrowRight className="size-3.5" />
                </button>
              </div>
            ))}
          </div>

          {/* Right 5 Cols: Why Parents Choose Show3D Labs Comparison Card */}
          <div className="lg:col-span-5 rounded-[28px] bg-[#1E1F22] border border-white/[0.08] p-6 sm:p-8 flex flex-col justify-between text-left">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#13281C] text-[#6DD58C] text-[11px] font-mono">
                <span>THE SHOW3D LABS DIFFERENCE</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-white">
                Why families choose Show3D over generic camps
              </h3>
              <p className="text-xs text-[#9AA0A6] leading-relaxed">
                Most courses leave kids with fleeting digital files or copy-pasted code. Show3D combines spatial AI with human engineering judgment and physical fabrication.
              </p>

              <div className="space-y-2.5 pt-2">
                {[
                  {
                    feature: 'True 3D Spatial AI & Geometry',
                    show3d: 'Yes (X, Y, Z Meshes)',
                    other: '2D text/images or none'
                  },
                  {
                    feature: 'Anti-Cognitive Offloading Audit',
                    show3d: '94% Human Intent Score',
                    other: 'Passive prompt spamming'
                  },
                  {
                    feature: 'Physical Take-Home Invention',
                    show3d: 'Custom PLA 3D Print',
                    other: 'Screen-only or trinket'
                  },
                  {
                    feature: 'Beginner Friendly (Ages 10–20)',
                    show3d: 'Zero prior CAD needed',
                    other: 'Steep CAD/syntax curve'
                  },
                  {
                    feature: 'Verified DSA & MOE 21CC Record',
                    show3d: 'Cryptographic Certificate',
                    other: 'Generic attendance slip'
                  }
                ].map((row, idx) => (
                  <div key={idx} className="p-3 sm:p-3.5 rounded-2xl bg-[#131314] border border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <div>
                      <div className="font-medium text-white">{row.feature}</div>
                      <div className="text-[11px] text-[#9AA0A6]">Typical camp: {row.other}</div>
                    </div>
                    <span className="self-start sm:self-auto px-2.5 py-1 rounded-full bg-[#13281C] text-[#6DD58C] font-mono text-[11px] font-semibold shrink-0">
                      {row.show3d}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/[0.06] flex items-center justify-between">
              <span className="text-xs text-[#9AA0A6]">Runs in any browser over Port 443</span>
              <button
                onClick={onStartLearning}
                className="text-xs font-semibold text-[#A8C7FA] hover:underline flex items-center gap-1"
              >
                <span>Sample Lesson</span>
                <ArrowRight className="size-3.5" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. "STAY CONNECTED" — PARENT FAQ & INSTITUTIONAL SCHOOL GATEWAY           */}
      {/* ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-[1380px] mx-auto border-t border-white/[0.08]" id="stay-connected">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left 7 Columns: Parent FAQ Accordion */}
          <div className="lg:col-span-7 text-left space-y-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#A8C7FA] block mb-2">
                Parent Questions Answered
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Everything you need to know before your child starts experimenting
              </h2>
            </div>

            <div className="space-y-3">
              {[
                {
                  q: "Does my child need prior coding, 3D modeling, or art experience?",
                  a: "None at all. Our curriculum is engineered from the ground up for complete beginners. Guided micro-lessons and 1:8 instructors walk students step-by-step from their first X-Y-Z wireframe to a finished, printable 3D invention."
                },
                {
                  q: "What laptop or tablet does my child need to bring?",
                  a: "Show3D Labs runs 100% in any standard web browser (Chrome, Safari, Edge) over HTTPS Port 443. Students can use their school MOE Personal Learning Device (Chromebook, iPad, or Windows laptop) or any home laptop with zero software installation."
                },
                {
                  q: "How does my child receive their physical 3D-printed invention?",
                  a: "During Module 5 & 6, students verify wall thickness and prepare their 3D mesh for slicing. Our precision 3D printer farm fabricates each student’s custom model in non-toxic, eco-friendly PLA filament—handed directly to your child at the graduation showcase."
                },
                {
                  q: "How does this help with Direct School Admission (DSA) or school portfolios?",
                  a: "Graduates earn a verifiable Digital Competency Certificate (e.g., SHOW3D-TPSS-2026-0842) documenting MOE 21st Century Competencies and their 94%+ Human Creative Intent score—providing concrete evidence of original problem-solving."
                },
                {
                  q: "How is my child's privacy and online safety protected?",
                  a: "We adhere strictly to Singapore PDPA standards. Cohorts use managed SSO accounts with zero personal student emails or phone numbers collected, automated safe-prompt filters, and a strict guarantee: zero student prompts or 3D meshes are ever used to train AI models."
                }
              ].map((faq, idx) => (
                <div
                  key={idx}
                  className="rounded-[24px] bg-[#1E1F22] border border-white/[0.08] overflow-hidden transition-colors"
                >
                  <button
                    id={`faq-toggle-${idx}`}
                    onClick={() => toggleFaq(idx)}
                    className="w-full py-4 sm:py-5 px-5 sm:px-6 min-h-[48px] text-left flex items-center justify-between text-sm sm:text-base font-semibold text-white hover:text-[#A8C7FA] transition-colors"
                  >
                    <span>{faq.q}</span>
                    {expandedFaq === idx ? (
                      <ChevronUp className="size-4 text-[#A8C7FA] shrink-0 ml-4" />
                    ) : (
                      <ChevronDown className="size-4 text-[#9AA0A6] shrink-0 ml-4" />
                    )}
                  </button>
                  <div className={`labs-accordion-grid ${expandedFaq === idx ? 'open' : ''}`}>
                    <div className="labs-accordion-content">
                      <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-[#9AA0A6] leading-relaxed border-t border-white/[0.06]">
                        {faq.a}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right 5 Columns: Google Labs "Stay connected" Dual Action Cards */}
          <div className="lg:col-span-5 space-y-6 text-left">
            
            {/* Card 1: For Parents & Young Creators */}
            <div className="rounded-[28px] bg-[#162238] border border-[#A8C7FA]/25 p-7 sm:p-8 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#131314]/60 text-[#A8C7FA] text-[11px] font-mono">
                <span>EARLY ACCESS &amp; COHORT ENROLMENT</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Ready to shape the 3D world?
              </h3>
              <p className="text-sm text-[#D3E3FD]/80 leading-relaxed">
                Test-drive our interactive Student Lab right now in your browser, or inspect our Singapore PDPA child-safety architecture.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  id="cta-launch-student-lab"
                  onClick={onStartLearning}
                  className="px-6 py-3.5 rounded-full bg-[#A8C7FA] hover:bg-[#D3E3FD] text-[#062E6F] font-semibold text-xs sm:text-sm flex items-center gap-2 labs-pill-btn"
                >
                  <span>Launch Student Lab</span>
                  <ArrowRight className="size-4" />
                </button>
                {onOpenSafetyModal && (
                  <button
                    id="cta-open-safety-modal"
                    onClick={onOpenSafetyModal}
                    className="px-5 py-3.5 rounded-full bg-[#131314]/80 hover:bg-[#131314] text-white border border-white/[0.12] font-medium text-xs sm:text-sm flex items-center gap-2 labs-pill-btn"
                  >
                    <ShieldCheck className="size-4 text-[#6DD58C]" />
                    <span>Safety &amp; PDPA</span>
                  </button>
                )}
              </div>
            </div>

            {/* Card 2: For School Heads, D&T Educators & Camp Partners */}
            <div className="rounded-[28px] bg-[#1E1F22] border border-white/[0.08] p-7 sm:p-8 space-y-5" id="schools">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2B2210] text-[#FDD663] text-[11px] font-mono">
                <span>INSTITUTIONAL &amp; SCHOOL PARTNERS</span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
                School Head, D&amp;T Teacher, or Enrichment Partner?
              </h3>
              <p className="text-xs sm:text-sm text-[#9AA0A6] leading-relaxed">
                Show3D Labs deploys as a turnkey “Vendor-Taught, Teacher-Facilitated” programme—complete with a 28-student live Instructor Hub, MOE “Four Learns” rubrics, and GeBIZ quotation packs.
              </p>
              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                <button
                  id="cta-open-instructor-hub"
                  onClick={onOpenTeacherView}
                  className="px-5 py-2.5 rounded-full bg-[#E3E3E3] hover:bg-white text-[#131314] text-xs font-semibold flex items-center gap-1.5 labs-pill-btn"
                >
                  <Users className="size-3.5" />
                  <span>Instructor Command Hub</span>
                </button>
                {onOpenProcurementModal && (
                  <button
                    id="cta-open-procurement-modal"
                    onClick={onOpenProcurementModal}
                    className="px-4 py-2.5 rounded-full bg-[#131314] hover:bg-[#282A2E] text-[#E3E3E3] border border-white/[0.08] text-xs font-medium flex items-center gap-1.5 labs-pill-btn"
                  >
                    <span>GeBIZ &amp; Funding Pack</span>
                    <ArrowUpRight className="size-3.5 text-[#FDD663]" />
                  </button>
                )}
                {onOpenPedagogyModal && (
                  <button
                    id="cta-open-pedagogy-modal"
                    onClick={onOpenPedagogyModal}
                    className="px-4 py-2.5 rounded-full bg-[#131314] hover:bg-[#282A2E] text-[#9AA0A6] hover:text-white border border-white/[0.08] text-xs font-medium flex items-center gap-1.5 labs-pill-btn"
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
      {/* 6. GOOGLE LABS STYLE DARK FOOTER ("Other teams and product areas")        */}
      {/* ========================================================================= */}
      <footer className="border-t border-white/[0.08] bg-[#0E0E10] py-14 px-4 sm:px-6 lg:px-8 text-xs text-[#9AA0A6]">
        <div className="max-w-[1380px] mx-auto space-y-10">
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-white/[0.06]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#1E1F22] border border-white/[0.12] flex items-center justify-center text-[#A8C7FA]">
                <FlaskConical className="size-4" />
              </div>
              <div>
                <span className="font-display font-bold text-white text-base">Show3D Labs</span>
                <span className="text-[#9AA0A6] ml-2">· Singapore Spatial AI &amp; 3D Creator Programme</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#9AA0A6] mr-2">
                Lab Environments:
              </span>
              <button
                onClick={onStartLearning}
                className="px-3.5 py-1.5 rounded-full bg-[#1E1F22] hover:bg-[#282A2E] text-[#E3E3E3] border border-white/[0.08] transition-colors"
              >
                Student Keynote Lab
              </button>
              <button
                onClick={onOpenTeacherView}
                className="px-3.5 py-1.5 rounded-full bg-[#1E1F22] hover:bg-[#282A2E] text-[#E3E3E3] border border-white/[0.08] transition-colors"
              >
                Facilitator Classroom Hub
              </button>
              {onLaunchCanvasModal && (
                <button
                  onClick={onLaunchCanvasModal}
                  className="px-3.5 py-1.5 rounded-full bg-[#1E1F22] hover:bg-[#282A2E] text-[#A8C7FA] border border-white/[0.08] transition-colors"
                >
                  Show3D WebGL Canvas
                </button>
              )}
              <a
                href="#gravity-lab"
                className="px-3.5 py-1.5 rounded-full bg-[#1E1F22] hover:bg-[#282A2E] text-[#A8C7FA] border border-white/[0.08] transition-colors"
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

            <div className="font-mono text-[11px] text-[#9AA0A6]/70">
              HTTPS Port 443 Verified · Zero Student Data AI Training
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
};
