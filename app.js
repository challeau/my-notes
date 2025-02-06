/**
 *   /$$$$$$  /$$      Made with <3 by      /$$             /$$     /$$              
 *  /$$__  $$| $$                          | $$            | $$    | $$              
 * | $$  \__/| $$$$$$$   /$$$$$$   /$$$$$$ | $$  /$$$$$$  /$$$$$$ /$$$$$$    /$$$$$$ 
 * | $$      | $$__  $$ |____  $$ /$$__  $$| $$ /$$__  $$|_  $$_/|_  $$_/   /$$__  $$
 * | $$      | $$  \ $$  /$$$$$$$| $$  \__/| $$| $$  \ $$  | $$    | $$    | $$$$$$$$
 * | $$    $$| $$  | $$ /$$__  $$| $$      | $$| $$  | $$  | $$ /$$| $$ /$$| $$_____/
 * |  $$$$$$/| $$  | $$|  $$$$$$$| $$      | $$|  $$$$$$/  |  $$$$/|  $$$$/|  $$$$$$$
 *  \______/ |__/  |__/ \_______/|__/      |__/ \______/    \___/   \___/   \_______/
 *
 */

import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import { getTopicsFromFilepath } from "./src/index.js";

// File paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const noteFilesPath = path.join(__dirname, "notes");
const publicAssetsPath = path.join(__dirname, "public");
const viewsPath = path.join(__dirname, "views");

// Setup the app
const app = express();
const PORT = 3000;

app.use(express.static(publicAssetsPath));
app.set("view engine", "pug");
app.set("views", viewsPath);

const topics = await getTopicsFromFilepath(noteFilesPath);

// Home page route
app.get("/", (_req, res) => {
  res.render("index", { title: "Charlotte's notes", navbarData: topics });
});

for (const topic in topics) {
  // One index route per topic
  app.get(`/${topic.toLowerCase()}`, (_req, res) => {
    res.render("topic-template", {
      title: topic,
      navbarData: topics,
    });
  });

  // One route per note file
  for (const page of topics[topic]) {
    app.get(page.endpoint, (_req, res) => {
      res.render("page-template", {
        title: page.title,
        navbarData: topics,
      });
    });
  }
}

app.listen(PORT);

console.log(`Iss all good, have fun learnin' :)\nView at: http://localhost:${PORT}`);
