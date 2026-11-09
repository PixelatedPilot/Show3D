import React, { useState } from 'react';
import {
  Box,
  Sliders,
  Sun,
  Eye,
  Award,
  Layers,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export interface ConceptVisualDiagramProps {
  visualType:
    | 'compare_2d_3d'
    | 'wireframe_diagram'
    | 'prompt_formula'
    | 'pbr_properties'
    | 'ergonomics_diagram'
    | 'authorship_matrix';
  moduleId: number;
  slideId: string;
}

export const ConceptVisualDiagrams: React.FC<ConceptVisualDiagramProps> = ({
  visualType,
  moduleId,
}) => {
  // Interactive state inside the concept diagram plate
  const [inspectAxis, setInspectAxis] = useState<'all' | 'vertices' | 'edges' | 'faces'>('all');
  const [roughnessDemo, setRoughnessDemo] = useState<number>(0.25);

  return (
    <div className="rounded-[24px] bg-[#000000] border border-white/[0.08] p-5 sm:p-6 flex flex-col justify-between min-h-[290px] sm:min-h-[330px] relative overflow-hidden">
      {/* Subtle Apple Spatial Grid */}
      <div className="absolute inset-0 dot-pattern opacity-35 pointer-events-none" />

      {/* Top Plate Header */}
      <div className="relative z-10 flex items-center justify-between gap-2 pb-3 border-b border-white/[0.06] text-[11px] font-mono text-[#86868B]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#0A84FF]" />
          <span className="text-white font-medium uppercase">
            MODULE 0{moduleId} · INTERACTIVE VISUAL PLATE
          </span>
        </div>
        <span className="text-[#64D2FF] uppercase">{visualType.replace(/_/g, ' ')}</span>
      </div>

      {/* ===================================================================== */}
      {/* 1. COMPARE 2D VS 3D COORDINATE SPACE                                  */}
      {/* ===================================================================== */}
      {visualType === 'compare_2d_3d' && (
        <div className="relative z-10 my-4 grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
          {/* Left: Flat 2D (X, Y) */}
          <div className="p-4 rounded-2xl bg-[#1C1C1E]/80 border border-white/[0.08] flex flex-col items-center text-center space-y-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#2C2C2E] text-[#86868B] text-[10px] font-mono">
              FLAT 2D PIXEL GRID (X, Y)
            </span>
            <svg viewBox="0 0 180 120" className="w-36 h-24">
              <rect
                x="35"
                y="20"
                width="110"
                height="80"
                rx="8"
                fill="#141416"
                stroke="#86868B"
                strokeWidth="1.5"
                strokeDasharray="4 3"
              />
              <line x1="35" y1="100" x2="155" y2="100" stroke="#FF375F" strokeWidth="2" />
              <line x1="35" y1="100" x2="35" y2="12" stroke="#30D158" strokeWidth="2" />
              <text x="148" y="114" fill="#FF375F" fontSize="10" fontFamily="monospace">
                X
              </text>
              <text x="20" y="22" fill="#30D158" fontSize="10" fontFamily="monospace">
                Y
              </text>
              <rect x="65" y="42" width="50" height="36" fill="#2C2C2E" stroke="#86868B" />
              <text x="90" y="64" textAnchor="middle" fill="#86868B" fontSize="9" fontFamily="monospace">
                Z = 0 (Flat)
              </text>
            </svg>
            <p className="text-[11px] text-[#86868B]">
              Illusion of depth only. Cannot be rotated 360° or 3D-printed.
            </p>
          </div>

          {/* Right: True 3D Volume (X, Y, Z) */}
          <div className="p-4 rounded-2xl bg-[#0D2137]/50 border border-[#0A84FF]/40 flex flex-col items-center text-center space-y-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#0A84FF] text-white text-[10px] font-mono font-semibold">
              SPATIAL 3D VOLUME (X, Y, Z)
            </span>
            <svg viewBox="0 0 180 120" className="w-36 h-24">
              {/* Isometric Cube Wireframe */}
              <polygon
                points="90,16 145,42 145,88 90,112 35,88 35,42"
                fill="rgba(10, 132, 255, 0.15)"
                stroke="#64D2FF"
                strokeWidth="1.75"
              />
              <line x1="90" y1="62" x2="90" y2="12" stroke="#30D158" strokeWidth="2.2" />
              <line x1="90" y1="62" x2="152" y2="92" stroke="#FF375F" strokeWidth="2.2" />
              <line x1="90" y1="62" x2="28" y2="92" stroke="#0A84FF" strokeWidth="2.2" />
              <circle cx="90" cy="62" r="3.5" fill="#FFFFFF" />
              <text x="96" y="14" fill="#30D158" fontSize="10" fontFamily="monospace">
                +Y
              </text>
              <text x="155" y="96" fill="#FF375F" fontSize="10" fontFamily="monospace">
                +X
              </text>
              <text x="12" y="96" fill="#64D2FF" fontSize="10" fontFamily="monospace">
                +Z
              </text>
            </svg>
            <p className="text-[11px] text-[#F5F5F7]">
              True mathematical volume. Inspectable from every angle and ready for PLA slicing.
            </p>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 2. WIREFRAME MESH ANATOMY (VERTICES, EDGES, FACES)                    */}
      {/* ===================================================================== */}
      {visualType === 'wireframe_diagram' && (
        <div className="relative z-10 my-3 flex flex-col items-center space-y-4">
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {(
              [
                { id: 'all', label: 'Complete Mesh' },
                { id: 'vertices', label: '1. Vertices (Points)' },
                { id: 'edges', label: '2. Edges (Struts)' },
                { id: 'faces', label: '3. Planar Faces' },
              ] as const
            ).map((btn) => (
              <button
                key={btn.id}
                onClick={() => setInspectAxis(btn.id)}
                className={`px-3 py-1 rounded-full text-[11px] font-mono transition-all ${
                  inspectAxis === btn.id
                    ? 'bg-[#0A84FF] text-white font-semibold'
                    : 'bg-[#1C1C1E] text-[#86868B] hover:text-white border border-white/[0.08]'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>

          <svg viewBox="0 0 340 155" className="w-full max-w-md h-36">
            {/* Planar Triangle Faces */}
            {(inspectAxis === 'all' || inspectAxis === 'faces') && (
              <g>
                <polygon
                  points="170,18 265,55 170,86"
                  fill="rgba(48, 209, 88, 0.28)"
                  stroke="none"
                />
                <polygon
                  points="170,18 75,55 170,86"
                  fill="rgba(10, 132, 255, 0.25)"
                  stroke="none"
                />
                <polygon
                  points="75,55 170,86 170,140 75,112"
                  fill="rgba(100, 210, 255, 0.18)"
                  stroke="none"
                />
                <polygon
                  points="265,55 170,86 170,140 265,112"
                  fill="rgba(48, 209, 88, 0.16)"
                  stroke="none"
                />
              </g>
            )}

            {/* Edges */}
            {(inspectAxis === 'all' || inspectAxis === 'edges' || inspectAxis === 'faces') && (
              <g stroke="#0A84FF" strokeWidth="2">
                <polygon points="170,18 265,55 265,112 170,140 75,112 75,55" fill="none" />
                <line x1="170" y1="18" x2="170" y2="140" />
                <line x1="75" y1="55" x2="170" y2="86" />
                <line x1="265" y1="55" x2="170" y2="86" />
                <line x1="75" y1="112" x2="170" y2="86" strokeDasharray="3 3" />
                <line x1="265" y1="112" x2="170" y2="86" strokeDasharray="3 3" />
              </g>
            )}

            {/* Vertices */}
            {(inspectAxis === 'all' || inspectAxis === 'vertices') && (
              <g>
                {[
                  [170, 18],
                  [265, 55],
                  [265, 112],
                  [170, 140],
                  [75, 112],
                  [75, 55],
                  [170, 86],
                ].map(([cx, cy], idx) => (
                  <circle
                    key={idx}
                    cx={cx}
                    cy={cy}
                    r="5"
                    fill="#64D2FF"
                    stroke="#000000"
                    strokeWidth="1.5"
                  />
                ))}
              </g>
            )}
          </svg>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 3. THE 5-PART "PARTS" PROMPT FORMULA                                  */}
      {/* ===================================================================== */}
      {visualType === 'prompt_formula' && (
        <div className="relative z-10 my-3 space-y-2.5">
          {[
            {
              letter: 'P',
              name: 'Persona / Purpose',
              token: ' Industrial D&T Architect · Ergonomic Phone Dock',
              spec: 'Sets functional stability rules',
              color: '#0A84FF',
            },
            {
              letter: 'A',
              name: 'Aim / Angle',
              token: '60° Viewing Cradle + Parabolic Canopy Arch',
              spec: 'Eliminates neck strain & afternoon glare',
              color: '#64D2FF',
            },
            {
              letter: 'R',
              name: 'Recipients / Routing',
              token: '20mm Bottom Cable Pass-Through Channel',
              spec: 'Prevents USB-C cord bending fatigue',
              color: '#30D158',
            },
            {
              letter: 'T',
              name: 'Theme & Aesthetic',
              token: 'Minimalist Biophilic · 2mm Chamfered Edges',
              spec: 'Clean, printable planar bevels',
              color: '#FFD60A',
            },
            {
              letter: 'S',
              name: 'Structure & Scale',
              token: 'Watertight Manifold · >= 3.0mm Wall Thickness',
              spec: '100% ready for FDM 3D slicing',
              color: '#FF375F',
            },
          ].map((row) => (
            <div
              key={row.letter}
              className="p-2.5 rounded-xl bg-[#1C1C1E] border border-white/[0.08] flex items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span
                  className="w-6 h-6 rounded-lg flex items-center justify-center font-mono font-bold text-black shrink-0"
                  style={{ backgroundColor: row.color }}
                >
                  {row.letter}
                </span>
                <div className="truncate">
                  <span className="font-semibold text-white">{row.name}: </span>
                  <span className="text-[#86868B]">{row.token}</span>
                </div>
              </div>
              <span className="hidden sm:inline-block font-mono text-[10px] text-[#30D158] shrink-0">
                {row.spec}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* ===================================================================== */}
      {/* 4. PHYSICALLY BASED RENDERING (PBR) SHADER LAB                        */}
      {/* ===================================================================== */}
      {visualType === 'pbr_properties' && (
        <div className="relative z-10 my-3 space-y-4">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 rounded-2xl bg-[#1C1C1E] border border-white/[0.08] flex flex-col items-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-white via-[#64D2FF] to-[#0A84FF] shadow-lg border border-white/40" />
              <div className="text-xs font-bold text-white">Albedo</div>
              <div className="text-[10px] font-mono text-[#64D2FF]">0.85 Solar Reflect</div>
            </div>

            <div className="p-3 rounded-2xl bg-[#1C1C1E] border border-white/[0.08] flex flex-col items-center space-y-2">
              <div
                className="w-12 h-12 rounded-full border border-white/20 transition-all"
                style={{
                  background:
                    roughnessDemo < 0.4
                      ? 'radial-gradient(circle at 30% 30%, #FFFFFF 0%, #0A84FF 35%, #000000 100%)'
                      : 'radial-gradient(circle at 40% 40%, #8E8E93 0%, #2C2C2E 80%)',
                }}
              />
              <div className="text-xs font-bold text-white">Roughness</div>
              <div className="text-[10px] font-mono text-[#FFD60A]">
                {roughnessDemo.toFixed(2)} ({roughnessDemo < 0.4 ? 'Glossy' : 'Matte PLA'})
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-[#1C1C1E] border border-white/[0.08] flex flex-col items-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#1C1C1E] via-[#D1D1D6] to-white border border-white/40" />
              <div className="text-xs font-bold text-white">Metalness</div>
              <div className="text-[10px] font-mono text-[#30D158]">0.0 PLA vs 1.0 Alu</div>
            </div>
          </div>

          <div className="px-4 py-2.5 rounded-xl bg-[#1C1C1E] border border-white/[0.08] flex items-center justify-between gap-4">
            <span className="text-xs text-[#86868B]">Test Micro-Surface Roughness:</span>
            <input
              type="range"
              min="0.05"
              max="0.95"
              step="0.05"
              value={roughnessDemo}
              onChange={(e) => setRoughnessDemo(parseFloat(e.target.value))}
              className="w-40 accent-[#0A84FF] cursor-pointer h-1.5 bg-[#2C2C2E] rounded-lg"
            />
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 5. ERGONOMICS & 60° SIGHTLINE BIOMECHANICS                            */}
      {/* ===================================================================== */}
      {visualType === 'ergonomics_diagram' && (
        <div className="relative z-10 my-3 flex flex-col items-center">
          <svg viewBox="0 0 360 155" className="w-full max-w-md h-40">
            {/* Desk Baseline */}
            <line x1="30" y1="130" x2="330" y2="130" stroke="#86868B" strokeWidth="2" />
            {/* Weighted Hex Base */}
            <rect x="115" y="114" width="95" height="16" rx="4" fill="#2C2C2E" stroke="#64D2FF" />
            {/* 60° Angled Cradle Spine */}
            <line
              x1="150"
              y1="114"
              x2="205"
              y2="26"
              stroke="#0A84FF"
              strokeWidth="6"
              strokeLinecap="round"
            />
            {/* Angle Arc */}
            <path
              d="M 192 114 A 42 42 0 0 0 172 78"
              fill="none"
              stroke="#FFD60A"
              strokeWidth="2"
              strokeDasharray="3 3"
            />
            <text x="202" y="96" fill="#FFD60A" fontSize="12" fontFamily="monospace" fontWeight="bold">
              60° ERGONOMIC TILT
            </text>
            {/* Sightline Ray */}
            <line
              x1="60"
              y1="36"
              x2="180"
              y2="66"
              stroke="#30D158"
              strokeWidth="1.75"
              strokeDasharray="4 4"
            />
            <circle cx="60" cy="36" r="6" fill="#30D158" />
            <text x="45" y="22" fill="#30D158" fontSize="10" fontFamily="monospace">
              EYE SIGHTLINE (90°⊥)
            </text>
            {/* 3D Critique Pin Callout */}
            <circle cx="150" cy="114" r="5" fill="#FF375F" />
            <text x="40" y="106" fill="#FF375F" fontSize="10" fontFamily="monospace">
              2mm Strain-Relief Fillet
            </text>
          </svg>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 6. CREATOR AUTHORSHIP & ANTI-OFFLOADING MATRIX                        */}
      {/* ===================================================================== */}
      {visualType === 'authorship_matrix' && (
        <div className="relative z-10 my-3 space-y-3">
          <div className="p-3.5 rounded-2xl bg-[#0E2914]/60 border border-[#30D158]/40 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Award className="size-7 text-[#30D158]" />
              <div>
                <div className="text-xs font-mono uppercase text-[#30D158]">
                  VERIFIED HUMAN CREATIVE INTENT
                </div>
                <div className="text-sm font-bold text-white">
                  94.0% Student Engineering Authorship
                </div>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-[#30D158] text-black font-mono text-xs font-bold">
              PASS
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5 text-xs">
            <div className="p-3 rounded-xl bg-[#1C1C1E] border border-white/[0.08]">
              <div className="font-mono text-[10px] text-[#0A84FF] uppercase">
                Human Architect Decisions
              </div>
              <div className="font-semibold text-white mt-1">
                PARTS Brief, 60° Ergonomics, 3.2mm Wall Tolerance
              </div>
            </div>
            <div className="p-3 rounded-xl bg-[#1C1C1E] border border-white/[0.08]">
              <div className="font-mono text-[10px] text-[#FFD60A] uppercase">
                Compute Sustainability
              </div>
              <div className="font-semibold text-white mt-1">
                Think Twice, Generate Once · Zero Prompt Spamming
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Caption Footer */}
      <div className="relative z-10 pt-2.5 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-[#86868B]">
        <span className="flex items-center gap-1.5 text-[#30D158]">
          <CheckCircle2 className="size-3.5" />
          <span>Constructivist Dual-Coding Visual</span>
        </span>
        <span>MOE D&amp;T Masterplan 2030</span>
      </div>
    </div>
  );
};
