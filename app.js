import { readdir } from "node:fs";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import { getPageListFromPath, getNavbarData } from "./src/utils/index.js";

// File paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const noteFilesPath = path.join(__dirname, "notes");
const publicAssetsPath = path.join(__dirname, "public");
const viewsPath = path.join(__dirname, "src/views");

// Setup the app
const app = express();
const PORT = 3000;

app.use(express.static(publicAssetsPath));
app.set("view engine", "pug");
app.set("views", viewsPath);

const topics = []; // recursive dirread -> dir as [[]]
const navbarData = getNavbarData(notesDirent);

// Home page route
app.get("/", (_req, res) => {
  res.render("index", { title: "Charlotte's notes", navbarData: navbarData });
});

for (const topic of topics) {
  // One index route per topic
  app.get(topic.name, (_req, res) => {
    res.render("topic-template", {
      title: topic.name,
      navbarData: navbarData,
    });
  });

  // One route per note file
}

// #########################################################################
readdir(noteFilesPath, (_err, files) => {
  let pageList = getPageListFromPath(noteFilesPath);
  let navbarDirs = getNavbarData(pages);

  // Home page route
  app.get("/", (_req, res) => {
    res.render("index", { title: "Charlotte's notes", navDirs: navbarDirs });
  });

  // Create route for each page
  for (let page of pages) {
    app.get(page.metadata.endpoint, (_req, res) => {
      res.render("page-template", {
        title: page.metadata.title,
        navDirs: navbarDirs,
      });
    });
  }
});

app.listen(PORT);

console.log(`iss all good, have fun learnin' :)\nhttp://localhost:${PORT}`);
