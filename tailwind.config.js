/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enable dark mode using a class
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
    theme: {
      extend: {
        colors: {
          indigo: {
            light: '#b3bcf5',
            DEFAULT: '#5c6ac4',
            dark: '#202e78',
          },
          purple: {
            light: '#d6bcfa',
            DEFAULT: '#9c27b0',
            dark: '#6a0080',
          },
        },
    },
  },
  plugins: [],
}