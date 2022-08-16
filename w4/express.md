
# WEB FRAMEWORKS

## Definitions

> Web Frameworks or web application frameworks (WAFs) are **software frameworks designed to support the development of web applications**, including web services, web resources and web APIs.

Unlike libraries that are just a collection of functions and/or classes that you have to call yourself, **frameworks are in charge of the flow**: they make a call to your code and provide you with some space to write down details.

Many web frameworks provide:
- **Packages for database access**, e.g. for saving your data permanently,
- **Templating engines**, e.g. for making dynamic HTML (or something like HTML),
- **Session management**, e.g. for keeping track of users).

Frameworks often promote code reuse for keeping your code DRY.

## Express JS

ExpressJS, or simply Express, is a **web application framework for Node.js**, released as free and open-source software under the MIT License. <br />
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

In ```app.js``` :
``` javascript
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

In the terminal:
- ```npm init -y```: initialize the folder,
- ```npm install express```: install express,
- ```npm install -D nodemon```: install nodemon as a Dev dependency,
- ``` "dev": "nodemon ./app.js"``` in ```package.json```: alias to run the server,
- ```npm run dev``` to launch the server.

## nodemon

nodemon is a tool that helps develop Node.js based applications by **automatically restarting the node application when file changes are detected**.

## Static files

> Static files are **any content that can be delivered to an end-user without having to be generated, modified, or processed**.

The server delivers the same file to each user, making static content one of the simplest and most efficient content types to transmit over the Internet. <br />
Static files are things like images, CSS, and client-side JavaScript that are sent directly from the server to the browser, with no modification needed.

Express has built-in support for serving these kinds of files ; typically they are saved in a folder called **public**.

``` javascript
// Make everything inside of public/ available
app.use(express.static('public'));
```

Express looks up the files relative to the static directory, so **the name of the static directory is not part of the URL**. <br />
You don’t have to put public/ in the relative path when want to use anything from the public folder -the app will know that if the static file is what you want to show/use, and it will look for it inside public folder by default.  <br />
**e.g.** localhost:3000/images/cool-cat.jpg instead of localhost:3000/public/images/cool-cat.jpg
<br />

# ROUTING

> Routing refers to how an application’s endpoints (URIs) respond to client requests.

You **define routing using methods** of the Express app object that correspond to HTTP methods. For example, **```app.get()```** to handle GET requests and **```app.post()```** to handle POST requests.

These routing methods specify a **callback function** (sometimes called "handler functions") called when the application receives a request to the specified route (endpoint) and HTTP method.<br />
In other words, **the application "listens" for requests that match the specified route(s) and method(s)**, and when it detects a match, it calls the specified callback function.<br />
In fact, the routing methods can have more than one callback function as arguments. With multiple callback functions, it is important to provide **next** as an argument to the callback function and then call next() within the body of the function to hand off control to the next callback.

## Query parameters

> A query string is the part of a URL after the question mark (?). It is meant to **send small amounts of information to the server via the url**.

This information is usually used as **parameters** to query a database, or maybe to filter results. It's really up to you what they're used for.

Query parameters come in ```key=value``` pairs, separated by '&':

``` javascript
https://github.com/sandrabosk?tab=repositories
```

They can be retrieved from the **```query``` object** of the **```request``` object** sent to your route. Express handles all of the URL parsing and exposes the retrieved parameters as this object.

``` javascript
// https://github.com/sandrabosk?tab=repositories

router.get('/', (req, res) => {
  console.log(req.query); // {"tab": "repositories"}
});
```

## Route parameters

In any web application another common way to structure your URLs is to **place information within the actual URL path**, which are simply called **route parameters** in Express.<br />
We can use these to **structure web pages by information/data**, which are especially useful in REST APIs.

Extracting these route parameters is similar to the query parameters. They can be retrived from the **```req.params``` object**.

``` javascript
// https://github.com/sandrabosk?tab=repositories

router.get('/:user', (req, res) => {
  console.log(req.params.user); // {"user": "sandrabosk"}
```

## with the GET method 

Let's take this adress as an example: ```http://localhost:3000/products/1345?show=reviews``` with the route ```/products/:id```.

| HTTP Request     | Express ```req``` object | Value          |
|------------------|--------------------------|----------------|
| Method           | req.method               | GET            |
| URL Path         | req.path                 | /products/1345 |
| URL Params       | req.params.id            | 1345           |
| URL Query string | req.query.show           | reviews        |
|                  |                          |                |

## with the POST method

Express **requires an additional middleware module** to extract incoming data of a POST request. This middleware is called **```body-parser```**.

The term middleware is used to describe **separate products that serve as the glue between two applications**. <br />
They're sometimes called plumbing because they **connect two sides of an application and passes data between them**.<br/>
In this case, the two sides of the application consist of (1) the client making a request, and (2) the server handling that request.

Configure the body parser with: 
``` javascript
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
```

The ```body-parser``` **parses the body of our request**, and makes it available to us in the **```req.body``` object**.
