import {
  siAlpinelinux,
  siApachemaven,
  siDebian,
  siDocker,
  siGo,
  siHelm,
  siNpm,
  siNuget,
  siPhp,
  siPypi,
  siRedhat,
  siRubygems,
  siRust,
  siTerraform,
} from "simple-icons";

export type Decision = "allowed" | "blocked";

/** Decision glyphs: distinct silhouettes, so color is never required. 16px grid, `currentColor`. */
export function DecisionGlyph({ decision, size = 12 }: { decision: Decision; size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
    focusable: false as const,
  };
  if (decision === "allowed") {
    return (
      <svg {...common}>
        <circle cx="8" cy="8" r="6.25" />
        <path d="m5.2 8.2 2 2 3.8-4.2" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <circle cx="8" cy="8" r="6.25" />
      <path d="m3.8 12.2 8.4-8.4" />
    </svg>
  );
}

export type EcosystemId =
  | "npm"
  | "pypi"
  | "maven"
  | "go"
  | "cargo"
  | "nuget"
  | "docker"
  | "helm"
  | "terraform"
  | "apt"
  | "apk"
  | "composer"
  | "rpm"
  | "rubygems";

// Monochrome marks from Simple Icons (CC0). A glyph only identifies the ecosystem; trademarks belong to their owners.
const PATHS: Record<EcosystemId, string> = {
  npm: siNpm.path,
  pypi: siPypi.path,
  maven: siApachemaven.path,
  go: siGo.path,
  cargo: siRust.path,
  nuget: siNuget.path,
  docker: siDocker.path,
  helm: siHelm.path,
  terraform: siTerraform.path,
  apt: siDebian.path,
  apk: siAlpinelinux.path,
  composer: siPhp.path,
  rpm: siRedhat.path,
  rubygems: siRubygems.path,
};

/** The ecosystem's mark in its tile: 24px tile and 16px glyph by default, 32px and 20px in a large tile. */
export function EcosystemTile({ id, large = false }: { id: EcosystemId; large?: boolean }) {
  const glyph = large ? 20 : 14;
  return (
    <span className={large ? "eco-tile eco-tile-lg" : "eco-tile"} aria-hidden="true">
      <svg width={glyph} height={glyph} viewBox="0 0 24 24" fill="currentColor" focusable="false">
        <path d={PATHS[id]} />
      </svg>
    </span>
  );
}
