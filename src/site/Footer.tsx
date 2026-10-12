import { Trans } from "@lingui/react/macro";

import { useFormat } from "@/lib/i18n";

import { LocalePicker } from "./LocalePicker";
import { Logo } from "./Logo";

export function Footer() {
  const format = useFormat();
  const year = format.number(new Date().getFullYear(), { useGrouping: false });
  return (
    <footer className="band band-ink footer" data-theme="dark">
      <div className="wrap footer-inner">
        <Logo />
        <p className="footer-line">
          <Trans>A caching gateway for package registries.</Trans>
        </p>
        <p className="footer-copy mono">
          <Trans>© {year} Kurra</Trans>
        </p>
        <LocalePicker />
      </div>
    </footer>
  );
}
