/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Permet d'activer le mode sombre avec une classe
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Chemins des fichiers à scanner pour les classes Tailwind
  ],
  theme: {
    extend: {
      // Personnalisation des thèmes, couleurs, typographies, etc.
    },
  },
  plugins: [
    // Liste des plugins Tailwind que tu souhaites utiliser
  ],
  corePlugins: {
    preflight: false, // Désactiver les styles de base de Tailwind
  },
}
