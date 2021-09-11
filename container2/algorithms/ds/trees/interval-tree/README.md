# Interval Trees

Augmented RBT to support operations on dynamic sets of intervals. Each element `x` contains an interval `x.int`. In addition to the intervals themselves, each node `x` contains a value `x.max`, which is the maximum value of any interval endpoint stored in the subtree rooted at x. 

A __closed interval__ is an ordered pair of real numbers `[t1, t2]`, with `t1 <= t2`. The interval represents the set `{t in R: t1 <= t <= t2}`.

__Open__ and __half-open__ intervals omit both or one of the endpoints from the set, respectively.

In this section, we shall assume that intervals are closed, extending the results to open and half-open intervals is conceptually straightforward.

## Usage example

Intervals are convenient for representing events that each occupy a continuous period of time.

We might, for example, wish to query a database of time intervals to find out what events occurred during a given interval.

## Representation

We can represent an interval `[t1, t2]`, as an object `i`, with attributes `i.low = t1` and `i.high = tw`. We say that the interval `i` and `i'` __overlap__ if they intersection is not empty. 

## Operations

* `INTERVAL-INSERT(T,x)` (`O(lg n)`) adds the element `x`, whose `int` attribute is assumed to contain an interval, to the interval tree `T`.

* `INTERVAL-DELETE(T,x)` remvoes the element `x` from the interval tree `T`.

* `INTERVAL-SEARCH(T,i)` returns a pointer to an element `x` in the interval tree `T` such that `x.int` overlaps interval `i`, or a pointer to the sentinel `T.nil` if no such element is in the set.

* `x.max = max(x.int.high, x.left.max, x.right.max)`

### Implementations

```
INTERVAL-SEARCH(T, i)
    x = T.root
    while x != T.nil and i does not overlap x.int
        if x.left != T.nil and x.left.max >= i.low
            x = x.left
        else x = x.right
    return x
```