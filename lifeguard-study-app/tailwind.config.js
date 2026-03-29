/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f2ff',
          100: '#cce5ff',
          200: '#99cbff',
          300: '#66b0ff',
          400: '#3396ff',
          500: '#007AFF',
          600: '#0062cc',
          700: '#004999',
          800: '#003166',
          900: '#001833',
        },
        success: {
          500: '#34C759',
        },
        warning: {
          500: '#FF9500',
        },
        error: {
          500: '#FF3B30',
        },
        dark: {
          bg: '#1C1C1E',
          card: '#2C2C2E',
          text: '#FFFFFF',
        }
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
      },
    },
  },
  plugins: [],
}
