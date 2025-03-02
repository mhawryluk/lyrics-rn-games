/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        pw: {
          background: "#E1DDD2",
          orange: "#D08E54",
          "orange-light": "#d08e5480",
          green: "#144E52",
          "green-light": "#7f9492",
          navy: "#2E364B",
        },
      },
    },
  },
  plugins: [],
};
