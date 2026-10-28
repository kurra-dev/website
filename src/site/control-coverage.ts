import { msg } from "@lingui/core/macro";
import type { MessageDescriptor } from "@lingui/core";

import type { EcosystemId } from "./glyphs";

// Which Enterprise policy controls cover which ecosystems. Copied from the control coverage table in the Kurra
// repository (internal/controlcoverage/coverage.go, which also generates the table in docs/gateway/controls.md),
// as of b4bc665c. When that table changes, change this one: the test in page.test.tsx checks the shape, not the facts.

export type ControlId =
  "reputation" | "minimumAge" | "advisory" | "license" | "signature" | "attestation";

/** "covered" runs for the ecosystem, "partial" runs for part of it, "none" does not run. */
export type Level = "covered" | "partial" | "none";

export const CONTROLS: readonly { id: ControlId; name: MessageDescriptor }[] = [
  { id: "reputation", name: msg`Name reputation` },
  { id: "minimumAge", name: msg`Minimum release age` },
  { id: "advisory", name: msg`Advisory blocking` },
  { id: "license", name: msg`License policy` },
  { id: "signature", name: msg`Registry signature` },
  { id: "attestation", name: msg`Build attestation` },
];

const C: Level = "covered";
const P: Level = "partial";
const N: Level = "none";

// Columns: reputation, minimum age, advisory, license, signature, attestation.
const row = (
  reputation: Level,
  minimumAge: Level,
  advisory: Level,
  license: Level,
  signature: Level,
  attestation: Level,
): Record<ControlId, Level> => ({
  reputation,
  minimumAge,
  advisory,
  license,
  signature,
  attestation,
});

export const COVERAGE: Record<EcosystemId, Record<ControlId, Level>> = {
  npm: row(C, C, C, C, C, C),
  pypi: row(C, C, C, C, N, C),
  maven: row(C, C, C, C, C, C),
  nuget: row(C, C, C, C, C, N),
  go: row(C, C, C, C, C, N),
  cargo: row(C, C, C, C, N, N),
  rubygems: row(C, C, C, C, N, C),
  composer: row(C, C, C, C, N, N),
  terraform: row(C, C, N, N, C, N),
  apt: row(N, C, C, N, C, N),
  apk: row(N, C, C, C, C, N),
  rpm: row(N, C, C, C, C, N),
  docker: row(C, N, N, N, C, C),
  helm: row(C, P, N, N, C, P),
};

/** Whether a control does anything for an ecosystem, wholly or in part. */
export function applies(ecosystem: EcosystemId, control: ControlId): boolean {
  return COVERAGE[ecosystem][control] !== "none";
}
