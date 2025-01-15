/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "custom-gradient":
          "conic-gradient(from 180deg at 50% 50%, #002DBF 0deg, #4396F7 101.35deg, #FF9BD2 191.63deg, #C9FFFC 278.78deg, #002DBF 352.8deg, #002DBF 360deg)",
      },
    },
  },

  plugins: [],
};
