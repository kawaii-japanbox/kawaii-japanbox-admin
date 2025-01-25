/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"], // Add Inter as a custom font
        roboto: ["Roboto", "sans-serif"], // Add Roboto font
      },
    },
  },
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  plugins: [],
};
