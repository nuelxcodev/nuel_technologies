import Icon from "./Icon";
import Logo from "./Logo";
import { services } from "@/lib/content";
import { nav, site } from "@/lib/site";

const link = "flex items-center gap-2.5 py-1 text-mute transition hover:translate-x-1 hover:text-accent";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line/10 pt-20">
      <div className="wrap">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          <div>
            <a href="#hero" className="flex items-center gap-2.5 font-display text-[1.1rem] font-semibold tracking-tight"><Logo size={32} />{site.name}</a>
            <p className="mt-4 max-w-[24em] text-mute">Software, content and streaming for growing businesses, delivered and supported by a team you can reach.</p>
          </div>
          <div>
            <h3 className="mb-4 text-[.95rem]">Services</h3>
            {services.map((s) => <a key={s.title} className={link} href="#services">{s.title}</a>)}
          </div>
          <div>
            <h3 className="mb-4 text-[.95rem]">Company</h3>
            {nav.map((n) => <a key={n.href} className={link} href={n.href}>{n.label}</a>)}
          </div>
          <div>
            <h3 className="mb-4 text-[.95rem]">Contact</h3>
            <a className={link} href={`mailto:${site.email}`}><Icon name="mail" className="!h-[1.05em] !w-[1.05em] text-accent" />{site.email}</a>
            {site.phones.map((p) => <a key={p.tel} className={link} href={`tel:${p.tel}`}><Icon name="call" className="!h-[1.05em] !w-[1.05em] text-accent" />{p.label}</a>)}
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-3 border-t border-line/10 pt-6 text-sm text-mute">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <a href="#hero" className="inline-flex items-center gap-2 transition hover:text-accent">Back to top <Icon name="arrow" className="-rotate-90 !h-4 !w-4" /></a>
        </div>
      </div>
      <div aria-hidden className="pointer-events-none select-none bg-gradient-to-b from-fg/20 to-transparent bg-clip-text text-center font-display text-[clamp(4.5rem,19vw,17rem)] font-semibold leading-[.8] tracking-tighter text-transparent">NUEL</div>
    </footer>
  );
}
