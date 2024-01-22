/**
 * Find and return the Target from the event. Used to always return the parent
 * <li> when a list items that contain a link is clicked.
 * @param {Object} event - the event
 * @param {String} expectedTag - the tag we're looking to return
 */
function getTarget(event, expectedTag) {
    return event.target.tagName === expectedTag ? event.target : event.target.parentElement;
}



/**
 * Handle TOC: anchor jumping and folding
 */
let headings = document.querySelector(".content").querySelectorAll("h1, h2, h3, h4, h5, h6");

// add anchors to all the headers in the page
for (let h of headings){
    let anchor = h.innerText.toLowerCase().replace(/ /g, "-").replace(/[^a-zA-Z0-9-_]/g, "");
    h.id = "#" + anchor;
}

// allow folding of TOC
let arrow = document.createElement("span");
arrow.innerText = "chevron_right";
arrow.className = "material-symbols-outlined";

let tocTitle = document.getElementById("#table-of-contents");
tocTitle.insertBefore(arrow, tocTitle.firstChild);

let toc = tocTitle.nextElementSibling;
toc.id="TOC";
toc.style.display = "none";

// scroll to section on user click
for (let li of toc.children) {
    li.addEventListener("click", event => {
	let id = getTarget(event, "A").getAttribute("href");
        document.getElementById(id).scrollIntoView();
    });
}

// fold TOC
tocTitle.addEventListener("click", event => {
    const target = getTarget(event, "H5");
    target.firstChild.classList.toggle("titleClicked");
    toc.style.display = toc.style.display == "none" ? "block" : "none";
});
