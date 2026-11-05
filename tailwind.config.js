/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0B1220',
        card: '#151F2E',
        surface: '#1E293B',
        lime: { DEFAULT: '#A3E635', dim: '#84CC16' },
        grn: '#22C55E',
        tx: '#F8FAFC',
        mute: '#94A3B8',
        danger: '#F87171',
      },
      fontFamily: { sans: ['Inter', 'system-ui', 'Segoe UI', 'sans-serif'] },
      keyframes: {
        'sheet-up': { from: { transform: 'translateY(100%)' }, to: { transform: 'translateY(0)' } },
        'sheet-down': { from: { transform: 'translateY(0)' }, to: { transform: 'translateY(100%)' } },
        'fade-in': { from: { opacity: 0 }, to: { opacity: 1 } },
        'fade-out': { from: { opacity: 1 }, to: { opacity: 0 } },
        'pop': { '0%': { transform: 'scale(1)' }, '40%': { transform: 'scale(1.12)' }, '100%': { transform: 'scale(1)' } },
        'rise': { from: { opacity: 0, transform: 'translateY(12px) scale(.97)' }, to: { opacity: 1, transform: 'none' } },
        'glow': { '0%,100%': { boxShadow: '0 0 0 0 rgba(163,230,53,.0)' }, '50%': { boxShadow: '0 0 32px 0 rgba(163,230,53,.28)' } },
      },
      animation: {
        'sheet-up': 'sheet-up .28s cubic-bezier(.2,.8,.2,1)',
        'sheet-down': 'sheet-down .2s ease-in forwards',
        'fade-in': 'fade-in .2s ease-out',
        'fade-out': 'fade-out .2s ease-in forwards',
        'pop': 'pop .35s ease-out',
        'rise': 'rise .4s ease-out both',
        'rise-glow': 'rise .4s ease-out both, glow 2.4s ease-in-out .4s 2',
      },
    },
  },
  plugins: [],
}
