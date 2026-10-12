import { Trans } from "@lingui/react/macro";

import type { Reason } from "./sample-data";

/** Why the decision was reached, in plain words. One message per reason. */
export function ReasonText({ reason }: { reason: Reason }) {
  switch (reason.kind) {
    case "advisory": {
      const { advisory, fixed } = reason;
      return (
        <Trans>
          Advisory <span className="mono">{advisory}</span>, critical. Fixed in{" "}
          <span className="mono">{fixed}</span>.
        </Trans>
      );
    }
    case "clean": {
      const { license } = reason;
      return (
        <Trans>
          No matching advisory. License <span className="mono">{license}</span> is allowed.
        </Trans>
      );
    }
    case "license": {
      const { license } = reason;
      return (
        <Trans>
          License <span className="mono">{license}</span> is blocked by the license policy.
        </Trans>
      );
    }
    case "reputation": {
      const { popular } = reason;
      return (
        <Trans>
          Reputation check: the name resembles <span className="mono">{popular}</span>.
        </Trans>
      );
    }
    case "manual":
      return <Trans>Blocked by an administrator. Clients can’t install it.</Trans>;
  }
}
