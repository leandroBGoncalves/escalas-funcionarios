/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        'flowshift-blue': '#1A73B8',      // Azul Oceano - headers, botões primários, ícones navegação
        'flowshift-orange': '#F28C33',    // Laranja Vibrante - CTAs, Criar Escala, alertas
        'flowshift-success': '#4CAF50',  // Verde Sucesso - status concluído, aprovação, acentos
        'flowshift-bg': '#F4F7F6',
        'flowshift-card': '#FFFFFF',       // Branco Neve - cards, leitura, superfícies limpas
      },
      borderRadius: {
        'flowshift': '8px',
      },
      boxShadow: {
        'flowshift-card': '0 4px 6px rgba(0,0,0,0.05)',
      },
    },
  },
  plugins: [],
}
