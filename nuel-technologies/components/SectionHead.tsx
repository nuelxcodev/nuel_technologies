import Icon from "./Icon";
import Reveal from "./Reveal";

export default function SectionHead({ icon, tag, title, text }: { icon: string; tag: string; title: string; text: string }) {
  return (
    <Reveal className="mx-auto mb-14 max-w-3xl text-center">
      <span className="tag glass"><Icon name={icon} className="!h-4 !w-4" />{tag}</span>
      <h2 className="mb-4 text-[clamp(2.1rem,4.6vw,3.4rem)]">{title}</h2>
      <p className="text-[1.08rem] text-mute">{text}</p>
    </Reveal>
  );
}
