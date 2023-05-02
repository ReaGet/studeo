/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        black: '#4A4A4A',
        indigo: {
          default: '#5D76CB',
          light: '#eff1fa',
        },
        gray: {
          default: '#767676',
          300: '#4a4a4a80',
          200: '#F5F5F5',
          100: '#fafafa',
        },
      },
    },
  },
  plugins: [],
};
