import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Box, Printer } from 'lucide-react';
import { ScrollWords } from '../motion/ScrollWords';
import { Reveal } from '../motion/Reveal';
import { formatStat } from '../../utils/motionHelpers';

export const PhilosophyReveal: React.FC = () => {
  const [statProgress, setStatProgress] = useState<number>(0);
  const statsSectionRef = useRef<HTMLDivElement | null>(null);

  // Trigger stat count-up when section scrolls into view
  useEffect(() => {
    const el = statsSectionRef.current;
    if (!el) return;

    let startTime: number | null = null;
    let animId: number | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const step = (timestamp: number) => {
              if (!startTime) startTime = timestamp;
              const elapsed = (timestamp - startTime) / 1200; // 1.2s duration
              if (elapsed < 1) {
                setStatProgress(elapsed);
                animId = requestAnimationFrame(step);
              } else {
                setStatProgress(1);
              }
            };
            animId = requestAnimationFrame(step);
            observer.unobserve(el);
          }
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  const philosophyParagraph = [
    { text: 'Every parent sees it: hours lost to passive scrolling, repetitive gaming loops, or letting AI blindly generate generic essays.', emphasis: false },
    { text: 'Show3D was engineered as the antidote.', emphasis: true },
    { text: 'Here, students do not outsource their thinking.', emphasis: true },
    { text: 'They develop spatial intuition, challenge algorithmic outputs, and prove that', emphasis: false },
    { text: 'the most powerful intelligence in the room is their own.', emphasis: true },
  ];

  return (
    <section
      id="philosophy"
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-[1380px] mx-auto bg-[#ffffff]"
    >
      {/* 1. Apple Centered Headline Lockup */}
      <div className="max-w-4xl mx-auto text-center space-y-4 mb-16">
        <Reveal variant="fade-up">
          <span className="text-[12px] font-semibold text-[#b64400] tracking-[-0.12px] uppercase block">
            A Major Upgrade to Screen Time
          </span>
        </Reveal>

        <Reveal variant="fade-up" index={1}>
          <h2 className="font-display text-4xl sm:text-6xl font-semibold tracking-tight text-[#1d1d1f] leading-[1.08]">
            Screen time, transformed.
            <br />
            <span className="text-[#707070]">From passive consumers to active inventors.</span>
          </h2>
        </Reveal>

        {/* 2. Word-by-Word Scroll Text Reveal in Light Theme */}
        <div className="pt-6 max-w-3xl mx-auto text-lg sm:text-2xl leading-relaxed font-normal">
          <ScrollWords
            segments={philosophyParagraph}
            emphasisColor="#1d1d1f"
            className="s3d-word-light"
          />
        </div>
      </div>

      {/* 3. Real-Time Telemetry Stats Count-Up Row on Studio Mist */}
      <div
        ref={statsSectionRef}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 my-16 p-8 rounded-[28px] bg-[#f5f5f7] border border-[#e6e6e8] text-center"
      >
        <div className="space-y-1 p-4">
          <div className="font-display text-4xl sm:text-5xl font-semibold text-[#1d1d1f] tracking-tight">
            {formatStat(94, statProgress, '', '%')}
          </div>
          <div className="text-xs font-mono text-[#0066cc] uppercase tracking-wider font-semibold">
            Human Intent Metric
          </div>
          <div className="text-xs text-[#707070]">
            Zero black-box offloading · Student controls all geometry
          </div>
        </div>

        <div className="space-y-1 p-4 border-y md:border-y-0 md:border-x border-[#e6e6e8]">
          <div className="font-display text-4xl sm:text-5xl font-semibold text-[#30D158] tracking-tight">
            {formatStat(34.2, statProgress, '+', '%', 1)}
          </div>
          <div className="text-xs font-mono text-[#30D158] uppercase tracking-wider font-semibold">
            Learning Gain Delta
          </div>
          <div className="text-xs text-[#707070]">
            From baseline diagnostic (61.8%) to verified capstone (96.0%)
          </div>
        </div>

        <div className="space-y-1 p-4">
          <div className="font-display text-4xl sm:text-5xl font-semibold text-[#1d1d1f] tracking-tight">
            {statProgress > 0.5 ? '1:8' : '1:1'}
          </div>
          <div className="text-xs font-mono text-[#b64400] uppercase tracking-wider font-semibold">
            Mentor Ratio Guarantee
          </div>
          <div className="text-xs text-[#707070]">
            Capped cohorts with real-time facilitator telemetry
          </div>
        </div>
      </div>

      {/* 4. Three Feature Pillars (Things Feature Heading Row Pattern) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        <Reveal
          variant="fade-up"
          index={0}
          className="rounded-[24px] bg-[#ffffff] border border-[#e6e6e8] shadow-[0_2px_8px_rgba(0,0,0,0.06)] p-8 space-y-4 hover:border-[#d6d6d6] transition-all"
        >
          <div className="w-10 h-10 rounded-[6px] bg-[#eef4ff] border border-[#2576eb]/20 flex items-center justify-center text-[#2576eb]">
            <Sparkles className="size-5" />
          </div>
          <h3 className="font-display text-2xl font-bold text-[#303336] tracking-tight">
            Human Judgment First.
          </h3>
          <p className="text-sm text-[#838b96] leading-[1.6]">
            <strong className="text-[#303336] font-medium">Zero cognitive offloading.</strong> We measure creative intent. Students formulate 5-part engineering prompts (PARTS), challenge AI hallucinations, and make every final architectural call.
          </p>
          <div className="pt-2 font-mono text-xs text-[#2576eb] font-medium">
            94% Human Intent Metric
          </div>
        </Reveal>

        <Reveal
          variant="fade-up"
          index={1}
          className="rounded-[24px] bg-[#ffffff] border border-[#e6e6e8] shadow-[0_2px_8px_rgba(0,0,0,0.06)] p-8 space-y-4 hover:border-[#d6d6d6] transition-all"
        >
          <div className="w-10 h-10 rounded-[6px] bg-[#fff9e6] border border-[#FFD60A]/30 flex items-center justify-center text-[#b68200]">
            <Box className="size-5" />
          </div>
          <h3 className="font-display text-2xl font-bold text-[#303336] tracking-tight">
            True Mathematical Volume.
          </h3>
          <p className="text-sm text-[#838b96] leading-[1.6]">
            <strong className="text-[#303336] font-medium">Beyond flat 2D screens.</strong> Young inventors manipulate X-Y-Z vertices, polygon meshes, and ergonomic sightlines—building genuine spatial computing intuition.
          </p>
          <div className="pt-2 font-mono text-xs text-[#b68200] font-medium">
            Watertight .STL &amp; .GLTF
          </div>
        </Reveal>

        <Reveal
          variant="fade-up"
          index={2}
          className="rounded-[24px] bg-[#ffffff] border border-[#e6e6e8] shadow-[0_2px_8px_rgba(0,0,0,0.06)] p-8 space-y-4 hover:border-[#d6d6d6] transition-all"
        >
          <div className="w-10 h-10 rounded-[6px] bg-[#e8f8ed] border border-[#30D158]/30 flex items-center justify-center text-[#1e8237]">
            <Printer className="size-5" />
          </div>
          <h3 className="font-display text-2xl font-bold text-[#303336] tracking-tight">
            Physical Manifestation.
          </h3>
          <p className="text-sm text-[#838b96] leading-[1.6]">
            <strong className="text-[#303336] font-medium">Ideas they can hold.</strong> Every virtual design is sliced, verified for structural integrity, and fabricated on our precision 3D printer farm in non-toxic, eco-friendly PLA.
          </p>
          <div className="pt-2 font-mono text-xs text-[#1e8237] font-medium">
            Handed Directly to Your Child
          </div>
        </Reveal>
      </div>
    </section>
  );
};
