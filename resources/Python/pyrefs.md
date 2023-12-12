[//]: # (TITLE PY references)
[//]: # (ENDPOINT /pyrefs)


# Python references

<!-- markdown-toc start - Don't edit this section. Run M-x markdown-toc-refresh-toc -->
##### Table of contents

- [1 - Builtins](#1---builtins)
- [2 - List methods](#2---list-methods)
- [3 - Dictionary methods](#3---dictionary-methods)
- [4 - String methods](#4---string-methods)
- [X - Tuple Methods](#x---tuple-methods)
- [X - Set Methods](#x---set-methods)
- [X - File Methods](#x---file-methods)
- [X - Keywords](#x---keywords)
- [X - Exceptions](#x---exceptions)
- [Sources](#sources)

<!-- markdown-toc end -->


## 1 - Builtins

The Python interpreter has a number of functions and types built into it that are always available. 

| Function                       | Description                                                                                                                                                                  |
|--------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `abs(x)`                       | Returns the absolute value of a number.                                                                                                                                      |
| `all(iter)`                    | Returns `True` if all items in an iterable object are `True`.                                                                                                                |
| `any(iter)`                    | Returns `True` if any item in an iterable object is `True`.                                                                                                                  |
| `bin(x)`                       | Convert and return an integer to a binary string.                                                                                                                            |
| `callable(obj)`                | Returns `True` if the specified object is callable, otherwise `False`.                                                                                                       |
| `compile(...)`                 | Compile the source into a code or AST object. Code objects can be executed by `exec()` or `eval()`.                                                                          |
| `delattr(obj, name)`           | Deletes the specified attribute (property or method) from the specified object.                                                                                              |
| `dir(obj)`                     | Returns a list of the specified object's properties and methods  .                                                                                                           |
| `divmod(a, b)`                 | Returns the quotient and the remainder when `a` is divided by `b`.                                                                                                           |
| `enumerate(iter)`              | Takes a collection and returns it as an enumerate object.                                                                                                                    |
| `eval(...)`                    | Evaluates and executes an expression.                                                                                                                                        |
| `exec(...)`                    | Executes the specified code (or object).                                                                                                                                     |
| `filter(fct, iter)`            | Use a filter function to exclude items in an iterable object.                                                                                                                |
| `format(val, format_spec)`     | Convert a value to a "formatted" representation, as controlled by `format_spec`.                                                                                             |
| `getattr(obj, name)`           | Returns the value of the specified attribute (property or method).                                                                                                           |
| `globals()`                    | Returns the current global symbol table as a dictionary.                                                                                                                     |
| `hasattr(obj, name)`           | Returns `True` if the specified object has the specified attribute (property/method).                                                                                        |
| `hash(obj)`                    | Return the hash value of the object (if it has one). Hash values are integers. They are used to quickly compare dictionary keys during a dictionary lookup.                  |
| `help()`                       | Invoke the built-in help system.                                                                                                                                             |
| `hex(x)`                       | Converts a number into a hexadecimal value.                                                                                                                                  |
| `id(obj)`                      | Returns the id of an object.                                                                                                                                                 |
| `input(?prompt)`               | Reads, converts and returns user input.                                                                                                                                      |
| `isinstance(obj, clsinfo)`     | Returns `True` if `obj` is an instance of the `clsinfo` argument.                                                                                                            |
| `issubclass(cls, clsinfo)`     | Returns `True` if `cs` is a subclass of the `clsinfo` argument.                                                                                                              |
| `iter(obj)`                    | Returns an iterator object.                                                                                                                                                  |
| `len(obj)`                     | Returns the length of an object.                                                                                                                                             |
| `locals()`                     | Returns an updated dictionary of the current local symbol table.                                                                                                             |
| `map(fct, iter)`               | Returns the specified iterator with the specified function applied to each item.                                                                                             |
| `max(iter, ?key)`              | Returns the largest item in an iterable, according to the `key` defined order if present.                                                                                    |
| `min(iter, ?key)`              | Returns the smallest item in an iterable, according to the `key` defined order if present.                                                                                   |
| `next(iter)`                   | Returns the next item in an iterable.                                                                                                                                        |
| `oct(x)`                       | Converts a number into an octal.                                                                                                                                             |
| `open(file, mode)`             | Opens a file and returns a file object.                                                                                                                                      |
| `pow(base, exp)`               | Returns the value of `base` to the power of `exp`.                                                                                                                           |
| `print(*objs)`                 | Prints to the standard output device.                                                                                                                                        |
| `range(?start, stop, ?step)`   | Returns a **sequence** of numbers, starting from 0 or `start` and increments by 1 or `step`.                                                                                 |
| `repr(obj)`                    | Returns a readable version of an object.                                                                                                                                     |
| `reversed(seq)`                | Returns a reversed sequence.                                                                                                                                                 |
| `round(x)`                     | Rounds a number.                                                                                                                                                             |
| `setattr(obj, name, val)`      | Sets an attribute (property/method) of an object.                                                                                                                            |
| `slice(?start, stop, ?step)`   | Returns a slice object.                                                                                                                                                      |
| `sorted(iter, ?key, ?reverse)` | Returns a sorted list, according to the `key` defined order if present. Defaults to ascending order.                                                                         |
| `sum(iterable, ?start)`        | Sums start and the items of an iterable from left to right and returns the total.                                                                                            |
| `super(?type)`                 | Return a proxy object that delegates method calls to a parent or sibling class of type. This is useful for accessing inherited methods that have been overridden in a class. |
| `type(obj)`                    | Returns the type of an object.                                                                                                                                               |
| `vars(obj)`                    | Returns the `__dict__` attribute of a odule, class, instance, or any other object with a `__dict__` attribute.                                                               |
| `zip(*iter, ?strict)`          | Iterate over several iterables in parallel, producing tuples with an item from each one.                                                                                     |


https://stackoverflow.com/questions/2220699/whats-the-difference-between-eval-exec-and-compile


## 2 - List methods

## 3 - Dictionary methods

## 4 - String methods

## X - Tuple Methods
## X - Set Methods
## X - File Methods
## X - Keywords
## X - Exceptions



## Sources

- [Official Python doc - builtins](https://docs.python.org/3/library/functions.html)