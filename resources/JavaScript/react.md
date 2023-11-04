
[//]: # (TITLE React)
[//]: # (ENDPOINT /react)

# REACT

React is an **unopinionated library** for **building user interfaces** based on **components**.

<!-- markdown-toc start - Don't edit this section. Run M-x markdown-toc-refresh-toc -->
**Table of Contents**

- [1 - Components](#1---components)
    - [1.1 - Defining components](#11---defining-components)
    - [1.2 - Using components](#12---using-components)
    - [1.3 - Writing JSX](#13---writing-jsx)
    - [1.4 - Props](#14---props)
    - [1.5 - Conditional rendering](#15---conditional-rendering)
    - [1.6 - Rendering lists](#16---rendering-lists)
    - [1.7 - Purity](#17---purity)

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


### 1.7 - Purity

> **React’s rendering process must always be pure**. Components should only return their JSX, and not change any objects or variables that existed before rendering—that would make them impure.

**Pure functions only perform a calculation** and nothing more. 

In React there are three kinds of inputs that you can read while rendering: `props`, `state`, and `context`. You should always treat these inputs as read-only.

When you want to **change something in response to user input**, you should **set state** instead of writing to a variable. You should **never change pre-existing variables** or objects while your component is rendering.

React offers a **"Strict Mode"** in which it calls each component’s function twice during development. **By calling the component functions twice, Strict Mode helps find components that break these rules.**


Writing pure functions unlocks marvelous opportunities:
- Your **components could run in a different environment** - for example, on the server! Since they return the same result for the same inputs (deterministic), one component can serve many user requests.
- You can **improve performance by skipping rendering components whose inputs have not changed**. This is safe because **pure functions are safe to cache**.
- If some data changes in the middle of rendering a deep component tree, React can **restart rendering without wasting time to finish the outdated render**. **Purity** makes it **safe to stop calculating** at any time.

