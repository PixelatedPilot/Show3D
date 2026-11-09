import { useEffect, RefObject } from 'react';

/**
 * Graceful progressive enhancement fallback for browsers lacking native
 * CSS Scroll-Driven Animations (such as Firefox).
 * Uses IntersectionObserver to trigger smooth, one-shot reveal transitions.
 */
export function useScrollRevealFallback(scrollerRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    // Feature detect native CSS scroll-driven animations
    const supportsSDA =
      typeof CSS !== 'undefined' &&
      CSS.supports &&
      CSS.supports('(animation-timeline: view()) and (animation-range: entry)');

    if (supportsSDA) {
      // Native compositor-driven animations are active; zero JS overhead needed
      return;
    }

    const scroller = scrollerRef.current;
    if (!scroller) return;

    scroller.classList.add('s3d-fallback');

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-inview');
            // Unobserve once revealed to save memory and CPU cycles
            observer.unobserve(entry.target);
          }
        }
      },
      {
        root: scroller,
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.05,
      }
    );

    const revealTargets = scroller.querySelectorAll('[data-reveal], .s3d-word');
    revealTargets.forEach((target) => observer.observe(target));

    return () => {
      observer.disconnect();
      scroller.classList.remove('s3d-fallback');
    };
  }, [scrollerRef]);
}
