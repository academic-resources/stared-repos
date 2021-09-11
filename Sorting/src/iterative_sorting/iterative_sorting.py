# TO-DO: Complete the selection_sort() function below 
def selection_sort( arr ):
    # loop through n-1 elements
    for i in range(0, len(arr) - 1):
        smallest_index = i

        # TO-DO: find next smallest element
        # (hint, can do in 3 loc) 
        for j in range(i+1, len(arr)):
            if arr[j] < arr[smallest_index]:
                smallest_index = j

        # TO-DO: swap
        arr[i], arr[smallest_index] = arr[smallest_index], arr[i]

    return arr

# TO-DO:  implement the Bubble Sort function below
def bubble_sort( arr ):

    # Compare two and swap if a > b
    for i in range(0, len(arr)-1):
        for j in range(i+1, len(arr)):
            if arr[i] > arr[j]:
                arr[i], arr[j] = arr[j], arr[i]

    return arr

# STRETCH: implement the Count Sort function below
def count_sort( arr, maximum=-1 ):
    hash_length = 0

    for i in range(0, len(arr)):
        # If any negative numbers, returns error
        if arr[i] < 0:
            return "Error, negative numbers not allowed in Count Sort"
        # Find highest number in arr
        if arr[i] > hash_length:
            hash_length = arr[i]
        
    # Create hash table with maximum arr values as keys, set to 0
    hash = { i: 0 for i in range(0, hash_length+1)}

    # In hash, increase count of each instance of i in arr
    for i in range(0, len(arr)):
        hash[arr[i]] += 1
    
    # Adds two instance totals to find indices of each element in arr
    for i in range(1, len(hash)):
        hash[i] = hash[i] + hash[i-1]
    
    sorted_arr = [None] * len(arr)
    for i in range(0, len(arr)):
        # Places arr[i] instance into correct index of sorted_arr
        sorted_arr[hash[arr[i]]-1] = arr[i]
        # Decreases i's index in hash
        hash[arr[i]] = hash[arr[i]]-1

    return sorted_arr

