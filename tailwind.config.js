/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'Inter', 'sans-serif'],
      },
      colors: {
        brand: {
          red:    '#EE2A24',
          'red-dark': '#C41F1A',
          navy:   '#1A335B',
          'navy-light': '#254480',
          blue:   '#80B2E6',
          silver: '#B0B2B6',
          dark:   '#0D0D0F',
          dark2:  '#13131A',
          dark3:  '#1C1C26',
          dark4:  '#242430',
        },
      },
      boxShadow: {
        'glow-red':  '0 0 20px rgba(238,42,36,0.45)',
        'glow-blue': '0 0 20px rgba(128,178,230,0.35)',
        'glow-navy': '0 0 20px rgba(26,51,91,0.5)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
