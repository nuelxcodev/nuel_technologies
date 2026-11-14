"use client";
import { useEffect, useRef, useState } from "react";

export default function Counter({ n, suffix = "" }: { n: number; suffix?: string }) {
  const ref = useRef<HTMLElement>(null);
  const [v, setV] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      if (reduce) return setV(n);
      const t0 = performance.now();
      const step = (t: number) => {
        const p = Math.min((t - t0) / 1400, 1);
        setV(Math.round(n * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, { threshold: 0.6 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [n]);
  return <b ref={ref} className="block font-display text-4xl font-semibold tracking-tight text-accent md:text-5xl">{v}{suffix}</b>;
}
