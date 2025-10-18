const MEOW_ON_ALL_CLICKS = 0;

/**
 * Play a meowing sound when clicking on the peek-oe beacon, or on all clicks
 * on the body when MeowOnAllClicks is 1
 */
function meowOnClick() {
  const meowingSource = MEOW_ON_ALL_CLICKS == 1 ? '*' : "#peek-oe";

  $("body").on("click", meowingSource, () => { document.getElementById("meow-audio")?.play(); });
}

meowOnClick();