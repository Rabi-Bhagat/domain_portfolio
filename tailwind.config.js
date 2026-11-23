/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "rgb(var(--ink) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        canvas: "rgb(var(--canvas) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        primary: "rgb(var(--accent) / <alpha-value>)",
        secondary: "rgb(var(--accent) / <alpha-value>)",
        dark: "#08090b",
      },
      fontFamily: {
        sans: ["Poppins", "system-ui", "sans-serif"],
        display: ["Poppins", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 30px 70px -40px rgba(0, 0, 0, 0.45)",
      },
      maxWidth: {
        shell: "76rem",
      },
    },
  },
  plugins: [],
};
