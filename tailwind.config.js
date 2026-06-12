/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        bg: '#0d0d0f',
        panel: '#111114',
        surface: 'rgba(255,255,255,0.04)',
        border: 'rgba(255,255,255,0.08)',
        'border-glow': 'rgba(78,201,176,0.5)',
        vsc: {
          text:    '#e8e8e8',
          muted:   'rgba(255,255,255,0.35)',
          kw:      '#7eb8f7',
          str:     '#f0a070',
          fn:      '#e8d88a',
          comment: 'rgba(255,255,255,0.28)',
          type:    '#4ec9b0',
          err:     '#ff6b6b',
          num:     '#b5cea8',
        },
      },
      animation: {
        blink: 'blink 1s infinite',
        'fade-up': 'fadeUp 0.6s ease forwards',
      },
      keyframes: {
        blink: { '0%,100%': { opacity: 1 }, '50%': { opacity: 0 } },
        fadeUp: { from: { opacity: 0, transform: 'translateY(16px)' }, to: { opacity: 1, transform: 'none' } },
      },
    },
  },
  plugins: [],
}
