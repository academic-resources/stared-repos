# Longest common subsequence

## Subsequence

Formally, given a sequence `X = <x1, x2, ..., xm>`, another sequence `Z = <z1, z2, ..., zk>` is a subsequence of `X` if there exists a strictly increasing sequence `<i1, i2, ..., ik>` of indices of `X` such that for all `j = 1...k`, we have `x_i_j = z_i_j`

For example, `Z = <B, C, D, B>` is a subsequence of `X = <A, B, C, B, D, A, B>` with corresponding index sequence `<2, 3, 5, 7>`.

## Common subsequence

Given two sequences `X` and `Y`, we say that a sequence `Z` is a __common subsequence__ of `X` and `Y` if `Z` is a subsequence of both.

## LCM problem

We are given two sequences and wish to find a maximum length common subsequence.

## Dynamic Programming Steps

### Step 1: Characterizing a LCS

In a brute-force approach to solving LCS problem, we would enumerate all subsequences of X and check each subsequence to see whether it is also a subsequence of Y, keeping track of the longest subsequence we find. Because `X` has `2^m` subsequences, this approach requires exponential time.

LCS problem has an optimal-substructure property. Given a sequence `X = <x1...xm>`, we define the __ith prefix__ of X as `Xi = <x1...xi>`.

#### Theorem

Let `Z = <z1...zk>` be any LCS of `X` and `Y`.

1. If `xm = yn`, then `zk = xm = ym`, and `Zk-1` is an LCS of `xm-1` and `yn-1`.
2. If `xm != yn`, then `zk != xm` implies that `Z` is an LCS of `xm-1` and `Y`.
3. If `xm != yn`, then `zk != yn` impllies that `Z` is an LCS of `X` and `Yn-1`.

### Step 2: Recursive solution

Because of step 1 theorem, to find an LCS of `X` and `Y`, we may need to find the LCSs of `X` and `Yn-1` and of `Xm-1` and `Y`. But each of these subproblems has the subproblems of finding LCS of `Xm-1` and `Yn-1`. Many other subproblems share subsubproblems, so we can see the _overlapping-subproblems_.

We establish the following recurrence:

```
c[i,j] = c[i,j] = 0                 // if i = 0 or j = 0
c[i,j] = c[i-1, j-1] + 1            // if i,j > 0 and xi = yj
c[i,j] = max(c[i, j-1], c[i-1, j])  // if i,j > 0 and xi != yj
```

### Step 3: Computing the length of an LCS

Since the LCS has only _Theta(m*n)_ distinch subproblems, we can use dynamic programming to compute the solutions bottom up and achieve this complexity.

Procedure `LCS-LENGTH` takes two sequences as inputs (`X = <x1...xm>` and `Y = <y1...yn>`). It stores `c[i,j]` values in a __row-major__ order (first row of c from left to right, then second row, and so on). This procedure also maintains table `b[1..m, 1..n]` to help us construct an optimal solution by pointing to the table entry corresponding to the optimal subproblem solution chosen when computing `c[i,j]`. Finally, `c[m,n]` contains the length of an LCS of `X` and `Y`.

```
LCS-LENGTH(X, Y)                     // Theta(m*n)
    m = X.length
    n = Y.length
    let b[1..m, 1..n] and c[0..m, 0..n] be new tables
    for i = 1 to m
        c[i, 0] = 0
    for j = 0 to n
        c[0, j] = 0                  // end of initialization
    for i = 1 to m
        for j = 1 to n
            if xi == yj
                c[i, j] = c[1-1, j-1] + 1
                b[i, j] = (i-1, j-1)
            else if c[i-1, j] >= c[i, j-1]
                c[i,j] = c[i-1, j]
                b[i,j] = (i-1, j)
            else
                c[i, j] = c[i, j-1]
                b[i,j] = (i, j-1)
    return c and b
```

#### Step 4: Constructing an LCS

The `b` table return by `LCS-LENGTH` enables us to quickly construct an LCS. We simply begin at `b[m,n]` and trace through the table.

```
PRINT-LCS(b, X, i, j)               // O(m + n)
    if i == 0 or j == 0
        return
    if b[i,j] == (i-1, j-1)
        PRINT-LCS(b, X, i-1, j-1)
        print xi                    // xi == yi
    else if b[i,j] == (i-1, j)
        PRINT-LCS(b, X, i-1, j)
    else
        PRINT-LCS(b, X, i, j-1)
```