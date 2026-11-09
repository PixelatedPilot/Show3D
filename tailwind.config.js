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
          amber: '#ffb689', // Preserved for FacilitatorHub
          red: '#ffb4ab',
          purple: '#bec2ff',
          pink: '#ffb4ab',
          teal: '#50d8e9',
          yellow: '#C4FF44',
        },

        // --- Google Labs Material-3 Dark Mode Tokens ---
        labs: {
          canvas: '#131314',
          surface: '#1E1F22',
          'surface-high': '#282A2E',
          'surface-hover': '#303238',
          border: '#2E3035',
          'border-subtle': '#222428',
          ink: '#E3E3E3',
          muted: '#9AA0A6',
          blue: '#A8C7FA',
          'blue-container': '#0842A0',
          'blue-tint': '#162238',
          mint: '#6DD58C',
          'mint-container': '#0F5223',
          'mint-tint': '#13281C',
          amber: '#FDD663',
          'amber-container': '#5B4300',
          'amber-tint': '#2B2210',
          coral: '#FFB4AB',
          'coral-container': '#690005',
          'coral-tint': '#2E1717',
        },

        // --- Preserved & Adapted Mac Desktop Window Aliases ---
        mac: {
          canvas: '#131314',
          window: '#1E1F22',
          sidebar: '#17181B',
          surface: '#1E1F22',
          'surface-elevated': '#282A2E',
          border: '#2E3035',
          'border-highlight': '#444746',
        },
      },

      borderRadius: {
        DEFAULT: '8px',
        none: '0px',
        sm: '6px',
        md: '12px',
        lg: '16px',
        xl: '20px',
        '2xl': '24px',
        '3xl': '28px',
        '4xl': '32px',
        full: '9999px',
        'apple-xs': '6px',
        'apple-sm': '8px',
        'apple-md': '12px',
        'apple-lg': '16px',
        'apple-xl': '24px',
        'apple-2xl': '28px',
        'apple-pill': '9999px',
      },

      fontFamily: {
        sans: [
          'Plus Jakarta Sans',
          'DM Sans',
          '-apple-system',
          'BlinkMacSystemFont',
          'system-ui',
          'sans-serif',
        ],
        display: [
          'Space Grotesk',
          'Plus Jakarta Sans',
          'sans-serif',
        ],
        manrope: [
          'Plus Jakarta Sans',
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
        'h1': ['Space Grotesk', 'Plus Jakarta Sans', 'sans-serif'],
        'h2': ['Space Grotesk', 'Plus Jakarta Sans', 'sans-serif'],
        'h3': ['Plus Jakarta Sans', 'sans-serif'],
        'h4': ['Plus Jakarta Sans', 'sans-serif'],
        'hero-headline': ['Space Grotesk', 'Plus Jakarta Sans', 'sans-serif'],
        'body-lg': ['DM Sans', 'Plus Jakarta Sans', 'sans-serif'],
        'body-md': ['DM Sans', 'Plus Jakarta Sans', 'sans-serif'],
        'label-sm': ['Plus Jakarta Sans', 'sans-serif'],
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
