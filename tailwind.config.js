const BASE = 16;
const rem = (px, key = px) => ({ [key]: `${px / BASE}rem` });
const px = (num, key = num) => ({ [key]: `${num}px` });
const ratio = (w, h) => ({ [`${w}/${h}`]: `${(h / w) * 100}%` });
const percent = (n) => ({ [`${n}%`]: `${n}%` });

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      ...px(576, "sm"),
      ...px(768, "md"),
      ...px(1024, "lg"),
      ...px(1250, "mid"),
      ...px(1920, "xl"),
    },
    colors: {
      white: "#FFF",
      black: "#000",
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
