import React from 'react';
import { X, RefreshCw, ArrowRight, ShieldCheck, TrendingUp, Sparkles, School } from 'lucide-react';

interface SchoolLifecycleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SchoolLifecycleModal: React.FC<SchoolLifecycleModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const STAGES = [
    {
      step: '01',
      title: 'AWARENESS',
      action: 'Sees it',
      question: '"Is this relevant to us?"',
      show3dRole: 'Show3D Outreach + the case for AI literacy',
      details: 'Reached via IMDA Code for Fun briefings and national EdTech summits.'
    },
    {
      step: '02',
      title: 'CONSIDER',
      action: 'Weighs it',
      question: '"Will it work here?"',
      show3dRole: 'Show3D Overview + fit to MOE priorities',
      details: 'Evaluates curriculum fit (10-hr elective), 0-teacher prep workload, and PLD compatibility.'
    },
    {
      step: '03',
      title: 'ONBOARD',
      action: 'Sets up',
      question: '"Can my team run this?"',
      show3dRole: 'Show3D Teaching material + setup support',
      details: 'Vendor provides class credit setup, student accounts, and 1-hour teacher facilitator briefing.'
    },
    {
      step: '04',
      title: 'DELIVERY',
      action: 'Runs it',
      question: '"Are students engaged?"',
      show3dRole: 'Show3D Usage data + teacher check-ins',
      details: '6-week programme runs with weekly challenges. Real-time telemetry flags stuck students.'
    },
    {
      step: '05',
      title: 'SHOWCASE',
      action: 'Proves it',
      question: '"Did this deliver value?"',
      show3dRole: 'Show3D Post-survey + interviews',
      details: 'Students present final 3D school improvements. Post-pilot surveys measure confidence and skill gain.'
    },
    {
      step: '06',
      title: 'RENEWAL',
      action: 'Scales it',
      question: '"Should we scale this?"',
      show3dRole: 'Show3D Evidence pack for the next school',
      details: 'Principal approves multi-cohort renewal. Verified evidence pack is pitched to next 10 schools in cluster.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md select-none animate-fadeIn">
      <div className="glass-panel w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl border border-white/15 flex flex-col max-h-[90vh] bg-zinc-950/95">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-zinc-900/70">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/25 shrink-0">
              <School className="size-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white tracking-tight">
                  How a School Moves Through the Programme
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/15 text-purple-300 border border-purple-500/30">
                  Slide 17 & 27 GTM Playbook
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                The evidence-based growth loop: renewal from one school becomes the proof for the next.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="size-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Growth Logic Flywheel (Slide 17) */}
          <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/20">
            <div className="text-xs font-bold text-purple-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <TrendingUp className="size-4" />
              <span>Growth Logic Flywheel</span>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              {[
                { step: 'Pilot', sub: '1 Secondary Class' },
                { step: 'Evidence', sub: 'Survey & Rubrics' },
                { step: 'Improve', sub: 'Module Scaffolding' },
                { step: 'Sell to More Schools', sub: 'Cluster Expansion' },
                { step: 'Repeat', sub: '131 Schools (157k+)' },
              ].map((item, idx, arr) => (
                <React.Fragment key={item.step}>
                  <div className="flex-1 min-w-[120px] p-2.5 rounded-lg bg-zinc-900/80 border border-white/5 text-center">
                    <div className="font-bold text-white">{item.step}</div>
                    <div className="text-[10px] text-zinc-400 mt-0.5">{item.sub}</div>
                  </div>
                  {idx < arr.length - 1 && (
                    <ArrowRight className="size-4 text-purple-400 shrink-0 hidden sm:block" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* 6-Stage School Journey (Slide 27) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
              The 6-Stage Institutional Journey
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {STAGES.map((s) => (
                <div key={s.step} className="p-3.5 rounded-xl bg-zinc-900/60 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-purple-400 uppercase">
                      {s.step} · {s.action}
                    </span>
                    <span className="text-xs font-bold text-white">{s.title}</span>
                  </div>
                  <div className="text-xs font-semibold text-purple-300 italic">{s.question}</div>
                  <div className="text-[11px] text-zinc-300 font-medium">{s.show3dRole}</div>
                  <p className="text-[10px] text-zinc-400 pt-1.5 border-t border-white/5 leading-relaxed">
                    {s.details}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* National Scale Callout (Slide 15) */}
          <div className="p-4 rounded-xl bg-zinc-900/80 border border-white/10 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-white">Singapore National Market Potential</div>
              <div className="text-[11px] text-zinc-400 mt-0.5">
                MOE Education Statistics Digest 2025: 131 Secondary Schools · 157,000+ Students.
              </div>
            </div>
            <div className="flex items-center gap-4 text-right">
              <div>
                <div className="text-base font-bold text-purple-400 tabular-nums">131</div>
                <div className="text-[10px] text-zinc-400">Secondary Schools</div>
              </div>
              <div className="h-7 w-px bg-white/10" />
              <div>
                <div className="text-base font-bold text-emerald-400 tabular-nums">157k+</div>
                <div className="text-[10px] text-zinc-400">Total Students</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-zinc-900/80 flex items-center justify-between text-xs text-zinc-400">
          <span>Show3D Educational Go-To-Market Strategy</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white font-medium transition-all"
          >
            Close Flywheel
          </button>
        </div>
      </div>
    </div>
  );
};
