import { i18n } from "@lingui/core";

/** The language the copy is written in. Always available, never loaded from a catalog. */
export const SOURCE_LOCALE = "en";

/** Accented, expanded English generated from the source: finds hardcoded strings and layout overflow. */
export const PSEUDO_LOCALE = "en-XA";

/** localStorage key for the person's explicit choice (the theme uses the same `kurra-` prefix). */
export const LOCALE_STORAGE_KEY = "kurra-locale";

// Scripts written right to left. Enough to pick `dir` without depending on Intl.Locale#getTextInfo (not everywhere yet).
const RTL_SCRIPTS = new Set(["Arab", "Hebr", "Thaa", "Syrc", "Nkoo", "Adlm"]);
const RTL_LANGUAGES = new Set(["ar", "he", "fa", "ur", "ps", "sd", "ug", "yi", "dv"]);

export type Direction = "ltr" | "rtl";

export function directionOf(locale: string): Direction {
  try {
    const { language, script } = new Intl.Locale(locale);
    if (script) return RTL_SCRIPTS.has(script) ? "rtl" : "ltr";
    return RTL_LANGUAGES.has(language) ? "rtl" : "ltr";
  } catch {
    return "ltr";
  }
}

/** The locale text is currently drawn in; the source locale until a provider (or a test) activates another. */
export function activeLocale(): string {
  return i18n.locale || SOURCE_LOCALE;
}
