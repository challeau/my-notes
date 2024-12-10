import { marked } from 'marked';
import sanitizeHtml from "sanitize-html";
import fs from "fs";
import path from "path";

/**
 * Convert md files to HTML and collect its metadata.
 * @param {Dirent} files - The files to convert.
 * @param {String} dir - The sub-directory if there is one.
 * @returns {[{text: Document, metadata: Object}]} A list of the resources
 *						   and their meta data.
 */
export function getAllPagesData(files, resourcePath, dir = "") {
  let resources = [];

  files.forEach((file) => {
    const currPath = path.join(resourcePath, dir, file);
    const isDirectory = fs.statSync(currPath).isDirectory();
    const fileName = file.replace(/.md/i, "");

    // recursively get the resources that are in directories
    if (isDirectory) {
      let files = fs.readdirSync(currPath);
      resources.push(
        ...getAllPagesData(files, resourcePath, path.join(dir, file)),
      );
    } else {
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
  });

  return resources;
}
