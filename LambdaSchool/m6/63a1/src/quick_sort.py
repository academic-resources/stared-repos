# Divide and conquer
​
# when writing a recursive algorithm
# 1. what's our base/terminating case(s)?
# 2. if we aren't in the base case, how are moving towards the base case(s)?
​
# def partition(data):
#     # pick the first element in data as our pivot
#     pivot = data[0]
#     left = []
#     right = []
​
#     for x in data[1:]:
#         if x <= pivot:
#             left.append(x)
#         else:
#             right.append(x)
​
#     return left, pivot, right
​
# def quicksort(data):
#     # base case
#     if len(data) == 0:
#         return data
​
#     left, pivot, right = partition(data)
​
#     return quicksort(left) + [pivot] + quicksort(right)
​
#


def ip_partition(data, start, end):
    # pick the first element in data as our pivot
    pivot = data[start]


​
i = start + 1
j = start + 1

# partitioning step to move elements around the pivot
while j <= end:
        if data[j] <= pivot:
            data[j], data[i] = data[i], data[j]
            i += 1
        j += 1
​
data[start], data[i - 1] = data[i - 1], data[start]
# return the index of the pivot
return i - 1
​


def ip_quicksort(data, start=0, end=None):
    if end is None:
        end = len(data) - 1


​
# base case
# if len(data) == 0:
if start >= end:
        return
​
# returns the index of the pivot
# and partitions the data around the pivot
index = ip_partition(data, start, end)
​
# qs call for everything to the left of the pivot
ip_quicksort(data, start, index - 1)
# qs call for everything to the right of the pivot
ip_quicksort(data, in
