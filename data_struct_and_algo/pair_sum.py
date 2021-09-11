# Input: arr[] = {11, 15, 26, 38, 9, 10}, x = 35
# Output: true
# There is a pair (26, 9) with sum 35

# Input: arr[] = {11, 15, 26, 38, 9, 10}, x = 45
# Output: false
# There is no pair with sum 45.

# Input: arr[] = {11, 15, 6, 8, 9, 10}, x = 16
# Output: true
# There is a pair (6, 10) with sum 16


def sum_pair(arr, l, num):
    for j in range(0, l + 1):
        for i in range(0, l + 1):
            temp = arr[j]
            if temp != arr[i]:
                sum = arr[i] + temp
                if sum == num:
                    return True, sum, arr[i], temp
                    break
                else:
                    pass
            else:
                pass


arr = [11, 15, 6, 8, 9, 10]
result = sum_pair(arr, len(arr) - 1, 16)
print(result)
