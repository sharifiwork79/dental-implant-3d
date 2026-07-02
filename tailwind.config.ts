import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        clinic: {
          bone: "#F7F8FA",      // near-white enamel background
          mist: "#EAEFF3",      // soft clinical gray-blue
          steel: "#C7D3DC",     // instrument steel
          teal: "#1F7A73",      // deep clinical teal — signature accent
          "teal-bright": "#3FB8A6",
          navy: "#0B1E28",      // near-black background for deep scenes
          ink: "#0E1A20",
          coral: "#E4785C",     // sparing warm accent for CTA/alerts
        },
      },
      fontFamily: {
        display: ["var(--font-peyda)", "Vazirmatn", "sans-serif"],
        body: ["var(--font-vazir)", "Vazirmatn", "sans-serif"],
      },
      backdropBlur: {
        xs: "2px",
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.9)", opacity: "0.8" },
          "100%": { transform: "scale(1.6)", opacity: "0" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-ring": "pulse-ring 2.2s cubic-bezier(0.4,0,0.6,1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
