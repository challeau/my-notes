import * as path from "path";
import { readFileSync } from "fs";
import sanitizeHtml from "sanitize-html";
import { marked, TokenizerAndRendererExtension } from "marked";

/**
 * Define custom extensions for marked module
 */
const extensions: TokenizerAndRendererExtension[] = [
  // Add the image dir path to parsed images
  {
    name: "image",
    renderer(token) {
      const imagePath = path.join("assets/imgs", token.href);

      return `<img src="${imagePath}" alt="${token.text}"/>`;
    },
  },
  // Make parsed links open in new tab if the URL is external
  {
    name: "link",
    renderer(token) {
      const newTabAttribute = !token.href.match(/^[/#]/) ? 'target="_blank"' : '';

      return `<a href="${token.href}" title="${token.title}" ${newTabAttribute}>${token.text}</a>`;
    },
  },
];

// Use custom extensions
marked.use({
  extensions: extensions,
});

/**
 * Compile a markdown file to HTML
 */
export function parseMdToHtml(filepath: string) {
  const file = readFileSync(filepath, "utf8");
  const parsedHtml: string = marked.parse(file, { async: false }) as string;

  return sanitizeHtml(parsedHtml, {
    // To use HTML tags and attributes in a source .md file, add them here
    allowedAttributes: {
      a: ["href", "name", "target"],
      code: ["class"],
      div: ["class", "style"],
      img: ["src", "srcset", "alt", "title", "width", "height", "loading"],
      input: ["checked", "type"],
      span: ["class", "style"],
    },
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([
      "img",
      "code",
      "input",
    ]),
  });
}