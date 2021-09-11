"""Created by sgoswami on 8/20/17."""
"""Given an array of integers sorted in ascending order, find the starting and ending position of a given target value.
Your algorithm's runtime complexity must be in the order of O(log n).
If the target is not found in the array, return [-1, -1].

For example,
Given [5, 7, 7, 8, 8, 10] and target value 8,
return [3, 4]"""


class Solution(object):
    def searchRange(self, nums, target):
        def binary_search(item):
            start, end = 0, len(nums) - 1
            while nums[start] < nums[end]:
                mid = start + (end - start)//2
                if item < nums[mid]:
                    end = mid - 1
                elif item > nums[mid]:
                    start = mid + 1
                elif nums[mid] == target:
                    return mid
            return -1
        index = binary_search(target)
        if index == -1:
            return [-1, -1]
        j, k = index, index
        while (j - 1 > 0 and nums[j - 1] == target) or (k + 1 < len(nums) and nums[k + 1] == target):
            if nums[j-1] == target:
                j -= 1
            if nums[k + 1] == target:
                k += 1
        return [j, k]


if __name__ == '__main__':
    solution = Solution()
    print(solution.searchRange([5, 7, 7, 8, 8, 10], 8))
