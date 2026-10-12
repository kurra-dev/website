import type { ReactNode } from "react";

/** One band of the page. Sections alternate ink (dark scope) and paper (light scope); tokens follow the scope. */
export function Section({
  id,
  tone,
  className = "",
  labelledBy,
  children,
}: {
  id?: string;
  tone: "ink" | "paper";
  className?: string;
  labelledBy?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      data-theme={tone === "ink" ? "dark" : "light"}
      className={`band band-${tone} ${className}`.trim()}
      aria-labelledby={labelledBy}
    >
      <div className="wrap">{children}</div>
    </section>
  );
}

/** Section heading block: an H2 and a lead, at most 68 characters wide. */
export function SectionHead({
  id,
  title,
  lead,
}: {
  id: string;
  title: ReactNode;
  lead?: ReactNode;
}) {
  return (
    <header className="section-head">
      <h2 id={id} className="h2">
        {title}
      </h2>
      {lead ? <p className="lead">{lead}</p> : null}
    </header>
  );
}
