import { readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

// A subset of the content standard that a test can enforce: the banned characters and words, the product's retired
// terms, and "Kurra" always with a capital K. Everything else in the standard still needs a human review.

function sourceMessages(): string[] {
  const po = readFileSync(path.join(import.meta.dirname, "locales/en/messages.po"), "utf8");
  const messages: string[] = [];
  let current: string | null = null;
  for (const line of po.split("\n")) {
    const start = /^msgid "(.*)"$/.exec(line);
    const more = /^"(.*)"$/.exec(line);
    if (start) current = start[1] ?? "";
    else if (more && current !== null) current += more[1] ?? "";
    else if (current !== null) {
      messages.push(current);
      current = null;
    }
  }
  return messages.filter(Boolean);
}

const messages = sourceMessages();

describe("copy standard", () => {
  it("finds the source messages", () => {
    expect(messages.length).toBeGreaterThan(50);
  });

  const banned: [string, RegExp][] = [
    ["an exclamation mark", /!/],
    ["an em dash", /—/],
    ["an ampersand", /&(?!\w+;)/],
    ["an ellipsis", /…|\.\.\./],
    ["a straight apostrophe", /\w'\w/],
    [
      "a filler word (please, sorry, easy, easily, simply, just)",
      /\b(please|sorry|easy|easily|simply|just)\b/i,
    ],
    ["click", /\bclick/i],
    ["we", /\b(we|we’re|we’ll|our)\b/i],
    [
      "a retired term (verdict, proxy, quarantine, scanned, safe)",
      /\b(verdicts?|proxy|quarantin\w*|scanned|scanning|safe)\b/i,
    ],
    [
      "a product name without a capital K, or in capitals",
      /(?<![\w/_.-])kurra(?![\w/-])|\bKURRA\b/,
    ],
    ["a Latin abbreviation", /\b(e\.g\.|i\.e\.|etc\.)/i],
  ];

  for (const [name, pattern] of banned) {
    it(`has no ${name}`, () => {
      const hits = messages.filter((m) => pattern.test(m));
      expect(hits).toEqual([]);
    });
  }
});
