import Counter from "./Counter";
import Icon from "./Icon";
import Reveal from "./Reveal";
import { mission, stats, story, values } from "@/lib/content";

export default function About() {
  return (
    <section id="about" className="section">
      <div className="wrap">
        <Reveal className="glass mb-24 grid grid-cols-2 rounded-[24px] md:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.label} className={`p-7 text-center border-line/10 ${i < 3 ? "md:border-r" : ""} ${i % 2 === 0 ? "max-md:border-r" : ""} ${i < 2 ? "max-md:border-b" : ""}`}>
              <Counter n={s.n} suffix={s.suffix} />
              <span className="text-sm text-mute">{s.label}</span>
            </div>
          ))}
        </Reveal>

        <div className="grid gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
          <Reveal>
            <span className="tag glass"><Icon name="spark" className="!h-4 !w-4" />About us</span>
            <h2 className="mb-6 text-[clamp(2.1rem,4.6vw,3.4rem)]">A software company with a creative studio inside.</h2>
            <div className="space-y-5 text-[1.05rem] text-mute">
              {story.map((p) => <p key={p}>{p}</p>)}
            </div>
            <blockquote className="mt-8 border-l-2 border-accent pl-5 font-display text-xl leading-snug tracking-tight">{mission}</blockquote>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 90} className="h-full">
                <article data-spot className="spot glass h-full rounded-3xl p-6 transition duration-300 hover:-translate-y-1.5 hover:border-accent/50">
                  <div className="mb-4 grid h-11 w-11 place-items-center rounded-2xl border border-accent/25 bg-accent/10 text-accent"><Icon name={v.icon} /></div>
                  <h3 className="mb-2 text-xl">{v.title}</h3>
                  <p className="text-[.95rem] text-mute">{v.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
