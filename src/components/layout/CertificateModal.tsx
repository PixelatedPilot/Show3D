import React from 'react';
import { X, Check, Download, Printer, ShieldCheck, Award } from 'lucide-react';
import { EduState } from '../../types';
import { generateVerifiedCertificate } from '../../utils/workflowState';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  eduState: EduState;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  eduState,
}) => {
  if (!isOpen) return null;

  const cert = generateVerifiedCertificate({
    studentName: 'Ethan Tan',
    school: 'Tampines Secondary School',
    classCohort: 'Class 3-Faith',
    moduleNumber: eduState.activeModuleId || 3,
    intentScore: eduState.authorshipScore || 94,
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl s3d-modal-backdrop select-none font-sans text-[#F5F5F7]"
      data-state="open"
    >
      <div
        className="w-full max-w-xl rounded-3xl overflow-hidden border border-white/[0.1] bg-[#1C1C1E] shadow-2xl flex flex-col relative s3d-modal-sheet"
        data-state="open"
      >
        {/* Apple Credential Header Bar */}
        <div className="px-6 py-4 border-b border-white/[0.08] flex items-center justify-between bg-[#000000]/60">
          <div className="flex items-center gap-2.5">
            <Award className="size-4 text-[#0A84FF]" />
            <span className="text-xs font-semibold text-[#F5F5F7]">
              Verified Competency Credential
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#30D158]/15 text-[#30D158] border border-[#30D158]/30 font-mono text-[10px] font-semibold">
              <span className="size-1.5 rounded-full bg-[#30D158]" />
              <span>PORTFOLIO READY</span>
            </span>
          </div>
          <button
            onClick={onClose}
            className="size-8 rounded-full bg-[#2C2C2E] hover:bg-[#3A3A3C] border border-white/[0.08] flex items-center justify-center text-[#86868B] hover:text-white transition-colors cursor-pointer"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Certificate Document Frame */}
        <div className="p-6 space-y-4">
          <div className="p-5 rounded-2xl border border-white/[0.08] bg-[#000000] space-y-4 relative">
            {/* Document Header */}
            <div className="text-center space-y-1.5 border-b border-white/[0.08] pb-4">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#0A84FF]">
                Show3D Spatial &amp; Industrial Design Studio · Secondary Pathway
              </div>
              <h2 className="text-lg font-display font-semibold text-[#F5F5F7] tracking-tight">
                Certificate of Spatial Competency &amp; Authorship
              </h2>
              <div className="text-xs text-[#F5F5F7]/90">
                Awarded to{' '}
                <span className="font-semibold text-white">
                  {cert.studentName}
                </span>{' '}
                ({cert.classCohort})
              </div>
              <div className="text-[11px] text-[#86868B] font-mono">
                {cert.school} · Design &amp; Technology (D&amp;T)
              </div>
            </div>

            {/* 94% Human Creative Intent Bar */}
            <div className="p-3.5 rounded-xl bg-[#1C1C1E] border border-white/[0.07] space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#86868B]">
                  Authentic Human Authorship Score:
                </span>
                <span className="text-[11px] font-mono font-bold text-[#30D158]">
                  {cert.humanIntentScore}% STUDENT DIRECTED
                </span>
              </div>
              <div className="h-1.5 w-full bg-[#000000] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#30D158] rounded-full"
                  style={{ width: `${cert.humanIntentScore}%` }}
                />
              </div>
            </div>

            {/* Demonstrated Capstone & Skills */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#F5F5F7]">
                  Demonstrated Capstone: Courtyard Solar Pavilion
                </span>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#0A84FF]/15 text-[#64D2FF] border border-[#0A84FF]/30 font-semibold">
                  STL MANIFOLD VERIFIED
                </span>
              </div>
              <div className="space-y-1.5 text-xs text-[#86868B]">
                {cert.demonstratedSkills.slice(0, 3).map((skill, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Check className="size-3.5 text-[#30D158] shrink-0 mt-0.5" />
                    <span className="text-[#F5F5F7]/85">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Student Reflection Quote */}
            <div className="pt-2 border-t border-white/[0.08] text-xs text-[#86868B] italic bg-[#1C1C1E] p-3.5 rounded-xl border border-white/[0.06]">
              &ldquo;{eduState.reflectionQuestion2.substring(0, 150)}...&rdquo;
            </div>

            {/* Credential Seal */}
            <div className="pt-1 flex items-center justify-between text-[11px] text-[#86868B] font-mono">
              <span>Credential ID: {cert.credentialId}</span>
              <span className="text-[#30D158] flex items-center gap-1 font-semibold">
                <ShieldCheck className="size-3.5" />
                <span>
                  {cert.isVerified ? 'COMPETENCY VERIFIED' : 'PENDING REVIEW'}
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Document Footer */}
        <div className="px-6 py-4 border-t border-white/[0.08] bg-[#000000]/60 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => alert('Downloading verified portfolio record...')}
              className="px-4 py-2 rounded-full bg-[#0A84FF] hover:bg-[#0071E3] text-white font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="size-3.5" />
              <span>Download Certificate</span>
            </button>
            <button
              onClick={() => window.print()}
              className="px-4 py-2 rounded-full bg-[#2C2C2E] hover:bg-[#3A3A3C] text-[#F5F5F7] font-medium flex items-center gap-1.5 border border-white/[0.08] transition-colors cursor-pointer"
            >
              <Printer className="size-3.5" />
              <span>Print</span>
            </button>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-full bg-[#2C2C2E] hover:bg-[#3A3A3C] text-[#86868B] hover:text-white font-medium border border-white/[0.08] transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
