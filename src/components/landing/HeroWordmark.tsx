import React, { useMemo, useState, useEffect, useRef } from 'react';
import { ArrowRight, Orbit, Sparkles, ChevronDown } from 'lucide-react';
import { Show3DViewport3D } from '../canvas/Show3DViewport3D';
import { INITIAL_CANVAS_STUDIO_STATE } from '../../utils/canvasStudioState';
import { PRICING_DETAILS } from './landingContent';

export interface HeroWordmarkProps {
  onStartLearning: () => void;
  onExploreTracks: () => void;
  onDefyGravity: () => void;
  scrollerRef?: React.RefObject<HTMLDivElement | null>;
}

export const HeroWordmark: React.FC<HeroWordmarkProps> = ({
  onStartLearning,
  onExploreTracks,
  onDefyGravity,
  scrollerRef,
}) => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Configured studio state for live floating 3D Pavilion in hero
  const heroStudioState = useMemo(() => {
    return {
      ...INITIAL_CANVAS_STUDIO_STATE,
      archetype: 'pavilion' as const,
      shadingMode: 'pbr' as const,
      cameraPreset: 'overview' as const,
      canopyColor: '#64D2FF',
      curvature: 0.68,
      hasSolar: true,
      autoRotate: true,
      showGrid: false,
      showAxes: false,
      pins: [],
    };
  }, []);

  // Track scroll progress within sticky track without wheel trapping
  useEffect(() => {
    // Check reduced motion preference
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setScrollProgress(1.0);
      return;
    }

    const scroller = scrollerRef?.current || window;
    let rafId: number | null = null;

    const computeProgress = () => {
      const track = trackRef.current;
      if (!track) return;

      const trackRect = track.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const totalScrollable = track.offsetHeight - viewportHeight;

      if (totalScrollable <= 0) {
        setScrollProgress(1.0);
        return;
      }

      // Track top relative to viewport: 0 when starting, -totalScrollable when finished
      const currentScroll = -trackRect.top;
      const raw = currentScroll / totalScrollable;
      const clamped = Math.min(1.0, Math.max(0.0, raw));
      setScrollProgress(clamped);
    };

    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        computeProgress();
      });
    };

    // Calculate immediately
    computeProgress();

    scroller.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      scroller.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [scrollerRef]);

  // Stage 1: 3D model goes behind giant "3D" text (p: 0.0 -> 0.42)
  const tModel = Math.min(1.0, Math.max(0.0, scrollProgress / 0.42));
  const easeModel = 1 - Math.pow(1 - tModel, 3);
  const modelScale = 1.0 - easeModel * 0.62; // 1.0 -> 0.38
  const modelTranslateY = -easeModel * 28;
  const isModelBehind = scrollProgress >= 0.24;
  const wordmarkScale = 0.94 + easeModel * 0.14; // 0.94 -> 1.08
  const wordmarkOpacity = 0.72 + easeModel * 0.28;

  // Stage 2: Typewriter headline "3D modelling for your child." (p: 0.28 -> 0.74)
  const fullHeadline = '3D modelling for your child.';
  const tType = Math.min(1.0, Math.max(0.0, (scrollProgress - 0.28) / 0.44));
  const charCount = Math.floor(tType * fullHeadline.length);
  const typedHeadline = fullHeadline.slice(0, charCount);
  const isTyping = scrollProgress >= 0.26 && tType < 1.0;

  // Stage 3: Subtitle, pitch, tuition pill, actions fade-in (p: 0.68 -> 1.0)
  const tActions = Math.min(1.0, Math.max(0.0, (scrollProgress - 0.68) / 0.30));
  const easeActions = 1 - Math.pow(1 - tActions, 2);
  const actionsOpacity = easeActions;
  const actionsTranslateY = (1 - easeActions) * 22;

  // Initial scroll hint prompt (visible at top)
  const promptOpacity = Math.max(0, 1 - scrollProgress * 5.5);

  return (
    <section
      ref={trackRef}
      id="hero"
      className="relative w-full h-[220vh] select-none bg-[#ffffff]"
      aria-label="Show3D Hero Scrollytelling"
    >
      {/* Sticky Fullscreen Container */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto overflow-hidden pt-4 pb-8">
        {/* Subtle Radial Ambient Spotlight Backdrop */}
        <div
          className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30"
          aria-hidden="true"
        >
          <div className="w-[600px] sm:w-[900px] h-[400px] sm:h-[600px] rounded-full bg-gradient-to-tr from-[#0071e3]/15 via-[#64D2FF]/10 to-[#30D158]/10 blur-[130px]" />
        </div>

        {/* Top Kicker Stack: Bare #b64400 Launch Status Label + 21px Product Kicker */}
        <div className="relative z-30 text-center max-w-3xl mx-auto pt-2 sm:pt-3 space-y-1">
          <div className="text-[12px] font-semibold text-[#b64400] tracking-[-0.12px] uppercase">
            New · Singapore School Holiday &amp; Term Cohorts
          </div>
          <div className="font-display text-[17px] sm:text-[21px] font-semibold tracking-[0.231px] text-[#1d1d1f]">
            Show3D Spatial AI Academy
          </div>
        </div>

        {/* Center Stage: Silver 3D Wordmark + Live Floating 3D Pavilion Model */}
        <div className="relative flex-1 flex flex-col items-center justify-center my-2 sm:my-3 min-h-0">
          {/* Giant Machined Silver/Graphite "3D" Wordmark */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none transition-transform duration-75"
            style={{
              zIndex: isModelBehind ? 25 : 10,
              transform: `scale(${wordmarkScale})`,
              opacity: wordmarkOpacity,
            }}
            aria-hidden="true"
          >
            <span
              className="s3d-silver-wordmark font-display font-black tracking-tighter leading-none drop-shadow-[0_15px_35px_rgba(0,0,0,0.12)]"
              style={{
                fontSize: 'clamp(140px, 28vw, 420px)',
                letterSpacing: '-0.06em',
              }}
            >
              3D
            </span>
          </div>

          {/* Live Three.js Pavilion Canvas Floating & Receding Behind 3D Wordmark */}
          <div
            className="relative w-full max-w-2xl h-[300px] sm:h-[400px] lg:h-[460px] flex items-center justify-center transition-all duration-75"
            style={{
              zIndex: isModelBehind ? 10 : 20,
              transform: `scale(${modelScale}) translateY(${modelTranslateY}px)`,
              opacity: scrollProgress < 0.1 ? 1 : 0.9 + (1 - tModel) * 0.1,
            }}
          >
            <Show3DViewport3D
              studioState={heroStudioState}
              compact
              smoothCamera
              transparentHero
            />
          </div>

          {/* Floating Interactive Badge Indicator */}
          <div
            className="relative z-30 mt-1 px-3.5 py-1 rounded-full bg-[#ffffff]/85 border border-[#e6e6e8] backdrop-blur-md text-[11px] font-mono text-[#707070] flex items-center gap-2 shadow-sm transition-opacity duration-200"
            style={{
              opacity: Math.max(0, 1 - scrollProgress * 3),
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#30D158] animate-pulse" />
            <span>Interactive WebGL 3D Model · Drag to Orbit</span>
          </div>

          {/* Gentle Scroll Prompt (Visible when at top) */}
          {promptOpacity > 0.05 && (
            <div
              className="absolute bottom-1 sm:bottom-3 flex items-center gap-2 text-xs font-mono text-[#707070] transition-opacity duration-150 pointer-events-none"
              style={{ opacity: promptOpacity }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#0071e3] animate-ping" />
              <span>Scroll down to explore</span>
              <ChevronDown className="size-3.5 animate-bounce text-[#0071e3]" />
            </div>
          )}
        </div>

        {/* Bottom Stage: SF Pro Display 80px Headline + Floating Pricing Callout Capsule */}
        <div
          className="relative z-30 pt-3 sm:pt-4 border-t border-[#e6e6e8] w-full transition-opacity duration-150"
          style={{
            opacity: scrollProgress >= 0.22 ? 1 : Math.max(0, scrollProgress * 4.5),
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-end">
            {/* Left: 80px Headline & Editorial Pitch */}
            <div className="lg:col-span-7 text-left space-y-2">
              <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-[-1.2px] text-[#1d1d1f] leading-[1.05] min-h-[1.25em]">
                <span>{typedHeadline}</span>
                {isTyping && (
                  <span className="inline-block w-0.5 sm:w-1 h-[0.9em] bg-[#0071e3] ml-1.5 align-baseline animate-pulse shadow-[0_0_8px_#0071e3]" />
                )}
              </h1>

              {/* Subtitle & Body Pitch */}
              <div
                className="space-y-1.5 transition-all duration-300"
                style={{
                  opacity: actionsOpacity,
                  transform: `translateY(${actionsTranslateY}px)`,
                }}
              >
                <p className="text-sm sm:text-base font-semibold text-[#0071e3]">
                  Your child won’t just use AI. They’ll command it.
                </p>
                <p className="text-xs sm:text-sm text-[#707070] max-w-[540px] font-normal leading-[1.6]">
                  Turn screen time into tangible engineering capability. Students direct 3D geometry with human judgment, formulaic PARTS prompting, and bring home an original physical invention.
                </p>
              </div>
            </div>

            {/* Right: Apple Floating Pricing Callout Capsule (DESIGN.md) */}
            <div
              className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-end gap-3 transition-all duration-300"
              style={{
                opacity: actionsOpacity,
                transform: `translateY(${actionsTranslateY}px)`,
              }}
            >
              {/* Floating Pricing Callout (28px radius, shadowless, 1px #e6e6e8 outline) */}
              <div className="p-4 sm:p-5 rounded-[28px] bg-[#ffffff] border border-[#e6e6e8] shadow-[0_4px_20px_rgba(0,0,0,0.06)] text-left lg:text-right space-y-3 w-full sm:w-auto">
                <div>
                  <div className="text-[11px] font-mono text-[#707070] uppercase tracking-wider">
                    {PRICING_DETAILS.cohortLimit}
                  </div>
                  <div className="text-sm font-semibold text-[#1d1d1f] flex items-center lg:justify-end gap-2">
                    <span className="text-[#30D158] font-mono font-bold">{PRICING_DETAILS.rateDetail}</span>
                  </div>
                </div>

                {/* Conversion Action Row: Pricing Blue Pill + Outlined Explore Pill */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <button
                    id="hero-start-learning-btn"
                    onClick={onStartLearning}
                    className="px-5 py-2.5 rounded-full bg-[#0071e3] hover:bg-[#0066cc] text-white font-normal text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
                  >
                    <span>Try Interactive Lesson</span>
                    <ArrowRight className="size-3.5" />
                  </button>

                  <button
                    onClick={onExploreTracks}
                    className="px-4 py-2.5 rounded-full bg-transparent hover:bg-black/5 text-[#1d1d1f] border border-[#86868b] text-xs sm:text-sm transition-all"
                  >
                    <span>Explore Tracks</span>
                  </button>

                  <button
                    onClick={onDefyGravity}
                    className="px-3 py-2.5 rounded-full bg-[#f5f5f7] hover:bg-[#e6e6e8] text-[#0071e3] border border-[#d6d6d6] text-xs sm:text-sm flex items-center gap-1 transition-all"
                    title="Jump to Matter.js Physics Sandbox"
                  >
                    <Orbit className="size-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
