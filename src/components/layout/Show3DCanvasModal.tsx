import React, { useState } from 'react';
import { 
  X, 
  ExternalLink, 
  Layers, 
  Cpu, 
  ShieldCheck, 
  Copy, 
  Check,
  Box
} from 'lucide-react';

interface Show3DCanvasModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Show3DCanvasModal: React.FC<Show3DCanvasModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyEmbed = () => {
    navigator.clipboard?.writeText('<iframe src="https://canvas.show3d.com/embed/courtyard-pavilion" width="100%" height="600" />');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in font-sans select-none text-[#e5e2e3]">
      <div 
        className="relative w-full max-w-lg rounded-lg border border-[#232426] bg-[#0d0e0f] shadow-2xl p-6 sm:p-7 space-y-5 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Shimmer Line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 size-7 rounded bg-[#151617] hover:bg-[#232426] border border-[#232426] flex items-center justify-center text-[#9A9DA3] hover:text-white transition-colors"
        >
          <X className="size-4" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1.5 pr-8">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-[#50d8e9]/10 border border-[#50d8e9]/20 text-[10px] font-mono text-[#50d8e9]">
            <span className="size-1.5 rounded-full bg-[#50d8e9] animate-pulse" />
            <span>SYS // SPATIAL_CORE_ENGINE</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Launch in Show3D Canvas
          </h2>

          <p className="text-xs text-[#9A9DA3] leading-relaxed">
            Experience the full spatial creation engine where students and teachers collaborate live on high-precision 3D geometries, materials, and physical lighting parameters.
          </p>
        </div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-2 gap-2.5 text-xs">
          <div className="p-3 rounded bg-[#101112] border border-[#232426] space-y-1">
            <div className="flex items-center gap-1.5 text-white font-medium">
              <Box className="size-3.5 text-[#50d8e9]" />
              <span>Full Mesh CAD</span>
            </div>
            <p className="text-[11px] text-[#9A9DA3] leading-normal">
              Direct vertex manipulation, CSG boolean cutouts, and sub-surface scattering shaders.
            </p>
          </div>

          <div className="p-3 rounded bg-[#101112] border border-[#232426] space-y-1">
            <div className="flex items-center gap-1.5 text-white font-medium">
              <Layers className="size-3.5 text-[#5E6BFF]" />
              <span>Export Anywhere</span>
            </div>
            <p className="text-[11px] text-[#9A9DA3] leading-normal">
              Instant export to .GLTF, .USDZ (Vision Pro AR), and WebGL interactive embeds.
            </p>
          </div>

          <div className="p-3 rounded bg-[#101112] border border-[#232426] space-y-1">
            <div className="flex items-center gap-1.5 text-white font-medium">
              <Cpu className="size-3.5 text-[#ffb689]" />
              <span>Zero-Install WebGL</span>
            </div>
            <p className="text-[11px] text-[#9A9DA3] leading-normal">
              Runs smoothly at 60 FPS on school Chromebooks and MOE PLD iPads over Port 443.
            </p>
          </div>

          <div className="p-3 rounded bg-[#101112] border border-[#232426] space-y-1">
            <div className="flex items-center gap-1.5 text-white font-medium">
              <ShieldCheck className="size-3.5 text-[#50d8e9]" />
              <span>Classroom Sync</span>
            </div>
            <p className="text-[11px] text-[#9A9DA3] leading-normal">
              Live multi-user presence synced directly to Teacher Facilitator command hub.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-2 border-t border-[#232426]">
          <a
            href="https://spline.design" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full py-2.5 px-4 rounded bg-[#5E6BFF] hover:bg-[#4d59df] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-colors"
          >
            <span>Launch Live Show3D Canvas</span>
            <ExternalLink className="size-4" />
          </a>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyEmbed}
              className="flex-1 py-2 px-3 rounded bg-[#151617] hover:bg-[#232426] text-[#e5e2e3] border border-[#232426] text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="size-3.5 text-[#50d8e9]" /> : <Copy className="size-3.5 text-[#9A9DA3]" />}
              <span>{copied ? 'Embed Copied!' : 'Copy Embed Code'}</span>
            </button>

            <button
              onClick={onClose}
              className="py-2 px-4 rounded bg-[#151617] hover:bg-[#232426] text-[#9A9DA3] hover:text-white border border-[#232426] text-xs font-medium transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
