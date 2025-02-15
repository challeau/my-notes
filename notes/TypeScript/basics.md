
[//]: # (TITLE TS basics)
[//]: # (ENDPOINT /ts-basics)
[//]: # (PRIORITY 0)

# Essential TypeScript

<!-- markdown-toc start - Don't edit this section. Run M-x markdown-toc-refresh-toc -->
##### Table of contents

- [Essential TypeScript](#essential-typescript)
        - [Table of contents](#table-of-contents)
  - [1 - Typing](#1---typing)
    - [1.1 Simple types](#11-simple-types)
    - [1.2 Special types](#12-special-types)
    - [1.3 Arrays and Tuples](#13-arrays-and-tuples)
    - [1.4 Objects](#14-objects)
    - [1.5 Enums](#15-enums)
  - [2 - Type Aliases and Interfaces](#2---type-aliases-and-interfaces)
  - [3 - Union types](#3---union-types)
  - [4 - Functions](#4---functions)
  - [5 - Type casting](#5---type-casting)
  - [6 - Classes](#6---classes)
    - [6.1 Basics](#61-basics)
    - [6.2 Inheritance](#62-inheritance)
    - [6.3 Abstract classes](#63-abstract-classes)
  - [7 - Generics](#7---generics)
    - [7.1 Functions](#71-functions)
    - [7.2 Classes](#72-classes)
    - [7.3 Type Aliases](#73-type-aliases)
    - [7.4 Default Value](#74-default-value)
  - [8 - Utility Types](#8---utility-types)
    - [8.1 Partial](#81-partial)
    - [8.2 Required](#82-required)
    - [8.3 Record](#83-record)
    - [8.4 Omit](#84-omit)
    - [8.5 Pick](#85-pick)
    - [8.6 Exclude](#86-exclude)
    - [8.7 ReturnType](#87-returntype)
    - [8.8 Parameters](#88-parameters)
  - [9 - keyof](#9---keyof)

<!-- markdown-toc end -->


## 1 - Typing

Type assignment can be explicit or implicit:
```typescript
// explicit
let firstName: string = "Jake";

// implicit
let firstName = "Amir";
```

Implicit assignment forces TypeScript to infer the value. TypeScript may not always properly infer what the type of a variable may be. In such cases, it will set the type to `any`, which disables type checking.


### 1.1 Simple types

`booleans`, `number`, `string`.

❌ Don't ever use the types `Number`, `String`, `Boolean`, `Symbol`, or `Object`. These types refer to non-primitive boxed objects that are almost never used appropriately in JavaScript code.


### 1.2 Special types

TypeScript has special types that may not refer to any specific type of data:

| TYPE                   | DESCRIPTION                                                                            |
|------------------------|----------------------------------------------------------------------------------------|
| `any`                  | disables type checking<br/>allows all types to be used                                 |
| `unknown`              | safer alternative to `any`<br/>TypeScript will prevent `unknown` types from being used |
| `never`                | throws an error whenever it is defined                                                 |
| `undefined`<br/>`null` | refer to the Javascript primitives.                                                    |


### 1.3 Arrays and Tuples

Arrays can only contain data of the same type:
```typescript
// array of strings
const names: string[] = [];
const inferredNames = ["Amir"];  // array type can be inferred

// you can add members of the same type
names.push("Jake");              // works
names.push(3);                   // throws an error

// readonly prevents a variable from being changed
const names: readonly srtring[] = ["Jake"];
names.push("Amir");      // error
```

In Typescript, tuples are a typed array with a pre-defined length and type for each index:
```typescript
// definition
let myTuple: [number, boolean, string];

// initialization
myTuple = [420, True, "ain't nothing funny"];
myTuple = [False, "this won't work", 333];       // throws an error: order matters

// named tuples
const graph: [x: number, y: number] = [12, 34];

// destructuring (works for arrays too)
const [x, y] = graph;
```

*Note: you can use `.push()` on an initialized tuple but there won't be any type safety after the last defined member.*


### 1.4 Objects

```typescript
const car: { type: string, model: string, year: number } = {
    type: "Toyota", 
    model: "Corolla", 
    year: 2009
};

// types can be inferred
const car {
    type: "Toyota"    
}

// optional properties
const car : { type: string, mileage?: number } = {
    type: "Toyota"
};
car.mileage = 2000000;

// index signatures can be used for objects without a defined list of properties
const nameAgeMap: { [index: string]: number } = {};
nameAgeMap.Jake = 25;                                   // no error
nameAgeMap.Amir = "Fifty";                              // throws an error
```


### 1.5 Enums

An enum is a special "class" that represents a group of constants (unchangeable variables). Enums come in two flavors: string and numeric.

```typescript
// NUMERIC ENUMS
// by default the first value is 0 and the rest is auto-incremented
enum CardinalDirections {
    North,                  // 0
    East,                   // 1
    South,                  // 2
    West                    // 3
};

// you can specify the first value and have it increment the rest autimatically
enum CardinalDirections {
    North = 5,              // 5
    East,                   // 6
    South,                  // 7
    West                    // 8
};

// STRING ENUMS
enum CardinalDirections {
    North = "North",
    East = "East",
    South = "South",
    West = "West"
};
```
*Note: technically, you can mix and match string and numeric enum values, but it is **not** recommended to do so.*


## 2 - Type Aliases and Interfaces

TypeScript allows types to be defined separately from the variables that use them.
Aliases and Interfaces allows types to be easily shared between different variables/objects.

Aliases allow defining types with a custom name.
Interfaces are similar but only apply to object types.

```typescript
// aliasing
type CarYear = number;
type CarType = string;
type CarModel = string;

type Car = {
    year: CarYear,
    type: CarType,
    model: CarModel
};

const carYear: CarYear = 2001;
const carType: CarType = "Toyota";
const carModel: CarModel = "Corolla";

const car: Car = {
    year: carYear,
    type: carType,
    model: carModel
};

// interfacing
interface Rectangle {
    height: number,
    width: number
};

const rectangle: Rectangle = {
    height: 20,
    width: 10
};
```


Interfaces can extend each other's definition thanks to the `extends` keyword:
```typescript
interface ColoredRectangle extends Rectangle {
    color: string
};

const coloredRectangle: ColoredRectangle = {
    height: 20,
    width: 10,
    color: "red"
};
```


## 3 - Union types

Union types are used when a value can be more than a single type.

```typescript
function printStatusCode(code: string | number) {
    console.log(`My status code is ${code}.`)
}

printStatusCode(404);       // works
printStatusCode('404');     // also works
```


## 4 - Functions

TypeScript has a specific syntax for typing function parameters and return values.

```typescript
// specify the return type
function myFunctionThatReturns(): number {
    return 66;
}

// type the parameters
function add(a: number, b: number): number {
    return a + b;
}

// optional paramters
function addWithInitial(a: number, b: number, c?: number) {
    return a + b + (c || 0);
}

// default parameters
function pow(value: number, exponent: number = 10) {
    return value ** exponent;
}

// named parameters
function divide({ dividend, divisor }: { dividend: number, divisor: number }) {
    return dividend / divisor;
}

result = divide({ dividend: 10, divisor: 2 })
console.log(result);      // 5

// rest parameter: all extra parameter will be stocked, as an array, in the last perameter
function add(a: number, b: number, ...rest: number[]) {
    return a + b + rest.reduce((prev, curr) => prev + curr);
}

// function type aliasing
type Negate = (value: number) => number;

const negateFunction: Negate = (value) => value * -1;
```
*Note: avoid using optional parameters in callbacks.*

Use the return type `void` for callbacks whose value will be ignored, NOT `any`. Using void is safer because it prevents you from accidentally using a return value in an unchecked way.


## 5 - Type casting

Casting is the process of overriding a type. It doesn't actually change the type of the data within the variable.

```typescript
// with as
let x: unknown = 'hello';
console.log((x as string).length);      // 5

// with <>
console.log((<string> x).length);       // 5

// without casting
console.log(x.length);                  // 5 (but throws an error)

// data type is not changed
let y: unknown = 1;
console.log((x as string).length);      // undefined

// force casting: cast as unknown, then to the target type
let x = 3;
console.log(((x as unknown) as string).length)  // undefined
```
*Note: casting with `<>` doesn't work in TSX, the Typescript equivalent to JSX.*


## 6 - Classes

TypeScript adds types and visibility modifiers to JavaScript classes.

### 6.1 Basics

```typescript
// typing
class Person {
    name: string;
}

// visibility:
// 1. public (default): accessible from anywhere.
// 2. private: accessible only within the class.
// 3. protected: accessible from class or classes that inherit it.
class Person {
    private name: string;

    public constructor(private name: string) {
        this.name = name;
    }

    public getName(): string {
        return this.name;
    }
}

const person = new Person("Jane");
console.log(person.getName());     // throws an error

// readonly
class Person{
    private readonly name: string;
    
    public constructor(name: string) {
    this.name = name;              // name cannot be changed after this definition
    } 
}
```


### 6.2 Inheritance

A class can inherit from another class in two ways: with the `extends` keyword, or with the `implements` keyword.

<br/>

Using `implements` is a form of polymorphism (the provision of a single interface to entities of different types). 
```typescript
// implements
interface Shape {
    getArea: () => number;
}

class Rectangle implements Shape {
    public constructor(protected readonly width: number, protected readonly height: number) {}

    public getArea(): number {
        return this.width * this.height;
    }
}
```
Here, the new class `Rectangle` can be treated as the same "sort of thing" as `Shape`, but it is not a child of it. It could be passed to any method where `Shape` is required, regardless of having a different parent than `Shape`.


In contrast, `extends`is more like classic inheritance:
```typescript
class Square extends Rectangle {
    public constructor(width: number) {
        super(width, width);
    }
}
```
The new class `Square` is a child of `Rectangle`. It has all the properties and methods of its parent, but these can be overridden, or others can be implemented.

*Note: newer versions of TypeScript allow explicitly marking the re-implementations with the `override` keyword.*


### 6.3 Abstract classes

Classes can be written in a way that allows them to be used as a base class for other classes without having to implement all the members. This is done by using the `abstract` keyword. Members that are left unimplemented also use the `abstract` keyword.


```typescript
abstract class Polygon {
    public abstract getArea(): number;

    public toString(): string {
        return `Polygon[area=${this.getArea()}]`;
    }
}

class Rectangle extends Polygon {
    public constructor(protected readonly width: number, protected readonly height: number) {
        super();
    }

    public getArea(): number {
        return this.width * this.height;
    }
}
```

> Abstract classes cannot be directly instantiated, as they do not have all their members implemented.

## 7 - Generics

Generics allow creating 'type variables' which can be used to create classes, functions & type aliases that don't need to explicitly define the types that they use.

Generics make it easier to write reusable code.

### 7.1 Functions

Generics with functions help make more generalized methods which more accurately represent the types used and returned:

```typescript
function createPair<type1, type2>(var1: type1, var2: type2): [type1, type2] {
    return [var1, var2];
}

result = createPair<string, number>('hello', 420)
console.log(result);                                   // ['hello', 420]

```


### 7.2 Classes

```typescript
class NamedValue<varType> {
    private _value: varType | undefined;
    
    constructor(private name: string) {}
    
    public setValue(value: varType) {
        this._value = value;
    }

    public getValue(): varType | undefined {
        return this._value;
    }

    public toString(): string {
        return `${this.name}: ${this._value}`;
    }
}

let value = new NamedValue<number>('myNumber');
value.setValue(10);

console.log(value.toString());        // myNumber: 10
```


### 7.3 Type Aliases

```typescript
type Wrapped<T> = { value: varType };

const wrappedValue: Wrapped<number> = { value: 10 };
```


### 7.4 Default Value

Generics can be assigned default values which apply if no other value is specified or inferred:
```typescript
class NamedValue<varType = string> {
    private _value: varType | undefined;

    constructor(private name: string) {}

    public setValue(value: varType) {
        this._value = value;
    }
}
```


## 8 - Utility Types

> TypeScript comes with a large number of types that can help with some common type manipulation, usually referred to as utility types.

### 8.1 Partial

`Partial` changes all the properties in an object to be optional.
```typescript
interface Point {
    x: number;
    y: number;
}

let pointPart: Partial<Point> = {};
pointPart.x = 10;
```


### 8.2 Required

`Required` changes all the properties in an object to be required.
```typescript
interface Car {
    make: string;
    model: string;
    mileage?: number;
}

let myCar: Required<Car> = {
    make: 'Ford',
    model: 'Focus',
    mileage: 12000
}
```


### 8.3 Record

`Record` is a shortcut to defining an object type with a specific key type and value type.
```typescript
const nameAgeMap: Record<string, number> = {
    'Alice': 21,
    'Bob': 25
};
```

> `Record<string, number>` is equivalent to `{ [key: string]: number }`.


### 8.4 Omit

`Omit` removes keys from an object type.
```typescript
interface Person {
    name: string;
    age: number;
    location?: string;
}

const bob: Omit<Person, 'age' | 'location'> = {
    name: 'Bob'
};
```


### 8.5 Pick

`Pick` removes all but the specified keys from an object type.
```typescript
interface Person {
    name: string;
    age: number;
    location?: string;
}

const bob: Pick<Person, 'name'> = {
    name: 'Bob'
};
```

### 8.6 Exclude

`Exclude` removes types from a union.
```typescript
type Primitive = string | number | boolean
const value: Exclude<Primitive, string> = true;
```

<br/>

### 8.7 ReturnType

`ReturnType` extracts the return type of a function type.
```typescript
type PointGenerator = () => { x: number; y: number; };
const point: ReturnType<PointGenerator> = {
    x: 10,
    y: 20
};
```


### 8.8 Parameters

`Parameters` extracts the parameter types of a function type as an array.
```typescript
type PointPrinter = (p: { x: number; y: number; }) => void;
const point: Parameters<PointPrinter>[0] = {
    x: 10,
    y: 20
};
```


## 9 - keyof

`keyof` is a keyword in TypeScript which is used to extract the key type from an object type.

When used on an object type with explicit keys, `keyof` creates a union type with those keys:
```typescript
interface Person {
    name: string;
    age: number;
}

function printPersonProperty(person: Person, property: keyof Person) {
    console.log(`Printing person property ${property}: "${person[property]}"`);
}

let person = {
    name: "Max",
    age: 27
};

printPersonProperty(person, "name");      // Printing person property name: "Max"
```

`keyof` can also be used with index signatures to extract the index type:
```typescript
type StringMap = { [key: string]: unknown };
function createStringPair(property: keyof StringMap, value: string): StringMap {
    return { [property]: value };
}
```

