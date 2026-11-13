import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { projects } from "@/lib/data";

export default function Projects() {
  return (
    <section id="projects" className="py-[clamp(4.5rem,9vw,7.5rem)]">
      <div className="mx-auto w-[min(1160px,92%)]">
        <SectionHead icon="layers" tag="Projects" title="Products we design, build and ship." text="A selection of the kinds of solutions our team delivers." />
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 90}>
              <article className="glass group overflow-hidden rounded-[26px] transition duration-500 hover:-translate-y-2 hover:border-lime/50">
                <div
                  className="grid h-[220px] place-items-end overflow-hidden bg-[#0a0a0a]"
                  style={{ backgroundImage: `radial-gradient(circle at 30% 20%, ${p.tint}, transparent 65%)` }}
                >
                  <div className="glass grid h-[78%] w-3/4 content-start gap-2 rounded-t-2xl p-3.5 transition duration-500 group-hover:-translate-y-2.5 group-hover:scale-[1.03]">
                    <i className="h-3 w-2/5 rounded-md bg-lime" />
                    <div className="grid h-12 grid-cols-3 gap-1.5">
                      {[0, 1, 2].map((n) => <b key={n} className="rounded-[9px] bg-white/10" />)}
                    </div>
                    <i className="h-[9px] w-[70%] rounded-md bg-white/15" />
                    <i className="h-[9px] rounded-md bg-white/15" />
                  </div>
                </div>
                <div className="px-7 pb-8 pt-6">
                  <h3 className="mb-1.5 text-[1.35rem]">{p.title}</h3>
                  <p className="text-[.96rem] text-mute">{p.text}</p>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <li key={t} className="rounded-full border border-white/[.12] px-3 py-1 text-xs font-medium text-mute">{t}</li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-mute">Project names and details are samples. Replace them in lib/data.ts.</p>
      </div>
    </section>
  );
}
