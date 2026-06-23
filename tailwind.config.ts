import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bara: {
          bg: "#F8FAFC",
          blue: "#2563EB",
          text: "#111827",
          muted: "#6B7280",
          line: "#E5E7EB"
        }
      },
      boxShadow: {
        soft: "0 10px 30px rgba(15, 23, 42, 0.07)"
      }
    }
  },
  plugins: []
};

export default config;
