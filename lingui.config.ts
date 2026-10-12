import { defineConfig } from "@lingui/cli";
import { formatter } from "@lingui/format-po";

// Source copy is English, written inline with the `t` / `<Trans>` macros. The catalog lives in
// src/locales/<locale>/messages.po; locales are discovered from that directory (src/lib/i18n/catalogs.ts),
// so adding a language is dropping its folder in. The conventions match the console's (kurra/web).
export default defineConfig({
  sourceLocale: "en",
  // `en-XA` is the pseudo-locale (accented, expanded English): generated from `en`, never translated by hand.
  locales: ["en", "en-XA"],
  pseudoLocale: "en-XA",
  fallbackLocales: { default: "en" },
  format: formatter({ lineNumbers: false }),
  orderBy: "messageId",
  catalogs: [
    {
      path: "<rootDir>/src/locales/{locale}/messages",
      include: ["<rootDir>/src/routes", "<rootDir>/src/site"],
      exclude: ["**/*.test.{ts,tsx}"],
    },
  ],
});
