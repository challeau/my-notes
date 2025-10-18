/**
 *   /$$$$$$  /$$      Made with <3 by      /$$             /$$     /$$              
 *  /$$__  $$| $$                          | $$            | $$    | $$              
 * | $$  \__/| $$$$$$$   /$$$$$$   /$$$$$$ | $$  /$$$$$$  /$$$$$$ /$$$$$$    /$$$$$$ 
 * | $$      | $$__  $$ |____  $$ /$$__  $$| $$ /$$__  $$|_  $$_/|_  $$_/   /$$__  $$
 * | $$      | $$  \ $$  /$$$$$$$| $$  \__/| $$| $$  \ $$  | $$    | $$    | $$$$$$$$
 * | $$    $$| $$  | $$ /$$__  $$| $$      | $$| $$  | $$  | $$ /$$| $$ /$$| $$_____/
 * |  $$$$$$/| $$  | $$|  $$$$$$$| $$      | $$|  $$$$$$/  |  $$$$/|  $$$$/|  $$$$$$$
 *  \______/ |__/  |__/ \_______/|__/      |__/ \______/    \___/   \___/   \_______/
 */
import express, { Express, Request, Response } from "express";
import * as path from "path";

import { getTopicsFromFilepath } from "./fileParsing";
import { parseMdToHtml } from "./customMarked";

async function serve(): Promise<void> {
  // File paths
  const noteFilesPath = path.join(__dirname, "../notes");
  const publicAssetsPath = path.join(__dirname, "../public");
  const viewsPath = path.join(__dirname, "../views");

  // Setup the app
  const app: Express = express();
  const PORT: number = 3000;

  app.use(express.static(publicAssetsPath));
  app.set("view engine", "pug");
  app.set("views", viewsPath);

  const topics = await getTopicsFromFilepath(noteFilesPath);

  // Home page route
  app.get("/", (_req: Request, res: Response) => {
    res.render("index", { title: "Charlotte's notes", navbarData: topics });
  });


  // Serve one route per topic and note file
  for (const topic in topics) {
    const topicEndpoint = `/${topic.toLowerCase()}`;

    // Index route
    app.get(topicEndpoint, (_req, res) => {
      res.render("topic-template", {
        title: topic,
        navbarData: topics,
      });
    });

    // Note routes
    for (const page of topics[topic]) {
      app.get(`${page.endpoint}`, (_req, res) => {
        res.render("page-template", {
          title: page.title,
          navbarData: topics,
          content: parseMdToHtml(page.filepath),
        });
      });
    }
  }

  app.listen(PORT);
  console.log(`Iss all good, have fun learnin' :)\nView at: http://localhost:${PORT}`);
}

serve();
