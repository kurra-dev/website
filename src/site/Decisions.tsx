import { Trans } from "@lingui/react/macro";

import { REFUSAL_NEXT_STEP, REFUSAL_OUTCOME, REFUSED_COMMAND } from "./client-output";
import { DecisionPill } from "./DecisionPill";
import { Section, SectionHead } from "./Section";

export function Decisions() {
  return (
    <Section id="decisions" tone="ink" labelledBy="decisions-title">
      <SectionHead
        id="decisions-title"
        title={<Trans>Two decisions, each with a reason</Trans>}
        lead={
          <Trans>
            Every package version is Allowed or Blocked. kurra records what decided and why, so the
            person whose build stopped can read the rule that stopped it.
          </Trans>
        }
      />
      <div className="tiles tiles-3">
        <article className="tile">
          <DecisionPill decision="allowed" />
          <h3 className="h3">
            <Trans>Nothing stopped it</Trans>
          </h3>
          <p>
            <Trans>
              Either the checks found no reason to stop it, or a person allowed it. Allowed means no
              rule stopped it. It never means safe.
            </Trans>
          </p>
        </article>
        <article className="tile">
          <DecisionPill decision="blocked" />
          <h3 className="h3">
            <Trans>kurra refuses to serve it</Trans>
          </h3>
          <p>
            <Trans>
              The reason names the cause, such as an advisory, a license, or an administrator.
              Clients get an error that names the rule and points to a way forward.
            </Trans>
          </p>
        </article>
      </div>

      <div className="split split-even">
        <div>
          <h3 className="h3 h3-lg">
            <Trans>A reason in the terminal, not a mystery</Trans>
          </h3>
          <p className="body">
            <Trans>
              The message your package manager prints leads with the outcome, names the rule, and
              says what to do next.
            </Trans>
          </p>
          <p className="body">
            <Trans>
              People can also allow or block a package by hand. A manual decision never expires, and
              only a person can clear it.
            </Trans>
          </p>
        </div>
        <figure className="terminal">
          <pre tabIndex={0}>
            <code>
              <span className="term-prompt">$ </span>
              {REFUSED_COMMAND}
              {"\n"}
              <span className="term-err">{REFUSAL_OUTCOME}</span>
              {"\n"}
              {REFUSAL_NEXT_STEP}
            </code>
          </pre>
        </figure>
      </div>
    </Section>
  );
}
