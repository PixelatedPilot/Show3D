import React from 'react';
import { X, Award, CheckCircle2, Download, Printer, Share2, Sparkles } from 'lucide-react';
import { EduState } from '../../types';

interface ShowcaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  eduState: EduState;
}

export const ShowcaseModal: React.FC<ShowcaseModalProps> = ({ isOpen, onClose, eduState }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md select-none animate-fadeIn">
      <div className="glass-panel w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl border border-white/15 flex flex-col max-h-[90vh] bg-zinc-950/95">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-zinc-900/70">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/25 shrink-0">
              <Award className="size-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white tracking-tight">
                  Student Project Showcase & Certification
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  Verified MOE Pilot
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                Official Digital Certificate · Singapore EdTech Masterplan 2030
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

        {/* Certificate Card Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {/* Official Certificate Visual Frame */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-zinc-900/90 to-zinc-950/90 border-2 border-emerald-500/30 relative overflow-hidden shadow-2xl space-y-4 text-center">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Award className="size-36 text-emerald-400" />
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-widest font-bold text-emerald-400">
                Ministry of Education · AI Literacy Pilot
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-white mt-1">
                Certificate of Spatial AI Competency
              </h2>
              <p className="text-xs text-zinc-400 mt-0.5">
                Awarded for completion of the 10-Hour Show3D AI Creator Programme
              </p>
            </div>

            <div className="py-2 border-y border-white/10 max-w-md mx-auto">
              <div className="text-sm font-bold text-white">Student: Ethan Tan (Class 3-Faith)</div>
              <div className="text-xs text-zinc-400 mt-0.5">Tampines Secondary School · Design & Technology</div>
            </div>

            {/* Project Artifact Highlights */}
            <div className="text-left bg-zinc-900/60 p-4 rounded-xl border border-white/5 space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold text-zinc-200">
                <span>Submitted Project: Courtyard Shaded Study Pod</span>
                <span className="text-emerald-400">Grade: 96/100 (Distinction)</span>
              </div>

              <div className="space-y-1.5 text-xs text-zinc-300">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="size-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Form Generation:</strong> Applied PARTS prompting to synthesize tensile canopy geometry.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="size-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Human Refinement:</strong> Integrated 450W solar array & tuned UV fabric acoustics.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="size-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Ethics Debrief:</strong> Formulated reasoned ethical reflection on human intentionality.</span>
                </div>
              </div>

              {/* Reflection Excerpt */}
              <div className="pt-2 border-t border-white/5 text-[11px] text-zinc-400 italic">
                "{eduState.reflectionQuestion2.substring(0, 140)}..."
              </div>
            </div>

            {/* Validation Stamp */}
            <div className="flex items-center justify-between text-[10px] text-zinc-500 pt-1 font-mono">
              <span>CERT-ID: MOE-SGP-3D-2026-0842</span>
              <span>ISSUED: OCTOBER 2026</span>
              <span>VERIFIED BY SHOW3D</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-zinc-900/80 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => alert("Downloading official portfolio card...")}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-all flex items-center gap-1.5 shadow-md shadow-emerald-600/20"
            >
              <Download className="size-3.5" />
              <span>Download Portfolio Card</span>
            </button>
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 rounded-lg bg-zinc-800 text-zinc-300 hover:text-white transition-colors flex items-center gap-1.5 border border-white/5"
            >
              <Printer className="size-3.5" />
              <span>Print</span>
            </button>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white font-medium transition-all"
          >
            Close Showcase
          </button>
        </div>
      </div>
    </div>
  );
};
