""" The selection sort improves on the bubble sort by making only
one exchange through every pass through the list.

A selection sort looks for the largest value as it makes a pass
and, after completing the pass, places it in the proper location.

After the first pass, the largest item is in the correct place.
After the second, the next largest is in the correct places and
so forth.

Time complexity: O(n ^ 2)
Space complexity: O(1)
"""


from typing import List


def selection_sort(arr: List[int]) -> List[int]:

    # Move backwards through the array
    for i in range(len(arr) - 1, 0, -1):
        position_of_max = 0  # Initialize the max value's position to 0

        # Find the position of the highest number
        for j in range(1, i + 1):
            if arr[j] > arr[position_of_max]:
                position_of_max = j

        # Swap the current index with the index of the highest value found
        temp = arr[i]
        arr[i] = arr[position_of_max]
        arr[position_of_max] = temp

    return arr
