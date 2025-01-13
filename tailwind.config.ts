import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors : {
        yeoriSky:"#C3EBFA",
        yeoriSkyLight:"#C3EBFA",
        yeoriPurple:"#CFCEFF",
        yeoriPurpleLight:"#F1F0FF",
        yeoriYellow:"#FAE27C",
        yeoriYellowLight:"#FEFCE8",
      }
    },
  },
  plugins: [],
};
export default config;
