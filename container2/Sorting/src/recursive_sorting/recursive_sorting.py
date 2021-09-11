import random

# TO-DO: complete the helper function below to merge 2 sorted arrays
def merge( arrA, arrB ):
    elements = len( arrA ) + len( arrB )
    merged_arr = [0] * elements

    # Iterate through marged_arr to insert smallest item in arrA and arrB until merged_arr is full
    for i in range(0, len(merged_arr)):
        # If arrA is empty, use arrB to fill
        if len(arrA) == 0:
            merged_arr[i] = min(arrB)
            arrB.remove(min(arrB))
        
        # If arrB is empty, use arrA to fill
        elif len(arrB) == 0:
            merged_arr[i] = min(arrA)
            arrA.remove(min(arrA))

        # If the smallest item in arrA is smaller than the smallest item in arrB, insert arrA's smallest item and then remove from arrA
        elif min(arrA) < min(arrB):
            merged_arr[i] = min(arrA)
            arrA.remove(min(arrA))

        # If the smallest item in arrB is smaller than the smallest item in arrA, insert arrB's smallest item and then remove from arrB
        elif min(arrA) >= min(arrB):
            merged_arr[i] = min(arrB)
            arrB.remove(min(arrB))
    
    return merged_arr

# TO-DO: implement the Merge Sort function below USING RECURSION
def merge_sort( arr ):
    if len(arr) == 0 or len(arr) == 1:
        return arr
    
    mid_point = round(len(arr)/2)
    arrA = merge_sort(arr[:mid_point])
    arrB = merge_sort(arr[mid_point:])

    return merge(arrA,arrB)

# STRETCH: implement an in-place merge sort algorithm
def merge_in_place(arr, start, mid, end):
    # Updating the pointers
    # Getting past the halfway 
    # Assign a variable to track the index of the other starting point 
    # Decrement

    return arr

def merge_sort_in_place(arr, l, r): 
    # TO-DO

    return arr


# STRETCH: implement the Timsort function below
# hint: check out https://github.com/python/cpython/blob/master/Objects/listsort.txt

def insertion_sort(arr):
    for i in range(1, len(arr)):
        # Starts looping from first unsorted element
        unsorted = arr[i]
        # Starts comparing against last sorted element
        last_sorted_index = i-1

        # While unsorted is less than the last sorted...
        while last_sorted_index >= 0 and unsorted < arr[last_sorted_index]:
            # Shifts last sorted to the right by one
            arr[last_sorted_index + 1] = arr[last_sorted_index]
            # Decrements down the last sorted index, until no longer larger than or hits zero
            last_sorted_index -= 1

        # Places unsorted element into correct spot
        arr[last_sorted_index + 1] = unsorted
    return arr


def timsort( arr ):
    # Divide arr into runs of 32 (or as chosen)
    # If arr size is smaller than run, it will just use insertion sort
    minirun = 32
    for i in range(0, len(arr), minirun):
        counter = 0
        range_start = minirun * counter
        range_end = minirun * (counter+1)
        print(range_start, range_end)
        print(f"i is: {i}")
        print(insertion_sort(arr[range_start:range_end]))
        counter += 1

    # Sort runs using insertion sort
    # Merge arrays using merge sort

    
    # return insertion_sort(arr)

test_sort = random.sample(range(100), 64)
print(timsort(test_sort))