import React, { useState } from 'react';
import { 
  LEARNING_MODULES, 
  PROGRAMME_DELIVERABLES,
  MACRO_CURRICULUM_PHASES,
  MICRO_LESSON_FLOW
} from '../../store/appStore';
import { 
  ArrowRight, 
  BookOpen, 
  Users, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  Sparkles, 
  ExternalLink, 
  Box, 
  Sliders, 
  ArrowUpRight,
  Lock,
  Building2,
  Check,
  FileText,
  Clock,
  Wifi,
  Coins,
  Activity,
  Layers,
  GraduationCap
} from 'lucide-react';

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

const SCHOOL_LOGOS = [
  'Raffles Institution',
  'Hwa Chong Institution',
  'Cedar Girls’ Secondary',
  'Anglo-Chinese School (Ind.)',
  'Victoria School',
  'Crescent Girls’ School',
  'Tampines Secondary',
  'St. Joseph’s Institution',
];

const PROMPT_SUGGESTIONS = [
  'Curved tensile canopy for midday heat',
  '450W solar roof with USB-C study ports',
  'Biophilic courtyard benches with planter boxes',
  'Aerodynamic cross-ventilation pavilion'
];

export const LandingView: React.FC<LandingViewProps> = ({
  onStartLearning,
  onOpenStudio,
  onViewCurriculum,
  onOpenTeacherView,
  onSelectModule,
  onLaunchCanvasModal,
  onOpenSafetyModal,
  onOpenProcurementModal,
  onOpenPedagogyModal,
}) => {
  const [heroPrompt, setHeroPrompt] = useState('');
  const [previewColor, setPreviewColor] = useState('#5E6BFF');
  const [hasSolar, setHasSolar] = useState(true);
  const [pedagogyTab, setPedagogyTab] = useState<'macro' | 'micro' | 'fourLearns'>('macro');

  const handleApplySuggestion = (text: string) => {
    setHeroPrompt(text);
  };

  const handleLaunchStudioWithPrompt = (e: React.FormEvent) => {
    e.preventDefault();
    onStartLearning();
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#070708] text-[#e5e2e3] font-sans selection:bg-[#5E6BFF] selection:text-white">
      
      {/* ========================================================================= */}
      {/* 1. FIXED 80PX EXECUTIVE HEADER                                            */}
      {/* ========================================================================= */}
      <header className="h-20 bg-[#070708]/95 border-b border-[#232426] px-6 sm:px-8 flex items-center justify-between sticky top-0 z-40 backdrop-blur-md">
        {/* Brand Monogram & Title */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border border-[#9A9DA3]/60 flex items-center justify-center font-bold text-sm text-[#e5e2e3]">
            S
          </div>
          <div className="flex flex-col">
            <span className="font-bold tracking-tighter text-white text-base leading-none">
              SHOW3D
            </span>
            <span className="text-[10px] font-mono text-[#9A9DA3] tracking-widest mt-1">
              SYS // SG_MOE_D&T
            </span>
          </div>
        </div>

        {/* Navigation Anchors */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-mono text-[#9A9DA3]" aria-label="Executive Links">
          <a href="#mockup" className="hover:text-white transition-colors">Mockup Preview</a>
          <a href="#principles" className="hover:text-white transition-colors">Product Principles</a>
          <a href="#intelligence" className="hover:text-white transition-colors">Signal Intelligence</a>
          <a href="#command" className="hover:text-white transition-colors">Command Center</a>
          <a href="#timeline" className="hover:text-white transition-colors">Timeline</a>
          <a href="#curriculum" className="hover:text-white transition-colors">Curriculum</a>
        </nav>

        {/* High-Contrast CTAs */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenTeacherView}
            className="px-3 py-1.5 rounded border border-[#232426] bg-[#101112] text-xs font-medium text-[#9A9DA3] hover:text-white hover:border-[#454655] transition-colors hidden sm:inline-flex items-center gap-1.5"
          >
            <Users className="size-3 text-[#50d8e9]" />
            <span>Teacher Hub</span>
          </button>

          <button
            onClick={onStartLearning}
            className="bg-white hover:bg-[#e5e2e3] text-black font-bold px-4 py-2 rounded text-xs transition-colors shadow-sm flex items-center gap-1.5"
          >
            <span>Launch Student Deck</span>
            <ArrowRight className="size-3" />
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="relative pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-28 pt-8">
        
        {/* ========================================================================= */}
        {/* 2. HERO & 620PX 3-PANE TECHNICAL MOCKUP                                   */}
        {/* ========================================================================= */}
        <section className="text-center space-y-6 pt-6 max-w-5xl mx-auto" id="hero">
          {/* Eyebrow Clinical Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-[#232426] bg-[#101112] text-[11px] font-mono text-[#9A9DA3]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#50d8e9] animate-pulse" />
            <span>SYS // SG_MOE_D&T · EDTECH MASTERPLAN 2030</span>
          </div>

          {/* 76px Manrope Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-[76px] font-[520] tracking-[-0.055em] leading-[1.08] text-white">
            The spatial command deck for focused classrooms
          </h1>

          {/* 19px Muted Subheadline */}
          <p className="text-base sm:text-[19px] text-[#9A9DA3] leading-relaxed max-w-2xl mx-auto font-normal">
            Turn spatial concepts into calm architectural precision. Vendor-taught, teacher-facilitated, and optimized for Singapore D&T secondary classrooms.
          </p>

          {/* High-Contrast Action Buttons & Mono Link */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onStartLearning}
              className="px-6 py-3 rounded bg-white hover:bg-[#e5e2e3] text-black font-bold text-xs sm:text-sm transition-all shadow-md active:scale-98 flex items-center gap-2"
            >
              <BookOpen className="size-4" />
              <span>Enter Student Deck</span>
              <ArrowRight className="size-4" />
            </button>

            <button
              onClick={onOpenTeacherView}
              className="px-5 py-3 rounded bg-[#1a1b1d] hover:bg-[#201f22] text-[#e5e2e3] font-medium text-xs sm:text-sm border border-[#232426] transition-colors flex items-center gap-2"
            >
              <Users className="size-4 text-[#50d8e9]" />
              <span>Open Facilitator Hub</span>
            </button>

            {onLaunchCanvasModal && (
              <button
                onClick={onLaunchCanvasModal}
                className="px-4 py-3 rounded bg-[#101112] hover:bg-[#151617] text-[#9A9DA3] hover:text-white font-medium text-xs sm:text-sm border border-[#232426] transition-colors flex items-center gap-1.5"
              >
                <Box className="size-3.5 text-[#5E6BFF]" />
                <span>3D Canvas Sandbox</span>
              </button>
            )}
          </div>

          <div className="pt-1">
            <a 
              href="#intelligence"
              className="text-[12px] font-mono text-[#9A9DA3] hover:text-[#50d8e9] transition-colors inline-flex items-center gap-1"
            >
              <span>Live operating layer show3d.edu.sg/overview</span>
              <span>→</span>
            </a>
          </div>

          {/* Prompt Synthesis Bar */}
          <div className="pt-4 max-w-2xl mx-auto">
            <form 
              onSubmit={handleLaunchStudioWithPrompt}
              className="p-1.5 rounded-lg bg-[#101112] border border-[#232426] shadow-2xl space-y-2 focus-within:border-[#5E6BFF] transition-colors"
            >
              <div className="flex items-center gap-3 px-3 pt-1.5">
                <Sparkles className="size-4 text-[#bec2ff] shrink-0" />
                <input
                  type="text"
                  value={heroPrompt}
                  onChange={(e) => setHeroPrompt(e.target.value)}
                  placeholder="Describe architectural geometry (e.g., Curved tensile canopy with 450W solar cells)..."
                  className="w-full bg-transparent text-xs sm:text-sm text-white placeholder-[#9A9DA3]/60 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-3.5 py-1.5 rounded bg-[#5E6BFF] hover:bg-[#4a57f5] text-white font-medium text-xs flex items-center gap-1.5 transition-colors shrink-0 shadow-sm"
                >
                  <span>Synthesize</span>
                  <ArrowRight className="size-3" />
                </button>
              </div>

              {/* Suggestions */}
              <div className="px-3 pb-2 pt-1 flex items-center gap-1.5 overflow-x-auto text-[11px] text-[#9A9DA3]">
                <span className="font-mono text-[10px] uppercase tracking-wider shrink-0 text-[#9A9DA3]/70">Try:</span>
                {PROMPT_SUGGESTIONS.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => handleApplySuggestion(item)}
                    className="px-2 py-0.5 rounded bg-[#151617] hover:bg-[#1e1f23] hover:text-white border border-[#232426] shrink-0 transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </form>
          </div>
        </section>

        {/* 620px 3-Pane Technical Preview Mockup */}
        <section id="mockup" className="relative rounded-lg border border-[#232426] bg-[#070708] shadow-[0_4px_32px_rgba(0,0,0,0.6)] overflow-hidden">
          {/* Top Shimmer Highlight */}
          <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {/* Window / Document Bar */}
          <div className="h-9 px-4 bg-[#151617] border-b border-[#232426] flex items-center justify-between text-xs font-mono text-[#9A9DA3]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#50d8e9]" />
              <span className="text-white font-medium">SYS-PREVIEW // MOD-03-COURTYARD-PAVILION.deck</span>
            </div>
            <div className="hidden md:flex items-center gap-4 text-[11px]">
              <span>COHORT: 3-FAITH (28_ACTV)</span>
              <span>PORT: 443_HTTPS</span>
              <span className="text-[#50d8e9]">SYNC: 0.992</span>
            </div>
            <div className="text-[11px] text-white font-semibold">
              STATUS: OPTIMAL // 0x8F22A
            </div>
          </div>

          {/* 3-Pane Technical Preview Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px] lg:h-[620px]">
            
            {/* Left Telemetry Stream Pane */}
            <div className="lg:col-span-3 border-b lg:border-b-0 lg:border-r border-[#232426] bg-[#0d0e0f] p-4 font-mono text-xs space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#232426]">
                <span className="text-white font-semibold">TELEMETRY STREAM</span>
                <span className="text-[10px] text-[#50d8e9] px-1.5 py-0.5 rounded bg-[#004f58]/30 border border-[#50d8e9]/40">LIVE</span>
              </div>

              <div className="space-y-3">
                <div className="p-2.5 rounded bg-[#101112] border border-[#1B1C1E] space-y-1">
                  <div className="text-[10px] text-[#9A9DA3]">COHORT_DENSITY</div>
                  <div className="text-sm font-bold text-white flex items-center justify-between">
                    <span>28 / 28 STUDENTS</span>
                    <span className="text-[10px] text-[#50d8e9]">100% SYNC</span>
                  </div>
                </div>

                <div className="p-2.5 rounded bg-[#101112] border border-[#1B1C1E] space-y-1">
                  <div className="text-[10px] text-[#9A9DA3]">INTENT_FLUX (ANTI-OFFLOAD)</div>
                  <div className="text-sm font-bold text-[#bec2ff] flex items-center justify-between">
                    <span>0.940</span>
                    <span className="text-[10px] text-[#50d8e9]">TARGET_MET</span>
                  </div>
                  <div className="w-full bg-[#070708] h-1 rounded overflow-hidden">
                    <div className="bg-[#5E6BFF] h-full w-[94%]" />
                  </div>
                </div>

                <div className="p-2.5 rounded bg-[#101112] border border-[#1B1C1E] space-y-1">
                  <div className="text-[10px] text-[#9A9DA3]">PLD_LATENCY & PORT</div>
                  <div className="text-xs text-white flex items-center justify-between">
                    <span>1.2ms (SSL/WSS)</span>
                    <span className="text-[#50d8e9]">PORT 443 OK</span>
                  </div>
                </div>

                <div className="p-2.5 rounded bg-[#101112] border border-[#1B1C1E] space-y-1">
                  <div className="text-[10px] text-[#9A9DA3]">CREDIT_POOL_RESERVE</div>
                  <div className="text-xs text-white flex items-center justify-between">
                    <span>3,886 / 5,000</span>
                    <span className="text-[#5E6BFF]">77.7% AVAIL</span>
                  </div>
                </div>

                <div className="p-2.5 rounded bg-[#101112] border border-[#1B1C1E] space-y-1">
                  <div className="text-[10px] text-[#9A9DA3]">Δ_LEARNING_GAIN</div>
                  <div className="text-sm font-bold text-[#50d8e9] flex items-center justify-between">
                    <span>+34.2%</span>
                    <span className="text-[10px] text-[#9A9DA3]">61.8% → 96.0%</span>
                  </div>
                </div>
              </div>

              {/* Sparkline Visual */}
              <div className="pt-2 border-t border-[#232426]">
                <div className="text-[10px] text-[#9A9DA3] mb-1.5 uppercase">Cohort Gain Trend</div>
                <svg viewBox="0 0 100 24" className="w-full h-8 stroke-[#50d8e9] fill-none">
                  <path d="M 0,20 Q 25,18 45,12 T 80,6 T 100,2" strokeWidth="1.5" />
                  <circle cx="100" cy="2" r="2.5" fill="#50d8e9" />
                </svg>
              </div>
            </div>

            {/* Center Viewport Pane: 80px Grid & Architectural Wireframe */}
            <div className="lg:col-span-6 bg-[#050505] p-6 relative flex flex-col items-center justify-center overflow-hidden">
              {/* 80px Ultra-fine grid background */}
              <div 
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.12) 1px, transparent 1px)`,
                  backgroundSize: '80px 80px'
                }}
              />

              {/* Corner Target Reticles */}
              <div className="absolute top-3 left-3 text-[10px] font-mono text-[#9A9DA3]/60">
                + [103.85, 01.29]
              </div>
              <div className="absolute top-3 right-3 text-[10px] font-mono text-[#50d8e9]">
                + [P_OPTIMAL_SYNC]
              </div>
              <div className="absolute bottom-3 left-3 text-[10px] font-mono text-[#9A9DA3]/60">
                + [0x8F22A // MOE_D&T]
              </div>
              <div className="absolute bottom-3 right-3 text-[10px] font-mono text-[#bec2ff]">
                + [Δ_GAIN: +34.2%]
              </div>

              {/* Technical Callout Badges */}
              <div className="absolute top-8 left-8 z-20 px-2 py-1 rounded bg-[#101112]/90 border border-[#232426] text-[10px] font-mono text-[#9A9DA3] space-y-0.5 shadow-lg">
                <div className="text-white font-medium">STRUCTURAL_SEED: 0x8F22A</div>
                <div className="text-[#50d8e9]">CURVATURE_K: 0.72 // NON-COLLAPSING</div>
              </div>

              <div className="absolute top-8 right-8 z-20 px-2 py-1 rounded bg-[#101112]/90 border border-[#232426] text-[10px] font-mono text-[#9A9DA3] space-y-0.5 shadow-lg text-right">
                <div className="text-white font-medium">SOLAR_ARRAY: 450W_ACTIVE</div>
                <div className="text-[#bec2ff]">STUDY_PORTS: 4X USB-C 65W</div>
              </div>

              {/* SVG Architectural Wireframe Mockup */}
              <div className="relative z-10 w-full max-w-sm h-72 flex items-center justify-center">
                <svg viewBox="0 0 400 360" className="w-full h-full drop-shadow-2xl">
                  <defs>
                    <linearGradient id="landingTensileGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={previewColor} />
                      <stop offset="100%" stopColor="#151617" />
                    </linearGradient>
                  </defs>
                  
                  {/* Ground Base Coordinate Plane */}
                  <path d="M 200 290 L 340 220 L 200 160 L 60 220 Z" fill="#0d0e0f" stroke="#232426" strokeWidth="1" />
                  <path d="M 200 290 L 200 160" stroke="#232426" strokeWidth="0.8" strokeDasharray="3 3" />
                  <path d="M 60 220 L 340 220" stroke="#232426" strokeWidth="0.8" strokeDasharray="3 3" />

                  {/* Structural Columns */}
                  <line x1="120" y1="200" x2="120" y2="105" stroke="#9A9DA3" strokeWidth="3" strokeLinecap="round" />
                  <line x1="280" y1="200" x2="280" y2="105" stroke="#9A9DA3" strokeWidth="3" strokeLinecap="round" />
                  <line x1="200" y1="250" x2="200" y2="135" stroke="#454655" strokeWidth="3" strokeLinecap="round" />
                  <line x1="200" y1="170" x2="200" y2="70"  stroke="#e5e2e3" strokeWidth="4" strokeLinecap="round" />

                  {/* Tensile Canopy Mesh */}
                  <path 
                    d="M 200 60 Q 290 85 330 135 Q 260 170 200 145 Q 140 170 70 135 Q 110 85 200 60 Z" 
                    fill="url(#landingTensileGrad)" 
                    stroke="#ffffff" 
                    strokeWidth="1.5" 
                    opacity="0.95" 
                  />

                  {/* Structural Ribs */}
                  <path d="M 200 60 L 200 145" stroke="#ffffff" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
                  <path d="M 70 135 Q 200 100 330 135" stroke="#ffffff" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />

                  {/* 450W Solar Cell Grid */}
                  {hasSolar && (
                    <g>
                      <path d="M 180 65 L 220 65 L 235 90 L 165 90 Z" fill="#004f58" stroke="#50d8e9" strokeWidth="1.2" />
                      <line x1="180" y1="77" x2="220" y2="77" stroke="#50d8e9" strokeWidth="0.8" />
                      <line x1="200" y1="65" x2="200" y2="90" stroke="#50d8e9" strokeWidth="0.8" />
                    </g>
                  )}
                </svg>
              </div>

              {/* Try in Show3D Canvas Button */}
              <div className="absolute bottom-6 z-20">
                <button
                  onClick={onLaunchCanvasModal}
                  className="px-4 py-2 rounded bg-[#5E6BFF] hover:bg-[#4a57f5] text-white text-xs font-mono font-medium shadow-xl flex items-center gap-2 transition-all hover:scale-102"
                >
                  <ExternalLink className="size-3.5" />
                  <span>Try in Show3D Canvas</span>
                </button>
              </div>
            </div>

            {/* Right Signal Summary & Live Decision Log Pane */}
            <div className="lg:col-span-3 border-t lg:border-t-0 lg:border-l border-[#232426] bg-[#0d0e0f] p-4 space-y-4 text-xs font-mono">
              <div className="flex items-center justify-between pb-2 border-b border-[#232426]">
                <span className="text-white font-semibold">SIGNAL SUMMARY</span>
                <span className="text-[10px] text-[#9A9DA3]">COHORT 3-F</span>
              </div>

              {/* Signals */}
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 rounded bg-[#101112] border border-[#1B1C1E]">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#50d8e9]" />
                    <span className="text-[#e5e2e3]">ON_TRACK</span>
                  </div>
                  <span className="font-bold text-[#50d8e9]">22</span>
                </div>

                <div className="flex items-center justify-between p-2 rounded bg-[#101112] border border-[#1B1C1E]">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#ffb689]" />
                    <span className="text-[#e5e2e3]">NEEDS_HELP</span>
                  </div>
                  <span className="font-bold text-[#ffb689]">02</span>
                </div>

                <div className="flex items-center justify-between p-2 rounded bg-[#101112] border border-[#1B1C1E]">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#5E6BFF]" />
                    <span className="text-[#e5e2e3]">COMPLETED</span>
                  </div>
                  <span className="font-bold text-[#5E6BFF]">04</span>
                </div>
              </div>

              {/* Live Decision Log */}
              <div className="pt-2 border-t border-[#232426] space-y-2">
                <div className="text-[10px] text-[#9A9DA3] uppercase tracking-wider">
                  Live Decision Log
                </div>
                <div className="space-y-1.5 text-[11px] text-[#9A9DA3]">
                  <div className="p-1.5 rounded bg-[#101112] border border-[#1B1C1E] text-white/90">
                    <span className="text-[#50d8e9]">10:14:22</span> // OPT_SYNC_APPLIED [ST-04]
                  </div>
                  <div className="p-1.5 rounded bg-[#101112] border border-[#1B1C1E] text-white/90">
                    <span className="text-[#ffb689]">10:15:08</span> // SCAFFOLD_SENT [ST-09]
                  </div>
                  <div className="p-1.5 rounded bg-[#101112] border border-[#1B1C1E] text-white/90">
                    <span className="text-[#bec2ff]">10:16:45</span> // SOLAR_ARRAY_TOGGLED
                  </div>
                  <div className="p-1.5 rounded bg-[#101112] border border-[#1B1C1E] text-white/90">
                    <span className="text-[#50d8e9]">10:18:12</span> // 94.0% INTENT_VERIFIED
                  </div>
                </div>
              </div>

              {/* Live Parametric Swatch & Solar Levers */}
              <div className="pt-2 border-t border-[#232426] space-y-2">
                <div className="text-[10px] text-[#9A9DA3] uppercase">Canopy Spec Levers</div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-[#9A9DA3]">Fabric Albedo:</span>
                  <div className="flex items-center gap-1.5">
                    {['#5E6BFF', '#50d8e9', '#e5e2e3', '#ffb689'].map((hex) => (
                      <button
                        key={hex}
                        onClick={() => setPreviewColor(hex)}
                        style={{ backgroundColor: hex }}
                        className={`w-4 h-4 rounded-full border transition-transform ${
                          previewColor === hex ? 'border-white scale-110' : 'border-transparent opacity-70'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-[#9A9DA3]">450W Solar Cell:</span>
                  <button
                    onClick={() => setHasSolar(!hasSolar)}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono border transition-colors ${
                      hasSolar 
                        ? 'bg-[#004f58] border-[#50d8e9] text-[#50d8e9]' 
                        : 'bg-[#151617] border-[#232426] text-[#9A9DA3]'
                    }`}
                  >
                    {hasSolar ? 'ENABLED' : 'DISABLED'}
                  </button>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* Institutional Schools Marquee */}
        <section className="text-center space-y-4" id="schools">
          <div className="text-[11px] font-mono text-[#9A9DA3] uppercase tracking-widest">
            Institutional Adoption Pathways · Singapore Secondary Schools
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm font-medium text-[#9A9DA3]">
            {SCHOOL_LOGOS.map((school) => (
              <span key={school} className="px-3.5 py-1.5 rounded bg-[#101112] border border-[#232426] text-[#e5e2e3]">
                {school}
              </span>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. PRODUCT PRINCIPLE: 3 TECHNICAL SCHEMATIC CARDS                         */}
        {/* ========================================================================= */}
        <section id="principles" className="space-y-8">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-xs font-mono text-[#50d8e9] uppercase tracking-widest">
              Architectural Principles
            </span>
            <h2 className="text-2xl sm:text-4xl font-[520] tracking-tight text-white">
              Co-design by specification, not passive prompts
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: FIG 0.1 */}
            <div className="h-[400px] bg-[#101112] border border-[#232426] rounded-lg p-6 relative flex flex-col justify-between overflow-hidden group hover:border-[#454655] transition-colors">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-[#50d8e9] font-bold">FIG 0.1 / UNIFIED KEYNOTE VIEW</span>
                  <span className="text-[#9A9DA3]">COORD: 103.85 // 01.29</span>
                </div>

                {/* Dot-pattern well with SVG schematic */}
                <div className="h-44 rounded bg-[#070708] border border-[#1B1C1E] p-4 flex items-center justify-center relative dot-pattern">
                  <svg viewBox="0 0 200 120" className="w-full h-full stroke-[#454655] fill-none">
                    {/* 3-Pane Wireframe Schematic */}
                    <rect x="10" y="10" width="40" height="100" rx="2" strokeWidth="1" />
                    <rect x="55" y="10" width="90" height="100" rx="2" strokeWidth="1" stroke="#5E6BFF" />
                    <rect x="150" y="10" width="40" height="100" rx="2" strokeWidth="1" />
                    <line x1="65" y1="25" x2="135" y2="25" strokeWidth="1" stroke="#e5e2e3" />
                    <line x1="65" y1="40" x2="115" y2="40" strokeWidth="0.8" />
                    <circle cx="100" cy="75" r="18" stroke="#50d8e9" strokeWidth="1" strokeDasharray="3 3" />
                  </svg>
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-white">Unified Keynote View</h3>
                <p className="text-xs text-[#9A9DA3] leading-relaxed">
                  3 visual reading slides, a hands-on 3D co-design challenge, and a 1-question check-in. Eliminates cognitive offloading.
                </p>
              </div>
            </div>

            {/* Card 2: FIG 0.2 */}
            <div className="h-[400px] bg-[#101112] border border-[#232426] rounded-lg p-6 relative flex flex-col justify-between overflow-hidden group hover:border-[#454655] transition-colors">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-[#bec2ff] font-bold">FIG 0.2 / PARTS CO-DESIGN GRAPH</span>
                  <span className="text-[#9A9DA3]">COORD: 34.22 // 11.08</span>
                </div>

                {/* Dot-pattern well with SVG schematic */}
                <div className="h-44 rounded bg-[#070708] border border-[#1B1C1E] p-4 flex items-center justify-center relative dot-pattern">
                  <svg viewBox="0 0 200 120" className="w-full h-full stroke-[#454655] fill-none">
                    {/* PARTS Graph Nodes */}
                    <circle cx="40" cy="35" r="12" stroke="#5E6BFF" strokeWidth="1.2" />
                    <text x="40" y="38" fontSize="8" fill="#5E6BFF" textAnchor="middle" stroke="none">P</text>
                    
                    <circle cx="100" cy="25" r="12" stroke="#50d8e9" strokeWidth="1.2" />
                    <text x="100" y="28" fontSize="8" fill="#50d8e9" textAnchor="middle" stroke="none">A</text>
                    
                    <circle cx="160" cy="35" r="12" stroke="#bec2ff" strokeWidth="1.2" />
                    <text x="160" y="38" fontSize="8" fill="#bec2ff" textAnchor="middle" stroke="none">R</text>
                    
                    <circle cx="70" cy="85" r="12" stroke="#ffb689" strokeWidth="1.2" />
                    <text x="70" y="88" fontSize="8" fill="#ffb689" textAnchor="middle" stroke="none">T</text>
                    
                    <circle cx="130" cy="85" r="12" stroke="#C4FF44" strokeWidth="1.2" />
                    <text x="130" y="88" fontSize="8" fill="#C4FF44" textAnchor="middle" stroke="none">S</text>

                    {/* Connecting Haillines */}
                    <line x1="52" y1="35" x2="88" y2="27" strokeWidth="0.8" />
                    <line x1="112" y1="27" x2="148" y2="35" strokeWidth="0.8" />
                    <line x1="45" y1="46" x2="65" y2="74" strokeWidth="0.8" />
                    <line x1="155" y1="46" x2="135" y2="74" strokeWidth="0.8" />
                    <line x1="82" y1="85" x2="118" y2="85" strokeWidth="0.8" />
                  </svg>
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-white">PARTS Co-Design Graph</h3>
                <p className="text-xs text-[#9A9DA3] leading-relaxed">
                  Persona, Aim, Recipient, Theme, Structure. Students treat AI as a dialectic sparring partner and tune parametric levers.
                </p>
              </div>
            </div>

            {/* Card 3: FIG 0.3 */}
            <div className="h-[400px] bg-[#101112] border border-[#232426] rounded-lg p-6 relative flex flex-col justify-between overflow-hidden group hover:border-[#454655] transition-colors">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-[#C4FF44] font-bold">FIG 0.3 / FORMATIVE RHYTHM</span>
                  <span className="text-[#9A9DA3]">COORD: 77.04 // 42.15</span>
                </div>

                {/* Dot-pattern well with SVG schematic */}
                <div className="h-44 rounded bg-[#070708] border border-[#1B1C1E] p-4 flex items-center justify-center relative dot-pattern">
                  <svg viewBox="0 0 200 120" className="w-full h-full stroke-[#454655] fill-none">
                    {/* 75-min heartbeat wave */}
                    <path d="M 10,60 L 50,60 L 65,20 L 80,95 L 95,50 L 110,65 L 125,60 L 190,60" stroke="#C4FF44" strokeWidth="1.5" />
                    <circle cx="65" cy="20" r="3" fill="#C4FF44" />
                    <circle cx="80" cy="95" r="3" fill="#ffb689" />
                    <line x1="10" y1="60" x2="190" y2="60" stroke="#232426" strokeWidth="0.8" strokeDasharray="2 2" />
                  </svg>
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-white">Formative Rhythm</h3>
                <p className="text-xs text-[#9A9DA3] leading-relaxed">
                  75-minute structured D&T lesson flow with real-time telemetry streams and intervention triggers for student help flags.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. SIGNAL INTELLIGENCE SECTION                                            */}
        {/* ========================================================================= */}
        <section id="intelligence" className="space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#232426] pb-4">
            <div>
              <span className="text-xs font-mono text-[#50d8e9] uppercase tracking-widest block mb-1">
                Telemetry Architecture
              </span>
              <h2 className="text-2xl sm:text-3xl font-[520] tracking-tight text-white">
                Signal Intelligence & Governance
              </h2>
            </div>
            {onOpenSafetyModal && (
              <button
                onClick={onOpenSafetyModal}
                className="px-3.5 py-1.5 rounded border border-[#232426] bg-[#101112] text-xs font-mono text-[#50d8e9] hover:bg-[#151617] transition-colors flex items-center gap-1.5"
              >
                <ShieldCheck className="size-3.5" />
                <span>Inspect Safety Spec</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* 600px Technical Grid Container */}
            <div className="lg:col-span-7 h-[460px] lg:h-[500px] bg-[#050505] border border-[#232426] rounded-lg p-6 relative flex flex-col justify-between overflow-hidden shadow-xl">
              {/* Ultra-fine grid & dot pattern */}
              <div 
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                  backgroundSize: '40px 40px'
                }}
              />

              {/* Corner Reticles */}
              <span className="absolute top-3 left-3 text-[10px] font-mono text-[#9A9DA3]/50">+</span>
              <span className="absolute top-3 right-3 text-[10px] font-mono text-[#9A9DA3]/50">+</span>
              <span className="absolute bottom-3 left-3 text-[10px] font-mono text-[#9A9DA3]/50">+</span>
              <span className="absolute bottom-3 right-3 text-[10px] font-mono text-[#9A9DA3]/50">+</span>

              {/* Header */}
              <div className="relative z-10 flex items-center justify-between text-xs font-mono border-b border-[#232426] pb-2">
                <span className="text-white font-semibold">SIGNAL_THREAD // SEC_3_D&T</span>
                <span className="text-[#50d8e9]">STATUS: ZERO_EXCEPTIONS</span>
              </div>

              {/* Live Telemetry Visualization */}
              <div className="relative z-10 space-y-4 my-auto">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                  <div className="p-2.5 rounded bg-[#101112] border border-[#1B1C1E]">
                    <div className="text-[10px] text-[#9A9DA3]">AGE_LIMIT</div>
                    <div className="text-white font-bold">13+ COMPLIANT</div>
                  </div>
                  <div className="p-2.5 rounded bg-[#101112] border border-[#1B1C1E]">
                    <div className="text-[10px] text-[#9A9DA3]">DATA_POLICY</div>
                    <div className="text-[#50d8e9] font-bold">ZERO_TRAIN</div>
                  </div>
                  <div className="p-2.5 rounded bg-[#101112] border border-[#1B1C1E]">
                    <div className="text-[10px] text-[#9A9DA3]">FIREWALL</div>
                    <div className="text-[#5E6BFF] font-bold">PORT 443</div>
                  </div>
                  <div className="p-2.5 rounded bg-[#101112] border border-[#1B1C1E]">
                    <div className="text-[10px] text-[#9A9DA3]">CREDIT_POOL</div>
                    <div className="text-[#C4FF44] font-bold">5,000 / POOL</div>
                  </div>
                </div>

                {/* Live Terminal Log */}
                <div className="p-3 rounded bg-[#0a0a0c] border border-[#1B1C1E] font-mono text-[11px] text-[#9A9DA3] space-y-1">
                  <div className="text-white/80">
                    <span className="text-[#50d8e9]">09:00:00Z</span> [AUTH] MOE SSO Token handshake verified. Student identifiers hashed.
                  </div>
                  <div className="text-white/80">
                    <span className="text-[#50d8e9]">09:00:14Z</span> [PORT_443] WebSocket stream open: wss://show3d.edu.sg/live/3faith. Zero IT firewall tickets.
                  </div>
                  <div className="text-white/80">
                    <span className="text-[#bec2ff]">09:00:22Z</span> [POOL] 5,000 pooled generation tokens committed to class budget. Zero lockout threshold.
                  </div>
                  <div className="text-white/80">
                    <span className="text-[#C4FF44]">09:00:45Z</span> [SAFETY] Strict keyword and geometry bounds validator active.
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-[#9A9DA3] pt-2 border-t border-[#232426]">
                <span>PLD COMPATIBILITY: CHROMEBOOK / IPAD / WINDOWS</span>
                <span className="text-[#50d8e9]">CERTIFIED // MOE 2026</span>
              </div>
            </div>

            {/* Right Narrative Spec */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-3">
                <div className="w-8 h-8 rounded bg-[#101112] border border-[#232426] flex items-center justify-center text-[#50d8e9]">
                  <Lock className="size-4" />
                </div>
                <h3 className="text-lg font-semibold text-white">Student Safety & Zero Data Retention</h3>
                <p className="text-xs sm:text-sm text-[#9A9DA3] leading-relaxed">
                  Strictly compliant with Singapore Personal Data Protection Act (PDPA). Show3D never retains or trains generative models on student prompts, sketches, or 3D geometries.
                </p>
              </div>

              <div className="space-y-3">
                <div className="w-8 h-8 rounded bg-[#101112] border border-[#232426] flex items-center justify-center text-[#5E6BFF]">
                  <Wifi className="size-4" />
                </div>
                <h3 className="text-lg font-semibold text-white">Native Port 443 PLD Network Readiness</h3>
                <p className="text-xs sm:text-sm text-[#9A9DA3] leading-relaxed">
                  Runs purely over standard HTTPS / WSS (Port 443). Bypasses school firewall restrictions without requiring IT tickets or bespoke subnet configurations.
                </p>
              </div>

              <div className="space-y-3">
                <div className="w-8 h-8 rounded bg-[#101112] border border-[#232426] flex items-center justify-center text-[#C4FF44]">
                  <Coins className="size-4" />
                </div>
                <h3 className="text-lg font-semibold text-white">5,000 Guaranteed Pooled Credits</h3>
                <p className="text-xs sm:text-sm text-[#9A9DA3] leading-relaxed">
                  Classroom generation credits are pooled across the cohort. Zero mid-lesson student lockouts or surprise token charges.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. DECISION COMMAND CENTER SECTION                                        */}
        {/* ========================================================================= */}
        <section id="command" className="space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#232426] pb-4">
            <div>
              <span className="text-xs font-mono text-[#bec2ff] uppercase tracking-widest block mb-1">
                Facilitator Operations
              </span>
              <h2 className="text-2xl sm:text-3xl font-[520] tracking-tight text-white">
                Decision Command Center
              </h2>
            </div>
            <button
              onClick={onOpenTeacherView}
              className="px-4 py-2 rounded bg-white text-black font-bold text-xs hover:bg-[#e5e2e3] transition-colors flex items-center gap-1.5"
            >
              <span>Launch Facilitator Hub</span>
              <ArrowRight className="size-3" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Operational Telemetry Hub */}
            <div className="lg:col-span-7 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-lg bg-[#101112] border border-[#232426] space-y-1">
                  <div className="text-[10px] font-mono text-[#9A9DA3]">MEASURED GROWTH</div>
                  <div className="text-2xl font-bold text-[#50d8e9] font-mono">+34.2%</div>
                  <div className="text-[11px] text-[#9A9DA3]">Pre (61.8%) → Post (96.0%)</div>
                </div>

                <div className="p-4 rounded-lg bg-[#101112] border border-[#232426] space-y-1">
                  <div className="text-[10px] font-mono text-[#9A9DA3]">CREATIVE INTENT</div>
                  <div className="text-2xl font-bold text-[#bec2ff] font-mono">94.0%</div>
                  <div className="text-[11px] text-[#9A9DA3]">Human Intent Standard</div>
                </div>

                <div className="p-4 rounded-lg bg-[#101112] border border-[#232426] space-y-1">
                  <div className="text-[10px] font-mono text-[#9A9DA3]">CLASS CAPACITY</div>
                  <div className="text-2xl font-bold text-white font-mono">28 / 28</div>
                  <div className="text-[11px] text-[#50d8e9]">100% Active in 3-Faith</div>
                </div>
              </div>

              {/* Timeline SVG Analysis Graph */}
              <div className="p-5 rounded-lg bg-[#050505] border border-[#232426] space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-[#9A9DA3]">
                  <span>CAPSTONE SCORE PROGRESSION (CLASS 3-FAITH)</span>
                  <span className="text-[#50d8e9]">+34.2% DELTA</span>
                </div>
                <div className="h-32 w-full">
                  <svg viewBox="0 0 300 100" className="w-full h-full stroke-[#50d8e9] fill-none">
                    <line x1="0" y1="90" x2="300" y2="90" stroke="#232426" strokeWidth="1" />
                    <line x1="0" y1="50" x2="300" y2="50" stroke="#232426" strokeWidth="0.8" strokeDasharray="3 3" />
                    <line x1="0" y1="10" x2="300" y2="10" stroke="#232426" strokeWidth="0.8" strokeDasharray="3 3" />
                    
                    {/* Pre-test baseline curve */}
                    <path d="M 0,70 Q 75,68 150,55 T 250,30 T 300,12" stroke="#50d8e9" strokeWidth="2" />
                    <circle cx="0" cy="70" r="3" fill="#ffb689" />
                    <text x="10" y="82" fontSize="9" fill="#ffb689" stroke="none" fontFamily="monospace">Pre: 61.8%</text>

                    <circle cx="300" cy="12" r="3" fill="#50d8e9" />
                    <text x="235" y="24" fontSize="9" fill="#50d8e9" stroke="none" fontFamily="monospace">Post: 96.0%</text>
                  </svg>
                </div>
              </div>
            </div>

            {/* Right Floating Control Queue Card */}
            <div className="lg:col-span-5 bg-[#101112] border border-[#232426] rounded-lg p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-[#232426] pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#ffb689]" />
                  <span className="text-xs font-mono text-white font-semibold">CONTROL QUEUE</span>
                </div>
                <span className="text-[11px] font-mono text-[#ffb689]">02 INTERVENTIONS</span>
              </div>

              <div className="space-y-2.5">
                <div className="p-3 rounded bg-[#151617] border border-[#232426] space-y-1.5 text-xs">
                  <div className="flex items-center justify-between font-mono text-[11px]">
                    <span className="text-white font-semibold">ST-04 // Marcus Lee</span>
                    <span className="text-[#ffb689]">WARN // HELP_FLAG</span>
                  </div>
                  <p className="text-[11px] text-[#9A9DA3]">Struggling with non-manifold tensile canopy geometry.</p>
                  <div className="pt-1 flex items-center gap-2">
                    <button 
                      onClick={onOpenTeacherView}
                      className="px-2 py-1 rounded bg-[#ffb689]/20 hover:bg-[#ffb689]/30 text-[#ffb689] border border-[#ffb689]/30 text-[10px] font-mono transition-colors"
                    >
                      Send Scaffolding Hint
                    </button>
                    <button 
                      onClick={onOpenTeacherView}
                      className="px-2 py-1 rounded bg-[#101112] hover:bg-[#1f2024] text-[#9A9DA3] hover:text-white border border-[#232426] text-[10px] font-mono transition-colors"
                    >
                      Inspect Mesh
                    </button>
                  </div>
                </div>

                <div className="p-3 rounded bg-[#151617] border border-[#232426] space-y-1.5 text-xs">
                  <div className="flex items-center justify-between font-mono text-[11px]">
                    <span className="text-white font-semibold">ST-09 // Lucas Teo</span>
                    <span className="text-[#ffb689]">WARN // STUCK</span>
                  </div>
                  <p className="text-[11px] text-[#9A9DA3]">Formative Quiz Check incomplete after 2 attempts.</p>
                  <div className="pt-1 flex items-center gap-2">
                    <button 
                      onClick={onOpenTeacherView}
                      className="px-2 py-1 rounded bg-[#ffb689]/20 hover:bg-[#ffb689]/30 text-[#ffb689] border border-[#ffb689]/30 text-[10px] font-mono transition-colors"
                    >
                      Unlock Scaffolding
                    </button>
                  </div>
                </div>

                <div className="p-3 rounded bg-[#151617] border border-[#232426] space-y-1.5 text-xs">
                  <div className="flex items-center justify-between font-mono text-[11px]">
                    <span className="text-white font-semibold">ST-17 // Chloe Tan</span>
                    <span className="text-[#50d8e9]">OK // 98% INTENT</span>
                  </div>
                  <p className="text-[11px] text-[#9A9DA3]">Ready for whole-class projection & review.</p>
                  <div className="pt-1">
                    <button 
                      onClick={onOpenTeacherView}
                      className="px-2 py-1 rounded bg-[#50d8e9]/20 hover:bg-[#50d8e9]/30 text-[#50d8e9] border border-[#50d8e9]/30 text-[10px] font-mono transition-colors"
                    >
                      Project to Display
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. INSIGHTS TIMELINE (4-COLUMN CONNECTED NODES)                           */}
        {/* ========================================================================= */}
        <section id="timeline" className="space-y-8">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-xs font-mono text-[#50d8e9] uppercase tracking-widest">
              Turnkey Institutional Rollout
            </span>
            <h2 className="text-2xl sm:text-4xl font-[520] tracking-tight text-white">
              Connected Adoption Timeline
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            
            {/* Timeline Item 01 */}
            <div className="p-5 rounded-lg bg-[#101112] border border-[#232426] space-y-3 relative hover:border-[#5E6BFF] transition-colors">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-xl font-bold text-[#5E6BFF]">01</span>
                <span className="px-1.5 py-0.5 rounded bg-[#151617] text-[#9A9DA3] text-[10px]">PRE-TERM</span>
              </div>
              <h3 className="text-sm font-semibold text-white">Approval & PDPA</h3>
              <p className="text-xs text-[#9A9DA3] leading-relaxed">
                Zero AI training on student prompts or meshes. School SSO integration and age 13+ compliant safety guardrails.
              </p>
            </div>

            {/* Timeline Item 02 */}
            <div className="p-5 rounded-lg bg-[#101112] border border-[#232426] space-y-3 relative hover:border-[#50d8e9] transition-colors">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-xl font-bold text-[#50d8e9]">02</span>
                <span className="px-1.5 py-0.5 rounded bg-[#151617] text-[#9A9DA3] text-[10px]">BUDGET</span>
              </div>
              <h3 className="text-sm font-semibold text-white">Capacity & Credits</h3>
              <p className="text-xs text-[#9A9DA3] leading-relaxed">
                5,000 pooled generations per cohort. Predictable class budgets with zero mid-lesson student lockouts.
              </p>
            </div>

            {/* Timeline Item 03 */}
            <div className="p-5 rounded-lg bg-[#101112] border border-[#232426] space-y-3 relative hover:border-[#bec2ff] transition-colors">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-xl font-bold text-[#bec2ff]">03</span>
                <span className="px-1.5 py-0.5 rounded bg-[#151617] text-[#9A9DA3] text-[10px]">WEEKS 1-4</span>
              </div>
              <h3 className="text-sm font-semibold text-white">Diagnostic Movement</h3>
              <p className="text-xs text-[#9A9DA3] leading-relaxed">
                1-question formative diagnostic per module. +34.2% growth telemetry tracking authentic student progression.
              </p>
            </div>

            {/* Timeline Item 04 */}
            <div className="p-5 rounded-lg bg-[#101112] border border-[#232426] space-y-3 relative hover:border-[#C4FF44] transition-colors">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-xl font-bold text-[#C4FF44]">04</span>
                <span className="px-1.5 py-0.5 rounded bg-[#151617] text-[#9A9DA3] text-[10px]">WEEKS 5-6</span>
              </div>
              <h3 className="text-sm font-semibold text-white">Classroom Rhythm</h3>
              <p className="text-xs text-[#9A9DA3] leading-relaxed">
                75-min structured D&T lesson flow, certified portfolios, and automated MOE EdTech Masterplan 2030 digital badges.
              </p>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 7. EDITORIAL CUSTOMER QUOTE CARDS (CYAN #D1EBEB & LIME #C4FF44)          */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <div className="text-center space-y-1">
            <span className="text-xs font-mono text-[#9A9DA3] uppercase tracking-widest">
              Field Validation · Singapore Secondary Schools
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            
            {/* 3-Column Card in High-Contrast Cyan (#D1EBEB) */}
            <div className="lg:col-span-3 bg-[#D1EBEB] text-black p-8 rounded-lg border border-[#232426] space-y-4 shadow-xl flex flex-col justify-between">
              <div className="space-y-3">
                <div className="text-2xl font-serif leading-none opacity-40">“</div>
                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-black leading-snug">
                  Show3D transformed our Secondary 3 D&T studio. Students stopped blindly accepting AI outputs and began interrogating curvature, draft angles, and solar wattage.
                </h3>
                <p className="text-xs sm:text-sm text-black/80 leading-relaxed font-normal">
                  The +34.2% measured learning gain in spatial reasoning validated our department's pilot budget instantly. The live facilitator telemetry gave our teachers immediate visibility over struggling students.
                </p>
              </div>

              <div className="pt-4 border-t border-black/10 flex items-center justify-between text-xs font-medium text-black">
                <div>
                  <div className="font-bold">Head of Department (Design & Technology)</div>
                  <div className="opacity-70">Tampines Secondary School · Singapore</div>
                </div>
                <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-black/10">PILOT_COHORT_2026</span>
              </div>
            </div>

            {/* 2-Column Card in High-Contrast Lime (#C4FF44) */}
            <div className="lg:col-span-2 bg-[#C4FF44] text-black p-8 rounded-lg border border-[#232426] space-y-4 shadow-xl flex flex-col justify-between">
              <div className="space-y-3">
                <div className="text-2xl font-serif leading-none opacity-40">“</div>
                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-black leading-snug">
                  Zero IT firewall tickets. Runs natively on student Chromebooks and iPads over Port 443 with 5,000 pooled credits.
                </h3>
                <p className="text-xs sm:text-sm text-black/80 leading-relaxed font-normal">
                  The cleanest GeBIZ procurement package we've onboarded for Secondary D&T. Zero teacher prep overhead.
                </p>
              </div>

              <div className="pt-4 border-t border-black/10 flex items-center justify-between text-xs font-medium text-black">
                <div>
                  <div className="font-bold">Subject Head (EdTech)</div>
                  <div className="opacity-70">Singapore Secondary Institution</div>
                </div>
                <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-black/10">GEBIZ_VERIFIED</span>
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 8. 6-MODULE CURRICULUM & 10 TURNKEY DELIVERABLES MATRIX                   */}
        {/* ========================================================================= */}
        <section id="curriculum" className="space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#232426] pb-4">
            <div>
              <span className="text-xs font-mono text-[#5E6BFF] uppercase tracking-widest block mb-1">
                6-Module Curriculum Pathway
              </span>
              <h2 className="text-2xl sm:text-3xl font-[520] tracking-tight text-white">
                Read, Practice & Build in 3D
              </h2>
            </div>
            {onOpenProcurementModal && (
              <button
                onClick={onOpenProcurementModal}
                className="px-3.5 py-1.5 rounded border border-[#232426] bg-[#101112] text-xs font-mono text-[#ffb689] hover:bg-[#151617] transition-colors flex items-center gap-1.5"
              >
                <FileText className="size-3.5" />
                <span>GeBIZ Procurement Guide</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {LEARNING_MODULES.map((m) => (
              <div
                key={m.id}
                onClick={() => onSelectModule(m.id)}
                className="p-5 rounded-lg bg-[#101112] border border-[#232426] hover:border-[#5E6BFF] transition-all cursor-pointer space-y-4 group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-[#5E6BFF] font-bold px-2 py-0.5 rounded bg-[#151617] border border-[#232426]">
                      {m.code}
                    </span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#151617] text-[#9A9DA3] border border-[#232426] flex items-center gap-1">
                      <Clock className="size-3 text-[#9A9DA3]" />
                      <span>{m.duration}</span>
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-sm font-semibold text-white group-hover:text-[#5E6BFF] transition-colors flex items-center justify-between">
                      <span>{m.title}</span>
                      <ArrowUpRight className="size-4 text-[#9A9DA3] group-hover:text-[#5E6BFF] transition-colors" />
                    </h3>
                    <p className="text-xs text-[#9A9DA3] leading-relaxed line-clamp-2">
                      {m.summary}
                    </p>
                  </div>

                  <div className="p-2.5 rounded bg-[#0a0a0c] border border-[#1B1C1E] text-[11px] text-[#9A9DA3] space-y-0.5">
                    <span className="text-[#9A9DA3]/70 font-mono text-[10px] uppercase block">Challenge:</span>
                    <p className="line-clamp-2 text-white/90">🎯 {m.studentChallenge}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#232426] flex items-center justify-between text-xs">
                  <span className="text-[11px] text-[#9A9DA3] font-mono">
                    Badge: <strong className="text-white font-normal">{m.badgeName}</strong>
                  </span>
                  <span className="px-2.5 py-1 rounded bg-[#5E6BFF] group-hover:bg-[#4a57f5] text-white font-medium text-xs flex items-center gap-1 transition-colors shadow-sm">
                    <BookOpen className="size-3" />
                    <span>Read Lesson →</span>
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* 10 Turnkey Deliverables */}
          <div className="pt-6 border-t border-[#232426] space-y-4">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[#9A9DA3] uppercase tracking-wider">10 Turnkey Programme Deliverables</span>
              <span className="text-[#50d8e9]">10 OF 10 INCLUDED</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {PROGRAMME_DELIVERABLES.map((del) => (
                <div 
                  key={del.id}
                  className="p-3.5 rounded bg-[#101112] border border-[#232426] hover:border-[#454655] transition-colors space-y-2 flex flex-col justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className="text-[#5E6BFF] font-bold">{del.id}</span>
                      <span className="px-1.5 py-0.5 rounded bg-[#151617] text-[#9A9DA3] border border-[#232426] capitalize">
                        {del.category}
                      </span>
                    </div>
                    <h4 className="text-xs font-semibold text-white leading-snug">{del.title}</h4>
                    <p className="text-[11px] text-[#9A9DA3] leading-relaxed line-clamp-2">{del.description}</p>
                  </div>
                  <div className="pt-2 border-t border-[#232426] text-[10px] font-mono text-[#50d8e9] flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <Check className="size-3" />
                      <span>{del.format}</span>
                    </span>
                    <span className="text-[#9A9DA3]">{del.moeAlignment}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 9. FINAL CALL-TO-ACTION (76PX CLOSING STATEMENT)                          */}
        {/* ========================================================================= */}
        <section className="text-center space-y-6 pt-12 pb-6 max-w-4xl mx-auto" id="cta">
          <span className="text-xs font-mono text-[#50d8e9] uppercase tracking-widest block">
            Ready for Singapore Term 1 Deployment
          </span>

          <h2 className="text-4xl sm:text-6xl lg:text-[76px] font-[520] tracking-[-0.055em] leading-[1.08] text-white">
            Built for clarity.<br />Ready for Term 1.
          </h2>

          <p className="text-base sm:text-lg text-[#9A9DA3] leading-relaxed max-w-xl mx-auto font-normal">
            Vendor-taught, teacher-facilitated spatial AI curriculum ready for school enrichment budget deployment.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onStartLearning}
              className="px-8 py-4 rounded bg-white hover:bg-[#e5e2e3] text-black font-bold text-sm transition-all shadow-xl active:scale-98 flex items-center gap-2"
            >
              <span>Launch Student Deck</span>
              <ArrowRight className="size-4" />
            </button>

            <button
              onClick={onOpenTeacherView}
              className="px-6 py-4 rounded bg-[#1a1b1d] hover:bg-[#201f22] text-[#e5e2e3] font-medium text-sm border border-[#232426] transition-colors flex items-center gap-2"
            >
              <Users className="size-4 text-[#50d8e9]" />
              <span>Open Facilitator Hub</span>
            </button>

            {onOpenProcurementModal && (
              <button
                onClick={onOpenProcurementModal}
                className="px-6 py-4 rounded bg-[#101112] hover:bg-[#151617] text-[#9A9DA3] hover:text-white font-medium text-sm border border-[#232426] transition-colors flex items-center gap-2"
              >
                <Building2 className="size-4 text-[#ffb689]" />
                <span>GeBIZ Guidelines</span>
              </button>
            )}
          </div>
        </section>

      </div>

      {/* ========================================================================= */}
      {/* 10. EXECUTIVE OBSIDIAN FOOTER                                             */}
      {/* ========================================================================= */}
      <footer className="bg-[#0d0e0f] border-t border-[#232426] py-12 px-6 sm:px-8 text-xs font-mono text-[#9A9DA3]">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#232426] pb-6">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full border border-[#9A9DA3]/60 flex items-center justify-center font-bold text-xs text-[#e5e2e3]">
                S
              </div>
              <span className="font-bold text-sm text-white">SHOW3D EDUCATION</span>
              <span className="text-[10px] text-[#9A9DA3]">SYS // SG_MOE_D&T · 2026</span>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-[11px]">
              {onOpenSafetyModal && (
                <button onClick={onOpenSafetyModal} className="hover:text-white transition-colors">
                  Student Safety & PDPA
                </button>
              )}
              {onOpenProcurementModal && (
                <button onClick={onOpenProcurementModal} className="hover:text-white transition-colors">
                  Procurement Compliance & GeBIZ
                </button>
              )}
              {onOpenPedagogyModal && (
                <button onClick={onOpenPedagogyModal} className="hover:text-white transition-colors">
                  Pedagogical Framework
                </button>
              )}
              {onLaunchCanvasModal && (
                <button onClick={onLaunchCanvasModal} className="hover:text-white transition-colors">
                  WebGL 3D CAD Engine
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 text-[11px] text-[#9A9DA3]/70">
            <p>
              Funding Disclaimer: In accordance with 2023 MOE decentralization, funding is managed at the school enrichment level. Zero personal student data retained. Runs over Port 443.
            </p>
            <p>
              © 2026 Show3D Technologies. Built for Singapore Secondary D&T Classrooms.
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
};
