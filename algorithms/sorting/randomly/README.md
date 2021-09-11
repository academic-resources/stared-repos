# Randomly permuting arrays

## Method 1

One common method is to assign each element A[i] of the array a random priority P[i], and then sort the elements of A according to these priorities.

```
PERMUTE-BY-SORTING(A):
  n = A.length
  let P[1..n] be a new array
  for i = 1 to n
    P[i] = RANDOM(1, n^3)
  sort A, using P as sort keys
```

If we use a comparison sort, sorting takes Omega(n lg n) time.

## Method 2

We can permute the given array in place, in O(n) time. In its ith iteration, it chooses the element A[i] randomly from among elements A[i] through A[n].

```
RANDOMIZE-IN-PLACE(A)
  n = A.length
  for i = 1 to n
  swap A[i] with A[RANDOM(i, n)]
```