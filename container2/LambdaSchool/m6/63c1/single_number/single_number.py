'''
Input: a List of integers where every int except one shows up twice
Returns: an integer
'''
def single_number(arr):
    # return the single number; all others appear twice

    # FIRST:  sort array
    arr.sort()
    # SECOND:  loop through each item in array
    for x in range(0, len(arr), 2):
        # THIRD:  if item found again, pass
        if arr[x] == arr[x+1]:
            x+=1
            pass
        # FOURTH:  else return item
        else:
            return arr[x]


if __name__ == '__main__':
    # Use the main function to test your implementation
    arr = [1, 1, 4, 4, 5, 5, 3, 3, 9, 0, 0]

    print(f"The odd-number-out is {single_number(arr)}")
