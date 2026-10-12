import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { afterEach, describe, expect, it, vi } from "vitest";

import { App } from "@/app";
import { I18nProvider } from "@/lib/i18n";
import { isHomePath } from "@/paths";

import { GITHUB_HREF } from "./config";
import { ECOSYSTEMS } from "./ecosystem-data";

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
