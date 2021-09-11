# -------------------------------------------------------------------------------------- #
# The selection sort algorithm sorts an array by repeatedly finding the minimum element (considering ascending order) from unsorted part and putting it at the beginning. The algorithm maintains two subarrays in a given array.

#     1) The subarray which is already sorted.
#     2) Remaining subarray which is unsorted.

# In every iteration of selection sort, the minimum element (considering ascending order) from the unsorted subarray is picked and moved to the sorted subarray.
# --- Big O: O(n²) ---
# --- Visualization: http://www.cs.armstrong.edu/liang/animation/web/SelectionSort.html ---
# -------------------------------------------------------------------------------------- #


def selection_sort_max(array):
    # Loop through entire array
    for i in range(len(array)):
        # Find the maximum element in remaining unsorted array
        max_index = i
        for j in range(i + 1, len(array)):
            if array[max_index] < array[j]:
                max_index = j

        array[i], array[max_index] = array[max_index], array[i]


def selection_sort(array):
    # Loop through the entire array
    for i in range(len(array)):
        #  Find the minimum element in remaining unsorted array
        min_index = i
        # print(f'min_index: {min_index}')
        for j in range(i + 1, len(array)):
            if array[min_index] > array[j]:
                # print(f'{array[min_index]} > {array[j]}, swapping')
                min_index = j

        # Swap the found minimum element with the first element
        array[i], array[min_index] = array[min_index], array[i]


array = [10, 1, 5, 50, 9, 12, 15, 30]
small_array = [10, 5, 14, 3]

print(array)
selection_sort_max(array)
print(array)
