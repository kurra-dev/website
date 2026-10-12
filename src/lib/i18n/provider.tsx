import { i18n } from "@lingui/core";
import { I18nProvider as LinguiProvider } from "@lingui/react";
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";

import "./compiler";
import { loadMessages, supportedLocales } from "./catalogs";
import { LocaleContext, type LocaleState } from "./context";
import { directionOf, PSEUDO_LOCALE, SOURCE_LOCALE } from "./locales";
import {
  detectedLocales,
  matchLocale,
  readStoredLocale,
  resolveLocale,
  writeStoredLocale,
} from "./resolve";

// The source locale needs no catalog and is the only one the server renders, so the first client render matches the
// server's HTML. A saved, requested or detected language is applied right after hydration.
i18n.loadAndActivate({ locale: SOURCE_LOCALE, messages: {} });

function wantedLocale(): string {
  // `?locale=` forces a language for QA (for example `?locale=en-XA`); it is not saved.
  const requested = new URLSearchParams(window.location.search).get("locale");
  return resolveLocale({
    supported: supportedLocales,
    requested,
    stored: readStoredLocale(),
    detected: detectedLocales(),
  });
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setActive] = useState<string>(SOURCE_LOCALE);
  const wantedRef = useRef<string>(SOURCE_LOCALE);

  const load = useCallback(async (next: string) => {
    wantedRef.current = next;
    let messages: Record<string, unknown> = {};
    try {
      messages = next === SOURCE_LOCALE ? {} : await loadMessages(next);
    } catch (error) {
      console.warn(`i18n: could not load "${next}", staying on the previous locale.`, error);
      return;
    }
    if (wantedRef.current !== next) return; // a later request won
    i18n.loadAndActivate({ locale: next, messages: messages as never });
    setActive(next);
  }, []);

  useEffect(() => {
    const wanted = wantedLocale();
    if (wanted !== SOURCE_LOCALE) void load(wanted);
  }, [load]);

  const setLocale = useCallback(
    async (next: string | null) => {
      writeStoredLocale(next);
      await load(
        next
          ? (matchLocale(next, supportedLocales) ?? SOURCE_LOCALE)
          : resolveLocale({
              supported: supportedLocales,
              detected: detectedLocales(),
            }),
      );
    },
    [load],
  );

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = directionOf(locale);
  }, [locale]);

  const value = useMemo<LocaleState>(
    () => ({
      locale,
      direction: directionOf(locale),
      selectable: supportedLocales.filter((l) => l !== PSEUDO_LOCALE),
      setLocale,
    }),
    [locale, setLocale],
  );

  return (
    <LocaleContext.Provider value={value}>
      <LinguiProvider i18n={i18n}>{children}</LinguiProvider>
    </LocaleContext.Provider>
  );
}
