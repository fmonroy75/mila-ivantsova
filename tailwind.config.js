/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Cormorant Garamond', 'Playfair Display', 'serif'],
        sans: ['Inter', 'Manrope', 'sans-serif'],
      },
      colors: {
        'premium-black': '#0A0A0A',
        'premium-white': '#F5F3EF',
        'premium-steel': '#6B7280',
        'premium-ukraine': '#3B4A6B',
      }
    },
  },
  plugins: [],
}