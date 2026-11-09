import React, { useState } from 'react';
import { X, GraduationCap, ShieldCheck } from 'lucide-react';
import {
  MACRO_CURRICULUM_PHASES,
  MICRO_LESSON_FLOW,
} from '../../store/appStore';

interface PedagogyFrameworkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PedagogyFrameworkModal: React.FC<PedagogyFrameworkModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'macro' | 'micro' | 'fourLearns'>(
    'macro'
  );

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl s3d-modal-backdrop font-sans select-none text-[#F5F5F7]"
      data-state="open"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl rounded-3xl border border-white/[0.1] bg-[#1C1C1E] shadow-2xl p-6 sm:p-7 space-y-5 max-h-[90vh] overflow-y-auto s3d-modal-sheet"
        data-state="open"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 size-8 rounded-full bg-[#2C2C2E] hover:bg-[#3A3A3C] border border-white/[0.08] flex items-center justify-center text-[#86868B] hover:text-white transition-colors cursor-pointer"
        >
          <X className="size-4" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2 pr-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFD60A]/15 border border-[#FFD60A]/30 text-[10px] font-mono text-[#FFD60A] font-semibold">
            <GraduationCap className="size-3.5" />
            <span>MOE D&amp;T CONSTRUCTIONIST PEDAGOGY FRAMEWORK</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-display font-semibold text-[#F5F5F7] tracking-tight">
            Show3D Pedagogical Architecture &amp; Programme Workflow
          </h2>

          <p className="text-xs sm:text-sm text-[#86868B] leading-relaxed">
            Grounding spatial generative AI in Seymour Papert&rsquo;s{' '}
            <em className="text-[#F5F5F7]">Constructionism</em> and Singapore
            MOE&rsquo;s <em className="text-[#F5F5F7]">Design Thinking</em>{' '}
            syllabus. Engineered to cultivate authentic human creative intent
            while actively preventing cognitive offloading.
          </p>
        </div>

        {/* Apple Segmented Tab Switcher */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-[#000000] border border-white/[0.08] text-xs font-medium">
          <button
            onClick={() => setActiveTab('macro')}
            className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'macro'
                ? 'bg-[#2C2C2E] border border-white/[0.1] text-[#F5F5F7] font-semibold'
                : 'text-[#86868B] hover:text-[#F5F5F7]'
            }`}
          >
            <span>5-Phase Macro Pathway</span>
          </button>
          <button
            onClick={() => setActiveTab('micro')}
            className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'micro'
                ? 'bg-[#2C2C2E] border border-white/[0.1] text-[#F5F5F7] font-semibold'
                : 'text-[#86868B] hover:text-[#F5F5F7]'
            }`}
          >
            <span>75-Min Lesson Flow</span>
          </button>
          <button
            onClick={() => setActiveTab('fourLearns')}
            className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'fourLearns'
                ? 'bg-[#2C2C2E] border border-white/[0.1] text-[#F5F5F7] font-semibold'
                : 'text-[#86868B] hover:text-[#F5F5F7]'
            }`}
          >
            <span>MOE &ldquo;Four Learns&rdquo; &amp; Ethics</span>
          </button>
        </div>

        {/* TAB 1: 5-PHASE MACRO PATHWAY */}
        {activeTab === 'macro' && (
          <div className="space-y-2.5">
            <div className="text-[11px] font-mono text-[#86868B] uppercase tracking-wider">
              10-Hour Progressive Curriculum Journey:
            </div>
            <div className="space-y-2.5">
              {MACRO_CURRICULUM_PHASES.map((p) => (
                <div
                  key={p.phase}
                  className="p-4 rounded-2xl bg-[#000000]/70 border border-white/[0.08] space-y-1.5 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="size-6 rounded-full bg-[#0A84FF]/15 text-[#0A84FF] font-mono text-[11px] font-bold flex items-center justify-center border border-[#0A84FF]/30">
                        {p.phase}
                      </span>
                      <span className="font-semibold text-[#F5F5F7]">
                        {p.title}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#2C2C2E] text-[#86868B]">
                      {p.duration}
                    </span>
                  </div>
                  <p className="text-xs text-[#86868B] pl-8 leading-relaxed">
                    {p.focus}
                  </p>
                  <div className="pl-8 pt-2 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono border-t border-white/[0.06]">
                    <span className="text-[#64D2FF]">
                      Activity: {p.constructionistActivity}
                    </span>
                    <span className="text-[#30D158]">
                      Deliverable: {p.deliverable}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: 75-MIN LESSON FLOW */}
        {activeTab === 'micro' && (
          <div className="space-y-2.5">
            <div className="text-[11px] font-mono text-[#86868B] uppercase tracking-wider">
              The 75-Minute &ldquo;Design-Synthesize-Critique&rdquo; Session
              Architecture:
            </div>
            <div className="space-y-2.5">
              {MICRO_LESSON_FLOW.map((s) => (
                <div
                  key={s.step}
                  className="p-4 rounded-2xl bg-[#000000]/70 border border-white/[0.08] space-y-2.5 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#F5F5F7] flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#0A84FF]/15 text-[#0A84FF] font-mono text-[10px] border border-[#0A84FF]/30">
                        {s.timeRange}
                      </span>
                      <span>
                        {s.step}. {s.name}
                      </span>
                    </span>
                    <span className="text-[11px] font-mono text-[#86868B]">
                      Goal: {s.cognitiveGoal}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 text-xs">
                    <div className="p-3 rounded-xl bg-[#1C1C1E] border border-white/[0.06]">
                      <span className="text-[10px] text-[#30D158] font-mono block mb-0.5">
                        Show3D Platform
                      </span>
                      <span className="text-[#F5F5F7]/85">{s.roleVendor}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#1C1C1E] border border-white/[0.06]">
                      <span className="text-[10px] text-[#0A84FF] font-mono block mb-0.5">
                        Teacher Facilitation
                      </span>
                      <span className="text-[#F5F5F7]/85">{s.roleTeacher}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#1C1C1E] border border-white/[0.06]">
                      <span className="text-[10px] text-[#FFD60A] font-mono block mb-0.5">
                        Student Activity
                      </span>
                      <span className="text-[#F5F5F7]/85">{s.roleStudent}</span>
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
            <div className="p-4 rounded-2xl bg-[#000000]/70 border border-white/[0.08] space-y-2 text-xs relative">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#F5F5F7] flex items-center gap-1.5">
                  <ShieldCheck className="size-4 text-[#30D158]" />
                  <span>
                    Guarding Against Cognitive Offloading (MOE &ldquo;Learn
                    Beyond AI&rdquo;)
                  </span>
                </span>
                <span className="text-[10px] font-mono text-[#30D158] bg-[#30D158]/15 border border-[#30D158]/30 px-2.5 py-0.5 rounded-full">
                  Critical MOE Pillar
                </span>
              </div>
              <p className="text-xs text-[#86868B] leading-relaxed">
                When students rely solely on generative AI to produce answers,
                independent creative reasoning atrophies. Show3D mandates the{' '}
                <strong className="text-[#F5F5F7]">
                  Creator Ownership Scorecard
                </strong>
                : before an asset can be certified, students must document the
                human rationale behind the problem need, PARTS prompt recipes,
                wall thickness, and peer revisions.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-4 rounded-2xl bg-[#000000]/70 border border-white/[0.08] space-y-1.5">
                <div className="font-semibold text-[#F5F5F7]">
                  01. Learn About AI
                </div>
                <p className="text-xs text-[#86868B] leading-relaxed">
                  Demystifies tokens, polygon vertices, and computational limits
                  so students view AI as mathematics, not magic.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-[#000000]/70 border border-white/[0.08] space-y-1.5">
                <div className="font-semibold text-[#F5F5F7]">
                  02. Learn to Use AI
                </div>
                <p className="text-xs text-[#86868B] leading-relaxed">
                  Employs the PARTS prompt scaffold (Persona, Aim, Recipients,
                  Theme, Structure) to replace vague prompt guessing.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-[#000000]/70 border border-white/[0.08] space-y-1.5">
                <div className="font-semibold text-[#F5F5F7]">
                  03. Learn With AI
                </div>
                <p className="text-xs text-[#86868B] leading-relaxed">
                  Treats spatial AI as a collaborative design co-pilot,
                  iteratively testing 60° ergonomics and 450W solar harvest.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-[#000000]/70 border border-white/[0.08] space-y-1.5">
                <div className="font-semibold text-[#F5F5F7]">
                  04. Learn Beyond AI
                </div>
                <p className="text-xs text-[#86868B] leading-relaxed">
                  Nurtures 21st Century Competencies (21CC), ethical judgment,
                  creative tenacity, and human intentionality.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="pt-3 flex items-center justify-between border-t border-white/[0.08]">
          <span className="text-xs text-[#86868B] font-mono">
            Show3D Pedagogical Whitepaper · MOE Masterplan 2030 Alignment
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-[#2C2C2E] hover:bg-[#3A3A3C] text-[#F5F5F7] font-medium text-xs border border-white/[0.08] transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
