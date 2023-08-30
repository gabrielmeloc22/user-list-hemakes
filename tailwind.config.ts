import type { Config } from "tailwindcss";

const config: Config = {
  mode: "jit",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        custom: {
          primary: "#3b82f6",
          secondary: "#84f98a",
          neutral: "#27202c",
          "base-100": "#f3f3f7",
          success: "#dcfce7",
          "success-content": "#16a34a",
          error: "#fecaca",
          "error-content": "#be123c",
          info: "#bfdbfe",
          "info-content": "#1d4ed8",
        },
      },
    ],
  },
};
export default config;
