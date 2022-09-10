/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      minWidth: {
        "button": "8rem",
      },
      borderWidth: {
        "1": "1px",
      },
      colors: {
        "primary": "rgba(225, 241, 89, 1)",
        "primary-dark": "rgba(62, 120, 138, 1)",
        "accent": "rgba(197, 76, 53, 1)",
        "input": "rgba(249, 249, 249, 1)",
        "button": "rgba(255, 255, 255, 1)",
        "main-text": "rgba(114, 146, 156, 1)",
        "main-text-light": "rgba(114, 146, 156, 0.75)",
        "secondary-text": "rgba(74, 90, 104, 1)",
        "main-back": "rgba(41, 44, 51, 1)",
        "dark-back": "rgba(26, 27, 32, 1)",
        "darkened": "rgba(0, 0, 0, 0.5)",
      }
    },
  },
  plugins: [],
}
