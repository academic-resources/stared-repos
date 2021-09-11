""" The bubble sort makes multiple passes through a list.
It compares adjacent elements and exchanges those that are out of
order.

Each pass through the list places the next largest value in its
proper place.

Each item "bubbles" up to the location where it belongs.

Time complexity: O(n ^ 2)
Space complexity: O(1)
"""


from typing import List


def bubble_sort(arr: List[int]) -> List[int]:
    # Go backwards through the array, starting from the second to last
    # element
    for n in range(len(arr) - 1, 0, -1):
        for k in range(n):
            # If arr[k] is greater than arr[k + 1], swap
            # the values
            if arr[k] > arr[k + 1]:
                temp = arr[k]  # Temporarily store arr[k]
                arr[k] = arr[k + 1]  # Swap arr[k] with arr[k + 1]
                arr[k + 1] = temp  # Change arr[k + 1] to the value of temp

    return arr
