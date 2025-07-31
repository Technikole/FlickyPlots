// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
content: [
  "./index.html", // 
  "./layouts/**/*.html",
  "./content/**/*.{html,md}",
 "./public/**/*.html",
  "./src/**/*.{html,js,css}",
],
  theme: {
    extend: {
        fontFamily: {
            muli: ['"Muli"', 'sans-serif'],
            prompt: ['"Prompt"', 'sans-serif'],
            orbi: ['"Orbitron"', 'sans-serif'],
            open: ['"Open Sans"', 'sans-serif'],
    },
      colors: {
        'ghost': '#f7f8fc',
        'grim': '#6b7280',
        'glit': '#00EB97',
        'glow': '#5971FF', 
        'noir': '#111827',
        'navy': '#020A25'
      },
      },
    },
  };
