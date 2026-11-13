"use client";
import type { FormEvent } from "react";
import Icon from "./Icon";
import Reveal from "./Reveal";
import { site } from "@/lib/data";

const field =
  "w-full rounded-2xl border border-white/[.12] bg-black/35 px-4 py-3.5 text-[.96rem] text-fg placeholder:text-[#7b827a] focus:border-lime focus:outline-none focus:ring-[3px] focus:ring-lime/20";

export default function Contact() {
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const subject = encodeURIComponent(`Project enquiry from ${d.get("name")}`);
    const body = encodeURIComponent(`${d.get("message")}\n\n${d.get("name")} (${d.get("email")})`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  }

  return (
    <section id="contact" className="pb-[clamp(4.5rem,9vw,7.5rem)]">
      <div className="mx-auto w-[min(1160px,92%)]">
        <Reveal className="glass relative grid items-center gap-10 overflow-hidden rounded-[30px] p-[clamp(2rem,6vw,4rem)] md:grid-cols-2">
          <span aria-hidden className="pointer-events-none absolute -left-32 -top-36 h-[380px] w-[380px] rounded-full bg-lime opacity-25 blur-[120px]" />
          <div className="relative">
            <h2 className="text-[clamp(1.9rem,3.8vw,2.8rem)]">Have an idea? Let’s build it together.</h2>
            <p className="mt-3 text-mute">Tell us about your project and we will reply with next steps.</p>
          </div>
          <form onSubmit={onSubmit} className="relative grid gap-3">
            <input name="name" className={field} placeholder="Your name" aria-label="Your name" required />
            <input name="email" type="email" className={field} placeholder="Your email" aria-label="Your email" required />
            <textarea name="message" rows={3} className={field} placeholder="Tell us about your project" aria-label="Project details" required />
            <button type="submit" className="btn group/btn justify-center">Send message <Icon name="arrow" className="transition group-hover/btn:translate-x-1" /></button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
