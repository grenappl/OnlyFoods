/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  darkMode:'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#EAFAF1",
          100: "#D5F5E3",
          200: "#ABEBC6",
          300: "#82E0AA",
          400: "#58D68D",
          500: "#2ECC71", // base
          600: "#28B463",
          700: "#239B56",
          800: "#1D8348",
          900: "#186A3B",
        },
        secondary: {
          50: "#FDECEC",
          100: "#FBD9D9",
          200: "#F7B3B3",
          300: "#F38D8D",
          400: "#EF6767",
          500: "#FB4141", // base
          600: "#E53935",
          700: "#C62828",
          800: "#B71C1C",
          900: "#7F0000",
        },
        accent: {
          50: "#FEF5E7",
          100: "#FDEBD0",
          200: "#FAD7A0",
          300: "#F8C471",
          400: "#F5B041",
          500: "#F39C12", // base
          600: "#D68910",
          700: "#B9770E",
          800: "#9C640C",
          900: "#7E5109",
        },

        background: "#FDF6EC",
        surface: "#FFFFFF",
        text: "#2C3E50",

        dark: {
          background: "#121212",
          surface: "#1E1E1E",
          text: "#F5F5F5",
        },
      },
    },
  },
  plugins: [],
};
