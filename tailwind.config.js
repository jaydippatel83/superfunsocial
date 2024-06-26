/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        "primary-soft": "rgb(var(--color-primary-soft) / <alpha-value>)",
        secondery: "rgb(var(--color-secondery) / <alpha-value>)",
        bgYellow: "rgb(250 204 21 / var(--tw-bg-opacity))",
        bgbody: "rgb(var(--color-bgbody) / <alpha-value>)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
