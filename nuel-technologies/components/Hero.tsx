import Icon from "./Icon";
import GlobeVisual from "./GlobeVisual";
import { getOpenJobs } from "@/lib/jobs";

const headline = "We build the software and media your business grows on.".split(" ");
const accentFrom = 8;

export default async function Hero() {
  const open = (await getOpenJobs()).length;
  return (
    <section id="hero" className="relative overflow-hidden pb-24 pt-[160px] lg:pt-[180px]">
      <div aria-hidden className="grid-bg absolute inset-0" />
      <div className="wrap relative grid items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
        <div>
          {open > 0 ? (
            <a href="#jobs" className="glass group/pill inline-flex items-center gap-2.5 rounded-full py-1.5 pl-4 pr-3 text-[.85rem] font-medium transition hover:border-accent">
              <i className="h-2 w-2 animate-blink rounded-full bg-lime shadow-[0_0_10px_rgb(var(--lime))]" />
              We’re hiring · {open} open {open === 1 ? "role" : "roles"}
              <Icon name="arrow" className="!h-4 !w-4 transition group-hover/pill:translate-x-1" />
            </a>
          ) : (
            <span className="glass inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-[.85rem] font-medium">
              <i className="h-2 w-2 animate-blink rounded-full bg-lime shadow-[0_0_10px_rgb(var(--lime))]" />
              Now taking new projects
            </span>
          )}

          <p className="mt-6 flex animate-fadeup items-center gap-3 font-display text-[.82rem] font-semibold uppercase tracking-[.22em] text-accent [animation-delay:.2s] sm:text-[.88rem]">
            <span aria-hidden className="h-px w-10 bg-accent" />
            Turning Ideas Into Digital Reality
          </p>

          <h1 className="my-6 text-[clamp(2.9rem,6.6vw,5.4rem)]" aria-label={headline.join(" ")}>
            {headline.map((w, i) => (
              <span key={i} aria-hidden className="word mr-[.25em]">
                <span className={i >= accentFrom ? "text-accent" : ""} style={{ "--i": i } as React.CSSProperties}>{w}</span>
              </span>
            ))}
          </h1>

          <p className="max-w-[31em] animate-fadeup text-[1.15rem] text-mute">
            Nuel Technologies is a software company with a creative studio inside. We build web and mobile products, then grow them with social media, video and live streaming.
          </p>

          <div className="my-9 flex animate-fadeup flex-wrap gap-3 [animation-delay:1.05s]">
            <a href="#contact" className="btn group/btn">Start a project <Icon name="arrow" className="transition group-hover/btn:translate-x-1" /></a>
            <a href="#projects" className="btn btn-ghost">View our work</a>
          </div>

          <ul className="flex animate-fadeup flex-wrap gap-x-7 gap-y-2 text-[.9rem] text-mute [animation-delay:1.2s]">
            {[["code", "Web and mobile apps"], ["video", "Video and streaming"], ["share", "Social media"]].map(([i, t]) => (
              <li key={t} className="flex items-center gap-2"><Icon name={i} className="!h-[1.1em] !w-[1.1em] text-accent" />{t}</li>
            ))}
          </ul>
        </div>

        <div data-parallax data-speed="0.07" className="relative mx-auto w-full max-w-[580px]">
          <div className="animate-float">
            <div aria-hidden className="absolute inset-[-8%] rounded-full bg-lime/20 blur-[90px]" />
            <GlobeVisual className="relative aspect-square w-full" />
            <div className="glass absolute -left-2 top-[30%] flex animate-float items-center gap-2 rounded-2xl px-4 py-2.5 text-[.82rem] font-semibold [animation-delay:-2s] sm:-left-6">
              <Icon name="stream" className="text-accent" />Live streaming
            </div>
            <div className="glass absolute -right-2 top-[14%] flex animate-float items-center gap-2 rounded-2xl px-4 py-2.5 text-[.82rem] font-semibold [animation-delay:-4s] sm:-right-4">
              <Icon name="code" className="text-accent" />Web and mobile
            </div>
            <div className="glass absolute -bottom-2 right-[8%] flex animate-float items-center gap-2 rounded-2xl px-4 py-2.5 text-[.82rem] font-semibold [animation-delay:-1s]">
              <Icon name="trend" className="text-accent" />Social growth
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
