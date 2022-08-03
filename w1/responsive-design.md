
# DEFINITIONS

**Viewport**: region of the screen used to display a portion of the total image to be shown.<br>
**Mobile-first**: design philosophy that aims to create better user experiences by beginning the design process with mobile devices in mind first, often prioritizing the smallest of screens.<br>
**Media queries**: feature of CSS 3 allowing content rendering to adapt to different conditions such as screen resolution, color, orientations... They help limit the stylesheet's scope.<br>
**em/rem**: sizes. em is relative to parent’s font size and rem is relative to the html font size

# POSITIONING

| position | result                                                                                                                                                                                                       |
|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| static   | the element is not positioned in any special way                                                                                                                                                             |
| relative | behaves the same as static unless you add some extra properties (top, bottom, left, right).<br>>> relative to its original position before translating.                                                      |
| fixed    | the element is positioned relative to the screen of our device and will stay fixed to the viewport even while scrolling                                                                                      |
| absolute | works as fixed but instead of being positioned relative to the viewport, it’s positioned relative to the nearest positioned element. That is, the nearest element with a position different than static.     |
| sticky   | the element is positioned according to the normal flow of the document, and then offset relative to its nearest scrolling ancestor and containing block based on the values of top, right, bottom, and left. |


# RANDOM

- Changing flexbox-direction can be good for responsive tiled websites.
- It's possible to hide/display different things with media queries and ```display: none;```.
- It's better to load lighter images on mobile (3G lol) >> ```<source media="">```
- Prefer relative sizes duh
- Combine z-indexes and relative positioning to overlay elements
