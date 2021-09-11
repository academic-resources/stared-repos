'''
Input: a List of integers as well as an integer `k` representing the size of the sliding window
Returns: a List of integers
'''

# Given an array of integers, there is a sliding window of size `k` which is moving from the left side of the array to the right, one element at a time.
# You can only interact with the `k` numbers in the window.
# Return an array consisting of the maximum value of each window of elements.

def sliding_window_max(arr, k):
    max_arr = []
    # for each item in array
    for x in range(0, len(arr)-k+1):
        max_value_current_array = arr[x]
        for z in range(x, x+k):
            # get max value of new array
            if arr[z] > max_value_current_array:
                max_value_current_array = arr[z]
        # add that max value to second new array
        max_arr.append(max_value_current_array)
        max_value_current_array = None
    return max_arr

'''

def sliding_window_max(arr, k):
    window_arr = []
    max_arr = []
    # for each item in array

    for x in range(0, len(arr)-k+1):
        max_value_current_array = arr[x]
        for y in range(x, x+k):
            # arr[index of item] to arr[(k-1)] = new array
            window_arr.append(arr[y])
        for z in range(0, len(window_arr)):
            # get max value of new array
            if window_arr[z] > max_value_current_array:
                max_value_current_array = window_arr[z]
        # add that max value to second new array
        max_arr.append(max_value_current_array)
        window_arr.clear()
        max_value_current_array = None
    return max_arr

'''

if __name__ == '__main__':
    # Use the main function here to test out your implementation 
    arr = [1, 3, -1, -3, 5, 3, 6, 7]
    k = 3

    print(f"Output of sliding_window_max function is: {sliding_window_max(arr, k)}")
