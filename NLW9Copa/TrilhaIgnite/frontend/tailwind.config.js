/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: { sans: 'Roboto, sans-serif' },
      backgroundImage: { app: 'url(/app-bg.png)' },
      colors: {
        gray: {
          100: '#E1E1E6',
          300: '#8D8D99',
          600: '#323238',
          800: '#202024',
          900: '#121214',
        },
        ignite: {
          green: '#129E57',
          yellow1: '#F7FF43',
          yellow2: '#E5CD3D',
        },
      },
    },
  },
  plugins: [],
}
