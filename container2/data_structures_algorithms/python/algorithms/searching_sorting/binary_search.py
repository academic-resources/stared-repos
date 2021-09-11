from typing import List


def iterative_binary_search(arr: List[int], element: int) -> bool:
    """ Assumes a sorted array """
    first = 0
    last = len(arr) - 1

    while first <= last:
        # Find the center of the array
        mid = (first + last) / 2

        if arr[mid] == element:
            return True
        else:
            # Choose the lower half of the list
            if element < arr[mid]:
                last = mid - 1
            # Choose the upper half of the list
            else:
                first = mid + 1

    return False


def recursive_binary_search(arr: List[int], element: int) -> bool:
    """ Assumes a sorted array """
    # Base case
    if len(arr) == 0:
        return False

    # Find the center of the array
    mid = len(arr) / 2

    if arr[mid] == element:
        return True
    else:
        if element < arr[mid]:
            # Choose lower half of the list
            return recursive_binary_search(arr[:mid], element)
        else:
            # Choose upper half of the list
            return recursive_binary_search(arr[mid + 1:], element)
