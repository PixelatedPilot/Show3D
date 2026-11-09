import React from 'react';
import { X, ShieldCheck, Lock, UserCheck, EyeOff, Laptop, CheckCircle2 } from 'lucide-react';
import { STUDENT_SAFETY_SPEC } from '../../store/appStore';

interface StudentSafetyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StudentSafetyModal: React.FC<StudentSafetyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in font-sans select-none text-[#e5e2e3]">
      <div 
        className="relative w-full max-w-2xl rounded-lg border border-[#232426] bg-[#0d0e0f] shadow-2xl p-6 sm:p-7 space-y-5 max-h-[90vh] overflow-y-auto"
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
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-[#50d8e9]/10 border border-[#50d8e9]/20 text-[10px] font-mono text-[#50d8e9]">
            <ShieldCheck className="size-3" />
            <span>SINGAPORE PDPA & MOE PLD GOVERNANCE STANDARD</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Student Data Protection & Safety Architecture
          </h2>

          <p className="text-xs text-[#9A9DA3] leading-relaxed">
            Engineered specifically for Singapore secondary school environments. Show3D complies with strict student privacy guidelines, ensuring a safe, supervised, and distraction-free spatial learning experience.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
          <div className="p-3.5 rounded-lg bg-[#101112] border border-[#232426] space-y-1.5">
            <div className="flex items-center gap-2 text-white font-medium">
              <UserCheck className="size-4 text-[#50d8e9]" />
              <span>Age 13+ & School-Managed SSO</span>
            </div>
            <p className="text-[11px] text-[#9A9DA3] leading-relaxed">
              Designed for Secondary 1 to 4 students. Class cohorts onboard via school-managed accounts without requiring personal student email addresses or social logins.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-[#101112] border border-[#232426] space-y-1.5">
            <div className="flex items-center gap-2 text-white font-medium">
              <EyeOff className="size-4 text-[#5E6BFF]" />
              <span>Zero AI Model Training on Student Data</span>
            </div>
            <p className="text-[11px] text-[#9A9DA3] leading-relaxed">
              Student text prompts, spatial sketches, and 3D geometries are strictly quarantined. No student-generated inputs are ever used to train or fine-tune public foundation models.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-[#101112] border border-[#232426] space-y-1.5">
            <div className="flex items-center gap-2 text-white font-medium">
              <Lock className="size-4 text-[#bec2ff]" />
              <span>Automated Safe-Prompt Filtering</span>
            </div>
            <p className="text-[11px] text-[#9A9DA3] leading-relaxed">
              Built-in content moderation filters proactively detect and intercept non-educational, sensitive, or inappropriate prompt tokens, guiding students back to D&T architectural keywords.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-[#101112] border border-[#232426] space-y-1.5">
            <div className="flex items-center gap-2 text-white font-medium">
              <Laptop className="size-4 text-[#ffb689]" />
              <span>MOE PLD Tested (Port 443 Safe)</span>
            </div>
            <p className="text-[11px] text-[#9A9DA3] leading-relaxed">
              Verified on MOE Personal Learning Device (PLD) standard images—Chromebooks, iPads, and Windows laptops. Operates solely over standard HTTPS (Port 443) without triggering school firewall blocks.
            </p>
          </div>
        </div>

        {/* Technical Specification Summary Table */}
        <div className="space-y-1.5">
          <div className="text-[10px] font-mono text-[#9A9DA3] uppercase tracking-wider">
            Technical Governance Checklist:
          </div>
          <div className="rounded-lg border border-[#232426] bg-[#101112] overflow-hidden text-xs">
            <div className="divide-y divide-[#1B1C1E]">
              <div className="p-2.5 flex items-center justify-between">
                <span className="text-[#9A9DA3]">Singapore PDPA Compliance</span>
                <span className="text-[#50d8e9] font-mono flex items-center gap-1 text-[11px] font-medium">
                  <CheckCircle2 className="size-3" /> Fully Compliant
                </span>
              </div>
              <div className="p-2.5 flex items-center justify-between">
                <span className="text-[#9A9DA3]">Classroom Credit Quota</span>
                <span className="text-[#e5e2e3] font-mono text-[11px]">5,000 Pooled Class Credits (No Mid-Lesson Cutoffs)</span>
              </div>
              <div className="p-2.5 flex items-center justify-between">
                <span className="text-[#9A9DA3]">Teacher Roster Telemetry</span>
                <span className="text-[#e5e2e3] font-mono text-[11px]">Real-time Student Assistance Flags</span>
              </div>
              <div className="p-2.5 flex items-center justify-between">
                <span className="text-[#9A9DA3]">Offline Resilience</span>
                <span className="text-[#50d8e9] font-mono text-[11px]">Instant Procedural Geometric Fallback</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 flex items-center justify-between border-t border-[#232426]">
          <span className="text-[11px] text-[#9A9DA3] font-mono">
            Show3D Singapore School Security Standards v2.4
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
