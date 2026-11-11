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
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto bg-[#f2f5f7] rounded-[36px] my-6"
      aria-label="Software workspaces showcase"
    >
      {/* Editorial Header Stack (Things Style: Centered max-w-[960px] measure) */}
      <div className="max-w-[960px] mx-auto text-center space-y-4 mb-16">
        <Reveal variant="fade-up">
          <span className="text-[12px] font-semibold text-[#b64400] tracking-[-0.12px] uppercase block">
            Dedicated Learning Environments
          </span>
        </Reveal>

        <Reveal variant="fade-up" index={1}>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-[#303336]">
            Two purpose-built workspaces.
            <br />
            <span className="text-[#838b96]">Zero distraction.</span>
          </h2>
        </Reveal>

        <Reveal variant="fade-up" index={2}>
          <p className="text-base sm:text-lg text-[#838b96] leading-[1.6] max-w-[540px] mx-auto">
            Designed strictly for secondary school creators. Students build in an immersive 16:9 Keynote lab, while educators orchestrate live cohorts with zero-latency telemetry.
          </p>
        </Reveal>

        {/* Things Signature Interactive Control: 40px Circular Play Control + Signal Blue Link */}
        <Reveal variant="fade-up" index={3} className="pt-2">
          <div className="inline-flex items-center gap-3">
            <button
              onClick={handleOpenStudentLab}
              className="w-10 h-10 rounded-full bg-[#4f91fb] hover:bg-[#2576eb] text-white flex items-center justify-center transition-all shadow-[0_2px_8px_rgba(37,118,235,0.3)] hover:scale-105 active:scale-95"
              aria-label="Launch Student Keynote Deck"
            >
              <Play className="size-4 fill-current ml-0.5" />
            </button>
            <button
              onClick={handleOpenStudentLab}
              className="text-[#2576eb] hover:text-[#1a5fb8] text-sm sm:text-[15px] font-normal flex items-center gap-1 transition-colors"
            >
              <span>Launch Interactive Student Lab</span>
              <span className="text-xs">▸</span>
            </button>
          </div>
        </Reveal>
      </div>

      {/* Tilted Product Showcase (DESIGN-2.md: Overlapping -4° & +3° 18px Mockup Cards) */}
      <div className="max-w-[1140px] mx-auto pt-4 pb-8">
        <div className="relative flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-4">
          
          {/* Card 1: Student Keynote Deck (-3.5° Editorial Tilt) */}
          <div
            onClick={handleOpenStudentLab}
            className="w-full lg:w-[540px] rounded-[18px] bg-[#ffffff] p-6 sm:p-7 shadow-[0_2px_8px_rgba(0,0,0,0.1),0_0_2px_rgba(0,0,0,0.1)] cursor-pointer transition-all duration-300 lg:-rotate-[3.5deg] lg:hover:rotate-0 hover:scale-[1.02] z-20 text-left border border-[#dfe3e8]/70"
            role="button"
            tabIndex={0}
            aria-label="Preview Student Keynote Lab"
          >
            {/* Mockup Card Top Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-[#dfe3e8]">
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-[3px] bg-[#2576eb] text-white flex items-center justify-center">
                  <BookOpen className="size-3.5" />
                </div>
                <span className="text-xs font-bold text-[#303336] uppercase tracking-wider">
                  STUDENT KEYNOTE LAB
                </span>
              </div>
              <span className="text-[11px] font-mono text-[#838b96]">16:9 Keynote Mode</span>
            </div>

            {/* Mockup Body Preview */}
            <div className="py-5 space-y-4">
              <div className="space-y-1">
                <span className="text-[11px] font-mono uppercase text-[#2576eb] font-semibold">
                  Module 03 // Spatial Scaffolding
                </span>
                <h4 className="font-display text-xl font-bold text-[#303336]">
                  PARTS Co-Design &amp; Parametric Levers
                </h4>
                <p className="text-xs text-[#838b96] leading-relaxed">
                  Students assemble 5-part engineering prompts and test tactile physical curvature levers in real time.
                </p>
              </div>

              {/* PARTS Token Chips Mockup */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="px-2.5 py-1 rounded-[4px] bg-[#f2f5f7] border border-[#dfe3e8] text-[#303336] font-mono text-[11px]">
                  [P] Eco-Architect
                </span>
                <span className="px-2.5 py-1 rounded-[4px] bg-[#f2f5f7] border border-[#dfe3e8] text-[#303336] font-mono text-[11px]">
                  [A] Tensile Canopy
                </span>
                <span className="px-2.5 py-1 rounded-[4px] bg-[#f2f5f7] border border-[#dfe3e8] text-[#303336] font-mono text-[11px]">
                  [R] Secondary 3
                </span>
                <span className="px-2.5 py-1 rounded-[4px] bg-[#eef4ff] border border-[#2576eb]/30 text-[#2576eb] font-mono text-[11px]">
                  [S] 3mm Ribbed Shell
                </span>
              </div>

              {/* Mini Interactive Slider Mockup */}
              <div className="p-3 rounded-[8px] bg-[#f2f5f7] border border-[#dfe3e8] space-y-1.5">
                <div className="flex justify-between text-[11px] font-mono text-[#55606e]">
                  <span>Parabolic Curvature</span>
                  <span className="font-bold text-[#303336]">0.68 ratio</span>
                </div>
                <div className="h-1.5 w-full bg-[#dfe3e8] rounded-full overflow-hidden">
                  <div className="h-full bg-[#2576eb] w-[68%]" />
                </div>
              </div>
            </div>

            {/* Mockup Footer */}
            <div className="pt-3 border-t border-[#dfe3e8] flex items-center justify-between text-xs text-[#2576eb] font-medium">
              <span>Enter 16:9 Presentation Deck</span>
              <span className="text-sm">▸</span>
            </div>
          </div>

          {/* Card 2: Facilitator Command Hub (+2.5° Editorial Tilt) */}
          <div
            onClick={handleOpenFacilitatorHub}
            className="w-full lg:w-[540px] rounded-[18px] bg-[#ffffff] p-6 sm:p-7 shadow-[0_2px_8px_rgba(0,0,0,0.1),0_0_2px_rgba(0,0,0,0.1)] cursor-pointer transition-all duration-300 lg:rotate-[2.5deg] lg:hover:rotate-0 hover:scale-[1.02] z-10 text-left border border-[#dfe3e8]/70"
            role="button"
            tabIndex={0}
            aria-label="Preview Facilitator Classroom Hub"
          >
            {/* Mockup Card Top Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-[#dfe3e8]">
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-[3px] bg-[#303336] text-white flex items-center justify-center">
                  <Users className="size-3.5" />
                </div>
                <span className="text-xs font-bold text-[#303336] uppercase tracking-wider">
                  FACILITATOR COMMAND HUB
                </span>
              </div>
              <span className="text-[11px] font-mono text-[#838b96]">Class 3-Faith · 28 Students</span>
            </div>

            {/* Mockup Body Preview */}
            <div className="py-5 space-y-4">
              <div className="space-y-1">
                <span className="text-[11px] font-mono uppercase text-[#30D158] font-semibold">
                  Live Cohort Telemetry
                </span>
                <h4 className="font-display text-xl font-bold text-[#303336]">
                  Real-Time Classroom Telemetry &amp; MOE Rubrics
                </h4>
                <p className="text-xs text-[#838b96] leading-relaxed">
                  Monitor slide coordinates, intervene on student help flags, and generate verified GeBIZ packs.
                </p>
              </div>

              {/* Roster & Telemetry Mini Grid */}
              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 rounded-[8px] bg-[#f2f5f7] border border-[#dfe3e8] space-y-1">
                  <div className="text-[10px] font-mono uppercase text-[#838b96]">Learning Gain Delta</div>
                  <div className="text-lg font-bold text-[#30D158]">+34.2% Growth</div>
                </div>
                <div className="p-3 rounded-[8px] bg-[#f2f5f7] border border-[#dfe3e8] space-y-1">
                  <div className="text-[10px] font-mono uppercase text-[#838b96]">Creative Intent</div>
                  <div className="text-lg font-bold text-[#2576eb]">94% Human Directed</div>
                </div>
              </div>

              {/* Status Row */}
              <div className="p-2.5 rounded-[8px] bg-[#fff9e6] border border-[#FFD60A]/30 flex items-center justify-between text-xs text-[#55606e]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#FFD60A] animate-pulse" />
                  <span>2 Students Flagged for Mentorship</span>
                </div>
                <span className="font-mono text-[11px] text-[#303336] font-semibold">Instant Intervene</span>
              </div>
            </div>

            {/* Mockup Footer */}
            <div className="pt-3 border-t border-[#dfe3e8] flex items-center justify-between text-xs text-[#2576eb] font-medium">
              <span>Open Facilitator Classroom Control</span>
              <span className="text-sm">▸</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
