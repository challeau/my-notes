function getTarget(event, expectedTag) {
    return event.target.tagName === expectedTag ? event.target : event.target.parentElement;
}


// handle table of contents: anchor jumping and folding
// add anchors to all the headers in the page
let headings = document.querySelector('.content').querySelectorAll('h1, h2, h3, h4, h5, h6');

for (let h of headings){
    let anchor = h.innerText.toLowerCase().replace(/ /g, '-').replace(/[^a-zA-Z0-9-_]/g, '');
    h.id = '#' + anchor;
}

// allow folding of TOC
let tocTitle = document.getElementById("#table-of-contents");
let arrow = document.createElement("span");
arrow.innerText = "chevron_right";
arrow.className = "material-symbols-outlined";
arrow.style.transform = "rotate(90deg)";
tocTitle.insertBefore(arrow, tocTitle.firstChild);

let toc = tocTitle.nextElementSibling;
toc.id="TOC";

// if user clicks => scroll to section
for (let li of toc.children) {
    li.addEventListener('click', event => {
	let id = getTarget(event, "A").getAttribute("href");
        document.getElementById(id).scrollIntoView();
    });
}

// fold TOC
tocTitle.addEventListener("click", event => {
    const target = getTarget(event, "H5");
    const rotation = target.firstChild.style.transform === '' ? 'rotate(90deg)' : '';
    target.firstChild.style.transform = rotation;
    toc.style.display = toc.style.display == "none" ? "block" : "none";
});
