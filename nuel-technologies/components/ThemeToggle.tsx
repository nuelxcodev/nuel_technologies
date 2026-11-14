"use client";
import { useEffect, useState } from "react";
import Icon from "./Icon";

type VT = Document & { startViewTransition?: (cb: () => void) => unknown };

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  useEffect(() => { setTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark"); }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    const apply = () => {
      document.documentElement.dataset.theme = next;
      try { localStorage.setItem("theme", next); } catch {}
      setTheme(next);
    };
    const d = document as VT;
    if (d.startViewTransition && !matchMedia("(prefers-reduced-motion: reduce)").matches) d.startViewTransition(apply);
    else apply();
  }

  return (
    <button onClick={toggle} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`} className="glass grid h-10 w-10 place-items-center rounded-full transition hover:scale-105 hover:border-accent">
      <span className="relative block h-5 w-5">
        <Icon name="sun" className={`absolute inset-0 !h-5 !w-5 transition duration-500 ${theme === "dark" ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-0 opacity-0"}`} />
        <Icon name="moon" className={`absolute inset-0 !h-5 !w-5 transition duration-500 ${theme === "light" ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"}`} />
      </span>
    </button>
  );
}
