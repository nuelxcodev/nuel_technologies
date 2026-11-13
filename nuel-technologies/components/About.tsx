import Counter from "./Counter";
import Icon from "./Icon";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { process, services, stats } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="py-[clamp(4.5rem,9vw,7.5rem)]">
      <div className="mx-auto w-[min(1160px,92%)]">
        <Reveal className="glass mb-20 grid grid-cols-2 rounded-[22px] md:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`p-7 text-center ${i < 3 ? "md:border-r" : ""} ${i % 2 === 0 ? "max-md:border-r" : ""} ${i < 2 ? "max-md:border-b" : ""} border-white/[.12]`}
            >
              <Counter n={s.n} suffix={s.suffix} />
              <span className="text-sm text-mute">{s.label}</span>
            </div>
          ))}
        </Reveal>

        <SectionHead
          icon="spark"
          tag="About us"
          title="One team for your software, content and video."
          text="We turn business problems into reliable products, ship in small steps you can see, and stay to support what we build."
        />

        <div className="grid gap-[1.1rem] md:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 80} className={s.wide ? "md:col-span-2" : ""}>
              <article className="glass group relative h-full overflow-hidden rounded-3xl p-7 transition duration-300 hover:-translate-y-1.5 hover:border-lime/50">
                <span className="pointer-events-none absolute -right-14 -top-14 h-[200px] w-[200px] rounded-full bg-lime opacity-0 blur-[80px] transition duration-500 group-hover:opacity-20" />
                <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl border border-lime/25 bg-lime/10 text-lime">
                  <Icon name={s.icon} className="!h-6 !w-6" />
                </div>
                <h3 className="mb-2 text-xl">{s.title}</h3>
                <p className="relative text-[.96rem] text-mute">{s.text}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="relative mt-20 grid grid-cols-2 gap-6 md:grid-cols-4">
          <span aria-hidden className="absolute left-[10%] right-[10%] top-6 hidden h-px bg-[repeating-linear-gradient(90deg,rgba(198,255,61,.5)_0_8px,transparent_8px_16px)] md:block" />
          {process.map((p, i) => (
            <div key={p.title} className="relative text-center">
              <i className="mx-auto mb-4 grid h-[50px] w-[50px] place-items-center rounded-full border border-lime bg-[#0b0f02] font-display text-base font-semibold not-italic text-lime shadow-[0_0_22px_rgba(198,255,61,.3)]">
                {i + 1}
              </i>
              <h3 className="text-lg">{p.title}</h3>
              <p className="text-sm text-mute">{p.text}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
