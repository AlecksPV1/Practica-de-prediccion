/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F2EDD5',
        'primary-red': '#E7390D',
        'primary-orange': '#F26716',
        'dark-green': '#084A24',
        'very-dark-green': '#04261E',
      }
    },
  },
  plugins: [],
}
