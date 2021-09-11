from typing import List


def sequential_search(arr: List[int], element: int) -> bool:
    """ Does not assume input array is sorted """
    position = 0

    while position < len(arr):
        if arr[position] == element:
            return True
        else:
            position += 1

    return False


def ordered_sequential_search(arr: List[int], element: int) -> bool:
    """ Assumes input array is sorted """
    position = 0

    while position < len(arr):
        if arr[position] == element:
            return True
        else:
            if arr[position] > element:
                return False
            else:
                position += 1

    return False
