'''
Input: a List of integers
Returns: a List of integers
'''
# Write a function that:
def moving_zeroes(arr):
    # takes an array of integers
    arr.sort(reverse=True)
    try:
        # moves each non-zero integer to the left side of the array
        for x in range(0, len(arr)):
            item = arr[x]
            if item == 0:
                del arr[x]
                arr.append(item)
            else:
                pass
        for x in range(0, len(arr)):
            item = arr[x]
            if item == 0:
                del arr[x]
                arr.append(item)
            else:
                pass
        # returns the altered array.
        return arr
    except ValueError: return arr


if __name__ == '__main__':
    # Use the main function here to test out your implementation
    arr = [0, 3, 1, 0, -2]

    print(f"The resulting of moving_zeroes is: {moving_zeroes(arr)}")
