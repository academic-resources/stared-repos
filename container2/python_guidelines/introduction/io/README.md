# [File I/O](https://docs.python.org/3/tutorial/inputoutput.html#input-and-output)

## Output formatting

### [Fancier Output Formatting](https://docs.python.org/3/tutorial/inputoutput.html#fancier-output-formatting)

```python
>>> s = 'Hello, world.'
>>> str(s)
'Hello, world.'
>>> repr(s)
"'Hello, world.'"
>>> str(1/7)
'0.14285714285714285'
>>> x = 10 * 3.25
>>> y = 200 * 200
>>> s = 'The value of x is ' + repr(x) + ', and y is ' + repr(y) + '...'
>>> print(s)
The value of x is 32.5, and y is 40000...
>>> # The repr() of a string adds string quotes and backslashes:
... hello = 'hello, world\n'
>>> hellos = repr(hello)
>>> print(hellos)
'hello, world\n'
>>> # The argument to repr() may be any Python object:
... repr((x, y, ('spam', 'eggs')))
"(32.5, 40000, ('spam', 'eggs'))"
```

### [Formatted String Literrals](https://docs.python.org/3/tutorial/inputoutput.html#formatted-string-literals)

```python
>>> import math
>>> print(f'The value of pi is approximately {math.pi:.3f}.')
The value of pi is approximately 3.142.
```

```python
>>> table = {'Sjoerd': 4127, 'Jack': 4098, 'Dcab': 7678}
>>> for name, phone in table.items():
...     print(f'{name:10} ==> {phone:10d}')
...
Sjoerd     ==>       4127
Jack       ==>       4098
Dcab       ==>       7678
```

### [String `format()` method](https://docs.python.org/3/tutorial/inputoutput.html#the-string-format-method)

```python
>>> print('We are the {} who say "{}!"'.format('knights', 'Ni'))
We are the knights who say "Ni!"
```

```python
>>> print('The story of {0}, {1}, and {other}.'.format('Bill', 'Manfred',
                                                       other='Georg'))
The story of Bill, Manfred, and Georg.
```

```python
>>> table = {'Sjoerd': 4127, 'Jack': 4098, 'Dcab': 8637678}
>>> print('Jack: {0[Jack]:d}; Sjoerd: {0[Sjoerd]:d}; '
...       'Dcab: {0[Dcab]:d}'.format(table))
Jack: 4098; Sjoerd: 4127; Dcab: 8637678
```

```python
>>> table = {'Sjoerd': 4127, 'Jack': 4098, 'Dcab': 8637678}
>>> print('Jack: {Jack:d}; Sjoerd: {Sjoerd:d}; Dcab: {Dcab:d}'.format(**table))
Jack: 4098; Sjoerd: 4127; Dcab: 8637678
```

### Old string formatting

```python
>>> import math
>>> print('The value of pi is approximately %5.3f.' % math.pi)
The value of pi is approximately 3.142.
```

## [Reading and Writing Files](https://docs.python.org/3/tutorial/inputoutput.html#reading-and-writing-files)

```python
f = open('workfile', 'w')
f.close()
```

* `r`: read only (_default_)
* `w`: write only
* `a`: append
* `r+` read and write

```python
with open('workfile') as f:
    read_data = f.read()

f.closed # true
```

### [Methods of File Objects](https://docs.python.org/3/tutorial/inputoutput.html#methods-of-file-objects)

* `read(size)`: Returns string/binary depending mode, `size` omitted implies reading the whole file. Otherwise, it reads at most characters/bytes are returns them. If the end file is reached, it returns an empty string.
* `readline()`
* `list(f)` or `readlines()` to read all lines.
* `write(string)`: Writes the contents of `string` to the file, returning the number of characters written. Other types of objects needs to be converted, either to a strign or a bytes object depending on mode, before writing them.
* `tell()`: Returns integer giving file object's current poisition.
* `seek(offset, whence)`: Change file object's position to position computed from adding `offset` to a reference point selected by the `whence argument`, which can be 0 for the beginning of file (_default_), 1 for current position, or 2 for end of file.

### [Saving as JSON](https://docs.python.org/3/tutorial/inputoutput.html#saving-structured-data-with-json)

```python
>>> import json
>>> json.dumps([1, 'simple', 'list'])
'[1, "simple", "list"]'
```

```python
x = json.load(f)
```

## Other Serialization techniques

See also [pickle module](https://docs.python.org/3/library/pickle.html#module-pickle).

Contrary JSON, _pickle_ is a protocol which allos the serialization of arbitrarily complex Python objects. It is specified to Pyhon and cannot be used to communicate with applications in other languages. It is also __insecure by default__, deserializing picke data coming from an untrusted source can execute arbitrary code.