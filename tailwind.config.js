/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        neededPurple: "#161A30",
        neededBlue: "#31304D",
        neededCyan: "#B6BBC4",
        neededLightCyan: "#F0ECE5",
      },
    },
  },
  plugins: [],
}
