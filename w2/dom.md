
# GENERAL INFORMATIONS

> The Document Object Model (DOM) is an API for HTML and XML documents. It provides a **structured representation of the document** and defines a way that the structure can be accessed from JavaScript. This allows us to change the document structure, style or the content from JavaScript.

Every website can be accessed by the JavaScript DOM using the **document** object, which is instantiated automatically when the page is rendered.
It provides functionality globally to the document, like how to obtain the page's URL and create new elements in the document.
Thanks to the document object, we can reference elements based on class, ID, attribute...

| SELECTOR                    | RETURN                                                  |
|-----------------------------|---------------------------------------------------------|
| *.getElementById()*         | first element that matches the given ID                 |
| *.getElementsByClassName()* | array of all child elements with the given class        |
| *.classList*                | array of all the classes                                |
| *.getElementsByTagName()*   | array of all elements with the given HTML tag name      |
| *.querySelector()*          | first element that matches the specified selector**.s** |
| *.querySelectorAll()*       | same as above but an array                              |
| *.getAttribute(name)*       | value of the specified attribute                        |


Once an element is selected, it is possible to change its properties. Any change made with JavaScript will be immediately reflected in the HTML.

| PROPERTY         | GETS/SETS | WHAT                                     |
|------------------|-----------|------------------------------------------|
| *.innerHTML*     | G/S       | the HTML content                         |
| *.style*         | G/S       | the inline style                         |
| *.className*     | G/S       | the value of the class attribute         |
| *.classList*     | G         | a collection of all the class attributes |
| *.id*            | G/S       | the value of the id attribute            |
| *.attributes*    | G         | a collection of all the attributes       |
| *.clientHeight*  | G/S       | the height of the element (padding inc)  |
| *.clientWidth*   | G/S       | the width of the element (padding inc)   |
| *.parentNode*    | G         | the parent node                          |
| *.parentElement* | G         | the parent element                       |


# DOM MANIPULATION

There are a number of methods that allow us to dynamically add or modify DOM elements:

| METHOD                       | DESCRIPTION                                                                                |
|------------------------------|--------------------------------------------------------------------------------------------|
| *.createElement(tag)*        | create an HTML element                                                                     |
| *.appendChild(elem)*         | add an HTML element                                                                        |
| *.removeChild(elem)*         | remove an HTML element                                                                     |
| *.setAttribute(name, value)* | sets *value* to the attribute *name* (creates a new attribute if it doesn't already exist) |
| *document.write(text)*       | write into the HTML output stream                                                          |


# ADDING EVENTS HANDLERS

The addEventListener() method attaches an event handler to an element (without overwriting existing event handlers).

```elem.addEventListener(event, function)```
