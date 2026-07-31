export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ["Geist Mono", "monospace"],
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};