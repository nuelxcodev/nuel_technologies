import Icon from "./Icon";
import JobBoard from "./JobBoard";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { benefits } from "@/lib/content";
import { getOpenJobs } from "@/lib/jobs";
import { site } from "@/lib/site";

export default async function Jobs() {
  const open = await getOpenJobs();
  const items = open.map((j) => ({ ...j, postedLabel: new Date(j.posted).toLocaleDateString("en-GB", { month: "short", year: "numeric", timeZone: "UTC" }) }));

  return (
    <section id="jobs" className="section">
      <div className="wrap">
        <SectionHead icon="briefcase" tag="Careers" title="Build the future with Nuel Technologies." text="Join a growing team that values craft, ownership and learning. Every open position appears below, and we update this list as we grow." />

        <div className="mb-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b, i) => (
            <Reveal key={b.title} delay={(i % 3) * 80} className="h-full">
              <div data-spot className="spot glass h-full rounded-3xl p-6 transition duration-300 hover:-translate-y-1 hover:border-accent/50">
                <div className="mb-4 grid h-11 w-11 place-items-center rounded-2xl border border-accent/25 bg-accent/10 text-accent"><Icon name={b.icon} /></div>
                <h3 className="mb-1.5 text-lg">{b.title}</h3>
                <p className="text-[.93rem] text-mute">{b.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {items.length > 0 ? (
          <Reveal>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-2xl">Open positions</h3>
              <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium">
                <i className="h-2 w-2 animate-blink rounded-full bg-lime shadow-[0_0_10px_rgb(var(--lime))]" />
                {items.length} {items.length === 1 ? "role" : "roles"} open now
              </span>
            </div>
            <JobBoard jobs={items} email={site.email} />
          </Reveal>
        ) : (
          <Reveal v="scale">
            <div className="glass mx-auto max-w-2xl rounded-[28px] p-8 text-center">
              <h3 className="mb-2 text-2xl">No open positions right now</h3>
              <p className="mb-6 text-mute">We are not hiring for a specific role at the moment, but we always like to meet talented people. Send us your CV and portfolio and we will keep it on file.</p>
              <a className="btn group/btn" href={`mailto:${site.email}?subject=${encodeURIComponent("Open application")}`}>Send an open application <Icon name="arrow" className="transition group-hover/btn:translate-x-1" /></a>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
