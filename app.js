const fs = require("fs");
const express = require("express");
const path = require("path");
const lib = require("./lib.js");
const marked = require("marked");

// APP SETUP
const app = express();
const PORT = 3000;
const resourcePath = path.join(__dirname, "./resources/");

app.set("view engine", "pug");
app.use(express.static(__dirname + "/public"));

// Adding the language as a class for code parsing
marked.use({
    extensions: [
	{
	    name: 'image',
	    renderer(token) {
		const imagePath = path.join('assets/imgs', token.href);
		let ret = `<img src="${imagePath}" alt="${token.text}"/>`;
		return ret;
	    }
	}]
});

// ROUTING
fs.readdir(resourcePath, (err, files) => {
    let resources = lib.getResources(files, resourcePath);
    let [navDirs, navLinks] = lib.getNavData(resources);

    // home page
    app.get('/', (req, res) => {
	res.render("index",
		   {
		       title: "Charlotte's notes",
		       navDirs: navDirs,
		       navLinks: navLinks
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
