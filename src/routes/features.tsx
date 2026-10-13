import { Trans } from "@lingui/react/macro";
import { useEffect } from "react";

import { useLocale } from "@/lib/i18n";
import { GITHUB_HREF } from "@/site/config";
import { CoverageTable } from "@/site/CoverageTable";
import { FeatureTable } from "@/site/FeatureTable";
import { Footer } from "@/site/Footer";
import { Header } from "@/site/Header";
import { featuresMeta } from "@/site/meta";
import { Section, SectionHead } from "@/site/Section";

/** What the open source version includes and what Enterprise adds. */
export function FeaturesPage() {
  const { locale } = useLocale();
  useEffect(() => {
    const { title, description } = featuresMeta();
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", description);
  }, [locale]);

  return (
    <div id="top">
      <Header />
      <main>
        <Section tone="ink" className="page-hero" labelledBy="features-title">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-copy">
            <h1 id="features-title" className="display">
              <Trans>Features</Trans>
            </h1>
            <p className="lead">
              <Trans>
                Kurra is open source, and you can run it yourself. Enterprise adds policy controls,
                hosted registries, identity features, and audit export, and needs a Kurra license.
              </Trans>
            </p>
            <div className="actions">
              <a className="btn btn-primary btn-lg" href={GITHUB_HREF}>
                <Trans>View Kurra on GitHub</Trans>
              </a>
              <a className="link-ghost" href="/">
                <Trans>See how Kurra works</Trans>
              </a>
            </div>
          </div>
        </Section>

        <Section tone="paper" labelledBy="compare-title">
          <SectionHead
            id="compare-title"
            title={<Trans>What each version includes</Trans>}
            lead={
              <Trans>
                The open source version mirrors every supported ecosystem and controls who can pull
                from it. Enterprise adds the checks that decide what is allowed in.
              </Trans>
            }
          />
          <FeatureTable />
          <p className="compare-note">
            <Trans>
              A policy control applies to the ecosystems that provide the data it needs, so a
              setting can have no effect in an ecosystem it doesn’t cover. The next table lists
              them.
            </Trans>
          </p>
        </Section>

        <Section tone="ink" labelledBy="coverage-title">
          <SectionHead
            id="coverage-title"
            title={<Trans>Which ecosystems each control covers</Trans>}
            lead={
              <Trans>
                These are the Enterprise policy controls. A setting for a control does nothing in an
                ecosystem it doesn’t cover.
              </Trans>
            }
          />
          <CoverageTable />
          <ul className="coverage-notes">
            <li>
              <Trans>
                Docker’s cosign signatures are checked as build attestations, so Docker has no
                registry signature check.
              </Trans>
            </li>
            <li>
              <Trans>
                Helm is covered in part. Classic chart repositories are checked for release age and
                provenance files. OCI charts are checked with cosign signatures, like Docker images.
              </Trans>
            </li>
            <li>
              <Trans>
                apt, apk, and RPM have no name reputation check, because the distribution sets
                package names.
              </Trans>
            </li>
          </ul>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
