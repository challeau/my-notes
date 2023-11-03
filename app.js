const fs = require("fs");
const express = require("express");
const path = require("path");
const lib = require("./tools.js");


// APP SETUP
const app = express();
const PORT = 3000;
const resourcePath = path.join(__dirname, "./resources/");

app.set("view engine", "pug");
app.use(express.static(__dirname + "/public"));


// ROUTING
fs.readdir(resourcePath, (err, files) => {
    let resources = lib.getResources(files, resourcePath);
    let [navDirs, navLinks] = lib.getNavData(resources);

    // home page
    app.get('/', (req, res) => {
	res.render("page-template",
		   {
		       title: "Charlottes' notes",
		       navDirs: navDirs,
		       navLinks: navLinks,
		       content: fs.readFileSync(__dirname + "/views/index.html", "utf8")
		   });
    });

    // for each file in our ressources, create a route and render the resource
    for (let rsrc of resources) {
	app.get(rsrc.metadata.endpoint, (req, res) => {
	    res.render("page-template",
		       {
			   title: rsrc.metadata.title,
			   content: rsrc.text,
			   navDirs: navDirs,
			   navLinks: navLinks
		       });
	});
    }
});


app.listen(PORT);
console.log("iss all good :)");
