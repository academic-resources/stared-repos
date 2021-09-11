# Binary Search checks the middle element of an ordered list, and figures out if it's either on the target element, before the target element, or after the target element.  This approach will cut the list in half every time, drastically shortening the steps needed to find something

# 1. Compare target with the middle element of the list
# 2. If the middle element matches the target, return it's index
# 3. Else if the middle element is greater than the target, search everything under the middle index
# 4. Else if the middle element is less than the target, search everything above the middle index
# 5. Else if none of those match, return -1 (not found)
# --- Big O: O(log n) ---
# --- Visualization: https://www.cs.usfca.edu/~galles/visualization/Search.html ---


# array = list we're searching through, like a phone book.
def binary_search(array, low, high, target):

    # Base Case
    if high >= low:
        # // - Integer Division
        mid = (high + low) // 2

        # Is the middle element our target?
        if array[mid] == target:
            return mid

        # If the element is smaller than mid, we can etargetclude the latter half of our input list
        elif array[mid] > target:
            # Do a recursive binary_search on the lower half of the inputs
            return binary_search(array, low, mid - 1, target)

        # If none of the above is true, then we check the latter half of our input list
        else:
            return binary_search(array, mid + 1, high, target)

    else:
        return -1


def binary_search_iterative(array, target):
    low = 0
    high = len(array) - 1
    mid = 0

    while low <= high:
        mid = (high + low) // 2

        if array[mid] < target:
            # If target is greater than what we're checking, set the low to one above this
            low = mid + 1

        elif array[mid] > target:
            high = mid - 1

        else:
            return mid

    return -1


array = [2, 3, 6, 9, 10, 20, 50, 90]
target = 3

print(binary_search(array, 0, len(array) - 1, target))
print(binary_search_iterative(array, 20))
