/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          50:  '#fdf8f0', 100: '#f5ede0', 200: '#e8d8c4',
          300: '#d4b896', 400: '#c4965a', 500: '#a0724a',
          600: '#8a6040', 700: '#6b4e38', 800: '#4a3728', 900: '#3d2b1f',
        },
        espresso: { DEFAULT: '#3d2b1f', light: '#5c3d26', dark: '#2a1c12' },
        cream:    { DEFAULT: '#faf8f5', warm: '#fdf6ee', deep: '#f5ede0' },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans:  ['"Jost"', 'system-ui', 'sans-serif'],
      },
      animation: {
        float:       'float 6s ease-in-out infinite',
        'fade-up':   'fadeUp 0.6s ease forwards',
        'pulse-ring':'pulseRing 2s ease-in-out infinite',
      },
      keyframes: {
        float:      { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
        fadeUp:     { from: { opacity: 0, transform: 'translateY(16px)' }, to: { opacity: 1, transform: 'none' } },
        pulseRing:  { '0%,100%': { opacity: 0.4, transform: 'scale(1)' }, '50%': { opacity: 0.8, transform: 'scale(1.08)' } },
      },
      backgroundImage: {
        'hero-gradient':     'linear-gradient(to bottom, rgba(20,10,5,0.25) 0%, rgba(20,10,5,0.55) 100%)',
        'gold-gradient':     'linear-gradient(135deg, #c4965a 0%, #a0724a 100%)',
        'espresso-gradient': 'linear-gradient(135deg, #3d2b1f 0%, #5c3d26 100%)',
        'purple-gradient':   'linear-gradient(135deg, #2d1f3d 0%, #4a2d5c 100%)',
        'green-gradient':    'linear-gradient(135deg, #1f3d2d 0%, #2d5c3a 100%)',
        'dark-gradient':     'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
      },
      maxWidth: {
        'app': '480px',
      },
    },
  },
  plugins: [],
}
