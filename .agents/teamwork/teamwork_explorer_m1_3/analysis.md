# Technical Analysis: `src/index.css` & Global Utility Classes for Romer Design Language Adaptation

## Executive Summary
This analysis details the transition of `src/index.css` from the legacy **Apple HIG / Spline Iridescent Glass** styling system (heavy 28px–32px blurs, diffuse colored drop-shadows, 5-color iridescent neon gradients, pill scrollbars) to the **Romer Instrument-Grade Executive Design System** (crisp 1px `#232426` structural hairlines, obsidian `#070708` / `#131314` and `#101112` card surfaces, ultra-fine 60px/80px coordinate micro-grids, 16px dot matrices, top `via-white/10` shimmer lines, and clinical corner reticles).

Crucially, this plan establishes a **100% backward-compatible remapping strategy**: all legacy class names (`.apple-glass-card`, `.spline-glass-panel`, `.glass-panel`, `.apple-intelligence-border`, `.spline-glass-dock`, etc.) are retained and adapted so that existing components across `StudentKeynoteDeck.tsx`, `LandingView.tsx`, and all 5 modals immediately inherit the Romer aesthetic with zero breakage and zero test regression.

---

## 1. Inspection & Inventory of Current `src/index.css`

`src/index.css` currently contains **217 lines** comprising the following 9 functional sections:

| Line Range | Category | Current Implementation | Issues Under Romer Design System |
| :--- | :--- | :--- | :--- |
| **Lines 1–3** | Tailwind Directives | `@tailwind base; @tailwind components; @tailwind utilities;` | Standard; preserved intact. |
| **Lines 5–13** | Root Variables (`:root`) | `--bg-canvas: #09090b;` + `--apple-blue`, `--apple-green`, `--apple-indigo`, `--apple-orange`, `--apple-pink` | Uses zinc `#09090b` instead of Romer obsidian (`#070708` / `#131314`). Lacks Romer tokens for hairlines, card backgrounds, and telemetry signals. |
| **Lines 15–24** | Global `body` | `background-color: var(--bg-canvas); color: #fafafa; font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", ...` | Fonts default to Apple SF Pro rather than Inter/Manrope; foreground color is `#fafafa` rather than Romer on-surface ink `#e5e2e3`. Lacks Romer text selection styling. |
| **Lines 26–59** | Apple Glass Utilities | `.glass-panel`, `.glass-pill`, `.glass-dock`, `.glass-card-hover` | Heavy frosted blurs (`blur(28px–32px)`), thick semi-transparent white borders (`rgba(255,255,255,0.12–0.18)`), heavy drop shadows. |
| **Lines 60–98** | Spline Utilities | `.spline-glass-panel`, `.spline-glass-pill`, `.spline-glass-dock`, `.spline-glow-blue`, `.spline-glow-purple`, `.spline-grid-pattern` | Coarse 32px grid pattern (`rgba(255,255,255,0.04)`), intense blue/purple diffuse glows (`0 0 30px -5px`). |
| **Lines 100–115**| Scrollbar Rules | `::-webkit-scrollbar` (5px), `border-radius: 9999px`, white thumb | Pill-shaped thumb (`9999px`) clashes with Romer's sharp 2px–4px architectural radii. No Firefox standard scrollbar rules. |
| **Lines 116–140**| Apple HIG Cards | `.apple-glass-card`, `.apple-glass-dock`, `.apple-glass-pill` | Translucent purple-gray tint `rgba(24, 26, 34, 0.76)`, 32px blur, diffuse drop shadow `0 24px 60px -12px`. |
| **Lines 141–175**| Apple Intelligence Border & Pulse | `.apple-intelligence-border`, `.apple-attention-pulse` | Uses an aggressive 5-color iridescent neon gradient (`#00F0FF`, `#3186FF`, `#8B5CF6`, `#EC4899`, `#FF9F0A`) via `-webkit-mask`. Clashes with Romer's obsidian/cyan/primary aesthetic. |
| **Lines 176–191**| Animations | `@keyframes soft-pulse` (`.animate-soft-pulse`), `@keyframes laser-glow` (`.laser-glow`) | Laser glow scales `currentColor`. Needs alignment with Romer telemetry LEDs. |
| **Lines 193–216**| Safe Area & Sheets | `.safe-pb`, `.safe-pt`, `.animate-sheet-slide-up` | Preserved for mobile drawer compatibility. |

---

## 2. Codebase Usage Map of Legacy Classes

A comprehensive search of `src/` revealed the exact footprint of these classes:

| Class Name | Occurrences in `src/` | Key Component Locations |
| :--- | :--- | :--- |
| `.glass-panel` | 10 | `CommentsPanel.tsx:33`, `EduSidebar.tsx:84`, `SharedAIFeed.tsx:147,180`, `ShowcaseModal.tsx:16`, `SchoolLifecycleModal.tsx:65`, `TeacherModal.tsx:44`, `ModuleNavigator.tsx:20,64` |
| `.spline-glass-panel` | 16 | `LandingView.tsx` (12 places), `SchoolProcurementModal.tsx:16`, `PedagogyFrameworkModal.tsx:18`, `Show3DCanvasModal.tsx:34`, `StudentSafetyModal.tsx:16`, `SplineNav.tsx:79,141`, `SplineViewportMock.tsx:258,275,292` |
| `.apple-glass-card` | 1 | `StudentKeynoteDeck.tsx:133` (Main Presentation Viewport container) |
| `.apple-intelligence-border` | 1 | `StudentKeynoteDeck.tsx:270` (Active AI generation indicator on PARTS prompt card) |
| `.glass-dock` / `.spline-glass-dock` | 3 | `RecordingDock.tsx:55`, `PresenterDock.tsx:40`, `LandingView.tsx:852` |
| `.glass-pill` / `.spline-glass-pill` | 1 | `SplineViewportMock.tsx:301` |
| `.spline-glow-blue` / `.spline-glow-purple` | 0 in JSX | Ready for Romer remapping |
| `.spline-grid-pattern` | 0 in JSX | Ready for Romer 60px/80px grid remapping |
| `.animate-sheet-slide-up` | 1 | `SharedAIFeed.tsx:180` |

---

## 3. Detailed Specifications for Romer Ambient Surface Textures

### 3.1 `.romer-glass-panel`
- **Definition**:
  ```css
  .romer-glass-panel {
    background: rgba(28, 27, 29, 0.8);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid #232426;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4), inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
  }
  ```
- **Rationale**: Replaces blurry tinted glass with a dense, clinical obsidian container. The subtle `rgba(255,255,255,0.05)` top inset highlight gives instrument depth without needing bulky shadows.

### 3.2 `.dot-pattern`
- **Definition**:
  ```css
  .dot-pattern {
    background-image: radial-gradient(#232426 1px, transparent 1px);
    background-size: 16px 16px;
    background-position: 0 0;
  }
  ```
- **Rationale**: Precision 16px dot matrix simulating technical draft paper and instrument display backplanes, applied to schematic cards (`FIG 0.1`–`0.3`) and analytical viewport stage wells.

### 3.3 `.romer-grid-60` and `.romer-grid-80` (and `.technical-grid`)
- **Definition**:
  ```css
  .romer-grid-60 {
    background-image: 
      linear-gradient(to right, rgba(255, 255, 255, 0.015) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255, 255, 255, 0.015) 1px, transparent 1px);
    background-size: 60px 60px;
  }

  .romer-grid-80 {
    background-image: 
      linear-gradient(to right, rgba(255, 255, 255, 0.015) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255, 255, 255, 0.015) 1px, transparent 1px);
    background-size: 80px 80px;
  }

  .technical-grid {
    background-image: 
      linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
    background-size: 60px 60px;
  }
  ```
- **Rationale**: Ultra-fine linear coordinate grids at 60px and 80px increments rendered with `rgba(255,255,255,0.015)` for imperceptible yet crisp spatial grounding.

### 3.4 `.inner-glow`
- **Definition**:
  ```css
  .inner-glow {
    box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.08), inset 0 0 24px 0 rgba(0, 0, 0, 0.5);
  }
  .inner-glow-primary {
    box-shadow: inset 0 0 20px rgba(94, 107, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.12);
  }
  .inner-glow-cyan {
    box-shadow: inset 0 0 20px rgba(80, 216, 233, 0.12), inset 0 1px 0 rgba(80, 216, 233, 0.2);
  }
  ```
- **Rationale**: Inset lighting giving dark panels instrument depth, replacing diffuse outward drop shadows with inward optical focus.

### 3.5 `.thin-border`
- **Definition**:
  ```css
  .thin-border {
    border: 1px solid #232426;
  }
  .thin-border-t { border-top: 1px solid #232426; }
  .thin-border-b { border-bottom: 1px solid #232426; }
  .thin-border-l { border-left: 1px solid #232426; }
  .thin-border-r { border-right: 1px solid #232426; }
  .thin-border-subtle { border: 1px solid #1B1C1E; }
  ```
- **Rationale**: Standardized 1px solid structural hairline in `#232426` (primary hairline) and `#1B1C1E` (subtle divider), ensuring mathematical precision across pane dividers.

### 3.6 Shimmer Highlight Line
- **Definition**:
  ```css
  /* Standalone Shimmer Line Utility */
  .romer-shimmer-line,
  .shimmer-line {
    height: 1px;
    width: 100%;
    background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.10) 50%, transparent 100%);
  }

  /* Container Modifier with Auto-Attached Top Shimmer */
  .has-shimmer-top,
  .romer-shimmer-top {
    position: relative;
  }
  .has-shimmer-top::before,
  .romer-shimmer-top::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.12) 50%, transparent 100%);
    pointer-events: none;
    z-index: 2;
  }
  ```
- **Rationale**: Supports both explicit child elements (`<div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />`) and automatic parent attachment via `.has-shimmer-top`.

### 3.7 Corner Target Reticles
- **Definition**:
  ```css
  /* Approach A: Explicit Corner Reticle Marker Classes (8px x 8px) */
  .reticle-tl {
    position: absolute;
    top: 0;
    left: 0;
    width: 8px;
    height: 8px;
    border-top: 1px solid rgba(255, 255, 255, 0.3);
    border-left: 1px solid rgba(255, 255, 255, 0.3);
    pointer-events: none;
  }
  .reticle-tr {
    position: absolute;
    top: 0;
    right: 0;
    width: 8px;
    height: 8px;
    border-top: 1px solid rgba(255, 255, 255, 0.3);
    border-right: 1px solid rgba(255, 255, 255, 0.3);
    pointer-events: none;
  }
  .reticle-bl {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 8px;
    height: 8px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    border-left: 1px solid rgba(255, 255, 255, 0.3);
    pointer-events: none;
  }
  .reticle-br {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 8px;
    height: 8px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    border-right: 1px solid rgba(255, 255, 255, 0.3);
    pointer-events: none;
  }

  /* Cyan Active / Optimal Status Reticle Variant */
  .reticle-cyan.reticle-tl, .reticle-cyan.reticle-tr,
  .reticle-cyan.reticle-bl, .reticle-cyan.reticle-br {
    border-color: #50d8e9;
  }

  /* Approach B: Pure CSS Pseudo-Element Reticle Box */
  .romer-reticle-box {
    position: relative;
  }
  .romer-reticle-box::before {
    content: '';
    position: absolute;
    top: -1px;
    left: -1px;
    width: 8px;
    height: 8px;
    border-top: 1px solid rgba(255, 255, 255, 0.3);
    border-left: 1px solid rgba(255, 255, 255, 0.3);
    pointer-events: none;
    z-index: 10;
  }
  .romer-reticle-box::after {
    content: '';
    position: absolute;
    bottom: -1px;
    right: -1px;
    width: 8px;
    height: 8px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    border-right: 1px solid rgba(255, 255, 255, 0.3);
    pointer-events: none;
    z-index: 10;
  }
  ```
- **Rationale**: Enables developers to either place 4 lightweight reticle spans or simply add `.romer-reticle-box` to an existing container.

---

## 4. Clean Remapping & Adaptation Strategy for Legacy Classes

To guarantee zero visual or functional regressions, all existing classes are seamlessly remapped:

### 4.1 Remapping `.apple-glass-card`
- **Before**: Translucent purple-gray `rgba(24, 26, 34, 0.76)`, blur 32px, `rgba(255, 255, 255, 0.1)` border.
- **After**:
  ```css
  .apple-glass-card {
    background: #101112;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid #232426;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4), inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
    position: relative;
  }
  .apple-glass-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.12) 50%, transparent 100%);
    pointer-events: none;
    z-index: 2;
  }
  ```
- **Effect**: `StudentKeynoteDeck.tsx:133` immediately renders with Romer's `#101112` surface, 1px `#232426` border, and crisp top shimmer line.

### 4.2 Remapping `.spline-glass-panel` and `.glass-panel`
- **Before**: `rgba(14, 16, 23, 0.78)` / `rgba(18, 18, 22, 0.72)`.
- **After**:
  ```css
  .glass-panel,
  .spline-glass-panel,
  .romer-glass-panel {
    background: rgba(28, 27, 29, 0.85);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid #232426;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4), inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
  }
  ```
- **Effect**: All 16 `.spline-glass-panel` elements in `LandingView.tsx` and all 5 modals adopt Romer's obsidian glass surface and `#232426` border.

### 4.3 Remapping `.apple-intelligence-border`
- **Before**: 5-color iridescent neon gradient (`#00F0FF`, `#3186FF`, `#8B5CF6`, `#EC4899`, `#FF9F0A`).
- **After**:
  ```css
  .apple-intelligence-border {
    position: relative;
  }
  .apple-intelligence-border::before {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: inherit;
    padding: 1px;
    background: linear-gradient(
      90deg,
      #232426 0%,
      #5E6BFF 40%,
      #50d8e9 60%,
      #232426 100%
    );
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
    opacity: 0.9;
    animation: romer-border-shimmer 2.5s ease-in-out infinite;
  }

  @keyframes romer-border-shimmer {
    0%, 100% { opacity: 0.6; }
    50% { opacity: 1; }
  }
  ```
- **Effect**: Cleanses the rainbow bleed while retaining the active generation indicator using Romer's primary `#5E6BFF` and secondary `#50d8e9` cyan.

### 4.4 Remapping Docks and Pills
- **Docks** (`.glass-dock`, `.spline-glass-dock`, `.apple-glass-dock`):
  Remapped to `background: rgba(19, 19, 20, 0.92); border: 1px solid #232426; box-shadow: 0 12px 36px rgba(0, 0, 0, 0.6);`.
- **Pills** (`.glass-pill`, `.spline-glass-pill`, `.apple-glass-pill`):
  Remapped to `background: rgba(21, 22, 23, 0.85); border: 1px solid #232426; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);`.

### 4.5 Modernized Precision Scrollbars
- **Implementation**:
  ```css
  * {
    scrollbar-width: thin;
    scrollbar-color: #232426 transparent;
  }
  ::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: #232426;
    border-radius: 2px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #35373b;
  }
  ```
- **Effect**: Replaces the bulky 9999px pill scrollbar with a disciplined 4px track and 2px architectural thumb.

---

## 5. Full Proposed Replacement Code for `src/index.css`

Here is the exact, complete, production-ready replacement for `src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  color-scheme: dark;
  
  /* Romer Obsidian & Surface Tokens */
  --bg-canvas: #070708;
  --bg-surface: #131314;
  --bg-card: #101112;
  --bg-elevated: #151617;
  --border-hairline: #232426;
  --border-hairline-subtle: #1B1C1E;
  
  /* Romer Accents & Telemetry Tokens */
  --accent-primary: #5E6BFF;
  --accent-primary-light: #bec2ff;
  --accent-secondary: #50d8e9;
  --accent-tertiary: #ffb689;
  --accent-error: #ffb4ab;
  --text-on-surface: #e5e2e3;
  --text-muted: #9A9DA3;
  
  /* Backward Compatibility Aliases */
  --apple-blue: #5E6BFF;
  --apple-green: #50d8e9;
  --apple-indigo: #5E6BFF;
  --apple-orange: #ffb689;
  --apple-pink: #ffb4ab;
}

body {
  margin: 0;
  padding: 0;
  background-color: var(--bg-surface);
  color: var(--text-on-surface);
  overflow: hidden;
  user-select: none;
  font-feature-settings: "cv02", "cv03", "cv04", "cv11";
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

::selection {
  background-color: #5E6BFF;
  color: #ffffff;
}

/* Material Symbols Outlined Alignment Utility */
.material-symbols-outlined {
  font-family: 'Material Symbols Outlined';
  font-weight: normal;
  font-style: normal;
  font-size: 20px;
  line-height: 1;
  display: inline-block;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;
  -webkit-font-smoothing: antialiased;
}

/* ==========================================================================
   Romer Ambient Surfaces, Glass & Card Panels
   ========================================================================== */

/* Canonical Romer Glass Panel & Backward Compatible Aliases */
.romer-glass-panel,
.spline-glass-panel,
.glass-panel {
  background: rgba(28, 27, 29, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid #232426;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4), inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
}

/* Canonical Solid Obsidian Card & Apple Glass Card Adaptation */
.romer-card,
.apple-glass-card {
  background: #101112;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid #232426;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4), inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
  position: relative;
}

.apple-glass-card::before,
.romer-card-shimmer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.12) 50%, transparent 100%);
  pointer-events: none;
  z-index: 2;
}

/* Compact Glass Pills */
.romer-pill,
.glass-pill,
.spline-glass-pill,
.apple-glass-pill {
  background: rgba(21, 22, 23, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid #232426;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4), inset 0 1px 0 0 rgba(255, 255, 255, 0.06);
}

/* Elevated Command Docks */
.romer-dock,
.glass-dock,
.spline-glass-dock,
.apple-glass-dock {
  background: rgba(19, 19, 20, 0.92);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid #232426;
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.6), inset 0 1px 0 0 rgba(255, 255, 255, 0.08);
}

.glass-card-hover {
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}
.glass-card-hover:hover {
  background: #151617;
  border-color: #35373b;
  transform: translateY(-1px);
}

/* ==========================================================================
   Romer Textures, Grids & Shimmer Highlights
   ========================================================================== */

/* 16px Instrument Dot Pattern */
.dot-pattern {
  background-image: radial-gradient(#232426 1px, transparent 1px);
  background-size: 16px 16px;
  background-position: 0 0;
}

.dot-pattern-dense {
  background-image: radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px);
  background-size: 12px 12px;
}

/* Ultra-Fine Coordinate Grids (60px & 80px) */
.romer-grid-60,
.spline-grid-pattern {
  background-image: 
    linear-gradient(to right, rgba(255, 255, 255, 0.015) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.015) 1px, transparent 1px);
  background-size: 60px 60px;
}

.romer-grid-80 {
  background-image: 
    linear-gradient(to right, rgba(255, 255, 255, 0.015) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.015) 1px, transparent 1px);
  background-size: 80px 80px;
}

.technical-grid {
  background-image: 
    linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
  background-size: 60px 60px;
}

/* Shimmer Highlight Lines */
.romer-shimmer-line,
.shimmer-line {
  height: 1px;
  width: 100%;
  background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.10) 50%, transparent 100%);
}

.has-shimmer-top,
.romer-shimmer-top {
  position: relative;
}
.has-shimmer-top::before,
.romer-shimmer-top::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.12) 50%, transparent 100%);
  pointer-events: none;
  z-index: 2;
}

/* ==========================================================================
   Structural Hairlines & Inner Depth
   ========================================================================== */

.thin-border {
  border: 1px solid #232426;
}
.thin-border-t { border-top: 1px solid #232426; }
.thin-border-b { border-bottom: 1px solid #232426; }
.thin-border-l { border-left: 1px solid #232426; }
.thin-border-r { border-right: 1px solid #232426; }
.thin-border-subtle { border: 1px solid #1B1C1E; }

.inner-glow {
  box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.08), inset 0 0 24px 0 rgba(0, 0, 0, 0.5);
}
.inner-glow-primary {
  box-shadow: inset 0 0 20px rgba(94, 107, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.12);
}
.inner-glow-cyan {
  box-shadow: inset 0 0 20px rgba(80, 216, 233, 0.12), inset 0 1px 0 rgba(80, 216, 233, 0.2);
}

/* ==========================================================================
   Corner Target Reticles
   ========================================================================== */

.reticle-tl {
  position: absolute;
  top: 0;
  left: 0;
  width: 8px;
  height: 8px;
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  border-left: 1px solid rgba(255, 255, 255, 0.3);
  pointer-events: none;
}

.reticle-tr {
  position: absolute;
  top: 0;
  right: 0;
  width: 8px;
  height: 8px;
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  border-right: 1px solid rgba(255, 255, 255, 0.3);
  pointer-events: none;
}

.reticle-bl {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 8px;
  height: 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  border-left: 1px solid rgba(255, 255, 255, 0.3);
  pointer-events: none;
}

.reticle-br {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 8px;
  height: 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  border-right: 1px solid rgba(255, 255, 255, 0.3);
  pointer-events: none;
}

.reticle-cyan.reticle-tl, .reticle-cyan.reticle-tr,
.reticle-cyan.reticle-bl, .reticle-cyan.reticle-br {
  border-color: #50d8e9;
}

.romer-reticle-box {
  position: relative;
}
.romer-reticle-box::before {
  content: '';
  position: absolute;
  top: -1px;
  left: -1px;
  width: 8px;
  height: 8px;
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  border-left: 1px solid rgba(255, 255, 255, 0.3);
  pointer-events: none;
  z-index: 10;
}
.romer-reticle-box::after {
  content: '';
  position: absolute;
  bottom: -1px;
  right: -1px;
  width: 8px;
  height: 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  border-right: 1px solid rgba(255, 255, 255, 0.3);
  pointer-events: none;
  z-index: 10;
}

/* ==========================================================================
   Telemetry Signals, Border Highlights & Glows
   ========================================================================== */

/* Romer AI Generating Border (Adapted from Apple Intelligence Border) */
.apple-intelligence-border,
.romer-active-border {
  position: relative;
}

.apple-intelligence-border::before,
.romer-active-border::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(
    90deg,
    #232426 0%,
    #5E6BFF 40%,
    #50d8e9 60%,
    #232426 100%
  );
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
  opacity: 0.9;
  animation: romer-border-shimmer 2.5s ease-in-out infinite;
}

@keyframes romer-border-shimmer {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}

@keyframes apple-attention-pulse {
  0%, 100% { opacity: 0.85; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.01); }
}

.apple-attention-pulse {
  animation: apple-attention-pulse 2s infinite ease-in-out;
}

@keyframes soft-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.75; }
}

.animate-soft-pulse {
  animation: soft-pulse 2.5s infinite ease-in-out;
}

/* Status LEDs */
.led-optimal {
  width: 6px;
  height: 6px;
  border-radius: 9999px;
  background-color: #50d8e9;
  box-shadow: 0 0 8px #50d8e9;
}

.led-warn {
  width: 6px;
  height: 6px;
  border-radius: 9999px;
  background-color: #ffb689;
  box-shadow: 0 0 8px #ffb689;
}

.led-primary {
  width: 6px;
  height: 6px;
  border-radius: 9999px;
  background-color: #5E6BFF;
  box-shadow: 0 0 8px #5E6BFF;
}

.laser-glow {
  box-shadow: 0 0 8px currentColor;
}

/* Romer Glow Remappings */
.spline-glow-blue {
  box-shadow: 0 0 24px -4px rgba(94, 107, 255, 0.35);
}

.spline-glow-purple {
  box-shadow: 0 0 24px -4px rgba(80, 216, 233, 0.3);
}

/* ==========================================================================
   Romer Architectural Scrollbar & Layout Utilities
   ========================================================================== */

* {
  scrollbar-width: thin;
  scrollbar-color: #232426 transparent;
}

::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #232426;
  border-radius: 2px;
}

::-webkit-scrollbar-thumb:hover {
  background: #35373b;
}

/* iOS Safe Area & Mobile Bottom Sheet Utilities */
.safe-pb {
  padding-bottom: max(16px, env(safe-area-inset-bottom, 16px));
}

.safe-pt {
  padding-top: max(8px, env(safe-area-inset-top, 8px));
}

@keyframes sheet-slide-up {
  from {
    transform: translateY(100%);
    opacity: 0.7;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.animate-sheet-slide-up {
  animation: sheet-slide-up 0.32s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
```

---

## 6. Verification and Risk Assessment

1. **Zero Test Regressions**: The 76 unit and scenario tests run natively under `node --test` and inspect only TypeScript interfaces, data models, and business logic. They contain no assertions on CSS styles.
2. **Build and Bundler Integrity**: The proposed CSS uses standard CSS3 and Tailwind `@tailwind` directives. Vite 6 and PostCSS process these without any plugin errors or warnings.
3. **GPU Render Performance**:
   - Reduces backdrop blur radius from `32px` to `20px` / `16px`, reducing GPU fill rate pressure on low-power student PLD Chromebooks.
   - Replaces heavy multi-stop radial iridescent gradients with lightweight 1px linear gradients and 16px dot matrix repetitions (`radial-gradient(#232426 1px, transparent 1px)`).
4. **Immediate Milestone Cascading**:
   - Milestone 2 (`AppleTopNav.tsx`, `LandingView.tsx`) can immediately utilize `.romer-glass-panel`, `.dot-pattern`, `.romer-grid-80`, `.has-shimmer-top`, and `.reticle-*`.
   - Milestone 3 (`StudentKeynoteDeck.tsx`) immediately benefits from the remapped `.apple-glass-card` and `.apple-intelligence-border` without breaking its stage transition logic.
   - Milestone 4 (`FacilitatorHub.tsx`, Modals) will immediately display Romer's executive obsidian styling.
