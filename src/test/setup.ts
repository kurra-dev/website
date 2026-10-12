import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { toHaveNoViolations } from "jest-axe";
import { afterEach, expect } from "vitest";

// jest-axe's matcher, registered once for every test file: expect(await axe(el)).toHaveNoViolations().
expect.extend(toHaveNoViolations);

afterEach(() => {
  cleanup();
});

// matchMedia is missing in jsdom; default to "no match" (no reduced motion).
if (typeof window.matchMedia !== "function") {
  window.matchMedia = (query: string): MediaQueryList => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  });
}

// The router restores scroll on navigation; jsdom does not implement it.
window.scrollTo = () => {};

// Radix reads these in jsdom, which has no layout.
Element.prototype.scrollIntoView ??= () => {};
Element.prototype.hasPointerCapture ??= () => false;
