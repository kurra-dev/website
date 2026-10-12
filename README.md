# Kurra website

The public landing page. A static site on the same stack as the Kurra console: Vite, React 19, TypeScript, Tailwind CSS v4,
Radix UI, Lingui and Vitest. It uses the Kurra design system tokens and follows the Kurra content standard.

```sh
npm install
npm run dev            # http://127.0.0.1:5190
npm run build          # writes dist/, ready for GitHub Pages
npm run preview        # serves dist/
npm run lint           # eslint and tsc
npm test               # vitest: the page, accessibility, and the copy rules
npm run i18n:extract   # update src/locales from the code; commit the result
npm run i18n:check     # CI gate: catalogs are current and compile
```

## How it is built and published

`npm run build` runs the client build, a server build of the same page (`src/entry-server.tsx`), and
`scripts/prerender.mjs`, which writes `dist/index.html` and `dist/404.html` as plain HTML. The browser hydrates that
HTML. `.github/workflows/pages.yml` checks every pull request and, on `main`, publishes `dist/` to GitHub Pages. The site
is served from the root of its domain, so `base` is `/`. Set Pages to deploy from GitHub Actions in the repository
settings.

## Where things are

| Path                    | What it is                                                                                                                                          |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/routes/`           | The home page and the not-found page. `src/app.tsx` picks one from the address                                                                      |
| `src/site/`             | One file per section of the page, plus the shared pieces (decision pill, glyphs, client setup tabs, product panels)                                 |
| `src/styles/tokens.css` | The design tokens, copied from `design-system/generated/COMPONENT_SPEC_TOKENS.css`. Do not edit; copy the file again when the design system changes |
| `src/styles.css`        | Marketing styles built on the tokens. Bands set `data-theme`, so ink sections use the dark tokens and paper sections the light ones                 |
| `src/lib/i18n/`         | The same thin layer over Lingui as the console, adapted for prerendered pages                                                                       |
| `src/locales/`          | The catalogs. `en-XA` is the pseudo-locale; load the page with `?locale=en-XA` to find hardcoded strings and overflow                               |
| `src/site/config.ts`    | The GitHub link behind every "View Kurra on GitHub" button, and the sample hostnames used in the client snippets                                    |

## Writing rules

- Copy follows `kurra/web/COPY.md` and the glossary (`kurra/contributing/glossary.md`): sentence case, "decision" not
  "verdict", "mirror" not "proxy", "Kurra" with a capital K (code names stay lowercase), no claim the product can't back. `src/copy.test.ts` enforces
  the rules a test can check.
- Every sentence goes through the macros (`<Trans>`, `t`, `<Plural>`), one message per sentence, so it can be translated.
  Code samples, package names, versions, advisory identifiers and raw client output are not translated.
- Teal means something you can select. Green and red mean a decision, and amber means something needs attention. Don't use
  them for anything else.
- The product panels show sample data and say so. Keep their wording true to what the product does.
