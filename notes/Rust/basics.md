[//]: # (TITLE Rust basics)
[//]: # (ENDPOINT /rs-basics)
[//]: # (PRIORITY 1)
[//]: # (DESCRIPTION The fundamentals of Rust's syntax and concepts)

# Rust basics

Rust is a **general-purpose programming language** emphasizing **performance**, **[type safety](https://en.wikipedia.org/wiki/Type_safety)**, and **[concurrency](https://en.wikipedia.org/wiki/Concurrency_(computer_science))**.

It **enforces memory safety**, meaning that all references point to valid memory. It does so **without a traditional garbage collector**; instead, memory safety errors and data races are prevented by the "borrow checker", which tracks the object lifetime of references at compile time.

Although Rust is a relatively low-level language, it has some functional concepts that are generally found in higher-level languages. This makes Rust not only **fast**, but also **easy** and **efficient** to code in.

> Rust gives you the option to **control low-level details** without all the hassle traditionally associated with such control.

<!-- markdown-toc start - Don't edit this section. Run M-x markdown-toc-refresh-toc -->
##### Table of contents

  - [1 - Variables](#1---variables)
    - [1.1 - Mutability](#11---mutability)
    - [1.2 - Constants](#12---constants)
    - [1.3 - Shadowing](#13---shadowing)
    - [1.4 - Variable scope](#14---variable-scope)
  - [2 - Basic data types](#2---basic-data-types)
    - [2.1 - Scalar types](#21---scalar-types)
      - [2.1.1 - Integers](#211---integers)
      - [2.1.2 - Floating-points](#212---floating-points)
      - [2.1.3 - Boolean](#213---boolean)
      - [2.1.4 - Character](#214---character)
      - [2.1.5 - Unit](#215---unit)
    - [2.2 - Compound types](#22---compound-types)
      - [2.2.1 - Tuple](#221---tuple)
      - [2.2.2 - Array](#222---array)
  - [3 - Functions](#3---functions)
    - [3.1 - Statements vs expressions](#31---statements-vs-expressions)
    - [3.2 - Return values](#32---return-values)
    - [3.3 - Control flow](#33---control-flow)
      - [3.3.1 - `if` expressions](#331---if-expressions)
      - [3.3.2 - Loops](#332---loops)
  - [4 - Ownership](#4---ownership)
    - [4.1 - The stack and the heap](#41---the-stack-and-the-heap)
    - [4.2 - Memory and allocation](#42---memory-and-allocation)
      - [4.2.1 - Variables and data interacting with move](#421---variables-and-data-interacting-with-move)
      - [4.2.2 - Scope and assignment ](#422---scope-and-assignment)
      - [4.2.3 - Copying heap data with `clone`](#423---copying-heap-data-with-clone)
      - [4.2.4 - Copying stack data with `copy`](#424---copying-stack-data-with-copy)
    - [4.3 - Ownership and functions](#43---ownership-and-functions)
  - [5 - Complex data types](#5---complex-data-types)
    - [5.1 - Collections](#51---collections)
      - [5.1.1 - Strings](#511---strings)
      - [5.1.2 - Vectors](#512---vectors)
      - [5.1.3 - Hash Maps](#513---hash-maps)
      - [5.1.4 - Slice type](#514---slice-type)
    - [5.2 - Structs](#52---structs)
    - [5.3 - Enums](#53---enums)
  - [Sources](#sources)

<!-- markdown-toc end -->

## 1 - Variables

By convention, variables are named in `snake_case`.

### 1.1 - Mutability

By default, **Rust variables are immutable**. This is one of many nudges Rust gives you to write your code in a way that takes advantage of the safety and easy concurrency that Rust offers.

You can make them **mutable** by adding `mut` in front of the variable :

```rs
fn main() {
    let mut x = 5;
    println!("The value of x is: {x}");
    x = 6;
    println!("The value of x is: {x}");
}
```

### 1.2 - Constants

> Constants are **always immutable values that are bound to a name**.

They differ from variables on a few points:

- Constants are **declared** using the keyword **`const`**.
- The **type** of the value **must be annotated**.
- You aren't allowed to use `mut` with constants.
- They can be **declared in any scope**, including the **global** scope.
- Constants **may be set only to a constant expression**, not the result of a value that could only be computed at runtime.
- Rust's naming convention for constants is to use `SCREAMING_SNAKE_CASE`.
- Constants are **valid for the entire time a program runs**, within the scope in which they were declared.

```rs
const NUMBER:i32 = 3;

fn main() {
    println!("Number: {NUMBER}");
}
```

### 1.3 - Shadowing

Rust allows us to **shadow the previous value of a variable** with a **new one**.

You can **declare a new variable with the same name** as a previous variable (the first variable is **shadowed** by the second).

In effect, the second variable takes any uses of the variable name to itself **until either it itself is shadowed or the scope ends**. We can shadow a variable by using the same variable's name and repeating the use of the `let` keyword as follows:

```rs
fn main() {
    let x = 5;

    {
        let x = x * 2;
        println!("{x}");  // prints: 10
    }

    println!("{x}"); // prints: 5
}
```

Shadowing is different from marking a variable as mutable. By using `let`, we can:

- **Perform a few transformations** on a value but **have the variable be immutable after those transformations** have been completed.
- **Change the type** of the value but reuse the same name.


### 1.4 - Variable scope

> A scope is the **range within a program for which an item is valid**.

In other words, a variable is valid from the **point at which it’s declared** until the end **of the current scope**. 

``` rs
{                      // s is not valid here, it’s not yet declared
	let s = "hello";   // s is valid from this point forward
	
	// do stuff with s
}                      // this scope is now over, and s is no longer valid
```

## 2 - Basic data types

Rust is a **statically typed language**, which means that it must know the types of all variables at compile time. The compiler can usually infer what type we want to use based on the value and how we use it. In cases when many types are possible, we **must add a type annotation**, like this:

```rs
let guess: u32 = "42".parse().expect("Not a number!");
```

**> The following types are allocated on the stack** because they are of a **known size**. This means they can be pushed on and popped off the stack when their scope is over, and can be **quickly and trivially copied** to make a new, independent instance if a different scope needs to use the same value.

### 2.1 - Scalar types

Rust has four primary scalar types: **integers**, **floating-point numbers**, **booleans**, and **characters**.

There's also a special scalar type, **`unit`**, which is used when there is **no other meaningful value** that could be returned.

#### 2.1.1 - Integers

**Integer types default to `i32`.**

| Length  | Signed  | Unsigned |
|---------|---------|----------|
| 8-bit   | `i8`    | `u8`     |
| 16-bit  | `i16`   | `u16`    |
| 32-bit  | `i32`   | `u32`    |
| 64-bit  | `i64`   | `u64`    |
| 128-bit | `i128`  | `u128`   |
| arch    | `isize` | `usize`  |

The `isize` and `usize` types depend on the **architecture** of the computer your program is running on, which is denoted in the table as "arch": 64 bits if you're on a 64-bit architecture and 32 bits if you're on a 32-bit architecture. They're primalarly used when indexing some sort of collection

You can write integer literals in any of these forms:

| Number literals | Example       |
|-----------------|---------------|
| Decimal         | `98_222`      |
| Hex             | `0xff`        |
| Octal           | `0o77`        |
| Binary          | `0b1111_0000` |
| Byte (u8 only)  | `b'A'`        |

Note that **number literals that can be multiple numeric types allow a type suffix**, such as `57u8`, to designate the type. 

Number literals can also use `_` as a **visual separator** to make the number easier to read, such as `1_000`, which is equivalent to `1000`.

##### > Integer overflow

When an integer overflow occurs in debug mode, Rust includes checks for integer overflow that cause your program to panic at runtime. 

When an integer overflow occurs in release mode with the `--release` flag, Rust performs [two's complement](https://en.wikipedia.org/wiki/Two%27s_complement) wrapping. In short, **values greater than the maximum value** the type can hold "**wrap around**" to **the minimum of the values** the type can hold. In the case of a `u8`, the value `256` becomes `0`, the value `257` becomes `1`, and so on. The program won't panic, but the variable will have an unexpected value.

> Relying on integer overflow's wrapping behavior is considered an error.

To **explicitly handle** the possibility of overflow, you can use these families of methods provided by the standard library for primitive numeric types:

- Wrap in all modes with the `wrapping_* `methods, such as `wrapping_add`.
- Return the `None` value if there is overflow with the `checked_*` methods.
- Return the value and a boolean indicating whether there was overflow with the `overflowing_*` methods.
- Saturate at the value's minimum or maximum values with the `saturating_*` methods.

#### 2.1.2 - Floating-points

Rust's floating-point types are `f32` and `f64`, which are 32 bits and 64 bits in size respectively.

**The default type is `f64`** because on modern CPUs, it's roughly the same speed as `f32` but is capable of more precision (`f32` type is a single-precision float, and `f64` has double precision).

**All floating-point types are signed**.

#### 2.1.3 - Boolean

Booleans are **one byte** in size. The boolean type in Rust is specified using `bool`.

#### 2.1.4 - Character

Rust's `char` literals are declared with single quotes (as opposed to string literals which use double quotes):

```rs
fn main() {
    let c = 'z';
    let z: char = 'ℤ'; // with explicit type annotation
    let heart_eyed_cat = '😻';
}
```

The `char` type is **four bytes** in size and represents a **Unicode Scalar Value**.

#### 2.1.5 - Unit

The `()` type, also called `unit`, has exactly one value: `()`. It is used when there is **no other meaningful value** that could be returned.

`()` is kinda like `void` in C, except `unit` has exactly 1 value whereas `void` has 0 values. In practice, the amount of information you can store in both types is the same (**0 bits**), although languages that use `unit` allow you to **treat it as you would any other value**.

`()` is most commonly seen **implicitly**: functions without a `-> ...` **implicitly have return type `()`**.

```rs
fn long() -> () {}

// equivlent to
fn short() {}
```

When a semicolon is used at the end of a block, the expression (and thus the block) evaluates to `()` (see the [Statements vs expressions](#4.1---statements-vs-expressions) section).

```rs
fn main() {
    fn returns_i64() -> i64 {
        1    // expression
    }

    fn returns_unit() {
        1;    // statement
    }
    
    let is_i64 = {
        returns_i64()    // expression
    };
    
    let is_i64_but_unit = {
        returns_i64();    // statement
    };

    let is_unit = {
        returns_unit()    // expression
    };
    
    
    println!("
    returns_i64: {:?}
    returns_unit: {:?}
    is_i64: {:?}
    is_i64_but_unit: {:?}
    is_unit: {:?}",
    returns_i64(), returns_unit(), is_i64, is_i64_but_unit, is_unit);
}
```

The above program will print:

```sh
returns_i64: 1
returns_unit: ()
is_i64: 1
is_i64_but_unit: ()
is_unit: ()
```

Note that to print `unit`, you need to use this syntax: `{:?}`.

### 2.2 - Compound types

Compound types can group multiple values into one type.

#### 2.2.1 - Tuple

A tuple is a general way of grouping together a number of values with a **variety of types** into one compound type. Tuples have a **fixed length**: once declared, they cannot grow or shrink in size.

```rs
fn main() {
    let tup: (i32, f64, u8) = (500, 6.4, 1);
}
```

To get the individual values out of a tuple, we can use **pattern matching to destructure** a tuple value, or use indexes:

```rs
fn main() {
    let tup = (500, 6.4, 1);

    let (x, y, z) = tup;
    println!("The value of y is: {y}");  // prints: 6.4

	// OR
    let five_hundred = x.0;
    let six_point_four = x.1;
    let one = x.2;
}
```

A tuple **without any values** has a special name, **`unit`**. This value and its corresponding type are both written `()` and represent an **empty value** or an **empty return type**. Expressions implicitly return the unit value if they don't return any other value.

#### 2.2.2 - Array

Unlike a tuple, **every element of an array must have the same type**. Unlike arrays in some other languages, **arrays in Rust have a fixed length**.

You write an array's type using square brackets with the type of each element, a semicolon, and then the number of elements in the array:

```rs
fn main() {
	let a: [i32; 5] = [1, 2, 3, 4, 5];

	// OR, with type inference
    let b = [1, 2, 3, 4, 5];
	
	// for repeated values
	let c = [3; 5];
	
	// equivalent to
	let d = [3, 3, 3, 3, 3];
}
```

And access elements of an array using indexing:

```rs
fn main() {
    let a = [1, 2, 3, 4, 5];

    let first = a[0];
    let second = a[1];
}
```

When tryin to access an array element with indexing, Rust **checks at runtime** that the index is less than the array length. This is an example of Rust's **memory safety principles** in action. In many low-level languages, this kind of check is not done, and when you provide an incorrect index, invalid memory can be accessed.

> Rust **protects** you against this kind of error by **immediately exiting** instead of allowing the memory access and continuing

Arrays are useful when you want your **data allocated on the stack** or when you want to **ensure you always have a fixed number of elements**. The alternative is a **Vector**.

## 3 - Functions

The **naming convention** for functions in Rust is `snake_case`.

Functions are defined using the `fn`. To call a function, it doesn't need to be defined above the caller, just in the **same scope**.

In function signatures, you **must declare the type of each parameter**.

```rs
// main is the entrypoint to every Rust program
fn main() {
    println!("Hello, world!");

    // function call with argument
    another_function(5);
}

// function definition with a parameter
fn another_function(x: i32) {
    println!("The value of x is: {x}");
}

// prints : "Hello, world!\nThe value of x is: 5"
```

### 3.1 - Statements vs expressions

Function bodies are made up of a **series of statements** optionally ending in an **expression**. Rust is an **expression-based language**, so there is an important distinction between statements and expressions:

- **Statements** are **instructions** that **perform some action and do not return** a value.<br/>
  For example, function definitions and variable assignments are statements as they do not return a value in Rust.
- **Expressions** evaluate to a **resultant value**.<br/>
  For example, calling a function/macro or creating scopes are expressions as they evaluate to a value.
- Expressions do not include ending semicolons. If you **add a semicolon** to the end of an **expression**, you **turn it into a statement**, and it will then not return a value.

```rs
// statements
fn main() {
    let y = 6;
}

// expressions
let y = {
        let x = 3;
        x + 1
    }; // this block evaluates to 4

    println!("The value of y is: {y}");
```

Note: technically, everything in Rust is an expression. This means statements are expressions that return "nothing", they actually return `unit` (`()`).

### 3.2 - Return values

In Rust, return values don't need names but **their type must be declared** in the function prototype.

The return value of the function is synonymous with the **value of the final expression in the block** of the function body. You can return early from a function by using the `return` keyword and specifying a value, but **most functions return the last expression implicitly**.

```rs
fn five() -> i32 {
    5  // no semicolon --> expression --> returned
}

fn main() {
    let x = five();

    println!("The value of x is: {x}");  // prints: The value of x is: 5
}
```

### 3.3 - Control flow

#### 3.3.1 - `if` expressions

The conditions in a `if` expression does not require parentheses but **must be a bool**.

```rs
fn main() {
    let number = 3;

    if number < 5 {
        println!("condition #1 was true");
    } else if number > 5 {
        println!("condition #2 was true");
    } else {
        println!("both conditions wer false");
    }

    if number {
        // this will not compile
    }
}
```

Because **`if` is an expression**, we can use it on the **right side of a `let` statement** to assign the outcome to a variable:

```rs
fn main() {
    let condition = true;
    let number = if condition { 5 } else { 6 };

    println!("{number}");  // prints: 5
}
```

Note that **both arms** of this condition must **return the same type**.

#### 3.3.2 - Loops

Rust has three kinds of loops: `loop`, `while`, and `for`.

##### > `loop`

The `loop` keyword tells Rust to execute a block of code **forever** or until you **explicitly** tell it to stop with **`break`** or with an **interupt**.

You can also use the keyword `continue` to skip part of the code inside a `loop` and go to the next iteration:

One of the uses of a loop is to **retry an operation you know might fail**, such as checking whether a thread has completed its job. You can also **return the result of that operation** after the break expression:

You can also `return` from inside a loop. While `break` only **exits the current loop**, `return` always **exits the current function**.

```rs
fn main() {
    let mut i = 0;
    let mut counter = 0;

    let result = loop {
        i += 1;

        if i == 5 {
            continue ; // skip the 6th incrementation of counter
        }

        counter += 1;

        if i == 10 {
            break counter * 2;  // assign counter * 2 to result
        }                       // and break out of the loop
    };

    println!("counter is {result} after {i} iterations");
    // prints: counter is 18 after 10 iterations
}
```

##### > `while`

While a condition evaluates to `true`, the code runs; otherwise the program calls `break`, stopping the loop.

```rs
fn main() {
    let mut number = 3;

    while number != 0 {
        println!("{number}!");

        number -= 1;
    }

    println!("LIFTOFF!!!");
}

```

##### > `for`

You can use a `for` loop to execute some code **for each item in a collection**.

```rs
fn main() {
    let a = [10, 20, 30, 40, 50];

    for element in a {
        println!("the value is: {element}");
    }
}
```

Using a `for` to go through a collection is **safer and faster** than a `while` loop: you can't access invalid memory by accident so the compiler can perform less checks.

You can also use a **Range** in a `for` loop:

```rs
fn main() {
    for number in (1..4).rev() {
        println!("{number}!");
    }
    println!("LIFTOFF!!!");
}
```


##### > Loop labels

If you have **loops within loops**, `break` and `continue` apply to the **innermost loop** at that point. You can optionally specify a **loop label** on a loop that you can then use with `break` or `continue` to specify that those keywords apply to the **labeled loop instead of the innermost loop**.

Loop labels must **begin with a single quote**:

```rs
fn main() {
    let mut count = 0;
    'counting_up: loop {
        println!("count = {count}");
        let mut remaining = 10;

        loop {
            println!("remaining = {remaining}");
            if remaining == 9 {
                break;
            }
            if count == 2 {
                break 'counting_up;
            }
            remaining -= 1;
        }

        count += 1;
    }
    println!("End count = {count}");
}
```

This program will print:

```sh
count = 0
remaining = 10
remaining = 9
count = 1
remaining = 10
remaining = 9
count = 2
remaining = 10
End count = 2
```

## 4 - Ownership

Ownership is Rust’s most unique feature and has deep implications for the rest of the language. It **enables Rust to make memory safety guarantees without needing a garbage collector**, so it’s important to understand how ownership works.

> Ownership is a **set of rules that govern how a Rust program manages memory**.

All programs have to manage the way they use a computer’s memory while running. Instead of using a garbage collector or making the programmer explicitly allocate and free the memory, Rust uses a third approach: **memory is managed through a system of ownership with a set of rules that the compiler checks**.

##### Ownership rules

- Each value in Rust has an **owner**.
- There can only be **one owner at a time**.
- When the owner goes **out of scope**, the **value will be dropped**.


If any of the rules are **violated**, the program **won’t compile**.

None of the features of ownership will slow down your program while it’s running.

### 4.1 - The stack and the heap

Both the **stack** and the **heap** are **parts of memory available to your code to use at runtime**, but they are structured in different ways.

**The stack stores values in the order it gets them and removes the values in the opposite order** (FILO). Adding data is called **pushing onto the stack**, and removing data is called popping off the **stack**.

**All data stored on the stack must have a known, fixed size**. Data with an **unknown size at compile time** or a size that **might change** must be stored on the **heap**.

**The heap is less organized**: when you put data on the heap, you request a certain amount of space. The **memory allocator** finds an **empty spot** in the heap that is big enough, **marks it as being in use**, and **returns a pointer** (the address of that location). This process is called **allocating** on the heap and is sometimes abbreviated as just allocating (pushing values onto the stack is **not** considered allocating).

Because the pointer to the heap is a known, fixed size, you can **store the pointer on the stack**, but when you want the actual data, you must **follow the pointer**.

**Pushing to the stack is faster than allocating on the heap** because the allocator never has to search for a place to store new data; that location is always at the top of the stack.

**Accessing data in the heap is slower** than accessing data on the stack because you have to follow a pointer to get there. Contemporary processors are **faster if they jump around less in memory**.

When your code **calls a function**, the **values passed into the function** (including, potentially, pointers to data on the heap) and the **function’s local variables** get **pushed onto the stack**. When the function is over, those values get **popped off the stack**.

**Keeping track** of what parts of code are using what data on the **heap**, **minimizing the amount of duplicate** data on the heap, and **cleaning up unused data** on the heap so you don’t run out of space are all problems that **ownership** addresses.

### 4.2 - Memory and allocation

In the case of a **string literal**, we know the contents at **compile time**, so the text is **hardcoded** directly into the final executable. This is why string literals are **fast** and **efficient**. But these properties only come from the string literal’s **immutability**. 

With the `String` type, in order to support a **mutable**, growable piece of text, we need to:
- **Request memory** from the **memory allocator** at **runtime**.
- **Return** this memory **to the allocator** when we’re done with our `String`.

That first part is done by us when we call `String::from` its implementation requests the memory it needs. This is pretty much universal in programming languages.

However, the second part is different. In languages with a **garbage collector** (GC), the GC **keeps track** of and **cleans up memory that isn’t being used** anymore, and we don’t need to think about it. In most languages without a GC, it’s **our responsibility** to **identify when memory is no longer being used** and to call code to **explicitly free it**, just as we did to request it. 

Rust takes a different path: the **memory is automatically returned once the variable that owns it goes out of scope**.

There is a natural point at which we can return the memory our `String` needs to the allocator: when `s` goes out of scope. When a variable goes out of scope, Rust calls `drop`, a function that belongs to `String` and **returns the memory**. Rust calls `drop` **automatically at the closing curly bracket**.

In general, types whose values reside on the **heap** need to **implement the `Drop` trait** so the compiler knows how to free the memory assigned to them when they reach the end of their scope.

#### 4.2.1 - Variables and data interacting with move

A `String` is made up of three parts:
- A **pointer to the memory** that holds the contents of the string.
- A **length**: how much memory, in **bytes**, the contents of the `String` are **currently using**.
- A **capacity**: **total amount of memory**, in **bytes**, that the `String` has **received** from the allocator.

This group of data is **stored on the stack**. The **heap** stores the actual contents of the string.

The data representation in memory can be represented like this, with the stack on the left and the heap on the right:


![center-eg](str-ptr.svg)


Say we have two `String`s declared as follows:

```rs
let s1 = String::from("hello");
let s2 = s1;
```

When we assign `s1` to `s2`, the `String` data is copied, meaning we **copy the pointer**, the **length**, and the **capacity** that are on the stack. We **do not copy the data on the heap** that the pointer refers to.

![center-eg](2str-ptr.svg)

Earlier, we said that when a variable goes **out of scope**, Rust automatically calls the `drop` function and **cleans up the heap memory** for that variable. What happens when both `s1` and `s2` get out of scope at the same time ?

To **ensure memory safety** and prevent double frees, after the line `let s1 = s2;`, Rust considers `s1` as **no longer valid**. Therefore, Rust doesn’t need to free anything when `s1` goes out of scope.

Copying the pointer, length, and capacity **without copying the data** is **NOT** like making a shallow copy. Because Rust **invalidates the first variable**, instead of being called a shallow copy, it’s **known as a move**.

> In this example, we would say that `s1` was moved into `s2`.

Rust will **never automatically create “deep” copies** of your data. Therefore, any automatic copying can be **assumed to be inexpensive** in terms of runtime performance.

#### 4.2.2 - Scope and assignment 

The inverse of this is true for the relationship between scoping, ownership, and memory being freed via the `drop` function as well. When you **assign a completely new value** to an **existing variable**, Rust will call `drop` and **free the original value’s memory immediately**. 

``` rs
let mut s = String::from("hello");
s = String::from("ahoy");

println!("{s}, world!");  // prints 'ahoy, world!'

```

In this example, the original string `hello` immediately goes **out of scope** when we assign it a new `String`, so **its memory is freed right away**.

#### 4.2.3 - Copying heap data with `clone`

If we actually want to **deeply copy** the **heap data** of a `String`, not just the stack data, we can use a common method called `clone`.

``` rs
let s1 = String::from("hello");
let s2 = s1.clone();

println!("s1 = {s1}, s2 = {s2}");
```

When you see a call to `clone`, you know that some **arbitrary code is being executed** and that code **may be expensive**. It’s a visual indicator that something different is going on.

#### 4.2.4 - Copying stack data with `copy`

Copying the data of types stored on the stack (due to their known size at compile time) is **quick** and **does not invalidate** the variable that's being copied.

Rust has a special annotation called the `Copy` trait that we can place on **types that are stored on the stack**. If a type implements the `Copy` trait, **variables that use it do not move**, but rather **are trivially copied**.

> On the stack, there’s no difference between deep and shallow copying.

Rust won’t let us annotate a type with `Copy` if the type, or any of its parts, has implemented the `Drop` trait. 

**All scalar types** implement the `Copy` trait (except Unit), and **tuples** that contain only types that also implement `Copy` (eg: `(i32, bool)`).

### 4.3 - Ownership and functions

The mechanics of **passing a value to a function** are similar to those when **assigning a value to a variable**. Passing a variable to a function will `move` or `copy`, just as assignment does.

We say **ownership is transfered** to another scope when a type that implements `move` is passed to it as an argument.

``` rs
fn main() {
    let s = String::from("hello");  // s comes into scope

    takes_ownership(s);             // value of s moves into the function
                                    // ... so it's no longer valid here

    let x = 5;                      // x comes into scope

    makes_copy(x);                  // because i32 implements the Copy trait, x does NOT move, it's copied into the function

    println!("{}", x);              // so it's okay to use x afterward

} // s and x go out of scope

fn takes_ownership(some_string: String) { // some_string comes into scope
    println!("{some_string}");
} // some_string goes out of scope and `drop` is called

fn makes_copy(some_integer: i32) { // some_integer comes into scope
    println!("{some_integer}");
} // some_integer goes out of scope, nothing special happens
```

**Returning values can also transfer ownership**:

``` rs
fn main() {
    let s1 = gives_ownership();         // gives_ownership moves its return value into s1

    let s2 = String::from("hello");     // s2 comes into scope

    let s3 = takes_and_gives_back(s2);  // s2 is moved into takes_and_gives_back, which also moves its return value into s3
} // Here, s3 goes out of scope and is dropped. s2 was moved, so nothing happens. s1 goes out of scope and is dropped.

fn gives_ownership() -> String {             // gives_ownership will move its return value into the function that calls it

    let some_string = String::from("yours"); // some_string comes into scope

    some_string                              // some_string is returned and moves out to the calling function
}

// This function takes a String and returns one
fn takes_and_gives_back(a_string: String) -> String { // a_string comes into scope
    a_string  // a_string is returned and moves out to the calling function
}
```

### 4.4 - References and borrowing

> Rust has a feature called **references** for **using a value without transferring ownership**.

A reference is like a pointer in that it’s an **address we can follow to access the data** stored at that address; that data is **owned by some other variable**. Unlike a pointer, a reference is **guaranteed to point to a valid value** of a particular type **for the life of that reference**.

References are annoted with **ampersands** (`&`). The action of **creating a reference** is called **borrowing**.

```rs
fn main() {
    let s1 = String::from("hello");

    let len = calculate_length(&s1);  // we pass a reference to s1 to the function calculate_length

    println!("The length of '{s1}' is {len}.");  // calculate_length does not take ownership of s1 so we can still use it 
}

fn calculate_length(s: &String) -> usize {
    s.len()
}
```

<div class="note">The opposite of referencing by using <code>&</code> is <bold>dereferencing</bold>, which is accomplished with the <bold>dereference operator</bold> <code>*</code>.</div>

Since a borrowing function doesn't own a reference, **references are immutble** by default. We can make a reference mutable by using the `mut` keyword, but the original variable must also be mutable:

``` rs
fn main() {
    let mut s = String::from("hello");

    change(&mut s);
}

fn change(some_string: &mut String) {
    some_string.push_str(", world");
}
```

> Mutable references have one big restriction: if you have a mutable reference to a value, you can have **no other references to that value**.


## 5 - Complex data types

Complex data types are types of **unknown** at compile time, or of **variable size**. They reside on the **heap**.

### 5.1 - Collections

Each kind of collection has **different capabilities** and **costs**.

The three more common collection types in Rust are:
- **Vectors** - allow you to store a **variable number of values next to each other**.
- **Strings** - collections of **characters**.
- **Hash maps** - allow you to **associate a value with a specific key**.


#### 5.1.1 - Strings

Strings are **collections of characters**. 

There are two kinds of strings in Rust:
- String literals: **immutable** and of **fixed size**.
- `String`: this **mutable** type **manages data allocated on the heap** and as such is able to **store an amount of text that is unknown** to us at compile time.

You can create a `String` from a string literal using the `::from` function, like so:

```rs
let mut s = String::from("hello");

s.push_str(", world!");

println!("{s}");  // prints: 'hello, world!'
```


#### 5.1.2 - Vectors

#### 5.1.3 - Hash Maps

#### 5.1.4 - Slice type

Slices let you **reference a contiguous sequence of elements in a collection** rather than the whole collection. A slice is a kind of reference, so it **does not have ownership**.

### 5.2 - Structs

`.` is used when you have a value on the left-hand-side.<br/>
`::` is used when you have a type or module. <br/>
Or: `.` is for value member access, `::` is for namespace member access.


### 5.3 - Enums


## Sources

- [The Rust book](https://doc.rust-lang.org/book/title-page.html)
