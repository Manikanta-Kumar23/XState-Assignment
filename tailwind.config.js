/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{tsx}"],
  theme: {
    extend: {
      keyframes: {
        flashing: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },

        }
      } ,
      animation: {
        'flash': 'flashing 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      }
    },
  },
  plugins: [],
}

