import React, { useState } from 'react';
import { EduState, CameraViewPreset } from '../../types';
import { 
  Sparkles, 
  Rotate3d, 
  Sun, 
  Layers, 
  Eye, 
  Compass, 
  Info, 
  CheckCircle2, 
  Maximize2,
  ExternalLink,
  Cpu,
  Share2
} from 'lucide-react';

interface SplineViewportMockProps {
  eduState: EduState;
  onUpdateEduState?: (updates: Partial<EduState>) => void;
  onLaunchCanvasModal?: () => void;
}

const VIEW_PRESETS: { id: CameraViewPreset; label: string; icon: string }[] = [
  { id: 'overview', label: 'Isometric', icon: '📐' },
  { id: 'canopy', label: 'Canopy', icon: '⛺' },
  { id: 'solar', label: 'Solar Roof', icon: '☀️' },
  { id: 'eyelevel', label: 'Eye-Level', icon: '🚶' },
];

export const SplineViewportMock: React.FC<SplineViewportMockProps> = ({
  eduState,
  onUpdateEduState,
  onLaunchCanvasModal,
}) => {
  const [activePreset, setActivePreset] = useState<CameraViewPreset>('overview');
  const [wireframe, setWireframe] = useState<boolean>(false);
  const [activePinId, setActivePinId] = useState<string | null>(null);

  const fabricColor = eduState.canopyColor || '#38bdf8';
  const hasSolar = eduState.solarPanelsEnabled;

  // Visual cues based on active camera preset
  const transformStyle = 
    activePreset === 'overview'
      ? 'rotateX(22deg) rotateY(-28deg) scale(1)'
      : activePreset === 'canopy'
      ? 'rotateX(10deg) rotateY(-12deg) scale(1.3) translateY(30px)'
      : activePreset === 'solar'
      ? 'rotateX(55deg) rotateY(-8deg) scale(1.15) translateY(-20px)'
      : 'rotateX(4deg) rotateY(-40deg) scale(1.2) translateY(50px)';

  return (
    <div className="relative w-full h-full bg-[#08090c] overflow-hidden flex items-center justify-center select-none font-sans">
      {/* 1. Spline Coordinate Grid Floor with Depth Perspective */}
      <div 
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 80%)',
        }}
      />

      {/* 2. Soft Ambient Lighting Halos */}
      <div className="absolute top-1/4 left-1/3 size-96 rounded-full bg-blue-600/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 size-96 rounded-full bg-purple-600/10 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[480px] rounded-full bg-amber-500/5 blur-[120px] pointer-events-none" />

      {/* 3. Spline Floating Status & Collab Tags */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
        <div className="px-2.5 py-1 rounded-full bg-zinc-900/80 backdrop-blur-md border border-white/[0.08] text-[11px] font-mono text-zinc-300 flex items-center gap-1.5 shadow-lg">
          <span className="size-2 rounded-full bg-purple-500 animate-pulse" />
          <span className="text-zinc-400">Agent:</span>
          <span className="text-white font-medium">Show3D Synthesizer</span>
        </div>

        <div className="px-2.5 py-1 rounded-full bg-zinc-900/80 backdrop-blur-md border border-white/[0.08] text-[11px] font-mono text-zinc-400 hidden sm:flex items-center gap-1.5 shadow-lg">
          <span className="size-1.5 rounded-full bg-emerald-400" />
          <span>Class 3-Faith (28 online)</span>
        </div>

        {/* MOE PLD Network & Hardware Spec Badge */}
        <div className="px-2.5 py-1 rounded-full bg-blue-500/10 backdrop-blur-md border border-blue-500/20 text-[10px] font-mono text-blue-300 hidden md:flex items-center gap-1">
          <span>MOE PLD Safe · Port 443 · 60 FPS</span>
        </div>

        {eduState.fallbackActive && (
          <div className="px-2.5 py-1 rounded-full bg-amber-500/20 backdrop-blur-md border border-amber-500/40 text-[10px] font-mono text-amber-300 flex items-center gap-1.5 shadow-lg animate-pulse">
            <span className="size-1.5 rounded-full bg-amber-400" />
            <span>Procedural Fallback Active</span>
          </div>
        )}
      </div>

      {/* Top Right Direct CTA: Launch Live in Show3D Canvas */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
        <button
          onClick={onLaunchCanvasModal}
          className="px-3 py-1.5 rounded-full bg-blue-600/90 hover:bg-blue-500 text-white text-xs font-semibold backdrop-blur-md border border-blue-400/30 shadow-lg shadow-blue-500/20 flex items-center gap-1.5 transition-all hover:scale-102 active:scale-98"
        >
          <ExternalLink className="size-3.5" />
          <span>Try in Show3D Canvas</span>
        </button>
      </div>

      {/* 4. Central 3D Visual Rendering (Interactive Isometric Vector Projection) */}
      <div 
        className="relative z-10 transition-transform duration-700 ease-out cursor-grab active:cursor-grabbing"
        style={{
          transform: transformStyle,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Soft Drop Shadow on Ground */}
        <div 
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-80 h-32 rounded-full bg-black/60 blur-xl pointer-events-none"
        />

        {/* Scaled Visual Spatial Model */}
        <div className="relative w-80 h-72 sm:w-96 sm:h-80 flex items-center justify-center">
          {/* SVG Vector Render of Courtyard Pavilion */}
          <svg 
            viewBox="0 0 400 360" 
            className="w-full h-full drop-shadow-2xl overflow-visible"
          >
            <defs>
              <linearGradient id="canopyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={fabricColor} stopOpacity={wireframe ? "0.2" : "0.95"} />
                <stop offset="100%" stopColor="#1e293b" stopOpacity={wireframe ? "0.1" : "0.9"} />
              </linearGradient>

              <linearGradient id="solarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e3a8a" />
                <stop offset="50%" stopColor="#0284c7" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>

              <linearGradient id="timberGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#d97706" />
                <stop offset="100%" stopColor="#78350f" />
              </linearGradient>

              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Base Platform / Courtyard Timber Deck */}
            <path
              d="M 200 290 L 340 220 L 200 160 L 60 220 Z"
              fill="#18181b"
              stroke={wireframe ? "#3b82f6" : "#27272a"}
              strokeWidth={wireframe ? "1.5" : "1"}
              strokeDasharray={wireframe ? "4 2" : "none"}
            />
            {/* Deck Rim Thickness */}
            <path
              d="M 60 220 L 60 230 L 200 300 L 340 230 L 340 220 L 200 290 Z"
              fill="#0f172a"
              stroke="#27272a"
              strokeWidth="1"
            />

            {/* Support Columns (Steel Hollow Sections) */}
            <line x1="120" y1="200" x2="120" y2="105" stroke={wireframe ? "#3b82f6" : "#94a3b8"} strokeWidth="4" strokeLinecap="round" />
            <line x1="280" y1="200" x2="280" y2="105" stroke={wireframe ? "#3b82f6" : "#94a3b8"} strokeWidth="4" strokeLinecap="round" />
            <line x1="200" y1="250" x2="200" y2="135" stroke={wireframe ? "#3b82f6" : "#64748b"} strokeWidth="4" strokeLinecap="round" />
            <line x1="200" y1="170" x2="200" y2="70"  stroke={wireframe ? "#3b82f6" : "#cbd5e1"} strokeWidth="5" strokeLinecap="round" />

            {/* Modular Timber Benches Inside */}
            <path
              d="M 160 230 L 240 195 L 255 202 L 175 237 Z"
              fill="url(#timberGrad)"
              stroke="#451a03"
              strokeWidth="1"
            />
            <path
              d="M 140 215 L 180 198 L 190 203 L 150 220 Z"
              fill="url(#timberGrad)"
              stroke="#451a03"
              strokeWidth="1"
            />

            {/* Tensile Curved Fabric Canopy (Spline Geometry) */}
            <path
              d="M 200 60 Q 290 85 330 135 Q 260 170 200 145 Q 140 170 70 135 Q 110 85 200 60 Z"
              fill="url(#canopyGrad)"
              stroke={wireframe ? "#38bdf8" : "#ffffff"}
              strokeWidth={wireframe ? "1.5" : "2"}
              strokeDasharray={wireframe ? "4 3" : "none"}
              opacity="0.95"
            />

            {/* Subtle Canopy Form Ridges */}
            <path
              d="M 200 60 Q 200 100 200 145"
              fill="none"
              stroke={wireframe ? "#38bdf8" : "rgba(255,255,255,0.4)"}
              strokeWidth="2"
            />
            <path
              d="M 200 60 Q 250 110 330 135"
              fill="none"
              stroke={wireframe ? "#38bdf8" : "rgba(255,255,255,0.25)"}
              strokeWidth="1.5"
            />
            <path
              d="M 200 60 Q 150 110 70 135"
              fill="none"
              stroke={wireframe ? "#38bdf8" : "rgba(255,255,255,0.25)"}
              strokeWidth="1.5"
            />

            {/* 450W Solar Cell Array (Toggled) */}
            {hasSolar && (
              <g id="solar-array" className="transition-opacity duration-300">
                <path
                  d="M 180 65 L 220 65 L 235 90 L 165 90 Z"
                  fill="url(#solarGrad)"
                  stroke="#38bdf8"
                  strokeWidth="1.5"
                />
                {/* Solar Grid Subdivisions */}
                <line x1="175" y1="77" x2="225" y2="77" stroke="#38bdf8" strokeWidth="0.8" opacity="0.8" />
                <line x1="200" y1="65" x2="200" y2="90" stroke="#38bdf8" strokeWidth="0.8" opacity="0.8" />
              </g>
            )}

            {/* Cross-ventilation airflow indicator arrows (Subtle) */}
            <path
              d="M 90 200 Q 140 180 200 185 Q 260 190 310 170"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              opacity="0.4"
            />
          </svg>
        </div>

        {/* 5. Interactive 3D Hotspot Pins */}
        {/* Pin 1: Tensile Canopy */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 z-30">
          <button
            onClick={() => setActivePinId(activePinId === 'canopy' ? null : 'canopy')}
            className="group relative size-5 rounded-full bg-blue-500/90 border-2 border-white flex items-center justify-center text-white shadow-lg shadow-blue-500/40 hover:scale-125 transition-transform"
          >
            <span className="size-1.5 rounded-full bg-white" />
            <span className="absolute -inset-1 rounded-full border border-blue-400/50 animate-ping pointer-events-none" />
          </button>
          {activePinId === 'canopy' && (
            <div className="absolute top-7 left-1/2 -translate-x-1/2 w-48 p-2.5 rounded-xl spline-glass-panel border border-white/20 text-xs text-white z-40 shadow-2xl">
              <div className="font-semibold text-blue-400 text-[11px] uppercase tracking-wider">Tensile Fabric</div>
              <div className="text-[11px] text-zinc-300 mt-0.5">High-UV tropical membrane blocking 92% direct sunlight while enabling natural illumination.</div>
            </div>
          )}
        </div>

        {/* Pin 2: Solar Array */}
        {hasSolar && (
          <div className="absolute top-20 right-28 z-30">
            <button
              onClick={() => setActivePinId(activePinId === 'solar' ? null : 'solar')}
              className="group relative size-5 rounded-full bg-amber-500/90 border-2 border-white flex items-center justify-center text-white shadow-lg shadow-amber-500/40 hover:scale-125 transition-transform"
            >
              <span className="size-1.5 rounded-full bg-white" />
            </button>
            {activePinId === 'solar' && (
              <div className="absolute top-7 left-1/2 -translate-x-1/2 w-48 p-2.5 rounded-xl spline-glass-panel border border-white/20 text-xs text-white z-40 shadow-2xl">
                <div className="font-semibold text-amber-400 text-[11px] uppercase tracking-wider">450W Solar Cell</div>
                <div className="text-[11px] text-zinc-300 mt-0.5">Monocrystalline panels powering USB-C student study ports and biophilic sensor lights.</div>
              </div>
            )}
          </div>
        )}

        {/* Pin 3: Timber Benches */}
        <div className="absolute bottom-16 left-24 z-30">
          <button
            onClick={() => setActivePinId(activePinId === 'bench' ? null : 'bench')}
            className="group relative size-5 rounded-full bg-emerald-500/90 border-2 border-white flex items-center justify-center text-white shadow-lg shadow-emerald-500/40 hover:scale-125 transition-transform"
          >
            <span className="size-1.5 rounded-full bg-white" />
          </button>
          {activePinId === 'bench' && (
            <div className="absolute bottom-7 left-1/2 -translate-x-1/2 w-48 p-2.5 rounded-xl spline-glass-panel border border-white/20 text-xs text-white z-40 shadow-2xl">
              <div className="font-semibold text-emerald-400 text-[11px] uppercase tracking-wider">Modular Seating</div>
              <div className="text-[11px] text-zinc-300 mt-0.5">Ergonomic recycled timber benches arranged for peer collaboration and airflow.</div>
            </div>
          )}
        </div>
      </div>

      {/* 6. Spline Bottom Floating Controls Dock */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 px-3 py-1.5 rounded-full spline-glass-pill border border-white/[0.1] shadow-2xl">
        {/* Preset Camera Views */}
        <div className="flex items-center gap-1 border-r border-white/10 pr-2">
          {VIEW_PRESETS.map((p) => (
            <button
              key={p.id}
              onClick={() => setActivePreset(p.id)}
              className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all flex items-center gap-1 ${
                activePreset === p.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-zinc-400 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              <span>{p.icon}</span>
              <span className="hidden sm:inline">{p.label}</span>
            </button>
          ))}
        </div>

        {/* Wireframe Toggle */}
        <button
          onClick={() => setWireframe(!wireframe)}
          className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
            wireframe
              ? 'bg-purple-600 text-white'
              : 'text-zinc-400 hover:text-white hover:bg-white/[0.05]'
          }`}
          title="Toggle Topology Wireframe"
        >
          <Layers className="size-3.5" />
          <span className="hidden sm:inline">Wireframe</span>
        </button>

        {/* Polycount Stat */}
        <div className="text-[10px] font-mono text-zinc-500 pl-1 hidden md:block">
          1.4k Tris · WebGL
        </div>
      </div>
    </div>
  );
};
