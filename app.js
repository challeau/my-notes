import fs from "fs";
import express from "express";
import { fileURLToPath } from 'url';
import path from 'path';
import { getResources, getNavData } from "./utils/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Setup the app
const app = express();
const PORT = 3000;
const filesPath = path.join(__dirname, "./note-files/");
console.log(filesPath);

app.set("view engine", "pug");
app.use(express.static(__dirname + "/public"));

// ROUTING
fs.readdir(filesPath, (err, files) => {
  let resources = getResources(files, filesPath);
  let navDirs = getNavData(resources);

  // home page
  app.get("/", (req, res) => {
    res.render("index", { title: "Charlotte's notes", navDirs: navDirs });
  });

  // for each file in our ressources, create a route and render the resource
  for (let rsrc of resources) {
    app.get(rsrc.metadata.endpoint, (req, res) => {
      res.render("page-template", {
        title: rsrc.metadata.title,
        content: rsrc.text,
        navDirs: navDirs,
      });
    });
  }
});

app.listen(PORT);
console.log(`iss all good :)\nListening on port ${PORT}`);
