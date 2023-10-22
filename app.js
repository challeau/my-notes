const marked = require('marked');
const fs = require('fs');
const express = require('express');
const path = require('path');
const sanitizeHtml = require('sanitize-html');


// App setup
const app = express();
const PORT = 3000;
const resourcePath = path.join(__dirname, './resources/');


app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));


/**
 * Convert md files to HTML and collect its metadata.
 * @param {files} - The list of files to convert.
 * @returns {{text: Document, metadata: Object}} A list of the resource in HTML
 *						 and their meta data.
 */
let getResources = (files) => {
    let ressources = [];

    files.forEach(file => {
	if (!file.match('.md$'))
	    return;

	let text = fs.readFileSync(resourcePath + file, 'utf8');
	let rawMetadata = text.match(/(?<=\[\/\/]: # \()[^\)]*/gm);
	let metadata = {};

	if (rawMetadata) {
	    rawMetadata.forEach(data => {
		let splitData = data.split(/ (.*)/s);
		metadata[splitData.shift().toLowerCase()] = splitData.shift();
	    });
	}

	ressources.push({text: sanitizeHtml(marked.parse(text)), metadata: metadata});
    });
    return ressources;
};


// For each file in our ressources, create a route and render the resource.
fs.readdir(resourcePath, (err, files) => {
    let resources = getResources(files);
    let meta = resources.map(r => r.metadata);

    app.get('/', (req, res) => {
	res.render('page-template',
		   {
		       navData: meta,
		       content: fs.readFileSync(resourcePath + 'index.html', 'utf8')
		   });
    });

    for (let rsrc of resources) {
	app.get(rsrc.metadata.endpoint, (req, res) => {
	    res.render('page-template',
		       {
			   title: rsrc.metadata.title,
			   content: rsrc.text,
			   navData: meta
		       });
	});
    }
});



app.listen(PORT);
console.log('iss all good :)');

