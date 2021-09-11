# Order Statistic Tree

An __order-statistic tree__ T is simply a red-black tree with additional information stored in each node. Besides the usual red-black tree attributes `x.key`, `x.color`, `x.p`, `x.left`, and `x.right` in a node `x`, we have another attribute, `x.size`. This attributes contains the number of (internal) nodes in the subtree rooted at `x` (including `x` itself), that is, __the size of the subtree__. This data structure supports __fast order-statistic operations__.

```
x.size = x.left.size + x.right.size + 1
```

## ith smallest key

```
OS-SELECT(x,i)          // we would use OS-SELECT(T.root, i)
    r = x.left.size + 1
    if i == r
        return x
    else if < r
        return OS-SELECT(x.left, i)
    else return OS-SELECT(x.right, i-r)
```

The value of `x.left.size` is the number of nodes that come before `x` in an inorder tree walk.

## Determining the rank of an element

```
OS-RANK(T, x)
    r = x.left.size + 1
    y = x
    while y != T.root
        if y == y.p.right
            r = r + y.p.left.size + 1
        y = y.p
    return r
```

## Maintaining subtree sizes

Given the `size` attribute in each node, `OS-SELECT` and `OS-RANK` can quickly compute order-statistic information. But we need efficient maintainance of these attributes within the basic modifying operations on red-black trees.

### Insertion

If we insert a new node as a child of an existing node, we simply increment `x.size` for each node `x` on the simple path traversed from the root down toward the leaves. The new node added gets a size of 1. Since there are `O(lg n)` nodes on the traversed path, the additional cost of maintaining the `size` attributes is `O(lg n)`.

If we change colors and perform rotations to maintain the RBT properties, the only structural changes to the underlying RBT are caused by rotations, of which there are at most two. Moreover, a rotation is a locel operation, only two nodes have their size attributes invalidates, so we spend only `O(1)` additional time updating `size` attributes in the second phase.

### Deletion

Deletion from RBT consists of two phases.

The first phase operates on the underlying search tree, either removes one node `y` from the tree or moves upward it within the tree. We simply traverse a simple path from node `y` up to the root, decrementing the `size` attributre of each node on the path. Since this path has length `O(lg n)`, the additional time spent is `O(lg n)`.

The second phase, which performs three rotations at most, are handled in the same manner as for insertion.
