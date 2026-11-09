import React, { useState } from 'react';
import { 
  ArrowRight, 
  BookOpen, 
  Users, 
  Sparkles, 
  ExternalLink, 
  Box, 
  CheckCircle2, 
  Check, 
  ShieldCheck, 
  Calendar,
  Layers,
  Award,
  Sun,
  Printer,
  Heart,
  Compass,
  Star,
  Clock,
  HelpCircle,
  FileCheck,
  ChevronDown,
  ChevronUp,
  Cpu,
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

export const LandingView: React.FC<LandingViewProps> = ({
  onStartLearning,
  onOpenTeacherView,
  onSelectModule,
  onLaunchCanvasModal,
  onOpenSafetyModal,
  onOpenProcurementModal,
  onOpenPedagogyModal,
}) => {
  const [selectedFormat, setSelectedFormat] = useState<'holiday' | 'term'>('holiday');
  const [previewColor, setPreviewColor] = useState('#38bdf8');
  const [hasSolar, setHasSolar] = useState(true);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#070708] text-[#e5e2e3] font-sans selection:bg-blue-600 selection:text-white">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION (Parent-Centric)                                          */}
      {/* ========================================================================= */}
      <section className="relative pt-14 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center">
        
        {/* Soft Ambient Light Gradient */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[580px] h-[320px] bg-gradient-to-tr from-blue-600/15 via-indigo-600/10 to-transparent blur-[130px] pointer-events-none -z-10" />

        {/* Parent Reassurance Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-xs text-slate-300 font-medium mb-7">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Singapore Holiday Camps & Weekend Enrichment · Ages 10–20</span>
        </div>

        {/* Parent-Oriented Display Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-[1.08] mb-6">
          Turn your child’s screen time into real creative power.
        </h1>

        {/* Subtitle Addressing Parent Aspirations & Fears */}
        <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal mb-8">
          Instead of passively scrolling videos or playing games, your child masters spatial AI, engineers original 3D inventions with human judgment, and brings home their own physical 3D print.
        </p>

        {/* Key Highlights Quick Bar */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 mb-10">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="size-4 text-emerald-400" />
            <span>No prior coding or CAD needed</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="size-4 text-blue-400" />
            <span>Takes home a physical 3D print</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="size-4 text-indigo-400" />
            <span>DSA & portfolio-ready certificate</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="size-4 text-cyan-400" />
            <span>100% child-safe & private</span>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 mb-16">
          <button
            onClick={onStartLearning}
            className="px-7 py-3.5 rounded-full bg-white hover:bg-slate-100 text-black font-semibold text-sm transition-all shadow-xl active:scale-95 flex items-center gap-2"
          >
            <BookOpen className="size-4" />
            <span>Try an Interactive Lesson</span>
            <ArrowRight className="size-4" />
          </button>

          <a
            href="#curriculum"
            className="px-6 py-3.5 rounded-full bg-white/[0.08] hover:bg-white/[0.12] text-white border border-white/10 font-semibold text-sm transition-all flex items-center gap-2"
          >
            <Calendar className="size-4 text-blue-400" />
            <span>Camp Formats & Tiers</span>
          </a>

          {onLaunchCanvasModal && (
            <button
              onClick={onLaunchCanvasModal}
              className="px-5 py-3.5 rounded-full bg-transparent hover:bg-white/[0.04] text-slate-300 hover:text-white border border-white/[0.08] font-medium text-sm transition-all flex items-center gap-2"
            >
              <Box className="size-4 text-indigo-400" />
              <span>Explore 3D Canvas</span>
            </button>
          )}
        </div>

        {/* Clean Interactive 3D Pavilion Preview Card */}
        <div className="relative rounded-3xl bg-[#101114] border border-white/[0.08] p-6 sm:p-8 max-w-4xl mx-auto shadow-2xl overflow-hidden text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/[0.06] gap-4">
            <div>
              <div className="text-xs uppercase tracking-widest text-blue-400 font-semibold">What Your Child Builds in Module 3</div>
              <h3 className="text-lg font-bold text-white mt-0.5">Courtyard Tensile Pavilion Challenge</h3>
              <p className="text-xs text-slate-400 mt-1">Students solve real tropical heat on campus by balancing architectural curvature and renewable solar wattage.</p>
            </div>
            
            {/* Interactive Swatches & Solar Toggle */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-slate-400">Canopy Color:</span>
                {['#38bdf8', '#818cf8', '#34d399', '#fbbf24'].map((color) => (
                  <button
                    key={color}
                    onClick={() => setPreviewColor(color)}
                    style={{ backgroundColor: color }}
                    className={`w-5 h-5 rounded-full border transition-transform ${
                      previewColor === color ? 'border-white scale-110 shadow-sm' : 'border-transparent opacity-75'
                    }`}
                    title={`Set color ${color}`}
                  />
                ))}
              </div>

              <div className="h-4 w-[1px] bg-white/10" />

              <button
                onClick={() => setHasSolar(!hasSolar)}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors flex items-center gap-1.5 ${
                  hasSolar
                    ? 'bg-blue-600/20 border-blue-500/40 text-blue-300'
                    : 'bg-white/[0.04] border-white/10 text-slate-400'
                }`}
              >
                <Sun className="size-3" />
                <span>{hasSolar ? '450W Solar Active' : 'Solar Off'}</span>
              </button>
            </div>
          </div>

          {/* Clean 3D SVG Render */}
          <div className="relative h-64 sm:h-72 flex items-center justify-center my-4">
            <svg viewBox="0 0 400 280" className="w-full h-full max-w-md drop-shadow-2xl">
              <defs>
                <linearGradient id="canopyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={previewColor} />
                  <stop offset="100%" stopColor="#1e1b4b" />
                </linearGradient>
              </defs>

              {/* Ground Plane */}
              <ellipse cx="200" cy="220" rx="140" ry="35" fill="#15171c" stroke="#252830" strokeWidth="1" />
              
              {/* Columns */}
              <line x1="120" y1="210" x2="120" y2="100" stroke="#64748b" strokeWidth="3" strokeLinecap="round" />
              <line x1="280" y1="210" x2="280" y2="100" stroke="#64748b" strokeWidth="3" strokeLinecap="round" />
              <line x1="200" y1="185" x2="200" y2="65" stroke="#94a3b8" strokeWidth="3.5" strokeLinecap="round" />

              {/* Canopy */}
              <path 
                d="M 200 55 Q 290 80 325 125 Q 260 155 200 135 Q 140 155 75 125 Q 110 80 200 55 Z" 
                fill="url(#canopyGradient)" 
                stroke="#ffffff" 
                strokeWidth="1.5" 
                opacity="0.95" 
              />
              <path d="M 200 55 L 200 135" stroke="#ffffff" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />

              {/* Solar Array Grid */}
              {hasSolar && (
                <g>
                  <path d="M 180 62 L 220 62 L 235 84 L 165 84 Z" fill="#0284c7" stroke="#38bdf8" strokeWidth="1" />
                  <line x1="180" y1="73" x2="220" y2="73" stroke="#e0f2fe" strokeWidth="0.8" />
                  <line x1="200" y1="62" x2="200" y2="84" stroke="#e0f2fe" strokeWidth="0.8" />
                </g>
              )}
            </svg>

            {onLaunchCanvasModal && (
              <button
                onClick={onLaunchCanvasModal}
                className="absolute bottom-2 right-2 px-3.5 py-1.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium flex items-center gap-1.5 shadow-md transition-all active:scale-95"
              >
                <ExternalLink className="size-3" />
                <span>Open in 3D Canvas</span>
              </button>
            )}
          </div>

          <div className="pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-slate-400 gap-2">
            <span>Stage 3 of 5: Parametric co-design challenge in Module 3</span>
            <span className="text-slate-300 font-medium">Takes home: Digital 3D model + physical 3D print</span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. THE CORE SHIFT: ACTIVE CREATION VS PASSIVE CONSUMPTION                */}
      {/* ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-white/[0.08]">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs uppercase tracking-widest text-emerald-400 font-semibold mb-2">Why It Matters</div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            From passive screen consumer to active 3D inventor.
          </h2>
          <p className="text-base text-slate-300">
            Most kids today spend hours consuming content generated by others. We teach them how modern generative AI and 3D spatial tools actually work — giving them the confidence to build original ideas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-7 rounded-3xl bg-[#101114] border border-white/[0.08] space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold text-sm mb-4">
              <Box className="size-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Spatial & Engineering Intuition</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Students grasp real coordinate geometry (X, Y, Z), curvature tension, and structural integrity. They don’t just draw pictures; they build functional 3D volumes.
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-[#101114] border border-white/[0.08] space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold text-sm mb-4">
              <Cpu className="size-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Human-in-the-Loop Judgment</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              We teach anti-cognitive offloading: AI is a collaborator, not a shortcut. Students challenge AI outputs, spot structural flaws, and guide every parametric iteration with human purpose.
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-[#101114] border border-white/[0.08] space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-sm mb-4">
              <Printer className="size-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Tangible Real-World Payoff</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Nothing beats the pride of seeing digital designs become physical reality. Every graduate holds their custom 3D-printed model at graduation to show grandparents, parents, and friends.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. THE 5-STEP LEARNING JOURNEY & FLEXIBLE FORMATS                          */}
      {/* ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-white/[0.08]" id="curriculum">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs uppercase tracking-widest text-blue-400 font-semibold mb-2">The Learning Journey</div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Structured steps. Zero frustration.
          </h2>
          <p className="text-base text-slate-300">
            Our self-paced, mentor-guided curriculum breaks down complex 3D engineering into five achievable, rewarding milestones.
          </p>

          {/* Format Toggle Pill */}
          <div className="mt-8 inline-flex p-1 rounded-full bg-white/[0.06] border border-white/[0.08]">
            <button
              onClick={() => setSelectedFormat('holiday')}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                selectedFormat === 'holiday'
                  ? 'bg-white text-black shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              5-Day Holiday Camp (Half-Days)
            </button>
            <button
              onClick={() => setSelectedFormat('term')}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                selectedFormat === 'term'
                  ? 'bg-white text-black shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              6-Week Weekend Masterclass
            </button>
          </div>

          <div className="mt-4 text-xs text-slate-400">
            {selectedFormat === 'holiday' 
              ? '📅 Runs during Singapore March, June, September & November/December school holidays (Mon–Fri, 9:00am–12:30pm or 1:30pm–5:00pm).'
              : '📅 Runs during school terms (1 session per week on Saturdays or Sundays, 2.0 hours per session).'}
          </div>
        </div>

        {/* 5-Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-10">
          
          {/* Step 1 */}
          <div className="rounded-2xl bg-[#101114] border border-white/[0.08] p-5 flex flex-col justify-between hover:border-white/20 transition-all">
            <div>
              <div className="text-xs font-mono font-bold text-blue-400">STEP 01</div>
              <h3 className="text-base font-bold text-white mt-1 mb-2">Discover a Need</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Students investigate real environmental problems (such as Singapore’s 34°C afternoon courtyard heat) and define functional design constraints.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-white/[0.06] text-[11px] text-slate-400">
              Outcome: Design Brief
            </div>
          </div>

          {/* Step 2 */}
          <div className="rounded-2xl bg-[#101114] border border-white/[0.08] p-5 flex flex-col justify-between hover:border-white/20 transition-all">
            <div>
              <div className="text-xs font-mono font-bold text-blue-400">STEP 02</div>
              <h3 className="text-base font-bold text-white mt-1 mb-2">Prompt with Purpose</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                They learn structured prompt engineering (Persona, Aim, Recipients, Theme, Structure) to guide spatial AI without random trial-and-error.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-white/[0.06] text-[11px] text-slate-400">
              Outcome: Initial 3D Meshes
            </div>
          </div>

          {/* Step 3 */}
          <div className="rounded-2xl bg-[#101114] border border-white/[0.08] p-5 flex flex-col justify-between hover:border-white/20 transition-all">
            <div>
              <div className="text-xs font-mono font-bold text-blue-400">STEP 03</div>
              <h3 className="text-base font-bold text-white mt-1 mb-2">Critique & Select</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Students compare AI candidate options, inspect polygon topologies, identify non-manifold errors, and select the optimal structural base.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-white/[0.06] text-[11px] text-slate-400">
              Outcome: Verified Geometry
            </div>
          </div>

          {/* Step 4 */}
          <div className="rounded-2xl bg-[#101114] border border-white/[0.08] p-5 flex flex-col justify-between hover:border-white/20 transition-all">
            <div>
              <div className="text-xs font-mono font-bold text-blue-400">STEP 04</div>
              <h3 className="text-base font-bold text-white mt-1 mb-2">Refine with Levers</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Human craftsmanship takes over: custom UV tensile fabric swatches, 450W solar array toggles, curvature tensioning, and wall-thickness prep for 3D slicing.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-white/[0.06] text-[11px] text-slate-400">
              Outcome: Print-Ready 3D Asset
            </div>
          </div>

          {/* Step 5 */}
          <div className="rounded-2xl bg-[#101114] border border-blue-500/30 p-5 flex flex-col justify-between bg-gradient-to-b from-blue-950/20 to-[#101114] hover:border-blue-400 transition-all">
            <div>
              <div className="text-xs font-mono font-bold text-blue-400">STEP 05</div>
              <h3 className="text-base font-bold text-white mt-1 mb-2">Showcase & Print</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                The grand finale: students confidently present their design thinking to parents and take home their tangible 3D-printed creation!
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-white/[0.06] text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
              <Printer className="size-3" />
              <span>Physical 3D Print Take-Home</span>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. WHAT YOUR FAMILY GETS (Tangible Deliverables)                           */}
      {/* ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-white/[0.08]">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs uppercase tracking-widest text-emerald-400 font-semibold mb-2">Tangible Value</div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Everything your child takes home.
          </h2>
          <p className="text-base text-slate-300">
            We know parents dislike paying for unstructured screen time. Every Show3D programme guarantees six verifiable deliverables.
          </p>
        </div>

        {/* 6-Card Deliverables Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          
          <div className="p-6 rounded-2xl bg-[#101114] border border-emerald-500/30 bg-gradient-to-b from-emerald-950/10 to-[#101114] space-y-2">
            <div className="size-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
              <Printer className="size-4" />
            </div>
            <h4 className="text-base font-bold text-white">Physical 3D-Printed Invention</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              A real, custom-engineered model 3D-printed in eco-friendly PLA filament. Ready to display on their study desk with pride.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#101114] border border-blue-500/30 bg-gradient-to-b from-blue-950/10 to-[#101114] space-y-2">
            <div className="size-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center mb-3">
              <Award className="size-4" />
            </div>
            <h4 className="text-base font-bold text-white">Verified DSA & School Portfolio Badge</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Official Digital Certificate showing MOE 21st Century Competencies, design-thinking mastery, and 94% Human Creative Intent.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#101114] border border-white/[0.08] space-y-2">
            <div className="size-8 rounded-lg bg-white/10 text-white flex items-center justify-center mb-3">
              <Users className="size-4" />
            </div>
            <h4 className="text-base font-bold text-white">1:8 Dedicated Instructor Mentorship</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Small group cohorts taught by passionate STEM educators. Every student gets personalized guidance — no one is left behind.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#101114] border border-white/[0.08] space-y-2">
            <div className="size-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-3">
              <GraduationCap className="size-4" />
            </div>
            <h4 className="text-base font-bold text-white">Parent Showcase & Presentation</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Parents are invited to the final session to watch their child pitch their design journey, explain their engineering choices, and demonstrate their prototype.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#101114] border border-white/[0.08] space-y-2">
            <div className="size-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-3">
              <ShieldCheck className="size-4" />
            </div>
            <h4 className="text-base font-bold text-white">100% Child-Safe Digital Environment</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Singapore PDPA compliant. School SSO login, zero tracking, strict automated safe-prompt filtering, and zero AI training on child work.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#101114] border border-white/[0.08] space-y-2">
            <div className="size-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center mb-3">
              <Clock className="size-4" />
            </div>
            <h4 className="text-base font-bold text-white">30-Day Extended Home Studio Access</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Your child retains full access for 30 days after camp to keep experimenting, building new models, and downloading .GLTF/.STL 3D files at home.
            </p>
          </div>

        </div>

        {/* Competitive Comparison Table */}
        <div className="rounded-3xl bg-[#101114] border border-white/[0.08] p-6 sm:p-8 overflow-x-auto">
          <div className="mb-6">
            <div className="text-xs uppercase tracking-widest text-blue-400 font-semibold">The Difference</div>
            <h3 className="text-xl font-bold text-white mt-1">
              How Show3D compares to other programmes
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Why parents choose Show3D AI Creator over traditional coding workshops or passive tuition.
            </p>
          </div>

          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 font-mono">
                <th className="py-3 px-4">Programme Type</th>
                <th className="py-3 px-4">Teaches Modern AI</th>
                <th className="py-3 px-4">Beginner Friendly</th>
                <th className="py-3 px-4">Original Human Judgment</th>
                <th className="py-3 px-4">Takes Home Physical Artifact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06] text-slate-300">
              <tr className="bg-blue-600/10 font-medium text-white">
                <td className="py-3.5 px-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="font-bold">Show3D AI Creator</span>
                </td>
                <td className="py-3.5 px-4 text-emerald-400 font-bold">Yes (Spatial 3D)</td>
                <td className="py-3.5 px-4 text-emerald-400 font-bold">Yes (No CAD needed)</td>
                <td className="py-3.5 px-4 text-emerald-400 font-bold">Yes (94% Intent Score)</td>
                <td className="py-3.5 px-4 text-emerald-400 font-bold">Physical 3D Print</td>
              </tr>
              <tr>
                <td className="py-3 px-4">Coding / Robotics Camp</td>
                <td className="py-3 px-4 text-slate-400">Rarely / Abstract</td>
                <td className="py-3 px-4 text-slate-400">Moderate</td>
                <td className="py-3 px-4 text-slate-400">Script copying</td>
                <td className="py-3 px-4 text-slate-400">Digital code / screen only</td>
              </tr>
              <tr>
                <td className="py-3 px-4">Traditional 3D Workshop</td>
                <td className="py-3 px-4 text-slate-400">No AI</td>
                <td className="py-3 px-4 text-rose-400">Steep CAD learning curve</td>
                <td className="py-3 px-4 text-slate-400">Manual CAD</td>
                <td className="py-3 px-4 text-slate-300">Pre-downloaded trinket</td>
              </tr>
              <tr>
                <td className="py-3 px-4">General AI / Prompt Course</td>
                <td className="py-3 px-4 text-slate-300">Text & 2D images only</td>
                <td className="py-3 px-4 text-slate-300">Yes</td>
                <td className="py-3 px-4 text-rose-400">Passive prompt spamming</td>
                <td className="py-3 px-4 text-slate-400">No physical output</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. THREE AGE TIERS TAILORED FOR EVERY LEARNER                             */}
      {/* ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-white/[0.08]" id="tiers">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs uppercase tracking-widest text-blue-400 font-semibold mb-2">Age-Appropriate Learning</div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Curriculum tailored for your child’s age.
          </h2>
          <p className="text-base text-slate-300">
            From playful discovery in primary school to portfolio-grade capstones in secondary and polytechnic.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Junior Tier */}
          <div className="rounded-3xl bg-[#101114] border border-white/[0.08] p-8 flex flex-col justify-between hover:border-white/20 transition-all">
            <div>
              <div className="text-xs uppercase tracking-widest text-slate-400 font-semibold">Upper Primary · Ages 10–12</div>
              <h3 className="text-2xl font-bold text-white mt-2 mb-3">Junior Creator</h3>
              <p className="text-xs text-slate-400 mb-6">
                Designed to spark excitement for STEM and build early spatial intuition before PSLE or secondary transition.
              </p>
              
              <div className="space-y-3.5 text-xs text-slate-300 mb-6">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Focus Project</span>
                  <p className="text-white text-sm font-medium">Original Creature, Desk Mascot, or School Utility</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Key Competency</span>
                  <p className="text-slate-300">Playful prompt vocabulary, spatial orientation, early DSA portfolio artifacts.</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.06] text-xs text-slate-400 flex items-center justify-between">
              <span>Class Size: Max 8 students</span>
              <span className="text-emerald-400 font-medium">Beginner Friendly</span>
            </div>
          </div>

          {/* Teen Tier (Highlighted) */}
          <div className="rounded-3xl bg-[#101114] border border-blue-500/40 p-8 flex flex-col justify-between relative shadow-xl shadow-blue-950/20 hover:border-blue-400 transition-all">
            <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-blue-600 text-white text-[11px] font-bold">
              Most Popular
            </div>

            <div>
              <div className="text-xs uppercase tracking-widest text-blue-400 font-semibold">Secondary 1–4 · Ages 13–16</div>
              <h3 className="text-2xl font-bold text-white mt-2 mb-3">Teen Innovator</h3>
              <p className="text-xs text-slate-300 mb-6">
                Aligned with MOE D&T (Design & Technology) and Computing. Gives students a powerful edge in school projects and DSA applications.
              </p>
              
              <div className="space-y-3.5 text-xs text-slate-300 mb-6">
                <div>
                  <span className="text-[10px] uppercase font-bold text-blue-300 block mb-1">Focus Project</span>
                  <p className="text-white text-sm font-medium">Smart Campus Heat Pavilion or Sustainable Urban Artifact</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-blue-300 block mb-1">Key Competency</span>
                  <p className="text-slate-300">PARTS prompt scaffolding, parametric levers, mesh slicing, and human intentionality score.</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.06] text-xs text-slate-300 flex items-center justify-between">
              <span>Class Size: Max 10 students</span>
              <span className="text-blue-300 font-medium">MOE 21CC Aligned</span>
            </div>
          </div>

          {/* Young Creator Tier */}
          <div className="rounded-3xl bg-[#101114] border border-white/[0.08] p-8 flex flex-col justify-between hover:border-white/20 transition-all">
            <div>
              <div className="text-xs uppercase tracking-widest text-slate-400 font-semibold">JC, ITE & Poly · Ages 16–20</div>
              <h3 className="text-2xl font-bold text-white mt-2 mb-3">Young Specialist</h3>
              <p className="text-xs text-slate-400 mb-6">
                For youth pursuing architecture, industrial design, engineering, or game development. Industry-grade workflow foundations.
              </p>
              
              <div className="space-y-3.5 text-xs text-slate-300 mb-6">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Focus Project</span>
                  <p className="text-white text-sm font-medium">Portfolio-Grade Architectural Capstone or Product Prototype</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Key Competency</span>
                  <p className="text-slate-300">Advanced 3D topology, CSG boolean modeling, export to Blender/CAD pipelines.</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.06] text-xs text-slate-400 flex items-center justify-between">
              <span>Class Size: Max 10 students</span>
              <span className="text-indigo-400 font-medium">Career Portfolio</span>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. PARENT FAQS (Interactive Accordion)                                    */}
      {/* ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-white/[0.08]">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs uppercase tracking-widest text-blue-400 font-semibold mb-2">Frequently Asked Questions</div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
            Questions parents ask us most.
          </h2>
          <p className="text-sm text-slate-400">
            Everything you need to know about preparing your child for the programme.
          </p>
        </div>

        <div className="space-y-3">
          {[
            {
              q: "Does my child need prior coding, 3D modeling, or art experience?",
              a: "None at all! Our curriculum is designed from the ground up for complete beginners. Our interactive micro-lessons and dedicated 1:8 mentors guide students step-by-step from zero to a finished, printable 3D model."
            },
            {
              q: "What equipment or device does my child need to bring?",
              a: "Show3D runs 100% in any standard web browser (Chrome, Safari, Edge) over secure Port 443. Students can use their school MOE Personal Learning Device (PLD iPad, Chromebook, or Windows laptop) or any home laptop. No heavy software installations required."
            },
            {
              q: "How does my child receive their physical 3D print?",
              a: "During the final module, students prepare their 3D geometry for slicing. Our high-precision 3D printer lab prints each custom design in durable, non-toxic PLA. The model is handed directly to your child at the final showcase presentation."
            },
            {
              q: "How does this programme help with Direct School Admission (DSA) or school portfolios?",
              a: "Students receive an official Digital Certificate with a verifiable credential ID (e.g., SHOW3D-TPSS-2026-0842) displaying MOE 21st Century Competencies and their verified Human Creative Intent score (94%+). This provides rigorous, concrete evidence of original problem-solving and spatial thinking."
            },
            {
              q: "How is my child's privacy and online safety protected?",
              a: "We adhere strictly to Singapore PDPA standards. Classes use school-managed or cohort SSO with zero personal emails or telephone numbers collected. Our platform features automated safe-prompt filters and enforces a strict policy: zero student prompts or 3D models are ever used to train AI models."
            }
          ].map((faq, idx) => (
            <div 
              key={idx}
              className="rounded-2xl bg-[#101114] border border-white/[0.08] overflow-hidden transition-all"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full py-4 px-6 text-left flex items-center justify-between text-sm font-semibold text-white hover:text-blue-300 transition-colors"
              >
                <span>{faq.q}</span>
                {expandedFaq === idx ? (
                  <ChevronUp className="size-4 text-blue-400 shrink-0 ml-4" />
                ) : (
                  <ChevronDown className="size-4 text-slate-500 shrink-0 ml-4" />
                )}
              </button>
              {expandedFaq === idx && (
                <div className="px-6 pb-4 pt-1 text-xs text-slate-300 leading-relaxed border-t border-white/[0.04]">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. DISCREET INSTITUTIONAL & SCHOOL PARTNER GATEWAY                         */}
      {/* ========================================================================= */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-white/[0.08]" id="schools">
        <div className="p-8 rounded-3xl bg-[#0c0d10] border border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-left">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-mono uppercase tracking-wider">
              <span>Institutional Gateway</span>
            </div>
            <h3 className="text-xl font-bold text-white">
              Are you a School Head, D&T Teacher, or Camp Provider?
            </h3>
            <p className="text-xs text-slate-400 max-w-xl">
              Show3D is deployed as a turnkey "Vendor-Taught, Teacher-Facilitated" programme. We provide GeBIZ quotations, MOE EdTech Masterplan 2030 rubrics, and automated class telemetry.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={onOpenTeacherView}
              className="px-5 py-2.5 rounded-full bg-white/[0.08] hover:bg-white/[0.12] text-white border border-white/10 text-xs font-semibold transition-all flex items-center gap-2"
            >
              <Users className="size-3.5 text-blue-400" />
              <span>Instructor Command Hub</span>
            </button>
            
            {onOpenProcurementModal && (
              <button
                onClick={onOpenProcurementModal}
                className="px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-all flex items-center gap-2 shadow-sm"
              >
                <span>GeBIZ & Procurement Pack</span>
                <ArrowRight className="size-3.5" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. CLOSING PARENT CTA SECTION                                             */}
      {/* ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center border-t border-white/[0.08]">
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6">
          Give your child the skills to shape the 3D world.
        </h2>
        <p className="text-base text-slate-300 max-w-xl mx-auto mb-10">
          Try a live interactive lesson right now in your browser, or explore our holiday camp schedule and age tiers.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onStartLearning}
            className="px-8 py-3.5 rounded-full bg-white hover:bg-slate-100 text-black font-semibold text-sm transition-all shadow-xl active:scale-95 flex items-center gap-2"
          >
            <span>Launch Student Classroom</span>
            <ArrowRight className="size-4" />
          </button>

          {onOpenSafetyModal && (
            <button
              onClick={onOpenSafetyModal}
              className="px-6 py-3.5 rounded-full bg-white/[0.08] hover:bg-white/[0.12] text-white border border-white/10 font-semibold text-sm transition-all flex items-center gap-2"
            >
              <ShieldCheck className="size-4 text-emerald-400" />
              <span>Parent Safety & PDPA</span>
            </button>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. CLEAN APPLE-STYLE FOOTER                                               */}
      {/* ========================================================================= */}
      <footer className="border-t border-white/[0.08] bg-[#050507] py-12 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center font-bold text-xs text-white">
              S
            </div>
            <span className="font-semibold text-slate-300">SHOW3D AI CREATOR PROGRAMME</span>
            <span>· Singapore</span>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            {onOpenSafetyModal && (
              <button onClick={onOpenSafetyModal} className="hover:text-slate-300 transition-colors">
                Safety & Privacy
              </button>
            )}
            {onOpenProcurementModal && (
              <button onClick={onOpenProcurementModal} className="hover:text-slate-300 transition-colors">
                Procurement & Partners
              </button>
            )}
            {onOpenPedagogyModal && (
              <button onClick={onOpenPedagogyModal} className="hover:text-slate-300 transition-colors">
                Pedagogy Framework
              </button>
            )}
          </div>
        </div>
      </footer>

    </div>
  );
};
