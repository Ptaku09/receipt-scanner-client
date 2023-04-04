/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'color-corners':
          'linear-gradient(135deg, rgb(236 72 153) 60px, transparent 60px), linear-gradient(-45deg, rgb(139 92 246) 110px, transparent 110px)',
      },
    },
  },
  plugins: [],
};
