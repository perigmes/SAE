/** @type {import('tailwindcss').Config} */
let plugin = require("tailwindcss/plugin");
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'sans':['Open Sans', 'sans-serif'],
      },
    }
  },
  plugins: [
    plugin(
      function ({ addVariant }) { /* ajoutez ici tous les états spécifiques à votre site */
        addVariant('active', '&.active'); // Add an active variant`   
      })

  ],
}

