import Icon from "./Icon";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { team } from "@/lib/team";

const initials = (n: string) => n.split(" ").map((x) => x[0]).slice(0, 2).join("");

export default function Team() {
  return (
    <section id="team" className="section">
      <div className="wrap">
        <SectionHead icon="users" tag="Our team" title="The people behind the work." text="Engineers, designers, videographers and social media specialists who work side by side on every project." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m, i) => (
            <Reveal key={m.name} delay={(i % 3) * 90} className="h-full">
              <article data-spot className="spot glass group h-full rounded-[26px] p-6 transition duration-300 hover:-translate-y-1.5 hover:border-accent/50">
                <div className="relative mb-5 aspect-[4/3] overflow-hidden rounded-2xl" style={{ background: `conic-gradient(from ${i * 60}deg at 70% 30%, rgb(var(--lime) / .55), rgb(94 224 160 / .25), rgb(var(--line) / .06), rgb(var(--lime) / .55))` }}>
                  {m.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={m.photo} alt={m.name} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                  ) : (
                    <span className="absolute inset-0 grid place-items-center font-display text-5xl font-semibold tracking-tight text-fg/80 transition duration-500 group-hover:scale-110">{initials(m.name)}</span>
                  )}
                </div>
                <h3 className="text-xl">{m.name}</h3>
                <p className="mb-2 text-sm font-semibold text-accent">{m.role}</p>
                <p className="text-[.93rem] text-mute">{m.bio}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-8 text-center">
          <a href="#jobs" className="btn btn-ghost group/btn">Want to join us? See open roles <Icon name="arrow" className="transition group-hover/btn:translate-x-1" /></a>
        </Reveal>
      </div>
    </section>
  );
}
