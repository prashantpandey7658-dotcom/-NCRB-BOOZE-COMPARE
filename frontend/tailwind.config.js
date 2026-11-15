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
        lounge: {
          950: '#080503',
          900: '#100b07',
          850: '#150f09',
          800: '#1d150e',
          750: '#261c13',
          700: '#32251a',
          600: '#483525',
          500: '#634a34',
        },
        amber: {
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        brass: {
          light: '#fde68a',
          DEFAULT: '#d4af37',
          dark: '#996515',
        }
      },
      backgroundImage: {
        'bar-glow': 'radial-gradient(ellipse at top, rgba(217, 119, 6, 0.15), transparent 70%)',
        'wood-pattern': 'linear-gradient(180deg, rgba(29, 21, 14, 0.95), rgba(8, 5, 3, 0.98))',
      }
    },
  },
  plugins: [],
}
