
[//]: # (TITLE CSS Layout)
[//]: # (ENDPOINT /layout)

# CSS LAYOUT


**CSS page layout** techniques allow us to take elements contained in a web page and **control where they're positioned** relative to:
 - Their default position in normal layout flow.
 - The other elements around them.
 - Their parent container.
 - The main viewport/window. 


<!-- markdown-toc start - Don't edit this section. Run M-x markdown-toc-refresh-toc -->
##### Table of contents

- [1 - Normal flow](#1---normal-flow)
- [2 - The `display` property](#2---the-display-property)
- [3 - Flexbox](#3---flexbox)
    - [3.1 Properties for the flex container](#31-properties-for-the-flex-container)
        - [3.1.1 flex-direction](#311-flex-direction)
        - [3.1.2 flex-wrap](#312-flex-wrap)
        - [3.1.3 flex-flow](#313-flex-flow)
        - [3.1.4 justify-content](#314-justify-content)
        - [3.1.5 align-items](#315-align-items)
        - [3.1.6 gap](#316-gap)
    - [3.2 Properties for the flex items](#32-properties-for-the-flex-items)
        - [3.2.1 order](#321-order)
        - [3.2.2 flex = flex-grow + flex-shrink + flex-basis](#322-flex--flex-grow--flex-shrink--flex-basis)
        - [3.2.3 align-self](#323-align-self)
- [Sources](#sources)

<!-- markdown-toc end -->

## 1 - Normal flow

By default, the browser displays the DOM in the exact order in which it appears in the source code, with elements stacked on top of one another. We can use some of the tools in CSS to alter the default behavior for more complex layouts. 

> Starting with a well-structured HTML document is very important because you can then work with the way things are laid out by default rather than fighting against it.

There are two types of elements: **block** elements which appear **one below the other**, and **inline** elements which appear **beside one another**.



## 2 - The `display` property

This property allows us to **change the default way something displays**. 

The fact that you can change the value of display for any element means that you can pick HTML elements for their semantic meaning without being concerned about how they will look. The way they look is something that you can change.

The `display` property sets an element's inner and outer display types:
 - The element's outer display type, essentially its role in the normal layout, can be set to `block`, `inline`, or `none`.
 - The element's inner display type, which defines the layout of its contents, can be set to `flex` or `grid` (among others);
 

## 3 - Flexbox

Flexbox is designed to make it easy for us to **lay things out in one dimension**, either as a row or as a column. 

It's an inner display type, which means that all the items we want to align must be in a container.

<!-- <img src="" alt="lol"/> -->
![center-eg](container.png)

We start by defining our container as a flex container with the `display` property:

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

This will display all the items in a row:

![center-eg](flex.png)


The layout can be further modified with the help of flexbox properties.

### 3.1 Properties for the flex container

#### 3.1.1 flex-direction

A property that defines the main axis (row or column) and direction (normal or reversed) for the flex-items to be placed.

![center-eg](flex-dir.png)


#### 3.1.2 flex-wrap

A property that allows flex items to wrap onto multiple lines:

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

This defines the alignment along the main axis. It helps distribute extra free space leftover when either all the flex items on a line are inflexible, or are flexible but have reached their maximum size. 

![center-eg](justify-content.png)


#### 3.1.5 align-items

This defines the default behavior for how flex items are laid out along the cross axis on the current line. 

![center-eg](align-items.png)


#### 3.1.6 gap

A shorthand for `row-gap` and `column-gap`, specifying the size of the space between rows and columns within the flex container.

![center-eg](gap.png)


### 3.2 Properties for the flex items

#### 3.2.1 order

This defines the order in which the flex items appear in the flex container. Items with the same `order` revert to source order.

![center-eg](order.png)


#### 3.2.2 flex = flex-grow + flex-shrink + flex-basis

`flex` is the shorthand for the following properties:
 - `flex-grow`: sets the flex grow factor, which specifies how much of the flex container's remaining space should be assigned to the flex item's main size.
 - `flex-shrink`: sets the flex shrink factor of a flex item. If the size of all flex items is larger than the flex container, items shrink to fit according to `flex-shrink`.
 - `flex-basis`: sets the initial main size of a flex item. It sets the size of the content box unless otherwise set with box-sizing.
 
The default is `0 1 auto`.

![center-eg](flexsh.png)


#### 3.2.3 align-self

This allows the default alignment to be overridden for individual flex items.

![center-eg](align-self.png)




## Sources

 - [Layout - MDN](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout)
 - [Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
