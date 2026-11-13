import Icon from "./Icon";

const bars = [35, 52, 44, 68, 60, 82, 74, 96];
const kpis = [
  { k: "Users", v: "12.4k", d: "+12%" },
  { k: "Revenue", v: "₦8.2M", d: "+24%" },
  { k: "Uptime", v: "99.9%", d: "stable" },
];

export default function Hero() {
  return (
    <section id="hero" className="relative pb-24 pt-[170px]">
      <div className="mx-auto grid w-[min(1160px,92%)] items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <span className="glass inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-[.85rem] font-medium">
            <i className="h-2 w-2 animate-blink rounded-full bg-lime shadow-[0_0_10px_#c6ff3d]" />
            Now taking new projects
          </span>
          <h1 className="my-5 text-[clamp(2.8rem,6.4vw,5.2rem)]">
            Software that helps your business <span className="text-lime">grow faster.</span>
          </h1>
          <p className="max-w-[30em] text-[1.15rem] text-mute">
            Nuel Technologies builds software, manages social media, produces video and runs streaming platforms for ambitious businesses.
          </p>
          <div className="my-8 flex flex-wrap gap-3">
            <a href="#contact" className="btn">Start a project <Icon name="arrow" className="transition group-hover:translate-x-1" /></a>
            <a href="#projects" className="btn btn-ghost">View our work</a>
          </div>
          <ul className="flex flex-wrap gap-6 text-[.9rem] text-mute">
            {["Custom built", "Clear pricing", "Ongoing support"].map((t) => (
              <li key={t} className="flex items-center gap-2"><Icon name="check" className="!h-[1.1em] !w-[1.1em] text-lime" />{t}</li>
            ))}
          </ul>
        </div>

        <div className="relative animate-float">
          <div className="glass overflow-hidden rounded-3xl">
            <div className="flex items-center gap-1.5 border-b border-white/[.12] px-[1.1rem] py-3.5">
              <i className="h-2.5 w-2.5 rounded-full bg-lime" /><i className="h-2.5 w-2.5 rounded-full bg-white/20" /><i className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="ml-auto text-xs text-mute">nuel.app/dashboard</span>
            </div>
            <div className="grid gap-4 p-5">
              <div className="grid grid-cols-3 gap-3">
                {kpis.map((x) => (
                  <div key={x.k} className="rounded-2xl border border-white/[.12] bg-white/5 px-3.5 py-3 text-xs text-mute">
                    {x.k}
                    <b className="block font-display text-[1.3rem] font-semibold tracking-tight text-fg">{x.v}</b>
                    <em className="text-[.7rem] not-italic text-lime">{x.d}</em>
                  </div>
                ))}
              </div>
              <div className="flex h-[130px] items-end gap-[7px] rounded-2xl bg-white/[.04] p-2">
                {bars.map((h, i) => (
                  <i
                    key={i}
                    className="flex-1 origin-bottom animate-grow rounded-t-md rounded-b-sm bg-gradient-to-b from-lime to-lime/10"
                    style={{ height: `${h}%`, animationDelay: `${400 + i * 70}ms` }}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="glass absolute -left-8 top-[36%] flex animate-float items-center gap-2 rounded-2xl px-4 py-2.5 text-[.82rem] font-semibold [animation-delay:-2s] max-md:left-0">
            <Icon name="rocket" className="text-lime" />Deployed live
          </div>
          <div className="glass absolute -bottom-5 -right-4 flex animate-float items-center gap-2 rounded-2xl px-4 py-2.5 text-[.82rem] font-semibold [animation-delay:-1s] max-md:right-0">
            <Icon name="trend" className="text-lime" />Growth +38%
          </div>
        </div>
      </div>
    </section>
  );
}
