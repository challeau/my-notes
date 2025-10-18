/**
 * Turn string into a navigation-safe string for anchoring
 */
function getAnchorFromStr(str){
  return str.toLowerCase().replace(/ /g, "-").replace(/[^a-zA-Z0-9-_]/g, "");;
}

/**
 * Retrieve all headers from the page contents and insert them into the table of content
 */
function parsePageForTOC() {
  $(":header").each((_i, elem) => {
    // Ignore main title
    if ($(elem).is('h1')) {
      return;
    }

    // Append header to the TOC
    $(elem).clone().appendTo("#toc");
  });
}

/**
 * When clicking on a header in the table of contents, jump to the corresponding section in the page
 */
function jumpToPageSection() {
  const allHeaders = $(".page").find(":header");

  // Add anchors to all the headers in the page
  allHeaders.each((_i, elem) => {
    elem.id = getAnchorFromStr(elem.innerText);
  });

  // Scroll to section on click
  $("#toc").on("click", ":header", (event) => {
    // Scroll page
    const sectionId = '#' + getAnchorFromStr(event.target.innerText);
    $(".page").find(sectionId)?.[0].scrollIntoView();

    // Scroll the clicked section into view in the navbar
    $("#toc :header").removeClass("current");
    $(event.target).addClass("current");
    event.target.scrollIntoView({ behavior: "smooth", block: "center" });
  });
}

/**
 * Add functionality to the table of content:
 * - Fill it with all the headers in the page
 * - Anchor jumping on click
 */
function TOC() {
  // Fill the TOC
  parsePageForTOC();

  // Scroll page to section when clicking a header in the TOC
  jumpToPageSection();
}

TOC();
