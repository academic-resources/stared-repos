# Recursion

Recursion is a technique by which a funciton makes one or more calls to itself during execution, or by which a data structure relies upon smaller instances of the very same type of sturcture in its representation.

## 1. Factorial Function

[Python example](./factorial/factorial.py)

![factorial][./factorial/factorial.png]

## 2. English Ruler

[Python example](./ruler-drawing/ruler-drawing.py)

![ruler drawing](./ruler-drawing/ruler.png)

## 3. Binary Search

[Python example](./binary-search/binary-search.py)

![bs](./binary-search/bs.png)

## 4. File System

[Python example](./file-system/fs.png)

![fs](./file-system/fs.png)

### Compute used disk space

![fs-size](./file-system/fs-size.png)

```
DiskUsage(path):
  total = size(path)
  if path represents a directory then
    for each child entry stored within directory path do
      total = total + DiskUsage(child)
  return total
```

## 5. Fibonacci

There's a temptation of using bad recursion formulation because of the way the nth Fibonacci number, Fn, depends on the two previous values Fn-2 and Fn-1. But notice that after computing N-2, the call to compute Fn-1 requires its own recursive call to compute Fn-2, as it does not have knowledge of the value of Fn-2 that was computed at the earlier level of recursion. That is __Binary Recursion__ that produces duplicative work, a snowballing effect that leads to the exponential running time of bad recursion. But we can create a __Linear Recursion__ algorithm.

## 6. Reverse a Sequence

[Python example](./reverse/reverse.py)

![reverse sequence](./reverse/reverse.png)

## 7. Binary Sum

