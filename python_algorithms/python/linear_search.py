# Linear Search aka Simple Search will just iterate through an entire list in order until it finds what it's looking for.  If it doesn't, it will return -1
# 1. Check first element of the list
# 2. If not the target, increment and continue
# 3. So and and so forth
# 4. If nothing is found, return -1 (not found)
# --- Big O: O(n) ---
# --- Visualization: https://www.cs.usfca.edu/~galles/visualization/Search.html ---


def linear_search(array, target):
    # Let's start looping through the array from beginning to end
    for i in range(len(array)):
        if array[i] == target:
            return i

    return -1


array = [1, 2, 5, 10, 15, 30, 60, 100]
target = 15

print(linear_search(array, target))
