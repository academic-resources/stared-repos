# [Looping Techniques](https://docs.python.org/3/tutorial/datastructures.html#looping-techniques)

#### Dictionaries

```python
knights = {'gallahad': 'the pure', 'robin': 'the brave'}
for k, v in knights.items():
	print(k, v)
```

#### Sequences

```python
for i, v in enumarate(['tic', 'tac', 'toe']):
	print(i, v)
```

To loop over two or more sequences at the same time, the entries can be paired with the `zip()` function:

```python
questions = ['name', 'quest', 'favorite color']
answers = ['lancelot, 'the holy grail', 'blue']
for q, a in zip(questions, answers):
	print('What is your {0}? It is {1}.'.format(q, a))
```

To loop over a sequence in reverse:

```python
for i in reversed(range(1, 10, 2)):
	print(i)
# 9 7 5 3 1
```

To loop over a sequence in sorted order use the `sorted()` function which returns a __new__ sorted list while leaving the source unaltered.

```python
basket = ['apple', 'orange', 'apple', 'pear', 'orange', 'banana']
for f in sorted(set(basket)):
	print(f)
```
