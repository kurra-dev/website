import { createContext, useContext } from "react";

import { directionOf, SOURCE_LOCALE, type Direction } from "./locales";

export type LocaleState = {
  /** The locale text is drawn in right now. */
  locale: string;
  direction: Direction;
  /** Locales a picker offers. */
  selectable: readonly string[];
  /** Switches locale (loading its catalogs first) and remembers the choice. `null` clears it back to detection. */
  setLocale: (locale: string | null) => Promise<void>;
};

// No provider means the source locale and no switching: components render exactly as they did before i18n.
const fallback: LocaleState = {
  locale: SOURCE_LOCALE,
  direction: directionOf(SOURCE_LOCALE),
  selectable: [SOURCE_LOCALE],
  setLocale: async () => {},
};

export const LocaleContext = createContext<LocaleState>(fallback);

export const useLocale = (): LocaleState => useContext(LocaleContext);
