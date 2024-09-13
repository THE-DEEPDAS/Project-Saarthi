/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          purple: {
            500: '#8B5CF6',
            600: '#7C3AED',
            800: '#5B21B6',
          },
          gray: {
            700: '#374151',
            800: '#1F2937',
            900: '#111827',
          },
          blue: {
            400: '#60A5FA',
          },
        },
      },
    },
    plugins: [],
  }