// handle table of contents
// add anchors to all the headers in the page
let headings = document.querySelector('.content').querySelectorAll('h1, h2, h3, h4, h5, h6');

for (let h of headings){
    let anchor = h.innerText.toLowerCase().replace(/ /g, '-').replace(/[^a-zA-Z0-9-]/g, '');
    h.id = '#' + anchor;
}

// find the TOC from its title
let tocTitle = [...headings].find(h => h.innerText == "Table of Contents");
let toc = tocTitle.nextElementSibling;

// if user clicks => scroll to section
for (let li of toc.children) {
    li.addEventListener('click', (event) => {
	let id = (event.target.tagName === 'A' ? event.target : event.target.parentElement).getAttribute("href");
        document.getElementById(id).scrollIntoView();
    });
}