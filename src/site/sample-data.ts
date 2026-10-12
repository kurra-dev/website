import type { Decision, EcosystemId } from "./glyphs";

// Sample activity for the product panel. The names, versions and times are illustrative; the two advisory
// identifiers are real. Identifiers are placeholders in the messages, so translators leave them alone.

export type Reason =
  | { kind: "advisory"; advisory: string; fixed: string }
  | { kind: "clean"; license: string }
  | { kind: "license"; license: string }
  | { kind: "reputation"; popular: string }
  | { kind: "manual" };

export type SampleRow = {
  scope?: string;
  name: string;
  version: string;
  ecosystem: EcosystemId;
  decision: Decision;
  reason: Reason;
};

export const SAMPLE_ROWS: readonly SampleRow[] = [
  {
    name: "lodash",
    version: "4.17.20",
    ecosystem: "npm",
    decision: "blocked",
    reason: { kind: "advisory", advisory: "GHSA-35jh-r3h4-6jhm", fixed: "4.17.21" },
  },
  {
    name: "requests",
    version: "2.32.3",
    ecosystem: "pypi",
    decision: "allowed",
    reason: { kind: "clean", license: "Apache-2.0" },
  },
  {
    name: "expresss",
    version: "1.0.0",
    ecosystem: "npm",
    decision: "blocked",
    reason: { kind: "reputation", popular: "express" },
  },
  {
    name: "serde",
    version: "1.0.210",
    ecosystem: "cargo",
    decision: "allowed",
    reason: { kind: "clean", license: "MIT" },
  },
  {
    scope: "org.apache.logging.log4j",
    name: "log4j-core",
    version: "2.14.1",
    ecosystem: "maven",
    decision: "blocked",
    reason: { kind: "advisory", advisory: "GHSA-jfh8-c2jp-5v3q", fixed: "2.15.0" },
  },
  {
    scope: "@babel",
    name: "core",
    version: "7.25.2",
    ecosystem: "npm",
    decision: "allowed",
    reason: { kind: "clean", license: "MIT" },
  },
  {
    name: "ledger-core",
    version: "3.2.0",
    ecosystem: "npm",
    decision: "blocked",
    reason: { kind: "license", license: "AGPL-3.0-only" },
  },
  {
    name: "Newtonsoft.Json",
    version: "13.0.3",
    ecosystem: "nuget",
    decision: "allowed",
    reason: { kind: "clean", license: "MIT" },
  },
  {
    name: "left-pad-next",
    version: "0.4.1",
    ecosystem: "npm",
    decision: "blocked",
    reason: { kind: "manual" },
  },
  {
    name: "github.com/gorilla/mux",
    version: "v1.8.1",
    ecosystem: "go",
    decision: "allowed",
    reason: { kind: "clean", license: "BSD-3-Clause" },
  },
];
