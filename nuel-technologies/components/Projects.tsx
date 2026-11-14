import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { projects } from "@/lib/content";

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

export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="wrap">
        <SectionHead icon="layers" tag="Projects" title="Products we design, build and ship." text="A selection of the kinds of solutions our team delivers across software, mobile and media." />
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 100} className="h-full">
              <article data-spot className="spot glass group h-full overflow-hidden rounded-[28px] transition duration-500 hover:-translate-y-2 hover:border-accent/50">
                <div className="relative h-[230px] overflow-hidden bg-gradient-to-br from-accent/15 via-transparent to-lime/10">
                  <Art v={p.art} />
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
                  <span className="glass absolute left-5 top-5 rounded-full px-3 py-1 text-xs font-semibold text-accent">Sample project</span>
                </div>
                <div className="px-7 pb-8 pt-6">
                  <h3 className="mb-2 text-[1.4rem]">{p.title}</h3>
                  <p className="text-[.96rem] text-mute">{p.text}</p>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {p.tags.map((t) => <li key={t} className="rounded-full border border-line/15 px-3 py-1 text-xs font-medium text-mute">{t}</li>)}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-mute">Project names and descriptions are samples. Replace them in lib/content.ts.</p>
      </div>
    </section>
  );
}
