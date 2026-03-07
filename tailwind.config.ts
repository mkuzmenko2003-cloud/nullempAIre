import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts}",
    "./utils/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        nullblack: "#000000",
        neon: "#00ff9c",
        cyan: "#00eaff",
        magenta: "#ff00c8",
      },
      fontFamily: {
        mono: ["var(--font-jetbrains)", "monospace"],
        display: ["var(--font-orbitron)", "sans-serif"],
      },
      animation: {
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "scan-line": "scan-line 3s linear infinite",
        "glitch": "glitch 0.3s ease-in-out",
      },
      keyframes: {
        "glow-pulse": {
          "0%, 100%": { opacity: "1", filter: "brightness(1)" },
          "50%": { opacity: "0.8", filter: "brightness(1.2)" },
        },
        "scan-line": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        "glitch": {
          "0%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px, 2px)" },
          "40%": { transform: "translate(2px, -2px)" },
          "60%": { transform: "translate(-2px, -2px)" },
          "80%": { transform: "translate(2px, 2px)" },
          "100%": { transform: "translate(0)" },
        },
      },
      boxShadow: {
        "neon": "0 0 20px rgba(0, 255, 156, 0.3), 0 0 40px rgba(0, 255, 156, 0.1)",
        "cyan": "0 0 20px rgba(0, 234, 255, 0.3), 0 0 40px rgba(0, 234, 255, 0.1)",
      },
    },
  },
  plugins: [],
};

export default config;
