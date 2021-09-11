# Binary Tree

- Overview
- Set Theory
- Graph Theory
- Applications
- Types

## Overview

![](2021-07-09-21-40-47.png)

> A Binary Tree is a special case of an ordered K-ary tree, where `k` is 2.

Tree data structure in which **each node has at most two children**.

We use the attributes `p`, `left` and `right`, to store pointers to the parent, left child and right child of each node in a binary tree T. If `x.p == NIL`, then x is the root. The root of the entire tree T is pointed to by the attribute `T.root`.

## Set Theory

A recursive definition using just _set theory_ notions is that a (non-empty) binary tree is a tuple `(L, S, R)`, where `L` and `R` are binary trees or the empty set, and `S` is a singleton set containing the root.

## Graph Theory

From a _graph theory_ perspective, binary trees are defined here as **arborescences**. A binary tree may thus be also called a **bifurcating arborescence**.

It is also possible to interpret a binary tree as an **undirected**, rather than a directed **graph**, in which case a binary tree is an **ordered, rooted tree**.

## Applications

1. As a means for accessing nodes based on some value/label. They are used for **efficient searching & sorting** (e.g., _Binary Search Trees_ and _Binary Heaps_).

2. As a representation of data with a relevant bifurcating structure (e.g., _Huffman Coding_ and _Cladograms_).

## Types

- **Full/Proper**: Every node has either 0 or 2 children.

- **Complete**: Every level, _except possible the last_ is completely filled, and all nodes in the last level are as far left as possible. It can have between 1 and $2^h$ nodes at the last level $h$.

- **Perfect**: All interior nodes have two children and all leaves have the same _depth_ or same _level_. A _perfect_ three is therefore always _complete_ but a _complete_ tree is not necessarily _perfect_.

- **Infinite Complete**: Every node has two children (and so the set of levels is _coutnably infinite_). The set of all nodes is _countably infinite_, but the set of all infinite paths from the root is _uncountable_, having the _cardinality of the continuum_.

- **Balanced**: Left and right subtrees of every node differ in height by no more than 1.

- **Degenerate/Pathological**: Each parent node has only one associated child node. This means that the tree will behave like a _linked list_ data structure.
