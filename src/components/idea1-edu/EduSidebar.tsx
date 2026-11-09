import React from 'react';
import { EduState, EduStep } from '../../types';
import { 
  CheckCircle2, 
  Sparkles, 
  ChevronRight, 
  HelpCircle, 
  Send, 
  Sun, 
  Layers, 
  Lightbulb, 
  ShieldCheck, 
  SlidersHorizontal,
  ChevronDown,
  Award
} from 'lucide-react';

interface EduSidebarProps {
  eduState: EduState;
  onChangeStep: (step: EduStep) => void;
  onUpdateEduState: (updates: Partial<EduState>) => void;
  onTriggerGenerate: () => void;
  onOpenTeacherHub: () => void;
  onOpenShowcaseModal: () => void;
}

const STEPS = [
  { id: 1, label: '01 Define Need', desc: 'Identify problem' },
  { id: 2, label: '02 Generate', desc: 'PARTS prompt' },
  { id: 3, label: '03 Refine', desc: 'Materials & solar' },
  { id: 4, label: '04 Present', desc: 'Ethics & showcase' },
];

const ARCHITECTURAL_TAGS = [
  'Curved tensile canopy',
  'Modular timber benches',
  'Integrated solar roof',
  'Cross-ventilation air gaps',
  'Rainwater runoff gutter',
  'Biophilic planter boxes'
];

export const EduSidebar: React.FC<EduSidebarProps> = ({
  eduState,
  onChangeStep,
  onUpdateEduState,
  onTriggerGenerate,
  onOpenTeacherHub,
  onOpenShowcaseModal
}) => {
  const currentStep = eduState.step;

  // Micro-lesson guidance text dynamically tailored to each step
  const getMicroLessonText = () => {
    switch (currentStep) {
      case 1:
        return {
          title: "Micro-Lesson 01 · Human Needs First",
          concept: "AI algorithms cannot feel Singapore's 34°C tropical heat—only human designers can define the problem! Your constraints guide the AI to solve authentic physical needs."
        };
      case 2:
        return {
          title: "Micro-Lesson 02 · The PARTS Prompt Formula",
          concept: "Use PARTS: Persona (Architect), Aim (Courtyard Pavilion), Recipients (Students), Theme (Tensile Canopy), Structure (Modular). Specific architectural tokens prevent AI hallucinations!"
        };
      case 3:
        return {
          title: "Micro-Lesson 03 · Human-in-the-Loop Craft",
          concept: "AI generates the rough mathematical draft; human designers exercise digital craftsmanship. Adjust UV membrane colors, inspect wireframe topology, and add green solar power."
        };
      case 4:
        return {
          title: "Micro-Lesson 04 · Critical AI Literacy & Ethics",
          concept: "Who owns an AI-assisted design? In MOE standards, you hold authorship because your human intentionality and parameter choices guided every step."
        };
      default:
        return { title: '', concept: '' };
    }
  };

  const microCoach = getMicroLessonText();

  return (
    <aside className="w-80 sm:w-96 shrink-0 h-full flex flex-col glass-panel border-r border-white/10 z-30 select-none overflow-hidden bg-zinc-950/80 backdrop-blur-2xl">
      {/* Challenge Title Banner (Slide 26 UI) */}
      <div className="p-4 border-b border-white/10 bg-zinc-900/50">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-blue-500 animate-ping" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">
              Singapore Secondary Pilot · Module 03
            </span>
          </div>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-500/10 text-blue-300 border border-blue-500/20">
            Self-Taught
          </span>
        </div>
        <h2 className="text-sm sm:text-base font-bold text-white tracking-tight leading-snug">
          Design an object that would improve your school
        </h2>
        <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
          Transform the open school courtyard into a shaded outdoor study and collaborative pod.
        </p>
      </div>

      {/* Stepper Tabs (01, 02, 03, 04) */}
      <div className="grid grid-cols-4 p-2 bg-zinc-950/60 border-b border-white/5 gap-1">
        {STEPS.map((s) => {
          const isActive = currentStep === s.id;
          const isDone = currentStep > s.id;
          return (
            <button
              key={s.id}
              onClick={() => onChangeStep(s.id as EduStep)}
              className={`py-2 px-1 rounded-xl text-center transition-all ${
                isActive
                  ? 'bg-blue-600/25 border border-blue-500/50 text-blue-300 shadow-xs'
                  : isDone
                  ? 'bg-white/5 text-emerald-400 border border-emerald-500/20 hover:bg-white/10'
                  : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5'
              }`}
            >
              <div className="text-[11px] font-bold">0{s.id}</div>
              <div className="text-[9px] truncate font-medium mt-0.5">{s.label.split(' ')[1]}</div>
            </button>
          );
        })}
      </div>

      {/* Self-Taught Micro-Lesson Coach Card */}
      <div className="px-4 pt-3">
        <div className="p-3 rounded-xl bg-blue-950/30 border border-blue-500/20 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
              <Lightbulb className="size-3 text-amber-400 shrink-0" />
              {microCoach.title}
            </span>
            <button
              onClick={() => onUpdateEduState({ showMicroCoach: !eduState.showMicroCoach })}
              className="text-zinc-400 hover:text-white"
            >
              <ChevronDown className={`size-3.5 transition-transform ${eduState.showMicroCoach ? 'rotate-180' : ''}`} />
            </button>
          </div>
          {eduState.showMicroCoach && (
            <p className="text-[11px] text-zinc-300 mt-2 leading-relaxed font-sans">
              {microCoach.concept}
            </p>
          )}
        </div>
      </div>

      {/* Dynamic Step Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* STEP 01: DEFINE A NEED */}
        {currentStep === 1 && (
          <div className="space-y-4 animate-fadeIn">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                Step 01 · Understand the Need
              </span>
              <h3 className="text-sm font-semibold text-white tracking-tight mt-0.5">
                Courtyard Heat Problem
              </h3>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                Secondary school students report that the central courtyard is unusable from 12pm to 4pm due to intense tropical heat and sun glare.
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-300">
                Architectural Constraints Checklist:
              </label>
              <div className="space-y-1.5">
                {[
                  { id: 'shade', title: 'UV Sun Shade & Rain Protection', desc: 'Tensile fabric deflecting direct tropical sunlight' },
                  { id: 'vent', title: 'Natural Cross-Ventilation Airflow', desc: 'Open flanks allowing breeze to cool students' },
                  { id: 'seats', title: 'Ergonomic Group Seating (6 pax)', desc: 'Comfortable timber benches for group recess study' },
                  { id: 'solar', title: 'Clean Solar Energy for Evening CCAs', desc: 'Overhead solar panel array powering lighting' }
                ].map((item) => (
                  <div
                    key={item.id}
                    className="p-2.5 rounded-xl bg-zinc-900/70 border border-white/5 flex items-start gap-2.5 transition-all hover:border-white/15"
                  >
                    <CheckCircle2 className="size-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-semibold text-zinc-200">{item.title}</div>
                      <div className="text-[11px] text-zinc-400 mt-0.5 leading-snug">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => onChangeStep(2)}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-blue-600/20"
            >
              <span>Proceed to Step 02: AI Prompting</span>
              <ChevronRight className="size-3.5" />
            </button>
          </div>
        )}

        {/* STEP 02: GENERATE A 3D CONCEPT */}
        {currentStep === 2 && (
          <div className="space-y-4 animate-fadeIn">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                Step 02 · Generate 3D Concept
              </span>
              <h3 className="text-sm font-semibold text-white tracking-tight mt-0.5">
                Prompt Composer (PARTS Framework)
              </h3>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                Describe your shaded pavilion using architectural constraint tags to guide the 3D generation.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label className="font-semibold text-zinc-300">Prompt Input</label>
                <span className="text-[10px] text-emerald-400 font-medium">Safe Prompt Scaffolding</span>
              </div>
              <textarea
                value={eduState.promptText}
                onChange={(e) => onUpdateEduState({ promptText: e.target.value })}
                rows={3}
                className="w-full p-3 rounded-xl bg-zinc-950/80 border border-white/10 text-xs text-zinc-200 focus:outline-hidden focus:border-blue-500 transition-all resize-none leading-relaxed"
                placeholder="Describe your courtyard canopy..."
              />
            </div>

            {/* Quick Prompt Tags */}
            <div className="space-y-1.5">
              <span className="text-[11px] text-zinc-400 font-medium">Click to add architectural tags:</span>
              <div className="flex flex-wrap gap-1.5">
                {ARCHITECTURAL_TAGS.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      if (!eduState.promptText.includes(tag)) {
                        onUpdateEduState({ promptText: `${eduState.promptText.trim()} with ${tag.toLowerCase()}` });
                      }
                    }}
                    className="px-2.5 py-1 rounded-full text-[11px] bg-zinc-900/90 hover:bg-zinc-800 border border-white/10 text-zinc-300 transition-colors flex items-center gap-1"
                  >
                    <span>+</span>
                    <span>{tag}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Action Button */}
            {eduState.isGenerating ? (
              <div className="p-3.5 rounded-xl bg-zinc-900/90 border border-blue-500/40 space-y-2">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-blue-300 flex items-center gap-1.5">
                    <Sparkles className="size-3.5 animate-spin" />
                    Generating 3D mesh concept...
                  </span>
                  <span className="text-blue-400 font-mono font-bold">{eduState.generationProgress}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                  <div
                    className="h-full bg-blue-500 transition-all duration-150 rounded-full"
                    style={{ width: `${eduState.generationProgress}%` }}
                  />
                </div>
              </div>
            ) : (
              <button
                onClick={onTriggerGenerate}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25"
              >
                <Sparkles className="size-3.5" />
                <span>{eduState.modelGenerated ? 'Regenerate 3D Model' : 'Generate 3D Model'}</span>
              </button>
            )}

            {eduState.modelGenerated && !eduState.isGenerating && (
              <button
                onClick={() => onChangeStep(3)}
                className="w-full py-2.5 rounded-xl bg-zinc-800/90 hover:bg-zinc-700/90 text-zinc-200 text-xs font-semibold transition-all flex items-center justify-center gap-1 border border-white/10"
              >
                <span>Proceed to Step 03: Refine & Craft</span>
                <ChevronRight className="size-3.5" />
              </button>
            )}
          </div>
        )}

        {/* STEP 03: EVALUATE & REFINE */}
        {currentStep === 3 && (
          <div className="space-y-4 animate-fadeIn">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                Step 03 · Direct Digital Craft
              </span>
              <h3 className="text-sm font-semibold text-white tracking-tight mt-0.5">
                Refine Materials & Solar Tech
              </h3>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                Take direct creative control over physical finishes and clean energy specs.
              </p>
            </div>

            {/* Canopy Fabric Color Palette */}
            <div className="p-3 rounded-xl bg-zinc-900/60 border border-white/5 space-y-2">
              <label className="text-xs font-semibold text-zinc-300 flex items-center justify-between">
                <span>Canopy Membrane Color</span>
                <span className="text-[10px] text-zinc-400">UV Tensile Fabric</span>
              </label>
              <div className="flex gap-2.5 pt-1">
                {[
                  { name: 'System Blue', color: '#0A84FF' },
                  { name: 'Emerald', color: '#30D158' },
                  { name: 'Warm Amber', color: '#FF9F0A' },
                  { name: 'Crisp White', color: '#E4E4E7' },
                ].map((c) => (
                  <button
                    key={c.color}
                    onClick={() => onUpdateEduState({ canopyColor: c.color })}
                    className={`size-8 rounded-full transition-transform border-2 ${
                      eduState.canopyColor === c.color ? 'scale-115 border-white ring-2 ring-blue-500/50' : 'border-transparent hover:scale-105'
                    }`}
                    style={{ backgroundColor: c.color }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            {/* Solar Array Toggle */}
            <div className="p-3 rounded-xl bg-zinc-900/60 border border-white/5 flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-zinc-200">Integrated Solar Array</div>
                <div className="text-[11px] text-zinc-400">450W rooftop cells for night lighting</div>
              </div>
              <button
                onClick={() => onUpdateEduState({ solarPanelsEnabled: !eduState.solarPanelsEnabled })}
                className={`w-11 h-6 rounded-full transition-colors p-0.5 ${
                  eduState.solarPanelsEnabled ? 'bg-blue-600' : 'bg-zinc-700'
                }`}
              >
                <div
                  className={`size-5 rounded-full bg-white transition-transform ${
                    eduState.solarPanelsEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Wireframe Topology Toggle */}
            <div className="p-3 rounded-xl bg-zinc-900/60 border border-white/5 flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-zinc-200">Wireframe Mesh Inspection</div>
                <div className="text-[11px] text-zinc-400">Check polygon density and vertices</div>
              </div>
              <button
                onClick={() => onUpdateEduState({ wireframeMode: !eduState.wireframeMode })}
                className={`w-11 h-6 rounded-full transition-colors p-0.5 ${
                  eduState.wireframeMode ? 'bg-blue-600' : 'bg-zinc-700'
                }`}
              >
                <div
                  className={`size-5 rounded-full bg-white transition-transform ${
                    eduState.wireframeMode ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <button
              onClick={() => onChangeStep(4)}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-blue-600/20"
            >
              <span>Proceed to Step 04: Present & Ethics</span>
              <ChevronRight className="size-3.5" />
            </button>
          </div>
        )}

        {/* STEP 04: PRESENT & REFLECT */}
        {currentStep === 4 && (
          <div className="space-y-4 animate-fadeIn">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                Step 04 · Think Beyond AI
              </span>
              <h3 className="text-sm font-semibold text-white tracking-tight mt-0.5">
                MOE AI Literacy Reflection
              </h3>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                Reflect on human intent vs algorithmic co-creation. Required for MOE pilot certification.
              </p>
            </div>

            {/* Reflection Question 1 */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300">
                1. How did AI assist your creative intent?
              </label>
              <textarea
                value={eduState.reflectionQuestion1}
                onChange={(e) => onUpdateEduState({ reflectionQuestion1: e.target.value })}
                rows={3}
                className="w-full p-2.5 rounded-xl bg-zinc-950/80 border border-white/10 text-xs text-zinc-200 focus:outline-hidden focus:border-blue-500 leading-relaxed"
              />
            </div>

            {/* Reflection Question 2 */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300">
                2. Ethics: Who owns the design?
              </label>
              <textarea
                value={eduState.reflectionQuestion2}
                onChange={(e) => onUpdateEduState({ reflectionQuestion2: e.target.value })}
                rows={3}
                className="w-full p-2.5 rounded-xl bg-zinc-950/80 border border-white/10 text-xs text-zinc-200 focus:outline-hidden focus:border-blue-500 leading-relaxed"
              />
            </div>

            {/* Submit Showcase Card */}
            <button
              onClick={() => {
                onUpdateEduState({ isSubmitted: true });
                onOpenShowcaseModal();
              }}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20"
            >
              <Award className="size-3.5" />
              <span>{eduState.isSubmitted ? 'View Showcase Certificate' : 'Submit Final Project & Claim Certificate'}</span>
            </button>
          </div>
        )}
      </div>

      {/* Footer: Quick Link to Teacher Hub */}
      <div className="p-3 border-t border-white/10 bg-zinc-950/60 flex items-center justify-between text-xs">
        <button
          onClick={onOpenTeacherHub}
          className="text-zinc-400 hover:text-white flex items-center gap-1.5 text-[11px] font-medium transition-colors"
        >
          <ShieldCheck className="size-3.5 text-blue-400" />
          <span>Teacher Facilitator Hub</span>
        </button>
        <span className="text-[10px] text-zinc-500">MOE 2027 Aligned</span>
      </div>
    </aside>
  );
};
