
[//]: # (TITLE PY basics)
[//]: # (ENDPOINT /py)

# ESSENTIAL PYTHON

<!-- markdown-toc start - Don't edit this section. Run M-x markdown-toc-refresh-toc -->
##### Table of contents

- [1 - Data](#1---data)
    - [1.1 - Argument types](#11---argument-types)
    - [1.2 - Data types: sequences](#12---data-types-sequences)
- [2 - Classes](#2---classes)
    - [2.1 - Class objects](#21---class-objects)
    - [2.2 - Instance objects](#22---instance-objects)
    - [2.3 - Methods](#23---methods)
        - [2.3.1 - Instance methods](#231---instance-methods)
        - [2.3.2 - Class methods](#232---class-methods)
        - [2.3.3 - Static methods](#233---static-methods)
        - [2.3.4 - Special methods](#234---special-methods)
        - [2.3.5 - In sum](#235---in-sum)
    - [2.4 - Inheritance](#24---inheritance)
    - [2.5 - Private Variables](#25---private-variables)
    - [2.6 - Keywords](#26---keywords)
        - [2.6.1 - `super()`](#261---super)
        - [2.6.2 - `__new__()` vs `__init__()`](#262---__new__-vs-__init__)
    - [2.7 - Generators](#27---generators)
- [3 - Decorators](#3---decorators)
    - [3.1 - Syntax](#31---syntax)
    - [3.2 - Decorate functions with arguments](#32---decorate-functions-with-arguments)
    - [3.3 - Returning Values From Decorated Functions](#33---returning-values-from-decorated-functions)
    - [3.4 - Decorating classes](#34---decorating-classes)
    - [3.5 - Stateful Decorators](#35---stateful-decorators)
    - [3.6 - Fun facts](#36---fun-facts)
- [4 - Logging](#4---logging)
    - [4.1 - Logging functions](#41---logging-functions)
    - [4.2 - Logging to a file](#42---logging-to-a-file)
    - [4.3 - Advantages over `print()`](#43---advantages-over-print)
- [Sources](#sources)

<!-- markdown-toc end -->



## 1 - Data

### 1.1 - Argument types

<table>
	<thead>
		<tr><th>Type</th><th>Definition</th><th>Example</th></tr>
	</thead>
	<tbody>
		<tr>
			<td>Positional argument</td>
			<td> Value gets assigned to the argument by its <b>position</b> when the function is <b>called</b>.</td>
			<td><code>ft(30, 40)</code></td>
		</tr>
		<tr>
			<td>Keyword/named argument</td>
			<td>Value gets assigned to the argument by its <b>keyword</b> when the function is <b>called</b>.<br>They should always follow positional arguments.</td>
			<td><code>ft(arg1=3, arg2=420)</code></td>
		</tr>
		<tr>
			<td>Default argument</td>
			<td>Parameter assigned a <b>default value on definition</b>.<br>They should always follow non-default parameters.</td>
			<td><code>def ft(arg1, arg2=69)</code></td>
		</tr>
		<tr>
			<td>Arbitrary-length arguments</td>
			<td>

Allows **multiple arguments** to be passed to a function.
- Positional: `*args`. Treat like a regular tuple.
- Keyword: `**kwargs`. Treat like a regular dict.
 
</td>
<td>
			
```python
def percentage(**kwargs):
    for sub in kwargs:
        # get argument name
        sub_name = sub

        # get argument value
        sub_marks = kwargs[sub]
```

</td>
</tr>
</tbody>
</table>

### 1.2 - Data types: sequences

> Sequences are iterables which support **efficient element access** using **integer indices** via the `__getitem__()` special method and define a `__len__()` method that returns the length of the sequence. Some built-in sequence types are **list, str, tuple, and bytes**. 

Other iterable data types: strings, dicts, file objects, and objects of any classes you define with an `__iter__()` method or with a `__getitem__()` method that implements Sequence semantics.

Iterables that aren't sequences:
- dicts also support `__getitem__()` and `__len__()`, but are considered a **mapping** because the **lookups use arbitrary immutable keys** rather than integers.
- sets, they have no order, and they can't be indexed.


Data is **packed** in sequences, and can be unpacked like this:

```python
t = 12345, 54321, 'hello!'
x, y, z = t
```


##### Sequences list

<table>
	<thead>
		<tr><th>Type</th><th>Syntax</th><th>Quirks</th></tr>
	</thead>
	<tbody>
<tr>
<td>List</td>
<td>

```python
empty = []
squares = [1, 4, 9]
squares = [x**2 for x in range(10)]
```
			
</td>
<td>

- Mutable and usually homogenous.
- Supports operations like concatenation and slicing.
- Allows comprehensions.

</td>
</tr>

<tr>
<td>Tuple</td>
<td>

```python
empty = ()
tup = 'hello',  # <-- ,
tup2 = (12345, 'hello!')
```

</td>
<td>

- Immutable but mutable data.
- Usually heterogenous.

</td>
</tr>

<tr>
<td>Set - but it's not a sequence</td>
<td>

```python
empty = set()
basket = {'apple', 'orange'}
a = {x for x in 'abracadabra' if x not in 'abc'}
```

</td>
<td>

- Mutable.
- Supports mathematical operations like union, intersection, difference.
- Unordered collection with no duplicate elements.
- Allows comprehensions.

</td>
</tr>

</tbody>
</table>


## 2 - Classes

> Classes provide a means of **bundling data and functionality together**. Each class instance can have **attributes** attached to it for **maintaining its state**, and **methods** (defined by its class) for **modifying its state**.

New class == new type of object.<br/>
New instance == new object of that type.


Python implements:
- **Class inheritance** (--> multiple base classes), 
- **Overriding** of base class.es methods by derived classes,
- Methods able to **call the method of a base class** with the same name,

Objects can contain **arbitrary amounts and kinds of data**. As is true for modules, classes partake of the dynamic nature of Python: they are **created at runtime**, and can be **modified further after creation**.

### 2.1 - Class objects

Class objects support two kinds of operations: **attribute references** and **instantiation**.

```python
class MyClass:
    """A simple example class"""	# docstring, returned by the __doc__ attribute
    i = 12345

    def f(self):
        return 'hello world'
```

- Attribute reference: `MyClass.i` or `MyClass.f`.
- Class instantiation uses function notation: `x = MyClass()`. 

The **instantiation** operation ("calling" a class object) **creates an empty object**. Many classes like to create objects with instances customized to a specific initial state.  Therefore, a class may define a special method named `__init__()`, like this:

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

### 2.2 - Instance objects

The only operations understood by instance objects are **attribute references**. There are two kinds of valid attribute names: 
- **data attributes**: instance variables. They don't require declaration and are "sprung into existence" at the first assignment.
- **methods**: functions that belong to an object. Method objects can be stored in variables and called later.


### 2.3 - Methods

Methods are **functions associated with classes or objects**.

#### 2.3.1 - Instance methods

```python
def my_method(self):
    # do stuff
```

Instance methods are used to **access or modify the object state**. If we use instance variables inside a method, such methods are called instance methods. It must have a `self` parameter to refer to the current object.

#### 2.3.2 - Class methods

```python
@classmethod
def my_method(cls):
    # do stuff
```
Class methods **receive the class as an implicit first argument**, just like an instance method receives the instance (`self`).
They can **access and modify a class state** that would apply across all the instances of the class.

#### 2.3.3 - Static methods

```python
@staticmethod
def my_method():
    # do stuff
```
**Static methods aren't bound to an instance**. They **don't receive an implicit first argument**, and they **can't access or modify the class state**.

They are present in a class because it makes sense for the method to be present in class. They can be called on the class, in the instance, or as regular functions.

#### 2.3.4 - Special methods

```python
def __my_special_method__(self):
    # do stuff
```
Special (or magic) methods are **methods called implicitly by Python** to execute a certain operation on a type. Examples: `__init__`, `__get_attr__`, `__next__`...

#### 2.3.5 - In sum

- **Static** methods and **class** methods are both **bound to a class rather than an object**.
- Generally, **class** methods are used to create **factories**, and **static** methods are used to create **utility** functions.
- **Special** methods can be used for **type emulation**.


### 2.4 - Inheritance

```python
class DerivedClassName(BaseClassName):
    # statements here

class DerivedClassName(modname.BaseClassName):
    # statements here
```
Classes can **inherit from other classes**, if the base class is defined in a scope containing the derived class definition.

In place of a base class name, **other arbitrary expressions are also allowed**. This can be useful, for example, when the base class is defined in another module.

**Method references** are resolved as follows: the **corresponding class attribute** is searched, **descending the chain of base classes** if necessary, and the method reference is valid if this yields a function object.

Derived classes may **override methods of their base classes**. An overriding method in a derived class may in fact want to **extend rather than simply replace** the base class method of the same name. To do so, **methods can call the base class method directly** with `super()`.

Python has two built-in functions that work with inheritance:
- Use `isinstance()` to check an instance's type.
- Use `issubclass()` to check class inheritance.


Python supports a form of multiple inheritance as well. A class definition with multiple base classes looks like this:

```python
class DerivedClassName(Base1, Base2, Base3):
    # statements here
```

MRO (Method Resolution Order) is a concept used in inheritance. It is the **order in which a method is searched for** in a classe's hierarchy.

In Python, the MRO is from **bottom to top and left to right**. This means that, first, the method is searched in the class of the object. If it's not found, it is searched in the immediate super class. In the case of multiple super classes, it is recursively searched left to right, in the order by which was declared by the developer.

In fact, it is slightly more complex than that; the method resolution order changes dynamically to support cooperative calls to `super()`.

### 2.5 - Private Variables

"Private" instance variables that cannot be accessed except from inside an object **don't exist in Python**.

However, there is a **convention** that is followed by most Python code: a name prefixed with an **underscore** (e.g. _spam) should be **treated as a non-public** part of the API (whether it is a function, a method or a data member).

### 2.6 - Keywords

#### 2.6.1 - `super()`

**Returns a proxy object that delegates method calls to a parent or sibling class of type**. This is useful for **accessing inherited methods** that have been overridden in a class.

There are two typical use cases for `super()`:
- In a **class hierarchy with single inheritance**, it can be used to **refer to parent classes** without naming them explicitly, thus making the code more maintainable.
- It allows **support of cooperative multiple inheritance in a dynamic execution environment**. This makes it possible to implement "diamond diagrams" where multiple base classes implement the same method. 

In addition to method lookups, `super()` **also works for attribute lookups**. One possible use case for this is **calling descriptors in a parent or sibling class**.

#### 2.6.2 - `__new__()` vs `__init__()`

| `new()`  --> constructor                    | `init()`  --> initializer                 |
|:--------------------------------------------|:------------------------------------------|
| Called first                                | Called after `new()`                      |
| `new(cls)`                                  | `init(self)`                              |
| Returns an **instance** of the created type | Returns **nothing**                       |
| Used to **control instance creation**       | Used to **initialize instance variables** |

Uses for `__new__()` include **singletons**, conditionally created instances.

### 2.7 - Generators

Generators are a simple and powerful tool for **creating iterators**. They are written like regular functions but **use the yield statement whenever they want to return data**.

**Each iteration**, the generator **resumes where it left off**: the `for` statement calls `iter()` on the container object first, and then successively calls `__next__()`.

Some simple **generators can be coded succinctly** as expressions using a **syntax similar to list comprehensions but with parentheses** instead of square brackets:
```python
comp = [i for i in range(10000)]
gen = (i for i in range(10000))
```

These expressions are designed for situations where the generator is **used right away** by an **enclosing function**.

Generator expressions are **more compact** but **less versatile** than full generator definitions, and tend to be **more memory and time friendly than equivalent list comprehensions**.


## 3 - Decorators

> A decorator in Python is a **function that takes another function as its argument**, and **returns yet another function**. Decorators can be extremely useful as they **allow the extension of an existing function**, without any modification to the original function source code.

Modifying classes in this fashion is also possible.

### 3.1 - Syntax

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
- Receive a **function as argument**: functions are first class objects that can be passed and returned (they're references :) ).
- Define an **inner function**: functions that are defined within another function. They're **bound to the parent's scope**.

### 3.2 - Decorate functions with arguments

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

### 3.3 - Returning Values From Decorated Functions

```python
def decorator_that_returns(ft):
    def inner(arg):
        return ft(arg)  # return the return of the function call
    return inner

@decorator_that_returns
def func1(arg):
    return arg + 1
```

### 3.4 - Decorating classes

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

With decorators, you can **control the setting/getting/deleting of a class attribute**, aka turn them into properties/managed attributes.

### 3.5 - Stateful Decorators

Decorators can **keep track of a state**.

About functools
- For higher-order functions: functions that act on or return other functions.
- `.update_wrapper(wrapper, wrapped, assigned=ARGS, updated=ARGS)`: update a wrapper function to look like the wrapped function. Optional arguments (tuples):
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

### 3.6 - Fun facts

- It's possible to decorate a function with several decorators (== nesting).
- Use `@<decorator>.wraps(func)` to preserve the original function's introspection (`__wrapper__` attribute automatically created).
- `@functools.lru_cache`: decorator that stores the Least Recently Used cache.


## 4 - Logging

> `Logging` is a means of **tracking events that happen when some software runs**. 

An event is described by a descriptive message which can optionally contain variable data (i.e. data that is potentially different for each occurrence of the event).
Events also have an importance (or severity) which the developer ascribes to the event.

### 4.1 - Logging functions

Logging provides a set of convenience functions for simple logging usage: `debug()`, `info()`, `warning()`, `error()` and `critical()`:
- **DEBUG**: detailed information, typically of interest only when diagnosing problems.
- **INFO**: confirmation that things are working as expected.
- **WARNING**: an indication that something unexpected happened, or indicative of some problem in the near future (e.g. ‘disk space low'). The software is still working as expecte.
- **ERROR**: due to a more serious problem, the software has not been able to perform some function.
- **CRITICAL**: a serious error, indicating that the program itself may be unable to continue running.

### 4.2 - Logging to a file

```python
import logging

# vv The level argument describes the threshold for tracking.
logging.basicConfig(filename='example.log', encoding='utf-8', level=logging.DEBUG)
logging.debug('This message should go to the log file')
```


### 4.3 - Advantages over `print()`
- More verbose/different severity == easier to maintain and debug efficiently.
- Can log everything to a file, even when working with/logging from different modules.



## Sources

Classes:
- [Decorators <3](https://realpython.com/primer-on-python-decorators/#stateful-decorators)
- [`__new__` vs `__init__`](https://stackoverflow.com/questions/35452178/what-can-init-do-that-new-cannot)
- [`type()` returns classes](https://python.plainenglish.io/creating-a-class-in-python-without-the-class-keyword-67ce84bae22)

Python related:
- [Scopes](https://realpython.com/python-scope-legb-rule/)
- [Packaging for distribution](https://bbc.github.io/cloudfit-public-docs/packaging/this_way_up.html)
- [Gotchas](https://docs.python-guide.org/writing/gotchas/#mutable-default-arguments)


Others: 
- [`lxml etree`](https://lxml.de/tutorial.html) or [lxml parsing](https://lxml.de/parsing.html)
- [`sqlite` tutorial](https://www.sqlitetutorial.net/)
