// CI gate for translations (src/lib/i18n/README.md):
//   1. `lingui extract --clean` must leave src/locales exactly as committed: every message in the code is in the
//      catalogs and no catalog carries a message the code no longer has.
//   2. `lingui compile --strict` must pass: every message parses as ICU, and no non-source locale is missing a
//      translation that the source locale has.
// Run `npm run i18n:extract`, commit src/locales, then re-run. Plain Node: no dependencies beyond the lingui CLI.
import { execFileSync } from "node:child_process";

const run = (cmd, args) => execFileSync(cmd, args, { stdio: "inherit", env: process.env });

const dirty = () =>
  execFileSync("git", ["status", "--porcelain", "--", "src/locales"], {
    encoding: "utf8",
  }).trim();

const before = dirty();

run("npx", ["lingui", "extract", "--clean"]);
const after = dirty();
if (after !== before) {
  console.error(
    "\ni18n: src/locales is out of date with the source. Run `npm run i18n:extract` and commit the result.\n" +
      execFileSync("git", ["diff", "--stat", "--", "src/locales"], {
        encoding: "utf8",
      }),
  );
  process.exit(1);
}

run("npx", ["lingui", "compile", "--strict"]);
console.log("i18n: catalogs are in sync and compile cleanly.");
