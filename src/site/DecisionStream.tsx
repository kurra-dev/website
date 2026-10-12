import { Trans, useLingui } from "@lingui/react/macro";
import { useEffect, useState } from "react";

import { useFormat } from "@/lib/i18n";

import { DecisionPill } from "./DecisionPill";
import { ECOSYSTEM_NAME } from "./ecosystem-data";
import { DecisionGlyph, EcosystemTile, type Decision } from "./glyphs";
import { SAMPLE_ROWS, type SampleRow } from "./sample-data";
import { ReasonText } from "./samples";

const WINDOW = 6;
const TICK_MS = 2600;
// Sample clock, UTC. Machine-facing timestamps are mono, tabular and not localized.
const BASE_SECONDS = 14 * 3600 + 32 * 60 + 7;

function clock(index: number): string {
  const s = (BASE_SECONDS + index * 4 + (index % 3)) % 86400;
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(Math.floor(s / 3600))}:${p(Math.floor((s % 3600) / 60))}:${p(s % 60)}`;
}

function PackageName({ row }: { row: SampleRow }) {
  const joiner = row.scope?.startsWith("@") ? "/" : ":";
  return (
    <span className="pkg mono">
      {row.scope ? <span className="pkg-scope">{row.scope + joiner}</span> : null}
      {row.name}
      <span className="pkg-version"> {row.version}</span>
    </span>
  );
}

/** The signature moment: packages arrive and are allowed or blocked, each with its reason. */
export function DecisionStream() {
  const { t } = useLingui();
  const format = useFormat();
  const [arrived, setArrived] = useState(WINDOW);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);
    const onChange = () => setReducedMotion(query.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const running = !paused && !reducedMotion;
  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => setArrived((n) => n + 1), TICK_MS);
    return () => window.clearInterval(timer);
  }, [running]);

  const rows = Array.from({ length: WINDOW }, (_, i) => {
    const index = arrived - 1 - i;
    return {
      index,
      row: SAMPLE_ROWS[index % SAMPLE_ROWS.length]!,
      fresh: i === 0 && arrived > WINDOW,
    };
  });
  const counts: Record<Decision, number> = { allowed: 0, blocked: 0 };
  for (const { row } of rows) counts[row.decision] += 1;

  return (
    <section className="panel stream" aria-labelledby="stream-title">
      <header className="panel-head">
        <h2 id="stream-title" className="panel-title">
          <Trans>Activity</Trans>
        </h2>
        <span className="chip">
          <Trans>Sample data</Trans>
        </span>
        <span className="panel-head-fill" />
        {reducedMotion ? null : (
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            aria-pressed={paused}
            onClick={() => setPaused((p) => !p)}
          >
            {paused ? t`Resume updates` : t`Pause updates`}
          </button>
        )}
      </header>

      <ul className="stream-legend" aria-label={t`Decisions in this sample`}>
        {(["allowed", "blocked"] as const).map((d) => (
          <li key={d} className={`legend legend-${d}`}>
            <DecisionGlyph decision={d} />
            <span>{d === "allowed" ? t`Allowed` : t`Blocked`}</span>
            <span className="count mono">{format.number(counts[d])}</span>
          </li>
        ))}
        <li className="legend-note">
          <Trans>Times in UTC</Trans>
        </li>
      </ul>

      <ol className="ledger">
        {rows.map(({ index, row, fresh }) => (
          <li key={index} className={fresh ? "ledger-row ledger-row-new" : "ledger-row"}>
            <span className="ledger-decision">
              <DecisionPill decision={row.decision} />
            </span>
            <span className="ledger-main">
              <PackageName row={row} />
              <span className="ledger-reason">
                <ReasonText reason={row.reason} />
              </span>
            </span>
            <span className="ledger-eco">
              <EcosystemTile id={row.ecosystem} />
              <span className="sr-only">{ECOSYSTEM_NAME[row.ecosystem]}</span>
            </span>
            <span className="ledger-time mono">{clock(index)}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
