const marked = require('marked');
const fs = require('fs');
const express = require('express');
const path = require('path');
const __dirname = path.resolve();

const app = express();
const PORT = 3000;
const HOST = '0.0.0.0';

// set up the routing
const home = (req, res) => {
    //show this file when the "/" is requested
    res.sendFile(__dirname+"/src/home.html");
};

const routes = (app) => {
    // home page
    app.route('/').get(home);
    // GET home page.
    app.route('/home').get(home);
}

app.get('/', (request, response) => {
    fs.readFile('./ressources/js.md', 'utf8', (err, data) => {
	if (err) {
	    console.error(err);
	    return;
	}
	response.send(marked.parse(data));
    });
});

app.listen(PORT, HOST);