import { readdir } from "node:fs";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import { getAllPagesData, getNavbarData } from "./src/utils/index.js";

// File paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const noteFilesPath = path.join(__dirname, "notes");
const publicAssetsPath = path.join(__dirname, "public");
const viewsPath = path.join(__dirname, "src/views")

// Setup the app
const app = express();
const PORT = 3000;

app.use(express.static(publicAssetsPath));
app.set("view engine", "pug");
app.set("views", viewsPath);

readdir(noteFilesPath, (_err, files) => {
  let pages = getAllPagesData(files, noteFilesPath);
  let navbarDirs = getNavbarData(pages);

  // home page
  app.get("/", (_req, res) => {
    res.render("index", { title: "Charlotte's notes", navDirs: navDirs });
  });

  // for each file in our ressources, create a route and render the resource
  for (let page of pages) {
    app.get(page.metadata.endpoint, (_req, res) => {
      res.render("page-template", {
        title: page.metadata.title,
        content: page.content,
        navDirs: navbarDirs,
      });
    });
  }
});

app.listen(PORT);

console.log(`iss all good, have fun learnin' :)\nhttp://localhost:${PORT}`);
