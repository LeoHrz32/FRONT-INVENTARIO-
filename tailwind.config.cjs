/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#00aa4d",
        secondary: {
          100: "#1E1F25",
          500: "#18191E",
          900: "#131517",
        },
      },
    },
  },
  plugins: [require("@headlessui/tailwindcss")],
};