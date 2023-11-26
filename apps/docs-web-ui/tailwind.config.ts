import type { Config } from "tailwindcss";

import baseConfig from "@media/tailwind-config";

export default {
  content: ["./src/**/*.{ts,tsx}", "../../packages/web-ui/src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: {
          500: "#17275c",
        },
      },
    },
  },
  presets: [baseConfig],
} satisfies Config;
