"use client";
import { useState } from "react";
import Collapse from "./Collapse";
import Icon from "./Icon";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { faqs } from "@/lib/content";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="section">
      <div className="wrap">
        <SectionHead icon="chat" tag="FAQ" title="Questions we hear most." text="Straight answers about how we work, what it costs and what happens after launch." />
        <div className="mx-auto grid max-w-3xl gap-3">
          {faqs.map((f, i) => (
            <Reveal key={f.q}>
              <div className={`glass rounded-[18px] transition-colors duration-300 ${open === i ? "!border-accent/60" : "hover:border-accent/40"}`}>
                <button onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i} aria-controls={`faq-${i}`} className="flex w-full items-center gap-4 px-6 py-5 text-left font-display text-[1.08rem] font-semibold tracking-tight">
                  <span className="flex-1">{f.q}</span>
                  <Icon name="plus" className={`text-accent transition duration-500 ${open === i ? "rotate-[135deg]" : ""}`} />
                </button>
                <Collapse open={open === i} id={`faq-${i}`}><p className="px-6 pb-6 text-mute">{f.a}</p></Collapse>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
