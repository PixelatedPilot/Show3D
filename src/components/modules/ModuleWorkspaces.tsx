import React, { useState } from 'react';
import { EduState, EduStep, CameraViewPreset } from '../../types';
import { LEARNING_MODULES, MODULE_QUIZZES, ANNOTATION_PINS } from '../../store/appStore';
import { ThreeCanvas } from '../canvas/ThreeCanvas';
import { ModuleQuiz } from './ModuleQuiz';
import { 
  ArrowRight, 
  Check, 
  RotateCcw,
  Sun,
  Layers,
  Award,
  Download,
  Eye,
  Thermometer,
  CloudRain,
  Wind,
  ShieldCheck,
  Cpu,
  FileText,
  Sparkles,
  ChevronRight
} from 'lucide-react';

interface ModuleWorkspacesProps {
  eduState: EduState;
  onChangeStep: (step: EduStep) => void;
  onUpdateEduState: (updates: Partial<EduState>) => void;
  onTriggerGenerate: () => void;
  onOpenCertificateModal: () => void;
  onSelectModule: (id: number) => void;
  onRecordQuizScore: (moduleId: number, score: number) => void;
}

export const ModuleWorkspaces: React.FC<ModuleWorkspacesProps> = ({
  eduState,
  onChangeStep,
  onUpdateEduState,
  onTriggerGenerate,
  onOpenCertificateModal,
  onSelectModule,
  onRecordQuizScore,
}) => {
  const activeModuleId = eduState.activeModuleId || 1;
  const currentModule = LEARNING_MODULES.find((m) => m.id === activeModuleId) || LEARNING_MODULES[0];
  const quizData = MODULE_QUIZZES[activeModuleId];

  // Module 2 local state: Campus climate simulator
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<'morning' | 'midday' | 'afternoon'>('midday');

  // Module 5 local state: Peer critique submission
  const [critiquePinId, setCritiquePinId] = useState<string>('pin-canopy');
  const [critiqueText, setCritiqueText] = useState<string>(
    'The curved tensile canopy effectively deflects midday sun glare, but increasing the side clearance by 20cm would improve cross-ventilation during humid afternoons.'
  );
  const [critiqueSubmitted, setCritiqueSubmitted] = useState<boolean>(false);

  // Advance to next module
  const handleAdvanceNextModule = () => {
    if (activeModuleId < 6) {
      onSelectModule(activeModuleId + 1);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden select-none font-sans bg-[#121214] text-zinc-200">
      {/* Top Module Sub-Header Strip (Apple HIG Segmented Module Switcher) */}
      <div className="h-11 px-4 border-b border-zinc-800 bg-[#18181b] flex items-center justify-between z-30 shrink-0">
        <div className="flex items-center gap-2 text-xs">
          <span className="font-semibold text-white tracking-tight">{currentModule.code}:</span>
          <span className="text-zinc-300 font-medium truncate max-w-[200px] sm:max-w-none">
            {currentModule.title}
          </span>
          <span className="text-zinc-600 hidden sm:inline">·</span>
          <span className="text-[11px] font-mono text-zinc-500 hidden sm:inline">
            {currentModule.duration}
          </span>
        </div>

        {/* 6-Module Quick Tabs */}
        <div className="flex items-center bg-zinc-900 border border-zinc-800 p-0.5 rounded-lg overflow-x-auto max-w-[500px]">
          {LEARNING_MODULES.map((m) => {
            const isActive = m.id === activeModuleId;
            const hasQuizScore = eduState.quizScores[m.id] !== undefined;

            return (
              <button
                key={m.id}
                onClick={() => onSelectModule(m.id)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-colors flex items-center gap-1 shrink-0 ${
                  isActive
                    ? 'bg-zinc-800 text-white font-medium shadow-xs'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
                title={`${m.code}: ${m.title}`}
              >
                {hasQuizScore && <Check className="size-2.5 text-emerald-400" />}
                <span>M{m.id}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Module Content Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-8 max-w-5xl mx-auto w-full space-y-8">
        {/* ========================================================================= */}
        {/* MODULE 1: FOUNDATIONS OF 3D & SPATIAL AI */}
        {/* ========================================================================= */}
        {activeModuleId === 1 && (
          <div className="space-y-6">
            <div className="space-y-1.5 border-b border-zinc-800 pb-4">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-blue-400 uppercase tracking-wider">
                  Learn About AI · Module 1
                </span>
                <span className="text-zinc-600">·</span>
                <span className="text-xs text-zinc-400">Spatial Coordinates & 3D Topology</span>
              </div>
              <h2 className="text-xl font-semibold text-white tracking-tight">
                Foundations of 3D Coordinates & Spatial AI
              </h2>
              <p className="text-xs text-zinc-400 leading-relaxed max-w-3xl">
                Explore how computers construct physical forms using 3D coordinates (X, Y, Z), vertices, and polygonal meshes, rather than flat 2D image pixels.
              </p>
            </div>

            {/* Micro-Lesson: Pixels vs Polygons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-zinc-800 bg-[#161618] space-y-2">
                <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-blue-500" />
                  <span>2D Image Synthesis (Pixels)</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  2D generative models produce a fixed grid of colored pixels. Once generated, you cannot inspect the back, calculate structural load, or measure physical dimensions.
                </p>
                <div className="text-[11px] font-mono text-zinc-500 bg-zinc-900/60 p-2 rounded-md border border-zinc-800">
                  Data: RGB Pixel Matrix (Width × Height) · No volumetric depth
                </div>
              </div>

              <div className="p-4 rounded-xl border border-blue-900/40 bg-blue-950/10 space-y-2">
                <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-emerald-500" />
                  <span>3D Spatial AI (Coordinates & Meshes)</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Spatial AI synthesizes explicit 3D geometry: points in space (vertices), connecting lines (edges), and triangular faces (polygons) with true 360° volume.
                </p>
                <div className="text-[11px] font-mono text-blue-300 bg-zinc-900/60 p-2 rounded-md border border-zinc-800">
                  Data: Vertices (X, Y, Z) + Surface Normals + Material Shaders
                </div>
              </div>
            </div>

            {/* Interactive 3D Geometry Explorer */}
            <div className="p-4 rounded-xl border border-zinc-800 bg-[#161618] space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                <div>
                  <h4 className="font-semibold text-white">Interactive 3D Geometry Viewer</h4>
                  <p className="text-[11px] text-zinc-400">Click and drag to orbit 360°. Inspect surface normals and wireframe topology.</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onUpdateEduState({ wireframeMode: !eduState.wireframeMode })}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors flex items-center gap-1.5 ${
                      eduState.wireframeMode
                        ? 'bg-blue-600 border-blue-500 text-white'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Layers className="size-3.5" />
                    <span>{eduState.wireframeMode ? 'Wireframe Mode: ON' : 'Wireframe Mode: OFF'}</span>
                  </button>
                </div>
              </div>

              {/* Viewport Box */}
              <div className="h-72 w-full rounded-lg overflow-hidden border border-zinc-800 relative bg-zinc-950">
                <ThreeCanvas
                  eduState={eduState}
                  onUpdateEduState={onUpdateEduState}
                />
              </div>

              {/* Live Coordinate Telemetry */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400">
                  <span className="text-zinc-500">Vertex Count: </span>
                  <span className="text-white">2,480</span>
                </div>
                <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400">
                  <span className="text-zinc-500">Faces: </span>
                  <span className="text-white">4,810 tris</span>
                </div>
                <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400">
                  <span className="text-zinc-500">Coordinates: </span>
                  <span className="text-emerald-400">X, Y, Z (m)</span>
                </div>
                <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400">
                  <span className="text-zinc-500">Surface Normal: </span>
                  <span className="text-blue-400">Up (0, 1, 0)</span>
                </div>
              </div>
            </div>

            {/* Formative Quiz */}
            {quizData && (
              <ModuleQuiz
                quizData={quizData}
                onComplete={(score) => onRecordQuizScore(1, score)}
                onNextModule={handleAdvanceNextModule}
                nextModuleTitle="Module 2: Site Analysis"
              />
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODULE 2: SITE ANALYSIS & FUNCTIONAL REQUIREMENTS */}
        {/* ========================================================================= */}
        {activeModuleId === 2 && (
          <div className="space-y-6">
            <div className="space-y-1.5 border-b border-zinc-800 pb-4">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-blue-400 uppercase tracking-wider">
                  Learn With AI · Module 2
                </span>
                <span className="text-zinc-600">·</span>
                <span className="text-xs text-zinc-400">Singapore Campus Microclimate Audit</span>
              </div>
              <h2 className="text-xl font-semibold text-white tracking-tight">
                Site Analysis & Functional Requirements
              </h2>
              <p className="text-xs text-zinc-400 leading-relaxed max-w-3xl">
                Analyze equatorial heat, direct solar glare, and tropical squalls in the school courtyard. Learn to translate human discomfort into quantifiable engineering specifications.
              </p>
            </div>

            {/* Singapore Campus Microclimate Simulator */}
            <div className="p-5 rounded-xl border border-zinc-800 bg-[#161618] space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                <div>
                  <h4 className="font-semibold text-white">Campus Courtyard Climate Simulator</h4>
                  <p className="text-[11px] text-zinc-400">Simulate equatorial conditions across the school day.</p>
                </div>

                <div className="flex items-center bg-zinc-900 border border-zinc-800 p-0.5 rounded-lg">
                  {[
                    { id: 'morning', label: '10:00 AM (Morning Shade)' },
                    { id: 'midday', label: '01:30 PM (Midday Heat Peak)' },
                    { id: 'afternoon', label: '04:30 PM (Monsoon Squall)' }
                  ].map((slot) => (
                    <button
                      key={slot.id}
                      onClick={() => setSelectedTimeSlot(slot.id as any)}
                      className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                        selectedTimeSlot === slot.id
                          ? 'bg-zinc-800 text-white shadow-xs'
                          : 'text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      {slot.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Climate Metric Readouts */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-lg border border-zinc-800 bg-zinc-900/60 space-y-1">
                  <div className="flex items-center gap-2 text-xs text-zinc-400">
                    <Thermometer className="size-3.5 text-rose-400" />
                    <span>Ambient Temperature</span>
                  </div>
                  <div className="text-xl font-semibold text-white font-mono">
                    {selectedTimeSlot === 'morning' ? '29.2°C' : selectedTimeSlot === 'midday' ? '34.8°C' : '31.0°C'}
                  </div>
                  <div className="text-[11px] text-zinc-500">
                    {selectedTimeSlot === 'midday' ? 'Severe heat stress on outdoor benches' : 'Moderate ambient heat'}
                  </div>
                </div>

                <div className="p-3.5 rounded-lg border border-zinc-800 bg-zinc-900/60 space-y-1">
                  <div className="flex items-center gap-2 text-xs text-zinc-400">
                    <Sun className="size-3.5 text-amber-400" />
                    <span>Solar Glare Intensity</span>
                  </div>
                  <div className="text-xl font-semibold text-white font-mono">
                    {selectedTimeSlot === 'morning' ? '42,000 Lux' : selectedTimeSlot === 'midday' ? '98,500 Lux' : '18,000 Lux'}
                  </div>
                  <div className="text-[11px] text-zinc-500">
                    {selectedTimeSlot === 'midday' ? 'Requires >85% UV deflection canopy' : 'Diffused ambient light'}
                  </div>
                </div>

                <div className="p-3.5 rounded-lg border border-zinc-800 bg-zinc-900/60 space-y-1">
                  <div className="flex items-center gap-2 text-xs text-zinc-400">
                    <Wind className="size-3.5 text-blue-400" />
                    <span>Cross-Ventilation Need</span>
                  </div>
                  <div className="text-xl font-semibold text-white font-mono">
                    {selectedTimeSlot === 'morning' ? '1.2 m/s' : selectedTimeSlot === 'midday' ? '0.4 m/s (Stagnant)' : '3.8 m/s (Squall)'}
                  </div>
                  <div className="text-[11px] text-zinc-500">
                    Aerodynamic openings required to prevent heat entrapment
                  </div>
                </div>
              </div>

              {/* Design Brief Specifications Checklist */}
              <div className="pt-2 border-t border-zinc-800 space-y-2">
                <div className="text-xs font-semibold text-white">Target Engineering Specifications:</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {[
                    { title: 'Tensile PTFE Canopy', desc: 'Deflects direct sunlight and rain while keeping structure lightweight.' },
                    { title: 'Cross-Ventilation Openings', desc: 'Open side geometry to maintain natural airflow without air-con.' },
                    { title: 'Modular Timber Seating', desc: 'Ergonomic study benches accommodating 6-student study groups.' },
                    { title: 'Clean Solar Rooftop Array', desc: '450W monocrystalline cells for evening study lights and device charging.' }
                  ].map((req, i) => (
                    <div key={i} className="p-3 rounded-lg border border-zinc-800 bg-zinc-900/40 flex items-start gap-2.5">
                      <Check className="size-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium text-white">{req.title}</div>
                        <div className="text-[11px] text-zinc-400 mt-0.5">{req.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Formative Quiz */}
            {quizData && (
              <ModuleQuiz
                quizData={quizData}
                onComplete={(score) => onRecordQuizScore(2, score)}
                onNextModule={handleAdvanceNextModule}
                nextModuleTitle="Module 3: Courtyard Studio"
              />
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODULE 3: COURTYARD PAVILION DESIGN STUDIO */}
        {/* ========================================================================= */}
        {activeModuleId === 3 && (
          <div className="space-y-6">
            <div className="space-y-1.5 border-b border-zinc-800 pb-4">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-blue-400 uppercase tracking-wider">
                  Learn to Use AI · Module 3
                </span>
                <span className="text-zinc-600">·</span>
                <span className="text-xs text-zinc-400">Structured PARTS Prompt Engineering</span>
              </div>
              <h2 className="text-xl font-semibold text-white tracking-tight">
                Courtyard Pavilion Design Studio
              </h2>
              <p className="text-xs text-zinc-400 leading-relaxed max-w-3xl">
                Formulate architectural prompts using the PARTS framework (Persona, Aim, Recipients, Theme, Structure) to synthesize and iteratively refine the courtyard pavilion.
              </p>
            </div>

            {/* 4-Step Interactive Progression */}
            <div className="flex items-center bg-zinc-900 border border-zinc-800 p-0.5 rounded-lg max-w-md">
              {[
                { id: 1, label: '1. Brief' },
                { id: 2, label: '2. Prompt' },
                { id: 3, label: '3. 3D Model' },
                { id: 4, label: '4. Review' }
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => onChangeStep(s.id as EduStep)}
                  className={`flex-1 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    eduState.step === s.id
                      ? 'bg-zinc-800 text-white shadow-xs'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            {/* Step 1: Brief */}
            {eduState.step === 1 && (
              <div className="p-6 rounded-xl border border-zinc-800 bg-[#161618] space-y-4">
                <h3 className="text-base font-semibold text-white">Project Challenge: Central Courtyard Thermal Comfort</h3>
                <p className="text-xs text-zinc-300 leading-relaxed max-w-2xl">
                  {eduState.problemNeed}
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => onChangeStep(2)}
                    className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs transition-colors flex items-center gap-2"
                  >
                    <span>Proceed to Prompt Composer</span>
                    <ArrowRight className="size-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Prompt Composer */}
            {eduState.step === 2 && (
              <div className="p-6 rounded-xl border border-zinc-800 bg-[#161618] space-y-4">
                <div className="space-y-1">
                  <h3 className="text-base font-semibold text-white">PARTS Prompt Engineering Workbench</h3>
                  <p className="text-xs text-zinc-400">
                    Formulate structured semantic instructions to guide the spatial generation engine.
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-medium text-zinc-300">Prompt Formulation:</label>
                  <textarea
                    rows={3}
                    value={eduState.promptText}
                    onChange={(e) => onUpdateEduState({ promptText: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-blue-500 font-sans leading-relaxed"
                  />
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <button
                    onClick={() => {
                      onTriggerGenerate();
                      onChangeStep(3);
                    }}
                    className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs transition-colors flex items-center gap-2"
                  >
                    <Sparkles className="size-3.5" />
                    <span>Synthesize 3D Model</span>
                  </button>
                  <span className="text-xs text-zinc-500">Takes ~2 seconds to generate.</span>
                </div>
              </div>
            )}

            {/* Step 3: Interactive 3D Model */}
            {eduState.step === 3 && (
              <div className="p-4 rounded-xl border border-zinc-800 bg-[#161618] space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div>
                    <h4 className="font-semibold text-white">Courtyard Pavilion 3D Synthesis</h4>
                    <p className="text-[11px] text-zinc-400">Orbit with mouse or touch. Adjust camera angles and solar elements.</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onUpdateEduState({ solarPanelsEnabled: !eduState.solarPanelsEnabled })}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
                        eduState.solarPanelsEnabled
                          ? 'bg-blue-600 border-blue-500 text-white'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                      }`}
                    >
                      Solar Roof: {eduState.solarPanelsEnabled ? 'ON (450W)' : 'OFF'}
                    </button>
                    <button
                      onClick={() => onChangeStep(4)}
                      className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white font-medium text-xs border border-zinc-700 transition-colors"
                    >
                      Next: Review Sheet →
                    </button>
                  </div>
                </div>

                <div className="h-80 w-full rounded-lg overflow-hidden border border-zinc-800 relative bg-zinc-950">
                  <ThreeCanvas
                    eduState={eduState}
                    onUpdateEduState={onUpdateEduState}
                  />
                </div>
              </div>
            )}

            {/* Step 4: Review */}
            {eduState.step === 4 && (
              <div className="p-6 rounded-xl border border-zinc-800 bg-[#161618] space-y-4">
                <h3 className="text-base font-semibold text-white">Project Evaluation & Reflection</h3>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {eduState.reflectionQuestion1}
                </p>
                <div className="pt-2 flex items-center gap-3">
                  <button
                    onClick={onOpenCertificateModal}
                    className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs transition-colors flex items-center gap-2"
                  >
                    <Award className="size-3.5" />
                    <span>View MOE Completion Record</span>
                  </button>
                </div>
              </div>
            )}

            {/* Formative Quiz */}
            {quizData && (
              <ModuleQuiz
                quizData={quizData}
                onComplete={(score) => onRecordQuizScore(3, score)}
                onNextModule={handleAdvanceNextModule}
                nextModuleTitle="Module 4: Materials & Solar"
              />
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODULE 4: MATERIALS, SOLAR INTEGRATION & DIGITAL CRAFT */}
        {/* ========================================================================= */}
        {activeModuleId === 4 && (
          <div className="space-y-6">
            <div className="space-y-1.5 border-b border-zinc-800 pb-4">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-blue-400 uppercase tracking-wider">
                  Learn to Use AI · Module 4
                </span>
                <span className="text-zinc-600">·</span>
                <span className="text-xs text-zinc-400">Physical Fabrication & Clean Energy Specs</span>
              </div>
              <h2 className="text-xl font-semibold text-white tracking-tight">
                Materials, Solar Integration, and Inspection
              </h2>
              <p className="text-xs text-zinc-400 leading-relaxed max-w-3xl">
                Apply direct human craft to refine surface textures, configure clean energy solar systems, and inspect polygon topology for physical 3D manufacturing.
              </p>
            </div>

            {/* Material & Solar Workbench */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Controls */}
              <div className="space-y-4">
                {/* Canopy Shader Color */}
                <div className="p-4 rounded-xl border border-zinc-800 bg-[#161618] space-y-2">
                  <div className="text-xs font-semibold text-white">Canopy Membrane Material:</div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: 'Tensile Blue', color: '#0A84FF', desc: 'UV-deflecting polymer' },
                      { label: 'Marine Navy', color: '#2563EB', desc: 'Solar glare absorbent' },
                      { label: 'Eco Forest', color: '#16A34A', desc: 'Biophilic courtyard tone' },
                      { label: 'Clean White', color: '#F4F4F5', desc: 'High thermal albedo' }
                    ].map((mat) => (
                      <button
                        key={mat.color}
                        onClick={() => onUpdateEduState({ canopyColor: mat.color })}
                        className={`p-2 rounded-lg border text-left transition-colors ${
                          eduState.canopyColor === mat.color
                            ? 'bg-zinc-800 border-blue-500 text-white'
                            : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div className="size-3 rounded-full border border-zinc-700" style={{ backgroundColor: mat.color }} />
                          <span className="text-xs font-medium">{mat.label}</span>
                        </div>
                        <div className="text-[10px] text-zinc-500 mt-0.5">{mat.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 450W Solar Calculation Card */}
                <div className="p-4 rounded-xl border border-zinc-800 bg-[#161618] space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-white">450W Solar Energy Metrics:</span>
                    <button
                      onClick={() => onUpdateEduState({ solarPanelsEnabled: !eduState.solarPanelsEnabled })}
                      className={`px-2 py-0.5 rounded text-[11px] font-mono ${
                        eduState.solarPanelsEnabled ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-zinc-800 text-zinc-400'
                      }`}
                    >
                      {eduState.solarPanelsEnabled ? 'ACTIVE' : 'DISABLED'}
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                    <div className="p-2 rounded bg-zinc-900 border border-zinc-800">
                      <div className="text-[10px] text-zinc-500">Daily Yield</div>
                      <div className="font-semibold text-white mt-0.5">1.89 kWh</div>
                    </div>
                    <div className="p-2 rounded bg-zinc-900 border border-zinc-800">
                      <div className="text-[10px] text-zinc-500">LED Lighting</div>
                      <div className="font-semibold text-emerald-400 mt-0.5">38 Hours</div>
                    </div>
                    <div className="p-2 rounded bg-zinc-900 border border-zinc-800">
                      <div className="text-[10px] text-zinc-500">PLD Charges</div>
                      <div className="font-semibold text-blue-400 mt-0.5">24 Chromebooks</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Viewport Box */}
              <div className="h-full min-h-[300px] rounded-xl overflow-hidden border border-zinc-800 relative bg-zinc-950">
                <ThreeCanvas
                  eduState={eduState}
                  onUpdateEduState={onUpdateEduState}
                />
              </div>
            </div>

            {/* Formative Quiz */}
            {quizData && (
              <ModuleQuiz
                quizData={quizData}
                onComplete={(score) => onRecordQuizScore(4, score)}
                onNextModule={handleAdvanceNextModule}
                nextModuleTitle="Module 5: Collaborative Review"
              />
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODULE 5: COLLABORATIVE SPATIAL REVIEW */}
        {/* ========================================================================= */}
        {activeModuleId === 5 && (
          <div className="space-y-6">
            <div className="space-y-1.5 border-b border-zinc-800 pb-4">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-blue-400 uppercase tracking-wider">
                  Learn With AI · Module 5
                </span>
                <span className="text-zinc-600">·</span>
                <span className="text-xs text-zinc-400">Peer Critique & 3D Spatial Pins</span>
              </div>
              <h2 className="text-xl font-semibold text-white tracking-tight">
                Collaborative Spatial Review
              </h2>
              <p className="text-xs text-zinc-400 leading-relaxed max-w-3xl">
                Anchoring feedback directly onto 3D components eliminates verbal ambiguity. Inspect classmate models and formulate objective, rubric-aligned design feedback.
              </p>
            </div>

            {/* 3D Model with Spatial Pins */}
            <div className="p-4 rounded-xl border border-zinc-800 bg-[#161618] space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                <div>
                  <h4 className="font-semibold text-white">Anchored Spatial Annotation Stage</h4>
                  <p className="text-[11px] text-zinc-400">Select a component to inspect peer critique pins.</p>
                </div>

                <div className="flex items-center gap-1.5">
                  {ANNOTATION_PINS.map((pin) => (
                    <button
                      key={pin.id}
                      onClick={() => setCritiquePinId(pin.id)}
                      className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                        critiquePinId === pin.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                      }`}
                    >
                      {pin.title}
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-72 w-full rounded-lg overflow-hidden border border-zinc-800 relative bg-zinc-950">
                <ThreeCanvas
                  eduState={eduState}
                  onUpdateEduState={onUpdateEduState}
                />
              </div>

              {/* Critique Input Sheet */}
              <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-800 space-y-2 text-xs">
                <div className="font-semibold text-white flex items-center justify-between">
                  <span>Constructive Peer Review (MOE Rubric Criterion 3):</span>
                  {critiqueSubmitted && (
                    <span className="text-[11px] text-emerald-400 font-mono">Submitted to Class Roster ✓</span>
                  )}
                </div>
                <textarea
                  rows={2}
                  value={critiqueText}
                  onChange={(e) => setCritiqueText(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-2.5 text-xs text-zinc-200 focus:outline-none focus:border-blue-500 font-sans"
                />
                <button
                  onClick={() => setCritiqueSubmitted(true)}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs transition-colors"
                >
                  Submit Spatial Critique Pin
                </button>
              </div>
            </div>

            {/* Formative Quiz */}
            {quizData && (
              <ModuleQuiz
                quizData={quizData}
                onComplete={(score) => onRecordQuizScore(5, score)}
                onNextModule={handleAdvanceNextModule}
                nextModuleTitle="Module 6: Ethics & Authorship"
              />
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODULE 6: DESIGN ETHICS, AUTHORSHIP & EXPORT */}
        {/* ========================================================================= */}
        {activeModuleId === 6 && (
          <div className="space-y-6">
            <div className="space-y-1.5 border-b border-zinc-800 pb-4">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-blue-400 uppercase tracking-wider">
                  Learn Beyond AI · Module 6
                </span>
                <span className="text-zinc-600">·</span>
                <span className="text-xs text-zinc-400">Authorship, Ethics & Verified Portfolio</span>
              </div>
              <h2 className="text-xl font-semibold text-white tracking-tight">
                Design Ethics, Authorship, and Export
              </h2>
              <p className="text-xs text-zinc-400 leading-relaxed max-w-3xl">
                Evaluate intellectual property, human intentionality versus algorithmic output, and computational sustainability. Generate your official MOE completion record.
              </p>
            </div>

            {/* Authorship Breakdown Matrix */}
            <div className="p-5 rounded-xl border border-zinc-800 bg-[#161618] space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-white">Creative Authorship Breakdown Matrix</h4>
                  <p className="text-[11px] text-zinc-400">Documenting human agency vs machine synthesis.</p>
                </div>
                <div className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                  92% Human-Directed Authorship
                </div>
              </div>

              <div className="space-y-2">
                {[
                  { phase: 'Problem Discovery & Need Framing', human: '100%', ai: '0%', role: 'Identified midday 34°C courtyard heat' },
                  { phase: 'Engineering Constraints & Specs', human: '100%', ai: '0%', role: 'Defined shade factor, cross-ventilation, 6 seats' },
                  { phase: 'Prompt Formulation (PARTS)', human: '100%', ai: '0%', role: 'Structured semantic architectural modifiers' },
                  { phase: 'Volumetric 3D Synthesis', human: '30%', ai: '70%', role: 'Neural model synthesized raw mesh from prompt' },
                  { phase: 'Material & Solar Refinement', human: '100%', ai: '0%', role: 'Selected tensile fabric and 450W solar array' }
                ].map((row, i) => (
                  <div key={i} className="p-3 rounded-lg border border-zinc-800 bg-zinc-900/40 flex flex-wrap items-center justify-between gap-2">
                    <div className="font-medium text-white min-w-[200px]">{row.phase}</div>
                    <div className="text-[11px] text-zinc-400 font-mono">
                      Human: <span className="text-blue-400">{row.human}</span> · AI: <span className="text-zinc-500">{row.ai}</span>
                    </div>
                    <div className="text-[11px] text-zinc-500">{row.role}</div>
                  </div>
                ))}
              </div>

              {/* Reflection Questions */}
              <div className="pt-2 border-t border-zinc-800 space-y-3">
                <div className="font-semibold text-white">MOE AI Literacy Reflection Summary:</div>
                <div className="p-3.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 leading-relaxed text-xs">
                  "{eduState.reflectionQuestion2}"
                </div>
              </div>

              {/* Certificate CTA */}
              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-zinc-400">Course completion verified under MOE EdTech Masterplan 2030 standards.</span>
                <button
                  onClick={onOpenCertificateModal}
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs transition-colors flex items-center gap-2 shadow-xs"
                >
                  <Award className="size-3.5" />
                  <span>Generate MOE Certificate</span>
                </button>
              </div>
            </div>

            {/* Formative Quiz */}
            {quizData && (
              <ModuleQuiz
                quizData={quizData}
                onComplete={(score) => onRecordQuizScore(6, score)}
                nextModuleTitle="Curriculum Overview"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
