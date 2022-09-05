
# DEFINITIONS

> An async function is a function declared with the ```async``` keyword, and the ```await``` keyword is permitted within it.

The ```async``` and ```await``` keywords enable asynchronous, promise-based behavior to be written in a cleaner style, avoiding the need to explicitly configure promise chains.

Async functions may also be defined as expressions.

## ASYNC

Synthax:
``` javascript
async function name(param0, ..., paramN) {
  statements
}
```

Async functions **always return a promise**. If the return value of an async function is not explicitly a promise, it will be implicitly **wrapped** in a promise.

Even though the return value of an async function behaves as if it's wrapped in a ```Promise.resolve```, they are not equivalent. An async function will return a **different reference**, whereas ```Promise.resolve``` returns the same reference if the given value is a promise. It can be a problem when you want to check the equality of a promise and a return value of an async function.

``` javascript
async function foo1() {
  return 1;
}

// is similar to:

function foo2() {
  return Promise.resolve(1);
}

// but if the value is a promise:
const p = new Promise((res, rej) => {
  res(1);
});

async function asyncReturn() {
  return p;
}

function basicReturn() {
  return Promise.resolve(p);
}

console.log(p === basicReturn()); // true
console.log(p === asyncReturn()); // false
```

## AWAIT

Async functions can contain zero or more ```await``` expressions. Await expressions make promise-returning functions behave **as though they're synchronous** by **suspending execution** until the returned promise is fulfilled or rejected.
The resolved value of the promise is treated as the return value of the await expression. 

Code after each await expression can be thought of as existing in a ```.then``` callback. In this way a promise chain is progressively constructed with each reentrant step through the function. The return value forms the final link in the chain. 


The body of an async function can be thought of as being split by zero or more await expressions. Top-level code, up to and including the first await expression (if there is one), is run synchronously. In this way, an async function without an await expression will run synchronously. If there is an await expression inside the function body, however, the async function will always complete asynchronously. 
<br />

# ERROR HANDLING

In async functions, rejected Promises and Errors are handled by using the ```try...catch``` block.
	- The try block is where we execute the code.
	- The catch block is used for handling Errors and rejections.
	

``` javascript
async function foo() {
  try {
    await bar(0);
    await bar(1);
    await bar(2);
    await bar(3);
  } catch(err) {
    console.log(err)
  }
}
```

The ```try``` block is used to execute the code and await for the Promises to resolve. If an awaited Promise gets rejected or if an error is thrown, the execution of the code in the try block stops and the catch block takes over.

The catch(error){} block in the async functions has the same purpose as the .catch() block chained to a Promise.
<br />

# USING FETCH

The use of ```.fetch()``` is permitted with await since it returns a Promise.

``` javascript
async function foo() {
  try {
    const response = await fetch("https://some.api");
    const jsonResponse = await response.json();
	// do something with it
  } catch (err) {
    // handle error or a rejected Promise
  }
}
```
<br />

## Accessing properties on an awaited Promise

The values of asynchronous calls aren't immediately available. It's necessary to await for the Promise to resolve before trying to access its properties.

``` javascript
// do this:
const response = await fetch("https://some.api");
const responseJson = await response.json();
const firstObj = responseJson[0];

// instead of this:
const response = await fetch("https://some.api");
const firstObj = await response.json()[0];
```
