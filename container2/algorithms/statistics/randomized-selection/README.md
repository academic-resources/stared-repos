# Randomized Selection

Expected running time of __Theta(n)__ assuming that elements are distinct.

```
RANDOMIZED-SLECT(A, p, r, i)
  if p == r
    return A[p]
  q = RANDOMIZED-PARTITION(A,p,r)
  k = q - p + 1
  if i == k // pivot value is the answer
    return A[q]
  elseif i < k
    return RANDOMIZED-SELECT(A,p,q-1,i)
  else return RANDOMIZED-SELECT(A,q+1, r, i-k)
```
