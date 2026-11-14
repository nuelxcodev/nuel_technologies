"use client";
import { useEffect, useRef } from "react";

/** One shared scroll + pointer handler: progress bar, hero parallax, and the cursor spotlight on cards. */
export default function Effects() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const parallax = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

    const tick = () => {
      raf = 0;
      const y = scrollY;
      const max = document.documentElement.scrollHeight - innerHeight;
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
      if (!reduce) parallax.forEach((el) => { el.style.transform = `translate3d(0, ${-Math.min(y, 900) * Number(el.dataset.speed || 0.06)}px, 0)`; });
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(tick); };
    const onMove = (e: PointerEvent) => {
      const t = (e.target as Element).closest<HTMLElement>("[data-spot]");
      if (!t) return;
      const r = t.getBoundingClientRect();
      t.style.setProperty("--mx", `${e.clientX - r.left}px`);
      t.style.setProperty("--my", `${e.clientY - r.top}px`);
    };

    tick();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      document.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <div ref={bar} aria-hidden className="fixed left-0 top-0 z-[99] h-[3px] w-full origin-left scale-x-0 bg-lime shadow-[0_0_12px_rgb(var(--lime))]" />;
}
