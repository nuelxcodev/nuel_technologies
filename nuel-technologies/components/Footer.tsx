import Icon from "./Icon";
import Logo from "./Logo";
import { nav, site } from "@/lib/data";

const link = "flex items-center gap-2.5 py-1 text-mute transition hover:translate-x-1 hover:text-lime";

export default function Footer() {
  return (
    <footer className="border-t border-white/[.12] pb-8 pt-[4.5rem]">
      <div className="mx-auto w-[min(1160px,92%)]">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <a href="#hero" className="flex items-center gap-2.5 font-display text-[1.1rem] font-semibold tracking-tight"><Logo size={32} />{site.name}</a>
            <p className="mt-4 max-w-[24em] text-mute">Software built around your business, delivered and supported by a team you can reach.</p>
          </div>
          <div>
            <h3 className="mb-4 text-[.95rem]">Contact</h3>
            <a className={link} href={`mailto:${site.email}`}><Icon name="mail" className="!h-[1.05em] !w-[1.05em] text-lime" />{site.email}</a>
            {site.phones.map((p) => (
              <a key={p.tel} className={link} href={`tel:${p.tel}`}><Icon name="call" className="!h-[1.05em] !w-[1.05em] text-lime" />{p.label}</a>
            ))}
          </div>
          <div>
            <h3 className="mb-4 text-[.95rem]">Company</h3>
            {[...nav, { href: "#contact", label: "Contact form" }].map((n) => (
              <a key={n.href} className={link} href={n.href}>{n.label}</a>
            ))}
          </div>
        </div>
        <p className="mt-12 border-t border-white/[.12] pt-5 text-sm text-mute">© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}
