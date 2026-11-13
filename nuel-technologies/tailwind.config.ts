import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.ts"],
  theme: {
    extend: {
      colors: {
        ink: "#050505",
        fg: "#f5f7f0",
        mute: "#9ca39a",
        lime: { DEFAULT: "#c6ff3d", deep: "#8fe000" },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-grotesk)", "Trebuchet MS", "sans-serif"],
      },
      keyframes: {
        drift: { to: { transform: "translate(70px,50px) scale(1.15)" } },
        float: { "50%": { transform: "translateY(-12px)" } },
        marquee: { to: { transform: "translateX(-50%)" } },
        grow: { from: { transform: "scaleY(0)" } },
        draw: { to: { strokeDashoffset: "0" } },
        blink: { "50%": { opacity: ".35" } },
        drop: { from: { opacity: "0", transform: "translateY(-6px)" } },
      },
      animation: {
        drift: "drift 18s ease-in-out infinite alternate",
        float: "float 8s ease-in-out infinite",
        marquee: "marquee 30s linear infinite",
        grow: "grow 1.3s cubic-bezier(.2,.8,.2,1) both",
        draw: "draw 1.2s .2s forwards",
        blink: "blink 2s infinite",
        drop: "drop .5s both",
      },
    },
  },
  plugins: [],
};
export default config;
