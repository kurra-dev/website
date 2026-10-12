import { LOCALE_STORAGE_KEY, SOURCE_LOCALE } from "./locales";

const canonical = (tag: string): string | null => {
  try {
    return Intl.getCanonicalLocales(tag)[0] ?? null;
  } catch {
    return null;
  }
};

/**
 * Maps one requested tag onto a supported one: exact, then the same language ("fr-CA" -> "fr"),
 * then any supported region of that language ("pt" -> "pt-BR"). Case-insensitive; null when nothing fits.
 */
export function matchLocale(requested: string, supported: readonly string[]): string | null {
  const want = canonical(requested);
  if (!want) return null;
  const table = supported.flatMap((s) => {
    const c = canonical(s);
    return c ? [[c, s] as const] : [];
  });
  const exact = table.find(([c]) => c === want);
  if (exact) return exact[1];
  const language = want.split("-")[0]!;
  const base = table.find(([c]) => c === language);
  if (base) return base[1];
  const sibling = table.find(([c]) => c.split("-")[0] === language);
  return sibling ? sibling[1] : null;
}

/** The catalogs to merge for a locale, most general first: "fr-CA" -> ["fr", "fr-CA"]. The source locale needs none. */
export function fallbackChain(locale: string): string[] {
  const parts = (canonical(locale) ?? locale).split("-");
  const chain: string[] = [];
  for (let i = 1; i <= parts.length; i++) chain.push(parts.slice(0, i).join("-"));
  return chain.filter((l) => l !== SOURCE_LOCALE);
}

export type ResolveInput = {
  supported: readonly string[];
  /** An explicit choice made this session (a picker, a `?locale=` override). */
  requested?: string | null;
  /** What the person saved last time. */
  stored?: string | null;
  /** `navigator.languages`, most preferred first. */
  detected?: readonly string[];
};

/** Explicit choice, then the saved one, then the browser's languages, then the source locale. */
export function resolveLocale({
  supported,
  requested,
  stored,
  detected = [],
}: ResolveInput): string {
  for (const candidate of [requested, stored, ...detected]) {
    if (!candidate) continue;
    const match = matchLocale(candidate, supported);
    if (match) return match;
  }
  return SOURCE_LOCALE;
}

export function readStoredLocale(): string | null {
  try {
    return localStorage.getItem(LOCALE_STORAGE_KEY);
  } catch {
    return null;
  }
}

export function writeStoredLocale(locale: string | null): void {
  try {
    if (locale) localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    else localStorage.removeItem(LOCALE_STORAGE_KEY);
  } catch {
    /* private mode or blocked storage: the choice just does not persist */
  }
}

export function detectedLocales(): readonly string[] {
  if (typeof navigator === "undefined") return [];
  return navigator.languages?.length ? navigator.languages : [navigator.language];
}
