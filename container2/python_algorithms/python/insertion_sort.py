# Insertion sort is an in-place comparison-based sorting algorithm.  A sorted sub-list is maintained (It is still in the same array)
# --- Big O: O(n²)
# --- Visualization: https://www.hackerearth.com/practice/algorithms/sorting/insertion-sort/visualize/ ---


def insertion_sort(array):
    # Traverse through 1 to length of array
    for i in range(1, len(array)):
        # print(f'Sorting array {array}')
        # print(f'i = {i}')
        key = array[i]
        # print(f'key = {key}')
        # Set j to the item before the key
        j = i - 1
        # print(f'j = {j}')
        # While j is greater than or equal to 0 and is larger than our key...
        while j >= 0 and key < array[j]:
            # print(
            # f'Moving value {array[j + 1]} from spot {j + 1} to {j} and decrementing {j}'
            # )
            array[j + 1] = array[j]
            j -= 1
        # print(f'Setting array index {j + 1} to be the key: {key}')
        array[j + 1] = key


array = [10, 0, 8]
print(f'Sorting array {array}')
insertion_sort(array)
print(array)
