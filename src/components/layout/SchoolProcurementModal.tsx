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
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-[#5E6BFF]/10 border border-[#5E6BFF]/20 text-[10px] font-mono text-[#5E6BFF]">
            <Building2 className="size-3" />
            <span>SINGAPORE GEBIZ PROCUREMENT STANDARD</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            School Procurement & Funding Guide
          </h2>

          <p className="text-xs text-[#9A9DA3] leading-relaxed">
            A comprehensive purchasing guide for School Principals, Vice-Principals, and Heads of Department (D&T / Computing / Infocomm). Structured for standard school enrichment procurement procedures.
          </p>
        </div>

        {/* GeBIZ Procurement Box */}
        <div className="p-4 rounded-lg bg-[#101112] border border-[#232426] space-y-1.5 text-xs relative">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-white flex items-center gap-1.5">
              <FileText className="size-3.5 text-[#50d8e9]" />
              <span>Standard GeBIZ Purchasing Pathway</span>
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#50d8e9]/10 text-[#50d8e9] border border-[#50d8e9]/20 font-medium">
              E-Invoicing Ready
            </span>
          </div>
          <p className="text-[11px] text-[#9A9DA3] leading-relaxed">
            Secondary schools routinely procure digital content creation, games development, and AI enrichment courses via GeBIZ. Show3D provides complete vendor documentation, certified trainer profiles, standardized lesson schedules, and transparent quotation packages.
          </p>
        </div>

        {/* 3 Funding Routes Comparison */}
        <div className="space-y-2.5">
          <div className="text-[10px] font-mono text-[#9A9DA3] uppercase tracking-wider">
            Eligible Funding Avenues & Institutional Alignment:
          </div>

          <div className="space-y-2 text-xs">
            {/* Route 1: School Enrichment Budget */}
            <div className="p-3.5 rounded-lg bg-[#101112] border border-[#232426] space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-[#50d8e9]" />
                  <span>1. School Enrichment Budgets / School-Level Allocations</span>
                </span>
                <span className="text-[10px] font-mono text-[#50d8e9]">Primary Route</span>
              </div>
              <p className="text-[11px] text-[#9A9DA3] leading-relaxed">
                MOE schools utilize decentralized school-level funding for enrichment activities, teaching software, and workshop resources.
              </p>
              <div className="text-[10px] text-[#9A9DA3]/80 font-mono bg-[#070708] p-2 rounded border border-[#1b1c1e]">
                Note: Following MOE's 2023 grant evolution, schools confirm their available internal enrichment budget allocations rather than assuming a dedicated centralized Edusave grant for Show3D.
              </div>
            </div>

            {/* Route 2: Applied Learning Programme (ALP) */}
            <div className="p-3.5 rounded-lg bg-[#101112] border border-[#232426] space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-[#5E6BFF]" />
                  <span>2. Applied Learning Programme (ALP) Theme Adaptation</span>
                </span>
                <span className="text-[10px] font-mono text-[#5E6BFF]">Curriculum Fit</span>
              </div>
              <p className="text-[11px] text-[#9A9DA3] leading-relaxed">
                Show3D offers modular curriculum adaptations tailored to individual school ALP themes—including <strong className="text-[#e5e2e3]">STEM Prototyping</strong>, <strong className="text-[#e5e2e3]">Urban Sustainability (Courtyard Shading)</strong>, and <strong className="text-[#e5e2e3]">Computing & Smart Systems</strong>.
              </p>
              <div className="text-[10px] text-[#9A9DA3]/80 font-mono bg-[#070708] p-2 rounded border border-[#1b1c1e]">
                Note: ALP alignment provides curriculum relevance for school partnerships; schools finance the programme through their departmental enrichment funds.
              </div>
            </div>

            {/* Route 3: MOE Opportunity Fund */}
            <div className="p-3.5 rounded-lg bg-[#101112] border border-[#232426] space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-[#ffb689]" />
                  <span>3. MOE Opportunity Fund (Targeted Student Subsidies)</span>
                </span>
                <span className="text-[10px] font-mono text-[#ffb689]">Inclusivity Support</span>
              </div>
              <p className="text-[11px] text-[#9A9DA3] leading-relaxed">
                Schools can leverage the MOE Opportunity Fund to subsidize eligible Singapore Citizen students from lower-income households, ensuring equal access to co-curricular and advanced technology enrichment courses.
              </p>
            </div>
          </div>
        </div>

        {/* Standard Pilot Package Specifications */}
        <div className="p-4 rounded-lg border border-[#232426] bg-[#101112] space-y-2 text-xs">
          <div className="font-semibold text-white">Standard School Pilot Package (1 Cohort)</div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center pt-1 text-[11px] font-mono">
            <div className="p-2 rounded bg-[#070708] border border-[#1b1c1e]">
              <div className="text-[#9A9DA3] text-[10px]">Cohort Size</div>
              <div className="text-white font-bold">28 Students</div>
            </div>
            <div className="p-2 rounded bg-[#070708] border border-[#1b1c1e]">
              <div className="text-[#9A9DA3] text-[10px]">Class Credit Pool</div>
              <div className="text-[#5E6BFF] font-bold">5,000 Credits</div>
            </div>
            <div className="p-2 rounded bg-[#070708] border border-[#1b1c1e]">
              <div className="text-[#9A9DA3] text-[10px]">Curriculum Duration</div>
              <div className="text-[#50d8e9] font-bold">10 Hours / 6 Mod</div>
            </div>
            <div className="p-2 rounded bg-[#070708] border border-[#1b1c1e]">
              <div className="text-[#9A9DA3] text-[10px]">Teacher Prep</div>
              <div className="text-[#bec2ff] font-bold">Zero Prep (Vendor)</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 flex items-center justify-between border-t border-[#232426]">
          <span className="text-[11px] text-[#9A9DA3] font-mono">
            GeBIZ Vendor Spec: {SCHOOL_PROCUREMENT_SPEC.gebizCategory}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => alert("Standard GeBIZ Quotation & Lesson Plan Package downloaded.")}
              className="px-3.5 py-2 rounded bg-[#5E6BFF] hover:bg-[#4d59df] text-white font-medium text-xs flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Download className="size-3.5" />
              <span>Download GeBIZ Pack</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded bg-[#151617] hover:bg-[#232426] text-[#9A9DA3] hover:text-white font-medium text-xs border border-[#232426] transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
