module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "valar-primary": "#8b1a10",
        "valar-secondary": "#434343",
        "valar-tertiray": "#eeeeee",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
