[//]: # (TITLE Rust quickstart)
[//]: # (ENDPOINT /rs-quickstart)
[//]: # (PRIORITY 0)
[//]: # (DESCRIPTION Get started with 🦀)

# Quickstart

<!-- markdown-toc start - Don't edit this section. Run M-x markdown-toc-refresh-toc -->
**Table of contents**

- [1 - Installation](#1---installation)
- [2 - Hello World](#2---hello-world)
- [3 - Hello Cargo](#3---hello-cargo)
  - [3.1 - Initializing](#31---initializing)
  - [3.2 - Building and running](#32---building-and-running)
  - [3.3 - Checking](#33---checking)
  - [3.4 - Documentation](#34---documentation)

<!-- markdown-toc end -->


## 1 - Installation

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

## 2 - Hello World

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

## 3 - Hello Cargo

### 3.1 - Initializing

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

### 3.2 - Building and running

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

### 3.3 - Checking

To check if the program compiles without producing an executable (often faster than compiling), run:

```sh
$ cargo check
   Checking hello_cargo v0.1.0 (file:///projects/hello_cargo)
    Finished dev [unoptimized + debuginfo] target(s) in 0.32 secs
```

> An additional advantage of using Cargo is that the **commands are the same no matter which operating system** you're working on.

### 3.4 - Documentation

Cargo can build documentation provided by all your dependencies locally and open it in your browser with the following command:

```sh
cargo doc --open
```
