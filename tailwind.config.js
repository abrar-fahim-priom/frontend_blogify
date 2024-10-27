/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./test.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "1.25rem",
      },
      colors: {
        dark: "#121416",
      },
    },
  },
  plugins: [],
};
