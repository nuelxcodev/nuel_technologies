import type { ReactNode } from "react";

/** Smooth height animation without measuring: grid-template-rows 0fr -> 1fr. Closed content is inert (not focusable). */
export default function Collapse({ open, id, children }: { open: boolean; id?: string; children: ReactNode }) {
  const inert = (open ? {} : { inert: "" }) as Record<string, string>;
  return (
    <div id={id} className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(.2,.8,.2,1)] ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
      <div className="overflow-hidden" {...inert}>{children}</div>
    </div>
  );
}
