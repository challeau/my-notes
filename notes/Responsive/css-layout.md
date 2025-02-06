[//]: # (TITLE CSS Layout)
[//]: # (ENDPOINT /layout)

# CSS layout


**CSS page layout** techniques allow us to take elements contained in a web page and **control where they're positioned** relative to:
 - Their **default position** in normal layout flow.
 - The **other elements** around them.
 - Their **parent** container.
 - The main **viewport**/window. 


<!-- markdown-toc start - Don't edit this section. Run M-x markdown-toc-refresh-toc -->
##### Table of contents

- [CSS layout](#css-layout)
				- [Table of contents](#table-of-contents)
	- [1 - Normal flow](#1---normal-flow)
	- [2 - The `display` property](#2---the-display-property)
	- [3 - Flexbox](#3---flexbox)
		- [3.1 Properties of the flex container](#31-properties-of-the-flex-container)
			- [3.1.1 flex-direction](#311-flex-direction)
			- [3.1.2 flex-wrap](#312-flex-wrap)
			- [3.1.3 flex-flow](#313-flex-flow)
			- [3.1.4 justify-content](#314-justify-content)
			- [3.1.5 align-items](#315-align-items)
			- [3.1.6 gap](#316-gap)
		- [3.2 Properties of the flex items](#32-properties-of-the-flex-items)
			- [3.2.1 order](#321-order)
			- [3.2.2 flex = flex-grow + flex-shrink + flex-basis](#322-flex--flex-grow--flex-shrink--flex-basis)
			- [3.2.3 align-self](#323-align-self)
	- [4 - Grid](#4---grid)
		- [4.1 Creating a grid](#41-creating-a-grid)
		- [4.2 Gaps](#42-gaps)
		- [4.3 Sizing a grid](#43-sizing-a-grid)
			- [4.3.1 Implicit and explicit grids](#431-implicit-and-explicit-grids)
			- [4.3.2 The `minmax()` function](#432-the-minmax-function)
		- [4.4 Positioning elements](#44-positioning-elements)
			- [4.4.1 Line-based placement](#441-line-based-placement)
			- [4.4.2 Area-based placement](#442-area-based-placement)
		- [4.5 Nesting grids](#45-nesting-grids)
	- [5 - Floats](#5---floats)
	- [6 - Positioning](#6---positioning)
		- [6.1 Static positioning](#61-static-positioning)
		- [6.2 Relative positioning](#62-relative-positioning)
		- [6.3 Absolute positioning](#63-absolute-positioning)
		- [6.4 Fixed positioning](#64-fixed-positioning)
		- [6.5 Sticky positioning](#65-sticky-positioning)
		- [6.6 `z-index`](#66-z-index)
	- [Sources](#sources)

<!-- markdown-toc end -->

## 1 - Normal flow

By default, the browser displays the DOM in the exact order in which it appears in the source code, with elements stacked on top of one another. We can use some of the tools in CSS to alter the default behavior for more complex layouts. 

> Starting with a well-structured HTML document is very important because you can then work with the way things are laid out by default rather than fighting against it.

There are two types of elements: **block** elements which appear **one below the other**, and **inline** elements which appear **beside one another**.



## 2 - The `display` property

This property allows us to **change the default way something displays**. 

The fact that you can change the value of display for any element means that you can pick HTML elements for their semantic meaning without being concerned about how they will look. The way they look is something that you can change.

The `display` property sets an element's **inner** and **outer** display types:
 - The element's **outer** display type, essentially its **role in the normal layout**, can be set to `block`, `inline`, or `none`.
 - The element's **inner** display type, which defines the **layout of its contents**, can be set to `flex` or `grid` (among others).
 

## 3 - Flexbox

Flexbox is designed to make it easy for us to **lay things out in one dimension**, either as a row or as a column. 

It's an **inner display type**, which means that all the items we want to align must be in a **container**.

![center-eg](container.png)

We start by defining our container as a flex container with the `display` property:

<div>

```html
<div class="container">
  <div>1</div>
  <div>2</div>
  <div>3</div>
</div>

<style>
  .container {
	  display: flex;
	  border: 2px solid #d9cec1;
  }
</style>
```

![center-eg](flex.png)

</div>

The layout can be further modified with the help of **flexbox properties**.

### 3.1 Properties of the flex container

#### 3.1.1 flex-direction

A property that defines the **main axis** (row or column) and **direction** (normal or reversed) for the flex-items to be placed.

![center-eg](flex-dir.png)


#### 3.1.2 flex-wrap

A property that **allows flex items to wrap** onto multiple lines:

![center-eg](flex-wrap.png)


#### 3.1.3 flex-flow

A shothand for the properties `flex-direction` and `flex-wrap`:


```css
.container {
	display: flex;
	flex-flow: column wrap;
}
```

#### 3.1.4 justify-content

This defines the **alignment along the main axis**. It helps **distribute extra free space** leftover when either all the flex items on a line are inflexible, or are flexible but have reached their maximum size. 

![center-eg](justify-content.png)


#### 3.1.5 align-items

This defines the default behavior for how flex items are laid out **along the cross axis** on the current line. 

![center-eg](align-items.png)


#### 3.1.6 gap

A shorthand for `row-gap` and `column-gap`, specifying the **size of the space between rows and columns** within the flex container.

![center-eg](gap.png)


### 3.2 Properties of the flex items

#### 3.2.1 order

This defines the **order in which the flex items appear** in the flex container. Items with the same `order` revert to source order.

![center-eg](order.png)


#### 3.2.2 flex = flex-grow + flex-shrink + flex-basis

`flex` is the shorthand for the following properties:
 - `flex-grow`: sets the **flex grow factor**, which specifies how much of the flex container's remaining space should be assigned to the flex item's main size.
 - `flex-shrink`: sets the **flex shrink factor** of a flex item. If the size of all flex items is larger than the flex container, items shrink to fit according to `flex-shrink`.
 - `flex-basis`: sets the **initial main size of a flex item**. It sets the size of the content box unless otherwise set with box-sizing.
 
The default is `0 1 auto`.

![center-eg](flexsh.png)


#### 3.2.3 align-self

This allows the **default alignment to be overridden for individual flex items**.

![center-eg](align-self.png)


## 4 - Grid

> The grid layout is a **two-dimensional layout system.** 

A grid is a **set of intersecting horizontal and vertical lines defining columns and rows**. `Elements` can be placed onto the grid within these column and row lines.

![center-eg](grid.png)


CSS grid layout has the following features:
 - **Fixed and flexible track sizes**: you can use units of length, percetages, or fractions to specify the sizing of your grid.
 - **Item placement**: you can place items into a precise location on the grid using line numbers, names or by targeting an area of the grid. Items not given an explicit position on the grid will be placed automatically.
 - **Creation of additional tracks to hold content**: the grid Layout specification is flexible enough to add additional rows and columns when needed. Features such as adding "as many columns that will fit into a container" are included.
 - **Alignment control**: grid contains alignment features so we can control how the items align once placed into a grid area, and how the entire grid is aligned.
 - **Control of overlapping content**: more than one item can be placed into a grid cell or area and they can partially overlap each other. This layering may then be controlled with the z-index property.

Grid is a powerful specification that, when combined with other parts of CSS such as flexbox, can help you create layouts that were previously impossible to build in CSS. 

### 4.1 Creating a grid

We create a grid container by declaring `display: grid;` or `display: inline-grid;` on a container element. This creates a **one column grid**, and all direct children of the container become grid items.

Grid tracks are defined in the explicit grid by using the `grid-template-columns` and `grid-template-rows` properties or the shorthand `grid` or `grid-template` properties.

<div>

```html
<div class="container">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
  <div>5</div>
  <div>6</div>
</div>

<style>
  .container {
      display: grid;
	  grid-template-columns:  1fr 1fr 1fr;
      border: 2px solid #d9cec1;
  }
</style>
```

![center-eg](ezgrid.png)

</div>


### 4.2 Gaps

To create **gaps between tracks**, use the properties `column-gap`, `row-gap`, or the shorthand `gap`.

![center-eg](gridgap.png)


### 4.3 Sizing a grid

The templates can be expressed in lengths and percentages, but also in fractions: the `fr` unit represenpts **one fraction of the *available* space** in the grid container to flexibly size grid rows and columns. You can miz flexible and absolute sizes.

![center-eg](gridtemp.png)

Large grids with many tracks can use the `repeat()` notation, to repeat all or a section of the track listing:

```css
.container {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
}

/* is equivalent to*/

.container {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
}
```


#### 4.3.1 Implicit and explicit grids

Up to this point, we've specified only column tracks, but rows are automatically created to hold the content. This concept highlights the distinction between **explicit and implicit grids**:
 - Defining grid tracks with `grid-template-column` or `grid-template-row` creates an **explicit grid**.
 - The **implicit grid** extends the defined explicit grid if something is placed outside of the defined grid, or if due to the amount of content more grid tracks are needed.

By default, tracks created in the implicit grid are `auto` sized, which in general means that they're large enough to contain their content. You can also define a set size for tracks created in the implicit grid with the `grid-auto-rows` and `grid-auto-columns` properties.


#### 4.3.2 The `minmax()` function

The `minmax()` function allows us to cap the size of a track. Using a minimum value and a maximum of `auto` will expend to accomodate more content.

To fit as many columns as possible in a container, you can combine `repeat()` and `minmax()` with the keyword `auto-fit`:

```css
.container {
	width: 420px;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
	grid-auto-rows: minmax(100px, auto);
	gap: 20px;
}
```

![center-eg](gridrep.png)


### 4.4 Positioning elements

#### 4.4.1 Line-based placement

To position items along the grid lines, we can **specify the start and end lines of the grid** area where an item should be placed. 

There are four properties we can use to do this: 

<div>

```css
.container {
	display: grid;
	grid-template-columns: 1fr 3fr;
	grid-template-rows: 1fr 1fr 3fr;
}

.picture {
    grid-column-start: 1;
    grid-column-end: 2;
	grid-row-start: 1;
    grid-row-end: 4;
}

/* or use the shorthands: */
.name {
	grid-column: 2 / 3;
	grid-row: 1 / 2;
}

.rating {
	grid-column: 2 / 3;
	grid-row: 2 / 3;
}

.comment {
	grid-column: 2 / 3;
	grid-row: 3 / 4;
}
```

![center-eg](rating.png)

</div>

*Note: You can also use the value -1 to target the end column or row line, then count inwards from the end using negative values.<br/>
Also note: lines count always from the edges of the explicit grid, not the implicit grid.*

#### 4.4.2 Area-based placement

An alternative way to arrange items on your grid is to use the `grid-template-areas` property and **give the various elements of your design a name**.

<div>

```css
.ratingCard {
	display: grid;
	grid-template-areas:
		"picture name"
		"picture rating"
		"picture comment";
	grid-template-columns: 1fr 3fr;
	grid-template-rows: 1fr 1fr 3fr;
}

.picture { grid-area: picture; }

.name { grid-area: name; }

.rating { grid-area: rating; }

.comment { grid-area: comment; }
```

![center-eg](rating2.png)

</div>

The rules for `grid-template-areas` are as follows:
 - You need to have **every cell of the grid filled**.
 - To span across two cells, **repeat** the name.
 - To leave a cell empty, use a `.` (period).
 - **Areas must be rectangular** (you can't have an L-shaped area).
 - **Areas can't be repeated** in different locations.
 
### 4.5 Nesting grids

It's possible to nest a grid within another grid, creating a **subgrid**. You can do this by setting the `display: grid` property on a grid item. 

To make it easier to work with layouts in nested grids, you can use `subgrid` on` grid-template-rows` and `grid-template-columns` properties. This allows you to **leverage the tracks defined in the parent grid**.

> Instead of creating a new track listing the **nested grid uses the tracks defined on the parent**.

<div>

```css
/* Parent grid */
.container {
	display: grid;
	grid-template-rows: 1fr 3fr;
	grid-template-columns: 2fr 1fr 3fr;
	gap: 10px;
}

.image {
	grid-column: 1 / 2;
	grid-row: 2 / 4;
}

.title {
	grid-column: 1 / 2;
	grid-row: 1 / 2;
}

.review {
	display: grid;
	grid-template-columns: subgrid;
	grid-template-rows: 1fr 3fr 3fr 3fr;
	grid-column: 2 / 4;
}

.lsp { grid-row: 2 / 3; }

.jake { grid-row: 3 / 4; }

/* Children grid */
.picture {
	grid-column: 1/2;
	grid-row: 1/4;
}

.name { 
	grid-column: 3/4;
	grid-row: 1/2;
}

.rating {
	grid-row: 2/3;
	grid-column: 3/4;
}

.comment {
	grid-column: 2/3;
	grid-row: 3/4;
}
```

```html
<div class="container">
	<div class="title">Candy Tavern</div>
	<img class="image"/>
    
    <div class="review lsp">
      <img class="picture">
      <div class="name">LSP</div>
      <div class="rating">...</div>
      <div class="comment">...</div>
	</div>

	<div class="review jake">
      <img class="picture">
      <div class="name">Jake the dog</div>
      <div class="rating">...</div>
      <div class="comment">...</div>
	</div>
</div>
```

</div>

In this example, since we use the container's column lines, we don't have to write by hand the position of each element inside a review. We just have to place the review on the container grid's rows.

![center-eg](rating3.png)


## 5 - Floats

Originally for **floating images inside blocks of text**, the float property became one of the most commonly used tools for creating multiple column layouts on webpages. With the advent of flexbox and grid it's now returned to its original purpose.

Float can have one of four values: `left`, `right`, `none`, and `inherit`.

When setting an element to float, it is **taken out of the normal layout flow** of the document and **stuck to the chosen side** of its parent container. Any content that would come below or after the floated element in the normal layout flow will now wrap around it instead, filling up the space to the other side of it as far up as the top of the floated element. There, it will stop.

<div>

![center-eg](float1.png)

![center-eg](float2.png)

</div>

To stop an element following the floated image to go up, set its clear property: `clear: left;`.

## 6 - Positioning

Positioning allows you **to take elements out of normal document flow** and make them behave differently, for example, by sitting on top of one another or by always remaining in the same place inside the browser viewport. 

The **inset properties** (`top`, `bottom`, `left`, and `right`) are used alongside `position` to specify exactly where to move the positioned element to. The values of these properties **represent the offset** and can take **any units** you'd reasonably expect: `px`, `mm`, `rem`, `%`...

### 6.1 Static positioning

Static positioning is **the default**. The element will be in its normal postition in the document flow.

### 6.2 Relative positioning

Relative positioning allows us to **modify the final position** of an element, once it has taken its place in the normal flow. This means that the space the element takes in the normal flow will be oreserved, but the element will appear at a different spot on the screen.

![center-eg](relative.png)

### 6.3 Absolute positioning

Absolute position is similar to relativce positioning **but the element's space in the normal flow won't be kept.**

An absolutely positioned element **no longer exists in the normal document flow**. Instead, it sits on its own layer separate from everything else. This is very useful: it means that we can create isolated UI features that don't interfere with the layout of other elements on the page.

The inset properties behave in a different way with absolute positioning. Rather than positioning the element based on its relative position within the normal document flow, they specify the **distance the element should be from each of the containing element's sides**.

Which element is the "containing element" of an absolutely positioned element? This is very much **dependent on the position property of the ancestors** of the positioned element.

> The **container must have its position set** in order to be used as the **positioning context**, as a reference for an element with an absolute position. A way to do this is to set the container's position to `relative` without any inset property.

If no ancestor elements have their position property explicitly defined, then by default all ancestor elements will have a static position. The result of this is the **absolutely positioned element will be contained in the initial containing block**. The initial containing block has the dimensions of the viewport and is also the block that contains the `<html>` element. In other words, the absolutely positioned element will be displayed outside of the `<html>` element and be positioned relative to the initial viewport.

![center-eg](absolute.png)


### 6.4 Fixed positioning

**Fixed positioning** works in exactly the same way as absolute positioning, with one key difference: whereas absolute positioning fixes an element in place relative to its nearest positioned ancestor, fixed positioning *usually* **fixes an element in place relative to the visible portion of the viewport**. 

An **exception** to this occurs if one of the element's ancestors is a **fixed containing block** because its `transform` property has a value other than `none`.

### 6.5 Sticky positioning

Sticky positioning is basically a **hybrid between relative and fixed position**. It allows a positioned element to **act like it's relatively positioned until it's scrolled to a certain threshold** (for example 10px from the top of the viewport if `top: 10px;`), **after which it becomes fixed**.

Sticky elements are "sticky" **relative to the nearest ancestor with a "scrolling mechanism"**, created when `overflow` is `hidden`, `scroll`, `auto`, or `overlay`.

> **At least one** inset property needs to be set to a **non-auto** value for the axis on which the element needs to be made sticky. If both inset properties for an axis are set to `auto`, on that axis the sticky value will behave as relative.

### 6.6 `z-index`

When elements start to overlap, `z-index` determines the **stacking order**, the position of elements on the z-axis (depth). **Only positioned elements** can be moved up or down the stacking order.

By default, positioned elements all have a `z-index` of `auto`, which is effectively 0. `z-index` only accepts unitless index values. The highest value will be on top.


## Sources

 - [Layout - MDN](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout)
 - [Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
