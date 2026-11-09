import React from 'react';
import { X, Check, Download, Printer, ShieldCheck } from 'lucide-react';
import { EduState } from '../../types';
import { generateVerifiedCertificate } from '../../utils/workflowState';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  eduState: EduState;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ isOpen, onClose, eduState }) => {
  if (!isOpen) return null;

  const cert = generateVerifiedCertificate({
    studentName: 'Ethan Tan',
    school: 'Tampines Secondary School',
    classCohort: 'Class 3-Faith',
    moduleNumber: eduState.activeModuleId || 3,
    intentScore: eduState.authorshipScore || 94,
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md select-none font-sans text-[#e5e2e3]">
      <div className="w-full max-w-xl rounded-lg overflow-hidden border border-[#232426] bg-[#0d0e0f] shadow-2xl flex flex-col relative">
        {/* Top Shimmer Highlight */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

        {/* Executive Document Toolbar */}
        <div className="px-5 py-3 border-b border-[#232426] flex items-center justify-between bg-[#151617]">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[#e5e2e3] font-medium">REP-WOR-2023-W42.pdf</span>
            <span className="text-[#232426]">|</span>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#50d8e9]/10 text-[#50d8e9] border border-[#50d8e9]/30 font-mono text-[10px] font-semibold">
              <span className="size-1.5 rounded-full bg-[#50d8e9] animate-pulse" />
              <span>Status: VERIFIED</span>
            </span>
          </div>
          <button
            onClick={onClose}
            className="size-7 rounded bg-[#101112] hover:bg-[#1f2023] border border-[#232426] flex items-center justify-center text-[#9A9DA3] hover:text-white transition-colors"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Certificate Document Frame */}
        <div className="p-6 space-y-4">
          <div className="p-5 rounded-lg border border-[#232426] bg-[#101112] space-y-4 relative">
            {/* Top Shimmer Line */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

            {/* Document Header */}
            <div className="text-center space-y-1 border-b border-[#232426] pb-4">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#50d8e9]">
                Show3D AI Creator Programme · Secondary School Pathway
              </div>
              <h2 className="text-base font-bold text-white tracking-tight">
                Certificate of Participation & Demonstrated Competency
              </h2>
              <div className="text-xs text-[#e5e2e3]">
                Awarded to <span className="font-semibold text-white">{cert.studentName}</span> ({cert.classCohort})
              </div>
              <div className="text-[11px] text-[#9A9DA3] font-mono">
                {cert.school} · Design & Technology (D&T)
              </div>
            </div>

            {/* 94% Human Creative Intent Telemetry Bar */}
            <div className="p-3 rounded bg-[#070708] border border-[#1b1c1e] space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#9A9DA3]">
                  Human Creative Intent Assessment:
                </span>
                <span className="text-[11px] font-mono font-bold text-[#50d8e9]">
                  {cert.humanIntentScore}% DIRECTED
                </span>
              </div>
              <div className="h-1.5 w-full bg-[#1b1c1e] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#5E6BFF] to-[#50d8e9] rounded-full" 
                  style={{ width: `${cert.humanIntentScore}%` }}
                />
              </div>
            </div>

            {/* Demonstrated Capstone & Skills */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-medium text-[#e5e2e3]">
                  Demonstrated Capstone: Courtyard Shaded Pavilion
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#50d8e9]/10 text-[#50d8e9] border border-[#50d8e9]/20 font-semibold">
                  PORT_443_VALIDATED
                </span>
              </div>
              <div className="space-y-1 text-[11px] text-[#9A9DA3]">
                {cert.demonstratedSkills.slice(0, 3).map((skill, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Check className="size-3 text-[#50d8e9] shrink-0 mt-0.5" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Student Reflection Quote */}
            <div className="pt-2 border-t border-[#232426] text-[11px] text-[#9A9DA3] italic bg-[#070708] p-3 rounded border border-[#1b1c1e]">
              "{eduState.reflectionQuestion2.substring(0, 150)}..."
            </div>

            {/* Cryptographic Credential Telemetry & Verifiable Seal */}
            <div className="pt-1 flex items-center justify-between text-[10px] text-[#9A9DA3] font-mono">
              <span>ID: {cert.credentialId}</span>
              <span className="text-[#9A9DA3]/60">CRED_HASH // 0x7E9A4B1</span>
              <span className="text-[#50d8e9] flex items-center gap-1 font-semibold">
                <ShieldCheck className="size-3" />
                <span>{cert.isVerified ? 'PARTICIPATION VERIFIED' : 'PENDING REVIEW'}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Document Footer */}
        <div className="px-5 py-3 border-t border-[#232426] bg-[#151617] flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => alert("Downloading PDF record...")}
              className="px-3.5 py-1.5 rounded bg-[#5E6BFF] hover:bg-[#4d59df] text-white font-medium flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Download className="size-3.5" />
              <span>Download Record</span>
            </button>
            <button
              onClick={() => window.print()}
              className="px-3.5 py-1.5 rounded bg-[#101112] hover:bg-[#1a1b1d] text-[#e5e2e3] font-medium flex items-center gap-1.5 border border-[#232426] transition-colors"
            >
              <Printer className="size-3.5" />
              <span>Print</span>
            </button>
          </div>
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded bg-[#101112] hover:bg-[#1a1b1d] text-[#9A9DA3] hover:text-white font-medium border border-[#232426] transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
