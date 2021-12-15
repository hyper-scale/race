module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      maxWidth: {
        "fold-lines": "calc(80rem+200px)",
      }
    },
  },
  plugins: [],
};
