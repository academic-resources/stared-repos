# Quicksort

* Worst-case running time of O(n^2).
* Often the best practical choice because it is remarkably efficient on the average, expected running time is O(n lg n), and the hidden constant factors are quite small.
* Sorts in place.

Quicksort, like merge sort, applies the divide-and-conquer paradigm.

1. __Divide__: partition (rearrange) the array `A[p..r]` into two (possible empty) subarrays `A[p..q-1]` and `A[q+1..r]` such that each element of `A[p..q-1]` is less than or equal to `A[q]`, which is, in turn, less than or equal to each element of `A[q+1..r]`. Compute the index `q` as part of this partitioning procedure.

2. __Conquer__: Sort the two subarrays A[p..q-1] and A[q+1..r] by recursive calls to quicksort.

3. __Combine__: Because the subarrays are already sorted, no work is needed to combine them, entire array `A[p..q]` is sorted.

## Implementation

```
QUICKSORT(A, 0, A.length-1)

QUICKSORT(A, p, r)
  if p < r:
    q = PARTITION(A, p, r)
    QUICKSORT(A, p, q-1)
    QUICKSORT(A, q+1, r)

PARTITION(A, p, r)
  x = A[r]
  i = p-1
  for j = p to r-1
    if A[j] <= x
      i = i + 1
      exchange A[i] with A[j]
  exchange A[i+1] with A[r]
  return I + 1
```

## Performance

Running time depends on whether the partitioning is balanced or not, which in turn depends on which elements are used for patitioning.

If the partitioning is balanced, the algorithm runs asymptotically as fast as marge sort. If the partiotining is unbalanced, however, it can run asymptotically as aslowly as insertion sort.

### Worst-case partitioning

Partitioning routine produces one subproblem with n-1 elements and one with 0 elements.

### Best-case partitioning

In the most even possible split, PARTITION produces two subproblems, each of size no more than n/2, since one is of size |n/2| and one of size |n/2|-1.

### Balanced partitioning

The average-case running time is much closer to the best case.

When we run quicksort on a random input array, the partitioning is highly unlikely to happen in the same way at every level. We expect that some of the splits will be reasonably well balanced an some will be fairly unbalanced.

In the average case, PARTITION produces a mix of "good" and "bad" splits, which are distributed randomly throughout the recursion tree.

## Randomized version

We cannot always expect that permutations of input numbers are equally likely.

We could use __random sampling__, instead of always using `A[r]` as the pivot, we will select a randomly chosen element for the subarray `A[p..r]`. We do so by first exchanging the element `A[r]` with the randomly chosen element.

By randomly sampling the range `p,...,r` we ensure that the pivot element `x = A[r]` is equally likely to be any of the r-p+1 elements in the subarray, and we can expect the split of the input array to be reasonably well balanced on average.

```
RANDOMIZED-PARTITION(A,p,r):
  i = RANDOM(p, r)
  exchange A[r] with A[i]
  return PATITION(A, p, r)
```
