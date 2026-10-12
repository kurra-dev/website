// Turns the client build (dist/) and the server render (dist-server/) into static HTML for GitHub Pages:
// dist/index.html for the home page and dist/404.html, which GitHub Pages serves for any unknown address.
import { readFile, writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const dist = path.join(root, "dist");
const { render, homeMeta, notFoundMeta } = await import(
  pathToFileURL(path.join(root, "dist-server", "entry-server.js")).href
);

const escape = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const pages = [
  {
    url: "/",
    file: "index.html",
    head: () => {
      const { title, description } = homeMeta();
      return [
        `<title>${escape(title)}</title>`,
        `<meta name="description" content="${escape(description)}" />`,
        `<meta property="og:type" content="website" />`,
        `<meta property="og:title" content="${escape(title)}" />`,
        `<meta property="og:description" content="${escape(description)}" />`,
        `<meta name="twitter:card" content="summary" />`,
      ];
    },
  },
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
  await writeFile(path.join(dist, page.file), html);
  console.log(`prerendered ${page.url} to dist/${page.file}`);
}
