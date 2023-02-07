/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-1': '#1B2130',
        'dark-18': '#181A27',
        'dark-1f': '#1F2738',
        'dark-21': '#21293B',
        'dark-17': '#171C29',
        'dark-25': '#252D40',
        'dark-37': '#373D54',
        'dark-1c': '#1C1F33',
        'dark-171': '#171D2B',
        'dark-22': '#22273E',
        'gray-6': '#666E97',
        'gray-3b': '#3B436B',
        'gray-7': '#7A81A5',
        'gray-8': '#8C98A9',
        'gray-8a': '#8A92B4',
        'yellow-f': '#FFC239',
        'green-39': '#39C89D'
      },
      spacing: {
        '1.5px': '1.5px',
        '270px': '270px'
      },
      boxShadow:{
        'tooltip':'0px 4px 10px rgba(0, 0, 0, 0.4)'
      }
    },
  },
  plugins: [],
}