const plugin = require('tailwindcss/plugin');

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
        primary: {
          default: '#5D76CB',
          light: '#eff1fa',
          100: '#f6f7f9',
        },
        gray: {
          default: '#767676',
          300: '#4a4a4a80',
          200: '#F5F5F5',
          100: '#fafafa',
        },
      },
      boxShadow: {
        md: '0px 6px 0px 25px rgba(74, 74, 74, 0.15)',
        lg: '0px 16px 30px rgba(74, 74, 74, 0.07)',
      },
      fontSize: {
        sm: '1.1rem',
      },
    },
  },
  plugins: [
    plugin(({ addBase }) => {
      addBase({
        html: { fontSize: '10px' },
      });
    }),
  ],
};
