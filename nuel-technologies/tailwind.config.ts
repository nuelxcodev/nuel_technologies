import type { Config } from "tailwindcss";

const v = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.ts"],
  theme: {
    extend: {
      colors: {
        ink: v("bg"),
        fg: v("fg"),
        mute: v("mute"),
        accent: v("accent"), // text, icons, borders (darker green in light mode)
        lime: v("lime"), // fills: buttons, glows (same in both themes)
        onlime: v("on-lime"),
        line: v("line"), // white in dark mode, near-black in light mode
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-grotesk)", "Trebuchet MS", "sans-serif"],
      },
      keyframes: {
        drift: { to: { transform: "translate(70px,50px) scale(1.15)" } },
        float: { "50%": { transform: "translateY(-12px)" } },
        marquee: { to: { transform: "translateX(-50%)" } },
        blink: { "50%": { opacity: ".35" } },
        enter: { from: { opacity: "0", transform: "translateX(14px)" } },
        rise: { to: { transform: "none" } },
        fadeup: { from: { opacity: "0", transform: "translateY(18px)" } },
      },
      animation: {
        drift: "drift 18s ease-in-out infinite alternate",
        float: "float 8s ease-in-out infinite",
        marquee: "marquee 40s linear infinite",
        "marquee-rev": "marquee 46s linear infinite reverse",
        blink: "blink 2s infinite",
        enter: "enter .5s cubic-bezier(.2,.8,.2,1) both",
        fadeup: "fadeup 1s .9s cubic-bezier(.2,.8,.2,1) both",
      },
    },
  },
  plugins: [],
};
export default config;
