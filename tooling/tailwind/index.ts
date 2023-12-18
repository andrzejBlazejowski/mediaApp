import type { Config } from "tailwindcss";

const colors = require("tailwindcss/colors");

export default {
  content: ["../../packages/web-ui/src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: colors.amber,
        secondary: colors.lime,
        tertiary: colors.zinc,
        "text-primary": colors.stone,
        "text-secondary": colors.gray,
        "text-tertiary": colors.neutral,
        "danger-primary": colors.red,
        "danger-secondary": colors.rose,
        "danger-ternitary": colors.pink,
        "warning-primary": colors.yellow,
        "warning-secondary": colors.orange,
        "warning-ternitary": colors.fuchsia,
        "info-primary": colors.cyan,
        "info-secondary": colors.emerald,
        "info-ternitary": colors.teal,
      },
    },
  },
  extend: {},
  plugins: [require("@tailwindcss/typography")],
} satisfies Config;
