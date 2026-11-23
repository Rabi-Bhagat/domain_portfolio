/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3b82f6",
        secondary: "#6366f1",
        accent: "#14b8a6",
        dark: "#030712",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Space Grotesk", "Inter", "sans-serif"],
      },
      boxShadow: {
        "glow-primary": "0 0 45px -10px rgba(59, 130, 246, 0.6)",
      },
    },
  },
  plugins: [],
};
