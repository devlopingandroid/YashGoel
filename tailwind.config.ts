import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: "#0a0e14",
          surface: "#131820",
          border: "#1f2733",
        },
        accent: {
          teal: "#14e8c4",
          "teal-hover": "#10c9aa",
          "teal-glow": "rgba(20, 232, 196, 0.15)",
        },
        primary: "#e6e6e6",
        muted: "#8b93a1",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      boxShadow: {
        "teal-glow": "0 0 25px rgba(20, 232, 196, 0.2)",
        "card-subtle": "0 10px 30px -10px rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [],
};
export default config;

