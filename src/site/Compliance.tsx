import { Trans } from "@lingui/react/macro";
import type { ReactNode } from "react";

import { Section, SectionHead } from "./Section";

function Fact({ title, children }: { title: ReactNode; children: ReactNode }) {
  return (
    <article className="fact">
      <h3 className="h3">{title}</h3>
      <p>{children}</p>
    </article>
  );
}

export function Compliance() {
  return (
    <Section id="compliance" tone="ink" labelledBy="compliance-title">
      <SectionHead
        id="compliance-title"
        title={<Trans>Compliance records, built in</Trans>}
        lead={
          <Trans>
            Advisories, package licenses, software bills of materials, provenance, and an audit log
            sit next to the cache, not in a separate tool.
          </Trans>
        }
      />
      <div className="facts">
        <Fact title={<Trans>Advisories</Trans>}>
          <Trans>
            Each version is checked against published advisories from npm and OSV. This covers npm,
            Go, Cargo, Maven, and NuGet, and PyPI on first pull.
          </Trans>
        </Fact>
        <Fact title={<Trans>Package licenses</Trans>}>
          <Trans>
            Set an SPDX allow or deny list. This covers npm, PyPI, Cargo, Go, Maven, and NuGet. A
            license kurra can’t read is allowed, not blocked.
          </Trans>
        </Fact>
        <Fact title={<Trans>Reputation check</Trans>}>
          <Trans>
            Flags a package name that looks like a typosquat of a popular one, before the package is
            fetched.
          </Trans>
        </Fact>
        <Fact title={<Trans>Software bill of materials</Trans>}>
          <Trans>
            Generated in CycloneDX format the first time a Docker or Helm image is cached.
          </Trans>
        </Fact>
        <Fact title={<Trans>Provenance</Trans>}>
          <Trans>
            Verifies SLSA provenance from a Sigstore bundle you supply, for packages you host. kurra
            stores public keys and never signs anything.
          </Trans>
        </Fact>
        <Fact title={<Trans>Activity and audit log</Trans>}>
          <Trans>
            Each decision is recorded with what decided, when, and why. The audit log behind it is
            tamper-evident and can be exported on the Enterprise plan.
          </Trans>
        </Fact>
      </div>
      <p className="footnote">
        <Trans>Which checks are included depends on your plan.</Trans>
      </p>
    </Section>
  );
}
