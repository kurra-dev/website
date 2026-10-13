import { Plural, Trans } from "@lingui/react/macro";

import { ECOSYSTEMS } from "./ecosystem-data";
import { EcosystemTile, type EcosystemId } from "./glyphs";
import { Section, SectionHead } from "./Section";

// Where each check applies (glossary: facts the copy must not contradict, 4 and 5). Docker, Helm and Terraform have
// neither check.
const ADVISORIES: ReadonlySet<EcosystemId> = new Set([
  "npm",
  "pypi",
  "rubygems",
  "composer",
  "cargo",
  "go",
  "maven",
  "nuget",
  "apt",
  "apk",
  "rpm",
]);
const LICENSES: ReadonlySet<EcosystemId> = new Set([
  "npm",
  "pypi",
  "cargo",
  "go",
  "maven",
  "nuget",
]);

export function Ecosystems() {
  const count = ECOSYSTEMS.length;
  return (
    <Section id="ecosystems" tone="paper" labelledBy="ecosystems-title">
      <SectionHead
        id="ecosystems-title"
        title={
          <Plural value={count} one="# ecosystem, one gateway" other="# ecosystems, one gateway" />
        }
        lead={
          <Trans>
            Tokens, roles, and activity work the same way in every ecosystem. Advisory and license
            checks run wherever the ecosystem provides the data.
          </Trans>
        }
      />
      <ul className="eco-grid">
        {ECOSYSTEMS.map(({ id, name }) => (
          <li key={id} className="eco-card">
            <EcosystemTile id={id} large />
            <span className="eco-name">{name}</span>
            <span className="eco-checks">
              {ADVISORIES.has(id) ? (
                <span className="chip">
                  <Trans>Advisories</Trans>
                </span>
              ) : null}
              {LICENSES.has(id) ? (
                <span className="chip">
                  <Trans>Licenses</Trans>
                </span>
              ) : null}
            </span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
