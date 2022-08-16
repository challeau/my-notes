
# WEB FRAMEWORKS

## Definitions

> Web Frameworks or web application frameworks (WAFs) are **software frameworks designed to support the development of web applications**, including web services, web resources and web APIs.

Unlike libraries that are just a collection of functions and/or classes that you have to call yourself, **frameworks are in charge of the flow**: they make a call to your code and provide you with some space to write down details.

Many web frameworks provide:
	- **Packages for database access**, e.g. for saving your data permanently,
	- **Templating engines**, e.g. for making dynamic HTML (or something like HTML),
	- **Session management**, e.g. for keeping track of users).

Frameworks often promote code reuse for keeping your code DRY.

## EXPRESS JS

ExpressJS, or simply Express, is a **web application framework for Node.js**, released as free and open-source software under the MIT License.
It is designed for **building web applications and APIs**. It is the de facto standard server framework for NodeJS, and the backend part of the MERN stack.
<br />

# HTTP REQUEST METHODS

HTTP defines a set of request methods to indicate the desired action to be performed for a given resource. 

## GET

The GET method **requests a representation of the specified resource**. Requests using GET should **only retrieve data**.

GET requests:
	- Can be cached,
	- Remain in the browser history,
	- Can be bookmarked,
	- Should never be used to send sensitive data,
	- Have length restrictions.


## POST
The POST method **submits an entity to the specified resource**, often causing a change in state or side effects on the server.

POST requests:
	- Are never cached,
	- Do not remain in the browser history,
	- Cannot be bookmarked,
	- Are better for sensitive data,
	- Have no restrictions on data length.
<br />

# INTRO TO EXPRESS

## Installation

``` bash
npm init --yes ; npm install express ; touch app.js
```

## Start a server

``` javascript
// this incl
var express = require('express');

// this creates an Express application:
var app = express();

// this defines what to do when a get request is called:
// app.get(route, callback(request, response));
app.get('/', (request, response) => {
	response.send("Hello world!");   // sends an object to the requesting client
});

// this binds and listens for connections on the specified port
// app.listen(port, [host], [backlog], [callback]])
app.listen(3000);
```

## nodemon

nodemon is a tool that helps develop Node.js based applications by **automatically restarting the node application when file changes are detected**.

## Static files

> Static files are **any content that can be delivered to an end-user without having to be generated, modified, or processed**.

The server delivers the same file to each user, making static content one of the simplest and most efficient content types to transmit over the Internet.
Static files are things like images, CSS, and client-side JavaScript that are sent directly from the server to the browser, with no modification needed.

Express has built-in support for serving these kinds of files ; typically they are saved in a folder called **public**.

``` javascript
// Make everything inside of public/ available
app.use(express.static('public'));
```

Express looks up the files relative to the static directory, so **the name of the static directory is not part of the URL**. 
You don’t have to put public/ in the relative path when want to use anything from the public folder -the app will know that if the static file is what you want to show/use, and it will look for it inside public folder by default.
**e.g.** localhost:3000/images/cool-cat.jpg instead of localhost:3000/public/images/cool-cat.jpg


