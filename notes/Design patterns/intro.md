[//]: # (TITLE Introduction)
[//]: # (ENDPOINT /design-patterns-intro)
[//]: # (DESCRIPTION Quick definition and overview)
[//]: # (PRIORITY 0)

# Design Patterns

Design patterns are **typical solutions to commonly occurring problems** in software design. The pattern is not a specific piece of code, but a **general concept** for solving a particular problem, or an **abstraction** of **common mecanisms**.

While algorithms describe a clear set of actions to solve a given problem, patterns are intended to be **abstract descriptions of a solution**.

## 1 - Classification

Design patterns differ by their **complexity**, **level of detail** and **scale of applicability** to the entire system being designed.

The most **basic** and **low-level** patterns are often called **idioms**. They usually apply only to a single programming language.

The most **universal** and **high-level** patterns are **architectural patterns**. Developers can implement these patterns in virtually any language. Unlike other patterns, they can be used to design the architecture of an entire application.

In addition, all patterns can be categorized by their intent:

- **Creational** patterns provide **object creation mechanisms** that increase **flexibility and reuse** of existing code.
- **Structural** patterns explain how to assemble objects and classes into **larger structures**, while keeping these structures **flexible and efficient**.
- **Behavioral** patterns take care of **effective communication** and the **assignment of responsibilities** between objects.

## 2 - Caveats

Design patterns are useful tools but they present some weaknesses.

### 2.1 - Workarounds for weak programming languages

Usually the need for patterns arises when people choose a programming language or a technology that **lacks the necessary level of abstraction**. In this case, patterns become a patchwork that gives the language much-needed super-abilities.

### 2.2 - Inefficient solutions

Patterns try to **systematize approaches that are already widely used**. This unification is viewed by many as a **dogma**, and they implement patterns "to the letter", without **adapting them to the context** of their project.

### 2.3 - Unjustified use

> If all you have is a hammer, everything looks like a nail.

It's common for more novice developers to **try and apply them everywhere**, even in situations where simpler code would do just fine.

## Sources

- [Refactoring Guru](https://refactoring.guru/design-patterns/what-is-pattern)
