
# THIS
 
 > **This** is a property of an execution context (global, function or eval) that, in non–strict mode, is always a reference to an object and in strict mode can be any value.
 
## Global context

In the global execution context (outside of any function), **this** refers to the global object whether in strict mode or not. 

## Function context

Inside a function, the value of **this** depends on how the function is called. In non-strict mode, if the value of **this** is not set by the call, **this** will default to the global object, which is window in a browser. In strict mode, however, if the value of **this** is not set when entering an execution context, it remains as undefined.

In arrow functions, **this** retains the value of the enclosing lexical context's **this**. In global code, it will be set to the global object.

## Class context

The behavior of **this** in classes and functions is similar, since classes are functions under the hood. But there are some differences and caveats.
Within a class constructor, **this** is a regular object. All non-static methods within the class are added to the prototype of **this**.

## As an object method

When a function is called as a method of an object, its **this** is set to the object the method is called on. 

## Summary
	- In an object method, this refers to the object.
	- Alone, this refers to the global object.
	- In a function, this refers to the global object.
	- In a function, in strict mode, this is undefined.
	- In an event, this refers to the element that received the event.
	- Methods like call(), apply(), and bind() can refer this to any object.


# CLASSES

> Classes are a ***template for creating objects***. They encapsulate data with code to work on that data. 

Classes are in fact "special functions", and just as you can define function expressions and function declarations, the class syntax has two components: class expressions and class declarations.

## Class synthax

### Class declaration
To declare a class, you use the class keyword with the name of the class :

``` 
class myClass {
	contructor (var1, var2) {
		this.var1 = var1
		this.var2 = var2
	}
}
```
> Always add a method named constructor()!

An important difference between function declarations and class declarations is that while functions can be hoisted, classes must be defined before they can be constructed (the class is hoisted but the values aren't initialized).

### Class expression

Class expressions can be named or unnamed. The name given to a named class expression is local to the class's body. However, it can be accessed via the name property. 

```
// unnamed
let myClass = class {
	contructor (var1, var2) {
		this.var1 = var1
		this.var2 = var2
	}
};
	
console.log(myClass.name);
// output: "myClass"

// named
myClass = class myClass2 {
	contructor (var1, var2) {
		this.var1 = var1
		this.var2 = var2
	}
}
console.log(myClass.name);
// output: "myClass2"
```

Class expressions must be declared before they can be used (they are subject to the same hoisting restrictions as class expressions).

## Instantiating with a class
Creating an object can be done by using the keyword **new** followed by the class name.
```
let newObject = new myClass(var1, var2);
```
The constructor method is called automatically when a new object is created. 

## Class body and method definitions

The body of a class is the part that is in curly brackets {}. This is where you define class members, such as methods or constructor. 

### Constructor

The constructor method is a special method for creating and initializing an object created with a class. There can only be one special method with the name "constructor" in a class.
If you do not define a constructor method, JavaScript will add an empty constructor method. 
A constructor can use the super keyword to call the constructor of the super class.
The keyword **new** execute the constructor of the invoked class and adds the methods to the object.


### Class methods

Class methods are created with the same syntax as object methods.

```
class myClass {
	constructor() { ... }
	method_1() { ... }
	method_2() { ... }
	method_3() { ... }
}
```

### Field declarations

```
class myClass {
	myVar = 0;
	myVar2;
	constructor() { ... }
	method() { ... }
}
```
We don't need keywords like let, const, or var to declare fields.
By declaring fields up-front, class definitions become more self-documenting, and the fields are always present.
Fields can be declared with or without a default value.

# SUB CLASSING WITH EXTENDS

The **extends** keyword is used in class declarations or class expressions to create a class as a child of another class.

```
class myClass {
	myVar = 0;
	myVar2;
	constructor() { ... }
	myMethod() { ... }
}
	
class myChildClass extends myClass {
	myvar2 = 1;
	myMethod() { // redefined here, takes precedence}
}
```

> If there is a constructor present in the subclass, it needs to first call super() before using "this". <br> For similar methods, the child's method takes precedence over parent's method. <br> Note that classes cannot extend regular (non-constructible) objects. 


