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
                Package managers keep working the way they do today. You change the address they
                use, and kurra serves what the upstream has, after checking it.
              </Trans>
            }
          />
          <ul className="points">
            <li>
              <Trans>
                A mirror fetches a package from its upstream the first time someone asks for it, and
                keeps a copy.
              </Trans>
            </li>
            <li>
              <Trans>
                A hosted registry serves the packages your teams publish. It needs the Enterprise
                plan.
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
