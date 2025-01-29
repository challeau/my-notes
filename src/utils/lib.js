import { marked } from "marked";
import sanitizeHtml from "sanitize-html";
import fs from "fs";
import path from "path";

/**
 * Convert a directory's structure to a list of pages sorted by subject
 * @param {Dirent} path - The path of the directory to convert.
 * @returns {[{page: string, metadata: Object}]} A list of the pages and their meta data.
 */
export function getPageListFromPath(path) {
  let pages = [];

  if (path == null) {
    return;
  }

  readdir(noteFilesPath, (_err, files) => {
    files.forEach((file) => {
      const currPath = path.join(resourcePath file);
      const fileName = file.replace(/.md/i, "");

        if (!file.match(".md$")) return;

        let text = fs.readFileSync(currPath, "utf8");
        let rawMetadata = text.match(/(?<=\[\/\/]: # \()[^\)]*/gm);
        let metadata = {
          fileName: fileName,
          title: fileName,
          endpoint: "/" + fileName,
        };

        // extract page information from the metadata in the file
        if (rawMetadata) {
          rawMetadata.forEach((data) => {
            let splitData = data.split(/ (.*)/s);
            metadata[splitData.shift().toLowerCase()] = splitData.shift();
          });
        }

        if (dir) metadata.folder = dir.split("/").pop();

        // parse the file's contents into HTML
        let parsedHTML = sanitizeHtml(marked.parse(text), {
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

        resources.push({ content: parsedHTML, metadata: metadata });
      }
    }
  });

  return resources;
}
