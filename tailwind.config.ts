import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        customBlue: "#1E90FF",
      },
      screens: {
        mmg: "885px",
      },
      letterSpacing: {
        custom: "0.2em",
      },
    },
  },
  plugins: [],
} satisfies Config;
