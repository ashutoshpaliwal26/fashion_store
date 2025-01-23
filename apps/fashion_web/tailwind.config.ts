import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes : {
        wiggle: {
          '0%': { 
            transform: 'translateY(-20)',
            opacity : '0'
           },
          '100%': { 
            transform: 'translateY(0)',
            opacity : '1'
           },
        }
      },
      animation : {
        "toast" :  "wiggle 1s linear 1"
      }
    },
  },
  plugins: [],
} satisfies Config;
