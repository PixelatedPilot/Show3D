import React from 'react';
import { Play, ArrowRight, BookOpen, Users, Sparkles, CheckCircle2 } from 'lucide-react';
import { Reveal } from '../motion/Reveal';

export interface ProductMockupShowcaseProps {
  onOpenStudentLab?: () => void;
  onOpenFacilitatorHub?: () => void;
  onStartLearning?: () => void;
  onOpenTeacherView?: () => void;
}

export const ProductMockupShowcase: React.FC<ProductMockupShowcaseProps> = ({
  onOpenStudentLab,
  onOpenFacilitatorHub,
  onStartLearning,
  onOpenTeacherView,
}) => {
  const handleOpenStudentLab = onStartLearning || onOpenStudentLab || (() => {});
  const handleOpenFacilitatorHub = onOpenTeacherView || onOpenFacilitatorHub || (() => {});
  return (
    <section
      id="product-showcase"
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto bg-[#0E0E10] rounded-[36px] my-6"
      aria-label="Software workspaces showcase"
    >
      {/* Editorial Header Stack (Things Style: Centered max-w-[960px] measure) */}
      <div className="max-w-[960px] mx-auto text-center space-y-4 mb-16">
        <Reveal variant="fade-up">
          <span className="text-[12px] font-semibold text-[#0A84FF] tracking-[-0.12px] uppercase block">
            Dedicated Learning Environments
          </span>
        </Reveal>

        <Reveal variant="fade-up" index={1}>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Two purpose-built workspaces.
            <br />
            <span className="text-[#86868B]">Zero distraction.</span>
          </h2>
        </Reveal>

        <Reveal variant="fade-up" index={2}>
          <p className="text-base sm:text-lg text-[#86868B] leading-[1.6] max-w-[540px] mx-auto">
            Designed strictly for secondary school creators. Students build in an immersive 16:9 Keynote lab, while educators orchestrate live cohorts with zero-latency telemetry.
          </p>
        </Reveal>

        {/* Things Signature Interactive Control: 40px Circular Play Control + Signal Blue Link */}
        <Reveal variant="fade-up" index={3} className="pt-2">
          <div className="inline-flex items-center gap-3">
            <button
              onClick={handleOpenStudentLab}
              className="w-10 h-10 rounded-full bg-[#0A84FF] hover:bg-[#0071E3] text-white flex items-center justify-center transition-all shadow-[0_2px_12px_rgba(10,132,255,0.4)] hover:scale-105 active:scale-95"
              aria-label="Launch Student Keynote Deck"
            >
              <Play className="size-4 fill-current ml-0.5" />
            </button>
            <button
              onClick={handleOpenStudentLab}
              className="text-[#0A84FF] hover:text-[#64D2FF] text-sm sm:text-[15px] font-normal flex items-center gap-1 transition-colors"
            >
              <span>Launch Interactive Student Lab</span>
              <span className="text-xs">▸</span>
            </button>
          </div>
        </Reveal>
      </div>

      {/* Tilted Product Showcase (Overlapping -3.5° & +2.5° 18px Mockup Cards) */}
      <div className="max-w-[1140px] mx-auto pt-4 pb-8">
        <div className="relative flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-4">
          
          {/* Card 1: Student Keynote Deck (-3.5° Editorial Tilt) */}
          <div
            onClick={handleOpenStudentLab}
            className="w-full lg:w-[540px] rounded-[18px] bg-[#1C1C1E] p-6 sm:p-7 shadow-[0_4px_24px_rgba(0,0,0,0.6)] cursor-pointer transition-all duration-300 lg:-rotate-[3.5deg] lg:hover:rotate-0 hover:scale-[1.02] z-20 text-left border border-white/[0.12]"
            role="button"
            tabIndex={0}
            aria-label="Preview Student Keynote Lab"
          >
            {/* Mockup Card Top Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-[3px] bg-[#0A84FF] text-white flex items-center justify-center">
                  <BookOpen className="size-3.5" />
                </div>
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  STUDENT KEYNOTE LAB
                </span>
              </div>
              <span className="text-[11px] font-mono text-[#86868B]">16:9 Keynote Mode</span>
            </div>

            {/* Mockup Body Preview */}
            <div className="py-5 space-y-4">
              <div className="space-y-1">
                <span className="text-[11px] font-mono uppercase text-[#0A84FF] font-semibold">
                  Module 03 // Spatial Scaffolding
                </span>
                <h4 className="font-display text-xl font-bold text-white">
                  PARTS Co-Design &amp; Parametric Levers
                </h4>
                <p className="text-xs text-[#86868B] leading-relaxed">
                  Students assemble 5-part engineering prompts and test tactile physical curvature levers in real time.
                </p>
              </div>

              {/* PARTS Token Chips Mockup */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="px-2.5 py-1 rounded-[4px] bg-[#2C2C2E] border border-white/[0.08] text-white font-mono text-[11px]">
                  [P] Eco-Architect
                </span>
                <span className="px-2.5 py-1 rounded-[4px] bg-[#2C2C2E] border border-white/[0.08] text-white font-mono text-[11px]">
                  [A] Tensile Canopy
                </span>
                <span className="px-2.5 py-1 rounded-[4px] bg-[#2C2C2E] border border-white/[0.08] text-white font-mono text-[11px]">
                  [R] Secondary 3
                </span>
                <span className="px-2.5 py-1 rounded-[4px] bg-[#0D2137] border border-[#0A84FF]/40 text-[#64D2FF] font-mono text-[11px]">
                  [S] 3mm Ribbed Shell
                </span>
              </div>

              {/* Mini Interactive Slider Mockup */}
              <div className="p-3 rounded-[8px] bg-[#2C2C2E] border border-white/[0.08] space-y-1.5">
                <div className="flex justify-between text-[11px] font-mono text-[#86868B]">
                  <span>Parabolic Curvature</span>
                  <span className="font-bold text-white">0.68 ratio</span>
                </div>
                <div className="h-1.5 w-full bg-[#1C1C1E] rounded-full overflow-hidden">
                  <div className="h-full bg-[#0A84FF] w-[68%]" />
                </div>
              </div>
            </div>

            {/* Mockup Footer */}
            <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs text-[#0A84FF] font-medium">
              <span>Enter 16:9 Presentation Deck</span>
              <span className="text-sm">▸</span>
            </div>
          </div>

          {/* Card 2: Facilitator Command Hub (+2.5° Editorial Tilt) */}
          <div
            onClick={handleOpenFacilitatorHub}
            className="w-full lg:w-[540px] rounded-[18px] bg-[#1C1C1E] p-6 sm:p-7 shadow-[0_4px_24px_rgba(0,0,0,0.6)] cursor-pointer transition-all duration-300 lg:rotate-[2.5deg] lg:hover:rotate-0 hover:scale-[1.02] z-10 text-left border border-white/[0.12]"
            role="button"
            tabIndex={0}
            aria-label="Preview Facilitator Classroom Hub"
          >
            {/* Mockup Card Top Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-[3px] bg-[#3A3A3C] text-white flex items-center justify-center">
                  <Users className="size-3.5" />
                </div>
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  FACILITATOR COMMAND HUB
                </span>
              </div>
              <span className="text-[11px] font-mono text-[#86868B]">Class 3-Faith · 28 Students</span>
            </div>

            {/* Mockup Body Preview */}
            <div className="py-5 space-y-4">
              <div className="space-y-1">
                <span className="text-[11px] font-mono uppercase text-[#30D158] font-semibold">
                  Live Cohort Telemetry
                </span>
                <h4 className="font-display text-xl font-bold text-white">
                  Real-Time Classroom Telemetry &amp; MOE Rubrics
                </h4>
                <p className="text-xs text-[#86868B] leading-relaxed">
                  Monitor slide coordinates, intervene on student help flags, and generate verified GeBIZ packs.
                </p>
              </div>

              {/* Roster & Telemetry Mini Grid */}
              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 rounded-[8px] bg-[#2C2C2E] border border-white/[0.08] space-y-1">
                  <div className="text-[10px] font-mono uppercase text-[#86868B]">Learning Gain Delta</div>
                  <div className="text-lg font-bold text-[#30D158]">+34.2% Growth</div>
                </div>
                <div className="p-3 rounded-[8px] bg-[#2C2C2E] border border-white/[0.08] space-y-1">
                  <div className="text-[10px] font-mono uppercase text-[#86868B]">Creative Intent</div>
                  <div className="text-lg font-bold text-[#0A84FF]">94% Human Directed</div>
                </div>
              </div>

              {/* Status Row */}
              <div className="p-2.5 rounded-[8px] bg-[#2C2405] border border-[#FFD60A]/30 flex items-center justify-between text-xs text-[#F5F5F7]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#FFD60A] animate-pulse" />
                  <span>2 Students Flagged for Mentorship</span>
                </div>
                <span className="font-mono text-[11px] text-[#FFD60A] font-semibold">Instant Intervene</span>
              </div>
            </div>

            {/* Mockup Footer */}
            <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs text-[#0A84FF] font-medium">
              <span>Open Facilitator Classroom Control</span>
              <span className="text-sm">▸</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
