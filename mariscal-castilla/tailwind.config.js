/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'] },
      colors: {
        navy: { 50: '#f1f4f9', 100: '#e2e8f2', 700: '#1c3d73', 800: '#16336b', 900: '#14305e', 950: '#0f2447' },
        brand: { 50: '#e8f7f7', 100: '#c9eeee', 500: '#17a8a8', 600: '#119393', 700: '#0e7a7a' },
        gold: { 400: '#e0b53d', 500: '#d4a72c' },
        surface: '#f8fafc',
      },
    },
  },
  plugins: [],
}
