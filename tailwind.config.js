/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        red: { 50: "#FDECEC", 100: "#FBD4D6", 200: "#F5A5A9", 300: "#EE767C", 400: "#E7454E", 500: "#E3162A", 600: "#B8101F", 700: "#8E0C18", 800: "#640811" },
        navy: { 50: "#EDF0F6", 100: "#D3DBEA", 200: "#A6B7D4", 300: "#7993BE", 400: "#42568A", 500: "#122B57", 600: "#0F2349", DEFAULT: "#122B57", 700: "#0A1B3B", 800: "#071229", deep: "#0A1B3B" },
        paper: { DEFAULT: "#F6F4EF", dim: "#EDEAE2", 100: "#FBFAF7" },
      },
      fontFamily: {
        display: ["Montserrat", "sans-serif"],
        body: ["Montserrat", "sans-serif"],
        mono: ["Montserrat", "sans-serif"],
      },
      boxShadow: {
        card: "0 16px 34px rgba(18,43,87,0.10)",
        glow: "0 8px 24px rgba(227,22,42,0.30)",
      },
    },
  },
  plugins: [],
};
