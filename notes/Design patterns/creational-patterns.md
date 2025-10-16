[//]: # (TITLE Creational patterns)
[//]: # (ENDPOINT /creational-patterns)
[//]: # (PRIORITY 1)

# Creational design patterns

The purpose of creational design patterns is to **manage object creation in flexible and reusable ways**. They **abstract the instantiation process**, allowing systems to be **independent** of how objects are **created, composed, or represented**.

## 1 - Factory method

Good to know: an **interface** is a **point of interaction between different components**.

> The **factory method pattern**, or virtual constructor, provides an **interface** for **creating objects in a superclass**, but **allows subclasses to alter the type of objects** that will be created.

It suggests that you **replace direct object construction calls** (using the `new` operator) **with calls to a special factory method**. Objects returned by a factory method are often referred to as **products**.

The **code that uses the factory** method (often called the **client code**) doesn't see a difference between the actual products returned by various subclasses.

The only limitation is that the **returned products** need to have a **common base class or interface** and the **factory method in the base class** should have its **return type declared as this interface**.

### 1.1 - Structure

1. The **Product declares the interface**, which is common to all objects that can be produced by the creator and its subclasses.
2. **Concrete Products** are **different implementations** of the product interface.
3. The **Creator class declares the factory method** that returns new product objects. It's important that the return type of this method matches the product interface.<br>
You can declare the factory method as `abstract` to **force all subclasses to implement their own** versions of the method. As an alternative, the base factory method can return some default product type.
4. **Concrete Creators override the base factory method** so it **returns a different type** of product.

![center-eg](factory-method.png)

### 1.2 - Applicability

Use when:

- the exact **types and dependencies** of the objects your code should work with are **unknown**. The product construction code is separated from the code that uses the product. Therefore it's **easier to extend** the product construction code independently from the rest of the code.
- you want to provide users with a way to extend its internal components.
- you want to save system resources by reusing existing objects.

| Pros                                                                                          | Cons                                         |
|-----------------------------------------------------------------------------------------------|----------------------------------------------|
| Avoid tight coupling between the creator and the concrete products                            | Code may become bloated with new subclasses. |
| Follows the **Single Responsibility Principle**                                               |                                              |
| Follows the **Open/Close Principle**<br>New types of products without modifying existing code |                                              |

## 2 - Abstract factory

> The **abstract factory pattern** lets you **produce families of related objects without specifying their concrete classes**.

The first thing the abstract factory pattern suggests is to **explicitly declare interfaces for each distinct product** of the product family. Then you can **make all variants of products follow those interfaces**.

The next move is to **declare the abstract factory** -an **interface** with a list of **creation methods for all products** that are part of the product family. These methods **must return abstract product types** represented by the interfaces we extracted previously.

For **each variant** of a product family, we **create a separate factory class** based on the `AbstractFactory` interface.

The client code has to work with both factories and products **via their respective abstract interfaces**. This lets you change the type of a factory that you pass to the client code, as well as the product variant that the client code receives, without breaking the actual client code.

### 2.1 - Structure

![center-eg](abstract-factory.png)

### 2.1 - Applicability

| Pros | Cons |
|------|------|
|      |      |

## 3 - Builder

## 4 - Prototype

## 5 - Singleton
