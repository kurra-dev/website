import { msg } from "@lingui/core/macro";
import type { MessageDescriptor } from "@lingui/core";

// What the open source build includes and what needs a Kurra license, taken from the code: every entitlement
// feature is denied in the open source build, and the rest of the gateway (mirrors, tokens, roles, the activity
// feed) runs in every build. Keep it in step with internal/entitlement and docs/gateway/controls.md.

/** "yes" and "no" draw a mark; a message is shown as text where the answer is neither. */
export type Availability = "yes" | "no" | MessageDescriptor;

export type FeatureRow = {
  id: string;
  name: MessageDescriptor;
  openSource: Availability;
  enterprise: Availability;
  /** One sentence that qualifies the row. */
  note?: MessageDescriptor;
};

export type FeatureGroup = {
  id: string;
  title: MessageDescriptor;
  rows: readonly FeatureRow[];
};

export const FEATURE_GROUPS: readonly FeatureGroup[] = [
  {
    id: "mirroring",
    title: msg`Mirroring and caching`,
    rows: [
      {
        id: "mirrors",
        name: msg`Mirrors for every supported ecosystem`,
        openSource: "yes",
        enterprise: "yes",
      },
      {
        id: "bucket",
        name: msg`Storage in a bucket you own`,
        openSource: "yes",
        enterprise: "yes",
        note: msg`Each tenant connects its own S3-compatible bucket.`,
      },
      {
        id: "fetch-modes",
        name: msg`Cache-first and direct fetch modes`,
        openSource: "yes",
        enterprise: "yes",
      },
      {
        id: "upstream-protection",
        name: msg`Upstream rate limits, backoff, and stale copies when an upstream fails`,
        openSource: "yes",
        enterprise: "yes",
      },
      {
        id: "shared-limits",
        name: msg`Rate limits and quota tracking shared across replicas`,
        openSource: "no",
        enterprise: "yes",
        note: msg`Uses Valkey, so every replica enforces the same limits.`,
      },
    ],
  },
  {
    id: "policy",
    title: msg`Package policy`,
    rows: [
      {
        id: "disable-ecosystem",
        name: msg`Turn an ecosystem off for an organization`,
        openSource: "yes",
        enterprise: "yes",
      },
      {
        id: "advisory-data",
        name: msg`Known advisories shown on package pages`,
        openSource: msg`npm only`,
        enterprise: "yes",
        note: msg`Enterprise syncs OSV data ahead of time for every ecosystem it covers.`,
      },
      {
        id: "advisory-blocking",
        name: msg`Block packages with known advisories`,
        openSource: "no",
        enterprise: "yes",
        note: msg`Set a severity threshold for the organization or for each tenant.`,
      },
      {
        id: "manual-decisions",
        name: msg`Allow or block a package or version by hand`,
        openSource: "no",
        enterprise: "yes",
      },
      {
        id: "license-policy",
        name: msg`Software license allow list`,
        openSource: "no",
        enterprise: "yes",
      },
      {
        id: "reputation",
        name: msg`Reputation check for look-alike package names`,
        openSource: "no",
        enterprise: "yes",
      },
      {
        id: "minimum-age",
        name: msg`Minimum release age`,
        openSource: "no",
        enterprise: "yes",
        note: msg`Refuses a version until it has been published for the number of days you set.`,
      },
      {
        id: "published-checksums",
        name: msg`Verify mirrored files match the checksum the upstream publishes`,
        openSource: "yes",
        enterprise: "yes",
        note: msg`A file that doesn’t match is never cached or served.`,
      },
      {
        id: "verification-records",
        name: msg`Check upstream signatures, checksums, and attestations, and record the result`,
        openSource: "yes",
        enterprise: "yes",
      },
      {
        id: "verification-policy",
        name: msg`Refuse files that fail verification`,
        openSource: "no",
        enterprise: "yes",
      },
      {
        id: "sbom",
        name: msg`Software bill of materials for container images`,
        openSource: "no",
        enterprise: "yes",
        note: msg`Generated in CycloneDX format when an image is first cached.`,
      },
    ],
  },
  {
    id: "hosted",
    title: msg`Hosted registries`,
    rows: [
      {
        id: "hosted-registries",
        name: msg`Publish your own packages to a Kurra registry`,
        openSource: "yes",
        enterprise: "yes",
        note: msg`Open source includes up to 3 hosted registries per tenant.`,
      },
      {
        id: "reserved-names",
        name: msg`Reserved package names that mirrors never serve`,
        openSource: "no",
        enterprise: "yes",
        note: msg`Stops a public package from shadowing one you host.`,
      },
      {
        id: "provenance",
        name: msg`Verify build provenance for packages you host`,
        openSource: "no",
        enterprise: "yes",
        note: msg`Kurra verifies a Sigstore bundle you supply and never signs anything.`,
      },
    ],
  },
  {
    id: "access",
    title: msg`Access and identity`,
    rows: [
      {
        id: "github-sign-in",
        name: msg`Sign in with GitHub`,
        openSource: "yes",
        enterprise: "yes",
      },
      {
        id: "sso",
        name: msg`Single sign-on with OIDC or SAML`,
        openSource: "no",
        enterprise: "yes",
      },
      {
        id: "scoped-tokens",
        name: msg`Tokens limited to chosen permissions and registries`,
        openSource: "yes",
        enterprise: "yes",
        note: msg`A token expires after 90 days unless you set another lifetime.`,
      },
      {
        id: "system-roles",
        name: msg`Admin, Security, Publisher, Reader, and Auditor roles`,
        openSource: "yes",
        enterprise: "yes",
      },
      {
        id: "custom-roles",
        name: msg`Custom roles`,
        openSource: "no",
        enterprise: "yes",
      },
      {
        id: "org-roles",
        name: msg`Auditor and Viewer roles for an organization`,
        openSource: "no",
        enterprise: "yes",
      },
      {
        id: "ip-allowlists",
        name: msg`IP allowlists for each registry`,
        openSource: "no",
        enterprise: "yes",
      },
      {
        id: "workload-identity",
        name: msg`Zero-trust integrations for CI systems`,
        openSource: "no",
        enterprise: "yes",
      },
      {
        id: "private-networks",
        name: msg`Private network allowlists`,
        openSource: "yes",
        enterprise: "yes",
        note: msg`Available when you host Kurra yourself.`,
      },
    ],
  },
  {
    id: "operations",
    title: msg`Audit and operations`,
    rows: [
      {
        id: "activity",
        name: msg`Activity feed and a tamper-evident audit log`,
        openSource: "yes",
        enterprise: "yes",
      },
      {
        id: "audit-export",
        name: msg`Audit log export`,
        openSource: "no",
        enterprise: "yes",
        note: msg`Download CSV or NDJSON for an auditor.`,
      },
      {
        id: "usage",
        name: msg`Ecosystem analytics and usage metrics`,
        openSource: "yes",
        enterprise: "yes",
      },
      {
        id: "self-hosted",
        name: msg`Self-hosted architecture`,
        openSource: "yes",
        enterprise: "yes",
      },
      {
        id: "limits",
        name: msg`Tenants and hosted registries`,
        openSource: msg`2 tenants, 3 hosted registries each`,
        enterprise: msg`Set by your license`,
        note: msg`Need more? An Enterprise license raises both limits.`,
      },
    ],
  },
];
