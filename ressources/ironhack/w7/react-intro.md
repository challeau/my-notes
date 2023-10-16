
# INTRO

## Definitions

> A **software framework** is a **universal, reusable software environment** used to facilitate the development of software applications, products, and solutions.
<br/>
A framework serves as a development environment and a set of tools and commonly includes:
- Support programs.
- Compilers/transpilers
- Code libraries (or packages).
- Toolsets.
- Predefined structure of the application (folder/file structure and configuration).
- Enforced set of rules and well-tested design principles that must be followed.
<br/>

> **React** is a **front-end JavaScript library** used to create front-end applications that run in the browser.
<br/>
React allows developers to create robust web applications that handle dynamic changes in the data without reloading the page. Besides Web apps, we can also use React for developing Android and iOS mobile apps. This is done through the cross-platform framework called React Native.
<br/>


## React advantages and features

- **Component-Based development**: React applications are built around components, which are smaller reusable pieces of UI that can have encapsulated states.
- **JSX**: a JavaScript **syntax extension** used to write **HTML and JavaScript** together. It speeds up and simplifies the creation of React apps and components.
- **Learn Once, Write Anywhere**: React can be used to **pre-render web pages** on the server with Node. 
- **Separation of concerns**: React enables a **clean, modular design** of the applications.
- **Speed**: React enables us to maintain a **clear project structure** which speeds up development.
- **Enforces Structure**: React enforces certain design patterns and project structure.
<br/>


# USING REACT

## Importing react

``` javascript
<!-- Load Babel - used to parse JSX -->
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<!-- React's core library-->
    <script crossorigin src="https://unpkg.com/react@17/umd/react.development.js"></script>
<!-- ReactDOM library renders the content created with React to the DOM. -->
	<script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
```

To add React to the HTML page like in the example above, we need to do the following:
- Create a DOM container in the HTML page `<div id="root"></div>`.
- Add React Scripts.
- Add Babel (to enable writting JSX).

The above setup is all that is needed! JSX content that is passed to the `ReactDOM.render()` method will be rendered to the DOM in the specified root div: `document.getElementById('root')`.

For example:

``` javascript
<body>
    <div id="root"></div>
 
    <script type="text/babel">
      ReactDOM.render(
        <div>
          <h1>Hello React!</h1>
          <p> React is a front-end JavaScript library </p>
        </div>,
        document.getElementById('root')
      )
    </script>
  </body>
```
<br/>


## Creating a component

> A component is a **class or function** that **returns JSX content**. 

Define and export a component like this (USE PASCAL CASE):
``` javascript
// src/components/MyButton.js

//as a class
class MyButton extends React.Component {
  render() {
    return ( /* HTML & JSX CONTENT */ );
  }
}

// as a function
function MyButton() {
  return ( /* HTML & JSX CONTENT */ );
}
 
export default MyButton;
```
Components defined as class currently provide more features than those defined as functions.<br/>
The only method you must define in a React.Component subclass is called render(). All the other methods described on this page are optional.


Import and use a component like this:
``` javascript
// App.js
 
import MyButton from './components/MyButton';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Headline />
 
      <MyButton />
 
    </div>
  );
}
```
<br/>


## React project setup

To set up a React project and the development environment from scratch you must install and configure the following:
- Supporting tools:
    - A **package manager** -->  Yarn or npm.
    - A **compiler**: used to convert JSX into JavaScript --> Babel.
    - A **bundler**: provide a **dev server** and live reloading during development. They also bundle and minify the code --> webpack or Parcel.
- React Core packages:
    - **React**: the core React library allowing us to work with JSX.
	- **ReactDOM**: library for rendering/displaying the React application in the DOM.


**Create React App** does that for us:
``` bash
$ npx create-react-app <app-name>
```

Inside the newly created project, you can run some built-in commands:

### `npm start` or `yarn start`:

**Runs the app in development mode**. <br/>
After running it, your app will launch on http://localhost:3000 and automatically reload if you make changes to the code.
<br/>


### `npm test` or `yarn test`

**Starts the test runner.**  <br/>
create-react-app now has built-in tools to start testing your app while you are developing it, and for this, by default, you can use Jest.
<br/>


### `npm run build` or `yarn build`

**Builds the app for production to the build folder**.<br/>
It correctly bundles React in production mode, which means creates a bunch of static files and optimizes the build for the best performance. After successfully running this command, your app is ready to be deployed.



