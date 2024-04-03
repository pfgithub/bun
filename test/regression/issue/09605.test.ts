import { expect, test } from "bun:test";
import { $ } from "bun";
import { readdirSync } from "node:fs";
import { tempDirWithFiles } from "harness";

test("HTMLRewriter should return empty string for getAttribute empty attributes", async () => {
  let fromGetAttribute: string | null | undefined;
  let fromIterator: string | null | undefined;

  const html = "<p data-test></p>";
  const rewriter = new HTMLRewriter();
  rewriter.on("p", {element: element => {
    fromGetAttribute = element.getAttribute("data-test");
    fromIterator = element.attributes.next().value[1];
  }});
  rewriter.transform(html);

  expect(fromGetAttribute).toBe("");
  expect(fromIterator).toBe("");
});

test("HTMLRewriter should return null for getAttribute no attribute", async () => {
  let fromGetAttribute: string | null | undefined;

  const html = "<p></p>";
  const rewriter = new HTMLRewriter();
  rewriter.on("p", {element: element => {
    fromGetAttribute = element.getAttribute("data-test");
  }});
  rewriter.transform(html);

  expect(fromGetAttribute).toBe(null);
});
