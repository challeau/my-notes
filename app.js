const marked = require('marked');
const fs = require('fs');
const express = require('express');
const path = require('path');
const sanitizeHtml = require('sanitize-html');

const app = express();
const PORT = 3000;

app.set('view engine', 'pug');

function getRessource(ressourceName) {
    const fileName = path.join(__dirname, `./ressources/${ressourceName}.md`);
    let text = fs.readFileSync(fileName, 'utf8');
    return sanitizeHtml(marked.parse(text));
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/js', (req, res) => {
    let content = getRessource('js');
    res.render('template', {title: 'JavaScript', content});
});

app.get('/react', (req, res) => {
    res.send(buildPage('react'));
});

app.get('/int', (req, res) => {
    res.send(buildPage('interview-prep'));
});





app.listen(PORT);

console.log('iss all good :)');

