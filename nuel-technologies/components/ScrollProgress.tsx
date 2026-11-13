"use client";
import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      if (bar.current) bar.current.style.width = `${max > 0 ? (scrollY / max) * 100 : 0}%`;
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);
  return <div ref={bar} className="fixed left-0 top-0 z-[99] h-[3px] w-0 bg-lime shadow-[0_0_12px_#c6ff3d]" />;
}
