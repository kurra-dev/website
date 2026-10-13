import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { afterEach, describe, expect, it, vi } from "vitest";

import { App } from "@/app";
import { I18nProvider } from "@/lib/i18n";
import { isFeaturesPath, isHomePath } from "@/paths";

import { GITHUB_HREF } from "./config";
import { CONTROLS, COVERAGE } from "./control-coverage";
import { ECOSYSTEMS } from "./ecosystem-data";
import { FEATURE_GROUPS } from "./feature-data";

async function renderAt(pathname: string) {
  return render(
    <I18nProvider>
      <App pathname={pathname} />
    </I18nProvider>,
  );
}

afterEach(() => {
  vi.useRealTimers();
});

describe("home page", () => {
  it("has one h1 and no accessibility violations", async () => {
    const { container } = await renderAt("/");
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("sends every call to action to the GitHub repository", async () => {
    await renderAt("/");
    const links = screen.getAllByRole("link", { name: /on GitHub/ });
    expect(links.length).toBeGreaterThanOrEqual(3);
    for (const link of links) expect(link).toHaveAttribute("href", GITHUB_HREF);
  });

  it("lists every ecosystem, apk included", async () => {
    await renderAt("/");
    const section = screen.getByRole("region", { name: /ecosystems, one gateway/ });
    expect(ECOSYSTEMS.map((e) => e.id)).toContain("apk");
    expect(within(section).getAllByRole("listitem")).toHaveLength(ECOSYSTEMS.length);
    expect(
      within(section).getByRole("heading", {
        name: `${ECOSYSTEMS.length} ecosystems, one gateway`,
      }),
    ).toBeInTheDocument();
  });

  it("shows only the two decisions", async () => {
    await renderAt("/");
    expect(screen.queryByText(/quarantin/i)).not.toBeInTheDocument();
    expect(screen.getAllByText("Blocked").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Allowed").length).toBeGreaterThan(0);
  });
});

describe("activity stream", () => {
  it("adds a row on each tick and stops when paused", async () => {
    vi.useFakeTimers();
    await renderAt("/");
    const first = () => document.querySelector(".ledger-row .pkg")?.textContent;
    const before = first();
    await act(async () => {
      await vi.advanceTimersByTimeAsync(2700);
    });
    const after = first();
    expect(after).not.toEqual(before);

    const pause = screen.getByRole("button", { name: "Pause updates" });
    await act(async () => {
      pause.click();
    });
    expect(screen.getByRole("button", { name: "Resume updates" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    await act(async () => {
      await vi.advanceTimersByTimeAsync(8000);
    });
    expect(first()).toEqual(after);
  });
});

describe("client setup", () => {
  it("switches between clients and copies only the added lines", async () => {
    const user = userEvent.setup();
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", { value: { writeText }, configurable: true });
    await renderAt("/");

    await user.click(screen.getByRole("tab", { name: "apk" }));
    expect(screen.getByRole("tabpanel")).toHaveTextContent("/etc/apk/repositories");

    await user.click(screen.getByRole("button", { name: "Copy" }));
    expect(writeText).toHaveBeenCalledOnce();
    const copied = String(writeText.mock.calls[0]?.[0]);
    expect(copied).toContain("/apk/acme/v3.20/main");
    expect(copied).not.toContain("dl-cdn.alpinelinux.org");
  });
});

describe("features page", () => {
  const rows = FEATURE_GROUPS.flatMap((g) => g.rows);

  it("has one h1, a table that lists every feature, and no accessibility violations", async () => {
    const { container } = await renderAt("/features/");
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    const table = screen.getByRole("table", {
      name: "Features in the open source version and in Enterprise",
    });
    // One row per feature, one per group, and the header row.
    expect(within(table).getAllByRole("row")).toHaveLength(rows.length + FEATURE_GROUPS.length + 1);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("answers every row for both versions in words as well as marks", async () => {
    await renderAt("/features/");
    const table = screen.getByRole("table", {
      name: "Features in the open source version and in Enterprise",
    });
    const included = within(table).getAllByText("Included");
    const notIncluded = within(table).getAllByText("Not included");
    const answers = rows.flatMap((r) => [r.openSource, r.enterprise]);
    expect(included).toHaveLength(answers.filter((a) => a === "yes").length);
    expect(notIncluded).toHaveLength(answers.filter((a) => a === "no").length);
  });

  it("includes everything the open source version has in Enterprise, with unique rows", () => {
    for (const row of rows) {
      if (row.openSource === "yes") expect(row.enterprise, row.id).toBe("yes");
    }
    expect(new Set(rows.map((r) => r.id)).size).toBe(rows.length);
  });

  it("lists every control for every ecosystem in the coverage table", async () => {
    await renderAt("/features/");
    const table = screen.getByRole("table", {
      name: "Which ecosystems each Enterprise control covers",
    });
    expect(within(table).getAllByRole("row")).toHaveLength(ECOSYSTEMS.length + 1);
    expect(within(table).getAllByRole("columnheader")).toHaveLength(CONTROLS.length + 1);
    for (const { id } of ECOSYSTEMS) {
      expect(Object.keys(COVERAGE[id]).sort(), id).toEqual(CONTROLS.map((c) => c.id).sort());
    }
    // Helm is the one ecosystem with partly covered controls.
    const partial = ECOSYSTEMS.flatMap(({ id }) =>
      CONTROLS.filter((c) => COVERAGE[id][c.id] === "partial").map(() => id),
    );
    expect(new Set(partial)).toEqual(new Set(["helm"]));
    expect(within(table).getAllByText("Partly")).toHaveLength(partial.length);
  });

  it("shows on the home page only the controls an ecosystem has", async () => {
    await renderAt("/");
    const grid = screen
      .getByRole("heading", { name: /ecosystems, one gateway/ })
      .closest("section")!;
    const card = (name: string) =>
      within(grid).getByText(name, { selector: ".eco-name" }).closest("li")!;
    expect(
      within(card("Docker"))
        .getAllByText(/./, { selector: ".chip" })
        .map((e) => e.textContent),
    ).toEqual(["Reputation"]);
    expect(
      within(card("apt"))
        .getAllByText(/./, { selector: ".chip" })
        .map((e) => e.textContent),
    ).toEqual(["Release age", "Advisories"]);
    expect(within(card("npm")).getAllByText(/./, { selector: ".chip" })).toHaveLength(4);
  });

  it("is the only link in the header navigation, on every page", async () => {
    await renderAt("/features/");
    const nav = screen.getByRole("navigation", { name: "Primary" });
    expect(within(nav).getAllByRole("link")).toHaveLength(1);
    expect(within(nav).getByRole("link", { name: "Features" })).toHaveAttribute(
      "href",
      "/features/",
    );
    expect(screen.getByRole("link", { name: "Kurra, home page" })).toHaveAttribute("href", "/");
  });

  it("is recognised only at its own address", () => {
    expect(["/features", "/features/", "/features/index.html"].every(isFeaturesPath)).toBe(true);
    expect(["/", "/features/x", "/enterprise/"].some(isFeaturesPath)).toBe(false);
  });
});

describe("not found", () => {
  it("renders the not-found page for an unknown address", async () => {
    const { container } = await renderAt("/nope");
    expect(screen.getByRole("heading", { name: "Page not found" })).toBeInTheDocument();
    expect(await axe(container)).toHaveNoViolations();
  });

  it("treats only the root and index.html as the home page", () => {
    expect(["/", "", "/index.html"].every(isHomePath)).toBe(true);
    expect(["/nope", "/index", "/a/b"].some(isHomePath)).toBe(false);
  });
});
