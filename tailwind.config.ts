import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: "#0F2044",
        "navy-soft": "#1B3160",
        gold: "#C9A24B",
        bg: "#F2F3F5",
        surface: "#FFFFFF",
        ink: "#1A1A1A",
        muted: "#7A7F87",
        line: "#E3E5E9",
      },
      fontFamily: {
        jost: ["Jost", "sans-serif"],
        inter: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
      },
      maxWidth: {
        wrap: "1080px",
      },
      borderRadius: {
        DEFAULT: "6px",
      },
      boxShadow: {
        card: "0 8px 24px rgba(15,32,68,.07)",
        "card-lg": "0 8px 22px rgba(15,32,68,.08)",
      },
      keyframes: {
        "fill-width": {
          from: { width: "0%" },
          to: { width: "var(--target-width)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
