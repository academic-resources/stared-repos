# Sorting

## Why Sorting?

Sorting is considered to be the most fundamental problem in the study of algorithms.

- Sometimes an applicant inherently needs to sort information. For example, in order to prepare customer statements, banks needs to sort checks by check number.

- Algorithms often use sorting as a key subroutine. For example, a program than renders graphical objects which are layered on top of each other, might hve to sort the objects according to an "above" relation so that it can draw these objects from bottom to top.

- We can draw from among a wide variety of sorting algortihms, and they employ a rich set of techniques. In fact, many important techniques used throughout algorithm design appear in the body of sorting algorithms that have been developed over the years. In this way, sorting is also a problem of historical interest.

- We can prove a nontrivial lower bound for sorting. Our best upper bounds match the lower bound asymptotically, and so we know that our sorting algorithms are asymptotically optimal. Moreover, we can use the lower bound for sorting to prove lower bounds for certain other problems.

- Many engineering issues come to the fore when implementing sorting algorithms. The fastest sorting program for a particular situation may depend on many factors, such as prior knowledge about the keys and satellite data, the memory hierarchy of the host computer, and the software environment. Many of these issues are best dealth with at athe algorithmic level, rather than by "tweaking" the code.

## Comparison Sorts

**Insertion, merge, heap and quicksort**, are all comparison sorts: they **determine the sorted order of an input array by comparing elements**.

### Worst-case time is Gamma(n lg n)

By using a **decision-tree model**, we prove a lower bound of **Gamma(n lg n)** on the worst-case running time of any comparison sort on n inputs, thus showing that heapsort and mergesort are asymptotically optimal comparison sorts.

## Other type of sorts

We can beat the lower bound of Gamma(n lg n) if we can gather information about the sorted order of the input by means other than comparing elements. The **Counting Sort** algorithm, for example, assumes that the input numbers are in the set {0, 1, ...k}. By using array indexing as a tool for determining relative order, counting sort can sort n numbers in **Theta(k + n)** time. Thus, when k = O(n), counting sort runs in time that is linear in the size of the input array.

A related algorithm, **Radix Sort**, can be used to extend the range of Counting Sort. If there are `n` integers to sort, each integer has `d` _digits_, and each digit can take on up to `k` _possible values_, then Radix Sort can sort the numbers in **Theta(d(n+k))**. When `d` is a constant, and `k` is O(n), radix sort runs in linear time.

A third algorithm, **Bucket Sort**, requires knowledge of the probabilistic distribution of numbers in the input array. It can sort `n` real numbers uniformly distributed in the half-open interval [0, 1) in average-case (n) time.

## In-Place sorting

A sorting algorithm sorts **in-place** if only a constant number of elements of the input array are ever stored outside the array.

## Stable sort

Stable sorting algorithms **maintain the relative order of records with equal keys**.

That is, a sorting algorithm is stable if whenever there are two records `R` and `S` with the same key and with `R` appearing before `S` in the original list, `R` will appear before `S` in the sorted list.

## Sorting in linear time

We need to make asumptions about the input instead of using only comparisons.
