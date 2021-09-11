# [Functional Programming](https://en.wikipedia.org/wiki/Functional_programming)

Programming paradigm where programs are constructed by applying and composing functions. It is a declarative proramming paradigm in which function definitons are trees of expressions that each return a value, rather than a sequence of imperative statements which change the state of the program.

In functional programming, functions are tratead as __first-class citiziens__, meaning that they can be bound to names, passed as arguments, and returned from other functions, just as any other data type can.

Functional programming is sometimes treated as synonymous with __purely functional programming__, a subset of it, which treats all functions as __deterministic__ mathematical fucntions, or __pure functions__. When a pure function is called with some given arguments, it will always return the same resurt, and cannot be affected by any mutable state or other side effects.

This is in contrast which impure procedures, common in imperative proramming, which can have side effects (such as modifying the program's state or taking input from a user).

Closely related to first-class functions, there are __higher-order functions__ which are functions that can either take other functions as arguments or return them as results. The difference is that "higher-order" describes a mathematical concept of functions hat operate on oher functions. 

Higher-order funtions enable __partial application__ or __currying__, a technique that applies a functon to its arguments one at a time, with each application returning a new functon tat accepts the next argument.

There's also the concept of __Referential Transparency__. This means, functional programs do not have assignment statements, that is, the value of a variable in a functonal program never changes once defined. This __eliminates any chances of side effects because any variable can be replaced with its actual valu at any point of execution__.

## Why Functional Programming?

Claims that by restriting side effects, programs have fewer bugs, are easier to debug and test, and be more suited to formal verifications.

## Braindump 

* First Class Functions
* Higher-order Functions
	* Partial Application / Currying
* Pure Functions
	* No side-effects
* Referential Transparency
* Immutable state

---

## Python Specifics

#### `map(function ,iterable, ...)`

Check [the example](./map.py).

Return an iterator that applies _function_ to every item of _iterable_, yielding the results.  if additional _iterable_ arguments are passed, _function_ must take that many arguments and is applied to the items from all iterables _in parallel_. With multiple iterables, the iterator stops when the shortest iterable is exausted.

For cases where the function inputs are already arranged into argument tuples, see `itertools.starmap()`.

#### `filter(function, iterable)`

Check [the example](./filter.py).

Construct an iterator from those elements of `iterable` for which `function` returns `True`. `iterable` may be either a sequence, a container which supports iteration, or an iterator. If function is `None`, the identity function is assumed, that is, all elements of `iterable` that are false are removed.

Note that `filter(function, iterable` is equivalent to the generator expression:

```
(item for item in iterable if function(item))
```

See `itertools.filterfalse()` for the complementary function thta retruns element of `iterable` for which `function` returns `False`.

#### `zip(*iterables)`

Check [the example](./zip.py).

Make an iterator that aggregates elements from each of the iterables.

Returns an iterator of tuples, where the i-th tuple contains the i-th element from each of the arugment sequences of iterables.

The iterator stops when the shortest input iterable is exhausted. With a single iterable argument, it returns an iterator of 1-tuples. With no arguments, it erturns an empty iterator.

The _left-to-right_ evaluation order of the iterables is guaranteed.

`zip()` should only be used with unequal length inputs when you don't care about trailing, unmatched values from the longer iterables. If those values are important, use `itertools.zip_longest()` instead.

`zip()` in conjunction with the `*` operator can be used to unzip a list.

#### `reduce()`

Check [the example](./reduce.py).

`reduce` was removed from being a built-in and placed in `functools.reduce` however almost everytime an explicit `for` loop is more readable.

#### Lambda Expressions

Check [the example](./lambda.py).

Small anonymous functions can be created with the `lambda` keyword and can be ued wherever function objects are required. They are syntactically restricted to a single expression.

Semantically, they are just syntactic sugar for a normal function definition. Like nested function definitions, `lambda` functions can reference variables from the containing scope:

#### [List Comprehension](https://docs.python.org/3/tutorial/datastructures.html#list-comprehensions)

Check [the example](./list-comprehension.py).

List comprehensions provide a concise way to create lists. Common applications are to make new lists where each element is the result of some operatino plied to each member of another sequence or iterable, or to create a subsequence of those elements that satisfy a certain condition.

#### Set Comprehension

Check [the example](./set-comprehension.py).

#### Dictionary Comprehension

Check [the example](./dict-comprehension.py).

