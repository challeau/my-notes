[//]: # (TITLE Rust basics)
[//]: # (ENDPOINT /rs-basics)
[//]: # (PRIORITY 0)

# Rust basics

Rust is a **general-purpose programming language** emphasizing **performance**, **[type safety](https://en.wikipedia.org/wiki/Type_safety)**, and **[concurrency](https://en.wikipedia.org/wiki/Concurrency_(computer_science))**.

It **enforces memory safety**, meaning that all references point to valid memory. It does so **without a traditional garbage collector**; instead, memory safety errors and data races are prevented by the "borrow checker", which tracks the object lifetime of references at compile time.

Although Rust is a relatively low-level language, it has some functional concepts that are generally found in higher-level languages. This makes Rust not only **fast**, but also **easy** and **efficient** to code in.

> Rust gives you the option to **control low-level details** without all the hassle traditionally associated with such control.

<!-- markdown-toc start - Don't edit this section. Run M-x markdown-toc-refresh-toc -->
##### Table of contents

- [Rust basics](#rust-basics)
        - [Table of contents](#table-of-contents)
  - [1 - Quickstart](#1---quickstart)
    - [1.1 - Installation](#11---installation)
    - [1.2 - Hello World](#12---hello-world)
    - [1.3 - Hello Cargo](#13---hello-cargo)
      - [1.3.1 - Initializing](#131---initializing)
      - [1.3.2 - Building and running](#132---building-and-running)
      - [1.3.3 - Checking](#133---checking)
      - [1.3.4 - Documentation](#134---documentation)
  - [2 - Variables](#2---variables)
    - [2.1 - Mutability](#21---mutability)
    - [2.2 - Constants](#22---constants)
    - [2.3 - Shadowing](#23---shadowing)
  - [3 - Basic data types](#3---basic-data-types)
    - [3.1 - Scalar types](#31---scalar-types)
      - [3.1.1 - Integers](#311---integers)
        - [\> Integer overflow](#-integer-overflow)
      - [3.1.2 - Floating-points](#312---floating-points)
      - [3.1.3 - Boolean](#313---boolean)
      - [3.1.4 - Character](#314---character)
    - [3.2 - Compound types](#32---compound-types)
      - [3.1.2 - Tuple](#312---tuple)
      - [3.1.3 - Array](#313---array)
    - [3.3 - Functions](#33---functions)
  - [4 - Ownership](#4---ownership)
  - [5 - Structs](#5---structs)
  - [6 - Enums](#6---enums)
  - [7 - Collections](#7---collections)
  - [Sources](#sources)

<!-- markdown-toc end -->


## 1 - Quickstart

### 1.1 - Installation

To **install the latest stable version** of the Rust compiler:

```sh
curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh
```

A **linker** is also needed for Rust to **join its compiled outputs into one file**. You should already have one installed, but if you get linker errors, install a C compiler (gcc or good ol' clang).

To **check the installation**:

```sh
rustc --version
```

You can now use `rustup` to handle Rust:

```sh
# update Rust
rustup update

# uninstall Rust and rustup
rustup self uninstall

# view manual
rustup doc
```

### 1.2 - Hello World

Create a main file with the `.rs` extension :

```sh
touch main.rs
```

The `main()` function is the **entrypoint** of evert Rust program, meaning that it will **always be executed first**.

Copy this main in your `main.rs` file (it will print "Hello, world!" in the terminal):

```rust
// the body is scoped between { }
fn main() {
    // 4 spaces of indentation per level
    println!("Hello, world!");
    // every instruction ends with a ;  
}
```

Now to run the program, use the **`rustc` compiler** to compile your `.rs` file **into a binary executable** and run it:

```sh
rustc main.rs
./main
```

### 1.3 - Hello Cargo

#### 1.3.1 - Initializing

Cargo is Rust's **build system** and **package manager**.

As you write more complex Rust programs, you'll add **dependencies**, and if you start a project using Cargo, adding dependencies will be much easier to do.

Cargo comes installed with Rust through the official installers. To **start a new project**, run:

```sh
cargo new hello_cargo
```

This will create **a new directory and project** called `hello_cargo`, with the following files:

```sh
# the project's configuration file
Cargo.toml

# a src directory where all source files must be 
src/
    # a generic main file
    main.rs

# Git files
.git/
.gitignore
```

*Note: TOML (Tom's Obvious, Minimal Language) is Cargo's configuration format.*

Alternatively, you can **turn a directory into a Cargo project** by running:

```sh
cargo init
```

#### 1.3.2 - Building and running

To **build** your project, run:

```sh
$ cargo build
   Compiling hello_cargo v0.1.0 (file:///projects/hello_cargo)
    Finished dev [unoptimized + debuginfo] target(s) in 2.85 secs
```

This command creates an **executable** file in `target/debug/hello_cargo` (the default build is a debug build, so Cargo puts the binary in a directory named `debug/`). You can run the executable with this command:

```sh
$ ./target/debug/hello_cargo
Hello, world!
```

Running cargo build for the first time also causes Cargo to create a new file at the top level: `Cargo.lock`. This file **keeps track of the exact versions of dependencies** in your project.

You can combine the build and run steps with:

```sh
cargo run
```

> This command will **only** re-build if a source file has **changed**.

When your project is finally ready for release, you can use this command to compile it with optimizations:

```sh
cargo build --release
```

This command will create an executable in `target/release` instead of `target/debug`.

The **optimizations** make your Rust **code run faster**, but turning them on **lengthens the compilation time**.

#### 1.3.3 - Checking

To check if the program compiles without producing an executable (often faster than compiling), run:

```sh
$ cargo check
   Checking hello_cargo v0.1.0 (file:///projects/hello_cargo)
    Finished dev [unoptimized + debuginfo] target(s) in 0.32 secs
```

> An additional advantage of using Cargo is that the **commands are the same no matter which operating system** you're working on.

#### 1.3.4 - Documentation

Cargo can build documentation provided by all your dependencies locally and open it in your browser with the following command:

```sh
cargo doc --open
```

## 2 - Variables

By convention, variables are named in `snake_case`.

### 2.1 - Mutability

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

### 2.2 - Constants

> Constants are **always immutable values that are bound to a name**.

They differ from variables on a few points:

- Constants are **declared** using the keyword **`const`**.
- The **type** of the value **must be annotated**.
- You aren't allowed to use `mut` with constants.
- They can be **declared in any scope**, including the **global** scope.
- Constants **may be set only to a constant expression**, not the result of a value that could only be computed at runtime.
- Rust's naming convention for constants is to use `SCREAMING_SNAKE_CASE`.
- Constants are **valid for the entire time a program runs**, within the scope in which they were declared.

### 2.3 - Shadowing

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

## 3 - Basic data types

Rust is a **statically typed language**, which means that it must know the types of all variables at compile time. The compiler can usually infer what type we want to use based on the value and how we use it. In cases when many types are possible, we **must add a type annotation**, like this:

``` rs
let guess: u32 = "42".parse().expect("Not a number!");
```

**> The following types are allocated on the stack.**

### 3.1 - Scalar types

Rust has four primary scalar types: **integers**, **floating-point numbers**, **booleans**, and **characters**.

There's also a special scalar type, **`unit`**, which is used when there is **no other meaningful value** that could be returned.

#### 3.1.1 - Integers

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

#### 3.1.2 - Floating-points

Rust's floating-point types are `f32` and `f64`, which are 32 bits and 64 bits in size respectively.

**The default type is `f64`** because on modern CPUs, it's roughly the same speed as `f32` but is capable of more precision (`f32` type is a single-precision float, and `f64` has double precision).

**All floating-point types are signed**.

#### 3.1.3 - Boolean

Booleans are **one byte** in size. The boolean type in Rust is specified using `bool`.

#### 3.1.4 - Character

Rust's `char` literals are declared with single quotes (as opposed to string literals which use double quotes):

```rs
fn main() {
    let c = 'z';
    let z: char = 'ℤ'; // with explicit type annotation
    let heart_eyed_cat = '😻';
}
```

The `char` type is **four bytes** in size and represents a **Unicode Scalar Value**.

#### 3.1.5 - Unit

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

### 3.2 - Compound types

Compound types can group multiple values into one type.

#### 3.1.2 - Tuple

A tuple is a general way of grouping together a number of values with a **variety of types** into one compound type. Tuples have a **fixed length**: once declared, they cannot grow or shrink in size.

``` rs
fn main() {
    let tup: (i32, f64, u8) = (500, 6.4, 1);
}
```

To get the individual values out of a tuple, we can use **pattern matching to destructure** a tuple value, or use indexes:

``` rs
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

#### 3.1.3 - Array

Unlike a tuple, **every element of an array must have the same type**. Unlike arrays in some other languages, **arrays in Rust have a fixed length**.

You write an array's type using square brackets with the type of each element, a semicolon, and then the number of elements in the array:

``` rs
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

## 4 - Functions

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

### 4.1 - Statements vs expressions

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

### 4.2 - Return values

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

### 4.3 - Control flow

#### 4.3.1 - `if` expressions

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

#### 4.3.2 - Loops

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

If you have **loops within loops**, `break` and `continue` apply to the **innermost loop** at that point. You can optionally specify a **loop label** on a loop that you can then use with `break` or `continue` to specify that those keywords apply to the **labeled loop instead of the innermost loop**.

Loop labels must **begin with a single quote**:

```rs
```

## 5 - Ownership

> `.` is used when you have a value on the left-hand-side.<br/>
> `::` is used when you have a type or module. <br/>
> Or: `.` is for value member access, `::` is for namespace member access.

## 6 - Structs

## 7 - Enums

## 8 - Collections

## Sources

- [The Rust book](https://doc.rust-lang.org/book/title-page.html)
