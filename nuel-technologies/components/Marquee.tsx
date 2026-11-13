import { marquee } from "@/lib/data";

export default function Marquee() {
  const words = [...marquee, ...marquee];
  return (
    <div
      aria-hidden
      className="overflow-hidden border-y border-white/[.12] py-[1.1rem] [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]"
    >
      <div className="flex w-max animate-marquee gap-12 font-display text-[1.1rem] font-semibold text-mute">
        {words.map((w, i) => (
          <span key={i} className="flex items-center gap-12">
            {w}
            <i className="h-1.5 w-1.5 rounded-full bg-lime" />
          </span>
        ))}
      </div>
    </div>
  );
}
