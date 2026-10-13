import { Trans } from "@lingui/react/macro";

import { Section, SectionHead } from "./Section";
import { SetupTabs } from "./SetupTabs";

export function Setup() {
  return (
    <Section id="setup" tone="paper" labelledBy="setup-title">
      <div className="split">
        <div>
          <SectionHead
            id="setup-title"
            title={<Trans>Switch a client by changing its registry address</Trans>}
            lead={
              <Trans>
                Your package managers work the way they do today. You change the address they use,
                and Kurra serves what the upstream has once it passes the checks.
              </Trans>
            }
          />
          <ul className="points">
            <li>
              <Trans>
                A mirror fetches a package from its upstream the first time someone asks for it,
                then keeps a copy.
              </Trans>
            </li>
            <li>
              <Trans>
                A hosted registry stores the packages your own teams publish and serves them like
                any other registry.
              </Trans>
            </li>
            <li>
              <Trans>
                A token holds only the permissions and reaches only the registries you choose.
              </Trans>
            </li>
          </ul>
        </div>
        <SetupTabs />
      </div>
    </Section>
  );
}
