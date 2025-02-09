import { readFileSync } from "fs";
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";

/**
 * Compile a markdown file to HTML 
 * @param {string} filepath 
 */
export function parseMdToHtml(filepath) {
  const markdown = readFileSync(filepath, "utf8");

  return sanitizeHtml(marked.parse(markdown), {
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