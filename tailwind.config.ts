import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Matte, near-black base — never pure #000 so text/edges stay soft.
        bg: {
          DEFAULT: '#0B0D0E',
          elevated: '#14171A',
          inset: '#0F1113',
        },
        border: {
          DEFAULT: '#23272B',
          strong: '#33383D',
        },
        ink: {
          DEFAULT: '#ECEBE4', // warm off-white, not clinical pure white
          muted: '#9BA0A6',
          faint: '#5C6167',
        },
        // Single accent: CRT-amber. Used sparingly for CTAs, links, highlights.
        signal: {
          DEFAULT: '#FFB020',
          dim: '#8A5E15',
          soft: 'rgba(255, 176, 32, 0.1)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      maxWidth: {
        content: '1120px',
      },
      keyframes: {
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        blink: 'blink 1s step-end infinite',
        fadeUp: 'fadeUp 0.6s ease-out forwards',
      },
    },
  },
  plugins: [],
} satisfies Config