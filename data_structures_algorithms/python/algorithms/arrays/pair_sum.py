from typing import List

"""
===============
Pair Sum
===============

Given an integer array, output all the unique pairs that add
up to the target sum.

For example:
    pair_sum([1, 3, 2, 2], 4)

Returns 2 pairs:
    (1, 3)
    (2, 2)

Time Complexity: O(n)
"""


def pair_sum(arr: List[int], target_sum: int) -> int:
    # Edge case
    if len(arr) < 2:
        return 0

    # Sets for tracking
    seen = set()
    output = set()

    for number in arr:
        # Find the difference between the target sum and current number
        difference = target_sum - number

        # If the difference isn't in seen, add the current number
        if difference not in seen:
            seen.add(number)
        else:
            # Otherwise, add the paired sum to the output
            output.add((min(number, difference), max(number, difference)))

    return len(output)
