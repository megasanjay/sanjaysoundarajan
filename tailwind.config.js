module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        asap: ["Asap"],
        ubuntu: ["Ubuntu"],
        inter: ["Inter"],
      },
    },
  },
  plugins: [require("tailwindcss-debug-screens")],
};
