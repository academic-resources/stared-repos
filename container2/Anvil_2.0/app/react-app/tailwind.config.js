module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      jetbrains: ["JetBrains Mono", "mono"],
    },
    extend: {
      colors: {
        main: "#282a36", //dark blue-gray
        secondary: "#44475a", //light blue-gray
        accentOne: "#8be9fd", //cyan
        accentTwo: "#50fa7b", //green
        accentThree: "#bd93f9", //purple
        accentFour: "#ff5555", //red
        secondTransparent: "rgba(68, 71, 90, 0)",
        secondTransparent2: "rgba(68, 71, 90, 0.4)",
        secondTransparent3: "rgba(68, 71, 90, 0.8)",
        mainTransparent: "rgb(40,42,54, 0.9)",
        modal: "rgba(0,0,0,0.7)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
