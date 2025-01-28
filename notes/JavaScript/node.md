[//]: # (TITLE Node.js)
[//]: # (ENDPOINT /node)
[//]: # (PRIORITY 420)

# Node.js

> Node.js is an **open-source** and cross-platform **JavaScript runtime environment**.

Node.js runs the V8 JavaScript engine outside of the browser. This allows Node.js to be very performant.

A Node.js app runs in a **single process**, without creating a new thread for every request. Node.js provides a **set of asynchronous I/O primitives** in its standard library that prevent JavaScript code from blocking and generally, libraries in Node.js are **written using non-blocking paradigms**, making blocking behavior the exception rather than the norm.

When Node.js performs an I/O operation, like reading from the network, accessing a database or the filesystem, **instead of blocking the thread and wasting CPU cycles waiting, Node.js will resume the operations when the response comes back**.

This allows Node.js to **handle thousands of concurrent connections with a single server** without introducing the burden of managing thread concurrency, which could be a significant source of bugs.

<!-- markdown-toc start - Don't edit this section. Run M-x markdown-toc-refresh-toc -->
##### Table of contents

- [Node.js](#nodejs)
        - [Table of contents](#table-of-contents)
    - [1 - Prerequisites](#1---prerequisites)
        - [1.1 - Differences between Node.js and the browser.](#11---differences-between-nodejs-and-the-browser)
        - [1.2 - The V8 JavaScript Engine](#12---the-v8-javascript-engine)
        - [1.3 - Installation](#13---installation)
        - [1.4 `npm`](#14-npm)
    - [2 - Asynchronous work](#2---asynchronous-work)
    - [3 - Manipulating files](#3---manipulating-files)
    - [4 - Command Line](#4---command-line)
    - [Sources](#sources)

<!-- markdown-toc end -->

## 1 - Prerequisites

### 1.1 - Differences between Node.js and the browser.

The main differnce is the **ecosystem**.

Node.js does not have access to the objects provided by the browser like `document` or `window`, but it **provides useful APIs through its modules**, like the filesystem access functionality.

Node.js **controls the environment** where the code is executed: unlike with browsers, you are in charge of deciding **which ECMAScript version to use** by changing the Node.js version, and you can also enable specific experimental features by running Node.js with flags.

Node.js also **supports both the CommonJS and ES module systems**, while in the browser we are starting to see the ES Modules standard being implemented. In practice, this means that you can use both `require()` and `import` in Node.js, while you are limited to import in the browser.

### 1.2 - The V8 JavaScript Engine

V8 is Google's **open-source, high-performance JavaScript and WebAssembly engine**, written in C++. It **implements ECMAScript and WebAssembly**. V8 can run standalone, or can be embedded into any C++ application. It's **independent of the browser** in which it's hosted. 

V8 **compiles and executes JavaScript** source code, **handles memory allocation** for objects, and **garbage collects** objects it no longer needs. V8's stop-the-world, generational, accurate garbage collector is one of the keys to V8's performance.

JavaScript is internally compiled by V8 with **just-in-time (JIT) compilation** to **speed up the execution**, making it much more performant than just an interpreter.

### 1.3 - Installation

For ubuntu:

```bash
sudo apt install nodejs npm
```

If you don't have access to the `node` executable in the commandline, try adding these links:

``` bash
sudo ln -s /usr/bin/nodejs /usr/local/bin/node
sudo ln -s /usr/bin/npm /usr/local/bin/npm
```

For other distros: see [here](https://nodejs.org/en/download/package-manager).

### 1.4 `npm`

> `npm` is the standard package manager for Node.js.

It started as a way to **download and manage dependencies** of Node.js packages, but it has since become a tool used also in frontend JavaScript.

Usually, dependencies are kept in a `package.json` file: it **lists the dependencies** of your project, **specifies the versions** of the packages, and **makes your build reproducible**.

To generate `package.json`:

``` bash
npm init

# to use defaults and directory infos:
npm init -y
```

With a `package.json` file at the root of the project, you can **install all dependencies at once** by running:

``` bash
npm install
```

To **install a single package** and add it to the dependencies in the `package.json` file, run:

``` bash
npm install <package_name>
```

To update the dependencies, run: 

```bash
npm update

# or
npm update <package_name>
```

The `package.json` file support a format for specifying command line tasks. For example:

``` json
{
  "scripts": {
    "start-dev": "node lib/server-development",
    "start": "node lib/server-production"
  }
}
```

To run one of these, use:

``` bash
npm run <task_name>
```

## 2 - Asynchronous work

## 3 - Manipulating files

## 4 - Command Line

## Sources

- [Node official doc](https://nodejs.org/en/learn/getting-started/introduction-to-nodejs).
- [V8 doc](https://v8.dev/docs).
