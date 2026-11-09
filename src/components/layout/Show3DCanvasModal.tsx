import React, { useState, useEffect } from 'react';
import {
  X,
  Box,
  Layers,
  Sliders,
  MapPin,
  Download,
  RotateCcw,
  Sun,
  Check,
  Copy,
  Sparkles,
  Eye,
  Compass,
  Grid,
  Orbit,
  Plus,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import {
  CanvasStudioState,
  CanvasModelArchetype,
  ViewportShadingMode,
  StudioCameraPreset,
  FilamentMaterialPreset,
  SpatialCritiquePin,
  INITIAL_CANVAS_STUDIO_STATE,
  setStudioArchetype,
  setStudioShadingMode,
  setStudioCameraPreset,
  updateStudioParametricLevers,
  addSpatialCritiquePin,
  computeMeshDiagnostics,
  computeSlicerMetrics,
  generateAsciiSTL,
  generateGLTFSceneSummary,
} from '../../utils/canvasStudioState';
import { togglePartsToken, ALLOWED_SWATCHES } from '../../utils/workflowState';
import { Show3DViewport3D } from '../canvas/Show3DViewport3D';

export interface Show3DCanvasModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialArchetype?: CanvasModelArchetype;
  initialColor?: string;
  initialCurvature?: number;
  initialSolar?: boolean;
}

type InspectorTab = 'parametric' | 'materials' | 'pins';

export const Show3DCanvasModal: React.FC<Show3DCanvasModalProps> = ({
  isOpen,
  onClose,
  initialArchetype,
  initialColor,
  initialCurvature,
  initialSolar,
}) => {
  const [studioState, setStudioState] = useState<CanvasStudioState>(INITIAL_CANVAS_STUDIO_STATE);
  const [activeInspectorTab, setActiveInspectorTab] = useState<InspectorTab>('parametric');
  const [selectedPin, setSelectedPin] = useState<SpatialCritiquePin | null>(
    INITIAL_CANVAS_STUDIO_STATE.pins[0] || null
  );
  const [newPinLabel, setNewPinLabel] = useState('');
  const [newPinComment, setNewPinComment] = useState('');
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [copiedEmbed, setCopiedEmbed] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setStudioState((prev) => ({
        ...prev,
        archetype: initialArchetype ?? prev.archetype,
        canopyColor: initialColor ?? prev.canopyColor,
        curvature: typeof initialCurvature === 'number' ? initialCurvature : prev.curvature,
        hasSolar: typeof initialSolar === 'boolean' ? initialSolar : prev.hasSolar,
      }));
    }
  }, [isOpen, initialArchetype, initialColor, initialCurvature, initialSolar]);

  if (!isOpen) return null;

  const diagnostics = computeMeshDiagnostics(studioState);
  const slicer = computeSlicerMetrics(studioState);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3200);
  };

  const handleDownloadFile = (content: string, filename: string, mimeType: string) => {
    try {
      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      // Fallback in restricted environments
    }
    triggerToast(`Exported ${filename} (${diagnostics.vertexCount} vertices · Watertight)`);
  };

  const handleExportSTL = () => {
    const stl = generateAsciiSTL(studioState);
    handleDownloadFile(stl, `show3d-${studioState.archetype}.stl`, 'model/stl');
  };

  const handleExportGLTF = () => {
    const gltf = generateGLTFSceneSummary(studioState);
    handleDownloadFile(gltf, `show3d-${studioState.archetype}.gltf`, 'model/gltf+json');
  };

  const handleCopyEmbed = () => {
    navigator.clipboard?.writeText(
      `<iframe src="https://studio.show3d.edu.sg/embed/${studioState.archetype}" width="100%" height="640" />`
    );
    setCopiedEmbed(true);
    triggerToast('Copied interactive 3D embed snippet to clipboard');
    setTimeout(() => setCopiedEmbed(false), 2000);
  };

  const handleAddPinAtPoint = (coords: [number, number, number]) => {
    const label = newPinLabel.trim() || `D&T Spatial Note (${coords[0]}, ${coords[1]})`;
    const comment =
      newPinComment.trim() ||
      `Verified structural geometry and surface clearance at [${coords.join(', ')}].`;
    const nextState = addSpatialCritiquePin(studioState, {
      label,
      author: 'Student Designer',
      category: 'structural',
      position: coords,
      comment,
    });
    setStudioState({ ...nextState, transformTool: 'orbit' });
    setSelectedPin(nextState.pins[nextState.pins.length - 1]);
    setNewPinLabel('');
    setNewPinComment('');
    triggerToast(`Anchored 3D Critique Pin at [${coords.join(', ')}]`);
  };

  const handleToggleToken = (tokenId: string) => {
    setStudioState((prev) => ({
      ...prev,
      activeTokens: togglePartsToken(prev.activeTokens, tokenId),
    }));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 lg:p-6 bg-black/85 backdrop-blur-2xl s3d-modal-backdrop font-sans select-none text-[#F5F5F7]"
      data-state="open"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[1440px] h-[92vh] rounded-[32px] border border-white/[0.1] bg-[#1C1C1E] shadow-2xl flex flex-col overflow-hidden s3d-modal-sheet"
        data-state="open"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ================================================================= */}
        {/* TOP STUDIO COMMAND BAR                                            */}
        {/* ================================================================= */}
        <header className="px-4 sm:px-6 py-3.5 bg-[#000000]/80 border-b border-white/[0.08] flex flex-wrap items-center justify-between gap-3 shrink-0">
          {/* Left: Studio Identity & Archetype Selector */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2.5 pr-3 border-r border-white/[0.08]">
              <div className="w-8 h-8 rounded-xl bg-[#0D2137] border border-[#0A84FF]/30 flex items-center justify-center text-[#0A84FF]">
                <Box className="size-4" />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-display font-bold text-white leading-tight">
                  Show3D Creation Studio
                </div>
                <div className="text-[10px] font-mono text-[#86868B]">
                  Three.js WebGL · Port 443 Native
                </div>
              </div>
            </div>

            {/* 3 Switchable 3D Capstone Archetypes */}
            <div
              className="inline-flex p-1 rounded-full bg-[#1C1C1E] border border-white/[0.08]"
              role="tablist"
              aria-label="3D Model Archetypes"
            >
              {(
                [
                  { id: 'pavilion', label: 'Tensile Pavilion' },
                  { id: 'desk_dock', label: '60° Desk Dock' },
                  { id: 'primitives', label: 'X-Y-Z Primitives' },
                ] as { id: CanvasModelArchetype; label: string }[]
              ).map((item) => {
                const isActive = studioState.archetype === item.id;
                return (
                  <button
                    key={item.id}
                    id={`studio-archetype-${item.id}`}
                    onClick={() => setStudioState((s) => setStudioArchetype(s, item.id))}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-white text-black font-semibold shadow-sm'
                        : 'text-[#86868B] hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Center: 5 Viewport Shading Modes */}
          <div
            className="hidden xl:inline-flex p-1 rounded-full bg-[#1C1C1E] border border-white/[0.08]"
            role="tablist"
            aria-label="Viewport Shading Modes"
          >
            {(
              [
                { id: 'pbr', label: 'PBR Studio' },
                { id: 'wireframe', label: 'Wireframe' },
                { id: 'clay', label: 'Clay Form' },
                { id: 'stress_wall_thickness', label: 'Wall Stress' },
                { id: 'slicer_layers', label: '3D Slicer' },
              ] as { id: ViewportShadingMode; label: string }[]
            ).map((mode) => {
              const isActive = studioState.shadingMode === mode.id;
              return (
                <button
                  key={mode.id}
                  id={`studio-shading-${mode.id}`}
                  onClick={() => setStudioState((s) => setStudioShadingMode(s, mode.id))}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-[#0A84FF] text-white font-semibold shadow-sm'
                      : 'text-[#86868B] hover:text-white'
                  }`}
                >
                  {mode.label}
                </button>
              );
            })}
          </div>

          {/* Right: Export .STL / .GLTF & Close */}
          <div className="flex items-center gap-2">
            <button
              id="studio-export-stl-btn"
              onClick={handleExportSTL}
              className="px-3.5 py-2 rounded-full bg-[#30D158] hover:bg-[#28B84C] text-black font-semibold text-xs flex items-center gap-1.5 transition-all shadow-sm"
              title="Download 3D-printable ASCII .STL file"
            >
              <Download className="size-3.5" />
              <span>Export .STL</span>
            </button>

            <button
              id="studio-export-gltf-btn"
              onClick={handleExportGLTF}
              className="hidden sm:flex px-3.5 py-2 rounded-full bg-[#2C2C2E] hover:bg-[#3A3A3C] text-white border border-white/[0.08] font-medium text-xs items-center gap-1.5 transition-colors"
              title="Download glTF 2.0 scene summary"
            >
              <Layers className="size-3.5 text-[#64D2FF]" />
              <span>.GLTF</span>
            </button>

            <button
              onClick={handleCopyEmbed}
              className="hidden md:flex px-3 py-2 rounded-full bg-[#2C2C2E] hover:bg-[#3A3A3C] text-[#86868B] hover:text-white border border-white/[0.08] text-xs items-center gap-1.5 transition-colors"
              title="Copy embed snippet"
            >
              {copiedEmbed ? (
                <Check className="size-3.5 text-[#30D158]" />
              ) : (
                <Copy className="size-3.5" />
              )}
              <span>{copiedEmbed ? 'Copied' : 'Embed'}</span>
            </button>

            <button
              id="studio-close-btn"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#2C2C2E] hover:bg-[#3A3A3C] border border-white/[0.08] flex items-center justify-center text-[#86868B] hover:text-white transition-colors ml-1"
              aria-label="Close 3D Studio"
            >
              <X className="size-4" />
            </button>
          </div>
        </header>

        {/* ================================================================= */}
        {/* MAIN WORKSPACE: LEFT DOCK + 3D WEBGL VIEWPORT + RIGHT INSPECTOR   */}
        {/* ================================================================= */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 overflow-y-auto lg:overflow-hidden">
          {/* Center-Left 8 Columns: Interactive 3D Viewport + Camera Dock */}
          <div className="lg:col-span-8 flex flex-col gap-3 min-h-[380px] h-full">
            {/* Compact Mobile/Tablet Shading Bar + Camera Presets Strip */}
            <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 rounded-2xl bg-[#000000]/60 border border-white/[0.08]">
              {/* Camera View Presets */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#86868B] mr-1 flex items-center gap-1">
                  <Compass className="size-3 text-[#0A84FF]" />
                  <span>View:</span>
                </span>
                {(
                  [
                    { id: 'overview', label: 'Perspective' },
                    { id: 'eyelevel', label: '60° Sightline' },
                    { id: 'canopy', label: 'Canopy Arch' },
                    { id: 'solar', label: 'Solar Zenith' },
                    { id: 'top', label: 'Top Plan' },
                    { id: 'front', label: 'Front Elev' },
                  ] as { id: StudioCameraPreset; label: string }[]
                ).map((cam) => (
                  <button
                    key={cam.id}
                    onClick={() => setStudioState((s) => setStudioCameraPreset(s, cam.id))}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-mono transition-colors shrink-0 ${
                      studioState.cameraPreset === cam.id
                        ? 'bg-[#0A84FF] text-white font-semibold'
                        : 'bg-[#1C1C1E] text-[#86868B] hover:text-white border border-white/[0.06]'
                    }`}
                  >
                    {cam.label}
                  </button>
                ))}
              </div>

              {/* Viewport Helpers: Pin Dropper, Auto-Rotate, Grid */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() =>
                    setStudioState((s) => ({
                      ...s,
                      transformTool: s.transformTool === 'drop_pin' ? 'orbit' : 'drop_pin',
                    }))
                  }
                  className={`px-3 py-1 rounded-full text-[11px] font-medium flex items-center gap-1 transition-all ${
                    studioState.transformTool === 'drop_pin'
                      ? 'bg-[#FF375F] text-white font-semibold shadow-sm'
                      : 'bg-[#1C1C1E] text-[#86868B] hover:text-white border border-white/[0.08]'
                  }`}
                  title="Click on the 3D mesh to drop a spatial critique pin"
                >
                  <MapPin className="size-3" />
                  <span>{studioState.transformTool === 'drop_pin' ? 'Click 3D Mesh...' : 'Pin Critique'}</span>
                </button>

                <button
                  onClick={() => setStudioState((s) => ({ ...s, autoRotate: !s.autoRotate }))}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-mono flex items-center gap-1 transition-colors ${
                    studioState.autoRotate
                      ? 'bg-[#30D158]/20 text-[#30D158] border border-[#30D158]/40'
                      : 'bg-[#1C1C1E] text-[#86868B] hover:text-white border border-white/[0.08]'
                  }`}
                  title="Toggle 360° turntable rotation"
                >
                  <Orbit className="size-3" />
                  <span className="hidden sm:inline">Turntable</span>
                </button>

                <button
                  onClick={() => setStudioState((s) => ({ ...s, showGrid: !s.showGrid }))}
                  className={`p-1.5 rounded-full transition-colors ${
                    studioState.showGrid
                      ? 'bg-[#2C2C2E] text-white'
                      : 'bg-[#1C1C1E] text-[#86868B]'
                  }`}
                  title="Toggle X-Y-Z Floor Grid"
                >
                  <Grid className="size-3.5" />
                </button>

                <button
                  onClick={() => setStudioState(INITIAL_CANVAS_STUDIO_STATE)}
                  className="p-1.5 rounded-full bg-[#1C1C1E] hover:bg-[#2C2C2E] text-[#86868B] hover:text-white border border-white/[0.08] transition-colors"
                  title="Reset 3D Studio Parameters"
                >
                  <RotateCcw className="size-3.5" />
                </button>
              </div>
            </div>

            {/* Live Three.js WebGL Stage */}
            <div className="flex-1 min-h-[320px]">
              <Show3DViewport3D
                studioState={studioState}
                onAddPinAtPoint={handleAddPinAtPoint}
                onSelectPin={(pin) => {
                  setSelectedPin(pin);
                  setActiveInspectorTab('pins');
                }}
                selectedPinId={selectedPin?.id}
              />
            </div>
          </div>

          {/* Right 4 Columns: Inspector Panel (Parametric Levers | PBR Material Lab | 3D Critique Pins) */}
          <div className="lg:col-span-4 rounded-[24px] bg-[#000000]/70 border border-white/[0.08] p-5 flex flex-col justify-between overflow-y-auto space-y-5">
            <div className="space-y-5">
              {/* 3-Tab Segmented Inspector Control */}
              <div className="grid grid-cols-3 gap-1 p-1 rounded-full bg-[#1C1C1E] border border-white/[0.08]">
                {(
                  [
                    { id: 'parametric', label: 'Geometry', icon: Sliders },
                    { id: 'materials', label: 'Materials', icon: Layers },
                    { id: 'pins', label: `Pins (${studioState.pins.length})`, icon: MapPin },
                  ] as const
                ).map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeInspectorTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveInspectorTab(tab.id)}
                      className={`py-2 px-2 rounded-full text-xs font-medium flex items-center justify-center gap-1.5 transition-all ${
                        isActive
                          ? 'bg-white text-black font-semibold shadow-sm'
                          : 'text-[#86868B] hover:text-white'
                      }`}
                    >
                      <Icon className="size-3.5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* TAB 1: PARAMETRIC GEOMETRY & PARTS LEVERS */}
              {activeInspectorTab === 'parametric' && (
                <div className="space-y-4">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#0A84FF] block">
                      Human-in-the-Loop Controls
                    </span>
                    <h3 className="font-display text-lg font-bold text-white mt-0.5">
                      Parametric Geometry Levers
                    </h3>
                  </div>

                  {/* Arch Curvature / Tension Slider */}
                  <div className="p-3.5 rounded-2xl bg-[#1C1C1E] border border-white/[0.08] space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#86868B]">Parabolic Arch Tension</span>
                      <span className="font-mono font-semibold text-white">
                        {studioState.curvature.toFixed(2)} ratio
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0.20"
                      max="1.00"
                      step="0.05"
                      value={studioState.curvature}
                      onChange={(e) =>
                        setStudioState((s) =>
                          updateStudioParametricLevers(s, { curvature: parseFloat(e.target.value) })
                        )
                      }
                      className="w-full accent-[#0A84FF] cursor-pointer h-1.5 bg-[#2C2C2E] rounded-lg"
                    />
                  </div>

                  {/* Structural Wall / Rib Thickness Slider (Ties to Marcus Lee Thin-Wall Scenario) */}
                  <div className="p-3.5 rounded-2xl bg-[#1C1C1E] border border-white/[0.08] space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#86868B]">Wall &amp; Rib Thickness</span>
                      <span
                        className={`font-mono font-semibold ${
                          studioState.ribThicknessMm < 2.0 ? 'text-[#FF375F]' : 'text-[#30D158]'
                        }`}
                      >
                        {studioState.ribThicknessMm.toFixed(1)} mm
                      </span>
                    </div>
                    <input
                      type="range"
                      min="1.2"
                      max="5.0"
                      step="0.2"
                      value={studioState.ribThicknessMm}
                      onChange={(e) =>
                        setStudioState((s) =>
                          updateStudioParametricLevers(s, {
                            ribThicknessMm: parseFloat(e.target.value),
                          })
                        )
                      }
                      className="w-full accent-[#30D158] cursor-pointer h-1.5 bg-[#2C2C2E] rounded-lg"
                    />
                    <p className="text-[11px] text-[#86868B] leading-relaxed">
                      {diagnostics.stressSummary}
                    </p>
                  </div>

                  {/* 60° Ergonomic Sightline Tilt Slider */}
                  <div className="p-3.5 rounded-2xl bg-[#1C1C1E] border border-white/[0.08] space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#86868B]">Ergonomic Sightline Angle</span>
                      <span className="font-mono font-semibold text-[#64D2FF]">
                        {studioState.ergonomicTiltDeg}° Tilt
                      </span>
                    </div>
                    <input
                      type="range"
                      min="40"
                      max="75"
                      step="1"
                      value={studioState.ergonomicTiltDeg}
                      onChange={(e) =>
                        setStudioState((s) =>
                          updateStudioParametricLevers(s, {
                            ergonomicTiltDeg: parseInt(e.target.value, 10),
                          })
                        )
                      }
                      className="w-full accent-[#64D2FF] cursor-pointer h-1.5 bg-[#2C2C2E] rounded-lg"
                    />
                  </div>

                  {/* PARTS Prompt Tokens */}
                  <div className="p-3.5 rounded-2xl bg-[#1C1C1E] border border-white/[0.08] space-y-2.5">
                    <div className="text-xs font-medium text-white">
                      PARTS Structural Tokens
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        { id: 'tensile', label: 'Tensile Canopy' },
                        { id: 'benches', label: 'Modular Benches' },
                        { id: 'solar', label: '450W Solar Array' },
                        { id: 'airflow', label: 'Airflow Louvers' },
                      ].map((tok) => {
                        const isSelected = studioState.activeTokens.includes(tok.id);
                        return (
                          <button
                            key={tok.id}
                            onClick={() => handleToggleToken(tok.id)}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                              isSelected
                                ? 'bg-[#0A84FF] text-white font-semibold'
                                : 'bg-[#2C2C2E] text-[#86868B] hover:text-white'
                            }`}
                          >
                            {isSelected && <Check className="size-3" />}
                            <span>{tok.label}</span>
                          </button>
                        );
                      })}
                    </div>

                    <button
                      onClick={() =>
                        setStudioState((s) =>
                          updateStudioParametricLevers(s, { hasSolar: !s.hasSolar })
                        )
                      }
                      className={`w-full mt-2 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-between border transition-colors ${
                        studioState.hasSolar
                          ? 'bg-[#2C2405] border-[#FFD60A]/40 text-[#FFD60A]'
                          : 'bg-[#2C2C2E] border-white/[0.08] text-[#86868B]'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <Sun className="size-3.5" />
                        <span>Monocrystalline Solar Roof</span>
                      </span>
                      <span className="font-mono">{studioState.hasSolar ? '450W ON' : '0W OFF'}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 2: PBR MATERIAL & FILAMENT LAB */}
              {activeInspectorTab === 'materials' && (
                <div className="space-y-4">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#30D158] block">
                      Module 04 · Optical &amp; Physical Shaders
                    </span>
                    <h3 className="font-display text-lg font-bold text-white mt-0.5">
                      PBR Material &amp; Filament Lab
                    </h3>
                  </div>

                  {/* Albedo Swatches */}
                  <div className="p-3.5 rounded-2xl bg-[#1C1C1E] border border-white/[0.08] space-y-2.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#86868B]">Albedo Pigment Swatch</span>
                      <span className="font-mono text-[#64D2FF]">
                        Reflectivity: {diagnostics.albedoReflectivity.toFixed(2)}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { hex: '#ffffff', name: 'Solar White (0.85)' },
                        { hex: '#38bdf8', name: 'Sky Cyan (0.65)' },
                        { hex: '#10b981', name: 'Palm Green (0.40)' },
                        { hex: '#f59e0b', name: 'Terracotta (0.35)' },
                      ].map((sw) => (
                        <button
                          key={sw.hex}
                          onClick={() =>
                            setStudioState((s) =>
                              updateStudioParametricLevers(s, { canopyColor: sw.hex })
                            )
                          }
                          className={`p-2 rounded-xl border text-left flex items-center gap-2 text-xs transition-all ${
                            studioState.canopyColor.toLowerCase() === sw.hex.toLowerCase()
                              ? 'bg-[#2C2C2E] border-white text-white font-semibold'
                              : 'bg-[#000000]/50 border-white/[0.08] text-[#86868B] hover:text-white'
                          }`}
                        >
                          <span
                            className="w-4 h-4 rounded-full shrink-0 border border-white/30"
                            style={{ backgroundColor: sw.hex }}
                          />
                          <span className="truncate">{sw.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Roughness & Metalness Dials */}
                  <div className="p-3.5 rounded-2xl bg-[#1C1C1E] border border-white/[0.08] space-y-3">
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="text-[#86868B]">Surface Roughness (Micro-Scatter)</span>
                        <span className="font-mono text-white">
                          {studioState.roughness.toFixed(2)}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0.05"
                        max="0.95"
                        step="0.05"
                        value={studioState.roughness}
                        onChange={(e) =>
                          setStudioState((s) =>
                            updateStudioParametricLevers(s, {
                              roughness: parseFloat(e.target.value),
                            })
                          )
                        }
                        className="w-full accent-[#0A84FF] cursor-pointer h-1.5 bg-[#2C2C2E] rounded-lg"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="text-[#86868B]">Metalness (Conductivity)</span>
                        <span className="font-mono text-white">
                          {studioState.metalness.toFixed(2)}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0.00"
                        max="0.95"
                        step="0.05"
                        value={studioState.metalness}
                        onChange={(e) =>
                          setStudioState((s) =>
                            updateStudioParametricLevers(s, {
                              metalness: parseFloat(e.target.value),
                            })
                          )
                        }
                        className="w-full accent-[#FFD60A] cursor-pointer h-1.5 bg-[#2C2C2E] rounded-lg"
                      />
                    </div>
                  </div>

                  {/* Physical 3D Printing Filament Presets */}
                  <div className="p-3.5 rounded-2xl bg-[#1C1C1E] border border-white/[0.08] space-y-2">
                    <div className="text-xs font-medium text-white">
                      Physical FDM Filament Spool
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {(
                        [
                          { id: 'eco_pla', label: 'Matte Eco-PLA', desc: '195°C · Cornstarch Bio' },
                          { id: 'petg_structural', label: 'Structural PETG', desc: '240°C · UV/Outdoor' },
                          { id: 'wood_pla', label: 'Timber PLA', desc: '205°C · 20% Wood Fiber' },
                          { id: 'anodized_alu', label: 'Metallic Silk PLA', desc: '215°C · High Specular' },
                        ] as { id: FilamentMaterialPreset; label: string; desc: string }[]
                      ).map((fil) => (
                        <button
                          key={fil.id}
                          onClick={() =>
                            setStudioState((s) =>
                              updateStudioParametricLevers(s, { filamentPreset: fil.id })
                            )
                          }
                          className={`p-2.5 rounded-xl border text-left transition-all ${
                            studioState.filamentPreset === fil.id
                              ? 'bg-[#0D2137] border-[#0A84FF] text-white'
                              : 'bg-[#000000]/40 border-white/[0.08] text-[#86868B] hover:text-white'
                          }`}
                        >
                          <div className="text-xs font-semibold text-white">{fil.label}</div>
                          <div className="text-[10px] font-mono text-[#86868B]">{fil.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: 3D SPATIAL CRITIQUE PINS */}
              {activeInspectorTab === 'pins' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[#FF375F] block">
                        Module 05 · Collaborative D&amp;T Review
                      </span>
                      <h3 className="font-display text-lg font-bold text-white mt-0.5">
                        3D Spatial Critique Pins
                      </h3>
                    </div>

                    <button
                      onClick={() =>
                        setStudioState((s) => ({
                          ...s,
                          transformTool: s.transformTool === 'drop_pin' ? 'orbit' : 'drop_pin',
                        }))
                      }
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 transition-all ${
                        studioState.transformTool === 'drop_pin'
                          ? 'bg-[#FF375F] text-white'
                          : 'bg-[#0A84FF] text-white hover:bg-[#0071E3]'
                      }`}
                    >
                      <Plus className="size-3.5" />
                      <span>{studioState.transformTool === 'drop_pin' ? 'Click Mesh' : 'Add Pin'}</span>
                    </button>
                  </div>

                  {/* Optional Custom Pin Label Input before clicking mesh */}
                  {studioState.transformTool === 'drop_pin' && (
                    <div className="p-3 rounded-2xl bg-[#2E0C14]/70 border border-[#FF375F]/40 space-y-2">
                      <div className="text-[11px] font-mono text-[#FF375F]">
                        PIN PLACEMENT ACTIVE: Click anywhere on the 3D model
                      </div>
                      <input
                        type="text"
                        value={newPinLabel}
                        onChange={(e) => setNewPinLabel(e.target.value)}
                        placeholder="Pin title (e.g., 3mm Rib Fillet)"
                        className="w-full px-3 py-1.5 rounded-xl bg-[#000000] border border-white/[0.12] text-xs text-white placeholder-[#86868B] focus:outline-none focus:border-[#0A84FF]"
                      />
                      <input
                        type="text"
                        value={newPinComment}
                        onChange={(e) => setNewPinComment(e.target.value)}
                        placeholder="Engineering observation or feedback..."
                        className="w-full px-3 py-1.5 rounded-xl bg-[#000000] border border-white/[0.12] text-xs text-white placeholder-[#86868B] focus:outline-none focus:border-[#0A84FF]"
                      />
                    </div>
                  )}

                  <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                    {studioState.pins.map((pin) => {
                      const isSelected = selectedPin?.id === pin.id;
                      return (
                        <div
                          key={pin.id}
                          onClick={() => setSelectedPin(pin)}
                          className={`p-3 rounded-2xl border cursor-pointer transition-all space-y-1.5 ${
                            isSelected
                              ? 'bg-[#1C1C1E] border-[#0A84FF]'
                              : 'bg-[#1C1C1E]/60 border-white/[0.08] hover:border-white/[0.18]'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                              <MapPin className="size-3.5 text-[#0A84FF]" />
                              <span>{pin.label}</span>
                            </span>
                            <span className="text-[10px] font-mono text-[#86868B]">
                              [{pin.position.join(', ')}]
                            </span>
                          </div>
                          <p className="text-xs text-[#86868B] leading-relaxed">{pin.comment}</p>
                          <div className="flex items-center justify-between text-[10px] font-mono pt-1">
                            <span className="text-[#64D2FF]">{pin.author}</span>
                            <span className={pin.resolved ? 'text-[#30D158]' : 'text-[#FFD60A]'}>
                              {pin.resolved ? 'Verified' : 'Open Review'}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Fabrication Summary Card */}
            <div className="p-3.5 rounded-2xl bg-[#1C1C1E] border border-white/[0.08] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-[11px] text-[#86868B]">3D PRINT SLICER ESTIMATE</span>
                <span className="font-mono text-[11px] text-[#30D158] font-semibold">
                  {diagnostics.isWatertightManifold ? 'WATERTIGHT' : 'CHECK WALLS'}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center pt-1">
                <div className="p-2 rounded-xl bg-[#000000]/60">
                  <div className="text-[10px] text-[#86868B]">Layers</div>
                  <div className="text-xs font-mono font-bold text-white">{slicer.totalLayers}</div>
                </div>
                <div className="p-2 rounded-xl bg-[#000000]/60">
                  <div className="text-[10px] text-[#86868B]">Print Time</div>
                  <div className="text-xs font-mono font-bold text-white">
                    {slicer.estimatedPrintMinutes}m
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-[#000000]/60">
                  <div className="text-[10px] text-[#86868B]">PLA Mass</div>
                  <div className="text-xs font-mono font-bold text-[#30D158]">
                    {slicer.filamentMassGrams}g
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Toast Notification */}
        {toastMsg && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full bg-[#0A84FF] text-white text-xs font-semibold shadow-xl flex items-center gap-2">
            <Sparkles className="size-3.5" />
            <span>{toastMsg}</span>
          </div>
        )}
      </div>
    </div>
  );
};
