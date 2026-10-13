/** The home page lives at "/" (or "/index.html"). */
export function isHomePath(pathname: string): boolean {
  return pathname === "/" || pathname === "" || pathname === "/index.html";
}

/** The features page. GitHub Pages serves 404.html for every other address. */
export function isFeaturesPath(pathname: string): boolean {
  return (
    pathname === "/features" || pathname === "/features/" || pathname === "/features/index.html"
  );
}
