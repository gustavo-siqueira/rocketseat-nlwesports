/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.tsx",
    "./index.html"
  ],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif']
    },
    extend: {
      backgroundImage: {
        galaxy: "url('/backgroundGalaxy.png')",
        nlwGradient: "linear-gradient(89.86deg, #9572FC 23.08%, #43E7AD 34.27%, #E1D55D 100.00%);",
        'game-gradient': 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 67.08%);'
      }
    },
  },
  plugins: [],
}
