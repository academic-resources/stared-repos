# Decorators

Returns a callable wrapped by another callable.

#### Syntax

```python
def decorator(f):
    pass

@decorator
def function():
    pass
```

Is equivalent to:
```python
def function():
    pass
function = decorator(function)
```

#### Example

```python
def decorator(f):
    def inner():
        print('Before')
        retval = f()
        print('After')
        return retval
    return inner

@decorator
def example():
    print('inside')

# example()
# >>> before
# >>> inside
# >>> after
```

#### Abstract

The current method for transforming functions and methods (for instance, declaring them as class or static method) is awkward and can lead to code that is difficult to understand. Ideally, these transformations should be made at the same point in the code where the declaration itself is made.

#### Motivation

The current method of applying a transformation to a function or method places the actual transformation after the function body. For large functions this separates a key component of the function's behavior from the definition of the rest of the function's external interface.

```python
def foo(self):
    # ops
foo = synchronized(lock)(foo)
foo = classmethod(foo)
```

This becomes less redeable with longer methods. The alternative places the decoration in funtion's declaration:

```python
@classmethod
@synchronized(lock)
def foo(cls):
    pass
```

## [Generators](https://docs.python.org/3/c-api/gen.html?highlight=generator#generator-objects)