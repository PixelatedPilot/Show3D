import React from 'react';
import {
  X,
  ShieldCheck,
  Lock,
  UserCheck,
  EyeOff,
  Laptop,
  CheckCircle2,
} from 'lucide-react';

interface StudentSafetyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StudentSafetyModal: React.FC<StudentSafetyModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl font-sans select-none text-[#F5F5F7]">
      <div
        className="relative w-full max-w-2xl rounded-3xl border border-white/[0.1] bg-[#1C1C1E] shadow-2xl p-6 sm:p-7 space-y-5 max-h-[90vh] overflow-y-auto"
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#30D158]/15 border border-[#30D158]/30 text-[10px] font-mono text-[#30D158] font-semibold">
            <ShieldCheck className="size-3.5" />
            <span>SINGAPORE PDPA &amp; MOE PLD GOVERNANCE STANDARD</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-display font-semibold text-[#F5F5F7] tracking-tight">
            Student Data Protection &amp; Safety Architecture
          </h2>

          <p className="text-xs sm:text-sm text-[#86868B] leading-relaxed">
            Engineered specifically for Singapore secondary school environments.
            Show3D complies with strict student privacy guidelines, ensuring a
            safe, supervised, and distraction-free spatial learning experience.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
          <div className="p-4 rounded-2xl bg-[#000000]/70 border border-white/[0.08] space-y-1.5">
            <div className="flex items-center gap-2 text-[#F5F5F7] font-semibold">
              <UserCheck className="size-4 text-[#30D158]" />
              <span>Age 13+ &amp; School-Managed SSO</span>
            </div>
            <p className="text-xs text-[#86868B] leading-relaxed">
              Designed for Secondary 1 to 4 students. Class cohorts onboard via
              ephemeral school session codes without requiring personal email
              addresses, phone numbers, or social logins.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#000000]/70 border border-white/[0.08] space-y-1.5">
            <div className="flex items-center gap-2 text-[#F5F5F7] font-semibold">
              <EyeOff className="size-4 text-[#0A84FF]" />
              <span>Zero AI Training on Student Data</span>
            </div>
            <p className="text-xs text-[#86868B] leading-relaxed">
              Student text prompts, spatial sketches, and 3D geometries are
              strictly quarantined. Zero student inputs are ever used to train
              or fine-tune external foundation models.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#000000]/70 border border-white/[0.08] space-y-1.5">
            <div className="flex items-center gap-2 text-[#F5F5F7] font-semibold">
              <Lock className="size-4 text-[#FFD60A]" />
              <span>Automated Safe-Prompt Filtering</span>
            </div>
            <p className="text-xs text-[#86868B] leading-relaxed">
              Built-in content moderation filters proactively intercept
              non-educational or inappropriate prompt tokens, guiding students
              back to D&amp;T architectural vocabulary.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#000000]/70 border border-white/[0.08] space-y-1.5">
            <div className="flex items-center gap-2 text-[#F5F5F7] font-semibold">
              <Laptop className="size-4 text-[#64D2FF]" />
              <span>MOE PLD Tested (Port 443 Safe)</span>
            </div>
            <p className="text-xs text-[#86868B] leading-relaxed">
              Verified on MOE Personal Learning Device (PLD) standard
              images—Chromebooks, iPads, and Windows laptops. Operates solely
              over standard HTTPS (Port 443).
            </p>
          </div>
        </div>

        {/* Technical Specification Summary Table */}
        <div className="space-y-2">
          <div className="text-[11px] font-mono text-[#86868B] uppercase tracking-wider">
            Technical Governance Checklist:
          </div>
          <div className="rounded-2xl border border-white/[0.08] bg-[#000000]/70 overflow-hidden text-xs">
            <div className="divide-y divide-white/[0.06]">
              <div className="p-3.5 flex items-center justify-between">
                <span className="text-[#F5F5F7]/90">
                  Singapore PDPA Compliance
                </span>
                <span className="text-[#30D158] font-mono flex items-center gap-1.5 text-xs font-semibold">
                  <CheckCircle2 className="size-3.5" /> Fully Compliant
                </span>
              </div>
              <div className="p-3.5 flex items-center justify-between">
                <span className="text-[#F5F5F7]/90">
                  Classroom Credit Quota
                </span>
                <span className="text-[#F5F5F7] font-mono text-xs">
                  5,000 Pooled Class Credits (Zero Mid-Lesson Lockouts)
                </span>
              </div>
              <div className="p-3.5 flex items-center justify-between">
                <span className="text-[#F5F5F7]/90">
                  Facilitator Live Telemetry
                </span>
                <span className="text-[#F5F5F7] font-mono text-xs">
                  Real-Time Student Assistance Flags
                </span>
              </div>
              <div className="p-3.5 flex items-center justify-between">
                <span className="text-[#F5F5F7]/90">Offline Resilience</span>
                <span className="text-[#64D2FF] font-mono text-xs">
                  Instant Procedural Three.js Fallback
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 flex items-center justify-between border-t border-white/[0.08]">
          <span className="text-xs text-[#86868B] font-mono">
            Show3D Singapore School Security Standards v2.4
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
