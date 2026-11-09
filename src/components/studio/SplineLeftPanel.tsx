import React, { useState } from 'react';
import { EduState } from '../../types';
import { 
  Sparkles, 
  Send, 
  Layers, 
  Box, 
  Eye, 
  EyeOff, 
  Lock, 
  Unlock, 
  ChevronRight, 
  ChevronDown, 
  Cpu, 
  SlidersHorizontal,
  Bot,
  Plus,
  Compass,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';

interface SplineLeftPanelProps {
  eduState: EduState;
  onUpdateEduState: (updates: Partial<EduState>) => void;
  onTriggerGenerate: () => void;
  selectedObjectId: string;
  onSelectObject: (id: string) => void;
}

const FOUNDATIONAL_CHIPS = [
  'Curved tensile canopy',
  'Modular timber benches',
  'Integrated 450W solar roof',
  'Cross-ventilation air gaps',
  'Biophilic planter boxes'
];

const EXTENDED_STEM_CHIPS = [
  'Aerodynamic 14° angle-of-attack pitch',
  'Dual 450W monocrystalline arrays',
  'Internal braided cable pass-through',
  'Reinforced steel hollow chassis',
  'Support-free 45° overhang geometry'
];

export const SplineLeftPanel: React.FC<SplineLeftPanelProps> = ({
  eduState,
  onUpdateEduState,
  onTriggerGenerate,
  selectedObjectId,
  onSelectObject,
}) => {
  const [activeTab, setActiveTab] = useState<'agent' | 'objects'>('agent');
  const [customPrompt, setCustomPrompt] = useState(eduState.promptText || '');
  const [sceneGroupOpen, setSceneGroupOpen] = useState(true);
  const [showPartsGuide, setShowPartsGuide] = useState(false);

  const currentTrack = eduState.track || 'foundational';
  const activeChips = currentTrack === 'foundational' ? FOUNDATIONAL_CHIPS : EXTENDED_STEM_CHIPS;

  const handleChipClick = (chip: string) => {
    const updated = customPrompt ? `${customPrompt}, ${chip}` : chip;
    setCustomPrompt(updated);
    onUpdateEduState({ promptText: updated });
  };

  const handleSendPrompt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customPrompt.trim()) return;
    onUpdateEduState({ promptText: customPrompt });
    onTriggerGenerate();
  };

  return (
    <aside className="w-80 h-full flex flex-col bg-[#0e1017]/90 backdrop-blur-2xl border-r border-white/[0.08] select-none text-zinc-300 font-sans z-30 shrink-0">
      {/* Top Header & Tab Switcher (Spline Segmented Bar) */}
      <div className="h-11 px-3 border-b border-white/[0.08] flex items-center justify-between">
        <div className="flex items-center gap-1 bg-[#161822] p-0.5 rounded-lg border border-white/[0.06]">
          <button
            onClick={() => setActiveTab('agent')}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'agent'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Bot className="size-3.5" />
            <span>Agent</span>
          </button>
          <button
            onClick={() => setActiveTab('objects')}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'objects'
                ? 'bg-white/10 text-white shadow-xs'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Layers className="size-3.5" />
            <span>Objects</span>
          </button>
        </div>

        <div className="text-[10px] font-mono text-zinc-500 flex items-center gap-1">
          <span className="size-1.5 rounded-full bg-emerald-400" />
          <span>v1.4</span>
        </div>
      </div>

      {/* Differentiated Instruction Track Selector */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-[#12141c] border-b border-white/[0.06] text-[11px]">
        <span className="text-zinc-400 font-mono text-[10px]">Track:</span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onUpdateEduState({ track: 'foundational' })}
            className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
              currentTrack === 'foundational'
                ? 'bg-blue-600 text-white font-semibold shadow-xs'
                : 'text-zinc-500 hover:text-white'
            }`}
            title="Guided prompt scaffolding & procedural presets for beginners"
          >
            Foundational
          </button>
          <button
            type="button"
            onClick={() => onUpdateEduState({ track: 'extended' })}
            className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
              currentTrack === 'extended'
                ? 'bg-purple-600 text-white font-semibold shadow-xs'
                : 'text-zinc-500 hover:text-white'
            }`}
            title="Parametric modifiers & complex spatial constraints for STEM CCAs"
          >
            Extended STEM
          </button>
        </div>
      </div>

      {/* TAB 1: AGENT CO-PILOT (AI Prompt Engineering & Conversation) */}
      {activeTab === 'agent' && (
        <div className="flex-1 flex flex-col min-h-0">
          {/* Conversation & Scaffolding History */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* System / Task Goal Badge + PARTS Scaffolding Drawer */}
            <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-blue-400">
                <span className="flex items-center gap-1">
                  <Sparkles className="size-3" />
                  <span>PARTS Scaffold ({currentTrack === 'foundational' ? 'Guided' : 'Extended'})</span>
                </span>
                <button
                  type="button"
                  onClick={() => setShowPartsGuide(!showPartsGuide)}
                  className="text-[10px] text-zinc-400 hover:text-white underline"
                >
                  {showPartsGuide ? 'Hide Guide' : 'What is PARTS?'}
                </button>
              </div>

              {showPartsGuide && (
                <div className="p-2.5 rounded-lg bg-black/40 border border-white/[0.06] text-[10px] font-mono space-y-1 text-zinc-300">
                  <div><strong className="text-blue-400">P</strong>ersona: Architectural Environmental Designer</div>
                  <div><strong className="text-blue-400">A</strong>im: Shading, solar power harvest, cooling</div>
                  <div><strong className="text-blue-400">R</strong>ecipients: Class 3-Faith students</div>
                  <div><strong className="text-blue-400">T</strong>heme: Tropical Biophilic Pavilion</div>
                  <div><strong className="text-blue-400">S</strong>tructure: Tensile fabric + solar cells</div>
                </div>
              )}

              <p className="text-xs text-zinc-300 leading-relaxed">
                <strong className="text-white">Design Challenge:</strong> Create a courtyard pavilion protecting students from midday 34°C tropical heat while generating clean solar power.
              </p>
            </div>

            {/* Prompt Scaffolding Quick Chips */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                  {currentTrack === 'foundational' ? 'Architectural Keywords' : 'Advanced Engineering Modifiers'}
                </label>
                <span className="text-[10px] font-mono text-zinc-500">
                  {currentTrack === 'foundational' ? 'D&T Sec 1-2' : 'STEM CCA / Sec 3'}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {activeChips.map((chip) => (
                  <button
                    key={chip}
                    onClick={() => handleChipClick(chip)}
                    className="px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-blue-400/50 text-[11px] text-zinc-300 hover:text-white transition-all active:scale-95 text-left"
                  >
                    + {chip}
                  </button>
                ))}
              </div>
            </div>

            {/* Simulated Agent Co-Generation Stream */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-2.5">
                <div className="size-6 rounded-full bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0 mt-0.5">
                  <Bot className="size-3.5" />
                </div>
                <div className="space-y-1 text-xs bg-white/[0.04] border border-white/[0.06] p-3 rounded-2xl rounded-tl-sm text-zinc-300 leading-relaxed">
                  <div className="font-semibold text-white text-[11px] flex items-center gap-1.5">
                    <span>Show3D Spatial Agent</span>
                    <span className="text-[10px] font-mono text-purple-400 font-normal">synthesized</span>
                  </div>
                  <p>
                    I have generated the pavilion mesh with a double-curved tensile membrane to channel rising warm air outwards, and aligned the modular timber benches for ergonomic peer study.
                  </p>
                </div>
              </div>

              {eduState.isGenerating && (
                <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center gap-3 animate-pulse">
                  <RefreshCw className="size-4 text-purple-400 animate-spin" />
                  <div className="text-xs text-purple-300">
                    Synthesizing spatial geometry ({eduState.generationProgress}%)...
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Prompt Input Area (Spline Design) */}
          <form 
            onSubmit={handleSendPrompt}
            className="p-3 border-t border-white/[0.08] bg-[#12141c]/60"
          >
            <div className="relative rounded-xl bg-[#181a24] border border-white/[0.1] focus-within:border-blue-500 transition-colors p-2 space-y-2 shadow-inner">
              <textarea
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="Describe your design adjustments or type / for commands..."
                rows={2}
                className="w-full bg-transparent text-xs text-white placeholder-zinc-500 resize-none focus:outline-none"
              />

              <div className="flex items-center justify-between pt-1 border-t border-white/[0.06]">
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-400">
                  <span className="size-1.5 rounded-full bg-blue-400" />
                  <span>Gemini Spatial · High</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      onUpdateEduState({
                        fallbackActive: true,
                        modelGenerated: true,
                        isGenerating: false,
                        generationProgress: 100
                      });
                    }}
                    className="px-2 py-1 rounded bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-mono transition-colors"
                    title="Bypass API or network lag: Load guaranteed procedural geometric pavilion"
                  >
                    <span>Instant Fallback</span>
                  </button>

                  <button
                    type="submit"
                    disabled={eduState.isGenerating || !customPrompt.trim()}
                    className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white font-medium text-xs flex items-center gap-1.5 transition-all active:scale-95"
                  >
                    <span>Synthesize</span>
                    <Send className="size-3" />
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* TAB 2: OBJECTS (Scene Tree & Hierarchy) */}
      {activeTab === 'objects' && (
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          <div className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-zinc-500">
            Scene Hierarchy
          </div>

          {/* Root Scene Group */}
          <div className="space-y-0.5">
            <button
              onClick={() => setSceneGroupOpen(!sceneGroupOpen)}
              className="w-full flex items-center justify-between px-2 py-1.5 rounded-lg hover:bg-white/[0.04] text-xs text-zinc-300 font-medium group"
            >
              <div className="flex items-center gap-1.5">
                {sceneGroupOpen ? (
                  <ChevronDown className="size-3.5 text-zinc-500" />
                ) : (
                  <ChevronRight className="size-3.5 text-zinc-500" />
                )}
                <Box className="size-3.5 text-blue-400" />
                <span>Courtyard Pavilion</span>
              </div>
              <span className="text-[10px] font-mono text-zinc-500">Group</span>
            </button>

            {sceneGroupOpen && (
              <div className="pl-5 space-y-0.5 border-l border-white/[0.06] ml-3.5">
                {/* Object: Tensile Canopy */}
                <div
                  onClick={() => onSelectObject('canopy')}
                  className={`w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-xs cursor-pointer transition-colors ${
                    selectedObjectId === 'canopy'
                      ? 'bg-blue-600/30 text-white border border-blue-500/40'
                      : 'hover:bg-white/[0.04] text-zinc-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-blue-400" />
                    <span>Tensile Fabric Canopy</span>
                  </div>
                  <Eye className="size-3 text-zinc-500 hover:text-white" />
                </div>

                {/* Object: Solar Array */}
                <div
                  onClick={() => onSelectObject('solar')}
                  className={`w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-xs cursor-pointer transition-colors ${
                    selectedObjectId === 'solar'
                      ? 'bg-blue-600/30 text-white border border-blue-500/40'
                      : 'hover:bg-white/[0.04] text-zinc-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-amber-400" />
                    <span>450W Solar Array</span>
                  </div>
                  <Eye className="size-3 text-zinc-500 hover:text-white" />
                </div>

                {/* Object: Modular Benches */}
                <div
                  onClick={() => onSelectObject('benches')}
                  className={`w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-xs cursor-pointer transition-colors ${
                    selectedObjectId === 'benches'
                      ? 'bg-blue-600/30 text-white border border-blue-500/40'
                      : 'hover:bg-white/[0.04] text-zinc-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-emerald-400" />
                    <span>Modular Timber Benches</span>
                  </div>
                  <Eye className="size-3 text-zinc-500 hover:text-white" />
                </div>

                {/* Object: Support Columns */}
                <div
                  onClick={() => onSelectObject('columns')}
                  className={`w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-xs cursor-pointer transition-colors ${
                    selectedObjectId === 'columns'
                      ? 'bg-blue-600/30 text-white border border-blue-500/40'
                      : 'hover:bg-white/[0.04] text-zinc-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-zinc-400" />
                    <span>Steel Support Columns</span>
                  </div>
                  <Eye className="size-3 text-zinc-500 hover:text-white" />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </aside>
  );
};
