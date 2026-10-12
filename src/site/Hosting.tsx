import { Trans } from "@lingui/react/macro";

import { GITHUB_HREF } from "./config";
import { Section, SectionHead } from "./Section";

export function Hosting() {
  return (
    <Section id="hosting" tone="ink" labelledBy="hosting-title">
      <SectionHead
        id="hosting-title"
        title={<Trans>Use Kurra cloud, or run Kurra yourself</Trans>}
        lead={
          <Trans>
            Either way, your packages live in a storage bucket you own, and each tenant stays
            separate from the others.
          </Trans>
        }
      />
      <div className="tiles tiles-3">
        <article className="tile">
          <h3 className="h3">
            <Trans>Storage you own</Trans>
          </h3>
          <p>
            <Trans>
              Each tenant configures its own S3-compatible bucket. Kurra has none of its own.
            </Trans>
          </p>
        </article>
        <article className="tile">
          <h3 className="h3">
            <Trans>Self-hosted</Trans>
          </h3>
          <p>
            <Trans>Run Kurra with Docker Compose or a Helm chart, inside your own network.</Trans>
          </p>
        </article>
        <article className="tile">
          <h3 className="h3">
            <Trans>Separate tenants</Trans>
          </h3>
          <p>
            <Trans>
              Registries, tokens, roles, usage, and activity belong to one tenant, a team or
              business unit inside your organization.
            </Trans>
          </p>
        </article>
      </div>

      <div className="closing">
        <div className="notch" aria-hidden="true" />
        <h2 className="h2">
          <Trans>Put a decision in front of every install</Trans>
        </h2>
        <p className="lead">
          <Trans>Find the code, the documentation, and the latest changes on GitHub.</Trans>
        </p>
        <a className="btn btn-primary btn-lg" href={GITHUB_HREF}>
          <Trans>View Kurra on GitHub</Trans>
        </a>
      </div>
    </Section>
  );
}
