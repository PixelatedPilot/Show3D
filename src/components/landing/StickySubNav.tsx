import React from 'react';
import { ArrowRight } from 'lucide-react';
import { PRICING_DETAILS } from './landingContent';

export interface StickySubNavProps {
  isVisible: boolean;
  onBookSeat: () => void;
}

export const StickySubNav: React.FC<StickySubNavProps> = ({
  isVisible,
  onBookSeat,
}) => {
  const navLinks = [
    { label: 'Highlights', href: '#highlights' },
    { label: 'Philosophy', href: '#philosophy' },
    { label: 'Masterclasses', href: '#masterclasses' },
    { label: 'Outcomes', href: '#outcomes' },
    { label: 'Defy Gravity', href: '#gravity-lab' },
    { label: 'Safety', href: '#safety' },
    { label: 'Lineup', href: '#lineup' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <header
      className={`sticky top-0 z-30 w-full backdrop-blur-xl bg-[#000000]/75 border-b border-white/[0.08] transition-transform duration-300 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
      }`}
      aria-label="Product navigation"
    >
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between text-xs">
        <div className="flex items-center gap-3">
          <a
            href="#hero"
            className="font-display font-bold text-white text-sm tracking-tight hover:text-[#0A84FF] transition-colors"
          >
            Show3D
          </a>
          <span className="hidden sm:inline-block text-[#86868B] text-[11px] font-mono">
            Spatial AI for Young Minds
          </span>
        </div>

        {/* Anchor Links */}
        <nav className="hidden md:flex items-center gap-5 text-[#86868B]" aria-label="Section links">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Action: Pricing Pill */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex flex-col text-right">
            <span className="text-[10px] text-[#86868B] font-mono">Introductory Tuition</span>
            <span className="text-xs font-semibold text-white">{PRICING_DETAILS.priceString}</span>
          </div>

          <button
            id="subnav-book-seat-btn"
            onClick={onBookSeat}
            className="px-4 py-1.5 rounded-full bg-[#0A84FF] hover:bg-[#0071E3] text-white font-semibold text-xs flex items-center gap-1.5 transition-all shadow-sm shadow-[#0A84FF]/30 active:scale-95"
          >
            <span>Book a Seat</span>
            <ArrowRight className="size-3" />
          </button>
        </div>
      </div>
    </header>
  );
};
