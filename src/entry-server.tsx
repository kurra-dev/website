import { renderToString } from "react-dom/server";

import { I18nProvider } from "@/lib/i18n";

import { App } from "./app";
import { featuresMeta, homeMeta, notFoundMeta } from "./site/meta";

/** Renders one address to HTML in the source language. Used at build time only (scripts/prerender.mjs). */
export function render(pathname: string): string {
  return renderToString(
    <I18nProvider>
      <App pathname={pathname} />
    </I18nProvider>,
  );
}

export { featuresMeta, homeMeta, notFoundMeta };
