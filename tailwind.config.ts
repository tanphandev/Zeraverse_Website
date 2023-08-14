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
        "violet-f5": "#F5F3FF",
        "violet-ed": "#EDE9FE",
        "violet-dd": "#DDD6FE",
        "violet-c4": "#C4B5FD",
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
      },
    },
    extend: {
      fontFamily: {
        lato: ["var(--font-lato)"],
        nunito: ["var(--font-nunito)"],
      },
    },
    backgroundImage: {
      backgroundBlue: "url('/asset/image/backgroundBlue.png')",
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: false, // true: all themes | false: only light + dark | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: "light", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    rtl: false, // rotate style direction from left-to-right to right-to-left. You also need to add dir="rtl" to your html tag and install `tailwindcss-flip` plugin for Tailwind CSS.
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
  },
};
export default config;