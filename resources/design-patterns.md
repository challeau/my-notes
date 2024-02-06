[//]: # (TITLE Design Patterns)
[//]: # (ENDPOINT /design)


# Design Patterns

Design patterns are **typical solutions to commonly occurring problems** in software design. The pattern is not a specific piece of code, but a **general concept** for solving a particular problem. 

While algorithms describe a clear set of actions to solve a given problem, patterns are intended to be abstract descriptions of a solution.

Design patterns differ by their complexity, level of detail and scale of applicability to the entire system being designed.  The most **basic** and **low-level** patterns are often called **idioms**. They usually apply only to a single programming language.

The most **universal** and **high-level** patterns are **architectural patterns**. Developers can implement these patterns in virtually any language. Unlike other patterns, they can be used to design the architecture of an entire application.

In addition, all patterns can be categorized by their intent:
- **Creational** patterns provide **object creation mechanisms** that increase **flexibility and reuse** of existing code.
- **Structural** patterns explain how to assemble objects and classes into **larger structures**, while keeping these structures **flexible and efficient**.
- **Behavioral** patterns take care of **effective communication** and the **assignment of responsibilities** between objects.


<!-- markdown-toc start - Don't edit this section. Run M-x markdown-toc-refresh-toc -->
##### Table of contents

- [1 - Creational patterns](#1---creational-patterns)
    - [1.1 - Factory method](#11---factory-method)
    - [1.2 - Abstract factory ](#12---abstract-factory)
    - [1.3 - Builder](#13---builder)
    - [1.4 - Prototype](#14---prototype)
    - [1.5 - Singleton](#15---singleton)
- [2 - Structural patterns](#2---structural-patterns)
    - [2.1 - Adapter](#21---adapter)
    - [2.2 - Bridge](#22---bridge)
    - [2.3 - Composite](#23---composite)
    - [2.4 - Decorator](#24---decorator)
    - [2.5 - Facade](#25---facade)
    - [2.6 - Flyweight](#26---flyweight)
    - [2.7 - Proxy](#27---proxy)
- [3 - Behavioral patterns](#3---behavioral-patterns)
    - [3.1 - ](#31--)
    - [3.2 - ](#32--)
    - [3.3 - ](#33--)
    - [3.4 - ](#34--)
    - [3.5 - ](#35--)
    - [3.6 - ](#36--)
    - [3.7 - ](#37--)
    - [3.8 - ](#38--)
    - [3.9 - ](#39--)
    - [3.10 - ](#310--)
- [Sources](#sources)

<!-- markdown-toc end -->


## 1 - Creational patterns

### 1.1 - Factory method

Good to know: an **interface** is a **point of interaction between different components**.

> The **factory method pattern**, or virtual constructor, provides an **interface** for **creating objects in a superclass**, but **allows subclasses to alter the type of objects** that will be created. 

It suggests that you **replace direct object construction calls** (using the `new` operator) **with calls to a special factory method**. Objects returned by a factory method are often referred to as **products**.

The **code that uses the factory** method (often called the **client code**) doesn't see a difference between the actual products returned by various subclasses. 

The only limitation is that the **returned products** need to have a **common base class or interface** and the **factory method in the base class** should have its **return type declared as this interface**.

#### Structure 

1. The **Product declares the interface**, which is common to all objects that can be produced by the creator and its subclasses.
2. **Concrete Products** are **different implementations** of the product interface.
3. The **Creator class declares the factory method** that returns new product objects. It's important that the return type of this method matches the product interface.<br>
You can declare the factory method as `abstract` to **force all subclasses to implement their own** versions of the method. As an alternative, the base factory method can return some default product type.
4. **Concrete Creators override the base factory method** so it **returns a different type** of product.

![center-eg](factory-method.png)


#### Applicability

Use when: 
- the exact **types and dependencies** of the objects your code should work with are **unknown**. The product construction code is separated from the code that uses the product. Therefore it's **easier to extend** the product construction code independently from the rest of the code.
- you want to provide users with a way to extend its internal components.
- you want to save system resources by reusing existing objects.

| Pros                                                                                          | Cons                                         |
|-----------------------------------------------------------------------------------------------|----------------------------------------------|
| Avoid tight coupling between the creator and the concrete products                            | Code may become bloated with new subclasses. |
| Follows the **Single Responsibility Principle**                                               |                                              |
| Follows the **Open/Close Principle**<br>New types of products without modifying existing code |                                              |


### 1.2 - Abstract factory 

> The **abstract factory pattern** lets you **produce families of related objects without specifying their concrete classes**.

The first thing the abstract factory pattern suggests is to **explicitly declare interfaces for each distinct product** of the product family. Then you can **make all variants of products follow those interfaces**. 

The next move is to **declare the abstract factory** -an **interface** with a list of **creation methods for all products** that are part of the product family. These methods **must return abstract product types** represented by the interfaces we extracted previously. 

For **each variant** of a product family, we **create a separate factory class** based on the `AbstractFactory` interface.

The client code has to work with both factories and products **via their respective abstract interfaces**. This lets you change the type of a factory that you pass to the client code, as well as the product variant that the client code receives, without breaking the actual client code.

#### Structure 

1. 

![center-eg](abstract-factory.png)

#### Applicability

| Pros | Cons |
|------|------|
|      |      |

### 1.3 - Builder


### 1.4 - Prototype


### 1.5 - Singleton


## 2 - Structural patterns

### 2.1 - Adapter


### 2.2 - Bridge


### 2.3 - Composite


### 2.4 - Decorator


### 2.5 - Facade


### 2.6 - Flyweight


### 2.7 - Proxy



## 3 - Behavioral patterns

### 3.1 - Chain of responsibilities
### 3.2 - Command
### 3.3 - Iterator
### 3.4 - Mediator
### 3.5 - Memento
### 3.6 - Observer
### 3.7 - State
### 3.8 - Strategy
### 3.9 - Template Method
### 3.10 - Visitor


## Sources

- [Refactoring Guru](https://refactoring.guru/design-patterns/what-is-pattern)
