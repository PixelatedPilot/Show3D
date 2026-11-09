import React, { useState } from 'react';
import { EduState } from '../../types';
import { 
  Sun, 
  Layers, 
  Award, 
  Sliders, 
  ChevronDown, 
  Sparkles, 
  Check, 
  Palette,
  Camera,
  RotateCcw,
  ShieldCheck,
  Zap,
  Wind
} from 'lucide-react';

interface SplineInspectorProps {
  eduState: EduState;
  onUpdateEduState: (updates: Partial<EduState>) => void;
  onOpenCertificateModal: () => void;
  selectedObjectId: string;
}

const FABRIC_PALETTE = [
  { label: 'Sky Blue', hex: '#38bdf8' },
  { label: 'UV White', hex: '#f8fafc' },
  { label: 'Emerald Biophilic', hex: '#10b981' },
  { label: 'Solar Amber', hex: '#f59e0b' },
  { label: 'Slate Charcoal', hex: '#475569' }
];

export const SplineInspector: React.FC<SplineInspectorProps> = ({
  eduState,
  onUpdateEduState,
  onOpenCertificateModal,
  selectedObjectId,
}) => {
  const [posX, setPosX] = useState('0.0');
  const [posY, setPosY] = useState('1.4');
  const [posZ, setPosZ] = useState('0.0');
  const [rotX, setRotX] = useState('-22');
  const [scale, setScale] = useState('1.0');

  const currentColor = eduState.canopyColor || '#38bdf8';
  const hasSolar = eduState.solarPanelsEnabled;

  const handleToggleSolar = () => {
    onUpdateEduState({ solarPanelsEnabled: !hasSolar });
  };

  const handleSelectColor = (hex: string) => {
    onUpdateEduState({ canopyColor: hex });
  };

  return (
    <aside className="w-80 h-full flex flex-col bg-[#0e1017]/90 backdrop-blur-2xl border-l border-white/[0.08] select-none text-zinc-300 font-sans z-30 shrink-0 overflow-y-auto">
      {/* Top Header: Active Camera & Selection */}
      <div className="h-11 px-4 border-b border-white/[0.08] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-1.5 text-xs">
          <Camera className="size-3.5 text-zinc-400" />
          <span className="text-zinc-200 font-medium">Personal Camera</span>
          <ChevronDown className="size-3 text-zinc-500" />
        </div>

        <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
          Inspector
        </div>
      </div>

      <div className="p-3.5 space-y-4">
        {/* PANEL 1: TRANSFORM (Spline X/Y/Z Field Scrubbers) */}
        <div className="space-y-2">
          <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider flex items-center justify-between">
            <span>Transform</span>
            <span className="text-zinc-500 text-[10px]">Courtyard Pavilion</span>
          </div>

          <div className="p-2.5 rounded-xl bg-[#141722] border border-white/[0.06] space-y-2 text-xs">
            {/* Position */}
            <div className="flex items-center justify-between">
              <span className="text-zinc-400 text-[11px] w-14">Position</span>
              <div className="flex items-center gap-1 flex-1">
                <div className="flex-1 flex items-center bg-[#1c1f2e] border border-white/[0.06] rounded px-1.5 py-0.5 text-[11px] font-mono">
                  <span className="text-zinc-500 mr-1">X</span>
                  <input
                    value={posX}
                    onChange={(e) => setPosX(e.target.value)}
                    className="w-full bg-transparent text-white focus:outline-none"
                  />
                </div>
                <div className="flex-1 flex items-center bg-[#1c1f2e] border border-white/[0.06] rounded px-1.5 py-0.5 text-[11px] font-mono">
                  <span className="text-zinc-500 mr-1">Y</span>
                  <input
                    value={posY}
                    onChange={(e) => setPosY(e.target.value)}
                    className="w-full bg-transparent text-white focus:outline-none"
                  />
                </div>
                <div className="flex-1 flex items-center bg-[#1c1f2e] border border-white/[0.06] rounded px-1.5 py-0.5 text-[11px] font-mono">
                  <span className="text-zinc-500 mr-1">Z</span>
                  <input
                    value={posZ}
                    onChange={(e) => setPosZ(e.target.value)}
                    className="w-full bg-transparent text-white focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Rotation */}
            <div className="flex items-center justify-between">
              <span className="text-zinc-400 text-[11px] w-14">Rotation</span>
              <div className="flex items-center gap-1 flex-1">
                <div className="flex-1 flex items-center bg-[#1c1f2e] border border-white/[0.06] rounded px-1.5 py-0.5 text-[11px] font-mono">
                  <span className="text-zinc-500 mr-1">X</span>
                  <input
                    value={rotX}
                    onChange={(e) => setRotX(e.target.value)}
                    className="w-full bg-transparent text-white focus:outline-none"
                  />
                </div>
                <div className="flex-1 flex items-center bg-[#1c1f2e] border border-white/[0.06] rounded px-1.5 py-0.5 text-[11px] font-mono">
                  <span className="text-zinc-500 mr-1">Y</span>
                  <span className="text-white">0°</span>
                </div>
                <div className="flex-1 flex items-center bg-[#1c1f2e] border border-white/[0.06] rounded px-1.5 py-0.5 text-[11px] font-mono">
                  <span className="text-zinc-500 mr-1">Z</span>
                  <span className="text-white">0°</span>
                </div>
              </div>
            </div>

            {/* Scale */}
            <div className="flex items-center justify-between">
              <span className="text-zinc-400 text-[11px] w-14">Scale</span>
              <div className="flex items-center bg-[#1c1f2e] border border-white/[0.06] rounded px-2 py-0.5 text-[11px] font-mono flex-1">
                <span className="text-zinc-500 mr-2">Uniform</span>
                <input
                  value={scale}
                  onChange={(e) => setScale(e.target.value)}
                  className="w-full bg-transparent text-white focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* PANEL 2: MATERIAL & SHADING LAYERS */}
        <div className="space-y-2">
          <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider flex items-center justify-between">
            <span>Material Stack</span>
            <span className="text-zinc-500 text-[10px]">Tensile Fabric</span>
          </div>

          <div className="p-3 rounded-xl bg-[#141722] border border-white/[0.06] space-y-3 text-xs">
            {/* Color Swatch Picker */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-zinc-300">Fabric Membrane Color</span>
                <span className="font-mono text-zinc-400">{currentColor.toUpperCase()}</span>
              </div>
              <div className="flex items-center gap-2">
                {FABRIC_PALETTE.map((item) => (
                  <button
                    key={item.hex}
                    onClick={() => handleSelectColor(item.hex)}
                    style={{ backgroundColor: item.hex }}
                    className={`size-6 rounded-full border-2 transition-transform ${
                      currentColor.toLowerCase() === item.hex.toLowerCase()
                        ? 'border-white scale-110 shadow-md'
                        : 'border-transparent hover:scale-105 opacity-80 hover:opacity-100'
                    }`}
                    title={item.label}
                  />
                ))}
              </div>
            </div>

            {/* Shading Layer Sliders */}
            <div className="space-y-2 pt-1 border-t border-white/[0.06] text-[11px]">
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Roughness</span>
                <span className="font-mono text-zinc-300">65%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Fresnel Rim Glow</span>
                <span className="font-mono text-zinc-300">80%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">UV Translucency</span>
                <span className="font-mono text-zinc-300">18%</span>
              </div>
            </div>
          </div>
        </div>

        {/* PANEL 3: SUSTAINABILITY & ARCHITECTURAL CONSTRAINTS */}
        <div className="space-y-2">
          <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
            Architectural Constraints
          </div>

          <div className="p-3 rounded-xl bg-[#141722] border border-white/[0.06] space-y-2.5 text-xs">
            {/* 450W Solar Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className={`size-3.5 ${hasSolar ? 'text-amber-400' : 'text-zinc-500'}`} />
                <div>
                  <div className="text-white font-medium text-xs">450W Solar Canopy</div>
                  <div className="text-[10px] text-zinc-400">Clean power for student study ports</div>
                </div>
              </div>
              <button
                onClick={handleToggleSolar}
                className={`relative w-9 h-5 rounded-full transition-colors ${
                  hasSolar ? 'bg-amber-500' : 'bg-zinc-700'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 size-4 rounded-full bg-white transition-transform ${
                    hasSolar ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Cross-ventilation */}
            <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
              <div className="flex items-center gap-2">
                <Wind className="size-3.5 text-blue-400" />
                <div>
                  <div className="text-white font-medium text-xs">Natural Cross-Ventilation</div>
                  <div className="text-[10px] text-zinc-400">Aerodynamic chimney thermal lift</div>
                </div>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                Active
              </span>
            </div>
          </div>
        </div>

        {/* PANEL 4: CREATOR OWNERSHIP SCORECARD (MOE Learn Beyond AI · Anti-Offload) */}
        <div className="space-y-2 pt-1">
          <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider flex items-center justify-between">
            <span>Creator Ownership Scorecard</span>
            <span className="text-emerald-400 font-mono text-[10px]">94% Human Intent</span>
          </div>

          <div className="p-3 rounded-xl bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-black border border-purple-500/30 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
                <ShieldCheck className="size-4 text-purple-400" />
                <span>Anti-Cognitive Offload Audit</span>
              </div>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300">
                Learn Beyond AI
              </span>
            </div>

            <p className="text-[11px] text-zinc-300 leading-relaxed">
              Verifies student retained creative authorship and intentionality over AI synthesis:
            </p>

            <div className="space-y-1 text-[10px] font-mono text-zinc-300">
              <div className="flex items-center gap-1.5 p-1 rounded bg-black/40 border border-white/[0.04]">
                <Check className="size-3 text-emerald-400 shrink-0" />
                <span>1. Problem Need & Constraints (100% You)</span>
              </div>
              <div className="flex items-center gap-1.5 p-1 rounded bg-black/40 border border-white/[0.04]">
                <Check className="size-3 text-emerald-400 shrink-0" />
                <span>2. PARTS Prompt Strategy (100% You)</span>
              </div>
              <div className="flex items-center gap-1.5 p-1 rounded bg-black/40 border border-white/[0.04]">
                <Check className="size-3 text-emerald-400 shrink-0" />
                <span>3. Material Craft & 450W Solar (100% You)</span>
              </div>
              <div className="flex items-center gap-1.5 p-1 rounded bg-black/40 border border-white/[0.04]">
                <Check className="size-3 text-emerald-400 shrink-0" />
                <span>4. Peer Pin Critique Revision (100% You)</span>
              </div>
            </div>

            <button
              onClick={onOpenCertificateModal}
              className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95"
            >
              <Award className="size-3.5" />
              <span>View Verified Certificate</span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
