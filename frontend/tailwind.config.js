/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.js',
    './src/**/*.jsx',
    './src/**/*.ts',
    './src/**/*.tsx',
  ],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // Enable dark mode
  theme: {
    extend: {
      colors: {
        // Primary and secondary colors from the screenshot
        darkBg: '#111827',
        darkCard: '#1f2937',
        darkText: '#d1d5db',
        darkAccent: '#4f46e5',
        toggleActive: '#22c55e',
        toggleInactive: '#ef4444',
        borderGray: '#374151',
      },
    },
  },
  variants: {
    // Add your variants here
  },
  plugins: [],
};
