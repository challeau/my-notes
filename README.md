# my-notes

A simple Node.js app that renders my notes when pushed to the `resources` directory. The notes are written in MarkDown and translated to raw HTML.

> Stack: Node.js, Express, Pug.js.


Visit here: https://charlottes-notes.onrender.com/ .


### How it works

Each file in the `resources` directory has the same structure:

1. Metadata at the top of the file.
```markdown
[//]: # (KEY value)
[//]: # (TITLE My page)
[//]: # (ENDPOINT /myEndPoint)
```
2. A title, opt. an introduction.
3. A table of content generated by [`markdown-toc`](https://github.com/ardumont/markdown-toc).
4. Some educational content.


Every file is parsed for metadata and translated to HTML, using `fs` and `marked`. Then a route is created for each file, and the view is rendered by `Pug.js`.


