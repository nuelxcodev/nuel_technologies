"use client";
import { useEffect, useState } from "react";
import Icon from "./Icon";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import { nav, site } from "@/lib/site";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const els = ["hero", ...nav.map((n) => n.href.slice(1))].map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) setActive(e.target.id === "hero" ? "" : e.target.id); }), { rootMargin: "-40% 0px -55% 0px" });
    els.forEach((e) => io.observe(e));
    const onScroll = () => setSolid(scrollY > 20);
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => { io.disconnect(); removeEventListener("scroll", onScroll); };
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-[90] pt-[calc(env(safe-area-inset-top,0px)+12px)]">
      <div className="wrap">
        <nav aria-label="Main" className={`glass flex h-[60px] items-center justify-between rounded-[18px] pl-[1.1rem] pr-2.5 transition-shadow duration-500 ${solid ? "shadow-[0_20px_50px_-20px_rgba(0,0,0,.6)]" : ""}`}>
          <a href="#hero" aria-label={`${site.name} home`} className="flex items-center gap-2.5 font-display text-[1.1rem] font-semibold tracking-tight">
            <Logo />
            <span className="hidden sm:inline">{site.name}</span>
          </a>

          <ul className="hidden items-center gap-0.5 lg:flex">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className={`block rounded-full px-3.5 py-2 text-[.92rem] font-medium transition ${active === n.href.slice(1) ? "bg-line/10 text-fg" : "text-mute hover:bg-line/10 hover:text-fg"}`}>{n.label}</a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a href="#contact" className="btn !hidden !px-4 !py-2.5 lg:!inline-flex">Start a project</a>
            <button aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)} className="grid h-10 w-10 place-items-center rounded-full lg:hidden">
              <Icon name={open ? "close" : "menu"} className="!h-6 !w-6" />
            </button>
          </div>
        </nav>

        <div onClick={() => setOpen(false)} className={`glass mt-2 rounded-[20px] p-3 transition duration-300 lg:hidden ${open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-3 opacity-0"}`}>
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="block rounded-xl px-4 py-3 font-medium text-mute transition hover:bg-line/10 hover:text-fg">{n.label}</a>
          ))}
          <a href="#contact" className="btn mt-2 w-full">Start a project</a>
        </div>
      </div>
    </header>
  );
}
