module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-hot-toast/dist/index.cjs",
  ],
  theme: {
    extend: {
      colors: {
        'green-500': '#22c55e',
        'green-400': '#4ade80',
        'green-600': '#16a34a',
        'black': '#000000',
      },
    },
  },
  plugins: [],
};