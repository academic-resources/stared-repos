module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        main: "#F5F9FF",
        accent: "#7ABACC",
        accentDark: "#438292",
        accentLight: "#7ABACCb4",
        accentLight45: "#7ABACC73",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
