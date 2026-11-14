import { stackA, stackB } from "@/lib/content";

function Row({ items, cls }: { items: string[]; cls: string }) {
  const all = [...items, ...items];
  return (
    <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
      <div className={`flex w-max gap-12 font-display text-[1.1rem] font-semibold text-mute ${cls}`}>
        {all.map((w, i) => (
          <span key={i} className="flex items-center gap-12">{w}<i className="h-1.5 w-1.5 rounded-full bg-accent" /></span>
        ))}
      </div>
    </div>
  );
}

export default function Marquee() {
  return (
    <div aria-hidden className="grid gap-4 border-y border-line/10 py-6">
      <Row items={stackA} cls="animate-marquee" />
      <Row items={stackB} cls="animate-marquee-rev" />
    </div>
  );
}
