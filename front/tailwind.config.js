/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      keyframes: {
        fadeInFromTop: {
          "0%": { opacity: 0, transform: "translateY(-20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        // Durée de 2.5 secondes pour l'animation
        fadeInFromTop: "fadeInFromTop 1.2s ease-out",
      },
    },
  },
  plugins: [],
  // corePlugins: {
  //   preflight: false,
  // },
};
