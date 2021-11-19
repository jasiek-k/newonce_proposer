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
      blue: "#1370F2",
      gray: "8A8A8A",
    },
    spacing: {
      ...rem(4),
      ...rem(16),
      ...rem(26),
      ...rem(36),
      ...rem(40),
      ...rem(48),
      ...rem(50),
      ...rem(1128),
    },
    fontSize: {
      ...rem(12),
      ...rem(14),
      ...rem(16),
      ...rem(32),
    },
    fontFamily: {
      primary: ["HelveticaNowText"],
      secondary: ["Montserrat"],
    },
    maxWidth: (theme) => ({
      none: "none",
      ...theme("spacing"),
    }),
    width: (theme) => ({
      ...theme("spacing"),
      none: "none",
      full: "100%",
    }),
    zIndex: {
      "-1": "-1",
    },
    inset: (theme) => ({
      ...theme("spacing"),
      ...rem(-4),
      ...rem(0),
      ...rem(2),
    }),
    extend: {},
  },
  variants: {
    margin: ["responsive", "first", "last", "even", "odd"],
    flexDirection: ["responsive", "even", "odd"],
    textAlign: ["responsive", "even", "first", "last", "odd"],
    borderWidth: ["responsive", "first", "last"],
    fill: ["focus", "hover", "group-hover", "first", "last", "responsive"],
    opacity: ["focus", "hover", "group-hover", "responsive"],
    backdropFilter: ["responsive"],
    display: ["hover", "group-hover", "last", "first", "responsive"],
    borderColor: ["focus", "hover", "responsive"],
    overflow: ["responsive"],
    position: ["responsive"],
    fontSize: ["responsive"],
    width: ["responsive"],
    lineHeight: ["responsive"],
    padding: ["first", "last", "responsive", "even", "odd"],
    inset: ["responsive"],
    zIndex: ["responsive"],
  },
  plugins: [],
};
