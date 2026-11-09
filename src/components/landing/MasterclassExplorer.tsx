import React, { useState, useMemo } from 'react';
import {
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Sliders,
  Sun,
  Box,
  ChevronDown,
  ChevronUp,
  Sparkles
} from 'lucide-react';
import { LEARNING_MODULES } from '../../store/appStore';
import { LAB_EXPERIMENT_CARDS, ExperimentCardItem } from './landingContent';
import { EXPLORER_PRESETS, ExplorerModulePreset } from '../../utils/motionHelpers';
import { Show3DViewport3D } from '../canvas/Show3DViewport3D';
import { INITIAL_CANVAS_STUDIO_STATE, CanvasStudioState } from '../../utils/canvasStudioState';
import { Reveal } from '../motion/Reveal';

export interface MasterclassExplorerProps {
  onSelectModule: (id: number) => void;
  onLaunchCanvasModal?: () => void;
}

export const MasterclassExplorer: React.FC<MasterclassExplorerProps> = ({
  onSelectModule,
  onLaunchCanvasModal,
}) => {
  const [activeModuleId, setActiveModuleId] = useState<number>(3); // Default to Module 3 (Pavilion)

  // Real-time parametric levers for the live viewport
  const [canopyColor, setCanopyColor] = useState<string>('#30D158');
  const [curvature, setCurvature] = useState<number>(0.68);
  const [hasSolar, setHasSolar] = useState<boolean>(true);

  const activeModuleCard = useMemo(
    () => LAB_EXPERIMENT_CARDS.find((m) => m.id === activeModuleId) || LAB_EXPERIMENT_CARDS[2],
    [activeModuleId]
  );

  const preset: ExplorerModulePreset = useMemo(
    () => EXPLORER_PRESETS[activeModuleId] || EXPLORER_PRESETS[3],
    [activeModuleId]
  );

  // Dynamic Studio State driven by preset + active parametric overrides
  const studioState: CanvasStudioState = useMemo(() => {
    return {
      ...INITIAL_CANVAS_STUDIO_STATE,
      archetype: preset.archetype,
      shadingMode: preset.shadingMode,
      cameraPreset: preset.cameraPreset,
      filamentPreset: preset.filamentPreset,
      autoRotate: preset.autoRotate,
      canopyColor,
      curvature,
      hasSolar,
      showGrid: true,
      showAxes: activeModuleId === 1,
      pins: activeModuleId === 5 ? INITIAL_CANVAS_STUDIO_STATE.pins : [],
    };
  }, [preset, activeModuleId, canopyColor, curvature, hasSolar]);

  const handlePillClick = (id: number) => {
    setActiveModuleId(id);
    const p = EXPLORER_PRESETS[id];
    if (p) {
      setCanopyColor(p.canopyColor);
      setCurvature(p.curvature);
      setHasSolar(p.hasSolar);
    }
  };

  return (
    <section
      id="masterclasses"
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto border-t border-white/[0.08]"
    >
      {/* 1. Section Header Lockup */}
      <div className="max-w-3xl text-left mb-12 space-y-3">
        <Reveal variant="fade-up">
          <span className="text-xs font-mono uppercase tracking-widest text-[#0A84FF] block">
            The 6-Stage Curriculum
          </span>
        </Reveal>

        <Reveal variant="fade-up" index={1}>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            Six masterclasses.
            <br />
            <span className="text-[#86868B]">One profound leap in capability.</span>
          </h2>
        </Reveal>

        <Reveal variant="fade-up" index={2}>
          <p className="text-base text-[#86868B] leading-relaxed">
            Click through each stage to inspect its real-time 3D geometry archetype, shader diagnostics, and student engineering challenge.
          </p>
        </Reveal>
      </div>

      {/* 2. Apple Stage: Card with scale-in reveal that grows to full width */}
      <Reveal
        variant="scale-in"
        className="rounded-[36px] bg-[#141416] border border-white/[0.1] p-6 sm:p-8 lg:p-10 shadow-2xl backdrop-blur-2xl"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Apple-Style Feature Pills with In-Place Accordion Expansion */}
          <div className="lg:col-span-5 space-y-3 text-left">
            <div className="text-xs font-mono text-[#86868B] uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>Curriculum Modules</span>
              <span>Select Stage</span>
            </div>

            {LAB_EXPERIMENT_CARDS.map((card) => {
              const isSelected = card.id === activeModuleId;

              return (
                <div
                  key={card.id}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isSelected
                      ? 'bg-[#1C1C1E] border-white/[0.2] shadow-lg'
                      : 'bg-[#1C1C1E]/40 border-white/[0.06] hover:bg-[#1C1C1E]/80 hover:border-white/[0.12]'
                  }`}
                >
                  {/* Pill Header Button */}
                  <button
                    onClick={() => handlePillClick(card.id)}
                    aria-expanded={isSelected}
                    className="w-full px-4 py-3.5 flex items-center justify-between text-left transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0 transition-transform"
                        style={{
                          backgroundColor: card.accentHex,
                          transform: isSelected ? 'scale(1.2)' : 'scale(1)',
                        }}
                      />
                      <span className="text-xs sm:text-sm font-semibold text-white tracking-tight">
                        {card.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono text-[#86868B]">
                        0{card.id}
                      </span>
                      {isSelected ? (
                        <ChevronUp className="size-4 text-[#86868B]" />
                      ) : (
                        <ChevronDown className="size-4 text-[#86868B]" />
                      )}
                    </div>
                  </button>

                  {/* Expanded Accordion Body (Only rendered when selected) */}
                  {isSelected && (
                    <div className="px-5 pb-5 pt-1 space-y-4 border-t border-white/[0.06] text-xs animate-in fade-in duration-200">
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
                        <span
                          className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium"
                          style={{ backgroundColor: card.tintBg, color: card.accentHex }}
                        >
                          {card.code}
                        </span>
                        <span className="text-[11px] font-mono text-[#86868B] flex items-center gap-1">
                          <Clock className="size-3" />
                          <span>{card.duration}</span>
                        </span>
                      </div>

                      <p className="text-xs text-[#86868B] leading-relaxed">
                        {card.summary}
                      </p>

                      {/* Hands-On Challenge Box */}
                      <div className="p-3 rounded-xl bg-[#000000]/60 border border-white/[0.06]">
                        <span className="font-mono text-[10px] uppercase text-[#0A84FF] block mb-1">
                          Hands-On Challenge:
                        </span>
                        <span className="text-white text-xs leading-relaxed">
                          {card.studentChallenge}
                        </span>
                      </div>

                      {/* Learning Objectives */}
                      <div className="space-y-1.5">
                        <div className="text-[10px] font-mono uppercase text-[#86868B]">
                          Key Takeaways:
                        </div>
                        <ul className="space-y-1">
                          {card.learningObjectives.map((obj, oIdx) => (
                            <li key={oIdx} className="flex items-start gap-2 text-[11px] text-[#86868B]">
                              <CheckCircle2 className="size-3 text-[#30D158] shrink-0 mt-0.5" />
                              <span className="text-[#F5F5F7]">{obj}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Try Masterclass Action */}
                      <div className="pt-2">
                        <button
                          id={`explorer-try-btn-${card.id}`}
                          onClick={() => onSelectModule(card.id)}
                          className="w-full py-2.5 rounded-full font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
                          style={{
                            backgroundColor: card.accentHex,
                            color: '#000000',
                          }}
                        >
                          <span>{card.ctaText}</span>
                          <ArrowUpRight className="size-3.5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Live Interactive Three.js Viewport & Geometry Levers */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            
            {/* 3D Canvas Box */}
            <div className="relative rounded-[24px] bg-[#000000] border border-white/[0.1] p-4 sm:p-6 overflow-hidden min-h-[380px] sm:min-h-[460px] flex flex-col justify-between">
              
              {/* Telemetry Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#86868B] border-b border-white/[0.08] pb-3 z-10">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: activeModuleCard.accentHex }}
                  />
                  <span className="text-white font-medium">STAGE_STUDIO // 0{activeModuleCard.id}</span>
                </div>
                <div className="flex items-center gap-3 text-[11px]">
                  <span className="text-[#64D2FF]">ARCHETYPE: {preset.archetype.toUpperCase()}</span>
                  <span>·</span>
                  <span className="text-[#30D158]">MODE: {preset.shadingMode.toUpperCase()}</span>
                </div>
              </div>

              {/* Live WebGL 3D Canvas */}
              <div className="relative flex-1 w-full h-[280px] sm:h-[340px] my-2">
                <Show3DViewport3D
                  studioState={studioState}
                  compact
                  smoothCamera
                />
              </div>

              {/* Viewport Floating Hint */}
              <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs text-[#86868B] z-10">
                <span>Drag to Orbit · Scroll to Zoom</span>
                {onLaunchCanvasModal && (
                  <button
                    onClick={onLaunchCanvasModal}
                    className="text-xs font-medium text-[#0A84FF] hover:underline flex items-center gap-1"
                  >
                    <Box className="size-3" />
                    <span>Open Fullscreen Studio</span>
                  </button>
                )}
              </div>
            </div>

            {/* Interactive Parametric Levers Bar (Available for Pavilion / Geometry editing) */}
            <div className="p-4 rounded-2xl bg-[#1C1C1E]/80 border border-white/[0.08] space-y-3 text-left backdrop-blur-md">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#86868B] flex items-center gap-1.5">
                  <Sliders className="size-3.5 text-[#0A84FF]" />
                  <span>Real-Time Parametric Geometry Controls</span>
                </span>
                <span className="font-mono text-[11px] text-[#30D158] font-semibold flex items-center gap-1">
                  <CheckCircle2 className="size-3 text-[#30D158]" />
                  <span>Human Intent: 94%</span>
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                {/* Tint Swatches */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#86868B]">Material:</span>
                  {[
                    { hex: '#30D158', name: 'Biophilic Mint' },
                    { hex: '#64D2FF', name: 'Sky Cyan' },
                    { hex: '#FFD60A', name: 'Solar Amber' },
                    { hex: '#FF375F', name: 'Terracotta' },
                  ].map((swatch) => (
                    <button
                      key={swatch.hex}
                      onClick={() => setCanopyColor(swatch.hex)}
                      style={{ backgroundColor: swatch.hex }}
                      className={`w-5 h-5 rounded-full border-2 transition-transform ${
                        canopyColor === swatch.hex
                          ? 'border-white scale-110 shadow-md'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                      title={swatch.name}
                      aria-label={swatch.name}
                    />
                  ))}
                </div>

                {/* Solar Toggle */}
                <button
                  onClick={() => setHasSolar(!hasSolar)}
                  className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors flex items-center gap-1.5 ${
                    hasSolar
                      ? 'bg-[#2C2405] border-[#FFD60A]/40 text-[#FFD60A]'
                      : 'bg-[#2C2C2E] border-white/[0.08] text-[#86868B]'
                  }`}
                >
                  <Sun className="size-3.5" />
                  <span>{hasSolar ? '450W Solar Active' : 'Solar Inactive'}</span>
                </button>
              </div>

              {/* Curvature Slider */}
              <div className="space-y-1 pt-1">
                <div className="flex justify-between text-[11px] font-mono text-[#86868B]">
                  <span>Canopy Parabolic Curvature</span>
                  <span className="text-white font-medium">{curvature.toFixed(2)} ratio</span>
                </div>
                <input
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

          </div>

        </div>
      </Reveal>
    </section>
  );
};
