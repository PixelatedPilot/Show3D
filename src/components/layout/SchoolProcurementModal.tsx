import React from 'react';
import { X, Building2, FileText, Download } from 'lucide-react';
import { SCHOOL_PROCUREMENT_SPEC } from '../../store/appStore';

interface SchoolProcurementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SchoolProcurementModal: React.FC<SchoolProcurementModalProps> = ({ isOpen, onClose }) => {
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#162238] border border-[#A8C7FA]/25 text-[10px] font-mono text-[#A8C7FA]">
            <Building2 className="size-3" />
            <span>SINGAPORE GEBIZ PROCUREMENT STANDARD</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-display font-medium text-white tracking-tight">
            School Procurement & Funding Guide
          </h2>

          <p className="text-xs text-[#C4C7C5] leading-relaxed">
            A comprehensive purchasing guide for School Principals, Vice-Principals, and Heads of Department (D&T / Computing / Infocomm). Structured for standard school enrichment procurement procedures.
          </p>
        </div>

        {/* GeBIZ Procurement Box */}
        <div className="p-4 rounded-2xl bg-[#131314] border border-white/[0.07] space-y-1.5 text-xs relative">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-white flex items-center gap-1.5">
              <FileText className="size-3.5 text-[#6DD58C]" />
              <span>Standard GeBIZ Purchasing Pathway</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-[#13281C] text-[#6DD58C] border border-[#6DD58C]/25 font-medium">
              E-Invoicing Ready
            </span>
          </div>
          <p className="text-[11px] text-[#9AA0A6] leading-relaxed">
            Secondary schools routinely procure digital content creation, games development, and AI enrichment courses via GeBIZ. Show3D provides complete vendor documentation, certified trainer profiles, standardized lesson schedules, and transparent quotation packages.
          </p>
        </div>

        {/* 3 Funding Routes Comparison */}
        <div className="space-y-2.5">
          <div className="text-[10px] font-mono text-[#9AA0A6] uppercase tracking-wider">
            Eligible Funding Avenues & Institutional Alignment:
          </div>

          <div className="space-y-2.5 text-xs">
            {/* Route 1: School Enrichment Budget */}
            <div className="p-4 rounded-2xl bg-[#131314] border border-white/[0.07] space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-[#6DD58C]" />
                  <span>1. School Enrichment Budgets / School-Level Allocations</span>
                </span>
                <span className="text-[10px] font-mono text-[#6DD58C]">Primary Route</span>
              </div>
              <p className="text-[11px] text-[#9AA0A6] leading-relaxed">
                MOE schools utilize decentralized school-level funding for enrichment activities, teaching software, and workshop resources.
              </p>
              <div className="text-[10px] text-[#9AA0A6] font-mono bg-[#1E1F22] p-2.5 rounded-xl border border-white/[0.06]">
                Note: Following MOE's 2023 grant evolution, schools confirm their available internal enrichment budget allocations rather than assuming a dedicated centralized Edusave grant for Show3D.
              </div>
            </div>

            {/* Route 2: Applied Learning Programme (ALP) */}
            <div className="p-4 rounded-2xl bg-[#131314] border border-white/[0.07] space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-[#A8C7FA]" />
                  <span>2. Applied Learning Programme (ALP) Theme Adaptation</span>
                </span>
                <span className="text-[10px] font-mono text-[#A8C7FA]">Curriculum Fit</span>
              </div>
              <p className="text-[11px] text-[#9AA0A6] leading-relaxed">
                Show3D offers modular curriculum adaptations tailored to individual school ALP themes—including <strong className="text-[#E3E3E3]">STEM Prototyping</strong>, <strong className="text-[#E3E3E3]">Urban Sustainability (Courtyard Shading)</strong>, and <strong className="text-[#E3E3E3]">Computing & Smart Systems</strong>.
              </p>
              <div className="text-[10px] text-[#9AA0A6] font-mono bg-[#1E1F22] p-2.5 rounded-xl border border-white/[0.06]">
                Note: ALP alignment provides curriculum relevance for school partnerships; schools finance the programme through their departmental enrichment funds.
              </div>
            </div>

            {/* Route 3: MOE Opportunity Fund */}
            <div className="p-4 rounded-2xl bg-[#131314] border border-white/[0.07] space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-[#FDD663]" />
                  <span>3. MOE Opportunity Fund (Targeted Student Subsidies)</span>
                </span>
                <span className="text-[10px] font-mono text-[#FDD663]">Inclusivity Support</span>
              </div>
              <p className="text-[11px] text-[#9AA0A6] leading-relaxed">
                Schools can leverage the MOE Opportunity Fund to subsidize eligible Singapore Citizen students from lower-income households, ensuring equal access to co-curricular and advanced technology enrichment courses.
              </p>
            </div>
          </div>
        </div>

        {/* Standard Pilot Package Specifications */}
        <div className="p-4 rounded-2xl border border-white/[0.07] bg-[#131314] space-y-2.5 text-xs">
          <div className="font-semibold text-white">Standard School Pilot Package (1 Cohort)</div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center pt-1 text-[11px] font-mono">
            <div className="p-2.5 rounded-xl bg-[#1E1F22] border border-white/[0.06]">
              <div className="text-[#9AA0A6] text-[10px]">Cohort Size</div>
              <div className="text-white font-bold">28 Students</div>
            </div>
            <div className="p-2.5 rounded-xl bg-[#1E1F22] border border-white/[0.06]">
              <div className="text-[#9AA0A6] text-[10px]">Class Credit Pool</div>
              <div className="text-[#A8C7FA] font-bold">5,000 Credits</div>
            </div>
            <div className="p-2.5 rounded-xl bg-[#1E1F22] border border-white/[0.06]">
              <div className="text-[#9AA0A6] text-[10px]">Curriculum Duration</div>
              <div className="text-[#6DD58C] font-bold">10 Hours / 6 Mod</div>
            </div>
            <div className="p-2.5 rounded-xl bg-[#1E1F22] border border-white/[0.06]">
              <div className="text-[#9AA0A6] text-[10px]">Teacher Prep</div>
              <div className="text-[#FDD663] font-bold">Zero Prep (Vendor)</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 flex items-center justify-between border-t border-white/[0.08]">
          <span className="text-[11px] text-[#9AA0A6] font-mono">
            GeBIZ Vendor Spec: {SCHOOL_PROCUREMENT_SPEC.gebizCategory}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => alert("Standard GeBIZ Quotation & Lesson Plan Package downloaded.")}
              className="px-4 py-2 rounded-full bg-[#A8C7FA] hover:bg-[#BBD4FB] text-[#062E6F] font-semibold text-xs flex items-center gap-1.5 transition-colors"
            >
              <Download className="size-3.5" />
              <span>Download GeBIZ Pack</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-full bg-[#282A2E] hover:bg-[#33363B] text-[#E3E3E3] font-medium text-xs border border-white/[0.08] transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
