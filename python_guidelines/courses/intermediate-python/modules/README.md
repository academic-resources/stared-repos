# Libraries & Modules

## Standard Library

Python has always had a "batteries included" pilosophy, having a rich and versatile standard library which is immediately available, without making the user download separate packages.

We have modules such as:
* `sys`: system-specific parameters and functions.
* `os`: miscellaneous operating system interfaces.
* `math`: advanced math functionalities.
* `json`: json parser and encoder.

You have built-in libraries for database access, logging, internet protocols, multimedia, debugging, and even libraries for extending Python itself.

Check the [full list of modules in the Python's Standard Library documentation](https://docs.python.org/3/library/)

## Modules & Imports

PYthon has a simple package structure. Any directory with a file named `__init__.py` can be considered a Python module.

> The __init__.py file is no longer required for Python3 modules, but it's still supported and can be useful.

For example, we can create a basic function in a new module to reuse it:
```python
def add_numbers(x, y):
    return x + y
```

If we put this function in a folder called `my_math_functions` with a `__init__.py` file, we can import it from other modules.

If we have the folder somewhere in our `PYTHONPATH`, we can `import my_math_functions` directly.

```python
import my_math_functions
my_math_functions.add_nubmers(1, 2)
```

## Best Practices

1. Don't import everything from a module, it's really hard to there where a specific function is comin from without the namespace context.
```python
from my_math_functions import *
add_numbers(1, 2)
```

2. Import functions specifically or the whole module as namespace.
```python
from my_math_functions import add_numbers
```

3. You can use the `as` keyword to rename modules
```python
import my_math_functions as mmf
```

## PyPi

The _Python Package Index_ is an awesome service that helps you find and install software developed and shared by the Python community.

You can access from the website [pypy.org](https://pypi.org/) or interact with it through Python's `pip` tool.

```bash
python -m pip install SomePackage
```


