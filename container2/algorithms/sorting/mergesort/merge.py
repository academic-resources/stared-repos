def merge_sort(A):
  merge_sort_aux(A, 0, len(A))

def merge_sort_aux(A, low, high):
  if low < high:
    mid = (low+high)//2
    merge_sort_aux(A, low, mid)
    merge_sort_aux(A, mid+1, high)
    merge(A, low, mid, high)

def merge(A, low, mid, high):
  # Merge ascendantly
  L = A[low:mid+1]
  R = A[mid+1:high+1]
  i = j = 0
  k = low
  
  while (i < len(L) and j < len(R)):
    if (L[i] <= R[j]):
      A[k] = L[i]
      i += 1
      k += 1
    else:
      A[k] = R[j]
      j += 1
      k += 1

  while (i < len(L)):
    A[k] = L[i]
    i += 1
    k += 1
  
  while (j < len(R)):
    A[k] = R[j]
    j += 1
    k += 1