"""Created by sgoswami on 9/2/17."""
"""Given a list of non-negative numbers and a target integer k, write a function to check if the array 
has a continuous subarray of size at least 2 that sums up to the multiple of k, that is, sums up to n*k where n is also an integer."""

class Solution(object):
    def checkSubarraySum(self, nums, k):
        """
        :type nums: List[int]
        :type k: int
        :rtype: bool
        """
        memo = [0 for _ in range(len(nums))]
        cumulative_sum = 0
        for i in range(len(nums)):
            cumulative_sum += nums[i]
            memo[i] = cumulative_sum

        i, j = 0, len(memo)-1
        while i < j:
            if memo[j] - memo[i] % k == 0 and j - i >= 2:
                return True

