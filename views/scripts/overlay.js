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
    localStorage.setItem("theme", document.body.classList.contains("dark") ? "" : "dark");
    $("body").toggleClass("dark");
  });
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
 * Handle the folding/unfolding of topic folders when clicked, and highlight of current page
 */
function handleFolders() {
  const folders = $(".collapsible");

  // Hide all folder contents
  folders.find(".folder").hide();

  // Toggle folding on click
  folders.on("click", ".folder-title", (event) => {
    const title = $(event.target);

    title.toggleClass("active");
    title.next(".folder").toggle();
  });

  // Highlight current page
  folders.find(".folder").find(".subject").each((_i, elem) => {
    const subjectTitle = elem.firstChild.textContent;

    if (subjectTitle == localStorage.getItem('current-page')) {
      const node = $(elem);
      const folder = node.closest(".folder");
      folder.show();

      const title = folder.prev(".folder-title");
      title.toggleClass("active");

      node.addClass("current");

      // Scroll the current page title into view
      elem.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });
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

  // navFoldBtn.addEventListener("click", () => {
  //   navBar.style.left = navBar.style.left == "0px" ? "-20vw" : "0px";
  //   // navContainer.style.width = navContainer.style.width == "13vw" ? "0" : "13vw";
  //   navFoldBtn.classList.toggle("open");
  // });

  // Fold/unfold topic folders
  handleFolders();

  // Add dark/light mode toggling
  handleTheme();

  // Add scroll to top functionality
  handleScrollToTop();
}

overlay();
