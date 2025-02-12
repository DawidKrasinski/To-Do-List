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
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        deleteButton: "hsl(var(--deleteButton))",
        navBar: "hsl(var(--navBar))",
        unactiveIcon: "hsl(var(--unactive-icon))",
      },
      fontSize: {
        "lg-xl": "18px",
      },
    },
  },
  plugins: [],
} satisfies Config;
