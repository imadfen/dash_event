/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3498db',
        secondary: '#2ecc71',
        accent: '#f1c40f',
        background: '#ecf0f1',
        text: '#34495e',
        error: '#e74c3c',
        success: '#27ae60',
        warning: '#f39c12',
      },
    },
  },
  plugins: [],
}