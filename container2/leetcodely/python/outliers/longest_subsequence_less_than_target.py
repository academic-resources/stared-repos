"""Find the length of longest contiguous subsequence in an array which has a sum less than or equal to a given target
Ex- 1:
arr = [8, 3, 7, 4, 1, 6, 5],  target = 16
In this case the answer is 4
3, 7, 4, 1 and  4, 1, 6, 5 both satisfy the condition and both are 4 elements long.

"""


def longest_subsequence(arr, target):
    total, max_length = 0, 0
    j = 0
    for i in range(len(arr)):
        total += arr[i]
        while total > target:
            total -= arr[j]
            j += 1
        max_length = max(i - j + 1, max_length)
    return max_length

print(longest_subsequence([8, 3, 7, 4, 1, 6, 5], 16))
