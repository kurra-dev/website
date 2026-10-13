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
            is pulled. Cached versions are checked again later.
          </Trans>
        </Fact>
        <Fact title={<Trans>Package licenses</Trans>}>
          <Trans>
            Set an SPDX allow list or deny list. If Kurra can’t read a package’s license, it allows
            the package.
          </Trans>
        </Fact>
        <Fact title={<Trans>Reputation check</Trans>}>
          <Trans>
            Flags package names that look like typosquats of popular packages, before anything is
            fetched.
          </Trans>
        </Fact>
        <Fact title={<Trans>Minimum release age</Trans>}>
          <Trans>
            Refuses a version until it has been published for the number of days you set. This
            covers every ecosystem except Docker and OCI Helm charts, which state no publish time.
          </Trans>
        </Fact>
        <Fact title={<Trans>Software bill of materials</Trans>}>
          <Trans>
            Kurra generates a CycloneDX bill of materials the first time a Docker or Helm image is
            cached.
          </Trans>
        </Fact>
        <Fact title={<Trans>Upstream verification</Trans>}>
          <Trans>
            Kurra checks the signatures, checksums, and attestations that upstream registries
            publish, and records the result. A file that doesn’t match a published checksum is never
            cached or served.
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
