import sys

class Solution(object):
    def maxCoins(self, nums):
        """
        :type nums: List[int]
        :rtype: int
        """


    def helper(self, nums, max_list):
        
        curr_max, idx = -sys.maxsize, -1
        for i in range(len(nums) - 2):
            p = nums[i] * nums[i+1] * nums[i+2]
            if p > curr_max:
                curr_max, idx = p, i+1
        max_list.append(curr_max)
        n = nums[:idx] + nums[idx:]
        self.helper(n, max_list)

