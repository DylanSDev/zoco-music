/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#F1FF00",
        secondary: "#0F2A3B",
        darkBg: "#06131c",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Montserrat", "sans-serif"],
      },
      boxShadow: {
        neon: "0 0 15px rgba(241, 255, 0, 0.35)",
        neonGlow: "0 0 25px rgba(241, 255, 0, 0.6)",
      },
    },
  },
  plugins: [],
}
