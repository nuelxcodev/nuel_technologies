import Icon from "./Icon";
import Reveal from "./Reveal";

export default function SectionHead({ icon, tag, title, text }: { icon: string; tag: string; title: string; text: string }) {
  return (
    <Reveal className="mx-auto mb-12 max-w-2xl text-center">
      <span className="tag"><Icon name={icon} className="!h-4 !w-4" />{tag}</span>
      <h2 className="mb-4 text-[clamp(2rem,4.4vw,3.2rem)]">{title}</h2>
      <p className="text-[1.08rem] text-mute">{text}</p>
    </Reveal>
  );
}
