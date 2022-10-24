/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'tb': {'max': '830px'},
      'mg': {'max': '520px'},
      'ms': {'max': '390px'}
    },
    extend: {},
  },
  plugins: [],
}
