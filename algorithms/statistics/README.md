# Medians & Order Statistic

The **ith order statistic** of a set of ne lements is the **ith smallest element**. For example, the **minimum** of a set of elements is the first order statistic (i = 1).

A **median**, informally, is the "halfway point" of the set. Where n is odd, the median is unique, occurring at `i = (n+1)/2`. When n is even, there are two medians, for convenience, we consistenly refer to the lower median.

## The selection problem O(n)

We address the problem of selecting the **ith order statistic** from a set of n distinct numbers, which we can solve in **O(n lg n)** time, since we can sort the numbers using heapsort or merge sort, and then simply index the ith element in the output array. We can do this faster.
