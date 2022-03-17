module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    colors: {
      red: '#E50914',
      white: '#FFF',
      blackOp: 'rgba(0, 0, 0, 0.700)',
      black: '#000',
      gray: 'rgb(92, 92, 92)',
      EO: '#0E0E0E',
      green: 'rgb(84, 184, 95)',
      yellow: 'rgb(255, 204, 0)'
    },
    screens: {
      'sm': {'min': '320px', 'max': '734px'},
      // => @media (min-width: 640px) { ... }

      'md': {'min': '735px', 'max': '1024px'},
      // => @media (min-width: 1024px) { ... }

      'lg': {'min': '1025px'},
      // => @media (min-width: 1280px) { ... }
    },
    extend: {
      spacing: {
        '128': '32rem',
      }
    },
  },
  plugins: [],
}
