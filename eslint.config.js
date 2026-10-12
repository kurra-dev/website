import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import lingui from "eslint-plugin-lingui";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist", "dist-server", "src/styles/tokens.css", "src/locales/**/*.js"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      lingui,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      // Macro hygiene applies everywhere it can (it only fires on code that uses the macros).
      "lingui/t-call-in-function": "error",
      "lingui/no-single-variables-to-translate": "error",
      "lingui/no-expression-in-message": "error",
      "lingui/no-trans-inside-trans": "error",
      "lingui/consistent-plural-format": "error",
    },
  },
  {
    // Copy lives in the catalog. Only text that reads as a sentence or a label (a capital, then a lowercase letter)
    // is treated as copy; identifiers, class lists and code samples are not. Add a glob here when more code is
    // migrated, never remove one. The files ignored below hold proper nouns, sample data and raw client output.
    files: ["src/routes/**/*.{ts,tsx}", "src/site/**/*.{ts,tsx}"],
    ignores: [
      "**/*.test.{ts,tsx}",
      "src/site/sample-data.ts",
      "src/site/ecosystem-data.ts",
      "src/site/client-output.ts",
      "src/site/SetupTabs.tsx",
    ],
    plugins: { lingui },
    rules: {
      "lingui/no-unlocalized-strings": [
        "error",
        {
          ignore: ["^(?![A-Z][a-z])"],
          ignoreNames: [
            "className",
            "key",
            "id",
            "type",
            "role",
            "variant",
            "href",
            "to",
            "tone",
            "data-theme",
            "viewBox",
            "fill",
            "stroke",
            "d",
            "kind",
            "scope",
            "name",
            "content",
            "rel",
            "decision",
            "aria-pressed",
          ],
          ignoreFunctions: ["console.*", "Error", "require", "import"],
        },
      ],
    },
  },
  eslintConfigPrettier,
);
