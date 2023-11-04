
[//]: # (TITLE JS basics)
[//]: # (ENDPOINT /js)

# ESSENTIAL JAVASCRIPT

JavaScript (JS) is a **lightweight**, **interpreted**, **dynamic** programming language. 

While it is most well-known as the **scripting language** for Web pages, many non-browser environments also use it, such as Node.js, Apache CouchDB and Adobe Acrobat.

JavaScript supports object-oriented, imperative, and declarative styles.


<!-- markdown-toc start - Don't edit this section. Run M-x markdown-toc-refresh-toc -->
**Table of Contents**

- [1 - Functions](#1---functions)
    - [1.1 Function declaration](#11-function-declaration)
    - [1.2 Function expression](#12-function-expression)
- [2 - Arguments and parameters](#2---arguments-and-parameters)
    - [2.1 Parameters](#21-parameters)
    - [2.2 The `arguments` object](#22-the-arguments-object)
    - [2.3 Destructuring](#23-destructuring)
    - [2.4 Call-by-sharing](#24-call-by-sharing)
- [3 - Arrow functions](#3---arrow-functions)
- [4 - Closures](#4---closures)
- [5 - Modules](#5---modules)
    - [5.1 Exporting](#51-exporting)
    - [5.2 Importing](#52-importing)
    - [5.3 Top level await](#53-top-level-await)
- [4 - Quirks](#4---quirks)
    - [4.1 Hoisting](#41-hoisting)
    - [4.2 Interpreted or compiled?](#42-interpreted-or-compiled)
        - [Compilation:](#compilation)
        - [Interpretation:](#interpretation)
        - [JIT compilation:](#jit-compilation)

<!-- markdown-toc end -->


## 1 - Functions

> Sets of statements that perform a task or calculate a value. In JS they are objects with methods such as `apply()` and `call()`.

Functions that are properties of an object are called **methods**.

### 1.1 Function declaration
```javascript
function square(num) {
	let result = num * num;
	
	return result;
}
```
Functions that are **declared** are **hoisted** by the interpreter.


### 1.2 Function expression

```javascript
// anonymous
const square = function (num) {
	return num * num;
};

// nonymous --> useful for recursion
const factorial = function fac(num) {
	if (num < 2)
		return 1;
	return n * fac(n - 1);
};
```
They are convinient to pass functions to other functions.


## 2 - Arguments and parameters

Parameter: a variable in the function definition - placeholder that holds no value.
Argument: value of the variable that gets passed to a function when it's called.

### 2.1 Parameters

There are two special kinds of parameter syntax: *default parameters* and *rest parameters*.

```javascript
// DEFAULT PARAMETER b
function multiply(a, b = 1) {
  return a * b;
}

console.log(multiply(5));	// 5


// REST PARAMETER ...theArgs
function multiply(multiplier, ...theArgs) {
  return theArgs.map((x) => multiplier * x);
}

const arr = multiply(2, 1, 2, 3);
console.log(arr);		// [2, 4, 6]
```


### 2.2 The `arguments` object

The arguments of a function are maintained in an array-*like* object. Within a function, you can address the arguments passed to it as follows: `arguments[i];`.

Using the arguments object, you can **call a function with more arguments than it is formally declared** to accept. You can use `arguments.length` to determine the number of arguments actually passed to the function, and then access each argument using the `arguments` object.


### 2.3 Destructuring

> The **destructuring assignment syntax** is an expression that makes it possible to **unpack values from arrays, or properties from objects, into distinct variables**.

```javascript
const x = [1, 2, 3, 4, 5];
const [y, z, ..rest] = x;

console.log(y);		// 1
console.log(z);		// 2
console.log(rest);	// [3, 4, 5]

const obj = { a: 1, b: 2 };
const { a, b } = obj;

console.log(a);		// 1, == obj.a
console.log(b);		// 2, == obj.b
```

**Each destructured property can have a default value**. The default value is used when the property is not present, or has value `undefined`. It is not used if the property has value `null`.

```javascript
const [a = 1] = [];						// a is 1
const { b = 2 } = { b: undefined };		// b is 2
const { c = 2 } = { c: null };			// c is null
```

The default value can be any expression. It will only be evaluated when necessary.

```javascript
const { b = console.log("won't log") } = { b: 2 };				// doesn't log anything --> b is defined.

const { c = console.log("will log") } = { c: undefined };		// logs --> c is undefined.
```


### 2.4 Call-by-sharing

> Javascript is a call-by-sharing language.

Call by sharing implies that **values are based on objects rather than primitive types**: all values are "boxed". Because they are boxed they can be said to **pass by copy of reference** (where primitives are boxed before passing and unboxed at called function). 
<span style="font-size:0.5em;font-color:#D3D3D3">Other types: pass-by-reference, pass-by-value.</span>

A change made to an argument from inside a function won't be visible if said change is a re-assignment.

```javascript
function changeStuff(a, b, c, d)
{
	a = a * 10;				// re-assignment 
	b.item = "changed";		// internal change
	c = {item: "changed"};	// re-assignment
}

var num = 10;
var obj1 = {item: "unchanged"};
var obj2 = {item: "unchanged"};

changeStuff(num, obj1, obj2);

console.log(num);			// 10
console.log(obj1.item);		// {item: "changed"}
console.log(obj2.item);		// {item: "unchanged"}
```
> Changes to an argument don't persist, but changes to an object's properties persist.


## 3 - Arrow functions

> An arrow function expression is a **compact alternative to a traditional function expression**.

Arrow functions have some semantic differences and deliberate limitations in usage:
* They **don't have their own bindings** to `this`, `arguments`, or `super`, and should not be used as methods.
* They **cannot be used as constructors**. Calling them with `new` throws a `TypeError`. They also don't have access to the `new.target` keyword.
* They **cannot use `yield`** within their body and **cannot be created as generator** functions.

Syntax:
```javascript
() => expression

param => expression

(param1, paramN) => expression

() => {
  statements
}

param => {
  statements
}

(param1, paramN) => {
	statements
}
```

They are **always anonymous** and **support rest parameters, default parameters, and destructuring within params**. They can be **asynchrnous**.


## 4 - Closures

> All functions in JavaScript form closures. A closure is the **combination of a function and the lexical environment** within which that function was declared.

An inner functions has access to the data defined in the outer function, but an outer function doesn't have access to the data defined in an inner function. This provides a sort of **encapsulation** for the variables of the inner function.

```javascript
function makeAdder(x) {
  return function (y) {
    return x + y;
  };
}

const add5 = makeAdder(5);
const add10 = makeAdder(10);

console.log(add5(2));	// 7
console.log(add10(2));	// 12
```
`add5` and `add10` both share the same function body definition, but store different lexical environments. In `add5`'s lexical environment, `x` is 5, while in the lexical environment for `add10`, `x` is 10.

In this example we created a function factory. A **factory is a function that returns a new object**. Here, the factory returns a new function object.

Closures are useful because they let you **associate data (the lexical environment) with a function that operates on that data**.

Consequently, **you can use a closure anywhere that you might normally use an object with only a single method**.

```html
<button id="size-12">12</button>
<button id="size-14">14</button>
<button id="size-16">16</button>
```

```javascript
function makeSizer(size) {
  return function () {
    document.body.style.fontSize = `${size}px`;
  };
}

const size12 = makeSizer(12);
const size14 = makeSizer(14);
const size16 = makeSizer(16);

document.getElementById("size-12").onclick = size12;
document.getElementById("size-14").onclick = size14;
document.getElementById("size-16").onclick = size16;
```


## 5 - Modules

>  Javascript file that has been structured into a smaller, more manageable file size. They are used to create more cleanly separated and reusable modular pieces of code, which can be exported and imported into other modules 

JavaScript projects have increased in size, from scripting to complete web apps. It has therefore made sense in recent years to start thinking about providing **mechanisms for splitting JavaScript programs up into separate modules that can be imported when needed**.

Modern browsers have started to support module functionality natively. They can optimize loading of modules, making it more efficient than having to use a library and do all of that extra client-side processing and extra round trips.

*Scripts are intended to be run directly, whereas modules are meant to be imported.*

### 5.1 Exporting

The first thing you do to get access to module features is export them. This is done using the `export` statement.

```javascript
// NAMED EXPORTS
export const name = "name";			// you can export any object, variable, or class.

export function func(args) {
	// statements
}

export { name, func };				// or you can group the exports.

// DEFAULT EXPORTS
function anotherFunc(args) {
	// statements
}

export default anotherFunc;			// no curly brackets for the default

export default function (arg) {		// you can export an anonymous function
	// statements
}
```

### 5.2 Importing

Once you've exported some features out of your module, you need to import them into your script to be able to use them. 

Import declarations are hoisted.

```javascript
// NAMED IMPORT
import { name, func as nickname } from "./modules/file.js";

// DEFAULT IMPORT
import func from "./modules/file.js";		// no curly brackets for the default, equivalent to ↓

import { default as func } from "./modules/file.js";
```


### 5.3 Top level await

Top level await is a feature available within modules. This means the `await` keyword can be used. 

> It allows modules to act as big asynchronous functions, meaning code can be evaluated before use in parent modules, but without blocking sibling modules from loading.

```javascript
const colors = fetch("../data/colors.json").then((response) => response.json());

export default await colors;
```

We're using the keyword await before specifying the constant colors to export. This means **any other modules which include this one will wait until colors has been downloaded and parsed before using it**.


## 4 - Quirks

### 4.1 Hoisting


> Hoisting refers to the process whereby the **interpreter** appears to **move the declaration** of functions, variables, classes, or imports to the **top of their scope**, **prior to execution** of the code.

The following behaviors can be regarded as hoisting:

|                      |                                                                                                                                                       |
|----------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|
| Value hoisting       | Being able to use a variable's value in its scope before the line it's declared.                                                                      |
| Declaration hoisting | Being able to reference a variable in its scope before the line it is declared, without throwing a ReferenceError, but the value is always undefined. |
|                      | The declaration of the variable causes behavior changes in its scope before the line in which it is declared.                                         |
|                      | The side effects of a declaration are produced before evaluating the rest of the code that contains it.                                               |


### 4.2 Interpreted or compiled?

#### Compilation:

Passing code to a compiler which translated it into bytecode (binaries), which is then **executed by the machine**.

Source code --> COMPILER --> machine code --> output.

Compilation takes longer to start up but it's more efficient (optimized and loops are only translated once).


#### Interpretation:

The code is read, translated, and **executed by another program** than the machine (interpreter).

Source code --> INTERPRETER --> output.

Interpretation is faster to start up but it's inefficient.


#### JIT compilation:

Modern JS engines use JIT compilation to speed up the interpretation. 

> JIT compilation is the compilation of code at run-time, instead of prior to execution (AOT).

The engine uses a **monitor** or **profiler**, which watches the code as it runs, and makes a note of how many times it is run and what types are used.

1. The monitor runs everything through the interpreter. <br> If the same lines of code are run a few times, that segment of code is called warm. If it’s run a lot, then it’s called hot.
2. When a function starts getting warm, the JIT will send it off to the baseline compiler and store the result of that compilation. Each line of the function is compiled to a “stub”. The stubs are indexed by line number and variable type.
3. If the monitor sees that execution is hitting the same code again with the same variable types, it will just pull out its compiled version.
4. According to how warm the code is, the baseline compiler will also make optimizations.
5. When a part of the code is very hot, the monitor will send it off to the optimizing compiler. This will create another, even faster, version of the function that will also be stored.
