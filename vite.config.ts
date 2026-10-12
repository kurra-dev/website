import { lingui } from "@lingui/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// The Lingui macros (`t`, `<Trans>`, ...) compile away in Babel. `stripMessageField: false` keeps the English source
// in the bundle, so a missing catalog renders English and never an opaque id.
const linguiMacro: [string, { stripMessageField: boolean }] = [
  "@lingui/babel-plugin-lingui-macro",
  { stripMessageField: false },
];

// A static site: `npm run build` writes dist/ (client) and dist-server/ (the render used to prerender the pages),
// and scripts/prerender.mjs turns them into plain HTML for GitHub Pages. The site is served from the domain root.
export default defineConfig({
  base: "/",
  plugins: [react({ babel: { plugins: [linguiMacro] } }), lingui(), tailwindcss(), tsconfigPaths()],
  build: { outDir: "dist", emptyOutDir: true },
  server: { host: "127.0.0.1", port: 5190, strictPort: true },
  preview: { host: "127.0.0.1", port: 5190, strictPort: true },
});
