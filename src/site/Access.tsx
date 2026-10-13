import { Trans } from "@lingui/react/macro";

import { useFormat } from "@/lib/i18n";

import { EcosystemTile } from "./glyphs";
import { Section, SectionHead } from "./Section";

type TokenRow = {
  name: string;
  permissions: string[];
  registries: string[];
  usedHoursAgo: number;
  expiresInDays: number;
};

// Sample tokens. Permission keys are shown as they appear in the API.
const TOKENS: readonly TokenRow[] = [
  {
    name: "release-publisher",
    permissions: ["npm:publish"],
    registries: ["acme-npm"],
    usedHoursAgo: 2,
    expiresInDays: 61,
  },
  {
    name: "ci-build",
    permissions: ["registries:read"],
    registries: [],
    usedHoursAgo: 1,
    expiresInDays: 88,
  },
  {
    name: "audit-export",
    permissions: ["audit:read"],
    registries: [],
    usedHoursAgo: 27,
    expiresInDays: 5,
  },
];

function ClockGlyph() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="8" cy="8" r="6.25" />
      <path d="M8 4.6V8l2.2 1.4" />
    </svg>
  );
}

function TokensPanel() {
  const format = useFormat();
  return (
    <section className="panel" aria-labelledby="tokens-title">
      <header className="panel-head">
        <h3 id="tokens-title" className="panel-title">
          <Trans>Tokens</Trans>
        </h3>
        <span className="chip">
          <Trans>Sample data</Trans>
        </span>
      </header>
      <div className="table-scroll">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">
                <Trans>Name</Trans>
              </th>
              <th scope="col">
                <Trans>Permissions</Trans>
              </th>
              <th scope="col">
                <Trans>Registries</Trans>
              </th>
              <th scope="col">
                <Trans>Last used</Trans>
              </th>
              <th scope="col">
                <Trans>Expires</Trans>
              </th>
            </tr>
          </thead>
          <tbody>
            {TOKENS.map((row) => {
              const soon = row.expiresInDays <= 7;
              return (
                <tr key={row.name}>
                  <th scope="row" className="mono cell-name">
                    {row.name}
                  </th>
                  <td>
                    <span className="chips">
                      {row.permissions.map((p) => (
                        <span key={p} className="chip chip-mono">
                          {p}
                        </span>
                      ))}
                    </span>
                  </td>
                  <td>
                    {row.registries.length === 0 ? (
                      <span className="muted">
                        <Trans>All registries</Trans>
                      </span>
                    ) : (
                      <span className="chips">
                        {row.registries.map((r) => (
                          <span key={r} className="chip chip-mono">
                            <EcosystemTile id="npm" />
                            {r}
                          </span>
                        ))}
                      </span>
                    )}
                  </td>
                  <td className="muted">{format.relativeTime(-row.usedHoursAgo, "hour")}</td>
                  <td>
                    {soon ? (
                      <span className="pill pill-attention">
                        <ClockGlyph />
                        {format.relativeTime(row.expiresInDays, "day")}
                      </span>
                    ) : (
                      <span className="muted">{format.relativeTime(row.expiresInDays, "day")}</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function Access() {
  return (
    <Section id="access" tone="paper" labelledBy="access-title">
      <div className="split split-wide">
        <div>
          <SectionHead
            id="access-title"
            title={<Trans>Give each token only what it needs</Trans>}
            lead={
              <Trans>
                A token can hold fewer permissions than its owner, but never more, and can reach
                only the registries you choose. It expires after 90 days unless you set another
                lifetime.
              </Trans>
            }
          />
          <ul className="points">
            <li>
              <Trans>
                An organization owns its tenants, and organization settings override tenant
                settings.
              </Trans>
            </li>
            <li>
              <Trans>
                Admin, Security, Publisher, Reader, and Auditor roles come with every
                tenant.
              </Trans>
            </li>
            <li>
              <Trans>Sign in with GitHub, or with single sign-on.</Trans>
            </li>
            <li>
              <Trans>
                A CI job can trade its own identity for a short-lived token, so you don’t store a
                secret.
              </Trans>
            </li>
          </ul>
        </div>
        <TokensPanel />
      </div>
    </Section>
  );
}
