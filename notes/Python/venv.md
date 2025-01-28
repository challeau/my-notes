[//]: # (TITLE Virtual environments)
[//]: # (ENDPOINT /venv)
[//]: # (PRIORITY 3)

# Virtual environments

Python applications will often use packages and modules that don't come as part of the standard library. Applications will sometimes need a specific version of a library, because the application may require that a particular bug has been fixed or the application may be written using an obsolete version of the library's interface.

**This means it may not be possible for one Python installation to meet the requirements of every application**.

The solution for this problem is to create a **virtual environment**, a **self-contained directory tree** that contains a Python installation for a particular version of Python, plus a number of additional packages.

<!-- markdown-toc start - Don't edit this section. Run M-x markdown-toc-refresh-toc -->
##### Table of contents

- [1 - `virtualenv`](#1---virtualenv)
    - [1.1 - Python discovery](#11---python-discovery)
    - [1.2 - Creators](#12---creators)
    - [1.3 - Seeders](#13---seeders)
    - [1.4 - Activators](#14---activators)
- [2 - `pyenv`](#2---pyenv)

<!-- markdown-toc end -->


## 1 - `virtualenv`

> `virtualenv` is a tool to create isolated Python environments.

It creates an environment that has its own installation directories, that doesn't share libraries with other virtualenv environments (and optionally doesn't access the globally installed libraries either).


`virtualenv` has one basic command:
``` sh
virtualenv <directory>
```
This will create a python virtual environment of the same version as virtualenv, in the given directory.

To activate the virtual environment, use:
```bash
source bin/activate
```

The tool works in two phases:
- Phase 1 **discovers a python interpreter** to create a virtual environment from (by default this is the same python as the one virtualenv is running from, however we can change this via the `-p` option).
- Phase 2 **creates a virtual environment** at the specified destination. This can be broken down into four further sub-steps:
  - Create a Python that matches the target Python interpreter from phase 1.
  - Install (bootstrap) seed packages (`pip`/`setuptools`/`wheel`) in the created virtual environment.
  - Install activation scripts into the binary directory of the virtual environment.
  - Create files that mark the virtual environment as to be ignored by version control systems. This step can be skipped with the `no-vcs-ignore` option.


### 1.1 - Python discovery

`virtualenv` being a Python application has always at least one such available, the one virtualenv itself is using, and as such this is the **default discovered element**.

Created Python virtual environments are usually not self-contained. A complete Python packaging is usually made up of thousands of files, so it's not efficient to install the entire Python again into a new folder. Instead **virtual environments are mere shells, that contain little within themselves, and borrow most from the system Python**.


The CLI flag `-p` or `--python` allows you to **specify a Python specifier** for what type of virtual environment you would like, the format is either:
- A relative/absolute path to a Python interpreter.
- A specifier identifying the Python implementation, version, and architecture in the following format:

```bash
virtualenv -p <python implementation name><version><architecture>
```

### 1.2 - Creators

These are what actually **set up the virtual environment**, usually as a reference against the system Python.

`virtualenv` at the moment has two types of virtual environments:
- `venv` --> this delegates the creation process towards the venv module. This is only available on Python interpreters having version 3.5 or later.
- `builtin` --> this means `virtualenv` is able to do the creation operation itself (by knowing exactly what files to create and what system files need to be referenced).

### 1.3 - Seeders

These will **install for you some seed packages** (`pip`/`setuptools`/`wheel`) that **enables you to install additional Python packages** into the created virtual environment (by invoking `pip`). 

There are two main seed mechanism available:
- `pip` --> uses the bundled pip with virtualenv to install the seed packages !!! a **new child process needs to be created** to do this, which can be expensive.
- `app-data` --> this method uses the user application data directory to **create install images**. These images are needed to be created only once, and subsequent virtual environments can just link/copy those images into their pure python library path (the site-packages folder). This allows all but the first virtual environment creation to be blazing fast (a pip mechanism takes usually 98% of the virtualenv creation time).

### 1.4 - Activators

These are **activation scripts** that will mangle with your shell's settings to ensure that commands from within the Python **virtual environment take priority over your system paths**. For example, if invoking `pip` from your shell returned the system python's pip before activation, once you do the activation this should refer to the virtual environments pip.
<br/>Note that all we do is **change priority**; so, if your virtual environments `bin/Scripts` folder does not contain some executable, this will still resolve to the same executable it would have resolved before the activation.

The location of these is right alongside the python executables (`/bin` on POSIX).<br/>
Nomenclature: named as activate bin/activate (+for all except bash, an extension).


## 2 - `pyenv`

`pyenv` lets you easily switch between multiple versions of Python. It's simple, unobtrusive, and follows the UNIX tradition of single-purpose tools that do one thing well.

Once activated, it **prefixes the `PATH` environment variable** with `~/.pyenv/shims`, where there are special files matching the Python commands (`python`, `pip`).
<br/>These are not copies of the Python-shipped commands; they are **special scripts that decide on the fly which version of Python to run** based on the `PYENV_VERSION` environment variable, the `.python-version` file, or the `~/.pyenv/version` file.

`pyenv` also makes the process of downloading and installing multiple Python versions easier, using the command `pyenv install`.


