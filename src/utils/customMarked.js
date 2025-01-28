import path from "path";
import { marked } from "marked";

// Define custom extensions for marked module
const extensions = [
  // Add the image dir path to parsed images
  {
    name: "image",
    renderer(token) {
      const imagePath = path.join("assets/imgs", token.href);

      return `<img src="${imagePath}" alt="${token.text}"/>`;
    },
  },
  {
    name: "link",
    renderer(token) {
      // Make parsed links open in new tab if the URL is external
      let linkAttribs = `href="${token.href}" title="${token.title}"`;

      if (!token.href.match(/^[/#]/)) linkAttribs += ' target="_blank"';

      return `<a ${linkAttribs}>${token.text}</a>`;
    },
  },
];

// Use custom extensions
marked.use({
  extensions: extensions,
});
