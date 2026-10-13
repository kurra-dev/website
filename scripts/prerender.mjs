// Turns the client build (dist/) and the server render (dist-server/) into static HTML for GitHub Pages:
// dist/index.html, dist/features/index.html, and dist/404.html, which GitHub Pages serves for any unknown address.
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const dist = path.join(root, "dist");
const { render, homeMeta, featuresMeta, notFoundMeta } = await import(
  pathToFileURL(path.join(root, "dist-server", "entry-server.js")).href
);

const escape = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const described = ({ title, description }) => [
  `<title>${escape(title)}</title>`,
  `<meta name="description" content="${escape(description)}" />`,
  `<meta property="og:type" content="website" />`,
  `<meta property="og:title" content="${escape(title)}" />`,
  `<meta property="og:description" content="${escape(description)}" />`,
  `<meta name="twitter:card" content="summary" />`,
];

const pages = [
  { url: "/", file: "index.html", head: () => described(homeMeta()) },
  { url: "/features/", file: "features/index.html", head: () => described(featuresMeta()) },
  {
    url: "/404",
    file: "404.html",
    head: () => [
      `<title>${escape(notFoundMeta().title)}</title>`,
      `<meta name="robots" content="noindex" />`,
    ],
  },
];

const template = await readFile(path.join(dist, "index.html"), "utf8");
for (const page of pages) {
  const html = template
    .replace("<!--ssr-head-->", page.head().join("\n    "))
    .replace("<!--ssr-outlet-->", await render(page.url));
  const out = path.join(dist, page.file);
  await mkdir(path.dirname(out), { recursive: true });
  await writeFile(out, html);
  console.log(`prerendered ${page.url} to dist/${page.file}`);
}
