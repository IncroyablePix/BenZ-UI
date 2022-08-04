/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      borderWidth: {
        "1": "1px",
      },
      colors: {
        "primary": "#E1F159",
        "primary-dark": "#3E788A",
        "accent": "#C54C35",
        "input": "#F9F9F9",
        "button": "#ffffff",
        "main-text": "#72929CFF",
        "secondary-text": "#4A5A68FF",
        "main-back": "#292C33FF",
        "dark-back": "#1A1B20FF",
        "darkened": "rgba(0, 0, 0, 0.5)",
      }
    },
  },
  plugins: [],
}
