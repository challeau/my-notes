"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require("path");
var url_1 = require("url");
var index_js_1 = require("./src/index.js");
// File paths
var __filename = (0, url_1.fileURLToPath)(import.meta.url);
var __dirname = path.dirname(__filename);
var noteFilesPath = path.join(__dirname, "notes");
var publicAssetsPath = path.join(__dirname, "public");
var viewsPath = path.join(__dirname, "views");
// Setup the app
var app = express();
var PORT = 3000;
app.use(express.static(publicAssetsPath));
app.set("view engine", "pug");
app.set("views", viewsPath);
var topics = await (0, index_js_1.getTopicsFromFilepath)(noteFilesPath);
// Home page route
app.get("/", function (_req, res) {
    res.render("index", { title: "Charlotte's notes", navbarData: topics });
});
var _loop_1 = function (topic) {
    var topicEndpoint = "/".concat(topic.toLowerCase());
    // One index route per topic
    app.get(topicEndpoint, function (_req, res) {
        res.render("topic-template", {
            title: topic,
            navbarData: topics,
        });
    });
    var _loop_2 = function (page) {
        app.get("".concat(page.endpoint), function (_req, res) {
            res.render("page-template", {
                title: page.title,
                navbarData: topics,
                content: (0, index_js_1.parseMdToHtml)(page.filepath),
            });
        });
    };
    // One route per note file
    for (var _i = 0, _a = topics[topic]; _i < _a.length; _i++) {
        var page = _a[_i];
        _loop_2(page);
    }
};
for (var topic in topics) {
    _loop_1(topic);
}
app.listen(PORT);
console.log("Iss all good, have fun learnin' :)\nView at: http://localhost:".concat(PORT));
