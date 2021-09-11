# Counting Sort

Counting sort assumes that each of the n input elements is an integer in the range 0 to k, for some integer k.

When k = O(n), the sort runs in Theta(n) time.

Counting sort determines, for each input element x, the number of element less than x. It uses this information to place element x directly into its position in the output array.

## Implementation

We assume that the input is an array `A[1..n]`, and we require two other arrays: the array `B[1..n]` holds the sorted output, and the array `C[0..k]` provides temporary working storage.

```
COUNTING-SORT(A,B,k):
  let C[0..k] be a new array
    // Initialize temporary storage array
    for i = 0 to k
      C[i] = 0
    // Count elements
    for j = 1 to A.length
      C[A[j]] = C[A[j]] + 1
    // C[i] will contain the number of elements less than or equal to i
    for i = 1 to k
      C[i] = C[i] + C[i-1]
    for j = A.length downto 1
      B[C[A[j]]] = A[j] // sorted output
      C[A[j]] = C[A[j]] - 1
```
