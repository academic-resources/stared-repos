from typing import List

"""
===============
Largest Continuous Sum
===============

Find the largest continuous sum within an array
"""


def largest_continuous_sum(arr: List[int]) -> int:

    # Check to see if array is length 0
    if len(arr) == 0:
        return 0

    # Max sum, current sum are equal to first element
    max_sum = current_sum = arr[0]

    # Iterate through each number of the array, skipping the first element
    for number in arr[1:]:
        # Check to see which is larger, the current sum and
        # the number or just the number
        current_sum = max(current_sum + number, number)

        max_sum = max(current_sum, max_sum)

    return max_sum
