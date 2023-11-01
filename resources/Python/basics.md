
[//]: # (TITLE Python)
[//]: # (ENDPOINT /py)

# ESSENTIAL PYTHON

## 1 - Data

### 1.1 Argument types

#### 1.1.1 Default argument

Parameter assigned a default value on definition: `def ft(arg1, arg2=69)`. They should always follow non-default arguments.

#### 1.1.2 Positional arguments

Arguments assigned a value according to their position when the function is called: `ft(30, 40)`.

#### 1.1.3 Keyword (named) arguments

Arguments assigned a value in the function call: `ft(420, arg1=99)`. They should always follow positional arguments.

#### 1.1.4 Variable-length arguments (*args and **kwargs)

`*args` and `**kwargs` allow you to pass multiple positional arguments or keyword arguments to a function:

Types of Arbitrary Arguments:
- arbitrary positional arguments (*args). Treat like a regular tuple.
- arbitrary keyword arguments (**kwargs). Treat like a regular dict:
```python
def percentage(**kwargs):
    for sub in kwargs:
        # get argument name
        sub_name = sub
        # get argument value
        sub_marks = kwargs[sub]
```

### 1.2 Data types: sequences

> Sequences are iterables which support efficient element access using **integer indices** via the `__getitem__()` special method and define a `__len__()` method that returns the length of the sequence. 
 
Some built-in sequence types are **list, str, tuple, and bytes**. 

Other iterable data types: strings, dicts, file objects, and objects of any classes you define with an `__iter__()` method or with a `__getitem__()` method that implements Sequence semantics.

Data is **packed** in sequences, and can be unpacked like this:
```python
t = 12345, 54321, 'hello!'
x, y, z = t
```


#### 2.1 Iterables that aren't sequences
- dicts also support `__getitem__()` and `__len__()`, but are considered a mapping because the lookups use arbitrary immutable keys rather than integers.
- sets they have no order, and they can't be indexed.


#### 2.2 Lists
- Syntax: `squares = [1, 4, 9, 16, 25]`,
- Usually homogenous, but they can have data of != types, 
- Can be indexed and sliced + support operations like concatenation,
- Mutable,
- Allow comprehensions: `squares = [x**2 for x in range(10)]`,


#### 2.3 Tuples
- Syntax: `t = (12345, 54321, 'hello!')`,
- Usually heterogeneous,
- Can be nested, indexed
- Immutable but can have mutable data, 

#### 2.4 Sets
- Syntax: `basket = {'apple', 'orange', 'apple'}`,
- Unordered collection with no duplicate elements,
- Support mathematical operations like union, intersection, difference,
- Mutable,
- Allow comprehensions: `a = {x for x in 'abracadabra' if x not in 'abc'}`,


#### 2.5 Empty boxes
```python
# List
l = []
# Tuple
t = ()
tp = 'hello',  # <-- the coma!!
# Set
s = set()  # <-- {} creates an empty dict
```


## 3 - Classes

> Classes provide a means of **bundling data and functionality together**.

New class == new type of object.<br/>
New instance == new object of that type.


Each class instance can have attributes attached to it for maintaining its state, and methods (defined by its class) for modifying its state.


Python implements:
- class inheritance --> multiple base classes, 
- overriding of base class.es methods by derived classes,
- methods able to call the method of a base class with the same name,

Objects can contain arbitrary amounts and kinds of data. As is true for modules, classes partake of the dynamic nature of Python: they are created at runtime, and can be modified further after creation.

### 3.1 Class objects

Class objects support two kinds of operations: attribute references and instantiation.

```python
class MyClass:
    """A simple example class"""  # docstring, returned by the __doc__ attribute
    i = 12345

    def f(self):
        return 'hello world'
```
Attribute reference: `MyClass.i` or `MyClass.f`.
Class instantiation: `x = MyClass`.


The instantiation operation (“calling” a class object) creates an empty object. Many classes like to create objects with instances customized to a specific initial state. 
Therefore, a class may define a special method named `__init__()`, like this:
```python
def __init__(self):
    self.data = []

x = MyClass()
```

Or with arguments:
```python
def __init__(self, x, y):
    self.x = x
    self.y = y

x = MyClass(6, 9)
```

#### Instance objects

The only operations understood by instance objects are **attribute references**. There are two kinds of valid attribute names: 
- **data attributes**: instance variables. They don't require declaration and are "sprung into existence" at the first assignment.
- **methods**: functions that belong to an object. Method objects can be stored in variables and called later.

### 3.2 Methods

Functions are reusable bits of code. Methods are functions associated with classes or objects.

#### 3.2.1 Class methods

```python
@classmethod
def my_method(cls):
    # do stuff
```
Class methods receive the class as an implicit first argument, just like an instance method receives the instance (self).
They can access and modify a class state that would apply across all the instances of the class.

#### 3.2.2 Static methods

```python
@staticmethod
def my_method():
    # do stuff
```
Static methods aren't bound to an instance. They don't receive an implicit first argument, and they can’t access or modify the class state.
<br/>
They are present in a class because it makes sense for the method to be present in class.<br/>
They can be called on the class, in the instance, or as regular functions.


#### 3.2.3 Special methods

```python
def __my_special_method__(self):
    # do stuff
```
Special (or magic) methods are methods called implicitly by Python to execute a certain operation on a type. Examples: `__init__`, `__get_attr__`, `__next__`...

#### 3.2.4 In sum....
Static methods and class methods are both bound to a class rather than an object.<br/>
Generally, class methods are used to create factories, and static methods are used to create utility functions.<br/>
Special methods can be used for type emulation.


### 3.3 Inheritance

```python
class DerivedClassName(BaseClassName):
    # statements here

class DerivedClassName(modname.BaseClassName):
    # statements here
```
Classes can inherit from other classes, if the base class is defined in a scope containing the derived class definition.

In place of a base class name, other arbitrary expressions are also allowed. This can be useful, for example, when the base class is defined in another module:

Method references are resolved as follows: the corresponding class attribute is searched, descending the chain of base classes if necessary, and the method reference is valid if this yields a function object.

Derived classes may override methods of their base classes. An overriding method in a derived class may in fact want to extend rather than simply replace the base class method of the same name. To do so, methods can call the base class method directly.

Python has two built-in functions that work with inheritance:
- Use `isinstance()` to check an instance’s type.
- Use `issubclass()` to check class inheritance.

#### 3.3.1 Multiple inheritance

Python supports a form of multiple inheritance as well. A class definition with multiple base classes looks like this:

```python
class DerivedClassName(Base1, Base2, Base3):
    # statements here
```

#### 3.3.2 Method Resolution Order

MRO is a concept used in inheritance. It is the order in which a method is searched for in a classe's hierarchy.

In Python, the MRO is from bottom to top and left to right. This means that, first, the method is searched in the class of the object. If it’s not found, it is searched in the immediate super class. In the case of multiple super classes, it is searched left to right, in the order by which was declared by the developer.

In fact, it is slightly more complex than that; the method resolution order changes dynamically to support cooperative calls to `super()`.

### 3.4 Private Variables

“Private” instance variables that cannot be accessed except from inside an object don’t exist in Python.

However, there is a convention that is followed by most Python code: a name prefixed with an underscore (e.g. _spam) should be treated as a non-public part of the API (whether it is a function, a method or a data member).

### 3.5 Keywords

#### 3.5.1 `super()`

Return a proxy object that delegates method calls to a parent or sibling class of type. This is useful for accessing inherited methods that have been overridden in a class.

There are two typical use cases for `super()`:
- In a class hierarchy with single inheritance, it can be used to refer to parent classes without naming them explicitly, thus making the code more maintainable.
- It allows support of cooperative multiple inheritance in a dynamic execution environment. This makes it possible to implement “diamond diagrams” where multiple base classes implement the same method. 

In addition to method lookups, `super()` also works for attribute lookups. One possible use case for this is calling descriptors in a parent or sibling class.

#### 3.5.2 `__new__()` vs `__init__()`

| new()  --> constructor                                             | init()  --> initializer               | 
|:-------------------------------------------------------------------|:--------------------------------------|
| called 1st                                                         | called after new                      |
| new(cls)                                                           | init(self)                            |
| returns an instance of the created type                            | returns nothing                       |
| Used to control instance creation                                  | Used to initialize instance variables |
| | Uses include:<br/>-                   |

 Uses for `__new__()` include:
 - Singletons
 - Conditionally created instances

### 3.6 Generators

Generators are a simple and powerful tool for creating iterators. They are written like regular functions but use the yield statement whenever they want to return data.

Each iteration, the generator resumes where it left off (the `for` statement calls `iter()` on the container object first, and then successively calls `__next__()`).

Some simple generators can be coded succinctly as expressions using a syntax similar to list comprehensions but with parentheses instead of square brackets:
```python
comp = [i for i in range(10000)]
gen = (i for i in range(10000))
```

These expressions are designed for situations where the generator is used right away by an enclosing function.

Generator expressions are more compact but less versatile than full generator definitions and tend to be more memory and time friendly than equivalent list comprehensions.



## 4 - Decorators

> A decorator in Python is a function that takes another function as its argument, and returns yet another function.

Decorators can be extremely useful as they allow the extension of an existing function, without any modification to the original function source code.

Modifying classes in this fashion is also possible.

### 4.1 Syntax
```python
# simple decorator
def my_decorator_with_a_verbose_name(ft):
    def inner(args):
        ft(args)
    return inner

@my_decorator_with_a_verbose_name
def func1(args):
    pass
```
Define the decorator function: 
- receive a function as argument: functions are first class objects that can be passed and returned (they're references :) ).
- define an inner function: functions that are defined within another function. They're bound to the parent's scope.

### 4.2 Decorate functions with arguments
```python
# decorator with arguments
def meta_decorator(meta_arg):
    def wrapper(ft):
        def inner(args):
            ft(meta_arg, args)
        return inner
    if callable(meta_arg):   # callable() --> True if function, method, class, instance.
        meta_arg = 'A default value'
        return wrapper(meta_arg)
    else:
      return wrapper 

@meta_decorator(meta_arg)   # hard-coded or variable value
def func2(args):
    pass

@meta_decorator     # default value
def func2(args):
    pass
```

### 4.3 Returning Values From Decorated Functions
```python
def decorator_that_returns(ft):
    def inner(arg):
        return ft(arg)  # return the return of the function call
    return inner

@decorator_that_returns
def func1(arg):
    return arg + 1
```

### 4.4 Decorating classes

```python
class Circle:
    def __init__(self, radius):
        self._radius = radius

    @property                   # base definition of .radius (needed)
    def radius(self):
        """Get value of radius"""
        return self._radius

    @radius.setter              # attach setter method to .radius
    def radius(self, value):
        """Set radius, raise error if negative"""
        if value >= 0:
            self._radius = value
        else:
            raise ValueError("Radius must be positive")

    @property           # a property without a setter method is immutable. can be retrieved without ()
    def area(self):
        """Calculate area inside circle"""
        return self.pi() * self.radius**2

    def cylinder_volume(self, height):
        """Calculate volume of cylinder with circle as base"""
        return self.area * height

    @classmethod
    def unit_circle(cls):
        """Factory method creating a circle with radius 1"""
        return cls(1)

    @staticmethod
    def pi():
        """Value of π, could use math.pi instead though"""
        return 3.1415926535
```
With decorators, you can control the setting/getting/deleting of a class attribute, aka turn them into properties/managed attributes.

### 4.5 Stateful Decorators

Decorators can keep track of a state.

#### About functools
- for higher-order functions: functions that act on or return other functions.
- `.update_wrapper(wrapper, wrapped, assigned=ARGSm updated=ARGS)`: update a wrapper function to look like the wrapped function. Optional arguments (tuples):
  - assigned: which attributes of the og function are assigned directly to the matching attributes on the wrapper function.
  - updated: which attributes of the wrapper function are updated with the corresponding attributes from the og function.
- `.wraps()` : convenience function for invoking `.update_wrapper()` as a function decorator when defining a wrapper function.

Using function attributes:
```python
import functools

def count_calls(func):
    @functools.wraps(func)
    def wrapper_count_calls(*args, **kwargs):
        wrapper_count_calls.num_calls += 1      # incrementing a function attribute
        # do stuff here
        return func(*args, **kwargs)
    wrapper_count_calls.num_calls = 0
    return wrapper_count_calls

@count_calls
def say_whee():
    print("Whee!")
```

Using a class as decorator (standard):
```python
import functools

class CountCalls:
    def __init__(self, func):       # must store a reference to the function
        functools.update_wrapper(self, func)
        self.func = func
        self.num_calls = 0

    def __call__(self, *args, **kwargs):    # called instead of the decorated function.
        self.num_calls += 1
        return self.func(*args, **kwargs)

@CountCalls
def say_whee():
    print("Whee!")
```
`__init__()` and `__call__()` need to be implemented.

### 4.6 Fun facts

- it's possible to decorate a function with several decorators (== nesting).
- use `@<decorator>.wraps(func)` to preserve the original function's introspection (`__wrapper__` attribute automatically created).
- `@functools.lru_cache`: decorator that stores the Least Recently Used cache


## 5 - Logging

> `Logging` is a means of **tracking events that happen when some software runs**. 

An event is described by a descriptive message which can optionally contain variable data (i.e. data that is potentially different for each occurrence of the event).
Events also have an importance (or severity) which the developer ascribes to the event.

### 5.1 Logging functions

Logging provides a set of convenience functions for simple logging usage: `debug()`, `info()`, `warning()`, `error()` and `critical()`:
- `logging.info()`: report events that occur during normal operation of a program (status monitoring etc),
- `logging.warning()`: issue a warning regarding a particular runtime event. If there is nothing the client application can do about the situation, but the event should still be noted,
- `logging.error()`, `logging.exception()` or `logging.critical()`: Report suppression of an error without raising an exception,


The logging functions are named after the level or severity of the events they are used to track.
- DEBUG: detailed information, typically of interest only when diagnosing problems,
- INFO: confirmation that things are working as expected,
- WARNING: an indication that something unexpected happened, or indicative of some problem in the near future (e.g. ‘disk space low’). The software is still working as expected,
- ERROR: due to a more serious problem, the software has not been able to perform some function,
- CRITICAL: a serious error, indicating that the program itself may be unable to continue running,

### 5.2 Logging to a file

```python
import logging
# vv The level argument describes the threshold for tracking.
logging.basicConfig(filename='example.log', encoding='utf-8', level=logging.DEBUG)
logging.debug('This message should go to the log file')
```


### 5.3 Advantages over `print()`
- more verbose/different severity == easier to maintain and debug efficiently,
- can log everything to a file, even when working with/logging from different modules,


## 6 - Virtual environments

Python applications will often use packages and modules that don’t come as part of the standard library. Applications will sometimes need a specific version of a library, because the application may require that a particular bug has been fixed or the application may be written using an obsolete version of the library’s interface.

This means it may not be possible for one Python installation to meet the requirements of every application.

The solution for this problem is to create a virtual environment, a self-contained directory tree that contains a Python installation for a particular version of Python, plus a number of additional packages.


### 6.1 `virtualenv`

> `virtualenv` is a tool to create isolated Python environments.

It creates an environment that has its own installation directories, that doesn’t share libraries with other virtualenv environments (and optionally doesn’t access the globally installed libraries either).


`virtualenv` has one basic command:
``` sh
virtualenv <directory>
```
This will create a python virtual environment of the same version as virtualenv, in the given directory.


The tool works in two phases:
- Phase 1 **discovers a python interpreter** to create a virtual environment from (by default this is the same python as the one virtualenv is running from, however we can change this via the p option).
- Phase 2 **creates a virtual environment** at the specified destination. This can be broken down into four further sub-steps:
  - create a python that matches the target python interpreter from phase 1,
  - install (bootstrap) seed packages (pip/setuptools/wheel) in the created virtual environment,
  - install activation scripts into the binary directory of the virtual environment.
  - create files that mark the virtual environment as to be ignored by version control systems. This step can be skipped with the no-vcs-ignore option.


#### 6.1.1 Python discovery

`virtualenv` being a python application has always at least one such available, the one virtualenv itself is using, and as such this is the **default discovered element**.

Created python virtual environments are usually not self-contained. A complete python packaging is usually made up of thousands of files, so it’s not efficient to install the entire python again into a new folder. Instead virtual environments are mere shells, that contain little within themselves, and borrow most from the system python.


The CLI flag `p` or `python` allows you to specify a python specifier for what type of virtual environment you would like, the format is either:
- a relative/absolute path to a Python interpreter,
- a specifier identifying the Python implementation, version, architecture in the following format:
  ```bash
  <python implementation name><version><architecture>
  ```

#### 6.1.2 Creators

These are what actually set up the virtual environment, usually as a reference against the system python.

`virtualenv` at the moment has two types of virtual environments:
- `venv` --> this delegates the creation process towards the venv module. This is only available on Python interpreters having version 3.5 or later.
- `builtin` --> this means `virtualenv` is able to do the creation operation itself (by knowing exactly what files to create and what system files need to be referenced).

#### 6.1.3 Seeders

These will install for you some seed packages (pip/setuptools/wheel) that enables you to install additional python packages into the created virtual environment (by invoking pip). 
There are two main seed mechanism available:
- `pip` --> uses the bundled pip with virtualenv to install the seed packages !!! a new child process needs to be created to do this, which can be expensive.
- `app-data` --> this method uses the user application data directory to create install images. These images are needed to be created only once, and subsequent virtual environments can just link/copy those images into their pure python library path (the site-packages folder). This allows all but the first virtual environment creation to be blazing fast (a pip mechanism takes usually 98% of the virtualenv creation time).

#### 6.1.4 Activators

These are activation scripts that will mangle with your shell’s settings to ensure that commands from within the python virtual environment take priority over your system paths. For example, if invoking pip from your shell returned the system python’s pip before activation, once you do the activation this should refer to the virtual environments pip.
<br/>Note, though that all we do is change priority; so, if your virtual environments bin/Scripts folder does not contain some executable, this will still resolve to the same executable it would have resolved before the activation.

The location of these is right alongside the python executables (`/bin` on POSIX).<br/>
Nomenclature: and are named as activate bin/activate(+for all except bash, an extension).


### 6.2 `pyenv`

`pyenv` lets you easily switch between multiple versions of Python. It's simple, unobtrusive, and follows the UNIX tradition of single-purpose tools that do one thing well.

Once activated, it prefixes the PATH environment variable with `~/.pyenv/shims`, where there are special files matching the Python commands (python, pip).
<br/>These are not copies of the Python-shipped commands; they are special scripts that decide on the fly which version of Python to run based on the `PYENV_VERSION` environment variable, the `.python-version` file, or the `~/.pyenv/version` file.

`pyenv` also makes the process of downloading and installing multiple Python versions easier, using the command pyenv install.


## SOURCES

### Classes:
- [Decorators <3](https://realpython.com/primer-on-python-decorators/#stateful-decorators)
- [`__new__` vs `__init__`](https://stackoverflow.com/questions/35452178/what-can-init-do-that-new-cannot)
- [`type()` returns classes](https://python.plainenglish.io/creating-a-class-in-python-without-the-class-keyword-67ce84bae22)

### Python related:
- [Scopes](https://realpython.com/python-scope-legb-rule/)
- [Packaging for distribution](https://bbc.github.io/cloudfit-public-docs/packaging/this_way_up.html)
- [Gotchas](https://docs.python-guide.org/writing/gotchas/#mutable-default-arguments)

### Others: 
- [`lxml etree`](https://lxml.de/tutorial.html) or [lxml parsing](https://lxml.de/parsing.html)
- [`sqlite` tutorial](https://www.sqlitetutorial.net/)
