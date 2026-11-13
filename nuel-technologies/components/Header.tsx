"use client";
import { useEffect, useState } from "react";
import Icon from "./Icon";
import Logo from "./Logo";
import { nav, site } from "@/lib/data";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const ids = [...nav.map((n) => n.href.slice(1)), "contact"];
    const onScroll = () => {
      let cur = "";
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < innerHeight * 0.4) cur = id;
      });
      setActive(cur);
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-[90] pt-[calc(env(safe-area-inset-top,0px)+12px)]">
      <div className="mx-auto w-[min(1160px,92%)]">
        <nav aria-label="Main" className="glass flex h-[60px] items-center justify-between rounded-[18px] pl-[1.1rem] pr-3">
          <a href="#hero" aria-label={`${site.name} home`} className="flex items-center gap-2.5 font-display text-[1.1rem] font-semibold tracking-tight">
            <Logo />{site.name}
          </a>
          <button aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)} className="grid h-11 w-11 place-items-center md:hidden">
            <Icon name={open ? "close" : "menu"} className="!h-6 !w-6" />
          </button>
          <ul
            onClick={() => setOpen(false)}
            className={`${
              open ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-3 opacity-0"
            } glass fixed inset-x-[4%] top-[84px] flex flex-col gap-1 rounded-[20px] !bg-black/85 p-3 transition duration-300 md:pointer-events-auto md:static md:translate-y-0 md:flex-row md:items-center md:gap-1 md:border-0 md:!bg-transparent md:p-0 md:opacity-100 md:shadow-none md:backdrop-blur-none`}
          >
            {nav.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  className={`block rounded-full px-4 py-2 text-[.92rem] font-medium transition ${
                    active === n.href.slice(1) ? "bg-white/10 text-fg" : "text-mute hover:bg-white/10 hover:text-fg"
                  }`}
                >
                  {n.label}
                </a>
              </li>
            ))}
            <li><a href="#contact" className="btn !px-[1.1rem] !py-2.5 max-md:justify-center">Get in touch</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
