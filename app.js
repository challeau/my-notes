const marked = require('marked');
const fs = require('fs');
const express = require('express');
const app = express();

app.get('/', (request, response) => {
    fs.readFile('./ressources/js.md', 'utf8', (err, data) => {
	if (err) {
	    console.error(err);
	    return;
	}
	response.send(marked.parse(data));
    });
});

app.listen(3000);