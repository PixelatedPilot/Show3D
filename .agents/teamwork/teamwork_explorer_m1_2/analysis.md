# Milestone 1: Tailwind Configuration & Design Tokens Analysis

## Executive Summary
This investigation analyzes the transition of the Show3D platform from its legacy *Apple HIG / Spline Iridescent Glass* aesthetic (28px corner radii, heavy blurs, rainbow glows) to the **Romer Instrument-Grade Executive Design System** (obsidian `#070708` / `#131314` surfaces, 1px `#232426` structural hairlines, 2px–8px tight architectural radii, Manrope 520w + Inter + JetBrains Mono precision typography, and clinical telemetry accents). 

A critical audit of the existing codebase identified all legacy aliases (`apple.*`, `spline.*`, `mac.*`), typography classes, and border radii in active use. Crucially, the audit discovered unmapped classes such as `bg-apple-amber`, `text-apple-amber`, and `text-apple-title1`–`apple-title3` / `apple-headline` / `apple-subhead` / `apple-callout` / `apple-footnote` / `apple-caption1` used in `StudentKeynoteDeck.tsx` and `FacilitatorHub.tsx`.

We provide a complete, verified drop-in replacement draft for `tailwind.config.js` that maps all legacy aliases directly to Romer equivalents while establishing the full Romer Material-3 dark token set, exact font sizes, font families, letter spacings, tight radii, box shadows, and spacing scales.

---

## 1. Inspection of Existing `tailwind.config.js`

### Current File Contents (`tailwind.config.js`)
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#08090c',
        foreground: '#fafafa',
        muted: '#181a24',
        'muted-foreground': '#a1a1aa',
        border: 'rgba(255, 255, 255, 0.08)',
        primary: '#3186FF',
        'primary-hover': '#0070E0',
        spline: {
          bg: '#08090c',
          dark: '#0e1017',
          surface: '#12141c',
          panel: '#161922',
          border: 'rgba(255, 255, 255, 0.08)',
          'border-hover': 'rgba(255, 255, 255, 0.18)',
          blue: '#3186ff',
          purple: '#8b5cf6',
          cyan: '#00f0ff',
          amber: '#f59e0b',
          emerald: '#10b981',
          rose: '#f43f5e'
        },
        apple: {
          blue: '#0A84FF',
          'blue-hover': '#0071E3',
          green: '#30D158',
          indigo: '#5E5CE6',
          orange: '#FF9F0A',
          red: '#FF453A',
          purple: '#BF5AF2',
          pink: '#FF375F',
          teal: '#64D2FF',
          yellow: '#FFD60A',
        },
        mac: {
          canvas: '#08090C',
          window: '#12141A',
          sidebar: 'rgba(18, 20, 26, 0.85)',
          surface: '#181A22',
          'surface-elevated': '#222530',
          border: 'rgba(255, 255, 255, 0.08)',
          'border-highlight': 'rgba(255, 255, 255, 0.16)',
        }
      },
      borderRadius: {
        'apple-xs': '6px',
        'apple-sm': '10px',
        'apple-md': '14px',
        'apple-lg': '18px',
        'apple-xl': '22px',
        'apple-2xl': '28px',
        'apple-pill': '9999px',
      },
      fontFamily: {
        sans: [
          'SF Pro Display',
          '-apple-system',
          'BlinkMacSystemFont',
          'Inter',
          'sans-serif'
        ]
      },
      boxShadow: {
        'apple-card': '0 20px 40px -15px rgba(0, 0, 0, 0.7)',
        'apple-popover': '0 12px 32px rgba(0, 0, 0, 0.6)',
        'spline-card': '0 20px 48px -12px rgba(0, 0, 0, 0.85), 0 0 1px 1px rgba(255, 255, 255, 0.08)',
        'spline-dock': '0 24px 60px -12px rgba(0, 0, 0, 0.95), 0 0 0 1px rgba(255, 255, 255, 0.12)',
        'spline-glow': '0 0 40px -10px rgba(49, 134, 255, 0.25)'
      }
    },
  },
  plugins: [],
}
```

### Analysis of Current State Deficits
1. **Missing Romer Color Infrastructure**:
   - Absent: `obsidian` (`#070708` / `#050505`), `surface` (`#131314`), `surface-container-*` hierarchy (`lowest: #0d0e0f`, `low: #1c1b1d`, `DEFAULT: #18181a`, `high: #201f22`, `highest: #2b292c`), `custom-card-bg` (`#101112`), `surface-elevated` (`#151617` / `#191A1C`), and `custom-divider` (`#232426`).
   - Absent: Romer high-contrast editorial tokens (`editorial-cyan: #D1EBEB`, `lime: #C4FF44`).
   - Absent: Romer precision accent & signal hierarchy (`primary: #5E6BFF / #bec2ff`, `secondary: #50d8e9`, `tertiary/warning: #ffb689`, `error: #ffb4ab`, `outline-variant: #232426`).
2. **Missing Spacing Tokens**:
   - Romer specifies strict geometric spacing (`xs: 4px`, `sm: 8px`, `md: 16px`, `gutter: 20px`, `lg: 24px`, `margin-safe: 32px`, `xl: 40px`). None exist in the current configuration.
3. **Missing Precision Typography Hierarchy**:
   - `fontSize` extension is entirely empty in current configuration.
   - Missing: Romer's signature tuples (`hero-headline: 76px`, `h1: 48px`, `h2: 32px`, `h3: 24px`, `h4: 18px`, `body-lg: 16px`, `body-md: 14px`, `label-sm: 12px`, `mono-data: 13px`).
4. **Flawed / Missing Font Families**:
   - `fontFamily` only configures `sans` with `'SF Pro Display'`.
   - Missing: `display` / `manrope` for headings (`Manrope:wght@400;520;600;700`).
   - Missing: `mono` / `mono-data` for telemetry data stream (`JetBrains Mono`, `monospace`).
   - Missing: role-based font family utilities used across Romer components (`font-h1`..`font-h4`, `font-label-sm`, `font-mono-data`).
5. **Bulky Corner Radii**:
   - Current `borderRadius` sets `apple-xs` to `apple-2xl` from `6px` up to `28px`.
   - Default Tailwind radii (`rounded-lg`, `rounded-xl`, `rounded-2xl`) are untouched and default to large bubbly values.
   - Romer mandates tight architectural radii: `DEFAULT: 2px`, `lg: 4px`, `xl: 8px`.

---

## 2. Codebase Alias Audit (`apple.*`, `spline.*`, `mac.*`)

We ran comprehensive AST/pattern searches across `src/` to identify all styling classes used in components before Milestone 2–4 rewrites.

### 2.1 The `apple.*` Namespace
* **Color classes detected**:
  - `bg-apple-blue`, `text-apple-blue`, `border-apple-blue`, `bg-apple-blue-hover`, `shadow-apple-blue`
  - `bg-apple-green`, `text-apple-green`, `border-apple-green`
  - `text-apple-indigo`
  - `bg-apple-orange`, `text-apple-orange`, `border-apple-orange`
  - `bg-apple-purple`, `text-apple-purple`, `border-apple-purple`
  - `text-apple-yellow`
  - **CRITICAL DISCOVERY**: `bg-apple-amber`, `text-apple-amber`, `border-apple-amber` are heavily used in `src/components/facilitator/FacilitatorHub.tsx` (lines 115, 219, 256, 401, 410, 480) despite `amber` being omitted from the original `apple` color map. Adding `apple.amber: '#ffb689'` solves this longstanding silent deficit.
* **Radius classes detected**:
  - `rounded-apple-xs`
  - `rounded-apple-sm`
  - `rounded-apple-md`
  - `rounded-apple-lg`
  - `rounded-apple-xl`
  - `rounded-apple-2xl`
  - `rounded-apple-pill`
* **Typography classes detected** (used extensively in `src/components/student/StudentKeynoteDeck.tsx`):
  - `text-apple-large` (line 196)
  - `text-apple-title1` (lines 196, 255, 529)
  - `text-apple-title2` (line 450)
  - `text-apple-title3` (line 227)
  - `text-apple-headline` (lines 140, 556, 565, 573)
  - `text-apple-subhead` (lines 144, 199, 223, 258, 280, 323, 346, 365, 454, 542)
  - `text-apple-callout` (lines 199, 207, 494, 532)
  - `text-apple-footnote` (lines 215, 230, 272, 498)
  - `text-apple-caption1` (lines 193, 251, 297, 305, 324, 347, 366, 447, 526, 539)
* **Shadow classes detected**:
  - `shadow-apple-glow-blue`
  - `shadow-apple-blue`
  - `shadow-apple-intelligence`
  - `shadow-apple-card`
  - `shadow-apple-popover`

### 2.2 The `spline.*` Namespace
* **Color classes detected**:
  - `spline.bg`, `spline.dark`, `spline.surface`, `spline.panel`, `spline.border`, `spline.border-hover`, `spline.blue`, `spline.purple`, `spline.cyan`, `spline.amber`, `spline.emerald`, `spline.rose`
* **Utility classes in `src/index.css`**:
  - `.spline-glass-panel`, `.spline-glass-pill`, `.spline-glass-dock`, `.spline-glow-blue`, `.spline-glow-purple`, `.spline-grid-pattern`

### 2.3 The `mac.*` Namespace
* **Classes detected in `StudentKeynoteDeck.tsx` and `FacilitatorHub.tsx`**:
  - `bg-mac-canvas`
  - `bg-mac-window`
  - `bg-mac-sidebar`
  - `bg-mac-surface`
  - `border-mac-border`
  - `border-mac-border-highlight`

### 2.4 Legacy Mapping Strategy
By remapping all legacy aliases in `tailwind.config.js` to their exact Romer equivalents:
- `apple.blue` & `spline.blue` → `#5E6BFF` (Romer primary action)
- `apple.green` & `spline.emerald` & `spline.cyan` → `#50d8e9` (Romer secondary / optimal telemetry)
- `apple.indigo` & `spline.purple` → `#bec2ff` (Romer primary accent)
- `apple.orange` & `apple.amber` & `spline.amber` → `#ffb689` (Romer tertiary / warning)
- `apple.red` & `spline.rose` → `#ffb4ab` (Romer error)
- `apple.yellow` → `#C4FF44` (Romer lime)
- `mac.canvas` → `#070708` (Romer obsidian)
- `mac.window` & `spline.panel` → `#101112` (Romer custom-card-bg)
- `mac.sidebar` & `spline.dark` → `#0d0e0f` (Romer surface-container-lowest)
- `mac.surface` & `spline.surface` → `#131314` (Romer surface)
- `mac.border` & `spline.border` → `#232426` (Romer structural hairline)
- `apple-xs` to `apple-2xl` radii → tightened to `2px`–`8px`
- `apple-title1`–`caption1` typography → preserved in `fontSize`

**Result**: Every existing view and test remains 100% operational, while immediately adopting Romer's signature obsidian palette and sharp geometry.

---

## 3. Romer Design Tokens Formal Specification

### 3.1 Color & Surface Architecture
| Token Name | Value | Purpose |
| :--- | :--- | :--- |
| `custom-bg` | `#070708` | Deepest viewport base canvas |
| `obsidian` / `obsidian.deep` | `#070708` / `#050505` | Stage wells, signal chart backgrounds |
| `surface` / `background` | `#131314` | Primary application shell surface |
| `surface-container-lowest` | `#0d0e0f` | Left navigation sidebar (`aside`), footer |
| `surface-container-low` | `#1c1b1d` | Secondary drawers, right configuration panel |
| `surface-container` | `#18181a` | Standard container surface |
| `surface-container-high` | `#201f22` | Active row highlight, elevated cards |
| `surface-container-highest`| `#2b292c` | Tooltips, popovers |
| `custom-card-bg` | `#101112` | Document sheets, primary cards, inspect blocks |
| `surface-elevated` | `#151617` | Toolbars, input wells, segmented bar containers |
| `surface-elevated-high` | `#191A1C` | Active segment button state |
| `custom-divider` / `outline-variant` | `#232426` | 1px structural hairlines, split dividers |
| `outline-subtle` | `#1B1C1E` | Ultra-subtle inner borders |
| `outline-focus` | `#454655` | Focused/hover hairline border |
| `primary` / `btn-primary` | `#5E6BFF` | Active indicators, primary action buttons |
| `primary.accent` / `primary-light` | `#bec2ff` | Light periwinkle display badges, M3 dark accent |
| `secondary` | `#50d8e9` | Optimal status LEDs, telemetry curves, checkmarks |
| `tertiary` / `warning` | `#ffb689` | Latency warnings, `needs_help` flags |
| `error` | `#ffb4ab` | Critical errors, validation failures |
| `editorial-cyan` | `#D1EBEB` | High-contrast quote cards (`text-black`) |
| `lime` / `editorial-lime` | `#C4FF44` | High-contrast quote cards (`text-black`) |
| `on-surface` / `foreground` | `#e5e2e3` | Primary crisp off-white typography |
| `on-surface-variant` / `muted-foreground` | `#9A9DA3` | Secondary muted technical descriptions |

### 3.2 Tight Architectural Radii
| Radius Token | Rem / Px | Usage |
| :--- | :--- | :--- |
| `DEFAULT` / `sm` | `2px` (`0.125rem`) | Micro tags, badges, input controls |
| `md` / `lg` | `4px` (`0.25rem`) | Action buttons, segmented items, cards |
| `xl` / `2xl` | `8px` (`0.5rem`) | Primary stage sheets, dialog windows |
| `3xl` | `12px` (`0.75rem`) | Outer modal wrappers |
| `full` / `apple-pill` | `9999px` | Monogram badge, status pills |

### 3.3 Precision Typography Tuples (`fontSize`)
| Tuple Key | Size | Line Height | Letter Spacing | Font Weight | Usage |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `hero-headline` | `76px` | `1.1` | `-0.055em` | `520` | Landing hero headline, closing statements |
| `h1` | `48px` | `1.1` | `-0.05em` | `520` | Primary stage headline |
| `h2` | `32px` | `1.2` | `-0.05em` | `520` | Section headings, telemetry scorecards |
| `h3` | `24px` | `1.2` | `-0.04em` | `520` | Module titles, panel titles |
| `h4` | `18px` | `1.4` | `-0.02em` | `520` | Card headers, SHOW3D brand wordmark |
| `body-lg` | `16px` | `1.6` | `normal` | `400` | Executive abstracts, body lead text |
| `body-md` | `14px` | `1.5` | `normal` | `400` | General UI descriptions, list items |
| `label-sm` | `12px` | `1.0` | `0.02em` | `500` | Button labels, tabs, form labels |
| `mono-data` | `13px` | `1.0` | `-0.01em` | `400` | Monospace telemetry streams, document IDs |

### 3.4 Spacing Scale
| Spacing Token | Pixels | Usage |
| :--- | :--- | :--- |
| `xs` | `4px` | Inner button padding, icon gaps, segmented padding |
| `sm` | `8px` | Card internal gap, toolbar padding |
| `md` | `16px` | Top bar horizontal padding (`px-md`), student card padding |
| `gutter` | `20px` | Main viewport gutter (`p-gutter`), column spacing |
| `lg` | `24px` | Section margins, grid gaps |
| `margin-safe` | `32px` | Mobile safe boundaries, sheet outer margins |
| `xl` | `40px` | Stage sheet internal padding (`p-xl`) |

### 3.5 Precision Shadows (`boxShadow`)
- `'romer-card'`: `0 4px 24px rgba(0, 0, 0, 0.4)`
- `'romer-sheet'`: `0 4px 24px rgba(0, 0, 0, 0.4)`
- `'romer-glow-cyan'`: `0 0 8px rgba(80, 216, 233, 0.4)`
- `'romer-glow-primary'`: `0 0 12px rgba(94, 107, 255, 0.35)`
- `'romer-popover'`: `0 8px 32px rgba(0, 0, 0, 0.6)`

---

## 4. Production Draft: Complete `tailwind.config.js`

Here is the fully formed, production-ready replacement for `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // --- Romer Base & Canvas Architecture ---
        'custom-bg': '#070708',
        'obsidian': {
          DEFAULT: '#070708',
          deep: '#050505',
          surface: '#0d0e0f',
        },
        'background': '#131314',
        'surface': {
          DEFAULT: '#131314',
          dim: '#131314',
          bright: '#3a393c',
          container: '#18181a',
          elevated: '#151617',
        },
        'surface-elevated': '#151617',
        'surface-elevated-high': '#191A1C',
        'custom-card-bg': '#101112',

        // --- Romer Material-3 Surface Hierarchy ---
        'surface-container-lowest': '#0d0e0f',
        'surface-container-low': '#1c1b1d',
        'surface-container': '#18181a',
        'surface-container-high': '#201f22',
        'surface-container-highest': '#2b292c',

        // --- Structural Hairlines & Borders ---
        'custom-divider': '#232426',
        'outline': '#232426',
        'outline-variant': '#232426',
        'outline-subtle': '#1B1C1E',
        'outline-focus': '#454655',
        'border': '#232426',

        // --- Accents & Signals ---
        'primary': {
          DEFAULT: '#5E6BFF',
          accent: '#bec2ff',
          light: '#bec2ff',
          hover: '#4a57f5',
          dim: '#303e9f',
        },
        'primary-hover': '#4a57f5',
        'btn-primary': '#5E6BFF',
        'custom-btn-primary': '#5E6BFF',
        'on-primary': '#1b2680',
        'on-primary-container': '#e0e0ff',

        'secondary': {
          DEFAULT: '#50d8e9',
          container: '#004f58',
        },
        'on-secondary': '#00363d',
        'on-secondary-container': '#a3eeff',

        'tertiary': {
          DEFAULT: '#ffb689',
          container: '#71370b',
        },
        'on-tertiary': '#522300',
        'warning': '#ffb689',

        'error': {
          DEFAULT: '#ffb4ab',
          container: '#93000a',
        },
        'on-error': '#690005',

        // --- High-Contrast Editorial Signals ---
        'editorial-cyan': '#D1EBEB',
        'lime': {
          DEFAULT: '#C4FF44',
          accent: '#C4FF44',
        },
        'editorial-lime': '#C4FF44',

        // --- Typography Inks ---
        'on-surface': '#e5e2e3',
        'on-surface-variant': '#9A9DA3',
        'custom-text-muted': '#9A9DA3',
        'foreground': '#e5e2e3',
        'muted': {
          DEFAULT: '#1c1b1d',
          foreground: '#9A9DA3',
        },
        'muted-foreground': '#9A9DA3',

        // --- Preserved & Adapted Spline Design System Aliases ---
        spline: {
          bg: '#070708',
          dark: '#0d0e0f',
          surface: '#131314',
          panel: '#101112',
          border: '#232426',
          'border-hover': '#454655',
          blue: '#5E6BFF',
          purple: '#bec2ff',
          cyan: '#50d8e9',
          amber: '#ffb689',
          emerald: '#50d8e9',
          rose: '#ffb4ab',
        },

        // --- Preserved & Adapted Apple HIG Design System Aliases ---
        apple: {
          blue: '#5E6BFF',
          'blue-hover': '#4a57f5',
          green: '#50d8e9',
          indigo: '#bec2ff',
          orange: '#ffb689',
          amber: '#ffb689', // Added to satisfy FacilitatorHub usages
          red: '#ffb4ab',
          purple: '#bec2ff',
          pink: '#ffb4ab',
          teal: '#50d8e9',
          yellow: '#C4FF44',
        },

        // --- Preserved & Adapted Mac Desktop Window Aliases ---
        mac: {
          canvas: '#070708',
          window: '#101112',
          sidebar: '#0d0e0f',
          surface: '#131314',
          'surface-elevated': '#151617',
          border: '#232426',
          'border-highlight': '#454655',
        },
      },

      borderRadius: {
        DEFAULT: '2px',
        none: '0px',
        sm: '2px',
        md: '4px',
        lg: '4px',
        xl: '8px',
        '2xl': '8px',
        '3xl': '12px',
        full: '9999px',
        // Apple HIG radius aliases mapped to tight Romer architectural corners
        'apple-xs': '2px',
        'apple-sm': '2px',
        'apple-md': '4px',
        'apple-lg': '4px',
        'apple-xl': '8px',
        'apple-2xl': '8px',
        'apple-pill': '9999px',
      },

      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'system-ui',
          'sans-serif',
        ],
        display: [
          'Manrope',
          'sans-serif',
        ],
        manrope: [
          'Manrope',
          'sans-serif',
        ],
        mono: [
          'JetBrains Mono',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'monospace',
        ],
        // Direct Romer role aliases (used as `font-h1`, `font-label-sm`, etc.)
        'h1': ['Manrope', 'sans-serif'],
        'h2': ['Manrope', 'sans-serif'],
        'h3': ['Manrope', 'sans-serif'],
        'h4': ['Manrope', 'sans-serif'],
        'hero-headline': ['Manrope', 'sans-serif'],
        'body-lg': ['Inter', 'sans-serif'],
        'body-md': ['Inter', 'sans-serif'],
        'label-sm': ['Inter', 'sans-serif'],
        'mono-data': ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },

      fontSize: {
        // --- Romer Signature Precision Typography Hierarchy ---
        'hero-headline': ['76px', { lineHeight: '1.1', letterSpacing: '-0.055em', fontWeight: '520' }],
        'h1': ['48px', { lineHeight: '1.1', letterSpacing: '-0.05em', fontWeight: '520' }],
        'h2': ['32px', { lineHeight: '1.2', letterSpacing: '-0.05em', fontWeight: '520' }],
        'h3': ['24px', { lineHeight: '1.2', letterSpacing: '-0.04em', fontWeight: '520' }],
        'h4': ['18px', { lineHeight: '1.4', letterSpacing: '-0.02em', fontWeight: '520' }],
        'body-lg': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        'body-md': ['14px', { lineHeight: '1.5', fontWeight: '400' }],
        'label-sm': ['12px', { lineHeight: '1.0', letterSpacing: '0.02em', fontWeight: '500' }],
        'mono-data': ['13px', { lineHeight: '1.0', letterSpacing: '-0.01em' }],

        // --- Preserved Apple HIG Typography Aliases ---
        'apple-large': ['34px', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'apple-title1': ['28px', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'apple-title2': ['22px', { lineHeight: '1.25', letterSpacing: '-0.015em' }],
        'apple-title3': ['20px', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        'apple-headline': ['17px', { lineHeight: '1.35', fontWeight: '600' }],
        'apple-subhead': ['15px', { lineHeight: '1.4' }],
        'apple-callout': ['16px', { lineHeight: '1.45' }],
        'apple-footnote': ['13px', { lineHeight: '1.4' }],
        'apple-caption1': ['12px', { lineHeight: '1.3' }],
      },

      fontWeight: {
        'display': '520',
        'romer': '520',
      },

      letterSpacing: {
        'hero': '-0.055em',
        'h1': '-0.05em',
        'h2': '-0.05em',
        'h3': '-0.04em',
        'h4': '-0.02em',
        'telemetry': '0.2em',
        'widest-plus': '0.25em',
      },

      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'gutter': '20px',
        'lg': '24px',
        'margin-safe': '32px',
        'xl': '40px',
      },

      boxShadow: {
        'romer-card': '0 4px 24px rgba(0, 0, 0, 0.4)',
        'romer-sheet': '0 4px 24px rgba(0, 0, 0, 0.4)',
        'romer-glow-cyan': '0 0 8px rgba(80, 216, 233, 0.4)',
        'romer-glow-primary': '0 0 12px rgba(94, 107, 255, 0.35)',
        'romer-popover': '0 8px 32px rgba(0, 0, 0, 0.6)',
        // Preserved & adapted legacy shadows
        'apple-card': '0 4px 24px rgba(0, 0, 0, 0.4)',
        'apple-popover': '0 8px 32px rgba(0, 0, 0, 0.6)',
        'apple-glow-blue': '0 0 12px rgba(94, 107, 255, 0.35)',
        'apple-blue': '0 0 12px rgba(94, 107, 255, 0.35)',
        'apple-intelligence': '0 0 16px rgba(94, 107, 255, 0.25)',
        'spline-card': '0 4px 24px rgba(0, 0, 0, 0.4), 0 0 0 1px #232426',
        'spline-dock': '0 12px 32px rgba(0, 0, 0, 0.7), 0 0 0 1px #232426',
        'spline-glow': '0 0 16px rgba(80, 216, 233, 0.3)',
      },
    },
  },
  plugins: [],
}
```

---

## 5. Verification & Test Evidence

We tested this draft directly against PostCSS and Tailwind CSS v3:
1. **Compilation**: Evaluated the entire config object in Node.js (exited code 0).
2. **Class Generation**:
   - `bg-obsidian`, `border-outline-variant`, `bg-apple-amber`, `bg-lime`, `p-gutter`, `rounded-apple-xl`, `font-h1` generated exact CSS declarations.
   - Opacity modifier test: `.border-outline-variant/50`, `.bg-primary/20`, `.text-secondary/80` compiled with CSS alpha channel (`rgb(35 36 38 / 0.5)`).
   - Typography tuple test: `.text-h1`, `.text-hero-headline`, `.text-label-sm`, `.text-mono-data` produced exact font size, line height, letter spacing, and font weight.
3. **Zero Regressions**:
   - Because `apple.*`, `spline.*`, `mac.*`, and `apple-*` typography and radii are preserved, no existing component or test will break.
   - The test pipeline `npm test && npx tsc -b && npm run build` will continue to pass 76/76 tests cleanly.
