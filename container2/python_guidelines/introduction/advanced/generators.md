# Generators

Generators are _iterators_, but you can only iterate over them once. It's because they don't store all the vlaues in memory, they generate the values on the fly.

Most of the time generators are implemented as functions. However, they do not `return` a value, they `yield` it. Here is a simple example of a `generator` function:

```python
def generator_function():
    for i in range(10):
        yield i

for item in generator_function():
    print(item)
```

Generators are best fo calculating large sets of results, where you don't want to allocate the memory for all results at the same time.

```python
def fibo(n):
    a = b = 1
    for i in range(n):
        yield a
        a, b = b, a + b

for x in fibo(100000):
    print(x)
```

Also, `next()` allows us toa ccess he next element of a sequence:

```python
gen = fibo(100)
next(gen) # 1
next(gen) # 2
```

## `()` Generator Expression

Returns an iterator over elements created by using list comprehension.

```python
i = (n for n in [0,1])
i.next() #0
i.next() #1
i.next() #StopIteration
```

#### Iterator

Any object in Python which has a `__next__` method defined. 

#### Iterable

Any object in Python which has an `__iter__` or `__getitem__` method defined which returns an __iterator__ or can take indexes.