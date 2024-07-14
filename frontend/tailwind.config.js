/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brightColor: "#AB6B2E",
        backgroundColor: "#FDE9CC",
        coffee: "#C5925F"
      },
    },
  },
  plugins: [],
});
