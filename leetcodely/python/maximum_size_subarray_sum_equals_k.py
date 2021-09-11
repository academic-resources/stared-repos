"""Created by sgoswami on 3/8/17 as part of leetcode"""
"""Given an array nums and a target value k, find the maximum length of a subarray that sums to k.
If there isn't one, return 0 instead."""
import sys

class Solution(object):
    def maxSubArrayLen(self, nums, k):
        """
        :type nums: List[int]
        :type k: int
        :rtype: int
        """
        total = nums[0]
        cumulative_sum = [0 for _ in range(len(nums))]
        cumulative_sum[0] = nums[0]
        for i in range(1, len(nums)):
            total += cumulative_sum[i]
            cumulative_sum[i] = total

        i, j = 0, len(nums)-1
        while i < j:
            curr = nums[j] - nums[i]
            if curr < k:
                i += 1
            elif curr > k:
                j -= 1
            else:
                return j - i + 1
        return 0


solution = Solution()
print(solution.maxSubArrayLen([-2, -1, 2, 1], 1))
print(solution.maxSubArrayLen([1, -1, 5, -2, 3], 3))
