import { Trans, useLingui } from "@lingui/react/macro";

import { GITHUB_HREF } from "./config";
import { LocalePicker } from "./LocalePicker";
import { Logo } from "./Logo";

/** Sticky top bar on ink. Navigation is the page's own sections; the one brand-filled action lives in the hero. */
export function Header() {
  const { t } = useLingui();
  return (
    <header className="topbar" data-theme="dark">
      <div className="topbar-inner">
        <a href="#top" className="topbar-logo" aria-label={t`Kurra, back to the top`}>
          <Logo />
        </a>
        <nav className="topbar-nav" aria-label={t`Primary`}>
          <a href="#setup">
            <Trans>Setup</Trans>
          </a>
          <a href="#decisions">
            <Trans>Decisions</Trans>
          </a>
          <a href="#ecosystems">
            <Trans>Ecosystems</Trans>
          </a>
          <a href="#compliance">
            <Trans>Compliance</Trans>
          </a>
          <a href="#access">
            <Trans>Access</Trans>
          </a>
          <a href="#hosting">
            <Trans>Hosting</Trans>
          </a>
        </nav>
        <div className="topbar-actions">
          <LocalePicker />
          <a className="btn btn-secondary" href={GITHUB_HREF}>
            <Trans>View on GitHub</Trans>
          </a>
        </div>
      </div>
    </header>
  );
}
