import { Plural, Trans } from "@lingui/react/macro";

import { GITHUB_HREF } from "./config";
import { DecisionStream } from "./DecisionStream";
import { ECOSYSTEMS } from "./ecosystem-data";
import { Section } from "./Section";

export function Hero() {
  const count = ECOSYSTEMS.length;
  return (
    <Section tone="ink" className="hero" labelledBy="hero-title">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-copy">
        <p className="eyebrow">
          <span className="chip chip-mono">
            <Trans>Early access</Trans>
          </span>
        </p>
        <h1 id="hero-title" className="display">
          <Trans>Every package gets a decision before it reaches your build</Trans>
        </h1>
        <p className="lead">
          <Trans>
            Point your package managers at kurra, a caching pull-through gateway for{" "}
            <Plural value={count} one="# ecosystem" other="# ecosystems" />. Each package is checked
            against advisories, package licenses, and a reputation check, and the decision is
            recorded with its reason.
          </Trans>
        </p>
        <div className="actions">
          <a className="btn btn-primary btn-lg" href={GITHUB_HREF}>
            <Trans>View kurra on GitHub</Trans>
          </a>
          <a className="link-ghost" href="#setup">
            <Trans>See the client setup</Trans>
          </a>
        </div>
      </div>
      <div className="hero-stage">
        <div className="glow" aria-hidden="true" />
        <DecisionStream />
      </div>
    </Section>
  );
}
