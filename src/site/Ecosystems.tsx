import { Plural, Trans, useLingui } from "@lingui/react/macro";

import { applies, type ControlId } from "./control-coverage";
import { ECOSYSTEMS } from "./ecosystem-data";
import { EcosystemTile } from "./glyphs";
import { Section, SectionHead } from "./Section";

export function Ecosystems() {
  const { t } = useLingui();
  const count = ECOSYSTEMS.length;
  // The four policy controls, from the control coverage table. Signatures and attestations are on the features page.
  const chips: readonly { control: ControlId; label: string }[] = [
    { control: "reputation", label: t`Reputation` },
    { control: "minimumAge", label: t`Release age` },
    { control: "advisory", label: t`Advisories` },
    { control: "license", label: t`Licenses` },
  ];
  return (
    <Section id="ecosystems" tone="paper" labelledBy="ecosystems-title">
      <SectionHead
        id="ecosystems-title"
        title={
          <Plural value={count} one="# ecosystem, one gateway" other="# ecosystems, one gateway" />
        }
        lead={
          <Trans>
            Tokens, roles, and activity work the same way in every ecosystem. Policy checks run
            wherever the ecosystem provides the data they need.
          </Trans>
        }
      />
      <ul className="eco-grid">
        {ECOSYSTEMS.map(({ id, name }) => (
          <li key={id} className="eco-card">
            <EcosystemTile id={id} large />
            <span className="eco-name">{name}</span>
            <span className="eco-checks">
              {chips
                .filter(({ control }) => applies(id, control))
                .map(({ control, label }) => (
                  <span key={control} className="chip">
                    {label}
                  </span>
                ))}
            </span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
