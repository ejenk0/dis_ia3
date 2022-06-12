module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        head: ["SALMON", "cursive"],
        body: ["SALMON", "cursive"],
        amazonic: ["AMAZONIC", "cursive"],
      },
      colors: {
        council_primary: "#2D6941",
        council_primary_hover: "#1E4F2B",
        council_secondary: "#143768",
        council_tertiary: "#F7E1CE",
        bg_coucil: { 0: "#FFFFFF", 100: "#ECECEC" },
      },
    },
  },
  plugins: [],
};
