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
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-[1380px] mx-auto border-t border-white/[0.08]"
    >
      {/* 1. Apple Centered Headline Lockup */}
      <div className="max-w-4xl mx-auto text-center space-y-4 mb-16">
        <Reveal variant="fade-up">
          <span className="text-xs font-mono uppercase tracking-widest text-[#0A84FF] block">
            A Major Upgrade to Screen Time
          </span>
        </Reveal>

        <Reveal variant="fade-up" index={1}>
          <h2 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-white leading-[1.08]">
            Screen time, transformed.
            <br />
            <span className="text-[#86868B]">From passive consumers to active inventors.</span>
          </h2>
        </Reveal>

        {/* 2. Word-by-Word Scroll Text Reveal */}
        <div className="pt-6 max-w-3xl mx-auto text-lg sm:text-2xl leading-relaxed font-normal">
          <ScrollWords
            segments={philosophyParagraph}
            emphasisColor="#FFFFFF"
          />
        </div>
      </div>

      {/* 3. Real-Time Telemetry Stats Count-Up Row */}
      <div
        ref={statsSectionRef}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 my-16 p-8 rounded-[32px] bg-[#1C1C1E]/60 border border-white/[0.08] backdrop-blur-xl text-center"
      >
        <div className="space-y-1 p-4">
          <div className="font-display text-4xl sm:text-5xl font-bold text-white tracking-tight">
            {formatStat(94, statProgress, '', '%')}
          </div>
          <div className="text-xs font-mono text-[#0A84FF] uppercase tracking-wider font-semibold">
            Human Intent Metric
          </div>
          <div className="text-xs text-[#86868B]">
            Zero black-box offloading · Student controls all geometry
          </div>
        </div>

        <div className="space-y-1 p-4 border-y md:border-y-0 md:border-x border-white/[0.08]">
          <div className="font-display text-4xl sm:text-5xl font-bold text-[#30D158] tracking-tight">
            {formatStat(34.2, statProgress, '+', '%', 1)}
          </div>
          <div className="text-xs font-mono text-[#30D158] uppercase tracking-wider font-semibold">
            Learning Gain Delta
          </div>
          <div className="text-xs text-[#86868B]">
            From baseline diagnostic (61.8%) to verified capstone (96.0%)
          </div>
        </div>

        <div className="space-y-1 p-4">
          <div className="font-display text-4xl sm:text-5xl font-bold text-white tracking-tight">
            {statProgress > 0.5 ? '1:8' : '1:1'}
          </div>
          <div className="text-xs font-mono text-[#FFD60A] uppercase tracking-wider font-semibold">
            Mentor Ratio Guarantee
          </div>
          <div className="text-xs text-[#86868B]">
            Capped cohorts with real-time facilitator telemetry
          </div>
        </div>
      </div>

      {/* 4. Three Feature Pillars (Tricolon) with Staggered Reveal */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        <Reveal
          variant="fade-up"
          index={0}
          className="rounded-[28px] bg-[#1C1C1E] border border-white/[0.08] p-8 space-y-4 hover:border-white/[0.18] transition-all"
        >
          <div className="w-12 h-12 rounded-2xl bg-[#0D2137] border border-[#0A84FF]/30 flex items-center justify-center text-[#0A84FF]">
            <Sparkles className="size-6" />
          </div>
          <h3 className="font-display text-2xl font-bold text-white tracking-tight">
            Human Judgment First.
          </h3>
          <p className="text-sm text-[#86868B] leading-relaxed">
            <strong className="text-white font-medium">Zero cognitive offloading.</strong> We measure creative intent. Students formulate 5-part engineering prompts (PARTS), challenge AI hallucinations, and make every final architectural call.
          </p>
          <div className="pt-2 font-mono text-xs text-[#0A84FF]">
            94% Human Intent Metric
          </div>
        </Reveal>

        <Reveal
          variant="fade-up"
          index={1}
          className="rounded-[28px] bg-[#1C1C1E] border border-white/[0.08] p-8 space-y-4 hover:border-white/[0.18] transition-all"
        >
          <div className="w-12 h-12 rounded-2xl bg-[#2C2405] border border-[#FFD60A]/30 flex items-center justify-center text-[#FFD60A]">
            <Box className="size-6" />
          </div>
          <h3 className="font-display text-2xl font-bold text-white tracking-tight">
            True Mathematical Volume.
          </h3>
          <p className="text-sm text-[#86868B] leading-relaxed">
            <strong className="text-white font-medium">Beyond flat 2D screens.</strong> Young inventors manipulate X-Y-Z vertices, polygon meshes, and ergonomic sightlines—building genuine spatial computing intuition.
          </p>
          <div className="pt-2 font-mono text-xs text-[#FFD60A]">
            Watertight .STL &amp; .GLTF
          </div>
        </Reveal>

        <Reveal
          variant="fade-up"
          index={2}
          className="rounded-[28px] bg-[#1C1C1E] border border-white/[0.08] p-8 space-y-4 hover:border-white/[0.18] transition-all"
        >
          <div className="w-12 h-12 rounded-2xl bg-[#0E2914] border border-[#30D158]/30 flex items-center justify-center text-[#30D158]">
            <Printer className="size-6" />
          </div>
          <h3 className="font-display text-2xl font-bold text-white tracking-tight">
            Physical Manifestation.
          </h3>
          <p className="text-sm text-[#86868B] leading-relaxed">
            <strong className="text-white font-medium">Ideas they can hold.</strong> Every virtual design is sliced, verified for structural integrity, and fabricated on our precision 3D printer farm in non-toxic, eco-friendly PLA.
          </p>
          <div className="pt-2 font-mono text-xs text-[#30D158]">
            Handed Directly to Your Child
          </div>
        </Reveal>
      </div>
    </section>
  );
};
