import Icon from "./Icon";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { process, services } from "@/lib/content";

const span = { 1: "", 2: "md:col-span-2", 3: "md:col-span-3" } as const;

export default function Services() {
  return (
    <section id="services" className="section">
      <div className="wrap">
        <SectionHead icon="layers" tag="Services" title="Everything your business needs to build, launch and grow." text="Six service lines, one accountable team. Use one, or combine them for a product, a brand and an audience that move together." />

        <div className="grid gap-4 md:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 90} className={`h-full ${span[s.cols as 1 | 2 | 3]}`}>
              <article data-spot className="spot glass group relative flex h-full flex-col overflow-hidden rounded-[26px] p-7 transition duration-300 hover:-translate-y-1.5 hover:border-accent/50">
                <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl border border-accent/25 bg-accent/10 text-accent transition duration-500 group-hover:rotate-6 group-hover:scale-110"><Icon name={s.icon} className="!h-6 !w-6" /></div>
                <h3 className="mb-2 text-[1.35rem]">{s.title}</h3>
                <p className="mb-5 max-w-[46em] text-[.97rem] text-mute">{s.text}</p>
                <ul className={`mt-auto grid gap-2 text-sm ${s.cols === 3 ? "sm:grid-cols-3" : ""}`}>
                  {s.points.map((p) => (
                    <li key={p} className="flex items-center gap-2.5"><Icon name="check" className="!h-4 !w-4 text-accent" />{p}</li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-24">
          <h3 className="mb-10 text-center text-[clamp(1.6rem,3vw,2.2rem)]">How a project runs</h3>
          <ol className="relative grid gap-5 md:grid-cols-4">
            <span aria-hidden className="absolute left-[12%] right-[12%] top-6 hidden h-px bg-[repeating-linear-gradient(90deg,rgb(var(--accent)/.5)_0_8px,transparent_8px_16px)] md:block" />
            {process.map((p, i) => (
              <li key={p.title} className="relative text-center">
                <i className="relative z-10 mx-auto mb-5 grid h-12 w-12 place-items-center rounded-full border border-accent bg-ink font-display font-semibold not-italic text-accent shadow-[0_0_22px_rgb(var(--accent)/.3)]">{i + 1}</i>
                <h4 className="font-display text-lg font-semibold">{p.title}</h4>
                <p className="mx-auto mb-3 mt-1 max-w-[18em] text-sm text-mute">{p.text}</p>
                <ul className="mx-auto grid max-w-[16em] gap-1 text-left text-[.82rem] text-mute">
                  {p.points.map((x) => <li key={x} className="flex gap-2"><Icon name="check" className="mt-0.5 !h-3.5 !w-3.5 text-accent" />{x}</li>)}
                </ul>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
