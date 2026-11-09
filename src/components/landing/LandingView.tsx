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
  Printer
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

  return (
    <div className="flex-1 overflow-y-auto bg-[#070708] text-[#e5e2e3] font-sans selection:bg-blue-600 selection:text-white">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION                                                           */}
      {/* ========================================================================= */}
      <section className="relative pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center">
        
        {/* Soft Ambient Light Gradient */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[300px] bg-gradient-to-tr from-blue-600/15 via-indigo-600/10 to-transparent blur-[120px] pointer-events-none -z-10" />

        {/* Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-xs text-slate-300 font-medium mb-8">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          <span>Show3D AI Creator Programme · Singapore</span>
        </div>

        {/* Display Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-[1.08] mb-6">
          Give students a hands-on way to create in 3D with AI.
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-normal mb-10">
          A ready-to-run enrichment programme where students aged 10–20 turn ideas into 3D models, refine them with human judgment, and take home their own 3D-printed creation.
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 mb-16">
          <button
            onClick={onStartLearning}
            className="px-6 py-3.5 rounded-full bg-white hover:bg-slate-100 text-black font-semibold text-sm transition-all shadow-lg active:scale-95 flex items-center gap-2"
          >
            <BookOpen className="size-4" />
            <span>Explore Student Classroom</span>
            <ArrowRight className="size-4" />
          </button>

          <button
            onClick={onOpenTeacherView}
            className="px-6 py-3.5 rounded-full bg-white/[0.08] hover:bg-white/[0.12] text-white border border-white/10 font-semibold text-sm transition-all flex items-center gap-2"
          >
            <Users className="size-4 text-blue-400" />
            <span>Instructor & Partner Hub</span>
          </button>

          {onLaunchCanvasModal && (
            <button
              onClick={onLaunchCanvasModal}
              className="px-5 py-3.5 rounded-full bg-transparent hover:bg-white/[0.04] text-slate-300 hover:text-white border border-white/[0.08] font-medium text-sm transition-all flex items-center gap-2"
            >
              <Box className="size-4 text-indigo-400" />
              <span>Try 3D Canvas</span>
            </button>
          )}
        </div>

        {/* Clean Interactive 3D Pavilion Preview Card */}
        <div className="relative rounded-3xl bg-[#101114] border border-white/[0.08] p-6 sm:p-8 max-w-4xl mx-auto shadow-2xl overflow-hidden text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/[0.06] gap-4">
            <div>
              <div className="text-xs uppercase tracking-widest text-blue-400 font-semibold">Interactive Preview</div>
              <h3 className="text-lg font-bold text-white mt-0.5">Courtyard Tensile Canopy Prototype</h3>
            </div>
            
            {/* Interactive Swatches & Solar Toggle */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-slate-400">Color:</span>
                {['#38bdf8', '#818cf8', '#34d399', '#fbbf24'].map((color) => (
                  <button
                    key={color}
                    onClick={() => setPreviewColor(color)}
                    style={{ backgroundColor: color }}
                    className={`w-5 h-5 rounded-full border transition-transform ${
                      previewColor === color ? 'border-white scale-110' : 'border-transparent opacity-75'
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
      {/* 2. THE PROGRAMME & 5-STEP CREATIVE JOURNEY (Slide 22)                     */}
      {/* ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-white/[0.08]" id="curriculum">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs uppercase tracking-widest text-blue-400 font-semibold mb-2">The Programme</div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Two formats, one creative journey.
          </h2>
          <p className="text-base text-slate-400">
            Whether run as an intensive holiday camp or a weekend term-time series, every student completes the same structured 5-stage creative process.
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
              Holiday Camp (5 Half-Days)
            </button>
            <button
              onClick={() => setSelectedFormat('term')}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                selectedFormat === 'term'
                  ? 'bg-white text-black shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Term-Time (6 Weekend Sessions)
            </button>
          </div>
        </div>

        {/* 5-Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          
          {/* Step 1 */}
          <div className="rounded-2xl bg-[#101114] border border-white/[0.08] p-5 flex flex-col justify-between hover:border-white/20 transition-all">
            <div>
              <div className="text-xs font-mono font-bold text-blue-400">01</div>
              <h3 className="text-base font-bold text-white mt-1 mb-2">Define a Need</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                What generative AI is and isn't. Exploring 3D coordinates vs 2D images and setting a clear design goal.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-white/[0.06] text-[11px] text-slate-400">
              Focus: Problem Brief
            </div>
          </div>

          {/* Step 2 */}
          <div className="rounded-2xl bg-[#101114] border border-white/[0.08] p-5 flex flex-col justify-between hover:border-white/20 transition-all">
            <div>
              <div className="text-xs font-mono font-bold text-blue-400">02</div>
              <h3 className="text-base font-bold text-white mt-1 mb-2">Prompt a Model</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Prompt structures, iteration, and managing randomness. Learning to constrain AI outputs with intention.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-white/[0.06] text-[11px] text-slate-400">
              Focus: Base 3D Meshes
            </div>
          </div>

          {/* Step 3 */}
          <div className="rounded-2xl bg-[#101114] border border-white/[0.08] p-5 flex flex-col justify-between hover:border-white/20 transition-all">
            <div>
              <div className="text-xs font-mono font-bold text-blue-400">03</div>
              <h3 className="text-base font-bold text-white mt-1 mb-2">Generate Concepts</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Comparing output variations, understanding algorithm limits, spotting geometry flaws, and picking the best candidate.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-white/[0.06] text-[11px] text-slate-400">
              Focus: Candidate Selection
            </div>
          </div>

          {/* Step 4 */}
          <div className="rounded-2xl bg-[#101114] border border-white/[0.08] p-5 flex flex-col justify-between hover:border-white/20 transition-all">
            <div>
              <div className="text-xs font-mono font-bold text-blue-400">04</div>
              <h3 className="text-base font-bold text-white mt-1 mb-2">Evaluate & Refine</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Human judgment vs AI output. Hands-on sculpting, scale adjustment, and preparing geometry for 3D printing.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-white/[0.06] text-[11px] text-slate-400">
              Focus: Print-Ready .STL
            </div>
          </div>

          {/* Step 5 */}
          <div className="rounded-2xl bg-[#101114] border border-blue-500/30 p-5 flex flex-col justify-between bg-gradient-to-b from-blue-950/20 to-[#101114] hover:border-blue-400 transition-all">
            <div>
              <div className="text-xs font-mono font-bold text-blue-400">05</div>
              <h3 className="text-base font-bold text-white mt-1 mb-2">Showcase & Print</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Presenting to parents and peers. Reflecting on responsible AI use and holding the physical 3D-printed model.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-white/[0.06] text-[11px] text-blue-300 font-medium">
              Takeaway: Physical Model
            </div>
          </div>

        </div>

        <div className="text-center text-xs text-slate-400 font-medium">
          “Every showcase becomes marketing for the next cohort.”
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. THREE AGE TIERS (Slide 23)                                             */}
      {/* ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-white/[0.08]" id="tiers">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs uppercase tracking-widest text-blue-400 font-semibold mb-2">Targeted Learning</div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            One programme, three age tiers.
          </h2>
          <p className="text-base text-slate-400">
            Tailored challenges designed around student capabilities, attention spans, and milestone goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Junior */}
          <div className="rounded-3xl bg-[#101114] border border-white/[0.08] p-8 flex flex-col justify-between">
            <div>
              <div className="text-xs uppercase tracking-widest text-slate-400 font-semibold">Upper Primary · 10–12</div>
              <h3 className="text-2xl font-bold text-white mt-2 mb-4">Junior</h3>
              
              <div className="space-y-4 text-xs text-slate-300 mb-6">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Challenge</span>
                  <p className="text-white text-sm font-medium">Design your own creature, toy, or school utility</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Depth</span>
                  <p className="text-slate-400">Playful prompting, guided spatial steps, and DSA portfolio foundation.</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.06] text-xs text-slate-400">
              Payer: Parents · Holiday Enrichment
            </div>
          </div>

          {/* Teen (Highlighted) */}
          <div className="rounded-3xl bg-[#101114] border border-blue-500/40 p-8 flex flex-col justify-between relative shadow-xl shadow-blue-950/20">
            <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-blue-600 text-white text-[11px] font-bold">
              Launch Focus
            </div>

            <div>
              <div className="text-xs uppercase tracking-widest text-blue-400 font-semibold">Secondary · 13–16</div>
              <h3 className="text-2xl font-bold text-white mt-2 mb-4">Teen</h3>
              
              <div className="space-y-4 text-xs text-slate-300 mb-6">
                <div>
                  <span className="text-[10px] uppercase font-bold text-blue-300 block mb-1">Challenge</span>
                  <p className="text-white text-sm font-medium">Design an object that improves your school or neighbourhood</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-blue-300 block mb-1">Depth</span>
                  <p className="text-slate-300">AI concepts, design thinking, multi-prompt iteration, and mesh slicing.</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.06] text-xs text-slate-300">
              Payer: Parents · Future Skills & Portfolio
            </div>
          </div>

          {/* Young Creator */}
          <div className="rounded-3xl bg-[#101114] border border-white/[0.08] p-8 flex flex-col justify-between">
            <div>
              <div className="text-xs uppercase tracking-widest text-slate-400 font-semibold">ITE & Poly · 16–20</div>
              <h3 className="text-2xl font-bold text-white mt-2 mb-4">Young Creator</h3>
              
              <div className="space-y-4 text-xs text-slate-300 mb-6">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Challenge</span>
                  <p className="text-white text-sm font-medium">A portfolio-grade project for your course or career</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Depth</span>
                  <p className="text-slate-400">Advanced 3D editing, pipeline integration into Blender/CAD, and presenting.</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.06] text-xs text-slate-400">
              Payer: Students / Parents · Job-Ready Skills
            </div>
          </div>

        </div>

        <div className="text-center mt-6 text-xs text-slate-400">
          International-school students join the tier that matches their age.
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. WHAT A FAMILY GETS & WHY CHOOSE IT (Slides 24 & 25)                     */}
      {/* ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-white/[0.08]">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs uppercase tracking-widest text-blue-400 font-semibold mb-2">Tangible Value</div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            What a family gets.
          </h2>
          <p className="text-base text-slate-400">
            Clear deliverables that eliminate the fear of "just paying for screen time."
          </p>
        </div>

        {/* 6-Card Deliverables Grid (Slide 24) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          
          <div className="p-6 rounded-2xl bg-[#101114] border border-white/[0.08]">
            <h4 className="text-base font-bold text-white mb-2">Instructor-Led Sessions</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Small groups with structured daily challenges. Instructors facilitate problem-solving rather than passive lecturing.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#101114] border border-white/[0.08]">
            <h4 className="text-base font-bold text-white mb-2">Show3D Platform Access</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Full access during the camp, plus 30 days of post-camp access so students can continue building independently at home.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#101114] border border-white/[0.08]">
            <h4 className="text-base font-bold text-white mb-2">Final Showcase</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Students present their design process, prompt journey, and physical prototype directly to parents and peers.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#101114] border border-white/[0.08]">
            <h4 className="text-base font-bold text-white mb-2">Certificate of Completion</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Verified proof of completion and design thinking for student academic and DSA (Direct School Admission) portfolios.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#101114] border border-white/[0.08]">
            <h4 className="text-base font-bold text-white mb-2">Their Own 3D Model</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              A physical 3D-printed model to take home, keep, and display—turning digital imagination into real-world reality.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-blue-950/20 border border-blue-500/30">
            <h4 className="text-base font-bold text-blue-300 mb-2">For Parents</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Visible, shareable proof of what their child learned. 85.7% of surveyed parents express high willingness to enrol.
            </p>
          </div>

        </div>

        {/* Competitive Comparison Table (Slide 25) */}
        <div className="rounded-3xl bg-[#101114] border border-white/[0.08] p-6 sm:p-8 overflow-x-auto">
          <div className="mb-6">
            <div className="text-xs uppercase tracking-widest text-blue-400 font-semibold">Competitive Position</div>
            <h3 className="text-xl font-bold text-white mt-1">
              Why families choose Show3D AI Creator
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              The only option that teaches AI and ends with something students made themselves.
            </p>
          </div>

          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 font-mono">
                <th className="py-3 px-4">What families buy today</th>
                <th className="py-3 px-4">Learns AI</th>
                <th className="py-3 px-4">Beginner-friendly</th>
                <th className="py-3 px-4">Takes Home</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06] text-slate-300">
              <tr className="bg-blue-600/10 font-medium text-white">
                <td className="py-3.5 px-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                  <span>Show3D AI Creator</span>
                </td>
                <td className="py-3.5 px-4 text-blue-300 font-bold">Yes</td>
                <td className="py-3.5 px-4 text-blue-300 font-bold">Yes</td>
                <td className="py-3.5 px-4 font-semibold text-white">Physical 3D model</td>
              </tr>
              <tr>
                <td className="py-3 px-4">Coding / robotics camp</td>
                <td className="py-3 px-4 text-slate-400">Partly</td>
                <td className="py-3 px-4 text-slate-400">Varies</td>
                <td className="py-3 px-4">App or robot kit</td>
              </tr>
              <tr>
                <td className="py-3 px-4">3D-printing workshop</td>
                <td className="py-3 px-4 text-slate-400">No</td>
                <td className="py-3 px-4 text-slate-400">Yes</td>
                <td className="py-3 px-4">Printed object</td>
              </tr>
              <tr>
                <td className="py-3 px-4">General AI course</td>
                <td className="py-3 px-4 text-slate-400">Yes</td>
                <td className="py-3 px-4 text-slate-400">Varies</td>
                <td className="py-3 px-4">Rarely</td>
              </tr>
              <tr>
                <td className="py-3 px-4">Self-learning (Blender, free AI)</td>
                <td className="py-3 px-4 text-slate-400">Partly</td>
                <td className="py-3 px-4 text-rose-400 font-medium">No (Steep curve)</td>
                <td className="py-3 px-4">Depends</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. FOR ENRICHMENT CENTRES & CAMP PROVIDERS (Slides 4, 5, 26)              */}
      {/* ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-white/[0.08]" id="partners">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs uppercase tracking-widest text-blue-400 font-semibold mb-2">Partnership Model</div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Built for holiday camp operators & centres.
          </h2>
          <p className="text-base text-slate-400">
            A turn-key package including student software licenses, lesson decks, and instructor training materials.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          <div className="p-7 rounded-3xl bg-[#101114] border border-white/[0.08] space-y-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-sm mb-4">
              1
            </div>
            <h3 className="text-lg font-bold text-white">Ready-to-Use Curriculum</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              No curriculum prep overhead. Full instructor presentation decks, formative questions, and student challenge briefs are built directly into the platform.
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-[#101114] border border-white/[0.08] space-y-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm mb-4">
              2
            </div>
            <h3 className="text-lg font-bold text-white">Prompt Quota Guardrails</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Protects workshop margins. Each student has a set generation quota per session, preventing accidental prompt spamming while teaching deliberate prompt craft.
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-[#101114] border border-white/[0.08] space-y-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-sm mb-4">
              3
            </div>
            <h3 className="text-lg font-bold text-white">Child Safety & Supervised Accounts</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Automated safe-prompt filters block inappropriate content. Managed classroom logins require zero personal email addresses or social sign-ins.
            </p>
          </div>

        </div>

        {/* 4-8 Week Launch Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-950/40 via-indigo-950/30 to-[#101114] border border-blue-500/30 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-xs uppercase tracking-wider text-blue-400 font-semibold">Fast Time to Market</div>
            <h4 className="text-xl font-bold text-white mt-1">Launch in 4–8 Weeks with Your Centre</h4>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              Unlike public school procurement cycles (6–12+ months), enrichment providers can pilot directly in the upcoming June or December school holidays.
            </p>
          </div>

          <button
            onClick={onOpenTeacherView}
            className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all shrink-0 shadow-lg"
          >
            Open Instructor Dashboard
          </button>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. HOW FAMILIES FIND & BOOK IT (Slide 28)                                  */}
      {/* ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-white/[0.08]">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs uppercase tracking-widest text-blue-400 font-semibold mb-2">Customer Journey</div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            How families find and book it.
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 text-center">
          <div className="p-4 rounded-2xl bg-[#101114] border border-white/[0.06]">
            <div className="text-xs font-mono font-bold text-blue-400 mb-1">01</div>
            <div className="text-sm font-bold text-white mb-1">Sees it</div>
            <p className="text-[11px] text-slate-400">Social media, partner listings, newsletters</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#101114] border border-white/[0.06]">
            <div className="text-xs font-mono font-bold text-blue-400 mb-1">02</div>
            <div className="text-sm font-bold text-white mb-1">Weighs it</div>
            <p className="text-[11px] text-slate-400">Price, schedule, sample projects & reviews</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#101114] border border-white/[0.06]">
            <div className="text-xs font-mono font-bold text-blue-400 mb-1">03</div>
            <div className="text-sm font-bold text-white mb-1">Books it</div>
            <p className="text-[11px] text-slate-400">Simple online registration & early-bird pricing</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#101114] border border-white/[0.06]">
            <div className="text-xs font-mono font-bold text-blue-400 mb-1">04</div>
            <div className="text-sm font-bold text-white mb-1">Attends</div>
            <p className="text-[11px] text-slate-400">Small class size, daily hands-on challenges</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#101114] border border-white/[0.06]">
            <div className="text-xs font-mono font-bold text-blue-400 mb-1">05</div>
            <div className="text-sm font-bold text-white mb-1">Showcase</div>
            <p className="text-[11px] text-slate-400">Parents see finished model & student pitch</p>
          </div>

          <div className="p-4 rounded-2xl bg-blue-950/20 border border-blue-500/30">
            <div className="text-xs font-mono font-bold text-blue-400 mb-1">06</div>
            <div className="text-sm font-bold text-white mb-1">Rebooks</div>
            <p className="text-[11px] text-blue-200">Next age tier, term class, and friend referral</p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. CLOSING CTA SECTION                                                    */}
      {/* ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center border-t border-white/[0.08]">
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6">
          Ready to empower the next generation of creators?
        </h2>
        <p className="text-base text-slate-400 max-w-xl mx-auto mb-10">
          Experience the student learning deck or explore the instructor command hub.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onStartLearning}
            className="px-7 py-3.5 rounded-full bg-white hover:bg-slate-100 text-black font-semibold text-sm transition-all shadow-xl active:scale-95 flex items-center gap-2"
          >
            <span>Launch Student Classroom</span>
            <ArrowRight className="size-4" />
          </button>

          <button
            onClick={onOpenTeacherView}
            className="px-7 py-3.5 rounded-full bg-white/[0.08] hover:bg-white/[0.12] text-white border border-white/10 font-semibold text-sm transition-all flex items-center gap-2"
          >
            <Users className="size-4 text-blue-400" />
            <span>Open Instructor Hub</span>
          </button>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. CLEAN APPLE-STYLE FOOTER                                               */}
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
                Partner Information
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
