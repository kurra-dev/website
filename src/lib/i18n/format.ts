import { useMemo } from "react";

import { useLocale } from "./context";
import { dateTimeFormat, listFormat, numberFormat, pluralRules, relativeTimeFormat } from "./intl";

// Formatting is not copy: it comes from Intl for the active locale and never from a catalog. Everything that
// draws a number, date, list or plural goes through here (or ./intl for module-level constants), so one locale
// switch changes all of it. Machine-facing text stays out: UTC timestamps (G-43), versions, ids, tokens, code.

const exact = numberFormat();
const compact = numberFormat({ notation: "compact", maximumFractionDigits: 1 });

/** Plain number in the active locale ("1,234"). For use outside React (message closures, plain modules). */
export const formatNumber = (n: number): string => exact.format(n);

/** "1.2K" style compact number. */
export const formatCompactNumber = (n: number): string => compact.format(n);

export type Format = {
  number: (n: number, options?: Intl.NumberFormatOptions) => string;
  compactNumber: (n: number, options?: Intl.NumberFormatOptions) => string;
  dateTime: (d: Date | number, options?: Intl.DateTimeFormatOptions) => string;
  relativeTime: (
    value: number,
    unit: Intl.RelativeTimeFormatUnit,
    options?: Intl.RelativeTimeFormatOptions,
  ) => string;
  list: (items: Iterable<string>, options?: Intl.ListFormatOptions) => string;
  plural: (n: number, options?: Intl.PluralRulesOptions) => Intl.LDMLPluralRule;
};

const cache = new Map<string, unknown>();
function memo<T>(kind: string, locale: string, options: unknown, make: () => T): T {
  const key = `${kind}|${locale}|${JSON.stringify(options ?? null)}`;
  let hit = cache.get(key) as T | undefined;
  if (!hit) {
    hit = make();
    cache.set(key, hit);
  }
  return hit;
}

export function createFormat(locale: string): Format {
  return {
    number: (n, o) => memo("n", locale, o, () => new Intl.NumberFormat(locale, o)).format(n),
    compactNumber: (n, o) =>
      memo(
        "c",
        locale,
        o,
        () =>
          new Intl.NumberFormat(locale, {
            notation: "compact",
            maximumFractionDigits: 1,
            ...o,
          }),
      ).format(n),
    dateTime: (d, o) => memo("d", locale, o, () => new Intl.DateTimeFormat(locale, o)).format(d),
    relativeTime: (v, u, o) =>
      memo("r", locale, o, () => new Intl.RelativeTimeFormat(locale, o)).format(v, u),
    list: (items, o) => memo("l", locale, o, () => new Intl.ListFormat(locale, o)).format(items),
    plural: (n, o) => memo("p", locale, o, () => new Intl.PluralRules(locale, o)).select(n),
  };
}

/** Formatters bound to the provider's locale (the source locale with no provider). */
export function useFormat(): Format {
  const { locale } = useLocale();
  return useMemo(() => createFormat(locale), [locale]);
}

export { dateTimeFormat, listFormat, numberFormat, pluralRules, relativeTimeFormat };
