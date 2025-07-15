/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1A56DB",      // still keeping this for buttons etc.
        secondary: "#FDBA74",
        dark: "#111827",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        forumtheme: {
          primary: "#1A56DB",
          secondary: "#FDBA74",
          accent: "#37CDBE",
          neutral: "#2A2E37",         // slightly lighter dark
          "base-100": "#FFFFFF",      // full white background
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",
          // Add text colors (optional override)
          "--btn-text-color": "#1F2937",       // gray-800
          "--text-color": "#374151",           // gray-700 for general text
        },
      },
    ],
  },
};
