import type { EcosystemId } from "./glyphs";

/** Display names are proper nouns and keep their own capitalization (glossary: ecosystem display names). */
export const ECOSYSTEMS: readonly { id: EcosystemId; name: string }[] = [
  { id: "npm", name: "npm" },
  { id: "pypi", name: "PyPI" },
  { id: "maven", name: "Maven" },
  { id: "nuget", name: "NuGet" },
  { id: "go", name: "Go" },
  { id: "cargo", name: "Cargo" },
  { id: "rubygems", name: "RubyGems" },
  { id: "composer", name: "Composer" },
  { id: "terraform", name: "Terraform" },
  { id: "apt", name: "APT" },
  { id: "apk", name: "APK" },
  { id: "rpm", name: "RPM" },
  { id: "docker", name: "Docker" },
  { id: "helm", name: "Helm" },
];

export const ECOSYSTEM_NAME: Record<EcosystemId, string> = Object.fromEntries(
  ECOSYSTEMS.map((e) => [e.id, e.name]),
) as Record<EcosystemId, string>;
