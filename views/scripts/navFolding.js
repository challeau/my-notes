let folders = document.getElementsByClassName("folderTitle");

// Returns all the argument's siblings.
function getSiblings(element){
    let siblings = [];
    let nextSibling = element.nextElementSibling;

    while (nextSibling){
        siblings.push(nextSibling);
        nextSibling = nextSibling.nextElementSibling;
    }

    return siblings;
}

// Unfolds a folder.
function unfold(element){
    element.classList.toggle("activeFolder");
    element.firstChild.classList.toggle("titleClicked");
    getSiblings(element).forEach(e => e.classList.toggle("folded"));
}

// Collapsing folders.
for (let folder of folders) {
    let siblings = getSiblings(folder);

    if (siblings.find(s => s.classList.contains("active")))
        unfold(folder, folders);

    folder.addEventListener("click", () => unfold(folder));
}