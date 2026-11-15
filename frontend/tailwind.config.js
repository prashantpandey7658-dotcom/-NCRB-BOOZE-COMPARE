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
        navy: {
          950: '#070c18',
          900: '#0b1329',
          800: '#0f172a',
          700: '#1e293b',
          600: '#334155',
        },
        brand: {
          blue: '#2563eb',
          cyan: '#38bdf8',
          accent: '#0284c7',
        }
      }
    },
  },
  plugins: [],
}
