/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'escala-yellow': '#FFD700',
        'escala-red': '#DC2626',
        'escala-navy': '#1e3a5f',
        'whatsapp': '#25D366',
      },
    },
  },
  plugins: [],
}
