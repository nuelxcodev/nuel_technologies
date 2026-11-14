"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";

// One shared IntersectionObserver for every reveal on the page.
let io: IntersectionObserver | null = null;
const callbacks = new WeakMap<Element, () => void>();
function watch(el: Element, cb: () => void) {
  if (!io) {
    io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { callbacks.get(e.target)?.(); io?.unobserve(e.target); } }),
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
  }
  callbacks.set(el, cb);
  io.observe(el);
}

const hidden = { up: "translate-y-8 opacity-0 blur-[6px]", scale: "scale-95 opacity-0", fade: "opacity-0" };

export default function Reveal({ children, delay = 0, className = "", v = "up" }: { children: ReactNode; delay?: number; className?: string; v?: keyof typeof hidden }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => { if (ref.current) watch(ref.current, () => setOn(true)); }, []);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-[opacity,transform,filter] duration-[900ms] ease-[cubic-bezier(.2,.8,.2,1)] motion-reduce:!translate-y-0 motion-reduce:!scale-100 motion-reduce:!opacity-100 motion-reduce:!blur-0 ${on ? "translate-y-0 scale-100 opacity-100 blur-0" : hidden[v]} ${className}`}
    >
      {children}
    </div>
  );
}
