/**
 * Handle swiching between light and dark theme
 */
function toggleTheme() {
  const body = $("body");

  $("#theme-btn").on("click", () => {
    body.toggleClass("dark");
    localStorage.setItem("theme", body.hasClass("dark") ? "dark" : "");
  });
}

/**
 * Handle scrolling to top functionality
 */
function scrollToTop() {
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
function toggleFolders() {
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
  folders.find(".folder").find(".topic").each((_i, elem) => {
    const topicHref = elem.firstChild.href;

    if (topicHref == window.location.href) {
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
 *  Show/hide the navbar when clicking the folding button
 */
function toggleNavbarDisplay() {
  const navbar = $("#navbar");
  const navFoldBtn = $("#nav-fold-btn");

  navFoldBtn.on("click", () => {
    navbar.toggleClass("folded");
    navFoldBtn.toggleClass("folded");
  });
}

/**
 * Allow switching between the topics list and the TOC list
 */
function toggleNavbarLists() {
  const toc = $("#toc");
  const topics = $("#topics");

  const menuToc = $("#menu-toc");
  const menuTopics = $("#menu-topics");

  menuToc.on("click", () => {
    toc.removeClass("hidden");
    menuToc.addClass("active");

    topics.addClass("hidden");
    menuTopics.removeClass("active");

    $("#navbar")[0].scrollTo(0, 0);
  })

  menuTopics.on("click", () => {
    topics.removeClass("hidden");
    menuTopics.addClass("active");

    toc.addClass("hidden");
    menuToc.removeClass("active");
  })
}

/**
 * Add interactions with overlay:
 * - fold navbar and topic folders
 * - switch between toc list and topics list
 * - scroll to top button
 * - toggle dark/light mode
 */
function overlay() {
  // Show/hide navbar
  toggleNavbarDisplay();

  // Allow switching between TOC and topics in the navbar
  toggleNavbarLists();

  // Fold/unfold topic folders
  toggleFolders();

  // Dark/light mode toggling
  toggleTheme();

  // Scroll to top functionality
  scrollToTop();
}

overlay();
