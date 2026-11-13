import Icon from "./Icon";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { jobs, site } from "@/lib/data";

export default function Jobs() {
  return (
    <section id="jobs" className="py-[clamp(4.5rem,9vw,7.5rem)]">
      <div className="mx-auto w-[min(1160px,92%)]">
        <SectionHead icon="users" tag="Jobs" title="Build the future with Nuel Technologies." text="Join a growing team that values craft, ownership and learning." />
        <div className="mx-auto grid max-w-[860px] gap-3">
          {jobs.map((j) => (
            <Reveal key={j.title}>
              <details className="glass group rounded-[18px] transition open:border-lime/55">
                <summary className="flex cursor-pointer list-none items-center gap-4 px-[1.4rem] py-5 font-display text-[1.12rem] font-semibold [&::-webkit-details-marker]:hidden">
                  <span className="flex-1">
                    {j.title}
                    <small className="block font-sans text-sm font-normal text-mute">{j.stack}</small>
                  </span>
                  <em className="rounded-full bg-lime/10 px-3 py-1 font-sans text-xs font-semibold not-italic text-lime">Open</em>
                  <Icon name="plus" className="text-lime transition group-open:rotate-45" />
                </summary>
                <div className="animate-drop px-[1.4rem] pb-6 text-mute">
                  {j.text}
                  <br />
                  <a className="btn group/btn mt-4" href={`mailto:${site.email}?subject=${encodeURIComponent("Application: " + j.title)}`}>
                    Apply now <Icon name="arrow" className="transition group-hover/btn:translate-x-1" />
                  </a>
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
