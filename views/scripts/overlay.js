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
    const subjectHref = elem.firstChild.href;

    if (subjectHref == window.location.href) {
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
 *  Handle the display of the navbar
 */
function handleNavbarDisplay() {
  const navBar = $("#nav-bar");
  const navFoldBtn = $("#nav-fold-btn");

  navFoldBtn.on("click", () => {
    navBar.toggleClass("folded");
    navFoldBtn.toggleClass("folded");
  });
}

function meowOnClick(setting) {
  const meowingSource = setting == 'all' ? '*' : "#peek-oe";
  
  $("body").on("click", meowingSource, () => { document.getElementById("meow-audio")?.play(); });
}

/**
 * Add interactions with overlay:
 * - fold navbar
 * - scroll to top
 * - toggle dark/light mode
 */
function overlay() {
  // Show/hide navbar
  handleNavbarDisplay();

  // Allow switching between TOC and topics in the navbar
  // handleMenuBar();

  // Fold/unfold topic folders
  handleFolders();

  // Dark/light mode toggling
  handleTheme();

  // Scroll to top functionality
  handleScrollToTop();

  // Play sound when clicking on pekoe
  meowOnClick('');
}

overlay();
