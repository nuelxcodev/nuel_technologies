import Icon from "./Icon";
import ProjectWizard from "./ProjectWizard";
import Reveal from "./Reveal";
import { site, waLink } from "@/lib/site";

const row = "group/r flex items-center gap-3 rounded-2xl py-2 text-[.97rem] transition hover:translate-x-1";

export default function Contact() {
  return (
    <section id="contact" className="section pt-0">
      <div className="wrap">
        <Reveal v="scale" className="glass relative overflow-hidden rounded-[32px] p-[clamp(1.6rem,5vw,4rem)]">
          <span aria-hidden className="pointer-events-none absolute -left-32 -top-40 h-[420px] w-[420px] rounded-full bg-lime opacity-25 blur-[130px]" />
          <div className="relative grid gap-12 lg:grid-cols-[1fr_1.05fr]">
            <div>
              <h2 className="text-[clamp(2rem,4.2vw,3.2rem)]">Have an idea? Let’s build it together.</h2>
              <p className="mt-4 max-w-[30em] text-mute">Answer four quick questions and we will prepare a clear proposal. Prefer to talk? Reach us directly using any option below.</p>
              <div className="mt-8 grid gap-1">
                <a className={row} href={`mailto:${site.email}`}><span className="grid h-10 w-10 place-items-center rounded-xl border border-accent/25 bg-accent/10 text-accent"><Icon name="mail" /></span>{site.email}</a>
                {site.phones.map((p) => (
                  <a key={p.tel} className={row} href={`tel:${p.tel}`}><span className="grid h-10 w-10 place-items-center rounded-xl border border-accent/25 bg-accent/10 text-accent"><Icon name="call" /></span>{p.label}</a>
                ))}
                <a className={row} href={waLink("Hello Nuel Technologies, I would like to discuss a project.")} target="_blank" rel="noopener noreferrer"><span className="grid h-10 w-10 place-items-center rounded-xl border border-accent/25 bg-accent/10 text-accent"><Icon name="chat" /></span>Chat on WhatsApp</a>
              </div>
            </div>
            <div className="glass rounded-3xl p-6 sm:p-8"><ProjectWizard /></div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
