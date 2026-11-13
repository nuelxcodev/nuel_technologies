"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";

export default function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-[900ms] ease-out motion-reduce:!translate-y-0 motion-reduce:!opacity-100 motion-reduce:!blur-0 ${
        on ? "translate-y-0 opacity-100 blur-0" : "translate-y-8 opacity-0 blur-sm"
      } ${className}`}
    >
      {children}
    </div>
  );
}
