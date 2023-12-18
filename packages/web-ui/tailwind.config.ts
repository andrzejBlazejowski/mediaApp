import type { Config } from "tailwindcss";

import baseConfig from "@media/tailwind-config";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  presets: [baseConfig],
  plugins: [require("@tailwindcss/typography")],
} satisfies Config;
