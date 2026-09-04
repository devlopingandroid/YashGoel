import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: "rgb(var(--color-bg) / <alpha-value>)",
          surface: "rgb(var(--color-surface) / <alpha-value>)",
          border: "rgb(var(--color-border) / <alpha-value>)",
        },
        accent: {
          teal: "rgb(var(--color-accent) / <alpha-value>)",
          "teal-hover": "rgb(var(--color-accent-hover) / <alpha-value>)",
          "teal-glow": "var(--color-accent-glow)",
        },
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        muted: "rgb(var(--color-muted) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      boxShadow: {
        "teal-glow": "var(--shadow-glow)",
        "card-subtle": "var(--shadow-card)",
      },
    },
  },
  plugins: [],
};
export default config;
