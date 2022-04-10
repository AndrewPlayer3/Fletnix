const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(rgb(55, 65, 81), rgb(17, 24, 39), rgb(0, 0, 0))'
      },
      inset: {
        '1/5': '20%',
        '1/10': '10%'
      },
      screens: {
        'tablet': { 
          'max': '1000px'
        },
        'xs': {
          'max': '576px'
        },
        'xxs': {
          'max': '476px'
        },
        ...defaultTheme.screens,
      }
    },
  },
}
