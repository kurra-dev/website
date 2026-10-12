import { useLingui } from "@lingui/react/macro";

import { languageName, useLocale } from "@/lib/i18n";

/** Shown only when there is more than one language to choose. Each language is named in itself. */
export function LocalePicker() {
  const { t } = useLingui();
  const { locale, selectable, setLocale } = useLocale();
  if (selectable.length < 2) return null;
  return (
    <select
      className="select"
      aria-label={t`Language`}
      value={locale}
      onChange={(e) => void setLocale(e.target.value)}
    >
      {selectable.map((l) => (
        <option key={l} value={l}>
          {languageName(l)}
        </option>
      ))}
    </select>
  );
}
