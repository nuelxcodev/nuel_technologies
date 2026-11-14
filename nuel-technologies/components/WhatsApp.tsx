"use client";
import { useEffect, useState } from "react";
import Icon from "./Icon";
import { waLink } from "@/lib/site";

export default function WhatsApp() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(scrollY > 500);
    on();
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);
  return (
    <a
      href={waLink("Hello Nuel Technologies, I would like to discuss a project.")}
      target="_blank" rel="noopener noreferrer" aria-label="Chat with us on WhatsApp"
      className={`fixed bottom-[calc(env(safe-area-inset-bottom,0px)+1.25rem)] right-5 z-[80] grid h-14 w-14 place-items-center rounded-full bg-lime text-onlime shadow-[0_10px_30px_-8px_rgb(var(--lime)/.7)] transition duration-500 hover:scale-110 ${show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"}`}
    >
      <Icon name="chat" className="!h-6 !w-6" />
    </a>
  );
}
