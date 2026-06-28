/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'system-ui', 'sans-serif'],
      },
      colors: {
        cream: {
          DEFAULT: '#FDF2E9',
          dark: '#F5E6D8',
        },
      },
    },
  },
  plugins: [],
}
