import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Paper-white base, near-black ink, single stamped red accent.
        paper: {
          DEFAULT: '#FAFAF8',
          panel: '#FFFFFF',
        },
        ink: {
          DEFAULT: '#0A0A0A',
          muted: '#5A5A5A',
          faint: '#9A9A94',
        },
        hairline: '#DCDBD3',
        red: {
          DEFAULT: '#E0301E',
          soft: '#FDEAE7',
        },
      },
      fontFamily: {
        grotesk: ['"Space Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"Space Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      maxWidth: {
        content: '1160px',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.6s ease-out forwards',
      },
    },
  },
  plugins: [],
} satisfies Config