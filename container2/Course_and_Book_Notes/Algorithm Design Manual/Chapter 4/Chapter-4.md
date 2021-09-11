## Chapter 4: Sorting and Searching

### Applications of Sorting:

- _Searching_: Binary search tests whether an item is in a dictionary in O(log n) time given keys are sorted.
- _Closest pair_: Once numbers are sorted, closest pair of numbers have to be next to each other in sorted order, so a linear search completes job.
- _Element uniqueness_: Similar to closest-pair, checking to see in linear time (after sorting) if two values are the same.
- _Frequency distribution_: If items are sorted, can sweep from left to right to count them. To find how many times _k_ occurs, look up _k_ using binary search in a sorted array of keys - can find the count in O(log n + c) time where _c_ is the number of occurrence of _k_
- _Selection_: what is the _kth_ largest item in the array could be found in constant time if sorted by looking at the _kth_ position

**Take Home**: Sorting lies at the heart of many algorithms. Sorting the data is one of the first things cany algorithm designer should try in the quest of efficiency.

### Stop and Think: Finding the Intersection:

_Problem_: Given an efficient algorithm to determine whether two sets (of size m and n respectfully) are disjoint, analyze the worst-case complexity in terms of m and n considering the case where m is substantially smaller than n.

_Solution_:

- _Sort the big set_ - this can be done in O(n log n) time. Then do binary search with each m element in the small set to see if it exists in the big one -> O((n+m) log n)
- _Sort the small set_ - this can be done in O(m log m) time. Then do binary search with each n element in big set to see if it 4exists in the smnall set -> O((n + m) log m)
- _Sort both sets_ - when both are sorted, no need for binary search, can just compare smallest elements, discard smaller one if not identical, and repeat - O(n log n + m log m + n + m)

- Sorting the smallest set is the best option of these. Note: Expected linear time can be achieved by hashing and verifying that collisions in the same bucket are identical elements.

### Pragmatics of Sorting

- Increasing or decreasing order?
- Sorting just the key or the entire record - need to specify which field is the key in any complex record and understand the full extent of each record.
- What to do with equal keys? Sometimes relative order matters - may need a secondary key to resolve ties. Sometimes it is required to leave items in the same relative order as in the original permutation. Sorting algorithms that automatically enforce that requirement are called _stable_.
- What about non-numerical data? Alphabetizing is the sorting of text strings - libraries have very complete and complicated rules concerning the relative collating sequence of characters and punctuation.

The way to specify such matters to your sorting algorithm is with an application-specific pairwise-element comparison function. By abstracting the pairwise ordering decision to such a comparison function, we can implement sorting independently of such criteria.

```
#include <stdlib.h>

void qsort(void *base, size_t nel, size_t width, int(* compare) (const void*, const void*));
```

Qsort sorts the first nel elements of an array (pointed to by base) where each element is width-bytes long. The order is determined by the compare function which takes pointers to two width-byte elements and returns a negative number if the first belongs before the second, a positive number if the second belongs before the first, and zero if they are the same.

Comparison function to sort integers in increasing order:

```
int intcompare(int *i, int *j) {
    if (*i > *j) return 1
    if (*i < *j) return -1
    return (0)
}
```

This comparison function can be used to sort an array _a_ of which the first _n_ elements are occupied as follows:

```
qsort(a, n, sizeof(int), intcompare);
```

Selection sort is a simple-to-code algorithm that repeatedly extracts the smallest remaining element from the unsorted part of the list.

```
SelectionSort(A)
    For i = 1 to n, do
        Sort[i] = Find-Minimum from A
        Delete-Minimum from A
    Return(Sort)
```

In Chapter 2, we implemented selection sort on an array. We partitioned the input array into sorted and unsorted regions. To find the smallest item, we did a linear sweep through the unsorted portion of the array. Smallest item was swapped with the _ith_ item in the array before moving to the next iteration. Selection sort performs _n_ iterations where average iteration takes n/2 steps for O(n<sup>2</sup>) time.

It takes O(1) time to remove an item from an unsorted array once located, but O(n) time to find smallest. If we replace the data structure with a priority queue(heap or balanced tree), operations take O(log n) time instead of O(n), which speeds selection sort up from O(n<sup>2</sup> to O(n log n).

The name typically given to this algorithm, _heapsort_, obscures the relationship between them, but heapsort is nothing but an implementation of selection sort using the right data structure.

### Heaps

Heaps are a simple and elegant data structure for efficiently supporting the priority queue operations insert and extract-min.

A heap-labeled tree is defined to be a binary tree such that the key labeling of each node dominates the key labeling of each of its children. In a min-heap, the parent dominates its children by having a smaller key than they do, while in a max-heap, the parent nodes dominate by being larger.

You do not need pointers for heaps because you can store data as an array of keys and use the position of keys to implicitly satisfy the role of pointers - root at first element, then left child followed by right child.

```
typedef struct {
    item_type q[PQ_SIZE + 1]; /* body of queue */
    int n; /* number of queue elements */
} priority queue;
```

```
int pq_parent(int n) {
    if (n == 1) return (-1);
    else return ((int)n / 2); /* implicitly take floor (n/2) */
}
```

```
int pq_child(int n) {
    return (2 * n);
}
```

### Stop and Think: Who's Where in the Heap?

_Problem_: How can we efficiently search for a particular key in a heap?
_Solution_: We can't. Binary search does not work because a heap is not a binary search tree. We know next to nothing about relative order of the n/2 leaf elements in a heap - nothing that helps us avoid doing a linear search.

#### Insertion

Insert new element at leftmost open spot in the array. If that element dominates its parent, it is swapped with its parent recursively until order is established.

```
pq_insert(priority_queue *q, item_type x) {
    if (q->n >= PQ_SIZE)
        printf("Warning: priority queue overflow, insert x=%d/n", x);
    else {
        q->n = (q->) + 1;
        q->q[q->n] = x;
        bubble_up(q, q->n);
    }
}
```

```
bubble_up(priority_queue *q, int p) {
    if (pq_parent(p) == -1) return; /* at root of heap, no parent */
    if (q->q[pq_parent(p)] > q->q[p]) {
        pq_swap(q, p, pq_parent(p));
        bubble_up(q, pq, pq_parent(p));
    }
}
```

Swap process takes constant time at each level. Since the height of an _n_-element heap is ⌊lg n⌋, each insertion takes at most O(log n) time, so a heap of _n_ elements can be constructed in O(n log n) time through n insertions.

```
pq_init(priority_queue *q) {
    q->n = 0;
}
```

```
make_heap(priority_queue *q, item_type s[], int n) {
    int i; /* counter */
    pq_init(q);
    for (i = 0; i < n; i++)
        pq_insert(q, s[i]);
}
```

#### Extracting the Minimum

The top of the heap sits at the first position of the array, but removing it leaves a hole. This can be filled by replacing it with the element at the _nth_ position, but heap order may not be correct. If the root is dominated by its children, it is then swapped with the most dominant child and swapping keeps occurring down the heap until no parent is dominated by its children. This is referred to as bubbling down and also heapify (since it merges two heaps - the subtrees below the original root) with a new key.

```
item_type extract_min(priority_queue *q) {
    int min = -1; /* minimum value */
    if (q->n <= 0) printf("Warning: Empty queue.\n");
    else {
        min = q->q[1];
        q->q[1] = q->q[q->n];
        q->n = q->n - 1;
        bubble_down(q, 1);
    }
    return min;
}
```

We reach a leaf after ⌊lg n⌋ bubble_down steps, each in constant time. Root deletion is thus a O(log n) operation.

Exchanging the maximum element with the last element and calling heapify repeatedly gives O(n log n) sorting algorithm called heapsort.

```
bubble_down(priority_queue *q, int p) {
    int c; /* child index */
    int i; /* counter */
    int min_index; /* index of lightest child */
    c = pq_young_child(p);
    min_index = p;
    for (i = 0; i < 1; i++)
        if ((c + i) <= q->n) {
            if (q->q[min_index] > q->q[c+i]) min_index = c+i;
        }
    if (min_index != p) {
        pq_swap(q, p, min_index);
        bubble_down(q, min_index);
    }
}
```

```
heapsort(item_type s[], int n) {
    int i; /* counter */
    priority_queue q; /* heap for heapsort */
    make_heap(&q, s, n);

    for (i = 0; i < n; i++)
        s[i] = extract_min(&q);
}
```

We can create a heap by performing n/2 calls to bubble_down...

```
make_heap(priority_queue *q, item_type s[], int n) {
    int i; /* counter */
    q->n = n;
    for (i = 0; i < n; i++) q->q[i+1] = s[i];
    for (i = q->n/2; i > 1; i--) bubble_down(q, i);
} /* Works in linear time */
```

### Stop and Think: Where in the Heap?

_Problem_: Given an array-based heap on _n_ elements and a real number _x_, efficiently determine whether the _kth_ smallest element is greater than or equal to _x_. Algorithm should be O(k) in the worst-case, independent of the size of the heap. Hint: You do not have to find the _kth_ smallest element, only determine its relationship to _x_.

_Solution_:

Two ideas that lead to correct but inefficient algorithms:

1. Call extract-min _k_ times and test whether all of these sare less than _x_. This explicitly sorts the first _k_ elements, so gives more information than the desired answer but takes O(k log n) time.

2. The _kth_ smallest element cannot be deeper than the _kth_ level of the heap since the path from it to the root must go through elements of decreasing value. Thus we can look at all the elements in the first _k_ levels of the heap and count how many of them are less than _x_, stopping when we find either _k_ of them or run out of elements. This is correct but takes O(min(n, 2<sup>k</sup>)) time since the top _k_ elements have 2<sup>k</sup> elements.

An O(k) solution can look at only _k_ elements smaller than _x_, plus at most O(k) elements greater than _x_. Consider the following recursive function, called at the root with _i = 1_ and _count = k_:

```
int heap_compare(priority_queue *q, int i, int count, int x) {
    if ((count <= 0) || (i > q->n)) return count;
    if (q->q[i] < x) {
        count = heap_compare(q, pq_young_child(i), count-1, x);
        count = heap_compare(q, pq_young_child(i)+1, count, x);
    }
    return count;
}
```

If the root of the min-heap is greater than or equal to _x_, no elements in the heap can be. This searches the children of all nodes smaller than _x_ until it finds _k_ of them and returns 0 or they are exhausted, where it returns a value greater than 0. The only nodes whose children we look at are those less than _x_ and up to _k_ of them. Each node has at most 2 children, so at most _3k_ nodes making this O(k).

### Sort by Incremental Insertion

```
InsertionSort(A)
    A[0] = -∞
    for i = 2 to n, do
        j = i
        while (A[j] < A[j - 1] do
            swap(A[j], A[j-1])
                j = j - 1
```

Although it takes O(n<sup>2</sup>) in worst cast, performs considerably better on data that is almost sorted. Incremental insertion is particularly useful in geometric algorithms.

### Merge Sort

A recursive approach to sorting involves partitioning elements into two groups, sorting recursively, and then interleaving the sorted lists. Base case is when the subarray consists of one element. Because the recursion goes log n deep and a linear amount of work is done per level, merge sort is O(n log n) worst-case.

```
Mergesort (A[1, n])
    Merge( MergeSort(A[1, ⌊n/2⌋), Mergesort(A[⌊n/2⌋ + 1, n]))
    // Pseudocode
```

```
mergesort(item_type s[], int low, int high) {
    int middle; /* index of middle element */
    if (low < high) {
        middle = (low + high)/2;
        mergesort(s, low, middle);
        mergesort(s, middle+1, high);
        merge(s, low, middle, high);
    }
}
```

```
merge(item_type s[], int low, int middle, int high) {
    int i; /* counter */
    queue buffer1, buffer2; /* buffers to hold elements for merging */
    init_queue(&buffer1);
    init_queue(&buffer2);
    for (i = low; i <= middle; i++) enqueue(&buffer1, s[]);
    for (i = middle+1; i <= high; i++) enqueue(&buffer2, s[]);
    i = low;
    while (!(empty_queue(&buffer1) || empty_queue(&buffer2))) {
        if (headq(&buffer1) < headq(&buffer2))
            s[i++] = dequeue(&buffer1);
        else
            s[i++] = dequeue(&buffer2);
    }
    while(!empty_queue(&buffer1)) s[i++] = dequeue(&buffer1);
    while(!empty_queue(&buffer2)) s[i++] = dequeue(&buffer2);
}
```

### Quicksort

Pick random item as pivot, separate other items into two piles, one less than and one greater than pivot. Then sort elements to left and right independently - can use recursive sorting algorithm to use partitioning in each sub problem.

```
quicksort(item_type s[], int l, int h) {
    int p; /* index of partition */
    if (( h - l) > 0) {
        p = partition(s, l, h);
        quicksort(s, l, p-1);
        quicksort(s, p+1, h);
    }
}
```

We can partition the array in one linear scan for a given pivot by maintaining three sections of the array - less than the pivot (to the left of firsthigh), greater than or equal to pivot (between firsthigh and i) and unexplored (to the right of i) as implemented below:

```
int partition(item_type s[], int l, int h) {
    int i; /* counter */
    int p; /* pivot element index */
    int firsthigh; /* divider position for pivot element */
    p = h;
    firsthigh = l;
    for (i = l, i < h; i++)
        if (s[i] < s[p]) {
            swap(&s[i], &s[firsthigh]);
            firsthigh++;
        }
    swap(&s[p], &s[firsthigh]);
    return firsthigh;
}
```

Worst case for quicksort is O(n<sup>2</sup>). Average case O(n log n)

Quicksort runs in O(n log n) time with high probability given randomly ordered data - if selecting specific element.
"Randomized quicksort runs in O(n log n) time on any input with high probability"

_Randomization_ is a powerful tool to improve algorithms with bad worst-case but good avergage-case complexity.

Some approaches to designing efficient randomization algorithms:

- Random sampling: Select random sample of data to study - if random, results should be representative.
- Randomized hashing: Hashing can be used to implement dictionary operations in O(1) expected time, but for any hashing function, there is a worst case set of keys that hash to the same number. If you select a random hash function from a group of good ones - can improve guarantee.
- Randomized search - can be used to drive search techniques such as simulated annealing.

### Stop & Think: The Nuts and Bolts

_Problem_: You are given a collection of _n_ bolts of different widths and _n_ corresponding nuts. You can test whether a given nut and bolt fit together, from which you learn whether the nut is too large, too small, or an exact match for the bolt. The differences in size between pairs of nuts or bolts is too small to see by eye, so you cannot compare the size of two nuts or two bolts directly. You are to match each bolt to each nut.
Give an O(n<sup>2</sup>) algorithm to solve the nuts and bolts problem. Then give a randomized O(n log n) expected time algorithm for the same problem.

_Solution_: Brute force algorithms would mean starting with the first bolt and matching against each nut until a match was found. Worst case, this requires n<sup>2</sup> comparisons altogether - n for each bolt.

Sorting the nuts and bolts by size would yield matches as the _ith_ sized bolt should match the _ith_ sized nut. We can partition the nuts into sizes less than bolt _b_ and greater than _b_. Once we find the matching nut to _b_, we can use it to partition the nuts. In 2n-2 comparisons, we'd partition the nuts and bolts and then can use randomized quicksort.

It is difficult to say which O(n log n) sorting function is faster - implementation details and system quirks like cache performance and memory size might be decisive factors. Experiments show that when a quicksort is implemented well, it is typically 3-4 times faster than mergesort or heapsort, because the operations in the innermost loop are simpler.

### Bucketing

Bucketing is very effective whenever you are confident that the distribution of data is fairly uniform. The idea underlies hash tables, kd-trees, etc.

### Take Home:

Sorting can be used to illustrate most algorithm design paradigms. Data structure techniques, divide-and-conquer, randomization and incremental construction all lead to efficient sorting algorithms.

### Binary Search

Binary search is a fast algorithm for searching in a sorted array of keys _S_. To search for key _q_, we compare _q_ to middle key _S[n/2]_. It _q_ appears before _S[n/2]_ it must reside in the top half of _S_. If not, it must reside in the bottom half of _S_. By repeating this process recursively on the correct half, we can locate the key in ⌈lg n⌉ comparisons.

```
int binary_search(item_type s[], item_type key, int low, int high) {
    int middle; /* index of middle element */
    if (low > high) return -1 /* key not found */
    middle = (low + high) / 2;
    if (s[middle] == key) return middle;
    if (s[middle] > key)
        return binary_search(s, key, low, middle-1));
    else
        return binary_search(s, key, middle+1, high));
}
```

### Take Home:

Binary search and its variants are the quintessential divide and conquer algorithms.

### Divide and Conqueur:

One of the most powerful techniques for solving problems is to break them down into smaller, more easily solved pieces. A recursive algorithms is more apparent when broken into smaller instances of the same type. Effective parallel processing requires decomposing jobs into at least as many tasks as processors. Divide and conquer involves splitting a problem into parts (say halves), solving those parts, and then stitching the parts together to form a full solution.
