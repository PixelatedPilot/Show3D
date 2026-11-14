import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Users,
  Award,
  Printer,
  Box,
  Lock,
  Cpu,
  Sparkles,
} from 'lucide-react';
import { FallingPhysicsStage } from './FallingPhysicsStage';
import { StickySubNav } from './StickySubNav';
import { HeroWordmark } from './HeroWordmark';
import { HighlightsGallery } from './HighlightsGallery';
import { PhilosophyReveal } from './PhilosophyReveal';
import { ProductMockupShowcase } from './ProductMockupShowcase';
import { MasterclassExplorer } from './MasterclassExplorer';
import { FAQS } from './landingContent';
import { useScrollRevealFallback } from '../../hooks/useScrollRevealFallback';
import { Reveal } from '../motion/Reveal';
import { ScrollWords } from '../motion/ScrollWords';

export interface LandingViewProps {
  onStartLearning: () => void;
  onOpenStudio?: () => void;
  onViewCurriculum: () => void;
  onOpenTeacherView: () => void;
  onSelectModule: (id: number) => void;
  onLaunchCanvasModal?: () => void;
  onOpenSafetyModal?: () => void;
  onOpenProcurementModal?: () => void;
  onOpenPedagogyModal?: () => void;
}

export const LandingView: React.FC<LandingViewProps> = ({
  onStartLearning,
  onOpenTeacherView,
  onSelectModule,
  onLaunchCanvasModal,
  onOpenSafetyModal,
  onOpenProcurementModal,
  onOpenPedagogyModal,
}) => {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const heroSentinelRef = useRef<HTMLDivElement | null>(null);

  // Progressive enhancement fallback for non-SDA browsers (Firefox)
  useScrollRevealFallback(scrollerRef);

  // Sticky Sub-Nav visibility: appears once user scrolls past hero sentinel
  const [isSubNavVisible, setIsSubNavVisible] = useState<boolean>(false);

  useEffect(() => {
    const sentinel = heroSentinelRef.current;
    const scroller = scrollerRef.current;
    if (!sentinel || !scroller) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // When hero sentinel leaves top, show sticky subnav
        setIsSubNavVisible(!entry.isIntersecting);
      },
      {
        root: scroller,
        threshold: 0.1,
      }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  // Outcomes Scroller Ref & Navigation
  const outcomesScrollerRef = useRef<HTMLDivElement | null>(null);

  const handleScrollOutcomes = (direction: 'prev' | 'next') => {
    const el = outcomesScrollerRef.current;
    if (!el) return;
    const scrollAmount = el.offsetWidth * 0.75;
    el.scrollBy({
      left: direction === 'next' ? scrollAmount : -scrollAmount,
      behavior: 'smooth',
    });
  };

  // Schedule Format Selection
  const [selectedFormat, setSelectedFormat] = useState<'holiday' | 'term'>('holiday');

  // FAQ Accordion
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setExpandedFaq(expandedFaq === idx ? null : idx);
  };

  return (
    <div
      ref={scrollerRef}
      className="flex-1 overflow-y-auto bg-[#000000] text-[#F5F5F7] font-sans selection:bg-[#0A84FF] selection:text-white relative"
    >
      {/* ========================================================================= */}
      {/* 1. STICKY SUB-NAV: Appears on scroll past hero                             */}
      {/* ========================================================================= */}
      <StickySubNav
        isVisible={isSubNavVisible}
        onBookSeat={onStartLearning}
      />

      {/* ========================================================================= */}
      {/* 2. APPLE HERO: Giant Chrome "3D" Wordmark + Live Floating Three.js Model    */}
      {/* ========================================================================= */}
      <HeroWordmark
        scrollerRef={scrollerRef}
        onStartLearning={onStartLearning}
        onExploreTracks={() => {
          const el = document.getElementById('lineup');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        onDefyGravity={() => {
          const el = document.getElementById('gravity-lab');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Sentinel marker to toggle Sticky Sub-Nav */}
      <div ref={heroSentinelRef} className="h-1 w-full" aria-hidden="true" />

      {/* ========================================================================= */}
      {/* 3. HIGHLIGHTS GALLERY: Horizontal Snap Carousel with Peeking Neighbors     */}
      {/* ========================================================================= */}
      <HighlightsGallery
        onSelectModule={onSelectModule}
        onLaunchCanvasModal={onLaunchCanvasModal}
      />

      {/* ========================================================================= */}
      {/* 4. THE PHILOSOPHY: Word-by-word text reveal + Count-up stats + 3 pillars    */}
      {/* ========================================================================= */}
      <PhilosophyReveal />

      {/* ========================================================================= */}
      {/* 5. THINGS DUAL-CARD MOCKUP SHOWCASE: Tilted student & teacher workbenches  */}
      {/* ========================================================================= */}
      <ProductMockupShowcase
        onStartLearning={onStartLearning}
        onOpenTeacherView={onOpenTeacherView}
      />

      {/* ========================================================================= */}
      {/* 6. MASTERCLASS EXPLORER: Scale-in stage + 6 pills + live Three.js Viewport */}
      {/* ========================================================================= */}
      <MasterclassExplorer
        onSelectModule={onSelectModule}
        onLaunchCanvasModal={onLaunchCanvasModal}
      />

      {/* ========================================================================= */}
      {/* 7. TANGIBLE PROOF: Studio Mist full-bleed band + 2-up Proof Scroller       */}
      {/* ========================================================================= */}
      <section
        id="outcomes"
        className="py-24 bg-[#0E0E10] text-left"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 space-y-4">
            <Reveal variant="fade-up">
              <span className="text-xs font-mono uppercase tracking-widest text-[#30D158] font-semibold block">
                Tangible Outcomes &amp; Proof of Work
              </span>
            </Reveal>

            <Reveal variant="fade-up" index={1}>
              <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-[1.08]">
                Nothing stays trapped
                <br />
                <span className="text-[#86868B]">inside a browser.</span>
              </h2>
            </Reveal>

            <Reveal variant="fade-up" index={2}>
              <p className="text-base sm:text-lg text-[#86868B] leading-relaxed">
                Most enrichment camps leave students with a forgotten folder of digital files. Show3D creations graduate into the physical world—giving your child tangible evidence of mastery that builds lasting confidence for school and beyond.
              </p>
            </Reveal>
          </div>

          {/* Apple Blur-to-Sharp Featured Outcome Panel */}
          <Reveal
            variant="blur-in"
            className="mb-12 rounded-[28px] bg-gradient-to-br from-[#1C1C1E] to-[#0E0E10] border border-white/[0.1] shadow-2xl p-8 sm:p-12 text-left relative overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-7 space-y-4 z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#30D158]/10 border border-[#30D158]/30 text-[#30D158] text-xs font-mono font-medium">
                  <Printer className="size-3.5" />
                  <span>PRECISION 3D PRINT FARM GRADUATION</span>
                </div>
                <h3 className="font-display text-2xl sm:text-4xl font-semibold text-white tracking-tight">
                  Designed on screen. Held in their hands.
                </h3>
                <p className="text-sm sm:text-base text-[#86868B] leading-relaxed">
                  Before fabrication, your child runs structural wall-thickness slicing diagnostics. Our fleet of precision printers builds their watertight model in biodegradable, non-toxic PLA—ready to present to parents on graduation day.
                </p>
                <div className="flex flex-wrap items-center gap-4 pt-2 font-mono text-xs text-[#30D158] font-semibold">
                  <span>✓ Zero Shell Breaches</span>
                  <span>·</span>
                  <span>✓ 94% Human Creative Intent</span>
                  <span>·</span>
                  <span>✓ DSA Portfolio Ready</span>
                </div>
              </div>

              {/* Visual SVG Certificate & Print Display Plate */}
              <div className="md:col-span-5 flex items-center justify-center p-4">
                <div className="w-full max-w-sm rounded-[18px] bg-[#000000]/60 border border-white/[0.12] p-6 space-y-4 shadow-xl text-left backdrop-blur-md">
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                    <div className="flex items-center gap-2">
                      <Award className="size-5 text-[#30D158]" />
                      <span className="font-mono text-xs text-white font-bold">MOE 21CC VERIFIED</span>
                    </div>
                    <span className="text-[10px] font-mono text-[#86868B]">TPSS-2026-0842</span>
                  </div>

                  <div className="space-y-1">
                    <div className="text-[10px] font-mono uppercase text-[#86868B]">CAPSTONE INVENTOR</div>
                    <div className="text-base font-bold text-white">Ethan Tan · Class 3-Faith</div>
                    <div className="text-xs text-[#30D158] font-mono">94.0% Human Creative Intent</div>
                  </div>

                  <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between text-[11px] text-[#86868B]">
                    <span>Physical PLA 3D Print</span>
                    <span className="text-white font-medium">Watertight .STL</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* 2-Up Proof Card Scroller with Header Controls */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#86868B] uppercase tracking-wider font-medium">
                Graduation Proof Stack
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleScrollOutcomes('prev')}
                  className="w-8 h-8 rounded-full bg-[#1C1C1E] hover:bg-[#2C2C2E] border border-white/[0.12] flex items-center justify-center text-white transition-colors"
                  aria-label="Previous proof card"
                >
                  <ChevronLeft className="size-4" />
                </button>
                <button
                  onClick={() => handleScrollOutcomes('next')}
                  className="w-8 h-8 rounded-full bg-[#1C1C1E] hover:bg-[#2C2C2E] border border-white/[0.12] flex items-center justify-center text-white transition-colors"
                  aria-label="Next proof card"
                >
                  <ChevronRight className="size-4" />
                </button>
              </div>
            </div>

            <div
              ref={outcomesScrollerRef}
              className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory py-2"
            >
              {[
                {
                  icon: Printer,
                  accent: '#30D158',
                  tint: '#30D15815',
                  title: 'Physical 3D Print',
                  desc: 'Fabricated in eco-friendly PLA on our precision printer farm and handed directly to your child to display proudly.',
                  tag: 'Tangible Proof of Work',
                },
                {
                  icon: Award,
                  accent: '#0A84FF',
                  tint: '#0A84FF15',
                  title: 'Verified DSA Credential',
                  desc: 'Verifiable certificate ID documenting MOE 21CC alignment and 94% Human Intent score for school portfolios.',
                  tag: 'MOE 21CC & DSA Ready',
                },
                {
                  icon: Users,
                  accent: '#FF9F0A',
                  tint: '#FF9F0A15',
                  title: 'Parent Showcase Pitch',
                  desc: 'Parents are invited to watch their child articulate their design brief, curvature trade-offs, and engineering decisions.',
                  tag: 'Final Day Graduation Pitch',
                },
                {
                  icon: Box,
                  accent: '#64D2FF',
                  tint: '#64D2FF15',
                  title: '30-Day Studio Access',
                  desc: 'Students retain full browser access after camp to continue designing, refining, and exporting 3D meshes at home.',
                  tag: 'Runs in Any Web Browser',
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="snap-start shrink-0 w-[82vw] sm:w-[45vw] lg:w-[28vw] rounded-[28px] bg-[#1C1C1E] border border-white/[0.08] p-7 flex flex-col justify-between space-y-6 hover:border-white/[0.2] transition-all text-left"
                >
                  <div className="space-y-4">
                    <div
                      className="w-12 h-12 rounded-[14px] flex items-center justify-center border"
                      style={{
                        backgroundColor: item.tint,
                        borderColor: `${item.accent}30`,
                        color: item.accent,
                      }}
                    >
                      <item.icon className="size-6" />
                    </div>
                    <h4 className="font-display text-xl font-semibold text-white tracking-tight">
                      {item.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#86868B] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <div
                    className="pt-4 border-t border-white/[0.08] text-xs font-mono font-semibold"
                    style={{ color: item.accent }}
                  >
                    {item.tag}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. INTERACTIVE PHYSICS SANDBOX: Gallery White full-bleed band               */}
      {/* ========================================================================= */}
      <section
        id="gravity-lab"
        className="py-24 bg-[#000000] text-left"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 space-y-3">
            <Reveal variant="fade-up">
              <span className="text-xs font-mono uppercase tracking-widest text-[#0A84FF] font-semibold block">
                Spatial Intuition in Action
              </span>
            </Reveal>

            <Reveal variant="fade-up" index={1}>
              <h2 className="font-display text-3xl sm:text-5xl font-semibold tracking-tight text-white">
                Defy gravity.
              </h2>
            </Reveal>

            <Reveal variant="fade-up" index={2}>
              <p className="text-base sm:text-lg text-[#86868B] leading-relaxed">
                Drag, toss, or invert gravity. Our real-time physics sandbox gives students immediate tactile feedback on mass, elasticity, and spatial collisions—grounding artificial intelligence in the immutable laws of physics.
              </p>
            </Reveal>
          </div>

          {/* Apple 3D Perspective Slide-In Reveal on Physics Sandbox */}
          <Reveal variant="slide-persp">
            <FallingPhysicsStage onSelectModule={onSelectModule} />
          </Reveal>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. CHILD SAFETY & PRIVACY: Things Cool Mist band + 4 White Feature Cards    */}
      {/* ========================================================================= */}
      <section
        id="safety"
        className="py-24 bg-[#0E0E10] text-left"
      >
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-4 mb-16">
            <Reveal variant="fade-up">
              <span className="text-xs font-mono uppercase tracking-widest text-[#30D158] font-semibold block">
                Privacy &amp; Child Protection
              </span>
            </Reveal>

            <Reveal variant="fade-up" index={1}>
              <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-[1.08]">
                Child privacy.
                <br />
                <span className="text-[#86868B]">Built in from the first click.</span>
              </h2>
            </Reveal>

            <div className="pt-4 max-w-2xl mx-auto text-base sm:text-xl text-[#86868B] leading-relaxed">
              <ScrollWords
                segments={[
                  { text: 'In an era of unchecked algorithmic scraping, your child’s privacy is non-negotiable.', emphasis: false },
                  { text: 'Show3D guarantees zero model training on student prompts or 3D meshes.', emphasis: true },
                  { text: 'Clean, safe, and distraction-free.', emphasis: false },
                ]}
                emphasisColor="#30D158"
              />
            </div>
          </div>

          {/* 4 Apple Privacy Feature Columns with Staggered Reveal */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {[
              {
                icon: Lock,
                accent: '#30D158',
                tint: '#30D15815',
                title: 'Zero Model Training',
                desc: 'Your child’s ideas, creative prompts, and 3D geometries are strictly private. They are never used to train public AI models.',
              },
              {
                icon: ShieldCheck,
                accent: '#0A84FF',
                tint: '#0A84FF15',
                title: 'Singapore PDPA Compliant',
                desc: 'Certified for Singapore Age 13+ safety requirements with automated safe-prompt content moderation and data minimization.',
              },
              {
                icon: Users,
                accent: '#FF9F0A',
                tint: '#FF9F0A15',
                title: '1:8 Mentor Ratio',
                desc: 'Small cohorts capped at 16 students led by 2 trained educators. Real-time telemetry ensures immediate personal support.',
              },
              {
                icon: Cpu,
                accent: '#64D2FF',
                tint: '#64D2FF15',
                title: 'Port 443 Web Native',
                desc: 'Runs in any modern browser. 100% compatible with school-issued MOE Personal Learning Devices (Chromebooks, iPads, Windows).',
              },
            ].map((item, idx) => (
              <Reveal
                key={idx}
                variant="fade-up"
                index={idx}
                className="rounded-[28px] bg-[#1C1C1E] border border-white/[0.08] p-7 space-y-3 hover:border-white/[0.2] transition-all"
              >
                <div
                  className="w-10 h-10 rounded-[10px] flex items-center justify-center border"
                  style={{
                    backgroundColor: item.tint,
                    borderColor: `${item.accent}30`,
                    color: item.accent,
                  }}
                >
                  <item.icon className="size-5" />
                </div>
                <h3 className="font-display text-lg font-semibold text-white">
                  {item.title}
                </h3>
                <p className="text-xs text-[#86868B] leading-relaxed">
                  {item.desc}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. THE LINEUP: Gallery White full-bleed band + Age Cohorts                */}
      {/* ========================================================================= */}
      <section
        id="lineup"
        className="py-24 bg-[#000000] text-left"
      >
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16 space-y-4">
            <Reveal variant="fade-up">
              <span className="text-xs font-mono uppercase tracking-widest text-[#0A84FF] font-semibold block">
                Age-Calibrated Cohorts
              </span>
            </Reveal>

            <Reveal variant="fade-up" index={1}>
              <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-[1.08]">
                Calibrated for every stage
                <br />
                <span className="text-[#86868B]">of growth.</span>
              </h2>
            </Reveal>

            <Reveal variant="fade-up" index={2}>
              <p className="text-base sm:text-lg text-[#86868B] leading-relaxed">
                Whether your child is taking their first steps beyond 2D screens or preparing an architectural portfolio for university admission, Show3D meets them with appropriate rigor.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left 7 Columns: 3 Age Tracks */}
            <div className="lg:col-span-7 space-y-4 text-left flex flex-col justify-between">
              {[
                {
                  age: 'UPPER PRIMARY · AGES 10–12',
                  title: 'Junior Creator Track',
                  project: 'Original 3D Desk Companion, Custom Mascot, or Study Organizer',
                  skills: 'Playful spatial vocabulary, X-Y-Z orientation, early DSA portfolio confidence.',
                  badge: 'Max 8 per mentor · Beginner Friendly',
                  accent: '#30D158',
                  tint: '#30D15815',
                },
                {
                  age: 'SECONDARY 1–4 · AGES 13–16 (MOST POPULAR)',
                  title: 'Teen Innovator Track',
                  project: 'Courtyard Tensile Solar Pavilion or Sustainable Urban Prototype',
                  skills: 'PARTS prompt engineering, parametric levers, mesh slicing & 94% Human Intent score.',
                  badge: 'MOE D&T & 21CC Aligned',
                  accent: '#0A84FF',
                  tint: '#0A84FF15',
                },
                {
                  age: 'JC, ITE & POLYTECHNIC · AGES 16–20',
                  title: 'Young Specialist Track',
                  project: 'Portfolio-Grade Architectural Capstone or Industrial Product Prototype',
                  skills: 'Advanced polygon topology, boolean tolerances, and .GLTF / Blender / CAD workflows.',
                  badge: 'University & Career Portfolio',
                  accent: '#FF9F0A',
                  tint: '#FF9F0A15',
                },
              ].map((tier, i) => (
                <Reveal
                  key={i}
                  variant="fade-up"
                  index={i}
                  className="rounded-[24px] bg-[#1C1C1E] border border-white/[0.08] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-white/[0.2] transition-all"
                >
                  <div className="space-y-1.5 max-w-xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold"
                        style={{ backgroundColor: tier.tint, color: tier.accent }}
                      >
                        {tier.age}
                      </span>
                      <span className="text-[11px] font-mono text-[#86868B]">{tier.badge}</span>
                    </div>
                    <h3 className="font-display text-xl font-semibold text-white">{tier.title}</h3>
                    <p className="text-xs text-white">
                      <strong className="text-[#86868B] font-normal">Capstone: </strong>
                      {tier.project}
                    </p>
                    <p className="text-xs text-[#86868B]">{tier.skills}</p>
                  </div>

                  <button
                    onClick={onStartLearning}
                    className="px-4 py-2.5 rounded-full bg-[#2C2C2E] hover:bg-[#3A3A3C] text-white border border-white/[0.1] text-xs font-semibold shrink-0 self-start sm:self-center flex items-center gap-1.5 transition-colors"
                  >
                    <span>Try Track</span>
                    <ArrowRight className="size-3.5" />
                  </button>
                </Reveal>
              ))}
            </div>

            {/* Right 5 Columns: Schedule & Tuition Box */}
            <Reveal
              variant="fade-up"
              index={3}
              className="lg:col-span-5 rounded-[28px] bg-[#1C1C1E] border border-white/[0.08] p-6 sm:p-8 flex flex-col justify-between text-left"
            >
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#30D158]/10 text-[#30D158] text-[11px] font-mono font-medium">
                  <span>FLEXIBLE COHORT FORMATS</span>
                </div>
                <h3 className="font-display text-2xl font-semibold text-white">
                  Choose the schedule that fits your family
                </h3>

                <div className="grid grid-cols-2 gap-2 p-1 rounded-full bg-[#000000]/60 border border-white/[0.08]">
                  <button
                    id="format-holiday-btn"
                    onClick={() => setSelectedFormat('holiday')}
                    className={`py-2 px-3 rounded-full text-xs font-semibold transition-all ${
                      selectedFormat === 'holiday'
                        ? 'bg-[#2C2C2E] text-white shadow-sm'
                        : 'text-[#86868B] hover:text-white'
                    }`}
                  >
                    5-Day Holiday Camp
                  </button>
                  <button
                    id="format-term-btn"
                    onClick={() => setSelectedFormat('term')}
                    className={`py-2 px-3 rounded-full text-xs font-semibold transition-all ${
                      selectedFormat === 'term'
                        ? 'bg-[#2C2C2E] text-white shadow-sm'
                        : 'text-[#86868B] hover:text-white'
                    }`}
                  >
                    6-Week Weekend Lab
                  </button>
                </div>

                <p className="text-xs sm:text-sm text-[#86868B] leading-relaxed pt-2">
                  {selectedFormat === 'holiday'
                    ? 'Runs during Singapore March, June, September & Nov/Dec school holidays (Mon–Fri, 9:00am–12:30pm or 1:30pm–5:00pm). Includes physical 3D print graduation.'
                    : 'Runs during school terms on Saturdays or Sundays (2.0 hours per weekly session over 6 weeks). Paced for zero exam stress and deep portfolio building.'}
                </p>

                <div className="space-y-2.5 pt-2">
                  {[
                    { label: 'Tuition Rate', value: '$399 / child (5-day camp)' },
                    { label: 'Cohort Size', value: 'Small cohorts (8–10 students)' },
                    { label: 'Instructor Ratio', value: '1:8 dedicated STEM mentorship' },
                    { label: 'Physical Deliverable', value: 'Custom 3D print in eco-PLA' },
                    { label: 'Credential', value: 'MOE 21CC & DSA Verified Certificate' },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-[#000000]/40 border border-white/[0.06] flex items-center justify-between text-xs"
                    >
                      <span className="text-[#86868B]">{item.label}</span>
                      <span className="font-medium text-white">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/[0.08] flex items-center justify-between">
                <span className="text-xs text-[#86868B]">100% web-based over Port 443</span>
                <button
                  onClick={onStartLearning}
                  className="text-xs font-semibold text-[#0A84FF] hover:underline flex items-center gap-1"
                >
                  <span>Sample Lesson</span>
                  <ArrowRight className="size-3.5" />
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 11. THE TRUST VAULT: Studio Mist band + FAQ Accordion + Conversion Cards   */}
      {/* ========================================================================= */}
      <section
        id="faq"
        className="py-24 bg-[#0E0E10] text-left"
      >
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left 7 Columns: Parent FAQ Accordion */}
            <div className="lg:col-span-7 text-left space-y-6">
              <Reveal variant="fade-up">
                <span className="text-xs font-mono uppercase tracking-widest text-[#0A84FF] font-semibold block mb-2">
                  Parent Questions Answered
                </span>
                <h2 className="font-display text-3xl sm:text-5xl font-semibold tracking-tight text-white">
                  Everything you need to know before enrolling.
                </h2>
              </Reveal>

              <div className="space-y-3">
                {FAQS.map((faq, idx) => (
                  <div
                    key={idx}
                    className="rounded-[24px] bg-[#1C1C1E] border border-white/[0.08] overflow-hidden transition-colors"
                  >
                    <button
                      id={`faq-toggle-${idx}`}
                      onClick={() => toggleFaq(idx)}
                      className="w-full py-4 sm:py-5 px-5 sm:px-6 min-h-[48px] text-left flex items-center justify-between text-sm sm:text-base font-semibold text-white hover:text-[#0A84FF] transition-colors"
                    >
                      <span>{faq.question}</span>
                      {expandedFaq === idx ? (
                        <ChevronUp className="size-4 text-[#0A84FF] shrink-0 ml-4" />
                      ) : (
                        <ChevronDown className="size-4 text-[#86868B] shrink-0 ml-4" />
                      )}
                    </button>

                    {expandedFaq === idx && (
                      <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-[#86868B] leading-relaxed border-t border-white/[0.08] animate-in fade-in duration-200">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right 5 Columns: Dual Action Cards */}
            <div className="lg:col-span-5 space-y-6 text-left">
              
              {/* Card 1: For Parents & Young Creators */}
              <Reveal
                variant="fade-up"
                className="rounded-[28px] bg-gradient-to-b from-[#1C1C1E] to-[#121214] border border-[#0A84FF]/30 shadow-xl p-7 sm:p-8 space-y-5"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0A84FF]/10 text-[#0A84FF] text-[11px] font-mono font-medium">
                  <span>LIMITED COHORT SEATS</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                  Ready to shape the 3D world?
                </h3>
                <p className="text-sm text-[#86868B] leading-relaxed">
                  Test-drive our interactive Student Lab right now in your browser, or review our child safety architecture.
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <button
                    id="cta-launch-student-lab"
                    onClick={onStartLearning}
                    className="px-6 py-3.5 rounded-full bg-[#0A84FF] hover:bg-[#0071E3] text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-sm active:scale-95 transition-all"
                  >
                    <span>Launch Student Lab</span>
                    <ArrowRight className="size-4" />
                  </button>
                  {onOpenSafetyModal && (
                    <button
                      id="cta-open-safety-modal"
                      onClick={onOpenSafetyModal}
                      className="px-5 py-3.5 rounded-full bg-[#2C2C2E] hover:bg-[#3A3A3C] text-white border border-white/[0.1] font-medium text-xs sm:text-sm flex items-center gap-2 transition-colors"
                    >
                      <ShieldCheck className="size-4 text-[#30D158]" />
                      <span>Safety &amp; PDPA</span>
                    </button>
                  )}
                </div>
              </Reveal>

              {/* Card 2: For Institutional School Partners & D&T Educators */}
              <Reveal
                variant="fade-up"
                index={1}
                className="rounded-[28px] bg-[#1C1C1E] border border-white/[0.08] p-7 sm:p-8 space-y-5"
                id="schools"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF9F0A]/10 text-[#FF9F0A] text-[11px] font-mono font-medium">
                  <span>INSTITUTIONAL &amp; SCHOOL PARTNERS</span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-semibold text-white tracking-tight">
                  School Head, D&amp;T Teacher, or Enrichment Partner?
                </h3>
                <p className="text-xs sm:text-sm text-[#86868B] leading-relaxed">
                  Show3D deploys as a turnkey “Vendor-Taught, Teacher-Facilitated” programme—complete with a 28-student live Facilitator Command Hub, MOE “Four Learns” rubrics, and GeBIZ quotation packs.
                </p>
                <div className="flex flex-wrap items-center gap-2.5 pt-1">
                  <button
                    id="cta-open-instructor-hub"
                    onClick={onOpenTeacherView}
                    className="px-5 py-2.5 rounded-full bg-[#0A84FF] hover:bg-[#0071E3] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
                  >
                    <Users className="size-3.5" />
                    <span>Facilitator Command Hub</span>
                  </button>
                  {onOpenProcurementModal && (
                    <button
                      id="cta-open-procurement-modal"
                      onClick={onOpenProcurementModal}
                      className="px-4 py-2.5 rounded-full bg-[#2C2C2E] hover:bg-[#3A3A3C] text-white border border-white/[0.1] text-xs font-medium flex items-center gap-1.5 transition-colors"
                    >
                      <span>GeBIZ &amp; Funding Pack</span>
                      <ArrowUpRight className="size-3.5 text-[#FF9F0A]" />
                    </button>
                  )}
                  {onOpenPedagogyModal && (
                    <button
                      id="cta-open-pedagogy-modal"
                      onClick={onOpenPedagogyModal}
                      className="px-4 py-2.5 rounded-full bg-[#2C2C2E] hover:bg-[#3A3A3C] text-[#86868B] hover:text-white border border-white/[0.1] text-xs font-medium flex items-center gap-1.5 transition-colors"
                    >
                      <span>MOE Pedagogy</span>
                    </button>
                  )}
                </div>
              </Reveal>

            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 12. FINALE CTA: "Give your child the unfair advantage of creative agency." */}
      {/* ========================================================================= */}
      <section className="py-24 bg-[#000000] text-center">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal variant="fade-up" className="max-w-3xl mx-auto space-y-6">
            <h2 className="font-display text-4xl sm:text-6xl font-semibold tracking-tight text-white leading-tight">
              Give your child the unfair advantage of creative agency.
            </h2>
            <p className="text-base sm:text-xl text-[#86868B] leading-relaxed">
              Cohorts are strictly limited to 16 students with a 1:8 mentor ratio. Reserve your child’s seat in the upcoming school holiday cohort, or explore a free sample lesson now.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                onClick={onStartLearning}
                className="px-8 py-4 rounded-full bg-[#0A84FF] hover:bg-[#0071E3] text-white font-semibold text-base flex items-center gap-2 shadow-sm transition-all active:scale-95"
              >
                <span>Launch Interactive Lesson</span>
                <ArrowRight className="size-5" />
              </button>
              {onOpenSafetyModal && (
                <button
                  onClick={onOpenSafetyModal}
                  className="px-6 py-4 rounded-full bg-[#1C1C1E] hover:bg-[#2C2C2E] text-white border border-white/[0.12] font-medium text-base flex items-center gap-2 transition-colors"
                >
                  <ShieldCheck className="size-5 text-[#30D158]" />
                  <span>Read Safety &amp; PDPA Spec</span>
                </button>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 13. APPLE HIG STUDIO MIST FOOTER                                          */}
      {/* ========================================================================= */}
      <footer className="border-t border-white/[0.08] bg-[#0E0E10] py-14 px-4 sm:px-6 lg:px-8 text-xs text-[#86868B]">
        <div className="max-w-[1380px] mx-auto space-y-10">
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-white/[0.08]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#1C1C1E] border border-white/[0.12] flex items-center justify-center text-[#0A84FF] shadow-sm">
                <Box className="size-4" />
              </div>
              <div>
                <span className="font-display font-semibold text-white text-base">Show3D Academy</span>
                <span className="text-[#86868B] ml-2">· Spatial AI &amp; 3D Creator Programme</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#86868B] mr-2">
                Environments:
              </span>
              <button
                onClick={onStartLearning}
                className="px-3.5 py-1.5 rounded-full bg-[#1C1C1E] hover:bg-[#2C2C2E] text-[#F5F5F7] border border-white/[0.12] transition-colors"
              >
                Student Keynote Lab
              </button>
              <button
                onClick={onOpenTeacherView}
                className="px-3.5 py-1.5 rounded-full bg-[#1C1C1E] hover:bg-[#2C2C2E] text-[#F5F5F7] border border-white/[0.12] transition-colors"
              >
                Facilitator Classroom Hub
              </button>
              {onLaunchCanvasModal && (
                <button
                  onClick={onLaunchCanvasModal}
                  className="px-3.5 py-1.5 rounded-full bg-[#1C1C1E] hover:bg-[#2C2C2E] text-[#0A84FF] border border-white/[0.12] transition-colors"
                >
                  Show3D WebGL Canvas
                </button>
              )}
              <a
                href="#gravity-lab"
                className="px-3.5 py-1.5 rounded-full bg-[#1C1C1E] hover:bg-[#2C2C2E] text-[#0A84FF] border border-white/[0.12] transition-colors"
              >
                Gravity Physics Lab
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-6">
              {onOpenSafetyModal && (
                <button onClick={onOpenSafetyModal} className="hover:text-white transition-colors">
                  Child Safety &amp; Singapore PDPA
                </button>
              )}
              {onOpenProcurementModal && (
                <button onClick={onOpenProcurementModal} className="hover:text-white transition-colors">
                  GeBIZ &amp; School Procurement
                </button>
              )}
              {onOpenPedagogyModal && (
                <button onClick={onOpenPedagogyModal} className="hover:text-white transition-colors">
                  MOE Four Learns Framework
                </button>
              )}
            </div>

            <div className="font-mono text-[11px] text-[#86868B]">
              HTTPS Port 443 Verified · Zero Student Data AI Training
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
};
