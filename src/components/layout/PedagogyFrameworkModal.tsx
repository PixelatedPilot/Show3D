import React, { useState } from 'react';
import { X, GraduationCap, ShieldCheck } from 'lucide-react';
import { MACRO_CURRICULUM_PHASES, MICRO_LESSON_FLOW } from '../../store/appStore';

interface PedagogyFrameworkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PedagogyFrameworkModal: React.FC<PedagogyFrameworkModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'macro' | 'micro' | 'fourLearns'>('macro');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in font-sans select-none text-[#e5e2e3]">
      <div 
        className="relative w-full max-w-3xl rounded-lg border border-[#232426] bg-[#0d0e0f] shadow-2xl p-6 sm:p-7 space-y-5 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Shimmer Line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 size-7 rounded bg-[#151617] hover:bg-[#232426] border border-[#232426] flex items-center justify-center text-[#9A9DA3] hover:text-white transition-colors"
        >
          <X className="size-4" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1.5 pr-8">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-[#5E6BFF]/10 border border-[#5E6BFF]/20 text-[10px] font-mono text-[#5E6BFF]">
            <GraduationCap className="size-3" />
            <span>MOE D&T CONSTRUCTIONIST PEDAGOGY FRAMEWORK</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Show3D Pedagogical Architecture & Programme Workflow
          </h2>

          <p className="text-xs text-[#9A9DA3] leading-relaxed">
            Grounding spatial generative AI in Seymour Papert’s <em>Constructionism</em> and Singapore MOE’s <em>Design Thinking</em> syllabus. Designed to stimulate genuine human creative intent while actively preventing cognitive offloading.
          </p>
        </div>

        {/* Romer Segmented Tab Switcher */}
        <div className="flex items-center gap-1 p-1 rounded bg-[#070708] border border-[#232426] text-xs font-medium">
          <button
            onClick={() => setActiveTab('macro')}
            className={`flex-1 py-1.5 rounded transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'macro'
                ? 'bg-[#191A1C] border border-[#232426] text-white shadow-xs'
                : 'text-[#9A9DA3] hover:text-[#e5e2e3]'
            }`}
          >
            <span>5-Phase Macro Pathway</span>
          </button>
          <button
            onClick={() => setActiveTab('micro')}
            className={`flex-1 py-1.5 rounded transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'micro'
                ? 'bg-[#191A1C] border border-[#232426] text-white shadow-xs'
                : 'text-[#9A9DA3] hover:text-[#e5e2e3]'
            }`}
          >
            <span>75-Min Lesson Flow</span>
          </button>
          <button
            onClick={() => setActiveTab('fourLearns')}
            className={`flex-1 py-1.5 rounded transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'fourLearns'
                ? 'bg-[#191A1C] border border-[#232426] text-white shadow-xs'
                : 'text-[#9A9DA3] hover:text-[#e5e2e3]'
            }`}
          >
            <span>MOE "Four Learns" & Ethics</span>
          </button>
        </div>

        {/* TAB 1: 5-PHASE MACRO PATHWAY */}
        {activeTab === 'macro' && (
          <div className="space-y-2.5">
            <div className="text-[10px] font-mono text-[#9A9DA3] uppercase tracking-wider">
              10-Hour / 10-Week Progressive Curriculum Journey:
            </div>
            <div className="space-y-2">
              {MACRO_CURRICULUM_PHASES.map((p) => (
                <div key={p.phase} className="p-3.5 rounded-lg bg-[#101112] border border-[#232426] space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="size-5 rounded bg-[#151617] text-[#50d8e9] font-mono text-[10px] font-bold flex items-center justify-center border border-[#232426]">
                        {p.phase}
                      </span>
                      <span className="font-semibold text-white">{p.title}</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#070708] text-[#9A9DA3] border border-[#232426]">
                      {p.duration}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#9A9DA3] pl-7 leading-relaxed">
                    {p.focus}
                  </p>
                  <div className="pl-7 pt-1.5 flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono text-[#9A9DA3]/70 border-t border-[#1B1C1E]">
                    <span className="text-[#5E6BFF]">Activity: {p.constructionistActivity}</span>
                    <span className="text-[#50d8e9]">Deliverable: {p.deliverable}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: 75-MIN LESSON FLOW */}
        {activeTab === 'micro' && (
          <div className="space-y-2.5">
            <div className="text-[10px] font-mono text-[#9A9DA3] uppercase tracking-wider">
              The 75-Minute "Design-Synthesize-Critique" Session Architecture:
            </div>
            <div className="space-y-2">
              {MICRO_LESSON_FLOW.map((s) => (
                <div key={s.step} className="p-3.5 rounded-lg bg-[#101112] border border-[#232426] space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-[#070708] text-[#50d8e9] font-mono text-[10px] border border-[#232426]">
                        {s.timeRange}
                      </span>
                      <span>{s.step}. {s.name}</span>
                    </span>
                    <span className="text-[10px] font-mono text-[#9A9DA3]">
                      Goal: {s.cognitiveGoal}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-[11px]">
                    <div className="p-2 rounded bg-[#070708] border border-[#1b1c1e]">
                      <span className="text-[10px] text-[#50d8e9] font-mono block">Show3D Platform</span>
                      <span className="text-[#9A9DA3]">{s.roleVendor}</span>
                    </div>
                    <div className="p-2 rounded bg-[#070708] border border-[#1b1c1e]">
                      <span className="text-[10px] text-[#5E6BFF] font-mono block">Teacher Facilitation</span>
                      <span className="text-[#9A9DA3]">{s.roleTeacher}</span>
                    </div>
                    <div className="p-2 rounded bg-[#070708] border border-[#1b1c1e]">
                      <span className="text-[10px] text-[#bec2ff] font-mono block">Student Activity</span>
                      <span className="text-[#9A9DA3]">{s.roleStudent}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: MOE FOUR LEARNS & ANTI-COGNITIVE OFFLOADING */}
        {activeTab === 'fourLearns' && (
          <div className="space-y-3">
            <div className="p-4 rounded-lg bg-[#101112] border border-[#232426] space-y-2 text-xs relative">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white flex items-center gap-1.5">
                  <ShieldCheck className="size-4 text-[#50d8e9]" />
                  <span>Guarding Against Cognitive Offloading (MOE "Learn Beyond AI")</span>
                </span>
                <span className="text-[10px] font-mono text-[#50d8e9] bg-[#50d8e9]/10 border border-[#50d8e9]/20 px-2 py-0.5 rounded">
                  Critical MOE Pillar
                </span>
              </div>
              <p className="text-[11px] text-[#9A9DA3] leading-relaxed">
                When students rely solely on generative AI to produce answers, independent creative reasoning atrophies. Show3D mandates the <strong className="text-[#e5e2e3]">Creator Ownership Scorecard</strong>: before an asset can be certified, students must document the human rationale behind the problem need, prompt recipes, materials, and peer revisions.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              <div className="p-3.5 rounded-lg bg-[#101112] border border-[#232426] space-y-1">
                <div className="font-semibold text-white">01. Learn About AI</div>
                <p className="text-[11px] text-[#9A9DA3] leading-relaxed">
                  Demystifies tokens, polygon vertices, and computational limits so students view AI as mathematics, not magic.
                </p>
              </div>
              <div className="p-3.5 rounded-lg bg-[#101112] border border-[#232426] space-y-1">
                <div className="font-semibold text-white">02. Learn to Use AI</div>
                <p className="text-[11px] text-[#9A9DA3] leading-relaxed">
                  Employs the PARTS prompt scaffold (Persona, Aim, Recipients, Theme, Structure) to avoid haphazard prompt guessing.
                </p>
              </div>
              <div className="p-3.5 rounded-lg bg-[#101112] border border-[#232426] space-y-1">
                <div className="font-semibold text-white">03. Learn With AI</div>
                <p className="text-[11px] text-[#9A9DA3] leading-relaxed">
                  Treats spatial AI as a collaborative design co-pilot, iteratively testing 60° ergonomics and 450W solar harvest.
                </p>
              </div>
              <div className="p-3.5 rounded-lg bg-[#101112] border border-[#232426] space-y-1">
                <div className="font-semibold text-white">04. Learn Beyond AI</div>
                <p className="text-[11px] text-[#9A9DA3] leading-relaxed">
                  Nurtures 21st Century Competencies (21CC), ethical judgment, creative tenacity, and human intentionality.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="pt-2 flex items-center justify-between border-t border-[#232426]">
          <span className="text-[11px] text-[#9A9DA3] font-mono">
            Show3D Pedagogical Whitepaper · MOE Masterplan 2030 Alignment
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-[#151617] hover:bg-[#232426] text-[#9A9DA3] hover:text-white font-medium text-xs border border-[#232426] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
