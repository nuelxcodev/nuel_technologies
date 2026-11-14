export default function Orbs() {
  const base = "absolute rounded-full blur-[110px] animate-drift opacity-[var(--orb)]";
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <i className={`${base} -left-40 -top-14 h-[520px] w-[520px] bg-lime`} />
      <i className={`${base} -right-32 top-[38vh] h-[420px] w-[420px] bg-[#5ee0a0] [animation-delay:-6s]`} />
      <i className={`${base} -bottom-52 left-[30%] h-[480px] w-[480px] bg-lime [animation-delay:-11s]`} />
    </div>
  );
}
