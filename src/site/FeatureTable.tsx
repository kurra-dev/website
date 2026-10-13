import { useLingui } from "@lingui/react/macro";

import { FEATURE_GROUPS, type Availability } from "./feature-data";

function Included() {
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

/** The open source and Enterprise columns for every feature, in groups. Each cell says its answer in words too. */
export function FeatureTable() {
  const { t, i18n } = useLingui();

  const cell = (value: Availability) => {
    if (value === "yes") {
      return (
        <>
          <Included />
          <span className="sr-only">{t`Included`}</span>
        </>
      );
    }
    if (value === "no") {
      return (
        <>
          <span aria-hidden="true">–</span>
          <span className="sr-only">{t`Not included`}</span>
        </>
      );
    }
    return <span className="cell-text">{i18n._(value)}</span>;
  };

  return (
    <div className="compare-scroll">
      <table className="compare">
        <caption className="sr-only">{t`Features in the open source version and in Enterprise`}</caption>
        <thead>
          <tr>
            <th scope="col">{t`Feature`}</th>
            <th scope="col" className="col-edition">
              {t`Open source`}
            </th>
            <th scope="col" className="col-edition">
              {t`Enterprise`}
            </th>
          </tr>
        </thead>
        {FEATURE_GROUPS.map((group) => (
          <tbody key={group.id}>
            <tr className="group-row">
              <th scope="colgroup" colSpan={3}>
                {i18n._(group.title)}
              </th>
            </tr>
            {group.rows.map((row) => (
              <tr key={row.id}>
                <th scope="row" className="feature-name">
                  <span>{i18n._(row.name)}</span>
                  {row.note ? <span className="feature-note">{i18n._(row.note)}</span> : null}
                </th>
                <td className="col-edition">{cell(row.openSource)}</td>
                <td className="col-edition">{cell(row.enterprise)}</td>
              </tr>
            ))}
          </tbody>
        ))}
      </table>
    </div>
  );
}
