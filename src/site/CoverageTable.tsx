import { useLingui } from "@lingui/react/macro";

import { CONTROLS, COVERAGE, type Level } from "./control-coverage";
import { ECOSYSTEMS } from "./ecosystem-data";
import { EcosystemTile } from "./glyphs";

function Tick() {
  return (
    <svg
      className="mark"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="m3.2 8.4 3 3 6.6-7" />
    </svg>
  );
}

const SORTED_ECOSYSTEMS = [...ECOSYSTEMS].sort((a, b) =>
  a.name.localeCompare(b.name, "en", { sensitivity: "base" }),
);

/** Which Enterprise policy controls cover which ecosystems: a tick, "Partly", or a dash, each also said in words. */
export function CoverageTable() {
  const { t, i18n } = useLingui();

  const cell = (level: Level) => {
    if (level === "covered") {
      return (
        <>
          <Tick />
          <span className="sr-only">{t`Covered`}</span>
        </>
      );
    }
    if (level === "partial") return <span className="cell-text">{t`Partly`}</span>;
    return (
      <>
        <span aria-hidden="true">–</span>
        <span className="sr-only">{t`Not covered`}</span>
      </>
    );
  };

  return (
    <div className="compare-scroll coverage-scroll">
      <table className="compare coverage">
        <caption className="sr-only">{t`Which ecosystems each Enterprise control covers`}</caption>
        <thead>
          <tr>
            <th scope="col">{t`Ecosystem`}</th>
            {CONTROLS.map((c) => (
              <th key={c.id} scope="col" className="col-control">
                {i18n._(c.name)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {SORTED_ECOSYSTEMS.map(({ id, name }) => (
            <tr key={id}>
              <th scope="row" className="feature-name">
                <span className="coverage-name">
                  <EcosystemTile id={id} />
                  {name}
                </span>
              </th>
              {CONTROLS.map((c) => (
                <td key={c.id} className="col-control">
                  {cell(COVERAGE[id][c.id])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
