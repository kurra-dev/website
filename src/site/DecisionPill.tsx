import { useLingui } from "@lingui/react/macro";

import { DecisionGlyph, type Decision } from "./glyphs";

/** The decision as a tint pill: glyph, then the label. One per row. */
export function DecisionPill({ decision }: { decision: Decision }) {
  const { t } = useLingui();
  const label = {
    allowed: t`Allowed`,
    blocked: t`Blocked`,
  }[decision];
  return (
    <span className={`pill pill-${decision}`}>
      <DecisionGlyph decision={decision} />
      {label}
    </span>
  );
}
