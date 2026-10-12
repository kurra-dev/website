import { activeLocale } from "./locales";

// Drop-in stand-ins for `new Intl.NumberFormat("en-US", ...)` and friends that resolve the locale when they are
// called, not when the module loads. Module-level constants (the common shape in *.messages.ts and *.format.ts)
// therefore follow the active locale. Instances are cached per locale.

function lazy<T>(make: (locale: string) => T): () => T {
  const cache = new Map<string, T>();
  return () => {
    const locale = activeLocale();
    let instance = cache.get(locale);
    if (!instance) {
      instance = make(locale);
      cache.set(locale, instance);
    }
    return instance;
  };
}

export function numberFormat(options?: Intl.NumberFormatOptions) {
  const get = lazy((l) => new Intl.NumberFormat(l, options));
  return {
    format: (n: number | bigint) => get().format(n),
    formatToParts: (n: number | bigint) => get().formatToParts(n),
  };
}

export function pluralRules(options?: Intl.PluralRulesOptions) {
  const get = lazy((l) => new Intl.PluralRules(l, options));
  return { select: (n: number) => get().select(n) };
}

export function relativeTimeFormat(options?: Intl.RelativeTimeFormatOptions) {
  const get = lazy((l) => new Intl.RelativeTimeFormat(l, options));
  return {
    format: (value: number, unit: Intl.RelativeTimeFormatUnit) => get().format(value, unit),
  };
}

export function dateTimeFormat(options?: Intl.DateTimeFormatOptions) {
  const get = lazy((l) => new Intl.DateTimeFormat(l, options));
  return {
    format: (d: Date | number) => get().format(d),
    formatToParts: (d: Date | number) => get().formatToParts(d),
  };
}

export function listFormat(options?: Intl.ListFormatOptions) {
  const get = lazy((l) => new Intl.ListFormat(l, options));
  return { format: (items: Iterable<string>) => get().format(items) };
}
