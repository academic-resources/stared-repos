# Input: arr[] = {1, 20, 2, 10}
# Output: 72


def single_rotation(arr, l):
    temp = arr[0]
    for i in range(l - 1):
        arr[i] = arr[i + 1]
    arr[l - 1] = temp


def sum_calculate(arr, l):
    sum = 0
    for i in range(l):
        sum = sum + arr[i] * (i)
    return sum


def max_finder(arr, l):
    max = arr[0]
    for i in range(l):
        if max < arr[i]:
            max = arr[i]
    maximum = max
    for i in range(l):
        if max == arr[i]:
            temp = i
    index = temp + 1

    for j in range(index):
        single_rotation(arr, len(arr))


arr = [10, 1, 2, 3, 4, 5, 6, 7, 8, 9]
max_finder(arr, len(arr))
result = sum_calculate(arr, len(arr))

print("Max sum is: " + str(result))


# optimized approach

# '''Python program to find maximum value of Sum(i*arr[i])'''

# # returns max possible value of Sum(i*arr[i])
# def maxSum(arr):

# 	# stores sum of arr[i]
# 	arrSum = 0

# 	# stores sum of i*arr[i]
# 	currVal = 0

# 	n = len(arr)

# 	for i in range(0, n):
# 		arrSum = arrSum + arr[i]
# 		currVal = currVal + (i*arr[i])

# 	# initialize result
# 	maxVal = currVal

# 	# try all rotations one by one and find the maximum
# 	# rotation sum
# 	for j in range(1, n):
# 		currVal = currVal + arrSum-n*arr[n-j]
# 		if currVal > maxVal:
# 			maxVal = currVal

# 	# return result
# 	return maxVal

# # test maxsum(arr) function
# arr = [10, 1, 2, 3, 4, 5, 6, 7, 8, 9]
# print("Max sum is: ", maxSum(arr))
