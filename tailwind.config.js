/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,css}", // 🔥 Garante que o Tailwind analise TODOS os arquivos no src/
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
