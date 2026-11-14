"use client";
import { useState } from "react";
import Collapse from "./Collapse";
import Icon from "./Icon";
import Reveal from "./Reveal";
import type { Project } from "@/lib/types";

const VISIBLE = 2;

function Art({ v }: { v: number }) {
  const s = "stroke-accent";
  return (
    <svg viewBox="0 0 400 220" className="absolute inset-0 h-full w-full transition duration-[900ms] group-hover:scale-110" preserveAspectRatio="xMidYMid slice" aria-hidden>
      {v === 0 && (<g fill="none" className={s}>{[28, 55, 85, 118, 155, 195].map((r, i) => <circle key={r} cx="270" cy="110" r={r} strokeWidth="1" opacity={0.75 - i * 0.1} />)}{[[270, 82], [214, 110], [300, 196], [330, 60]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="4.5" className="fill-accent" />)}</g>)}
      {v === 1 && (<g fill="none" className={s} strokeWidth="1.2">{[0, 1, 2, 3, 4, 5, 6].map((i) => <path key={i} d={`M-10 ${70 + i * 18} C90 ${10 + i * 18}, 190 ${150 + i * 14}, 290 ${80 + i * 16} S400 ${60 + i * 12}, 420 ${90 + i * 10}`} opacity={0.9 - i * 0.1} />)}</g>)}
      {v === 2 && (<g className="fill-accent">{Array.from({ length: 12 * 7 }, (_, n) => { const x = n % 12, y = Math.floor(n / 12); const d = Math.abs(x - y * 1.8 - 1); return <circle key={n} cx={40 + x * 29} cy={30 + y * 28} r={d < 2 ? 4.2 : 1.6} opacity={d < 2 ? 0.95 : 0.35} />; })}</g>)}
      {v === 3 && (<g className={s} fill="none"><path d="M40 170 L120 90 L200 140 L280 50 L360 110 M120 90 L170 40 L280 50 M200 140 L260 190 L360 110 M40 170 L100 200 L200 140" strokeWidth="1.2" opacity=".7" />{[[40, 170], [120, 90], [200, 140], [280, 50], [360, 110], [170, 40], [260, 190], [100, 200]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="5" className="fill-accent" />)}</g>)}
    </svg>
  );
}

function Card({ p, art }: { p: Project; art: number }) {
  const details = [["Client", p.client], ["Industry", p.industry], ["Year", p.year], ["Duration", p.duration]].filter(([, v]) => v);
  const r = p.review;
  return (
    <article data-spot className="spot glass group flex h-full flex-col overflow-hidden rounded-[28px] transition duration-500 hover:-translate-y-2 hover:border-accent/50">
      <div className="relative h-[230px] shrink-0 overflow-hidden bg-gradient-to-br from-accent/15 via-transparent to-lime/10">
        {p.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={p.image} alt={p.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-[900ms] group-hover:scale-110" />
        ) : (
          <Art v={art % 4} />
        )}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
        {p.category && <span className="glass absolute left-5 top-5 rounded-full px-3 py-1 text-xs font-semibold text-accent">{p.category}</span>}
      </div>

      <div className="flex flex-1 flex-col px-7 pb-8 pt-6">
        <h3 className="mb-2 text-[1.4rem]">{p.title}</h3>
        <p className="text-[.96rem] text-mute">{p.description}</p>

        {details.length > 0 && (
          <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-line/10 pt-5 text-sm">
            {details.map(([k, v]) => (
              <div key={k}>
                <dt className="text-xs uppercase tracking-wider text-mute">{k}</dt>
                <dd className="font-medium">{v}</dd>
              </div>
            ))}
          </dl>
        )}

        {p.tags.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-1.5">
            {p.tags.map((t) => <li key={t} className="rounded-full border border-line/15 px-3 py-1 text-xs font-medium text-mute">{t}</li>)}
          </ul>
        )}

        {r && (
          <figure className="mt-6 rounded-2xl border border-line/10 bg-line/[.04] p-4">
            {r.rating > 0 && (
              <div className="mb-2 flex gap-0.5 text-accent" role="img" aria-label={`${r.rating} out of 5 stars`}>
                {Array.from({ length: 5 }, (_, i) => <Icon key={i} name="star" className={`!h-4 !w-4 ${i < r.rating ? "fill-current" : "opacity-30"}`} />)}
              </div>
            )}
            <blockquote className="text-[.93rem] leading-relaxed">“{r.quote}”</blockquote>
            {(r.name || r.company) && (
              <figcaption className="mt-3 text-sm">
                <span className="font-semibold">{r.name}</span>
                <span className="text-mute">{[r.role, r.company].filter(Boolean).length ? ` · ${[r.role, r.company].filter(Boolean).join(", ")}` : ""}</span>
              </figcaption>
            )}
          </figure>
        )}

        {p.link && (
          <a href={p.link} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent transition hover:gap-3">
            Visit project <Icon name="arrow" className="!h-4 !w-4 -rotate-45" />
          </a>
        )}
      </div>
    </article>
  );
}

function Grid({ items, offset }: { items: Project[]; offset: number }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {items.map((p, i) => (
        <Reveal key={p.id || p.title} delay={(i % 2) * 100} className="h-full">
          <Card p={p} art={p.art ?? offset + i} />
        </Reveal>
      ))}
    </div>
  );
}

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  const [all, setAll] = useState(false);
  const first = projects.slice(0, VISIBLE);
  const rest = projects.slice(VISIBLE);

  return (
    <>
      <Grid items={first} offset={0} />
      {rest.length > 0 && (
        <>
          <Collapse open={all} id="more-projects">
            <div className="pb-2 pt-6"><Grid items={rest} offset={VISIBLE} /></div>
          </Collapse>
          <div className="mt-10 text-center">
            <button type="button" aria-expanded={all} aria-controls="more-projects" onClick={() => setAll(!all)} className="btn btn-ghost">
              {all ? "Show fewer projects" : `View more projects (${rest.length})`}
              <Icon name="chevron" className={`transition duration-500 ${all ? "rotate-180" : ""}`} />
            </button>
          </div>
        </>
      )}
    </>
  );
}
