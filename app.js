import { readdir } from "node:fs";
import express from "express";
import { getAllPagesData, getNavbarData } from "./utils/index.js";

// Setup the app
const app = express();
const PORT = 6006;
const filesPath = './files'

app.set("view engine", "pug");
app.use(express.static("./public"));

// Routing
readdir(filesPath, (err, files) => {
	let pages = getAllPagesData(files, filesPath);
	let navbarDirs = getNavbarData(pages);

  // home page
  app.get("/", (req, res) => {
    res.render("index", { title: "Charlotte's notes", navDirs: navbarDirs });
  });

  // for each note file, create a route and render a page
  for (let page of pages) {
    app.get(page.metadata.endpoint, (req, res) => {
      res.render("page-template", {
        title: page.metadata.title,
        content: page.content,
        navDirs: navbarDirs,
      });
    });
  }
});

// Start the server
app.listen(PORT, () => {
	console.log(`iss all good :)\nListening on port ${PORT}`);
});
