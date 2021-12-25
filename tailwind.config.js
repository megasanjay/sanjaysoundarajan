module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        asap: ["Asap"],
      },
    },
  },
  plugins: [require("tailwindcss-debug-screens")],
};
