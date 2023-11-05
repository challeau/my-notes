
[//]: # (TITLE Angular)
[//]: # (ENDPOINT /angular)

# ANGULAR - Getting Started

> Angular is a development platform built on TypeScript.

As a platform, Angular includes:
- A component-based framework for building scalable web applications,
- A collection of well-integrated libraries that cover a wide variety of features, including routing, forms management, client-server communication, and more,
- A suite of developer tools to help you develop, build, test, and update your code.

<!-- markdown-toc start - Don't edit this section. Run M-x markdown-toc-refresh-toc -->
##### Table of contents

- [1 - CLI installation](#1---cli-installation)
- [2 - Components](#2---components)
- [3 - Templates](#3---templates)
    - [3.1 Interpolate contents --> `{{ }}`](#31-interpolate-contents-----)
    - [3.2 Property binding --> `[ ]`](#32-property-binding-----)
    - [3.3 Event listeners --> `( )`](#33-event-listeners-----)
    - [3.4 Directives](#34-directives)
- [4 - Passing data](#4---passing-data)
    - [4.1 Passing down: `@Input()`](#41-passing-down-input)
    - [4.1.1. Child configuration](#411-child-configuration)
        - [4.1.2 Parent configuration](#412-parent-configuration)
    - [4.2 Passing up: `@Output()`](#42-passing-up-output)
        - [4.2.1 Child configuration](#421-child-configuration)
        - [4.2.2 Parent configuration](#422-parent-configuration)
- [5 - Navigation](#5---navigation)
    - [5.1 Imports](#51-imports)
    - [5.2 Define a basic route](#52-define-a-basic-route)
    - [5.3 Route order](#53-route-order)
    - [5.4 Getting route information](#54-getting-route-information)
    - [5.5 Redirects](#55-redirects)
    - [5.6 Nesting routes](#56-nesting-routes)
- [6 - Dependency Injetion: services](#6---dependency-injetion-services)
- [7 - Forms](#7---forms)
    - [7.1 Chosing an apporach ](#71-chosing-an-apporach)
        - [7.1.1 Key advantages](#711-key-advantages)
        - [7.1.2 Key differences](#712-key-differences)
        - [7.1.3 Scalability](#713-scalability)
    - [7.2 Setting up the form model](#72-setting-up-the-form-model)
        - [7.2.1 Common form foundation classes](#721-common-form-foundation-classes)
    - [7.2.2. In reactive forms](#722-in-reactive-forms)
        - [7.2.3 In template-driven forms](#723-in-template-driven-forms)
    - [7.3 Data flow in forms](#73-data-flow-in-forms)
    - [7.4 Form validation](#74-form-validation)
    - [7.5 `FormBuilder`](#75-formbuilder)
        - [7.5.1 Specs](#751-specs)
        - [7.5.2 Usage:](#752-usage)
- [Deploy](#deploy)

<!-- markdown-toc end -->


## 1 - CLI installation

> **Requirements**: node.js, npm.

Install:
```commandline
npm install -g @angular/cli
```

Create a workspace:
```commandline
ng new my-app
```
The `ng new` command prompts you for information about features to include in the initial app. Accept the defaults by pressing the Enter or Return key.

The Angular CLI includes a server, for you to build and serve your app locally. From the project directory, run:
```commandline
ng serve --open
```

<br/>

## 2 - Components

Components define areas of responsibility in the UI that let you reuse sets of UI functionality.
Angular's component model offers strong encapsulation and an intuitive application structure.

A component includes a TypeScript class with a `@Component()` decorator, an HTML template, and styles.

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'hello-world',
  template: `
    <h2>Hello World</h2>
    <p>This is my first component!</p>
  `
})
export class HelloWorldComponent {
  // The code in this class drives the component's behavior.
```

To use this component, you write the following in a template:
```html
<hello-world></hello-world>
```

To automatically generate a component, run:

````commandline
ng generate component <name>
````

This generator creates starter files for the three parts of the component: `name.component.ts`, `name.component.html`, and `name.component.css`.

It also adds it to the `AppModule` file to make it accessible from other components of the application.



## 3 - Templates

Every component has an HTML template that declares how that component renders. You define this template either inline or by file path.


### 3.1 Interpolate contents --> `{{ }}`

Example template:
```html
<!-- hello-world-interpolation.component.html -->
<p>{{ message }}</p>
```

The value for `message` comes from the component class:
```typescript
import { Component } from '@angular/core';

@Component ({
  selector: 'hello-world-interpolation',
  templateUrl: './hello-world-interpolation.component.html'
})
export class HelloWorldInterpolationComponent {
    message = 'Hello, World!';
}
```

### 3.2 Property binding --> `[ ]`

Set values for properties and attributes of HTML elements and pass values to your application's presentation logic:

```html
<p [id]="sayHelloId" [style.color]="fontColor">
  You can set my color in the component!
</p>
```
A template expression should result in the type of value that the target property expects. For example:

In the component:
```typescript
// xx.component.ts
@Input() childItem = '';    // a string is expected
```

In the template:
```html
<!-- xx.component.html -->
<!-- parentItem needs to be a string -->
<app-item-detail [childItem]="parentItem"></app-item-detail>
```

Evaluation of a template expression should have no visible side effects. 

If you had an expression that changed the value of something else that you were binding to, that change of value would be a side effect. Angular might or might not display the changed value. If Angular does detect the change, it throws an error.

As a best practice, use only properties and methods that return values.


### 3.3 Event listeners --> `( )`

Declare event listeners to listen for and respond to user actions by specifying the event name in parentheses:
```html
content_copy
<button type="button" [disabled]="canClick" (click)="sayMessage()">
  Trigger alert message
</button>
```



The following is a combined example of Interpolation, Property Binding, and Event Binding within an Angular template:

Component:
```typescript
// hello-world-bindings.component.ts
import { Component } from '@angular/core';

@Component ({
  selector: 'hello-world-bindings',
  templateUrl: './hello-world-bindings.component.html'
})
export class HelloWorldBindingsComponent {
  fontColor = 'blue';
  sayHelloId = 1;
  canClick = false;
  message = 'Hello, World';

  sayMessage() {
    alert(this.message);
  }
}
```

Template:
```html
<!-- hello-world-bindings.component.html -->
<button
  type="button"
  [disabled]="canClick"
  (click)="sayMessage()">
  Trigger alert message
</button>

<p
  [id]="sayHelloId"
  [style.color]="fontColor">
  You can set my color in the component!
</p>

<p>My color is {{ fontColor }}</p>
```

### 3.4 Directives

Add features to your templates by using directives. The most popular directives in Angular are `*ngIf` and `*ngFor`. Use directives to perform a variety of tasks, such as dynamically modifying the DOM structure. 

Component:
```typescript
// hello-world-ngif.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'hello-world-ngif',
  templateUrl: './hello-world-ngif.component.html'
})
export class HelloWorldNgIfComponent {
  message = "I'm read only!";
  canEdit = false;

  onEditClick() {
    this.canEdit = !this.canEdit;
    if (this.canEdit) {
      this.message = 'You can edit me!';
    } else {
      this.message = "I'm read only!";
    }
  }
}
```

Template:
```html
<!-- hello-world-ngif.component.html -->
<h2>Hello World: ngIf!</h2>

<button type="button" (click)="onEditClick()">Make text editable!</button>

<div *ngIf="canEdit; else noEdit">
    <p>You can edit the following paragraph.</p>
</div>

<ng-template #noEdit>
    <p>The following paragraph is read only. Try clicking the button!</p>
</ng-template>

<p [contentEditable]="canEdit">{{ message }}</p>
```



## 4 - Passing data

Consider the following hierarchy:

```html
<parent-component>
  <child-component></child-component>
</parent-component>
```

The `<parent-component>` serves as the context for the `<child-component>`.

`@Input()` and `@Output()` give a child component a way to communicate with its parent component. `@Input()` lets a parent component update data in the child component. Conversely, `@Output()` lets the child send data to a parent component.

### 4.1 Passing down: `@Input()`

The `@Input()` decorator in a child component or directive signifies that the property can receive its value from its parent component.

To use `@Input()`, you must configure the parent and child.

### 4.1.1. Child configuration

Component:
```typescript
// child-item-input.component.ts
import { Component, Input } from '@angular/core';       // import the decorator

export class ItemDetailComponent {
  @Input() item = '';                                   // decorate the property with @Input()
}
```

Template:
```html
<!-- child-item-input.component.html -->
<p>
  Today's item: {{item}}
</p>
```



#### 4.1.2 Parent configuration

The next step is to bind the property in the parent component's template:
- Use the child's selector, here `<child-item-input>`, as a directive within the parent component template,
- Use property binding to bind the `item` property in the child to the `currentItem` property of the parent:
```html
<!-- parent-input.component.html -->
<child-item-input [item]="currentItem"></child-item-input>
```
- In the parent component class, designate a value for `currentItem`:
```typescript
// parent-input.component.ts
export class AppComponent {
  currentItem = 'Television';
}
```

To watch for changes on an `@Input()` property, use `OnChanges`, one of Angular's lifecycle hooks.



### 4.2 Passing up: `@Output()`

The `@Output()` decorator in a child component or directive lets data flow from the child to the parent.

The child component uses the `@Output()` property to raise an event to notify the parent of the change. To raise an event, an `@Output()` must have the type of `EventEmitter`, which is a class in `@angular/core` that you use to emit custom events.

To use `@Output()`, you must configure the parent and child.

#### 4.2.1 Child configuration

Component:
```typescript
// child-item-output.component.ts
import { Output, EventEmitter } from '@angular/core';       // import the decorator and EventEmitter class

export class ItemOutputComponent {

  @Output() newItemEvent = new EventEmitter<string>();      // decorate the property

  addNewItem(value: string) {                               // method to raise an event with the value of newItemEvent
    this.newItemEvent.emit(value);
  }
}
```

The child's template has two controls:
- an HTML `<input>` with a template reference variable, `#newItem`, where the user types in an item name. The value property of the `#newItem` variable stores what the user types into the `<input>`.
- The second element is a `<button>` with a click event binding, bound to the `addNewItem()` method of the child class.

Template:
```html
<!-- child-item-output.component.html -->
<label for="item-input">Add an item:</label>
<input type="text" id="item-input" #newItem>
<button type="button" (click)="addNewItem(newItem.value)">Add to parent's list</button>
```


#### 4.2.2 Parent configuration

Component:
```typescript
// parent-output.component.ts
export class AppComponent {
  items = ['item1', 'item2', 'item3', 'item4'];

  addItem(newItem: string) {
    this.items.push(newItem);
  }
}
```

Template:
```html
<!-- xx.component.html -->

<child-item-output (newItemEvent)="addItem($event)"></child-item-output>
<!-- ^^ bind the parent's method to the child's event -->
<!-- ^^ contains the data that the user types into the <input> in the child template -->

<ul>
  <li *ngFor="let item of items">{{item}}</li>
</ul>
```


## 5 - Navigation

> To handle the navigation from one view to the next, you use the Angular `Router`. The `Router` enables navigation by interpreting a browser URL as an instruction to change the view.

Make sure that you have `<base href="/">` in the `<head>` of your `index.html` file. This assumes that the app folder is the application root, and uses "/".



### 5.1 Imports

Import your components into `app-routing-module.ts` at the top of the file:
```typescript
import { FirstComponent } from './first/first.component';
import { SecondComponent } from './second/second.component';
```

Import the `AppRoutingModule` into `AppModule` and add it to the `imports` array (auto if CLI).



### 5.2 Define a basic route

There are three fundamental building blocks to creating a route:
- Import `RouterModule` and `Routes` into your routing module, and set up a `Routes` array (auto if CLI).
- Define your routes in the `Routes` array. Each route in this array is a JavaScript object:
    ```typescript
  const routes: Routes = [
      { path: 'first-component', component: FirstComponent, title: 'First component' },
      { path: 'second-component', component: SecondComponent, title: 'Second component' },
  ];
    ```
- Add your routes to your application: 
  - Add links to the two components and assign the `routerLink` attribute to the route you want to link.
  - Update your component template to include `<router-outlet>`. This element informs Angular to update the application view with the component for the selected route.



### 5.3 Route order

The order of routes is important because the `Router` uses a first-match wins strategy when matching routes, so more specific routes should be placed above less specific routes.

List routes with a static path first, followed by an empty path route, which matches the default route. The wildcard route ('**' in Angular) comes last because it matches every URL and the `Router` selects it only if no other routes match first.

### 5.4 Getting route information

Use a route to pass this type of information to your application components. To do so, use the `ActivatedRoute` interface:
- Import `ActivatedRoute` and `ParamMap` to your component:
  ```typescript
  import { Router, ActivatedRoute, ParamMap } from '@angular/router';
  ```
- Inject an instance of `ActivatedRoute` by adding it to your application's constructor:
  ```typescript
  constructor(private route: ActivatedRoute, ){}
  ```
- Update the `ngOnInit()` method to access the `ActivatedRoute` and track the name parameter:
  ```typescript
  ngOnInit() {
      this.route.queryParams.subscribe(params => { this.name = params['name']; }); 
  }
  ```


### 5.5 Redirects

To set up a redirect, configure a route with the path you want to redirect from, the component you want to redirect to, and a `pathMatch` value that tells the router how to match the URL:
```typescript
const routes: Routes = [
  { path: 'first-component', component: FirstComponent, title: 'First component' },
  { path: 'second-component', component: SecondComponent, title: 'Second component' },
  { path: '',   redirectTo: '/first-component', pathMatch: 'full' },    // redirect to `first-component`
  { path: '**', component: PageNotFoundComponent },                     // Wildcard route for a 404 page
];
```


### 5.6 Nesting routes

Nested routes are called child routes. To set them up:
- Create the component and add another `<router-outlet>` in the parent component.
- Add the child route to the parent route:
  ```typescript
  const routes: Routes = [
    { path: 'first-component', component: FirstComponent,
      children: [
        { path: 'child-a', component: ChildAComponent },
        { path: 'child-b', component: ChildBComponent },
      ]
    },
  ];
  ```


## 6 - Dependency Injetion: services

> Service: an instance of a class that you can make available to any part of your application using Angular's dependency injection system.

Service is a broad category encompassing any value, function, or feature that an application needs. A service is typically a class with a narrow, well-defined purpose. A component is one type of class that can use DI.

Dependency Injection, or DI, is a design pattern and mechanism for creating and delivering some parts of an application to other parts of an application that require them.

In Angular, dependencies are typically services, but they also can be values, such as strings or functions. An injector for an application (created automatically during bootstrap) instantiates dependencies when needed, using a configured provider of the service or value.

A component can delegate certain tasks to services, such as fetching data from the server, validating user input, or logging directly to the console. By defining such processing tasks in an injectable service class, you make those tasks available to any component.

 


Services can be generated with:
```commandline
ng generate service exampleService
```

Which automatically creates the files we need:
```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class HeroService {

  // Code that does things here
  constructor() { }
}
```
The `@Injectable()` decorator specifies that Angular can use this class in the DI system. The metadata, `providedIn: 'root'`, means that the `ExampleService` is visible throughout the application.



To inject a service as a dependency into a component (or another service), you can use component's `constructor()` and supply a constructor argument with the dependency type. 
```typescript
export class ExampleComponent {
  
  constructor(private backend: BackendService, private example: ExampleService){}
}
```


## 7 - Forms

Angular provides two different approaches to handling user input through forms: reactive and template-driven. Both capture user input events from the view, validate the user input, create a form model and data model to update, and provide a way to track changes.

### 7.1 Chosing an apporach 

#### 7.1.1 Key advantages

| FORMS               | DETAILS                                                                                                                                                                            |
|---------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| reactive            | - direct, explicit access to the underlying form's object model.- more scalable, reusable, and testable.                                                                      |
| templatedriven | - rely on directives in the template to create and manipulate the underlying object model.- straightforward to add to an app, but they don't scale as well as reactive forms. |

If forms are a key part of your application, or you're already using reactive patterns for building your application, use reactive forms.
If you have very basic form requirements and logic that can be managed solely in the template, template-driven forms could be a good fit.

#### 7.1.2 Key differences

| i                   | REACTIVE                             | TEMPLATE-DRIVEN                 |
|---------------------|--------------------------------------|---------------------------------|
| Setup of form model | Explicit, created in component class | Implicit, created by directives |
| Data model          | Structured and immutable             | Unstructured and mutable        |
| Data flow           | Synchronous                          | Asynchronous                    |
| Form validation     | Functions                            | Directives                      |

#### 7.1.3 Scalability

If forms are a central part of your application, scalability is very important. Being able to reuse form models across components is critical.

Reactive forms are more scalable than template-driven forms. They provide direct access to the underlying form API, and use synchronous data flow between the view and the data model, which makes creating large-scale forms easier. Reactive forms require less setup for testing, and testing does not require deep understanding of change detection to properly test form updates and validation.

Template-driven forms focus on simple scenarios and are not as reusable. They abstract away the underlying form API, and use asynchronous data flow between the view and the data model. The abstraction of template-driven forms also affects testing. Tests are deeply reliant on manual change detection execution to run properly, and require more setup.



### 7.2 Setting up the form model

Both reactive and template-driven forms track value changes between the form input elements that users interact with and the form data in your component model. The two approaches share underlying building blocks, but differ in how you create and manage the common form-control instances.

#### 7.2.1 Common form foundation classes

Both reactive and template-driven forms are built on the following base classes.

| BASE CLASSES           | DETAILS                                                                          |
|------------------------|----------------------------------------------------------------------------------|
| `FormControl`          | Tracks the value and validation status of an individual form control             |
| `FormGroup`            | Tracks the same values and status for a collection of form controls              |
| `FormArray`            | Tracks the same values and status for an array of form controls                  |
| `ControlValueAccessor` | Creates a bridge between Angular FormControl instances and built-in DOM elements |

### 7.2.2. In reactive forms

With reactive forms, you define the form model directly in the component class. The `[formControl]` directive links the explicitly created `FormControl` instance to a specific form element in the view, using an internal value accessor.

The following component implements an input field for a single control, using reactive forms. In this example, the form model is the `FormControl` instance.

```typescript
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-reactive-favorite-color',
  template: 'Favorite Color: <input type="text" [formControl]="favoriteColorControl">'
})

// SETUP IN THE CLASS
export class FavoriteColorComponent {
  favoriteColorControl = new FormControl('');
}
```

#### 7.2.3 In template-driven forms

In template-driven forms, the form model is implicit, rather than explicit. The directive `NgModel` creates and manages a `FormControl` instance for a given form element.

The following component implements the same input field for a single control, using template-driven forms.
```typescript
import { Component } from '@angular/core';

// SETUP IN THE TEMPLATE
@Component({
  selector: 'app-template-favorite-color',
  template: 'Favorite Color: <input type="text" [(ngModel)]="favoriteColor">'
})

export class FavoriteColorComponent {
  favoriteColor = '';
}
```

### 7.3 Data flow in forms

In reactive forms, each form element in the view is directly linked to the form model (a `FormControl` instance). Updates from the view to the model and from the model to the view are synchronous and do not depend on how the UI is rendered.

In template-driven forms, each form element is linked to a directive that manages the form model internally.


### 7.4 Form validation

Validation is an integral part of managing any set of forms. Whether you're checking for required fields or querying an external API for an existing username, Angular provides a set of built-in validators as well as the ability to create custom validators.

| FORMS                 | DETAILS                                                                                                  |
|-----------------------|----------------------------------------------------------------------------------------------------------|
| Reactive forms        | Define custom validators as functions that receive a control to validate                                 |
| Template-driven forms | Tied to template directives, and must provide custom validator directives that wrap validation functions | 


### 7.5 `FormBuilder`

The `FormBuilder` provides syntactic sugar that shortens creating instances of a `FormControl`, `FormGroup`, or `FormArray`. It reduces the amount of boilerplate needed to build complex forms.

#### 7.5.1 Specs

| METHOD       | DESCRIPTION                                                                               |
|--------------|-------------------------------------------------------------------------------------------|
| `group()`    | Constructs a new `FormGroup` instance                                                     |
| `record()`   | Constructs a new `FormRecord` instance                                                    |
| `control()`  | Constructs a new FormControl with the given state, validators and options                 |
| `array()`    | Constructs a new FormArray from the given array of configurations, validators and options |

All methods accept a single generic argument, which is an object containing all the keys and corresponding inner control types.

| PROPERTY    | DESCRIPTION                                                                                                                           |
|-------------|---------------------------------------------------------------------------------------------------------------------------------------|
| nonNullable | Returns a `FormBuilder` in which automatically constructed @see FormControl} elements have `{nonNullable: true}` and are non-nullable |

#### 7.5.2 Usage:
- Import and inject the `FormBuilder` service in your component file.
- Use one of the class's method to set the form's model. 
- Define an `onSubmit()` method to process the form.
- Create the form's HTML. Use a `formGroup` property binding to bind your form to the HTML `<form>` tag.
- Use an `ngSubmit` event binding to the `<form>` tag that calls the `onSubmit()` method with the form's value.
- Add a `formControlName` attribute to all the `<input>` fields to link the fields to their corresponding from controls.

Component:
```typescript
// form.component.ts
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class MyFormComponent {

  formData = {}

  MyForm = this.formBuilder.group({
    name: '',
    address: ''
  });

  onSubmit(): void {
    // Process data here
    this.formData = this.MyForm.value
    this.MyForm.reset();
  }
  
  constructor(){}
}
```

Template:
```html
<!-- form.component.html -->
<form [formGroup]="MyForm" (ngSubmit)="onSubmit()">

  <div>
    <label for="name">Name</label>
    <input id="name" type="text" formControlName="name">
  </div>

  <div>
    <label for="address">Address</label>
    <input id="address" type="text" formControlName="address">
  </div>

  <button class="button" type="submit">Submit</button>
</form>
```

## Deploy

Run an app locally:
```commandline
$ npm install
$ ng serve (--port 4201)
```

Building:
```commandline
$ ng build
```
