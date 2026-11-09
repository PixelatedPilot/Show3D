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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in font-sans select-none text-[#E3E3E3]">
      <div 
        className="relative w-full max-w-3xl rounded-3xl border border-white/[0.08] bg-[#1E1F22] shadow-2xl p-6 sm:p-7 space-y-5 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 size-8 rounded-full bg-[#282A2E] hover:bg-[#33363B] border border-white/[0.08] flex items-center justify-center text-[#9AA0A6] hover:text-white transition-colors"
        >
          <X className="size-4" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2 pr-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2B2210] border border-[#FDD663]/25 text-[10px] font-mono text-[#FDD663]">
            <GraduationCap className="size-3" />
            <span>MOE D&T CONSTRUCTIONIST PEDAGOGY FRAMEWORK</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-display font-medium text-white tracking-tight">
            Show3D Pedagogical Architecture & Programme Workflow
          </h2>

          <p className="text-xs text-[#C4C7C5] leading-relaxed">
            Grounding spatial generative AI in Seymour Papert’s <em>Constructionism</em> and Singapore MOE’s <em>Design Thinking</em> syllabus. Designed to stimulate genuine human creative intent while actively preventing cognitive offloading.
          </p>
        </div>

        {/* Google Labs Pill Tab Switcher */}
        <div className="flex items-center gap-1 p-1 rounded-full bg-[#131314] border border-white/[0.08] text-xs font-medium">
          <button
            onClick={() => setActiveTab('macro')}
            className={`flex-1 py-2 rounded-full transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'macro'
                ? 'bg-[#282A2E] border border-white/[0.12] text-white font-semibold'
                : 'text-[#9AA0A6] hover:text-[#E3E3E3]'
            }`}
          >
            <span>5-Phase Macro Pathway</span>
          </button>
          <button
            onClick={() => setActiveTab('micro')}
            className={`flex-1 py-2 rounded-full transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'micro'
                ? 'bg-[#282A2E] border border-white/[0.12] text-white font-semibold'
                : 'text-[#9AA0A6] hover:text-[#E3E3E3]'
            }`}
          >
            <span>75-Min Lesson Flow</span>
          </button>
          <button
            onClick={() => setActiveTab('fourLearns')}
            className={`flex-1 py-2 rounded-full transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'fourLearns'
                ? 'bg-[#282A2E] border border-white/[0.12] text-white font-semibold'
                : 'text-[#9AA0A6] hover:text-[#E3E3E3]'
            }`}
          >
            <span>MOE "Four Learns" & Ethics</span>
          </button>
        </div>

        {/* TAB 1: 5-PHASE MACRO PATHWAY */}
        {activeTab === 'macro' && (
          <div className="space-y-2.5">
            <div className="text-[10px] font-mono text-[#9AA0A6] uppercase tracking-wider">
              10-Hour / 10-Week Progressive Curriculum Journey:
            </div>
            <div className="space-y-2.5">
              {MACRO_CURRICULUM_PHASES.map((p) => (
                <div key={p.phase} className="p-4 rounded-2xl bg-[#131314] border border-white/[0.07] space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="size-6 rounded-full bg-[#162238] text-[#A8C7FA] font-mono text-[10px] font-bold flex items-center justify-center border border-[#A8C7FA]/25">
                        {p.phase}
                      </span>
                      <span className="font-semibold text-white">{p.title}</span>
                    </div>
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#1E1F22] text-[#9AA0A6] border border-white/[0.08]">
                      {p.duration}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#C4C7C5] pl-8 leading-relaxed">
                    {p.focus}
                  </p>
                  <div className="pl-8 pt-2 flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono text-[#9AA0A6] border-t border-white/[0.06]">
                    <span className="text-[#A8C7FA]">Activity: {p.constructionistActivity}</span>
                    <span className="text-[#6DD58C]">Deliverable: {p.deliverable}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: 75-MIN LESSON FLOW */}
        {activeTab === 'micro' && (
          <div className="space-y-2.5">
            <div className="text-[10px] font-mono text-[#9AA0A6] uppercase tracking-wider">
              The 75-Minute "Design-Synthesize-Critique" Session Architecture:
            </div>
            <div className="space-y-2.5">
              {MICRO_LESSON_FLOW.map((s) => (
                <div key={s.step} className="p-4 rounded-2xl bg-[#131314] border border-white/[0.07] space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#162238] text-[#A8C7FA] font-mono text-[10px] border border-[#A8C7FA]/25">
                        {s.timeRange}
                      </span>
                      <span>{s.step}. {s.name}</span>
                    </span>
                    <span className="text-[10px] font-mono text-[#9AA0A6]">
                      Goal: {s.cognitiveGoal}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-[11px]">
                    <div className="p-2.5 rounded-xl bg-[#1E1F22] border border-white/[0.06]">
                      <span className="text-[10px] text-[#6DD58C] font-mono block">Show3D Platform</span>
                      <span className="text-[#C4C7C5]">{s.roleVendor}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#1E1F22] border border-white/[0.06]">
                      <span className="text-[10px] text-[#A8C7FA] font-mono block">Teacher Facilitation</span>
                      <span className="text-[#C4C7C5]">{s.roleTeacher}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#1E1F22] border border-white/[0.06]">
                      <span className="text-[10px] text-[#FDD663] font-mono block">Student Activity</span>
                      <span className="text-[#C4C7C5]">{s.roleStudent}</span>
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
            <div className="p-4 rounded-2xl bg-[#131314] border border-white/[0.07] space-y-2 text-xs relative">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white flex items-center gap-1.5">
                  <ShieldCheck className="size-4 text-[#6DD58C]" />
                  <span>Guarding Against Cognitive Offloading (MOE "Learn Beyond AI")</span>
                </span>
                <span className="text-[10px] font-mono text-[#6DD58C] bg-[#13281C] border border-[#6DD58C]/25 px-2.5 py-0.5 rounded-full">
                  Critical MOE Pillar
                </span>
              </div>
              <p className="text-[11px] text-[#C4C7C5] leading-relaxed">
                When students rely solely on generative AI to produce answers, independent creative reasoning atrophies. Show3D mandates the <strong className="text-[#E3E3E3]">Creator Ownership Scorecard</strong>: before an asset can be certified, students must document the human rationale behind the problem need, prompt recipes, materials, and peer revisions.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-4 rounded-2xl bg-[#131314] border border-white/[0.07] space-y-1">
                <div className="font-semibold text-white">01. Learn About AI</div>
                <p className="text-[11px] text-[#9AA0A6] leading-relaxed">
                  Demystifies tokens, polygon vertices, and computational limits so students view AI as mathematics, not magic.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-[#131314] border border-white/[0.07] space-y-1">
                <div className="font-semibold text-white">02. Learn to Use AI</div>
                <p className="text-[11px] text-[#9AA0A6] leading-relaxed">
                  Employs the PARTS prompt scaffold (Persona, Aim, Recipients, Theme, Structure) to avoid haphazard prompt guessing.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-[#131314] border border-white/[0.07] space-y-1">
                <div className="font-semibold text-white">03. Learn With AI</div>
                <p className="text-[11px] text-[#9AA0A6] leading-relaxed">
                  Treats spatial AI as a collaborative design co-pilot, iteratively testing 60° ergonomics and 450W solar harvest.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-[#131314] border border-white/[0.07] space-y-1">
                <div className="font-semibold text-white">04. Learn Beyond AI</div>
                <p className="text-[11px] text-[#9AA0A6] leading-relaxed">
                  Nurtures 21st Century Competencies (21CC), ethical judgment, creative tenacity, and human intentionality.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="pt-3 flex items-center justify-between border-t border-white/[0.08]">
          <span className="text-[11px] text-[#9AA0A6] font-mono">
            Show3D Pedagogical Whitepaper · MOE Masterplan 2030 Alignment
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-[#282A2E] hover:bg-[#33363B] text-[#E3E3E3] font-medium text-xs border border-white/[0.08] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
