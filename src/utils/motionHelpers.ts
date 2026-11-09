import type {
  CanvasModelArchetype,
  ViewportShadingMode,
  StudioCameraPreset,
  FilamentMaterialPreset
} from './canvasStudioState.ts';

export interface WordSegment {
  text: string;
  emphasis?: boolean;
}

export interface SplitWord {
  word: string;
  emphasis: boolean;
  index: number;
}

/**
 * Splits text segments into individual word tokens with preserved emphasis metadata
 * for scroll-driven word illumination effects.
 */
export function splitWordSegments(segments: WordSegment[]): SplitWord[] {
  const result: SplitWord[] = [];
  let globalIndex = 0;

  for (const seg of segments) {
    const tokens = seg.text.split(/(\s+)/);
    for (const token of tokens) {
      if (!token) continue;
      // Keep whitespace tokens neutral, attach to word or split
      if (/^\s+$/.test(token)) {
        result.push({
          word: token,
          emphasis: false,
          index: globalIndex++,
        });
      } else {
        result.push({
          word: token,
          emphasis: !!seg.emphasis,
          index: globalIndex++,
        });
      }
    }
  }

  return result;
}

/**
 * Safe cyclical carousel index wrapping
 */
export function wrapIndex(index: number, length: number): number {
  if (length <= 0) return 0;
  return ((index % length) + length) % length;
}

/**
 * Computes next index for auto-advancing carousel
 */
export function nextAutoAdvance(current: number, length: number, isPaused: boolean): number {
  if (isPaused || length <= 1) return current;
  return wrapIndex(current + 1, length);
}

/**
 * Cubic ease-out interpolation for numeric stat count-ups
 */
export function easeOutCubic(t: number): number {
  const clamped = Math.max(0, Math.min(1, t));
  return 1 - Math.pow(1 - clamped, 3);
}

/**
 * Formats interpolated numerical stat value into human-readable string
 */
export function formatStat(targetValue: number, progress: number, prefix = '', suffix = '', decimals = 0): string {
  const eased = easeOutCubic(progress);
  const current = targetValue * eased;
  const numStr = decimals > 0 ? current.toFixed(decimals) : Math.round(current).toString();
  return `${prefix}${numStr}${suffix}`;
}

export interface ExplorerModulePreset {
  archetype: CanvasModelArchetype;
  shadingMode: ViewportShadingMode;
  cameraPreset: StudioCameraPreset;
  filamentPreset: FilamentMaterialPreset;
  autoRotate: boolean;
  canopyColor: string;
  curvature: number;
  hasSolar: boolean;
}

/**
 * Curated 3D viewport preset per curriculum module for the Masterclass Explorer
 */
export const EXPLORER_PRESETS: Record<number, ExplorerModulePreset> = {
  1: {
    archetype: 'primitives',
    shadingMode: 'wireframe',
    cameraPreset: 'iso',
    filamentPreset: 'eco_pla',
    autoRotate: true,
    canopyColor: '#64D2FF',
    curvature: 0.5,
    hasSolar: false,
  },
  2: {
    archetype: 'pavilion',
    shadingMode: 'clay',
    cameraPreset: 'overview',
    filamentPreset: 'wood_pla',
    autoRotate: false,
    canopyColor: '#FFD60A',
    curvature: 0.72,
    hasSolar: false,
  },
  3: {
    archetype: 'pavilion',
    shadingMode: 'pbr',
    cameraPreset: 'canopy',
    filamentPreset: 'eco_pla',
    autoRotate: true,
    canopyColor: '#30D158',
    curvature: 0.68,
    hasSolar: true,
  },
  4: {
    archetype: 'desk_dock',
    shadingMode: 'pbr',
    cameraPreset: 'front',
    filamentPreset: 'anodized_alu',
    autoRotate: true,
    canopyColor: '#0A84FF',
    curvature: 0.45,
    hasSolar: false,
  },
  5: {
    archetype: 'desk_dock',
    shadingMode: 'pbr',
    cameraPreset: 'eyelevel',
    filamentPreset: 'petg_structural',
    autoRotate: false,
    canopyColor: '#FF375F',
    curvature: 0.6,
    hasSolar: false,
  },
  6: {
    archetype: 'pavilion',
    shadingMode: 'slicer_layers',
    cameraPreset: 'top',
    filamentPreset: 'eco_pla',
    autoRotate: false,
    canopyColor: '#30D158',
    curvature: 0.68,
    hasSolar: true,
  },
};
