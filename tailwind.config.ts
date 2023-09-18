import type { Config } from "tailwindcss";

const config: Config = {
  "tailwindCSS.includeLanguages": {
    html: "html",
    javascript: "javascript",
    css: "css",
  },
  "editor.quickSuggestions": {
    strings: true,
  },
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{html,js}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  darkMode: "class",
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    colors: {
      main: {
        whileColor: "#ffffff",
        "whileColor-70": "rgba(255,255,255,0.7)",
        "whileColor-50": "rgba(255,255,255,0.5)",
        "whileColor-40": "rgba(255,255,255,0.4)",
        "whileColor-30": "rgba(255,255,255,0.3)",
        "whileColor-20": "rgba(255,255,255,0.2)",
        blackColor: "#000000",
        "grayColor-20": "rgba(0,0,0,0.2)",
        "grayColor-40": "rgba(0,0,0,0.4)",
        "grayColor-45": "rgba(0,0,0,0.45)",
        "grayColor-50": "rgba(0,0,0,0.5)",
        "grayColor-70": "rgba(0,0,0,0.7)",
        "grayColor-80": "rgba(0,0,0,0.8)",
        "grayColor-90": "rgba(0,0,0,0.9)",
        "violet-f5": "#F5F3FF",
        "violet-ed": "#EDE9FE",
        "violet-dd": "#DDD6FE",
        "violet-c4": "#C4B5FD",
        "violet-c4-50": "rgba(196, 181, 253,0.5)",
        "violet-a7": "#A78BFA",
        "violet-8b": "#8B5CF6",
        "violet-7c": "#7C3AED",
        "violet-6d": "#6D28D9",
        "violet-5b": "#5B21B6",
        "violet-4c": "#4C1D95",
        "pink-fd": "#FDF2F8",
        "pink-fc": "#FCE7F3",
        "pink-fb": "#FBCFE8",
        "pink-f9": "#F9A8D4",
        "pink-f4": "#F472B6",
        "pink-ec": "#EC4899",
        "pink-db": "#DB2777",
        "pink-be": "#BE185D",
        "pink-9d": "#9D174D",
        "pink-83": "#831843",
        "gray-18": "rgba(24, 24, 24, 0.6)",
        "blue-dark": "rgba(91, 33, 182, 0.4)",
      },
    },
    satisfies: ["animate-[fade-in-up_1s_ease-in-out]"],
    extend: {
      fontFamily: {
        lato: ["var(--font-lato)"],
        nunito: ["var(--font-nunito)"],
        digitalfont: ["DigitalFont"],
      },
      backgroundImage: {
        mainBackground: "url('/asset/image/mainBackground.png')",
        frameFooter: "url('/asset/image/frameFooter.png')",
        authBackround: "url('/asset/image/authBackground.png')",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      gridTemplateRows: {
        // Simple 8 row grid
        "7": "repeat(7, minmax(0, 1fr))",
      },
      animation: {
        fadeIn_20: "fadeIn 0.2s ease-in-out",
        fadeInDown: "fadeInDown 0.5s ease-in-out",
        fadeUp: "fadeUp 1s ease-in-out",
        slipLeftToRight: "slipLeftToRight 0.5s ease-in-out",
        spin: "spin 1.2s linear infinite",
      },
      keyframes: (theme) => ({
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(100%)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInDown: {
          "0%": { opacity: "0.5", height: "0" },
          "100%": { opacity: "1", height: "426px" },
        },
        slipLeftToRight: {
          "0%": {
            transform: "translateX(-120%)",
          },
          "100%": { transform: "translateX(0)" },
        },
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      }),
    },
  },
  plugins: [require("tw-elements/dist/plugin.cjs")],
};
export default config;
