import type { Config } from "tailwindcss";
import daisyui from "daisyui";

// Create your custom theme using the Theme generator tool here: https://daisyui.com/theme-generator/
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [daisyui],
  daisyui: {
    themes: ["light", "dark"],
  },
};
export default config;
