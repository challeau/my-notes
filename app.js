const marked = require('marked');
const fs = require('fs');
const express = require('express');

const app = express();
const PORT = 3000;

function getRessource(ressource) {
    let text = fs.readFileSync(`./ressources/${ressource}.md`, 'utf8');
    return marked.parse(text);
}

app.get('/', (req, res) => {
    res.send(getRessource('react'));
});

app.get('/js', (req, res) => {
    res.send(getRessource('js'));
});

app.get('/react', (req, res) => {
    res.send(getRessource('react'));
});


app.listen(PORT);

console.log('iss all good :)');