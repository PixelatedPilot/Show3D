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
    { label: 'Philosophy', href: '#philosophy' },
    { label: 'Highlights', href: '#highlights' },
    { label: 'Workspaces', href: '#product-showcase' },
    { label: 'Curriculum', href: '#masterclasses' },
    { label: 'Outcomes', href: '#outcomes' },
    { label: 'Physics Lab', href: '#gravity-lab' },
    { label: 'Safety & PDPA', href: '#safety' },
    { label: 'Cohorts', href: '#lineup' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <header
      className={`sticky top-0 z-30 w-full backdrop-blur-[20px] bg-[#ffffff]/90 border-b border-[#d6d6d6] transition-transform duration-300 ease-out ${
        isVisible ? 'translate-y-0 opacity-100 shadow-sm' : '-translate-y-full opacity-0 pointer-events-none'
      }`}
      aria-label="Product local navigation"
    >
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between text-xs">
        <div className="flex items-center gap-3">
          <a
            href="#hero"
            className="font-display font-semibold text-[#1d1d1f] text-[19px] leading-[1.21] tracking-[0.228px] hover:text-[#0066cc] transition-colors"
          >
            Show3D
          </a>
          <span className="hidden sm:inline-block text-[#707070] text-[12px] font-normal tracking-[-0.12px]">
            Spatial AI for Young Minds
          </span>
        </div>

        {/* Anchor Links */}
        <nav className="hidden md:flex items-center gap-5 text-[#707070]" aria-label="Section links">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[12px] tracking-[-0.12px] hover:text-[#1d1d1f] transition-colors font-normal"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Action: Tuition + Apple Pricing Blue Pill */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex flex-col text-right">
            <span className="text-[10px] text-[#707070] font-mono uppercase tracking-wider">Tuition</span>
            <span className="text-xs font-semibold text-[#1d1d1f]">{PRICING_DETAILS.priceString}</span>
          </div>

          <button
            id="subnav-book-seat-btn"
            onClick={onBookSeat}
            className="px-4 py-1.5 rounded-full bg-[#0071e3] hover:bg-[#0066cc] text-white font-normal text-[12px] tracking-[-0.12px] flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
          >
            <span>Book a Seat</span>
            <ArrowRight className="size-3" />
          </button>
        </div>
      </div>
    </header>
  );
};
