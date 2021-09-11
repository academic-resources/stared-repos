# Medians & Order Statistic

The __ith order statistic__ of a set of ne lements is the __ith smallest element__. For example, the __minimum__ of a set of elements is the first order statistic (i = 1).

A __median__, informally, is the "halfway point" of the set. Where n is odd, the median is unique, occurring at `i = (n+1)/2`. When n is even, there are two medians, for convenience, we consistenly refer to the lower median.

## The selection problem O(n)

We address the problem of selecting the __ith order statistic__ from a set of n distinct numbers, which we can solve in __O(n lg n)__ time, since we can sort the numbers using heapsort or merge sort, and then simply index the ith element in the output array. We can do this faster.