import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  ArrowUpRight,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { FEATURED_EXPERIMENTS, FeaturedCarouselItem } from './landingContent';
import { wrapIndex, nextAutoAdvance } from '../../utils/motionHelpers';
import { Reveal } from '../motion/Reveal';

export interface HighlightsGalleryProps {
  onSelectModule: (id: number) => void;
  onLaunchCanvasModal?: () => void;
}

export const HighlightsGallery: React.FC<HighlightsGalleryProps> = ({
  onSelectModule,
  onLaunchCanvasModal,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isInView, setIsInView] = useState<boolean>(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const touchStartXRef = useRef<number | null>(null);

  const totalSlides = FEATURED_EXPERIMENTS.length;

  // Track if gallery is currently visible in viewport so auto-advance only runs when on-screen
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Scroll target slide horizontally strictly within container WITHOUT vertical scrollIntoView
  const scrollToSlide = useCallback((idx: number) => {
    const container = containerRef.current;
    if (!container) return;
    const slides = container.querySelectorAll<HTMLElement>('.gallery-slide');
    const targetSlide = slides[idx];
    if (targetSlide) {
      const targetLeft =
        targetSlide.offsetLeft - (container.clientWidth - targetSlide.clientWidth) / 2;
      container.scrollTo({
        left: Math.max(0, targetLeft),
        behavior: 'smooth',
      });
      setActiveIndex(idx);
    }
  }, []);

  // 6-second auto-advance cadence matching Apple showcase - only runs when visible
  useEffect(() => {
    if (isPaused || !isInView) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => {
        const next = nextAutoAdvance(prev, totalSlides, false);
        scrollToSlide(next);
        return next;
      });
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, isInView, totalSlides, scrollToSlide]);

  // Synchronize active slide when user scrolls natively
  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;
    const scrollLeft = container.scrollLeft;
    const slideWidth = container.offsetWidth * 0.85;
    const newIdx = Math.round(scrollLeft / slideWidth);
    if (newIdx >= 0 && newIdx < totalSlides && newIdx !== activeIndex) {
      setActiveIndex(newIdx);
    }
  };

  const handlePrev = () => {
    const target = wrapIndex(activeIndex - 1, totalSlides);
    scrollToSlide(target);
  };

  const handleNext = () => {
    const target = wrapIndex(activeIndex + 1, totalSlides);
    scrollToSlide(target);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      handleNext();
    }
  };

  return (
    <section
      ref={sectionRef}
      id="highlights"
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto border-t border-white/[0.08]"
      aria-label="Product highlights"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 text-left">
        <Reveal variant="fade-up" className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-[#0A84FF] block">
            Featured Innovations
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Get the highlights.
          </h2>
        </Reveal>

        {onLaunchCanvasModal && (
          <button
            onClick={onLaunchCanvasModal}
            className="self-start sm:self-auto text-xs sm:text-sm font-medium text-[#0A84FF] hover:underline flex items-center gap-1.5"
          >
            <span>Open 3D Canvas Studio</span>
            <ExternalLink className="size-3.5" />
          </button>
        )}
      </div>

      {/* Snap Carousel Scroller with Peeking Neighbors */}
      <div
        className="relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        role="region"
        aria-roledescription="carousel"
        aria-label="Highlights slider"
      >
        <div
          ref={containerRef}
          onScroll={handleScroll}
          className="flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory py-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
        >
          {FEATURED_EXPERIMENTS.map((exp, idx) => {
            const isSelected = idx === activeIndex;

            return (
              <div
                key={exp.id}
                className={`gallery-slide snap-center shrink-0 w-[88vw] sm:w-[75vw] lg:w-[68vw] max-w-[980px] rounded-[32px] bg-[#1C1C1E] border border-white/[0.1] p-6 sm:p-10 flex flex-col justify-between overflow-hidden transition-all duration-300 ${
                  isSelected ? 'scale-100 opacity-100 shadow-2xl' : 'scale-[0.97] opacity-60 hover:opacity-80'
                }`}
                style={{
                  minHeight: '440px',
                }}
              >
                {/* Slide Top Metadata */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-white/[0.08]">
                  <div className="flex items-center gap-2">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-mono font-medium"
                      style={{ backgroundColor: exp.tintBg, color: exp.accentHex }}
                    >
                      {exp.tag}
                    </span>
                    <span className="text-[11px] font-mono text-[#86868B] hidden sm:inline">
                      {exp.moeDomain}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-[#86868B]">
                    0{idx + 1} / 0{totalSlides}
                  </span>
                </div>

                {/* Center Content & SVG Visual Representation */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center my-6 text-left">
                  <div className="md:col-span-7 space-y-4">
                    <h3 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
                      {exp.name}
                    </h3>
                    <p className="text-base sm:text-lg text-[#F5F5F7] font-medium leading-snug">
                      {exp.shortDesc}
                    </p>
                    <p className="text-sm text-[#86868B] leading-relaxed">
                      {exp.fullDesc}
                    </p>

                    <div className="pt-2">
                      <button
                        onClick={() => onSelectModule(exp.moduleId)}
                        className="px-5 py-3 rounded-full font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md active:scale-95"
                        style={{
                          backgroundColor: exp.accentHex,
                          color: exp.pillTextHex,
                        }}
                      >
                        <span>{exp.ctaLabel}</span>
                        <ArrowUpRight className="size-4" />
                      </button>
                    </div>
                  </div>

                  {/* Right Tonal Feature Visual Plate */}
                  <div
                    className="md:col-span-5 h-48 sm:h-56 rounded-2xl border border-white/[0.1] flex items-center justify-center p-6 relative overflow-hidden"
                    style={{ backgroundColor: exp.tintBg }}
                  >
                    {exp.id === 'pavilion' && (
                      <svg viewBox="0 0 240 140" className="w-full h-full">
                        <ellipse cx="120" cy="115" rx="90" ry="20" fill="#0A1828" stroke="#0A84FF" strokeWidth="1" />
                        <path d="M 120 30 Q 180 50 195 85 Q 150 105 120 90 Q 90 105 45 85 Q 60 50 120 30 Z" fill="#0A84FF" fillOpacity="0.4" stroke="#64D2FF" strokeWidth="2" />
                        <line x1="120" y1="30" x2="120" y2="115" stroke="#FFFFFF" strokeWidth="2" />
                        <circle cx="120" cy="30" r="4" fill="#30D158" />
                      </svg>
                    )}
                    {exp.id === 'prompt-forge' && (
                      <div className="flex flex-wrap items-center justify-center gap-2">
                        {['[P] Architect', '[A] 450W Shade', '[R] Secondary 3', '[T] Tensile White', '[S] 3mm Walls'].map((chip) => (
                          <span key={chip} className="px-2.5 py-1 rounded-full bg-[#000000]/80 border border-[#FFD60A]/40 text-[#FFD60A] font-mono text-[11px]">
                            {chip}
                          </span>
                        ))}
                      </div>
                    )}
                    {exp.id === 'material-lab' && (
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#FFFFFF] to-[#8E8E93] border-2 border-white/40 shadow-lg" title="High-Albedo White" />
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#30D158] to-[#0E2914] border-2 border-[#30D158]/50 shadow-lg" title="Biophilic Bamboo PLA" />
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#0A84FF] to-[#041E3A] border-2 border-[#0A84FF]/50 shadow-lg" title="Structural Blue Anodized" />
                      </div>
                    )}
                    {exp.id === 'peer-lab' && (
                      <svg viewBox="0 0 240 140" className="w-full h-full">
                        <line x1="40" y1="110" x2="200" y2="110" stroke="#86868B" strokeWidth="2" />
                        <line x1="90" y1="110" x2="160" y2="35" stroke="#FF375F" strokeWidth="3" strokeLinecap="round" />
                        <circle cx="160" cy="35" r="7" fill="#FF375F" />
                        <text x="110" y="75" fill="#FFD60A" fontSize="11" fontFamily="JetBrains Mono, monospace">60° SIGHTLINE</text>
                      </svg>
                    )}
                    {exp.id === 'dimension-3d' && (
                      <svg viewBox="0 0 240 140" className="w-full h-full">
                        <polygon points="120,20 185,55 185,105 120,125 55,105 55,55" fill="none" stroke="#64D2FF" strokeWidth="1.75" />
                        <line x1="120" y1="20" x2="120" y2="125" stroke="#64D2FF" strokeWidth="1" strokeDasharray="3 3" />
                        <circle cx="120" cy="20" r="4" fill="#FFFFFF" />
                        <circle cx="185" cy="55" r="4" fill="#64D2FF" />
                        <circle cx="55" cy="55" r="4" fill="#64D2FF" />
                      </svg>
                    )}
                  </div>
                </div>

                {/* Slide Bottom Footer */}
                <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs text-[#86868B]">
                  <span>Physical PLA 3D Print Included</span>
                  <span className="font-mono text-[11px] text-[#30D158]">Watertight &amp; Verified</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel Control Bar: Dot Indicators + Progress Pill + Play/Pause + Chevrons */}
        <div className="flex items-center justify-between pt-6 px-2">
          {/* Dot / Pill Indicators */}
          <div className="flex items-center gap-2" role="tablist" aria-label="Slide indicators">
            {FEATURED_EXPERIMENTS.map((_, idx) => {
              const isSelected = idx === activeIndex;

              return (
                <button
                  key={idx}
                  onClick={() => scrollToSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    isSelected ? 'w-8 bg-white' : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Jump to slide ${idx + 1}`}
                  role="tab"
                  aria-selected={isSelected}
                />
              );
            })}
          </div>

          {/* Prev / Next & Pause Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="w-9 h-9 rounded-full bg-[#1C1C1E] hover:bg-[#2C2C2E] border border-white/[0.08] flex items-center justify-center text-[#86868B] hover:text-white transition-colors"
              aria-label={isPaused ? 'Resume autoplay' : 'Pause autoplay'}
            >
              {isPaused ? <Play className="size-3.5 fill-current" /> : <Pause className="size-3.5 fill-current" />}
            </button>

            <button
              onClick={handlePrev}
              className="w-9 h-9 rounded-full bg-[#1C1C1E] hover:bg-[#2C2C2E] border border-white/[0.08] flex items-center justify-center text-white transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="size-4" />
            </button>

            <button
              onClick={handleNext}
              className="w-9 h-9 rounded-full bg-[#1C1C1E] hover:bg-[#2C2C2E] border border-white/[0.08] flex items-center justify-center text-white transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
