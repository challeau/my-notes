/**
 * Return the sibling Elements of the input
 */
function getSiblings(element) {
  const siblings = [];
  let nextSibling = element.nextElementSibling;

  while (nextSibling) {
    siblings.push(nextSibling);
    nextSibling = nextSibling.nextElementSibling;
  }
  return siblings;
}
/**
 * Handle swiching between light and dark theme
 */
function handleTheme() {
  $("#theme-btn").on("click", () => {
    localStorage.setItem("theme", document.body.classList.contains("dark") ? "light" : "dark");
    $("body").toggleClass("dark");
  });
}

/**
 * Randomly selects a Pekoe SVG for the page logo
 */
function handlePekoeLogo() {
  const moods = ["regular", "angry", "sad", "evil"];
  const randomMood = moods.at(Math.floor(Math.random() * moods.length));

  $('#pek-logo').attr("src", `assets/pekoe/${randomMood}.svg#pek-logo`);
}

/**
 * Handle scrolling to top functionality
 */
function handleScrollToTop() {
  const scrollBtn = $("#to-top-btn");

  // Make button visible only after user has scrolled
  $(window).on("scroll", () => {
    if (window.scrollY > 20)
      scrollBtn.css({ right: "0" });
    else
      scrollBtn.css({ right: "-25vw" });
  });

  // Scroll to top when pressed
  scrollBtn.on("click", () => window.scrollTo(0, 0));
}

/**
 * Handle the folding/unfolding of topic folders whe clicked
 */
function handleFolders() {
  $(".collapsible").on("click", (event) => {
    const target = $(event.target);
    if (target.is("li")) {
      target.toggleClass("active");
      target.next().toggle();
    }
  }).find(".folder").hide();
}

/**
 * Add interactions with overlay:
 * - fold navbar
 * - scroll to top
 * - toggle dark/light mode
 */
function overlay() {
  // Folding the NavBar with the menu button
  // const navContainer: Element = document.getElementsByClassName("nav-container")[0];
  // const navFoldBtn = document.getElementById("nav-fold-btn");
  const navBar = document.getElementById("nav-bar");

  if (!navBar) {
    console.log("womp womp can't find navBar elements");
    return;
  }

  // navFoldBtn.addEventListener("click", () => {
  //   navBar.style.left = navBar.style.left == "0px" ? "-20vw" : "0px";
  //   // navContainer.style.width = navContainer.style.width == "13vw" ? "0" : "13vw";
  //   navFoldBtn.classList.toggle("open");
  // });

  // Set a random Pekoe svg
  handlePekoeLogo();

  // Fold/unfold topic folders
  handleFolders();

  // Add dark/light mode toggling
  handleTheme();

  // Add scroll to top functionality
  handleScrollToTop();
}

overlay();
