import Icon from "./Icon";
import Reveal from "./Reveal";
import { pillars } from "@/lib/content";

export default function WhyUs() {
  return (
    <section className="section pt-0">
      <div className="wrap">
        <Reveal v="scale" className="glass relative overflow-hidden rounded-[32px] p-[clamp(1.8rem,5vw,4rem)]">
          <span aria-hidden className="pointer-events-none absolute -right-24 -top-32 h-[380px] w-[380px] rounded-full bg-lime opacity-20 blur-[120px]" />
          <div className="relative grid gap-12 lg:grid-cols-[.85fr_1.15fr]">
            <div>
              <h2 className="text-[clamp(2rem,4vw,3rem)]">Why teams choose Nuel Technologies.</h2>
              <p className="mt-4 max-w-[28em] text-mute">We combine engineering depth with creative production, and we communicate like partners, not vendors.</p>
              <a href="#contact" className="btn group/btn mt-7">Plan your project <Icon name="arrow" className="transition group-hover/btn:translate-x-1" /></a>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {pillars.map((p) => (
                <div key={p.title}>
                  <div className="mb-3 grid h-10 w-10 place-items-center rounded-xl border border-accent/25 bg-accent/10 text-accent"><Icon name={p.icon} /></div>
                  <h3 className="mb-1.5 text-lg leading-tight">{p.title}</h3>
                  <p className="text-[.93rem] text-mute">{p.text}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
