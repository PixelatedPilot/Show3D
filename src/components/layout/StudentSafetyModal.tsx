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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in font-sans select-none text-[#E3E3E3]">
      <div 
        className="relative w-full max-w-2xl rounded-3xl border border-white/[0.08] bg-[#1E1F22] shadow-2xl p-6 sm:p-7 space-y-5 max-h-[90vh] overflow-y-auto"
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#13281C] border border-[#6DD58C]/25 text-[10px] font-mono text-[#6DD58C]">
            <ShieldCheck className="size-3" />
            <span>SINGAPORE PDPA & MOE PLD GOVERNANCE STANDARD</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-display font-medium text-white tracking-tight">
            Student Data Protection & Safety Architecture
          </h2>

          <p className="text-xs text-[#C4C7C5] leading-relaxed">
            Engineered specifically for Singapore secondary school environments. Show3D complies with strict student privacy guidelines, ensuring a safe, supervised, and distraction-free spatial learning experience.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-4 rounded-2xl bg-[#131314] border border-white/[0.07] space-y-1.5">
            <div className="flex items-center gap-2 text-white font-medium">
              <UserCheck className="size-4 text-[#6DD58C]" />
              <span>Age 13+ & School-Managed SSO</span>
            </div>
            <p className="text-[11px] text-[#9AA0A6] leading-relaxed">
              Designed for Secondary 1 to 4 students. Class cohorts onboard via school-managed accounts without requiring personal student email addresses or social logins.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#131314] border border-white/[0.07] space-y-1.5">
            <div className="flex items-center gap-2 text-white font-medium">
              <EyeOff className="size-4 text-[#A8C7FA]" />
              <span>Zero AI Model Training on Student Data</span>
            </div>
            <p className="text-[11px] text-[#9AA0A6] leading-relaxed">
              Student text prompts, spatial sketches, and 3D geometries are strictly quarantined. No student-generated inputs are ever used to train or fine-tune public foundation models.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#131314] border border-white/[0.07] space-y-1.5">
            <div className="flex items-center gap-2 text-white font-medium">
              <Lock className="size-4 text-[#FDD663]" />
              <span>Automated Safe-Prompt Filtering</span>
            </div>
            <p className="text-[11px] text-[#9AA0A6] leading-relaxed">
              Built-in content moderation filters proactively detect and intercept non-educational, sensitive, or inappropriate prompt tokens, guiding students back to D&T architectural keywords.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#131314] border border-white/[0.07] space-y-1.5">
            <div className="flex items-center gap-2 text-white font-medium">
              <Laptop className="size-4 text-[#FFB4AB]" />
              <span>MOE PLD Tested (Port 443 Safe)</span>
            </div>
            <p className="text-[11px] text-[#9AA0A6] leading-relaxed">
              Verified on MOE Personal Learning Device (PLD) standard images—Chromebooks, iPads, and Windows laptops. Operates solely over standard HTTPS (Port 443) without triggering school firewall blocks.
            </p>
          </div>
        </div>

        {/* Technical Specification Summary Table */}
        <div className="space-y-2">
          <div className="text-[10px] font-mono text-[#9AA0A6] uppercase tracking-wider">
            Technical Governance Checklist:
          </div>
          <div className="rounded-2xl border border-white/[0.07] bg-[#131314] overflow-hidden text-xs">
            <div className="divide-y divide-white/[0.06]">
              <div className="p-3 flex items-center justify-between">
                <span className="text-[#C4C7C5]">Singapore PDPA Compliance</span>
                <span className="text-[#6DD58C] font-mono flex items-center gap-1 text-[11px] font-medium">
                  <CheckCircle2 className="size-3" /> Fully Compliant
                </span>
              </div>
              <div className="p-3 flex items-center justify-between">
                <span className="text-[#C4C7C5]">Classroom Credit Quota</span>
                <span className="text-[#E3E3E3] font-mono text-[11px]">5,000 Pooled Class Credits (No Mid-Lesson Cutoffs)</span>
              </div>
              <div className="p-3 flex items-center justify-between">
                <span className="text-[#C4C7C5]">Teacher Roster Telemetry</span>
                <span className="text-[#E3E3E3] font-mono text-[11px]">Real-time Student Assistance Flags</span>
              </div>
              <div className="p-3 flex items-center justify-between">
                <span className="text-[#C4C7C5]">Offline Resilience</span>
                <span className="text-[#A8C7FA] font-mono text-[11px]">Instant Procedural Geometric Fallback</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 flex items-center justify-between border-t border-white/[0.08]">
          <span className="text-[11px] text-[#9AA0A6] font-mono">
            Show3D Singapore School Security Standards v2.4
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
