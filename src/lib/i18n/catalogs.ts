import type { Messages } from "@lingui/core";

import { PSEUDO_LOCALE, SOURCE_LOCALE } from "./locales";
import { fallbackChain } from "./resolve";

// Catalogs are src/locales/<locale>/<catalog>.po, compiled on the fly by @lingui/vite-plugin and loaded lazily,
// one chunk per locale and catalog. The locale list is whatever folders exist: adding a language needs no code.
type CatalogModule = { messages: Messages };
export type CatalogLoaders = Record<string, () => Promise<CatalogModule>>;

const files = import.meta.glob<CatalogModule>("../../locales/*/*.po");

function localeOf(path: string): string | null {
  return /\/locales\/([^/]+)\/[^/]+\.po$/.exec(path)?.[1] ?? null;
}

/** Locales with a catalog on disk, plus the source locale and the pseudo-locale (generated, may not exist yet). */
export function discoverLocales(paths: Iterable<string> = Object.keys(files)): string[] {
  const found = new Set<string>([SOURCE_LOCALE, PSEUDO_LOCALE]);
  for (const path of paths) {
    const locale = localeOf(path);
    if (locale) found.add(locale);
  }
  return [...found];
}

export const supportedLocales: readonly string[] = discoverLocales();

/** Locales a person can pick: everything but the pseudo-locale, which is a development tool. */
export const selectableLocales: readonly string[] = supportedLocales.filter(
  (l) => l !== PSEUDO_LOCALE,
);

/**
 * Every catalog for `locale` and its parents merged, parents first, so a regional file only carries what differs:
 * "fr-CA" is `fr` overlaid with `fr-CA`. The source locale has no catalog (the copy is in the code).
 */
export async function loadMessages(
  locale: string,
  loaders: CatalogLoaders = Object.fromEntries(
    Object.entries(files).map(([path, load]) => [path, load]),
  ),
): Promise<Messages> {
  const merged: Messages = {};
  for (const l of fallbackChain(locale)) {
    for (const [path, load] of Object.entries(loaders)) {
      if (localeOf(path) !== l) continue;
      Object.assign(merged, (await load()).messages);
    }
  }
  return merged;
}
