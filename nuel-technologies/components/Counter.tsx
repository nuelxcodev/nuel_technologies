"use client";
import { useEffect, useRef, useState } from "react";

export default function Counter({ n, suffix = "" }: { n: number; suffix?: string }) {
  const ref = useRef<HTMLElement>(null);
  const [v, setV] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      if (reduce) return setV(n);
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min((t - t0) / 1300, 1);
        setV(Math.round(n * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => io.disconnect();
  }, [n]);
  return <b ref={ref} className="block font-display text-4xl font-semibold tracking-tight text-lime">{v}{suffix}</b>;
}
