# Rod Cutting

## Assumptions

We want to cut long steel rods into shorter rods for selling. Each cut is free. We want to know the best way to cut up the rods.

We assume that we know, for `i = 1, 2, ...`, the price `p`, in dollars for selling a rod of length `i` inches. Rod lengths are always an integral number of inches.

## Problem

Given a rod of length `n` inches and a table of prices `p_i`, determine the maximum revenue `r_n` obtainable by cutting up the rtod and selling the pieces.

## Solution

We can cut up a rod of length `n` in `2^n-1` different ways, since we have an independent option of cutting, or not cutting, at distance `i` inches from the left end.

if an optimal solution cuts the rod into `k` pieces, for some `1 <= k <= n`, then an optimal decomposition `n = i_1 + i_2 + ... + i_k` of the rod into pieces of length `i_1, ..., i_k` provides maximum corresponding revenue `r_n = p_i1 + p_i2 + ... + p_ik`.

More generally:

```
rn = max (pn, r1 + rn-1, r2 + rn-2, ... rn-1 + r1)

rn = max (pi + rn-1) // 1 <= i <= n
```

The first argument `pn` corresponds to making no cuts at all and selling the rod of length `n` as is. The other `n-1` arguments to max correspond to the maximum revenue obtained by making an initial cut of the rod into two pieces of size `i` and `n-i`, and then optimally cutting up those pieces further, obtaining revenues `ri` and `rn-i` from those two pieces.

Note that two solve the original proble mof size `n`, we solve smaller problems of the same type, but of smaller sizes. Once we make the first cut, we may consider the two pieces as independent instances of the rod-cutting problem. The overall optimal solution incorporates optimal solutions to the two related subproblems, maximizing revenue from each of those two pieces.

### Naive Recursive top-down implementation

```
CUT-ROD(p, n) // O(2^n)
    if n = 0
        return 0
    q = -infinity
    for i = 1 to n
        q = max(q, p[i] + CUT-ROD(p, n-i))
    return q
```

`CUT-ROD` takes as input an array `p[1..n]` of prices and an integer `n`, and it returns the maximum revenue possible for a rod of length `n`. If `n=0`, no revenue is possible. When the input size becomes moderately large, your program would take a long time to run because of the recursive calls.

### Top Down with Memoization (Dynamic Programming)

Having observed that a naive recursive solution is inefficient because it solves the same subproblems repeatedly, we arrange for each subproblem to be solved _only once_, saving its solution. If we need to refer to this subproblem's solution again later, we can just look it up, rather than recompute it.

Dynamic programming thus __uses additional memory to save computation time__.

```
MEMOIZED-CUT-ROD(p, n) // Theta(n^2)
    let r[0..n] be a new array
    for i = 0 to n
        r[i] = -infinity
    return MEMOIZED-CUT-ROD-AUX(p, n, r)

MEMOIZED-CUT-ROD-AUX(p, n, r)
    if r[n] >= o
        return r[n]
    if n == 0
        q = 0
    else
        q = -infinity
    for i = 1 to n
        q = max(q, p[i] + MEMOIZED-CUT-ROD-AUX(p, n-i, r))
    r[n] = q
    return q
```

### Bottom Up (Dynamic Programming)

```
BOTTOM-UP-CUT-ROD(p, n) // Theta(n^2)
    let r[0..n] be a new array
    r[0] = 0
    for j = 1 to n
        q = -infinity
        for i = 1 to j
            q = max(q, p[i] + r[j-i])
        r[j] = q
    return r[n]
```

### Reconstructing a solution

Our dynamic-programming algorithms return the value of an optimal solution, but not the actual choices (piece sizes). We can extend our algorithms to return not only maximum revenue `rj` but also `sj` the optimal size of the first piece to cut off:

```
EXTENDED-BOTTOM-UP-CUT-ROD(p, n) // Theta(n^2)
    let r[0..n] and s[0..n] be a new arrays
    r[0] = 0
    for j = 1 to n
        q = -infinity
        for i = 1 to j
            if q < p[i] + r[j-1]
                q = p[i] + r[j-i]
                s[j] = i
        r[j] = q
    return r and s

PRINT-CUT-ROD-SOLUTION(p, n)
    (r,s) = EXTENDED-BOTTOM-UP-CUT-ROD(p, n)
    while n > 0
        print s[n]
        n = n - s[n].
```