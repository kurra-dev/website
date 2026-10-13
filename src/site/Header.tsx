import { Trans, useLingui } from "@lingui/react/macro";

import { GITHUB_HREF } from "./config";
import { LocalePicker } from "./LocalePicker";
import { Logo } from "./Logo";

/** Sticky top bar on ink: the logo, a link to the features page, and the GitHub link. */
export function Header() {
  const { t } = useLingui();
  return (
    <header className="topbar" data-theme="dark">
      <div className="topbar-inner">
        <a href="/" className="topbar-logo" aria-label={t`Kurra, home page`}>
          <Logo />
        </a>
        <nav className="topbar-nav" aria-label={t`Primary`}>
          <a href="/features/">
            <Trans>Features</Trans>
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
