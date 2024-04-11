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

// add the language as a class for code parsing
marked.use({
	extensions: [
		{
			name: 'image',
			renderer(token) {
				// add the image dir path to the image 
				const imagePath = path.join('assets/imgs', token.href);
				let ret = `<img src="${imagePath}" alt="${token.text}"/>`;
				return ret;
			}
		},
		{
			name: 'link',
			renderer(token) {
				// make link open in new tab if it redirect to another site
				let linkAttribs = `href="${token.href}" title="${token.title}"`;
				if (!token.href.match(/^[/#]/))
					linkAttribs += ' target="_blank"';
				return `<a ${linkAttribs}>${token.text}</a>`;
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
console.log(`iss all good :)\nListening on port ${PORT}`);
