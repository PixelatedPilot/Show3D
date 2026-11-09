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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md select-none font-sans text-[#E3E3E3]">
      <div className="w-full max-w-xl rounded-3xl overflow-hidden border border-white/[0.08] bg-[#1E1F22] shadow-2xl flex flex-col relative">
        {/* Executive Document Toolbar */}
        <div className="px-6 py-4 border-b border-white/[0.08] flex items-center justify-between bg-[#131314]/60">
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-mono text-[#E3E3E3] font-medium">REP-WOR-2026-W42.pdf</span>
            <span className="text-white/15">|</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#13281C] text-[#6DD58C] border border-[#6DD58C]/30 font-mono text-[10px] font-semibold">
              <span className="size-1.5 rounded-full bg-[#6DD58C] animate-pulse" />
              <span>Status: VERIFIED</span>
            </span>
          </div>
          <button
            onClick={onClose}
            className="size-8 rounded-full bg-[#282A2E] hover:bg-[#33363B] border border-white/[0.08] flex items-center justify-center text-[#9AA0A6] hover:text-white transition-colors"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Certificate Document Frame */}
        <div className="p-6 space-y-4">
          <div className="p-5 rounded-2xl border border-white/[0.08] bg-[#131314] space-y-4 relative">
            {/* Document Header */}
            <div className="text-center space-y-1 border-b border-white/[0.08] pb-4">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#A8C7FA]">
                Show3D AI Creator Programme · Secondary School Pathway
              </div>
              <h2 className="text-base font-display font-medium text-white tracking-tight">
                Certificate of Participation & Demonstrated Competency
              </h2>
              <div className="text-xs text-[#E3E3E3]">
                Awarded to <span className="font-semibold text-white">{cert.studentName}</span> ({cert.classCohort})
              </div>
              <div className="text-[11px] text-[#9AA0A6] font-mono">
                {cert.school} · Design & Technology (D&T)
              </div>
            </div>

            {/* 94% Human Creative Intent Telemetry Bar */}
            <div className="p-3.5 rounded-xl bg-[#1E1F22] border border-white/[0.07] space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#9AA0A6]">
                  Human Creative Intent Assessment:
                </span>
                <span className="text-[11px] font-mono font-bold text-[#6DD58C]">
                  {cert.humanIntentScore}% DIRECTED
                </span>
              </div>
              <div className="h-1.5 w-full bg-[#131314] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#6DD58C] rounded-full" 
                  style={{ width: `${cert.humanIntentScore}%` }}
                />
              </div>
            </div>

            {/* Demonstrated Capstone & Skills */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-medium text-[#E3E3E3]">
                  Demonstrated Capstone: Courtyard Shaded Pavilion
                </span>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#162238] text-[#A8C7FA] border border-[#A8C7FA]/25 font-semibold">
                  PORT_443_VALIDATED
                </span>
              </div>
              <div className="space-y-1 text-[11px] text-[#9AA0A6]">
                {cert.demonstratedSkills.slice(0, 3).map((skill, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Check className="size-3 text-[#6DD58C] shrink-0 mt-0.5" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Student Reflection Quote */}
            <div className="pt-2 border-t border-white/[0.08] text-[11px] text-[#9AA0A6] italic bg-[#1E1F22] p-3.5 rounded-xl border border-white/[0.06]">
              "{eduState.reflectionQuestion2.substring(0, 150)}..."
            </div>

            {/* Cryptographic Credential Telemetry & Verifiable Seal */}
            <div className="pt-1 flex items-center justify-between text-[10px] text-[#9AA0A6] font-mono">
              <span>ID: {cert.credentialId}</span>
              <span className="text-[#9AA0A6]/60">CRED_HASH // 0x7E9A4B1</span>
              <span className="text-[#6DD58C] flex items-center gap-1 font-semibold">
                <ShieldCheck className="size-3" />
                <span>{cert.isVerified ? 'PARTICIPATION VERIFIED' : 'PENDING REVIEW'}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Document Footer */}
        <div className="px-6 py-4 border-t border-white/[0.08] bg-[#131314]/60 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => alert("Downloading PDF record...")}
              className="px-4 py-2 rounded-full bg-[#A8C7FA] hover:bg-[#BBD4FB] text-[#062E6F] font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Download className="size-3.5" />
              <span>Download Record</span>
            </button>
            <button
              onClick={() => window.print()}
              className="px-4 py-2 rounded-full bg-[#282A2E] hover:bg-[#33363B] text-[#E3E3E3] font-medium flex items-center gap-1.5 border border-white/[0.08] transition-colors"
            >
              <Printer className="size-3.5" />
              <span>Print</span>
            </button>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-full bg-[#282A2E] hover:bg-[#33363B] text-[#9AA0A6] hover:text-white font-medium border border-white/[0.08] transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
