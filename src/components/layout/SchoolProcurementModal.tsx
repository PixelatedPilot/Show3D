import React from 'react';
import { X, Building2, FileText, Download } from 'lucide-react';
import { SCHOOL_PROCUREMENT_SPEC } from '../../store/appStore';

interface SchoolProcurementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SchoolProcurementModal: React.FC<SchoolProcurementModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl s3d-modal-backdrop font-sans select-none text-[#F5F5F7]"
      data-state="open"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-3xl border border-white/[0.1] bg-[#1C1C1E] shadow-2xl p-6 sm:p-7 space-y-5 max-h-[90vh] overflow-y-auto s3d-modal-sheet"
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0A84FF]/15 border border-[#0A84FF]/30 text-[10px] font-mono text-[#0A84FF] font-semibold">
            <Building2 className="size-3.5" />
            <span>SINGAPORE GEBIZ PROCUREMENT STANDARD</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-display font-semibold text-[#F5F5F7] tracking-tight">
            School Procurement &amp; Funding Guide
          </h2>

          <p className="text-xs sm:text-sm text-[#86868B] leading-relaxed">
            A transparent purchasing guide for School Principals,
            Vice-Principals, and Heads of Department (D&amp;T / Computing /
            Infocomm). Structured for standard Singapore school enrichment
            procurement procedures.
          </p>
        </div>

        {/* GeBIZ Procurement Box */}
        <div className="p-4 rounded-2xl bg-[#000000]/70 border border-white/[0.08] space-y-1.5 text-xs relative">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-[#F5F5F7] flex items-center gap-1.5">
              <FileText className="size-4 text-[#30D158]" />
              <span>Standard GeBIZ Purchasing Pathway</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-[#30D158]/15 text-[#30D158] border border-[#30D158]/30 font-semibold">
              E-Invoicing Ready
            </span>
          </div>
          <p className="text-xs text-[#86868B] leading-relaxed">
            Secondary schools procure digital content creation and spatial AI
            enrichment courses via GeBIZ. Show3D provides complete vendor
            documentation, MOE-registered trainer profiles, standardized lesson
            schedules, and transparent quotation packages.
          </p>
        </div>

        {/* 3 Funding Routes Comparison */}
        <div className="space-y-2.5">
          <div className="text-[11px] font-mono text-[#86868B] uppercase tracking-wider">
            Eligible Funding Avenues &amp; Institutional Alignment:
          </div>

          <div className="space-y-2.5 text-xs">
            {/* Route 1: School Enrichment Budget */}
            <div className="p-4 rounded-2xl bg-[#000000]/70 border border-white/[0.08] space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#F5F5F7] flex items-center gap-2">
                  <span className="size-2 rounded-full bg-[#30D158]" />
                  <span>
                    1. School Enrichment Budgets / School-Level Allocations
                  </span>
                </span>
                <span className="text-[10px] font-mono text-[#30D158]">
                  Primary Route
                </span>
              </div>
              <p className="text-xs text-[#86868B] leading-relaxed">
                MOE schools utilize decentralized school-level funding for
                enrichment activities, teaching software, and workshop
                resources.
              </p>
            </div>

            {/* Route 2: Applied Learning Programme (ALP) */}
            <div className="p-4 rounded-2xl bg-[#000000]/70 border border-white/[0.08] space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#F5F5F7] flex items-center gap-2">
                  <span className="size-2 rounded-full bg-[#0A84FF]" />
                  <span>
                    2. Applied Learning Programme (ALP) Theme Adaptation
                  </span>
                </span>
                <span className="text-[10px] font-mono text-[#0A84FF]">
                  Curriculum Fit
                </span>
              </div>
              <p className="text-xs text-[#86868B] leading-relaxed">
                Show3D offers modular curriculum adaptations tailored to
                individual school ALP themes—including{' '}
                <strong className="text-[#F5F5F7]">STEM Prototyping</strong>,{' '}
                <strong className="text-[#F5F5F7]">
                  Urban Sustainability (Courtyard Shading)
                </strong>
                , and{' '}
                <strong className="text-[#F5F5F7]">
                  Computing &amp; Smart Systems
                </strong>
                .
              </p>
            </div>

            {/* Route 3: MOE Opportunity Fund */}
            <div className="p-4 rounded-2xl bg-[#000000]/70 border border-white/[0.08] space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#F5F5F7] flex items-center gap-2">
                  <span className="size-2 rounded-full bg-[#FFD60A]" />
                  <span>
                    3. MOE Opportunity Fund (Targeted Student Subsidies)
                  </span>
                </span>
                <span className="text-[10px] font-mono text-[#FFD60A]">
                  Inclusivity Support
                </span>
              </div>
              <p className="text-xs text-[#86868B] leading-relaxed">
                Schools can leverage the MOE Opportunity Fund to subsidize
                eligible Singapore Citizen students from lower-income
                households, ensuring equal access to advanced technology
                enrichment courses.
              </p>
            </div>
          </div>
        </div>

        {/* Standard Pilot Package Specifications */}
        <div className="p-4 rounded-2xl border border-white/[0.08] bg-[#000000]/70 space-y-2.5 text-xs">
          <div className="font-semibold text-[#F5F5F7]">
            Standard School Pilot Package (1 Cohort)
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center pt-1 text-xs font-mono">
            <div className="p-3 rounded-xl bg-[#1C1C1E] border border-white/[0.06]">
              <div className="text-[#86868B] text-[10px]">Cohort Size</div>
              <div className="text-[#F5F5F7] font-bold">28 Students</div>
            </div>
            <div className="p-3 rounded-xl bg-[#1C1C1E] border border-white/[0.06]">
              <div className="text-[#86868B] text-[10px]">Class Credit Pool</div>
              <div className="text-[#0A84FF] font-bold">5,000 Credits</div>
            </div>
            <div className="p-3 rounded-xl bg-[#1C1C1E] border border-white/[0.06]">
              <div className="text-[#86868B] text-[10px]">Duration</div>
              <div className="text-[#30D158] font-bold">10 Hours / 6 Mod</div>
            </div>
            <div className="p-3 rounded-xl bg-[#1C1C1E] border border-white/[0.06]">
              <div className="text-[#86868B] text-[10px]">Teacher Prep</div>
              <div className="text-[#FFD60A] font-bold">Zero Prep</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 flex items-center justify-between border-t border-white/[0.08]">
          <span className="text-xs text-[#86868B] font-mono">
            GeBIZ Category: {SCHOOL_PROCUREMENT_SPEC.gebizCategory}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                alert(
                  'Standard GeBIZ Quotation & Lesson Plan Package downloaded.'
                )
              }
              className="px-4 py-2 rounded-full bg-[#0A84FF] hover:bg-[#0071E3] text-white font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="size-3.5" />
              <span>Download GeBIZ Pack</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-full bg-[#2C2C2E] hover:bg-[#3A3A3C] text-[#F5F5F7] font-medium text-xs border border-white/[0.08] transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
