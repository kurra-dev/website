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
            are part of the cache itself, not a separate tool you add.
          </Trans>
        }
      />
      <div className="facts">
        <Fact title={<Trans>Advisories</Trans>}>
          <Trans>
            Each version is checked against published advisories from npm and OSV the first time it
            is pulled. Cached versions are checked again later. Every ecosystem is covered except
            Docker, Helm, and Terraform.
          </Trans>
        </Fact>
        <Fact title={<Trans>Package licenses</Trans>}>
          <Trans>
            Set an SPDX allow list or deny list for npm, PyPI, Cargo, Go, Maven, and NuGet. If Kurra
            can’t read a package’s license, it allows the package.
          </Trans>
        </Fact>
        <Fact title={<Trans>Reputation check</Trans>}>
          <Trans>
            Flags npm and PyPI package names that look like typosquats of popular packages, before
            anything is fetched.
          </Trans>
        </Fact>
        <Fact title={<Trans>Software bill of materials</Trans>}>
          <Trans>
            Kurra generates a CycloneDX bill of materials the first time a Docker or Helm image is
            cached.
          </Trans>
        </Fact>
        <Fact title={<Trans>Provenance</Trans>}>
          <Trans>
            For packages you host, Kurra verifies SLSA provenance from a Sigstore bundle you supply.
            It stores public keys and never signs anything.
          </Trans>
        </Fact>
        <Fact title={<Trans>Activity and audit log</Trans>}>
          <Trans>
            Activity records each decision with its reason and the time it was made. The audit log
            behind it is tamper-evident.
          </Trans>
        </Fact>
      </div>
    </Section>
  );
}
