# my-notes

A simple Node.js app that renders my notes when pushed to the `resources` directory. The notes are written in MarkDown and translated to raw HTML.

> Stack: Node.js, Express, Pug.js.

Visit here: <https://charlottes-notes.onrender.com/> .

### How it works

Each file in the `notes` directory has the same structure:

1. Metadata at the top of the file.

```markdown
[//]: # (KEY value)
[//]: # (TITLE My page)
[//]: # (ENDPOINT /myEndPoint)
```

2. A title, opt. an introduction.
3. Some educational content.

Every file is parsed for metadata and compiled to HTML, using `fs` and `marked`. Then a route is created for each file, and the view is rendered by `Pug.js`.

### v2 todo

- p0
    - [x] only parse pages on render
    - [x] use dirname to build a topic index page
    - [x] generate valid link fragments for TOC
    - [ ] add GH links to index
- p1
    - [x] add short descriptions in metadata (available in topic index or tooltip on navbar hover)
    - [x] turn navbar into a horizontal bar with only the topics
    - [x] make TOC a part of the overlay
    - [x] re-design app
- p2
    - [ ] add support for todo list checking from front
    - [ ] fold page sections
    - [x] fix navbar clip-path
    - [x] migrate to TS
