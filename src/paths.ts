/** The home page lives at "/" (or "/index.html"). GitHub Pages serves 404.html for every other address. */
export function isHomePath(pathname: string): boolean {
  return pathname === "/" || pathname === "" || pathname === "/index.html";
}
