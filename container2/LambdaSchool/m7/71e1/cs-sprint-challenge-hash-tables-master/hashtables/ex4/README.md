# Positive and Negative

For an input list of integers, we wish to know which positive numbers
have corresponding negative numbers in the list.

Example input:

```python
[ 1, -1, 2, 3, -4, -3, 4, -5, 6, 7 ]
```

Input can be in any order.

Example return value:

```python
[ 1, 3, 4 ]
```

Because 1, 3, and 4 are the positive numbers that have corresponding
negative numbers in the list.

Return value can be in any order.

Solve this problem with a hash table.

Limits:

* The input list can contain approximately 5,000,000 elements.