[//]: # (TITLE PEP8)
[//]: # (ENDPOINT /pep8)
[//]: # (PRIORITY 2)

# PEP 8

PEP 8 is a document that provides **guidelines and best practices** on how to write Python code. The primary focus of PEP 8 is to **improve the readability and consistency** of Python code.

<!-- markdown-toc start - Don't edit this section. Run M-x markdown-toc-refresh-toc -->
##### Table of contents

- [1 - Naming styles](#1---naming-styles)
- [2 - Code layout](#2---code-layout)
- [3 - Comments](#3---comments)
    - [3.1 - Block comments](#31---block-comments)
    - [3.2 - Inline comments](#32---inline-comments)
    - [3.3 - Docstrings](#33---docstrings)
- [4 - Whitespaces](#4---whitespaces)
- [5 - Other recommendations](#5---other-recommendations)
- [Sources](#sources)

<!-- markdown-toc end -->


## 1 - Naming styles

Names should be **short** and **descriptive**, **reflect usage** rather than implementation. Avoid abbreviations.


| Type     | Naming convention                                    | Examples                    |
|----------|------------------------------------------------------|-----------------------------|
| Function | Lowercase word.s separated by underscores.           | `function`, `my_function`   |
| Variable | Lowercase letter or word.s separated by underscores. | `i`, `var`, `my_var`        |
| Class    | CamelCase                                            | `Model`, `MyClass`          |
| Method   | See function.                                        | `method`, `my_method`       |
| Constant | Uppercase letter or word.s separated by underscores. | `CONST`, `MY_CONST`         |
| Module   | Short lowercase word.s separated by underscores.     | `module.py`, `my_module.py` |
| Package  | Short, lowercase words NOT separated                 | `package`, `my_package`     |


## 2 - Code layout

- Surround top-level **functions and classes** with **two** blank lines.
- Surround **method** definitions inside classes with **one** blank line. 
- Use blank lines sparingly inside functions to show **clear logical steps**. 
- Lines should be limited to **79 characters** or break lines with **backslashes**. It's fine to go a little over since we have bigger monitors now.
- Use **4** consecutive **spaces** to indicate indentation.

## 3 - Comments

You should use comments to document code as it's written.

### 3.1 - Block comments

Block comment **document a small section** of code:

```python
for i in range(0, 10):
    # Loop over i ten times and print out the value of i, followed by a
    # new line character.
	# 
	# Paragraph number 2.
    print(i, '\n')
```

### 3.2 - Inline comments

Inline comments **explain a single statement** in a piece of code:

```python
x = 'John Smith'  # Student Name
```

They are useful to remind you, or explain to others, why a certain line of code is necessary.

### 3.3 - Docstrings

Docstrings, are strings enclosed in double (`"""`) or single (`'''`) quotation marks that appear on the first line of any function, class, method, or module. You can use them to **explain and document a specific block** of code:

```python
def quadratic(a, b, c, x):
    """Solve quadratic equation via the quadratic formula.

    A quadratic equation has the following form:
    ax**2 + bx + c = 0

    There always two solutions to a quadratic equation: x_1 & x_2.
    """
    x_1 = (- b+(b**2-4*a*c)**(1/2)) / (2*a)
    x_2 = (- b-(b**2-4*a*c)**(1/2)) / (2*a)

    return x_1, x_2

# OR
def quadratic(a, b, c, x):
    """Use the quadratic formula"""
    x_1 = (- b+(b**2-4*a*c)**(1/2)) / (2*a)
    x_2 = (- b-(b**2-4*a*c)**(1/2)) / (2*a)

    return x_1, x_2
```

## 4 - Whitespaces

Surround with a **single space on both sides**: **assignment operators** (`=`, `+=`, `-=`), **comparisons** (`==`, `!=`, `>`, `<=`, `is`, `is not`, `in`, `not in`), **booleans** (`and`, `not`, `or`).

When there's more than one operator in a statement, only add whitespace around the operators with the lowest priority.

When `=` is used to assign a default value to a function argument, do not surround it with spaces.

```python
x = 3

y = x**2 + 5
z = (x+y) * (x-y)

if x>5 and x%2==0:
    print('x is larger than 5 and divisible by 2!')
	

def function(default_parameter=5):
    # ...
	
# Treat the colon as the operator with lowest priority
list[x+1 : x+2]

# The space is omitted if a slice parameter is omitted
list[x+1 : x+2 :]

```

## 5 - Other recommendations

- Don't compare Boolean values to `True` or `False` using the equivalence operator. 
- Use the fact that empty sequences are falsy in `if` statements. 
- Use `is not` rather than `not ... is` in `if` statements.
- Don't use `if x:` when you mean `if x is not None:`.
- Use `.startswith()` and `.endswith()` instead of slicing.\


## Sources

- [PEP8 doc](https://peps.python.org/pep-0008/) and [Real Python](https://realpython.com/python-pep8/)

