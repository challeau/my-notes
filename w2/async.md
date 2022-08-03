
# INTRO

JavaScript, at its core, is a **single-threaded** and **synchronous** language, but it can have asynchronous behaviors.
Many functions are provided by JavaScript host environments that allow you to **schedule asynchronous actions**. In other words, actions that we initiate now, but they finish later.

Asynchronous programming helps to avoid performance bottlenecks and enhance the responsiveness of applications. It is especially useful to execute other functions while a function thats is costly or unpredicatable finishes.

# ASYNC METHODS AND CALLBACKS

JavaScript provides two important _async methods: **setTimeout()** and **setInterval()**.

## setTimeout() and clearTimeout()

> **setTimeout()** sets a timer that executes a callback function once the timer expires.<br>**clearTimeout()** cancels a timeout previously established by calling **setTimeout()**. 

Synthax:
```
const timeoutId = setTimeout(callbackFunction [, 'delay]);
clearTimeout(timeoutId);
```

**setTimeout()** returns an ID in the form of a *Timeout instance* in node, or an *integer* in web.
This means that the code below works in a browser or in node, even though timeout will be a different type depending on the environment:
```
const timeout = setTimeout(() => console.log('FINISHED'), 10000);
setTimeout(() => clearTimeout(timeout), 9000);
```



## setInterval() and clearInterval()

> **setInterval()** calls a function repeatedly with a fixed delayed time between each call.<br> **clearInterval()** cancels a timed, repeating action which was previously established by a call to **setInterval()**.

Syntax:
```
const intervalId = setInterval(callbackFunction, delay);
clearInterval(intervalId);
```
The return value of **setIterval()** is the same as **setTimeout()**.

