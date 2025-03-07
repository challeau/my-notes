// Folding the NavBar with the menu button
let navContainer = document.getElementsByClassName("nav-container")[0];
let navFoldBtn = document.getElementById("nav-fold-btn");
let navBar = document.getElementById("nav-bar");

navFoldBtn.addEventListener("click", () => {
  navBar.style.left = navBar.style.left == "0px" ? "-20vw" : "0px";
  navContainer.style.width = navContainer.style.width == "13vw" ? "0" : "13vw";
  navFoldBtn.classList.toggle("open");
});

// Folding the Folders
// Returns all the argument's siblings
function getSiblings(element){
  let siblings = [];
  let nextSibling = element.nextElementSibling;

  while (nextSibling){
    siblings.push(nextSibling);
    nextSibling = nextSibling.nextElementSibling;
  }
  return siblings;
}

// Unfolding a folder
function unfold(element){
  element.classList.toggle("active-folder");
  element.firstChild.classList.toggle("folder-title-clicked");
  getSiblings(element).forEach(e => e.classList.toggle("folded"));
}

let folders = document.getElementsByClassName("folder-title");

// Collapsing folders
for (let folder of folders){
  let siblings = getSiblings(folder);

  if (siblings.find(s => s.classList.contains("active")))
    unfold(folder, folders);

  folder.addEventListener("click", () => unfold(folder));
}

// Handles dark/light mode
document.getElementById("theme-btn").addEventListener("click", () => {
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "light" : "dark");
  document.body.classList.toggle("dark");
});

// Scroll to top button
let scrollBtn = document.getElementById("to-top-btn");

// Appear after user has scrolled
window.addEventListener("scroll", () => {
  let y = window.scrollY;
  
  if (y > 20)
    scrollBtn.style.right = "0";
  else
    scrollBtn.style.right = "-25vw";
});

// Scroll to top when pressed
scrollBtn.addEventListener("click", () => window.scrollTo(0,0));

