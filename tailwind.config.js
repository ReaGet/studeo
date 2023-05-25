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
          // default: '#BAB4A3',
          // light: '#f5f4f1',
          // 300: '#d3cbb2',
          // 100: '#f6f7f9',
          default: 'var(--color-primary)',
          light: 'var(--color-primary-light)',
          300: 'var(--color-primary-300)',
          100: 'var(--color-primary-100)',
        },
        gray: {
          default: '#767676',
          500: '#7e7e7e',
          400: '#d0d0d0',
          300: '#4a4a4a80',
          200: '#F5F5F5',
          100: '#fafafa',
        },
      },
      boxShadow: {
        sm: '0px 6px 15px rgba(74, 74, 74, 0.125)',
        md: '0px 6px 25px rgba(74, 74, 74, 0.15)',
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
