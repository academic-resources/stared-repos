# M-ary tree

- Overview
- Unbounded Branching
- Types
- Design & Implementation
  - Arrays
  - Pointer-based
  - Unbounded branching

## Overview

In _graph theory_, an _M-ary tree_ (also known as _K-ary_ or _K-way_ tree) is a rooted tree in which each node has no more than $m$ children.

![](2021-07-09-22-02-38.png)

> An example of a m-ary tree with `m=5`.

## Types

- **Full**: Each node has either 0 or $m$ children.

- **Complete**: Every level, _except possible the last_ is completely filled, and all nodes in the last level are as far left as possible. It is maximally space efficient.

- **Perfect**: Full m-ary tree in which all _leaf nodes_ are at the same depth.

## Design & Implementation

### Arrays

Stored in _breadth-first_ order as an implicit data structure in arrays, and if the tree is a _complete tree_, this method wastes no space.

![](2021-07-09-22-08-18.png)

### Pointer-based

Each node would have an internal array for storing pointers to each of its $m$ children.

![](2021-07-09-22-08-38.png)

### Unbounded branching

We can represent any class of trees in which the number of children of each node is at most some constant k. We replace `left` and `right` attributes by `child_1, ..., child_k`.

**This scheme no longer works when the number of children of a node is unbounded**, since we do not know how many attributes to allocate in advance. Moreover, even if the number of children $k$ is **bounded by a large constant**, but most nodes have a small number of children, we may waste a lot of memory.

Fortunately, there is a **clever scheme to represent trees with arbitrary numbers of children**, using only $O(n)$ space for any n-node rooted tree.

Each node contains a parent pointer `p`, and `T.root` points to the root of tree $T$. Instead of having a pointer to each children, however, each node $x$ has only two pointers:

1. `x.left-child` points to the leftmost child of node x
2. `x.right-sibiling` points to the sibling of x immediately to its right.
