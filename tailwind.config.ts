import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        void: 'var(--color-void)',
        'cosmic-navy': 'var(--color-cosmic-navy)',
        'deep-space': 'var(--color-deep-space)',
        gold: 'var(--color-gold)',
        'gold-light': 'var(--color-gold-light)',
        'gold-dim': 'var(--color-gold-dim)',
        'signal-red': 'var(--color-signal-red)',
        'cyber-cyan': 'var(--color-cyber-cyan)',
        'cyber-dim': 'var(--color-cyber-dim)',
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'text-tertiary': 'var(--color-text-tertiary)',
      },
      fontFamily: {
        display: ['var(--font-display)'],
        headline: ['var(--font-headline)'],
        mono: ['var(--font-mono)'],
        body: ['var(--font-body)'],
        ui: ['var(--font-ui)'],
      },
      screens: {
        'mobile': { max: '639px' },
        'tablet': { min: '640px', max: '1023px' },
        'desktop': '1024px',
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
        'pulse-ring': 'pulse-ring 2s ease-out infinite',
        'glitch': 'glitch 3s steps(1) infinite',
        'float': 'float 4s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'breathe': 'breathe 2.5s ease-in-out infinite',
        'border-glitch': 'border-glitch 8s steps(1) infinite',
        'hologram-flicker': 'hologram-flicker 6s ease-in-out infinite',
        'vu-bar': 'vu-bar 1.2s ease-in-out infinite',
        'scan-line': 'scan-line 4s linear infinite',
        'typewriter': 'typewriter 1s step-end infinite',
      },
      backgroundImage: {
        'gradient-hero': 'var(--gradient-hero)',
        'gradient-gold': 'var(--gradient-gold)',
        'gradient-future': 'var(--gradient-future)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

export default config
