
# DEFINITION

>  An Application Programming Interface or API is a **software intermediary** that allows two applications to talk to each other.

An API simplifies programming by **abstracting the underlying implementation** and only exposing objects or actions the developer needs.

In contrast to a user interface, which connects a computer to a person, an application programming interface **connects computers or pieces of software to each other**. It is not intended to be used directly by a person (the end user) other than a computer programmer who is incorporating it into the software.

An API is often made up of different parts which act as tools or services that are available to the programmer. The calls that make up the API are also known as **subroutines**, **methods**, **requests**, or **endpoints**. An **API specification** defines these calls: it explains how to use or implement them.

One purpose of APIs is to **hide the internal details of how a system works**, exposing only those parts a programmer will find useful and **keeping them consistent** even if the internal details later change.

An API may be custom-built for a particular pair of systems, or it may be a shared standard allowing interoperability among many systems.

The term API is often used to refer to web APIs, which allow communication between computers that are joined by the internet. There are also APIs for programming languages, software libraries, computer operating systems, and computer hardware.
<br />

# WEB APIs

> An API for either a web server or a web browser. It can be seen as a website that returns JSON instead of HTML

It is a web development concept, usually limited to a web application's client-side, and thus usually does not include web server or browser implementation details.

## Server side

> extends the functionality of a web server.

A server-side web API is a programmatic interface consisting of **one or more publicly exposed endpoints to a defined request–response message system**, typically expressed in JSON or XML, which is exposed via the web —most commonly by means of an HTTP-based web server.


## Client side

> extends the functionality of a web browser.

A client-side web API is a programmatic interface to **extend functionality within a web browser or other HTTP client**. Originally these were most commonly in the form of native plug-in browser extensions however most newer ones target standardized JavaScript bindings.

<br />

# JSON

> JSON (JavaScript Object Notation) is an **open standard file format** and **data interchange format** that uses human-readable text to store and transmit **data objects**.

JSON is a **language-independent** data format. It was derived from JavaScript, but many modern programming languages include code to generate and parse JSON-format data.

JSON filenames use the extension ```.json```.

## Synthax

JSON is built on two structures:
	-**A collection of name/value pairs**. In various languages, this is realized as an object, record, struct, dictionary, hash table, keyed list, or associative array.
	-**An ordered list of values**. In most languages, this is realized as an array, vector, list, or sequence.


``` json
{
  "id": 123,
  "name": "JSON T-Shirt",
  "price": 99.99,
  "tags": [ "Bar", "Eek" ],
  "stock": {
    "warehouse": 300,
    "retail": 20
  }
}
```

## Accessing data with Javascript

A **Fetch API** is a browser interface used for making **HTTP requests** and **retrieving data** from a server **asynchronously**.
Fetch provides a generic definition of **Request** and **Response** objects (and other things involved with network requests).

### Promise

> A Promise is a **proxy for a value not necessarily known when the promise is created**.

It allows you to **associate handlers with an asynchronous action's eventual success value or failure reason**. This lets asynchronous methods return values like synchronous methods: instead of immediately returning the final value, the asynchronous method returns a promise to supply the value at some point in the future.

A Promise is in one of these states:
	- **pending**: initial state, neither fulfilled nor rejected.
	- **fulfilled**: meaning that the operation was completed successfully.
	- **rejected**: meaning that the operation
*A promise is said to be settled (or resolved) if it is either fulfilled or rejected, but not pending.*

 When either of these options occur, the associated handlers queued up by a promise's then method are called. If the promise has already been fulfilled or rejected when a corresponding handler is attached, the handler will be called, so there is no race condition between an asynchronous operation completing and its handlers being attached.

### .fetch()

> ```.fetch``` is used for **making a request** and **fetching a resource**.

The ```fetch()``` method takes one mandatory argument, the **path to the resource** you want to fetch.
It **returns a Promise** that resolves to the Response to that request -as soon as the server responds with headers- even if the server response is an HTTP error status.

Once a Response is retrieved, there are a number of methods available to define what the body content is and how it should be handled.

### .then()

>  ```.then()``` takes as argument a callback that will be passed the resolved value of the Promise once it is fulfilled. It returns another pending Promise.

The ```.then()``` block is only ran if the Promise is **resolved**. 
```.then()``` blocks can be chained.

### .catch()

>  ```.catch()``` takes as argument a callback will be passed the rejection value of the Promise once it is rejected. It returns another pending Promise.

The ```.then()``` block is only ran if the Promise is **rejected**. 
If an Error is thrown in the ```.then()``` block, the code execution stops and the Error is forwarded to the closest ```.catch()``` block.

### .finally()

> ```finally()``` is used to do **final processing or cleanup** once the promise is settled, **regardless of its outcome**.

The ```finally()``` block always runs the last, regardless of the promise being resolved or rejected.


### .all()

> ```.all()```  takes an iterable of promises as an input, and returns a single Promise that resolves to an array of the results of the input promises.

This returned promise will **fulfill when all of the input's promises have fulfilled**, or if the input iterable contains no promises.
It **rejects immediately upon any of the input promises rejecting** or non-promises throwing an error, and will reject with this first rejection message/error. 

This method can be useful for **aggregating** the results of multiple promises. It is typically used when there are multiple related asynchronous tasks that the overall code relies on to work successfully -all of whom we want to fulfill before the code execution continues. 

``` javascript
Promise.all([promise1, promise2, promise3]).then((values) => {
  console.log(values);
});
```


