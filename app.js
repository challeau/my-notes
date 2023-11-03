const marked = require("marked");
const fs = require("fs");
const express = require("express");
const path = require("path");
const sanitizeHtml = require("sanitize-html");


// App setup
const app = express();
const PORT = 3000;
const resourcePath = path.join(__dirname, "./resources/");


app.set("view engine", "pug");
app.use(express.static(__dirname + "/public"));


/**
 * Convert md files to HTML and collect its metadata.
 * @param {Dirent} files - The files to convert.
 * @param {String} path - The path to the parent folder if there is one.
 * @returns {[{text: Document, metadata: Object}]} A list of the resources
 *						   and their meta data.
 */
let getResources = (files, path="") => {
    let resources = [];

    files.forEach(file => {
	const currPath = resourcePath + path + '/' + file;
	const isDirectory = fs.statSync(currPath).isDirectory();
	const fileName = file.replace(/.md/i, '');

	// recursively get the resources that are in directories
	if (isDirectory) {
	    let files = fs.readdirSync(currPath);
	    resources.push(...getResources(files, path + '/' + file));
	}

	else {
	    if (!file.match(".md$"))
		return;

	    let text = fs.readFileSync(currPath, "utf8");
	    let rawMetadata = text.match(/(?<=\[\/\/]: # \()[^\)]*/gm);
	    let metadata = {
		fileName: fileName,
		title: fileName,
		endpoint: '/' + fileName
	    };

	    // extract page information from the metadata in the file
	    if (rawMetadata) {
		rawMetadata.forEach(data => {
		    let splitData = data.split(/ (.*)/s);
		    metadata[splitData.shift().toLowerCase()] = splitData.shift();
		});
	    }

	    if (path)
		metadata.folder = path.split('/').pop();

	    resources.push({text: sanitizeHtml(marked.parse(text)), metadata: metadata});
	}
    });

    return resources;
};

/**
 * Sorts the resources according to the direactory they're in.
 * @param {[Object]} resources - A list of all the resources to sort.
 * @returns {[Object, Array]} An object with the files sorted by directory, and
 *			      the rest of the resources.
 */
let getNavData = (resources) => {
    let allDirs = new Set(resources.map(r => r.metadata.folder));
    let dirs = {};
    let rest = resources.filter(r => r.metadata.folder == undefined).map(r => r.metadata);

    for (let dir of Array.from(allDirs)){
	if (dir == undefined)
	    continue;
	let res = resources.filter(r => r.metadata.folder == dir);
	dirs[dir] = res.map(r => r.metadata);
    }

    return ([dirs, rest]);
};


// ROUTING
fs.readdir(resourcePath, (err, files) => {
    let resources = getResources(files);
    let [navDirs, navLinks] = getNavData(resources);

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

