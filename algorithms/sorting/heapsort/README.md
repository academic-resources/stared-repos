# Heapsort

* Worst-case Running time O(n lg n)
* Sorts __in-place__

Heapsort introduces an algorithm design technique, using a data structure, in this case a Heap, to manage information.

## Algorithm

The heapsort algorithm starts by using BUILD-MAX-HEAP to build a max-heap on the input array A[1..n]. Since the maximum element of the arrray is stored at the root A[1], we can put it into its correct final position by exchanging it with A[n].

If we now discard node `n` from the heap, byh decrementing `A.heap-size`, we observe that the children of the root remain max-heaps, but the new root elemnet might violate the max-heap property. All we need to do to __restore the max-heap property__, is call MAX-HEAPIFY(A,1), which leaves a max-heap in A[1..n-1]. The heapsort algorithm then repeats this process for the max-heap of size n-1 down to a heap of size 2.

```
HEAPSORT(A)
  BUILD_MAX_HEAP(A)
  for i = A.length downto 2
    exchange A[1] with A[i]
    A.heap-size = A.heap-size - 1
    MAX-HEAPIFY(A, 1)
```
