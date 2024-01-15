[//]: # (TITLE DOM Manipulation)
[//]: # (ENDPOINT /jsdom)

# DOM manipulation

The **Document Object Model** (DOM) is an API for HTML and XML documents. It provides a **structured representation of the document** and defines a way that the structure can be accessed from JavaScript. This allows us to change the document structure, style or the content from JavaScript.

<!-- markdown-toc start - Don't edit this section. Run M-x markdown-toc-refresh-toc -->
##### Table of contents

- [1 - `Element`](#1---element)
    - [1.1 - Properties](#11---properties)
    - [1.2 - Methods](#12---methods)
- [2 - Selecting](#2---selecting)
- [3 - Editing](#3---editing)
    - [3.1 - Properties](#31---properties)
    - [3.2 - Methods of the `document` object](#32---methods-of-the-document-object)
    - [3.3 - `.toggle()`](#33---toggle)

<!-- markdown-toc end -->

## 1 - `Element`

`Element` is the most general base class from which all element objects (i.e. objects that represent elements) in a `Document` inherit. It only has methods and properties common to all kinds of elements.

### 1.1 - Properties

| Property                                            | Returns                                                                 |
|-----------------------------------------------------|-------------------------------------------------------------------------|
| `.attributes`                                       | a `NamedNodeMap` object containing the assigned attributes              |
| `.classList`                                        | a `DOMTokenList` containing the list of class attributes                |
| `.id`<br/>`.className`                              | a string representing the id/class                                      |
| `.clientHeight`<br/>`.clientWidth`                  | a number representing the inner height/width                            |
| `.scrollHeight`<br/>`.scrollWidth`                  | a number representing the scroll view height/width                      |
| `.innerHTML`                                        | a string representing the markup of the element's contents              |
| `.children`                                         | the child elements                                                      |
| `.firstElementChild`<br/>`.lastElementChild`        | the first/last child element                                            |
| `.nextElementSibling`<br/>`.previousElementSibling` | the element immediately after/before the element in the tree, or `null` |

### 1.2 - Methods

| Property                   | Description                                                                                                      |
|----------------------------|------------------------------------------------------------------------------------------------------------------|
| `.addEventListener()`      | registers an event handler to a specific event type on the element                                               |
| `.after()`<br/>`.before()` | inserts a set of Node objects or strings in the children list of the element's parent, just after the element    |
| `.append()`                | inserts a set of Node objects or strings after the last child of the element                                     |
| `.insertBefore()`          | inserts a node before a reference node as a child of a specified parent node                                     |
| `.hasAttribute()`          | returns a boolean value indicating if the element has the specified attribute or not                             |
| `.matches()`               | returns a boolean value indicating whether or not the element would be selected by the specified selector string |
| `.remove()`                | removes the element from the children list of its parent                                                         |
| `.replaceWith()`           | replaces the element in the children list of its parent with a set of Node objects or strings                    |
| `.requestFullScreen()`     | asynchronously asks the browser to make the element fullscreen                                                   |
| `.scrollIntoView()`        | scrolls the page until the element gets into the view                                                            |
| `.setHTML()`               | parses and sanitizes a string of HTML and inserts into the DOM as a subtree of the element                       |


## 2 - Selecting

Every website can be accessed by the JavaScript DOM using the `document` object, which is instantiated automatically when the page is rendered.
It provides functionality globally to the `document`, like how to obtain the page's URL and create new elements in the `document`.
Thanks to the `document` object, we can reference elements based on class, ID, attribute...

| Selector                    | Return                                                  |
|-----------------------------|---------------------------------------------------------|
| `.getElementById()`         | first element that matches the given ID                 |
| `.getElementsByClassName()` | array of all child elements with the given class        |
| `.classList`                | array of all the classes                                |
| `.getElementsByTagName()`   | array of all elements with the given HTML tag name      |
| `.querySelector()`          | first element that matches the specified selector**.s** |
| `.querySelectorAll()`       | same as above but an array                              |
| `.getAttribute(name)`       | value of the specified attribute                        |


## 3 - Editing

### 3.1 - Properties
Once an element is selected, it is possible to change its properties. Any change made with JavaScript will be immediately reflected in the HTML.

| Property         | Gets/Sets | Target                                   |
|------------------|-----------|------------------------------------------|
| `.innerHTML`     | G/S       | the HTML content                         |
| `.textContent`   | G/S       | the text content                         |
| `.style`         | G/S       | the inline style                         |
| `.className`     | G/S       | the value of the class attribute         |
| `.classList`     | G         | a collection of all the class attributes |
| `.id`            | G/S       | the value of the id attribute            |
| `.attributes`    | G         | a collection of all the attributes       |
| `.clientHeight`  | G/S       | the height of the element (padding inc)  |
| `.clientWidth`   | G/S       | the width of the element (padding inc)   |
| `.parentNode`    | G         | the parent node                          |
| `.parentElement` | G         | the parent element                       |


### 3.2 - Methods of the `document` object


There are a number of methods that allow us to dynamically add or modify DOM elements:

| Method                       | Description                                                                                |
|------------------------------|--------------------------------------------------------------------------------------------|
| `.createElement(tag)`        | create an HTML element                                                                     |
| `.appendChild(elem)`         | add an HTML element                                                                        |
| `.removeChild(elem)`         | remove an HTML element                                                                     |
| `.setAttribute(name, value)` | sets `value` to the attribute `name` (creates a new attribute if it doesn't already exist) |
| `document.write(text)`       | write into the HTML output stream                                        


### 3.3 - `.toggle()`

The `.toggle()` method of the DOMTokenList interface (or element) removes an existing token from the list or, if it doesn't exist, it's added to the list.

Syntax:

``` javascript
elem.classList.toggle(token [, force]);
```

 - `token`: a string representing the token you want to toggle.
 - `force`: if included, turns the toggle into a one way-only operation. If set to *false*, then token will only be removed, but not added. If set to *true*, then token will only be added, but not removed.

It returns a boolean value indicating whether token is in the list after the call or not. 
