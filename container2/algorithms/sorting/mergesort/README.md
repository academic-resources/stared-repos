# Merge Sort - O(n log n)

Merge sort algorithm closely follows the divide-and-conquer paradigm.

1. Divide: the n-element sequence to be sorted into two subsequences of n/2 elements each.

2. Conquer: Sort the two subsequences recursively using merge sort.

3. Combine: Merge the two sorted subsequences to produce the sorted answer.

The recursion "bottoms out" when the sequence to be sorted has length 1. The key operation is the merging of two sorted sequences in the "combine" step.

## Characteristics

* In Place
* Worst Time O(n log n)
* Worst Space O(n)

## Pseudocode

```
MERGE(A, p, q, r):
  n1 = q - p + 1
  n2 = r - q
  let L[1..n1 + 1] and R[1..n2 + 1] be new arrays
  for i = 1 to n1:
    L[i] = A[p + i - 1]
  for j = 1 to n2:
    R[j] = A[q + j]
  L[n1 + 1] = infinity
  L[n2 + 1] = infinity
  i = 1
  j = 1
  for k = p to r
    if L[i] <= R[j]:
      A[k] = L[i]
      i = i + 1
    else:
      A[k] = R[j]
      j = j + 1

MERGE-SORT(A, p, r):
  if p < r:
    q = |(p+r)/2|
    MERGE-SORT(A, p, q)
    MERGE-SORT(A, q+1, r)
    MERGE(A, p, q, r)

// To sort the entire sequence A = [A[1], A[2], ..., A[n]],
// we make the initial call MERGE-SORT(A, 1, A.length)
```
