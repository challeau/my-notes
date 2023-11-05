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
    const rotation = element.firstChild.style.transform === '' ? 'rotate(90deg)' : '';
    element.firstChild.style.transform = rotation;
    getSiblings(element).forEach(e => e.classList.toggle("folded"));
}

// collapsing folders
for (let folder of folders) {
    let siblings = getSiblings(folder);

    if (siblings.find(s => s.classList.contains("active")))
        unfold(folder, folders);

    folder.addEventListener("click", () => unfold(folder));
}