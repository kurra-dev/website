/**
 * A language's own name for itself ("English", "Deutsch", "Português (Brasil)"), so a person can find their language
 * whatever language the console is in now. Names are data from the browser, not catalog copy. Falls back to the
 * code when the browser has no name for it.
 */
export function languageName(locale: string): string {
  try {
    const name = new Intl.DisplayNames([locale], { type: "language" }).of(locale);
    if (!name) return locale;
    return name.charAt(0).toLocaleUpperCase(locale) + name.slice(1);
  } catch {
    return locale;
  }
}
