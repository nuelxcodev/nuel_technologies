"use client";
import { useState } from "react";
import Collapse from "./Collapse";
import Icon from "./Icon";
import type { Job } from "@/lib/jobs";

type Item = Job & { postedLabel: string };

export default function JobBoard({ jobs, email }: { jobs: Item[]; email: string }) {
  const depts = ["All", ...Array.from(new Set(jobs.map((j) => j.department)))];
  const [dept, setDept] = useState("All");
  const [open, setOpen] = useState<string | null>(null);
  const list = dept === "All" ? jobs : jobs.filter((j) => j.department === dept);

  return (
    <div>
      {depts.length > 2 && (
        <div className="mb-5 flex flex-wrap gap-2" role="group" aria-label="Filter by department">
          {depts.map((d) => (
            <button key={d} aria-pressed={dept === d} onClick={() => { setDept(d); setOpen(null); }}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${dept === d ? "border-accent bg-accent/12 text-fg" : "border-line/15 text-mute hover:border-accent/60 hover:text-fg"}`}>
              {d}
            </button>
          ))}
        </div>
      )}

      <div className="grid gap-3">
        {list.map((j) => {
          const isOpen = open === j.id;
          return (
            <article key={j.id} className={`glass rounded-[20px] transition-colors duration-300 ${isOpen ? "!border-accent/60" : "hover:border-accent/40"}`}>
              <button onClick={() => setOpen(isOpen ? null : j.id)} aria-expanded={isOpen} aria-controls={`job-${j.id}`} className="flex w-full items-center gap-4 px-6 py-5 text-left">
                <span className="flex-1">
                  <span className="block font-display text-[1.2rem] font-semibold tracking-tight">{j.title}</span>
                  <span className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-[.85rem] text-mute">
                    <span className="inline-flex items-center gap-1.5"><Icon name="briefcase" className="!h-4 !w-4 text-accent" />{j.type}</span>
                    <span className="inline-flex items-center gap-1.5"><Icon name="pin" className="!h-4 !w-4 text-accent" />{j.location}</span>
                    <span className="inline-flex items-center gap-1.5"><Icon name="clock" className="!h-4 !w-4 text-accent" />Posted {j.postedLabel}</span>
                  </span>
                </span>
                <em className="hidden rounded-full bg-accent/12 px-3 py-1 text-xs font-semibold not-italic text-accent sm:block">{j.department}</em>
                <Icon name="chevron" className={`text-accent transition duration-500 ${isOpen ? "rotate-180" : ""}`} />
              </button>
              <Collapse open={isOpen} id={`job-${j.id}`}>
                <div className="grid gap-6 px-6 pb-7 md:grid-cols-2">
                  <p className="text-mute md:col-span-2">{j.summary}</p>
                  <div>
                    <h4 className="mb-2 font-display font-semibold">What you will do</h4>
                    <ul className="grid gap-2 text-[.93rem] text-mute">{j.responsibilities.map((r) => <li key={r} className="flex gap-2.5"><Icon name="check" className="mt-1 !h-4 !w-4 text-accent" />{r}</li>)}</ul>
                  </div>
                  <div>
                    <h4 className="mb-2 font-display font-semibold">What we are looking for</h4>
                    <ul className="grid gap-2 text-[.93rem] text-mute">{j.requirements.map((r) => <li key={r} className="flex gap-2.5"><Icon name="check" className="mt-1 !h-4 !w-4 text-accent" />{r}</li>)}</ul>
                  </div>
                  <div className="md:col-span-2">
                    <a className="btn group/btn" href={`mailto:${email}?subject=${encodeURIComponent("Application: " + j.title)}&body=${encodeURIComponent(`Hello Nuel Technologies,\n\nI would like to apply for the ${j.title} role.\n\nName:\nPortfolio or LinkedIn:\n\n(Please attach your CV.)`)}`}>
                      Apply for this role <Icon name="arrow" className="transition group-hover/btn:translate-x-1" />
                    </a>
                  </div>
                </div>
              </Collapse>
            </article>
          );
        })}
      </div>
    </div>
  );
}
