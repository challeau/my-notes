import { join } from "path-ts";
import { readFileSync } from "fs";
import sanitizeHtml from "sanitize-html";
import { marked } from "marked";
/**
 * Define custom extensions for marked module
 */
var extensions = [
    // Add the image dir path to parsed images
    {
        name: "image",
        renderer: function (token) {
            var imagePath = join("assets/imgs", token.href);
            return "<img src=\"".concat(imagePath, "\" alt=\"").concat(token.text, "\"/>");
        },
    },
    // Make parsed links open in new tab if the URL is external
    {
        name: "link",
        renderer: function (token) {
            var newTabAttribute = !token.href.match(/^[/#]/) ? 'target="_blank"' : '';
            return "<a href=\"".concat(token.href, "\" title=\"").concat(token.title, "\" ").concat(newTabAttribute, ">").concat(token.text, "</a>");
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
export function parseMdToHtml(filepath) {
    var file = readFileSync(filepath, "utf8");
    var parsedHtml = marked.parse(file, { async: false });
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
