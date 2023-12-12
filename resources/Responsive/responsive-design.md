[//]: # (TITLE Responsive design)
[//]: # (ENDPOINT /responsive)

# RESPONSIVE DESIGN

Responsive web design is a **web design approach** to make web pages **render well on all screen sizes** and resolutions while ensuring good usability. It is the way to design for a multi-device web.

 > It is a term used to describe a set of best practices used to create a layout that can respond to any device being used to view the content.
 
Responsive sites are built on flexible grids, meaning **you don't need to target every possible device size** with pixel perfect layouts.

By using a flexible grid, you can **change a feature or add in a breakpoint** and change the design at the point where the content starts to look bad. For example, to ensure line lengths don't become unreadably long as the screen size increases you can use columns; if a box becomes squashed with two words on each line as it narrows you can set a breakpoint.

Several layout methods, including Multiple-column layout, Flexbox, and Grid are **responsive by default**. They all assume that you are trying to create a flexible grid and give you easier ways to do so. 
 
 
<!-- markdown-toc start - Don't edit this section. Run M-x markdown-toc-refresh-toc -->
##### Table of contents

- [1 - Media Queries](#1---media-queries)
- [2 - Responsive layout techniques](#2---responsive-layout-techniques)
    - [2.1 - Multiple columns](#21---multiple-columns)
    - [2.2 - Flexbox](#22---flexbox)
    - [2.3 - Grid](#23---grid)
- [3 - Responsive images](#3---responsive-images)
- [4 - Responsive typography](#4---responsive-typography)
    - [4.1 - With media queries](#41---with-media-queries)
- [Sources](#sources)

<!-- markdown-toc end -->

## 1 - Media Queries

Media Queries allow us to run a **series of tests and apply CSS selectively** to style the page appropriately for the user's needs.

For example, the following media query tests to see if the current web page is being displayed as screen media (therefore not a printed document) and the viewport is at least 80rem wide. The CSS for the `.container` selector will only be applied if these two things are true.

```css
@media screen and (min-width: 80rem) {
	.container {
		margin: 1em 2em;
	}
}
```

You can add **multiple media queries** within a stylesheet, tweaking your whole layout or parts of it to best suit the various screen sizes. The points at which a media query is introduced, and the layout changed, are known as **breakpoints**.

A common approach when using Media Queries is to **create a simple single-column layout for narrow-screen devices** (e.g. mobile phones), **then check for wider screens** and implement a multiple-column layout when you know that you have enough screen width to handle it. **Designing for mobile first is known as mobile first design**.

> If using breakpoints, best practices encourage defining media query breakpoints with **relative units** rather than absolute sizes of an individual device.


## 2 - Responsive layout techniques

### 2.1 - Multiple columns

With multicol, you specify a `column-count` to indicate the **maximum number of columns** you want your content to be split into. The browser then works out the size of these, a size that will change according to the screen size.

```css
.container {
	column-count: 3;
}
```

If you instead specify a `column-width`, you are specifying a **minimum width**. The browser will create **as many columns of that width** as will comfortably fit into the container, then share out the remaining space between all the columns. Therefore the number of columns will change according to how much space there is.

```css
.container {
	column-width: 10em;
}
```

You can use the `columns` shorthand to provide a maximum number of columns and a minimum column width. This can **ensure line lengths don't become unreadably long as the screen size increases or too narrow as the screen size decreases**.


### 2.2 - Flexbox

In Flexbox, **flex items shrink or grow, distributing space between the items** according to the space in their container. By changing the values for `flex-grow` and `flex-shrink` you can indicate how you want the items to behave when they encounter more or less space around them.

### 2.3 - Grid

In CSS Grid Layout the `fr` unit allows the distribution of available space across grid tracks. 

## 3 - Responsive images

To ensure media is never larger than its responsive container, the following approach can be used:

```css
img, picture, video {
	max-width: 100%;
}
```

This **scales media to ensure they never overflow their containers**. Using a single large image and scaling it down to fit small devices wastes bandwidth by downloading images larger than what is needed.

The `<picture>` element enables **providing multiple sizes along with "hints"** (metadata that describes the screen size and resolution), and the **browser will choose the most appropriate image for each device**, ensuring that a user will download an image size appropriate for the device they are using.

> Using `<picture>` along with `max-width` removes the need for sizing images with media queries. It enables targeting images with different aspect ratios to different viewport sizes.

## 4 - Responsive typography

Responsive typography describes **changing font sizes within media queries or using viewport units** to reflect lesser or greater amounts of screen real estate.

### 4.1 - With media queries

The following example shows how to size a header two times as big when the viewport is large.
```css
html { font-size: 1em; }

h1 { font-size: 2rem; }

@media (min-width: 1200px) {
	h1 { font-size: 4rem; }
}
```


## Sources

[Responsive course - MDN](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)
