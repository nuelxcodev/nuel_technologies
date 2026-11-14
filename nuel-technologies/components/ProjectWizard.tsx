"use client";
import { useState } from "react";
import Icon from "./Icon";
import { wizard } from "@/lib/content";
import { site, waLink } from "@/lib/site";

const titles = ["What do you need?", "When do you want to start?", "What is your budget?", "How can we reach you?"];

export default function ProjectWizard() {
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState<string[]>([]);
  const [timeline, setTimeline] = useState("");
  const [budget, setBudget] = useState("");
  const [f, setF] = useState({ name: "", email: "", phone: "", note: "" });
  const [sent, setSent] = useState(false);

  const ok = [picked.length > 0, !!timeline, !!budget, !!f.name.trim() && /\S+@\S+\.\S+/.test(f.email)][step];
  const message = `Hello Nuel Technologies,\n\nI would like to discuss a project.\n\nServices: ${picked.join(", ")}\nTimeline: ${timeline}\nBudget: ${budget}\n\nName: ${f.name}\nEmail: ${f.email}\nPhone: ${f.phone || "-"}\n\n${f.note}`;
  const mail = `mailto:${site.email}?subject=${encodeURIComponent("Project enquiry from " + f.name)}&body=${encodeURIComponent(message)}`;
  const toggle = (id: string) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  if (sent)
    return (
      <div className="animate-enter py-6 text-center">
        <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-lime text-onlime"><Icon name="check" className="!h-7 !w-7" /></div>
        <h3 className="text-2xl">Your brief is ready to send.</h3>
        <p className="mx-auto mt-2 max-w-sm text-mute">If your email or WhatsApp did not open, use the buttons below. We will reply with next steps.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a className="btn" href={mail}>Send by email</a>
          <a className="btn btn-ghost" href={waLink(message)} target="_blank" rel="noopener noreferrer">Send on WhatsApp</a>
        </div>
        <button className="mt-5 text-sm text-mute underline-offset-4 hover:text-fg hover:underline" onClick={() => { setSent(false); setStep(0); }}>Start over</button>
      </div>
    );

  return (
    <div>
      <div className="mb-6 flex gap-1.5" role="progressbar" aria-valuemin={1} aria-valuemax={4} aria-valuenow={step + 1} aria-label="Project planner progress">
        {titles.map((_, i) => <i key={i} className={`h-1 flex-1 rounded-full transition-colors duration-500 ${i <= step ? "bg-lime" : "bg-line/15"}`} />)}
      </div>
      <p className="text-sm text-mute">Step {step + 1} of 4</p>
      <h3 className="mb-5 mt-1 text-2xl">{titles[step]}</h3>

      <div key={step} className="animate-enter">
        {step === 0 && (
          <div className="grid gap-2.5 sm:grid-cols-2">
            {wizard.services.map((s) => (
              <button key={s.id} type="button" className="opt" aria-pressed={picked.includes(s.id)} onClick={() => toggle(s.id)}>
                <Icon name={s.icon} className="text-accent" />{s.id}
              </button>
            ))}
          </div>
        )}
        {step === 1 && <div className="grid gap-2.5">{wizard.timelines.map((t) => <button key={t} type="button" className="opt" aria-pressed={timeline === t} onClick={() => setTimeline(t)}>{t}</button>)}</div>}
        {step === 2 && <div className="grid gap-2.5">{wizard.budgets.map((b) => <button key={b} type="button" className="opt" aria-pressed={budget === b} onClick={() => setBudget(b)}>{b}</button>)}</div>}
        {step === 3 && (
          <div className="grid gap-3">
            <input className="field" placeholder="Your name" aria-label="Your name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} autoComplete="name" />
            <input className="field" type="email" placeholder="Your email" aria-label="Your email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} autoComplete="email" />
            <input className="field" type="tel" placeholder="Phone or WhatsApp (optional)" aria-label="Phone number" value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} autoComplete="tel" />
            <textarea className="field" rows={3} placeholder="Anything else we should know?" aria-label="Project notes" value={f.note} onChange={(e) => setF({ ...f, note: e.target.value })} />
          </div>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between gap-3">
        <button type="button" onClick={() => setStep(step - 1)} className={`text-sm font-medium text-mute transition hover:text-fg ${step === 0 ? "invisible" : ""}`}>Back</button>
        {step < 3 ? (
          <button type="button" disabled={!ok} onClick={() => setStep(step + 1)} className="btn group/btn disabled:pointer-events-none disabled:opacity-40">Continue <Icon name="arrow" className="transition group-hover/btn:translate-x-1" /></button>
        ) : (
          <a href={ok ? mail : undefined} aria-disabled={!ok} onClick={() => ok && setSent(true)} className={`btn group/btn ${ok ? "" : "pointer-events-none opacity-40"}`}>Send my brief <Icon name="arrow" className="transition group-hover/btn:translate-x-1" /></a>
        )}
      </div>
    </div>
  );
}
