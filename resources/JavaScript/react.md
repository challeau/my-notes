
[//]: # (TITLE React)
[//]: # (ENDPOINT /react)

“’”

# React

React is an **unopinionated library** for **building user interfaces** based on **components**.

<!-- markdown-toc start - Don't edit this section. Run M-x markdown-toc-refresh-toc -->
##### Table of contents

- [1 - Components](#1---components)
    - [1.1 - Defining components](#11---defining-components)
    - [1.2 - Using components](#12---using-components)
    - [1.3 - Writing JSX](#13---writing-jsx)
    - [1.4 - Props](#14---props)
    - [1.5 - Conditional rendering](#15---conditional-rendering)
    - [1.6 - Rendering lists](#16---rendering-lists)
- [2 - Purity](#2---purity)
    - [2.1 - Local mutation](#21---local-mutation)
    - [2.2 - Side effects](#22---side-effects)
    - [2.3 - Strict mode](#23---strict-mode)
- [3 - The Render Tree](#3---the-render-tree)
- [4 - Interactivity](#4---interactivity)

<!-- markdown-toc end -->


## 1 - Components

**Components are independent and reusable UI elements.**

They're JavaScript functions that return markup.

### 1.1 - Defining components

**Components must be defined in JSX** and **in the global scope** (==you can't nest their definition).

**JSX** looks like HTML, but under the hood it is **compiled into plain JavaScript objects**. 

```jsx
// Step 1 - define the component
function Profile() {				// function name needs to be capitalized		
	return (
	<>								// must return a single root element
		<img src="xyz" alt="abc"/>
		<h1>Title<h1/>
	</>								// all tags must be closed
  );
}

// Step 2 - export
export default Profile;
```


### 1.2 - Using components

Use a component like an HTML tag with the component's name.

Just like with HTML tags, you can **compose, order and nest components** to design whole pages.

```jsx
import Profile from "./Profile"

function ParentComponent() {
	return (
		<>
			<Profile />		// component name is capitalized
		</>
	);
}
```


### 1.3 - Writing JSX

```jsx
// camelCase to replace dashes in HTML attributes + reserved words
<img className="avatar" src="abc" alt="xyz"/>

// use curly braces to use a variable
<img className="avatar" src={imgPath} alt="xyz"/>
<h1>{title}</h1>

// to pass a JS object, wrap it in another pair of curly braces
<ul style={{
	backgroundColor: 'black',
	color: 'pink'
}}>
</ul>

// ^ styles are passed as an object and written in camelCase
```


### 1.4 - Props

React components use props to communicate with each other. **Every parent component can pass some information to its child components by giving them props**. Props might remind you of HTML attributes, but you can pass any JavaScript value through them, including objects, arrays, and functions.

**Props are immutable**, but they **dynamically change** if the data in the parent is updated.

```jsx
// Step 1- declare props as arguments

// with the props object
function Profile(props) {
	let name = props.name;
	// ...
}

// destructured, supports defaults
function Profile({name, picture="default value"}) {
	// ...
}


// Step 2 - use them

// as is
function Profile({name}) {
	return (
		<Avatar name={name} />
	);
}

// spread
function Profile(props) {
	return (
		<Avatar {...props} />
	);
}

// nested
function Card({ children }) {
	return (
		<div className="card">
			{children}
		</div>
	);
}
```


### 1.5 - Conditional rendering

```jsx
// conditional return
function Item({ name, isPacked }) {
	if (isPacked) {
		return <li className="item">{name} ✔</li>;
	}
  
	return <li className="item">{name}</li>;
}

// ternary
function Item({ name, isPacked }) {
	return (
		<li className="item">
			{isPacked ? name + ' ✔' : name}
		</li>
	);
}

// &&
function Item({ name, isPacked }) {
	return (
		<li className="item">
			{name} {isPacked && '✔'}
		</li>
	);
}

// use a variable
function Item({ name, isPacked }) {
	let itemContent = isPacked ? name + '✔' : name;
	return (
		<li className="item">
			{itemContent}
		</li>
	);
}
```

These examples are equivalent: since JSX is compiled, the two `<li>` nodes of the first example won't be created in the DOM - only the one that is returned.

### 1.6 - Rendering lists

Use `map()` to render one HTML element per item in an array.

> JSX elements directly inside a `map()` call always need keys.

Keys must be unique and cannot change. They help JS associate a DOM element and an array item, and to update the DOM accordingly.

```jsx
// in a variable
function List({people}) {
	const listItems = people.map(person => <li key=person._id>{person}</li>);

	return <ul>{listItems}</ul>;
}

// in a block
function List({items}) {
	return (
		<ul>
			{
				items.map(item => <li key=item._id>{item}</li>)
			}
		</ul>
	);
}
```

> To display several elements per array item, use the `<Fragment>` component. `<Fragment>` lets you group elements without a wrapper node.

```jsx
// short syntax
<>...</>

// long syntax -- use when keys are needed
import { Fragment } from 'react';

const listItems = people.map(person =>
	<Fragment key={person._id}>
		<h1>{person.name}</h1>
		<p>{person.bio}</p>
	</Fragment>
);
```


## 2 - The Render Tree

React, and many other UI libraries, **model UI as a tree**. Thinking of your app as a tree is useful for understanding the relationship between components, and debug future concepts like performance and state management.

> A render tree represents **a single render pass of a React application**. With conditional rendering, a parent component may render different children depending on the data passed.

A render tree is composed of only React components (not HTML cause Reract is platform agnostic). The root node in a render tree is the `root` component of the app. Each arrow in the tree points from a parent component node to a child component node.

Although **render trees may differ across render passes**, these trees are generally helpful for identifying what the **top-level and leaf components** are in an app. **Top-level** components are the components **nearest to the root** component and **affect the rendering performance of all the components beneath them** and often contain the **most complexity**. **Leaf** components are **near the bottom** of the tree and have no child components and are often **frequently re-rendered**.


## 3 - Interactivity

In React, **data that changes over time is called state**. You can add state to any component, and update it as needed.


### 3.1 - Responding to events

Event handlers are **functions that React runs in response to some event**.

| Event type | Event                                    |
|------------|------------------------------------------|
| Mouse      | `onClick`<br>`onDrag`<br>`onDoubleClick` |
| Keyboard   | `onKeyDown`<br>`onKeyPress`<br>`onKeyUp` |
| Focus      | `onFocus`<br>`onBlur`                    |


#### 3.1.1 - Creating an event handler

To add an event handler, you will first define it as a function and then pass it as a prop to the appropriate JSX tag. For example, here is a button that shows a message when clicked:

```javascript
export default function Button() {

// 1 - define the event handler
function handleClick() {
    alert('You clicked me!');
  }

  return (
	// 2 - pass it as a prop to onClick
    <button onClick={handleClick}>
      Click me
    </button>
  );
}
```

By convention, it is common to name event handlers as `handle` followed by the event name. You'll often see `onClick={handleClick}`, `onMouseEnter={handleMouseEnter}`, and so on.

You can also define an event handler inline:

<div>

```javascript
<button onClick={function handleClick() {
  alert('You clicked me!');
}}>
```

```javascript
<button onClick={() => {
  alert('You clicked me!');
}}>
```

</div>

All these styles are equivalent, but pay attention to **pass the functions** and **not call them**: `<button onClick={handleClick}>`, NOT `<button onClick={handleClick()}>`. This is why you need to pass a short function like `alert()` through an arrow function.

#### 3.1.2 - About props

Because event handlers are **declared inside of a component**, they have **access to the component's props**. 

```javascript
function AlertButton({ message, children }) {
  return (
    <button onClick={() => alert(message)}>
      {children}
    </button>
  );
}

export default function Toolbar() {
  return (
    <div>
      <AlertButton message="Playing!">Play Movie</AlertButton>
      <AlertButton message="Uploading!">Upload Image</AlertButton>
    </div>
  );
}
```

Often you'll want the **parent** component to **specify a child's event handler**. To do this, pass a prop the component receives from its parent as the event handler like so:

```javascript
function Button({ onClick, children }) {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
}
```

By convention, event handler props should start with `on`, followed by a capital letter.

> If you use a **design system**, it's common for components like buttons to **contain styling but not specify behavior**. Instead, components will pass event handlers down.


### 3.2 - Event propagation

Event handlers will also **catch events from any children** your component might have. We say that an event "bubbles" or "propagates" up the tree: it starts with where the event happened, and then goes up the tree. All events propagate in React **except `onScroll`**, which only works on the JSX tag you attach it to.

Event handlers receive an event object as their only argument. By convention, it's usually called e, which stands for "event". You can use this object to read information about the event.

That event object also lets you stop the propagation. If you want to prevent an event from reaching parent components, you need to call `e.stopPropagation()` like this:

```javascript
function Button({ onClick, children }) {
  return (
    <button onClick={e => {
      e.stopPropagation();
      onClick();
    }}>
      {children}
    </button>
  );
}
```

In rare cases, you might need to **catch all events on child elements**, even if they stopped propagation. For example, maybe you want to log every click to analytics, regardless of the propagation logic. You can do this by **adding `Capture` at the end of the event name**:

```javascript
<div onClickCapture={() => { /* this runs first */ }}>
  <button onClick={e => e.stopPropagation()} />
  <button onClick={e => e.stopPropagation()} />
</div>
```

Each event propagates in three phases:
- It **travels down**, calling all `onClickCapture` handlers.
- It runs the **clicked** element’s `onClick` handler.
- It **travels upwards**, calling all `onClick` handlers.

Capture events are **useful for code like routers or analytics**, but you probably won’t use them in app code.

Some browser events have **default behavior** associated with them. For example, a `<form>` submit event, which happens when a button inside of it is clicked, will reload the whole page by default. 
You can call `e.preventDefault()` on the event object to **stop** this from happening.


## X - Purity

> **React's rendering process must always be pure**: components should only return their JSX. 

Changing a variable that existed before rendering (mutation) makes a function impure.

In React there are three kinds of inputs that you can read while rendering: `props`, `state`, and `context`. You should always treat these inputs as read-only.

Writing pure functions unlocks marvelous opportunities:
- Your **components could run in a different environment** - for example, on the server! Since they return the same result for the same inputs (deterministic), one component can serve many user requests.
- You can **improve performance by skipping rendering components whose inputs have not changed**. This is safe because **pure functions are safe to cache**.
- If some data changes in the middle of rendering a deep component tree, React can **restart rendering without wasting time to finish the outdated render**. **Purity** makes it **safe to stop calculating** at any time.


### X.1 - Local mutation

While it's impure to change objects that were created before the call, it's completely fine to change variables that were **created during the same render**. This is called a **"local mutation"**.

<div>

```javscript
// BAD --> modification of a varirable declared
//         outside of the componenet's scope

let guest = 0;

function Cup() {
  guest = guest + 1;  // BAD HERE
  return <h2>Tea cup for guest #{guest}</h2>;
}

export default function TeaSet() {
  return (
    <>
      <Cup />
      <Cup />
      <Cup />
    </>
  );
}
```

```javascript
// GOOD --> the variables are created at render
function Cup({ guest }) {
  return <h2>Tea cup for guest #{guest}</h2>;
}

export default function TeaGathering() {
  let cups = [];
  for (let i = 1; i <= 12; i++) {
    cups.push(<Cup key={i} guest={i} />);
  }
  return cups;
}
```

</div>

### X.2 - Side effects

Any change to the DOM tree happen **on the side of rendering** - so they're called side effects. When you want to **change something in response to user input**, you should **set state** instead of writing to a variable. 

In React, side effects usually belong inside **event handlers**. Even though event handlers are defined inside your component, they **don't run during rendering** so they don't need to be pure.

If you've exhausted all other options and can't find the right event handler for your side effect, you can still attach it to your returned JSX with a `useEffect` call in your component. This tells React to **execute it after rendering**, when side effects are allowed. However, this approach should be your **last resort**.


### X.3 - Strict mode

React offers a **"Strict Mode"** in which it calls each component's function twice during development. **By calling the component functions twice, Strict Mode helps find components that break these rules.**

Strict Mode has **no effect in production**, so it won't slow down the app for your users. To opt into Strict Mode, you can wrap your root component into `<React.StrictMode>`. Some frameworks do this by default.

