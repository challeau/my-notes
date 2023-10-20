const marked = require('marked');
const fs = require('fs');
const express = require('express');
const path = require('path');
const sanitizeHtml = require('sanitize-html');

const app = express();
const PORT = 3000;

app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});


const resourcePath = path.join(__dirname, './resources/');

/**
 * Converts a md file to HTML, returns it and its metadata.
 * @param {string} resourceName - the name of the resource to return.
 * @returns {Document, Object} The HTML representation of the resource and its meta data
 */
function getResource(resourceName) {
    let text = fs.readFileSync(resourcePath + resourceName + '.md', 'utf8');
    let rawMetadata = text.match(/(?<=\[\/\/]: # \()[^\)]*/gm);
    let metadata = {};

    if (rawMetadata) {
	rawMetadata.forEach(data => {
	    let splitData = data.split(/ (.*)/s);
	    metadata[splitData.shift().toLowerCase()] = splitData.shift();
	});
    }

    return [sanitizeHtml(marked.parse(text)), metadata];
}

fs.readdir(resourcePath, (err, files) => {
    for (let r of files) {
	let name = r.replace('.md', '');
	app.get(`/${name}`, (req, res) => {
	    let [content, metadata] = getResource(name);
	    res.render('article-template', {title: metadata.title, content});
	});
    }
});


app.listen(PORT);

console.log('iss all good :)');

