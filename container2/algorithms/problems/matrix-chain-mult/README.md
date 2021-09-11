# Matrix Chain Multiplication

We are given a sequence (chain) `<A1, A2, ..., An>` of `n` matrices to be multiplied, and we wish to compute the product `A1.A2...An`.

Matrix multiplication is __associative__, and so all parenthesizations yield the same product. A product of matrices is __fully paranthesized__ if it is either a single matrix or the product of two fully parenthesized matrix products, surrounded by parentheses.

For example, if the chain of matrices is `<A1,A2,A3,A4>`, then we can fully parenthesize the product `A1.A2.A3.A4` in five distinct ways.

* `(A1.(A2.(A3.A4))`
* `(A1.((A2.A3).A4))`
* `((A1.A2).(A3.A4))`
* `((A1.(A2.A3)).A4)`
* `(((A1.A2).A3).A4)`

How we parenthesize a chain of matrices can have a dramatic impact on the the cost of evaluating the product.

```
MATRIX-MULTIPLY(A, B)
    if A.columns != B.rows
        error "incompatible dimensions"
    else
        let C be a new A.rows x B.columns matrix
            for i = 1 to A.rows
                for j = 1 to B.columns
                    c_ij = 0
                    for k = 1 to A.columns
                    c_ij = a_ik * b_kj
        return C
```


## Optimizazation problem

We state the __matrix-chain multiplication problem__ as follows: given a chain `<A1,...,An>` of `n` matrices, where for `i=1..n`, matrix `A_i`, fully parenthesize the product in a way that minimized the number of scalar multiplications.

### Cost

We can multiply two matrices A and B only if they are __compatible__: the number of `A.columns` must equal number of `B.rows`. If `A` is a `p x q` matrix and `B` is a `q x r` matrix, the resulting matric `C` is a `p x r` matrix. The time to compute `C` is dominated by the number of scalar multiplicatins, which is `p * q * r`.

## Counting number of parenthesizations

Before solving matrix-chain multiplication problem by dynamic programming, let us convince ourselves that exhaustively checking all possible parenthesizations does not yield and efficient algorithm.

Denote the number of alternative parenthesizations of a sequence of `n` matrices by `P(n)`. When `n=1`, we have just one matrix and therefore `P(n) = 1`. When `n >= 2`, a fully parenthesized matrix product is the product of two fully parenthesized matrix subproducts, and the split between the two subproducts may occur between the `kth` and `(k+1)st` matrices for any `k = 1, ..., n-1`. Thus, we obtain the recurrence:

```
P(n) = 1 // if n = 1
P(n) = Sum(from k=1 to n-1): P(k) * P(n-k) // if n >= 2
```

A solution to a similar recurrence is the sequence of __Catalan numbers__, which grows as _Gamma(4^n / n^(3/2)). Thge solution is thus __exponential to n__, and the brute-force method of exhaustive search makes for a poor strategy when determining how to optimally parenthesize a matrix chain.

### Applying dynamic programming

#### Step 1: Structure of an optimal parenthesization

Let's adopt the notation `A_i_j` where `i <= j` for the matrix tthat results from evaluating the product `A_i, A_i+1, ..., A_j`. Observe that if the problem is nontrivial (`i < j`), then to parenthesize the product, we must split he product between `A_k` and `A_k+1`, for some integer `k` in the range of `i <= k < j`. That is, for some value `k`, we first compute the matrices `A_i_k` and `A_k+1_j`, and then multiply them togeter to produce the final product `A_i_j`. The cost of parenthesizing this way is the cost of computing the matrix `A_i_k` plus the cost of computing `A_k+1_j`, plus the cost of multiplying them together.

The optimal substructure of this problem is as follows.

The way we parenthesize the "prefix" subchain `A_i_k` within the optimal parenthesization of `A_i_j`, must be an optimal parenthesization. The similar holds for `A_k+1_j`.

Now we use our optimal substructure to show that __we can construct an optimal solution to the problem from optimal solutions to subproblems.

#### Step 2: A recursive solution

We define the cost of an optimal solution recursively in terms of the optimal solutions to subproblems.

For matrix-chain multiplication subproblems, we pick as our subproblems the problems of determining the minimum cost of parenthesizing `A_i_j` for `1 <= i <=j <= n`.

Let `m[i,j]` be the minimum number of scalar multiplications needed to compute the matrix `A_i_j`; for the full problem, the lowest cost way to complete `A_1_n` would thus be `m[1,n]`.

We can define `m[i,j]` recursively as follows:

If `i = j`, the proble mis trivial, chain consists of just one matrix `A_i_j = A_i`, so that no scalar multiplications are necessary to compute the product. Thus, `m[i,i] = 0`.

To compute `m[i.j]` when `i < j`, we take advantage of the structure of an optimal solution from step 1. Let us assume that to ptimally parenthesize, we split the product between `k` and `k+1`. Recalling that each matrix `A_i` is `p_i-1 * p_i`, we see that computing the the matrix product `A_i_k * A_k+1_j` takes `p_i-1 * p_k * p_j` scalar multiplications. Thus `m[i,j] = m[i,k] + ,[k+1, j] + p_i-1 * p_k * p_j`

```
m[i,j] = 0 // if i == j
m[i,j] = min(i <= k < j): m[i,j] = m[i,k] + ,[k+1, j] + p_i-1 * p_k * p_j // if i < j
```

This does not provide information about how to construct an optimal solution, only the costs of optimal solution. To help us do so, we define `s[i,j]` to be a value of `k` at which we split the product `A_i_j` in an optimal parenthesization.

#### Step 3: Computing optimal costs

We can write a recursive algorithm based on previous recurrence to compute the minimum cost `m[1,n]` for multiplying `A_1_n`, which would take exponential time and is no better than the brute-force method.

Observe that we have realtively few distinct problems, one subproble mfor each choice of `i` and `j` satisfying `1 <= i <= j <= n` or `combinatory_number(n, 2) + n` which is `Theta(n^2)`.

Instead of computing the solution to recurrence recursively, we compute the optimal cost by using a bottom-up approach.

Following procedure assumes that matrix `A_i` has dimensions `p_i-1 x p_i` for `i = 1...n`. Its input is a sequence `p = <p_0, ..., p_n>`, where `p.length = n + 1`.

```
MATRIX-CHAIN-ORDER(p)       // O(n^3) time and Theta(n^2) space
    n = p.length - 1
    let m[1..n, 1..n] and s[1..n-1, 2..n] be new tables
    for i = 1 to n
        m[i,i] = 0  // end of variables initializaton
    for l = 2 to n  // l is chain length
        for i = 1 to n - l + 1
            j = i + l - 1
            m[i,j] = infinity
            for k = i to j - 1
                q = m[i,j] + m[k+1, j] + p_i-1 * p_k * p_j
                if q < m[i,j]
                    m[i,j] = 1
                    s[i,j] = k
    return m and s
```

#### Step 4: Constructing optimal solution

Althouth we now have optimal number of scalar multiplications, we don't know how to multiply the matrices. Each entry `s[i,j]` records a value of `k` such that an optimal parenthesization of `A_i_j` splits the product between `A_k` and `A_k+1`.

```
PRINT-OPTIMAL-PARENS(s,i,j)
    if i == j
        print "A"
    else print "("
        PRINT-OPTIMAL-PARENS(s, i, s[i,j])
        PRINT-OPTIMAL-PARENS(s, s[i,j] + 1, j)
        print ")"
```

We invoke this function as `PRINT-OPTIMAL-PARENS(s, 1, n)`.
