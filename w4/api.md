
# DEFINITION

>  An Application Programming Interface or API is a **software intermediary** that allows two applications to talk to each other. An API simplifies programming by **abstracting the underlying implementation** and only exposing objects or actions the developer needs.

In contrast to a user interface, which connects a computer to a person, an application programming interface **connects computers or pieces of software to each other**. It is not intended to be used directly by a person (the end user) other than a computer programmer who is incorporating it into the software.

An API is often made up of different parts which act as tools or services that are available to the programmer. The calls that make up the API are also known as **subroutines**, **methods**, **requests**, or **endpoints**. An **API specification** defines these calls: it explains how to use or implement them.

One purpose of APIs is to **hide the internal details of how a system works**, exposing only those parts a programmer will find useful and **keeping them consistent** even if the internal details later change.

An API may be custom-built for a particular pair of systems, or it may be a shared standard allowing interoperability among many systems.

The term API is often used to refer to web APIs, which allow communication between computers that are joined by the internet. There are also APIs for programming languages, software libraries, computer operating systems, and computer hardware.

# WEB APIs
> An API for either a web server or a web browser. It can be seen as a website that returns JSON instead of HTML

It is a web development concept, usually limited to a web application's client-side, and thus usually does not include web server or browser implementation details.

## Server side
A server-side web API is a programmatic interface consisting of **one or more publicly exposed endpoints to a defined request–response message system**, typically expressed in JSON or XML, which is exposed via the web —most commonly by means of an HTTP-based web server.
> extend the functionality of a web server.

## Client side
A client-side web API is a programmatic interface to **extend functionality within a web browser or other HTTP client**. Originally these were most commonly in the form of native plug-in browser extensions however most newer ones target standardized JavaScript bindings.
> extends the functionality of a web browser.

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


