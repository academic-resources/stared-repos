# Exceptions

Built-in exceptions and easy exception handling is one of the shining features of Python.

An un-handled eception is fatal: it will print debugging information (called a _traceback_), stop the interpreter and exit your program.

Once you learn how to handle Exceptions, you can cover your bases and write programs that are robust in the face of issues.

## Types of Exceptions

Python has many useful built-in exceptions that you'll probably encounter in your travels. Some of the most common are:

| Exception	| Cause of Error |
| --------- | -------------- |
| AttributeError | Raised when attribute assignment or reference fails. |
| ImportError | Raised when the imported module is not found. |
| IndexError | Raised when index of a sequence is out of range. |
| KeyError | Raised when a key is not found in a dictionary. |
| KeyboardInterrupt | Raised when the user hits interrupt key (Ctrl+c or delete). |
| NameError | Raised when a variable is not found in local or global scope. |
| SyntaxError | Raised by parser when syntax error is encountered. |
| IndentationError | Raised when there is incorrect indentation. |
| ValueError | Raised when a function gets argument of correct type but improper value. |

You can find all Built-in Exceptions in [Python's documentation](https://docs.python.org/3/library/exceptions.html).

## Exception Hierarhy

> Exceptions are just objects.

They follow an inheritance hierarchy. For example, the `ZeroDivisionError` is a subclass of `ArithmeticError`, which is a subclass of `Excepiton`, itself a subclass of `BaseException`.

So, if you wanted to catch a divide-by-zero error, you could use `except ZeroDivisionError`, but you could also use `except ArithmeticError`, which would also catch `OverflowError` and `FloatingPointError`.

You can use `except Exception`,but this is generally not a good idea, as it will catch almost _every_ type of error, even ones you weren't expecting.

## Exiting your program

*  `ctrl-c`, the age-old POSIX method of sending SIGINT to a program.
* `sys.exit()`, by default exists with `0`, by POSIX convention, signal success.
    * You can pass a custom integer.
    * You can pass a string, which will get printed to the command line, alogn with a return code of `1`.
* `sys.exit()` generates a `SystemExit` exception, which inherits from the master `BaseException` class, whih makes it possible for clean-up handlers (such as `finally` statements) to run. 

## Try - Except

In Python, we use the keywords:
* `try`: code that can possibly throw an exception.
* `except`: code that runs if an exception is raised.
* `else`: optional block that runs if no exception was raise
* `finally`: optional block that will run last, regadless of if an exception was raised.

A basic example:
```python
try:
    x = int(input("Enter a number: "))
except ValueError:
    print("That number was invalid")
```

### The `except` clause

An `except` clause muy have multiple exceptions, given as a parenthesized tuple:

```python
try:
    # Code to try
except (RuntimeError, TypeError, NameError):
    # Code to run if one of these exceptions happens
```

A `try` statement can also have more than one `except` clause that will be __evaluated in order__.
```python
try:
    # Code to try
except RuntimeError:
    # ...
except TypeError:
    # ...
except NameError:
    # ...
```

### `finally`

This optional blocks runs last. This is good for doing any cleanup that you want to happen, whether or not an exception is thrown.

```python
try:
    raise KeyboardInterrupt
finally:
    print("Goodbye!")
```

## Best Practices

1. Catch More Specific Exceptions First.
2. Don't catch `Exception`.
3. Defintely don't catch `BaseException`.

## Custom Exceptions

It's super easy to create custom exceptions that are just regular clases tat inherit from the `Exception` class, thus making our programs easier to follow and more readable.

```python
class MyCustomException(Exception):
    pass

raise MyCustomException()
```

You can get more detailed if you want, sending additional information, etc.

```python
class IncorrectValueError(Exception):
    def __init__(self, value):
        message = f"Got an incorrect value of {value}"
        super().__init__(message)

my value = 9999
if my_value > 100:
    raise IncorrectValueError(my_value)
```

If we wanted to make an exception for an API for example:
```python
class MyApiException(Exception):
    def __init__(self, status_code):
        if status_code == 403:
            message = "Rate limit reached. Please wait a minute and retry."
        else:
            message = f"HTTP Status Code was: {status_code}"

        super().__init__(message)
```