[//]: # (TITLE Rust basics)
[//]: # (ENDPOINT /basics)

# Rust basics

Rust is a **general-purpose programming language** emphasizing **performance**, [**type safety**](https://en.wikipedia.org/wiki/Type_safety), and [**concurrency**](https://en.wikipedia.org/wiki/Concurrency_(computer_science)).

It **enforces memory safety**, meaning that all references point to valid memory. It does so **without a traditional garbage collector**; instead, memory safety errors and data races are prevented by the "borrow checker", which tracks the object lifetime of references at compile time.

Although Rust is a relatively low-level language, it has some functional concepts that are generally found in higher-level languages. This makes Rust not only **fast**, but also **easy** and **efficient** to code in.

> Rust gives you the option to **control low-level details** without all the hassle traditionally associated with such control.

## 1 - Quickstart

### 1.1 - Installation

To install the latest stable version of the Rust compiler:

```bash
curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh
```

A linker is also needed for Rust to join its compiled outputs into one file. You should already have one installed, but if you get linker errors, install a C compiler (gcc or good ol' clang).

To check the installation:

```bash
rustc --version
```

You can now use `rustup` to handle Rust:

```bash
# update Rust
$ rustup update

# uninstall Rust and rustup
$ rustup self uninstall

# view manual
$ rustup doc
```

### 1.2 - Hello World

Create a main file with the `.rs` extension :

```bash
touch main.rs
```

The `main()` function is the **entrypoint** of evert Rust program, meaning that it will always be executed first.

Copy this main in your `main.rs` file (it will print "Hello, world!" in the terminal):

```rust
// the body is scoped between { }
fn main() {
    // 4 spaces of indentation per level
    println!("Hello, world!");
    // every instruction ends with a ;  
}
```

Now to run the program, use the `rustc` compiler to compile your `.rs` file into a binary executable and run it:

```bash
rustc main.rs
./main
```

### 1.3 - Hello Cargo

> Cargo is Rust's **build system** and **package manager**.

As you write more complex Rust programs, you'll add dependencies, and if you start a project using Cargo, adding dependencies will be much easier to do.

Cargo comes installed with Rust through the official installers. To start a new project, run:

```bash
cargo new hello_cargo
```

This will create a new directory and project called "hello_cargo", with the following files:

```bash
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

Alternatively, you can turn a directory into a Cargo project by running:

```bash
cargo init
```

To build your project, run:

```bash
$ cargo build
   Compiling hello_cargo v0.1.0 (file:///projects/hello_cargo)
    Finished dev [unoptimized + debuginfo] target(s) in 2.85 secs
```

This command creates an **executable** file in `target/debug/hello_cargo` (the default build is a debug build, so Cargo puts the binary in a directory named `debug/`). You can run the executable with this command:

```bash
$ ./target/debug/hello_cargo
Hello, world!
```

Running cargo build for the first time also causes Cargo to create a new file at the top level: `Cargo.lock`. This file **keeps track of the exact versions of dependencies** in your project.

You can combine the build and run steps with:

```bash
cargo run
```

> This command will only re-build if a source file has changed.



## 2 - Variables and memory

### 2.1 - Basic data types

### 2.2 - Functions

### 2.3 - Ownership

### 2.4 - Structs

### 2.5 - Enums

## 3 - Packages, crates, and modules

## Sources

- [The Rust book](https://doc.rust-lang.org/book/title-page.html)
