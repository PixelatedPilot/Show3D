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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in font-sans select-none text-[#E3E3E3]">
      <div 
        className="relative w-full max-w-lg rounded-3xl border border-white/[0.08] bg-[#1E1F22] shadow-2xl p-6 sm:p-7 space-y-5 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 size-8 rounded-full bg-[#282A2E] hover:bg-[#33363B] border border-white/[0.08] flex items-center justify-center text-[#9AA0A6] hover:text-white transition-colors"
        >
          <X className="size-4" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2 pr-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#162238] border border-[#A8C7FA]/25 text-[10px] font-mono text-[#A8C7FA] uppercase tracking-wider">
            <span className="size-1.5 rounded-full bg-[#A8C7FA] animate-pulse" />
            <span>LABS // SPATIAL_CORE_ENGINE</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-display font-medium text-white tracking-tight">
            Launch in Show3D Canvas
          </h2>

          <p className="text-xs text-[#C4C7C5] leading-relaxed">
            Experience the full spatial creation engine where students and teachers collaborate live on high-precision 3D geometries, materials, and physical lighting parameters.
          </p>
        </div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-[#131314] border border-white/[0.07] space-y-1">
            <div className="flex items-center gap-1.5 text-white font-medium">
              <Box className="size-3.5 text-[#A8C7FA]" />
              <span>Full Mesh CAD</span>
            </div>
            <p className="text-[11px] text-[#9AA0A6] leading-normal">
              Direct vertex manipulation, CSG boolean cutouts, and sub-surface scattering shaders.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#131314] border border-white/[0.07] space-y-1">
            <div className="flex items-center gap-1.5 text-white font-medium">
              <Layers className="size-3.5 text-[#6DD58C]" />
              <span>Export Anywhere</span>
            </div>
            <p className="text-[11px] text-[#9AA0A6] leading-normal">
              Instant export to .GLTF, .USDZ (Vision Pro AR), and watertight 3D-printable .STL meshes.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#131314] border border-white/[0.07] space-y-1">
            <div className="flex items-center gap-1.5 text-white font-medium">
              <Cpu className="size-3.5 text-[#FDD663]" />
              <span>Zero-Install WebGL</span>
            </div>
            <p className="text-[11px] text-[#9AA0A6] leading-normal">
              Runs smoothly at 60 FPS on school Chromebooks and MOE PLD iPads over Port 443.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#131314] border border-white/[0.07] space-y-1">
            <div className="flex items-center gap-1.5 text-white font-medium">
              <ShieldCheck className="size-3.5 text-[#6DD58C]" />
              <span>Classroom Sync</span>
            </div>
            <p className="text-[11px] text-[#9AA0A6] leading-normal">
              Live multi-user presence synced directly to Teacher Facilitator command hub.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5 pt-2 border-t border-white/[0.08]">
          <a
            href="https://spline.design" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full py-2.5 px-5 rounded-full bg-[#A8C7FA] hover:bg-[#BBD4FB] text-[#062E6F] font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors"
          >
            <span>Launch Live Show3D Canvas</span>
            <ExternalLink className="size-4" />
          </a>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyEmbed}
              className="flex-1 py-2 px-4 rounded-full bg-[#282A2E] hover:bg-[#33363B] text-[#E3E3E3] border border-white/[0.08] text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="size-3.5 text-[#6DD58C]" /> : <Copy className="size-3.5 text-[#9AA0A6]" />}
              <span>{copied ? 'Embed Copied!' : 'Copy Embed Code'}</span>
            </button>

            <button
              onClick={onClose}
              className="py-2 px-5 rounded-full bg-[#282A2E] hover:bg-[#33363B] text-[#9AA0A6] hover:text-white border border-white/[0.08] text-xs font-medium transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
