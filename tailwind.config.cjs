/* eslint-disable global-require */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['var(--font-lato)']
    }
  },
  daisyui: {
    themes: [
      {
        light: {
          primary: '#BDCDC9',
          'primary-content': '#1F4C4C',
          secondary: '#867DA4',
          accent: '#1F4C4C',
          'accent-content': '#F9F9F9',
          neutral: '#3d4451',
          'base-100': '#F9F9F9',
          'base-content': '#1F4C4C'
        }
      }
    ]
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')]
};
