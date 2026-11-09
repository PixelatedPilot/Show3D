import React from 'react';
import { EduState, EduStep, CameraViewPreset } from '../../types';
import { SplineViewportMock } from './SplineViewportMock';
import { 
  ArrowRight, 
  Check, 
  RotateCcw,
  Sun,
  Layers,
  Award,
  Download
} from 'lucide-react';

interface StudioWorkflowProps {
  eduState: EduState;
  onChangeStep: (step: EduStep) => void;
  onUpdateEduState: (updates: Partial<EduState>) => void;
  onTriggerGenerate: () => void;
  onOpenCertificateModal: () => void;
}

const STEPS = [
  { id: 1, label: '1. Brief' },
  { id: 2, label: '2. Prompt' },
  { id: 3, label: '3. 3D Model' },
  { id: 4, label: '4. Review & Export' },
];

const ARCHITECTURAL_TAGS = [
  'Curved tensile canopy',
  'Modular timber benches',
  'Integrated solar roof',
  'Cross-ventilation air gaps',
  'Biophilic planter boxes'
];

export const StudioWorkflow: React.FC<StudioWorkflowProps> = ({
  eduState,
  onChangeStep,
  onUpdateEduState,
  onTriggerGenerate,
  onOpenCertificateModal,
}) => {
  const currentStep = eduState.step;

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden select-none font-sans relative bg-[#121214] text-zinc-200">
      {/* Studio Top Control Strip (Apple HIG Segmented Control) */}
      <div className="h-11 px-4 border-b border-zinc-800 bg-[#18181b] flex items-center justify-between z-30 shrink-0">
        <div className="flex items-center gap-2 text-xs">
          <span className="font-medium text-white">Courtyard Pavilion</span>
          <span className="text-zinc-600">·</span>
          <span className="text-zinc-400">Design & Technology</span>
        </div>

        {/* Step Segmented Switcher */}
        <div className="flex items-center bg-zinc-900 border border-zinc-800 p-0.5 rounded-lg">
          {STEPS.map((s) => {
            const isActive = currentStep === s.id;
            const isDone = currentStep > s.id;

            return (
              <button
                key={s.id}
                onClick={() => onChangeStep(s.id as EduStep)}
                className={`px-3 py-1 rounded-md text-xs transition-colors flex items-center gap-1.5 font-medium ${
                  isActive
                    ? 'bg-zinc-800 text-white shadow-xs'
                    : isDone
                    ? 'text-zinc-300 hover:text-white'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {isDone && <Check className="size-3 text-emerald-400" />}
                <span>{s.label}</span>
              </button>
            );
          })}
        </div>

        <div className="text-[11px] font-mono text-zinc-500 hidden sm:block">
          Step {currentStep} of 4
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 min-h-0 relative flex overflow-hidden">
        {/* STEP 1: DESIGN BRIEF (Clean Document Layout - Canvas Inactive) */}
        {currentStep === 1 && (
          <div className="flex-1 overflow-y-auto p-6 sm:p-10 flex items-center justify-center">
            <div className="max-w-lg w-full space-y-6">
              <div className="space-y-1.5 border-b border-zinc-800 pb-4">
                <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                  Phase 1 · Project Requirements
                </div>
                <h2 className="text-xl font-semibold text-white tracking-tight">
                  Design Brief: Courtyard Shading Structure
                </h2>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  During peak midday hours, intense 34°C tropical heat and glare leave the central courtyard unusable. Students require a shaded, ventilated study pod with clean solar power.
                </p>
              </div>

              {/* Functional Requirements Checklist */}
              <div className="space-y-2">
                <div className="text-xs font-medium text-zinc-300">Target Specifications:</div>
                <div className="space-y-1.5 text-xs">
                  {[
                    { title: 'Tensile Fabric Canopy', desc: 'Deflects direct sunlight and rain while keeping structure lightweight.' },
                    { title: 'Cross-Ventilation Openings', desc: 'Open side geometry to maintain natural airflow.' },
                    { title: 'Modular Timber Seating', desc: 'Ergonomic study benches accommodating 6 students.' },
                    { title: 'Integrated 450W Solar Panel', desc: 'Rooftop clean energy array powering evening study lights.' }
                  ].map((req, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg border border-zinc-800/80 bg-zinc-900/40 flex items-start gap-2.5"
                    >
                      <div className="size-4 rounded-md bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
                        <Check className="size-3" />
                      </div>
                      <div>
                        <div className="font-medium text-white">{req.title}</div>
                        <div className="text-[11px] text-zinc-400 leading-normal mt-0.5">{req.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Design Note */}
              <div className="p-3 rounded-lg border border-zinc-800 bg-zinc-900/20 text-xs text-zinc-400 leading-relaxed">
                <span className="text-zinc-200 font-medium">Why specify constraints first? </span>
                Generative AI models require clear physical parameters. Setting boundaries ensures the generated form meets practical campus needs.
              </div>

              <button
                onClick={() => onChangeStep(2)}
                className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs transition-colors flex items-center justify-center gap-2"
              >
                <span>Continue to Prompting</span>
                <ArrowRight className="size-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: PROMPT COMPOSER (Show3D-Inspired Workbench - Canvas Inactive) */}
        {currentStep === 2 && (
          <div className="flex-1 overflow-y-auto p-6 sm:p-10 flex items-center justify-center">
            <div className="max-w-lg w-full space-y-6">
              <div className="space-y-1.5 border-b border-zinc-800 pb-4">
                <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                  Phase 2 · Geometry Formulation
                </div>
                <h2 className="text-xl font-semibold text-white tracking-tight">
                  Model Prompt & Constraints
                </h2>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Use precise architectural terms to guide the 3D generator. Specific structural keywords reduce geometry errors and hallucinated shapes.
                </p>
              </div>

              {/* Show3D Workbench Box */}
              <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/50 space-y-3">
                {/* Mode Selector */}
                <div className="flex items-center gap-1 bg-zinc-950 border border-zinc-800 p-0.5 rounded-lg w-fit">
                  {(['text', 'image', 'agent'] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => onUpdateEduState({ creationMode: m })}
                      className={`px-2.5 py-1 rounded-md text-xs capitalize transition-colors font-medium ${
                        eduState.creationMode === m
                          ? 'bg-zinc-800 text-white shadow-xs'
                          : 'text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>

                <textarea
                  value={eduState.promptText}
                  onChange={(e) => onUpdateEduState({ promptText: e.target.value })}
                  rows={3}
                  className="w-full bg-transparent border-0 text-xs sm:text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-hidden resize-none leading-relaxed"
                  placeholder="Describe the 3D structure to generate..."
                />

                {/* Keyword Chips */}
                <div className="pt-2 border-t border-zinc-800/80 space-y-1.5">
                  <div className="text-[11px] text-zinc-400">Append structural keywords:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {ARCHITECTURAL_TAGS.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => {
                          if (!eduState.promptText.includes(tag)) {
                            onUpdateEduState({
                              promptText: `${eduState.promptText.trim()} with ${tag.toLowerCase()}`
                            });
                          }
                        }}
                        className="px-2.5 py-1 rounded-md text-xs bg-zinc-800/70 hover:bg-zinc-700/80 text-zinc-300 border border-zinc-700 transition-colors"
                      >
                        + {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Generation Trigger */}
              {eduState.isGenerating ? (
                <div className="p-4 rounded-xl border border-blue-500/30 bg-blue-950/20 space-y-2">
                  <div className="flex items-center justify-between text-xs font-medium text-blue-300">
                    <span>Compiling 3D Geometry...</span>
                    <span className="font-mono">{eduState.generationProgress}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full transition-all duration-150"
                      style={{ width: `${eduState.generationProgress}%` }}
                    />
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => {
                    onTriggerGenerate();
                    onChangeStep(3); // Smoothly transitions to reveal 3D canvas
                  }}
                  className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <span>Build in 3D</span>
                  <ArrowRight className="size-3.5" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* STEP 3: 3D STUDIO & INSPECTOR (Canvas REVEALED Full-Stage) */}
        {currentStep === 3 && (
          <div className="flex-1 h-full relative overflow-hidden">
            <SplineViewportMock eduState={eduState} onUpdateEduState={onUpdateEduState} />

            {/* Apple Floating Inspector Bar (Bottom) */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 max-w-xl w-[92vw] p-3 rounded-2xl border border-zinc-800 bg-[#1c1c1e]/90 backdrop-blur-xl shadow-2xl space-y-2.5">
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                {/* 1. Fabric Swatches */}
                <div className="flex items-center gap-2">
                  <span className="text-zinc-400 font-medium">Fabric:</span>
                  <div className="flex items-center gap-1.5">
                    {[
                      { name: 'System Blue', color: '#0A84FF' },
                      { name: 'Forest Green', color: '#30D158' },
                      { name: 'Warm Amber', color: '#FF9F0A' },
                      { name: 'Stone Grey', color: '#E4E4E7' },
                    ].map((c) => (
                      <button
                        key={c.color}
                        onClick={() => onUpdateEduState({ canopyColor: c.color })}
                        className={`size-5 rounded-full border-2 transition-transform ${
                          eduState.canopyColor === c.color
                            ? 'scale-115 border-white ring-1 ring-blue-500'
                            : 'border-transparent hover:scale-105'
                        }`}
                        style={{ backgroundColor: c.color }}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>

                {/* 2. Solar Toggle Switch */}
                <button
                  onClick={() => onUpdateEduState({ solarPanelsEnabled: !eduState.solarPanelsEnabled })}
                  className={`px-2.5 py-1 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-colors ${
                    eduState.solarPanelsEnabled
                      ? 'bg-blue-600 text-white border-blue-500'
                      : 'bg-zinc-800 border-zinc-700 text-zinc-400'
                  }`}
                >
                  <Sun className="size-3" />
                  <span>Solar Array {eduState.solarPanelsEnabled ? 'ON' : 'OFF'}</span>
                </button>

                {/* 3. Wireframe Switch */}
                <button
                  onClick={() => onUpdateEduState({ wireframeMode: !eduState.wireframeMode })}
                  className={`px-2.5 py-1 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-colors ${
                    eduState.wireframeMode
                      ? 'bg-purple-600 text-white border-purple-500'
                      : 'bg-zinc-800 border-zinc-700 text-zinc-400'
                  }`}
                >
                  <Layers className="size-3" />
                  <span>Wireframe {eduState.wireframeMode ? 'ON' : 'OFF'}</span>
                </button>
              </div>

              {/* Bottom Row: Advance Button */}
              <div className="pt-2 border-t border-zinc-800 flex items-center justify-between text-xs">
                <span className="text-zinc-500 text-[11px]">
                  Rotate, pan, and inspect geometry.
                </span>
                <button
                  onClick={() => onChangeStep(4)}
                  className="px-3.5 py-1.5 rounded-lg bg-white text-zinc-900 hover:bg-zinc-200 font-medium text-xs transition-colors flex items-center gap-1.5"
                >
                  <span>Review & Export</span>
                  <ArrowRight className="size-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: REVIEW & EXPORT (Two-Column Presentation Layout) */}
        {currentStep === 4 && (
          <div className="flex-1 flex flex-col lg:flex-row h-full overflow-hidden">
            {/* Left 3D Viewport Dock */}
            <div className="h-60 lg:h-full lg:flex-1 relative border-b lg:border-b-0 lg:border-r border-zinc-800 bg-[#0c0c0e]">
              <SplineViewportMock eduState={eduState} onUpdateEduState={onUpdateEduState} />
              <div className="absolute top-3 left-3 z-20">
                <div className="px-2.5 py-1 rounded-md text-[10px] font-mono text-zinc-300 bg-zinc-900/80 border border-zinc-800">
                  3D Project View
                </div>
              </div>
            </div>

            {/* Right Design Sheet Panel */}
            <div className="lg:w-96 xl:w-[420px] overflow-y-auto p-6 space-y-5 bg-[#18181b]">
              <div className="space-y-1 border-b border-zinc-800 pb-3">
                <div className="text-[11px] font-mono uppercase text-zinc-400">
                  Project Documentation
                </div>
                <h3 className="text-lg font-semibold text-white tracking-tight">
                  Design Summary & Reflection
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Record your design decisions for the MOE AI literacy assessment rubric.
                </p>
              </div>

              {/* Reflection Questions */}
              <div className="space-y-3.5 text-xs">
                <div className="space-y-1">
                  <label className="font-medium text-zinc-300">
                    1. How did AI assist your design intent?
                  </label>
                  <textarea
                    value={eduState.reflectionQuestion1}
                    onChange={(e) => onUpdateEduState({ reflectionQuestion1: e.target.value })}
                    rows={3}
                    className="w-full p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 focus:outline-hidden focus:border-zinc-600 transition-colors leading-relaxed"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-medium text-zinc-300">
                    2. Creative ownership and ethics:
                  </label>
                  <textarea
                    value={eduState.reflectionQuestion2}
                    onChange={(e) => onUpdateEduState({ reflectionQuestion2: e.target.value })}
                    rows={3}
                    className="w-full p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 focus:outline-hidden focus:border-zinc-600 transition-colors leading-relaxed"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 space-y-2">
                <button
                  onClick={() => {
                    onUpdateEduState({ isSubmitted: true });
                    onOpenCertificateModal();
                  }}
                  className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <Award className="size-3.5" />
                  <span>View Project Certificate</span>
                </button>
                <div className="text-[11px] text-zinc-500 text-center font-mono">
                  Assessment criteria: MOE Four Learns Framework
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
