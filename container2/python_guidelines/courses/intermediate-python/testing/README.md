# Testing

Unit testing is a software testing method by which individual functions are tested in an automated fashion to determine if tey are fit for use.

It does not only help you _discover and fix bugs quickar and easier_, but by writing them alognside or even before your functions, they can help you wriet cleaner and more bug-free code from the very start.

## Types of test

1. __Unit tests__: operate on the samllest testable unit of code, usualy a function that performs a single action or operation.
2. __Integration tests__: checks to see if different units or modules of code work together as a group.
3. __Functional/End-to-End tests__: operates on units of functionality, to make sure a specific function of the software is working, which may involve several units of software or whole systems working together.

## Assertions

Python comes with a handy-dandy `assert` keyword for simple sanity checks. If it's false, it throws an AssertionError, and your program wil stop.

```python
input_value = 25
assert input_value > 0
```

## Writing Tests

We'll focus on the built-in `unittest` library, that is both a framework for writing tests, as well as a test runner.

1. Write your tests as methods within classes
2. Use a series of built-in assertion methods

Let's test our demo function:
```python
def multiply(x, y):
    return x * y
```

Writing the tests in `test_multiply.py`:
```python
import unittet
from my_math_functions import multiply

class TestMultiply(unittest.TestCase):
    def test_multiply(self):
        test_x = 5
        test_y = 10
        self.assertEqual(multiply(test_x, test_y), 50, "Should be 50")

if __name__ == "__main__":
    unittest.main()
```

Run the tests by running `test_multiply.py` from command line.

Another way, without making your test file runnable, is to run `unittest` directly from the command line:

```
python -m unittest test_multiply.py
```

And you can use the `-v` or `--verbose` flag to give you more information about which tests were run.

### Important Concepts

1. `TestCase` class must subclass `unittest.TestCase`
2. Names of test functions must begin with `test_`
3. Import the code to be tested
4. There's a lot of [available Assertions, check the documentation](https://docs.python.org/3/library/unittest.html)

## Growing your Tests

Standard `unittest` test are fine for most projects. As your programs grow and organization becomes more complex, you might want to consider an alternative such as 3rd party `nose2` and `pytest` modules that are compatible with `unittest` but do things slightly different.