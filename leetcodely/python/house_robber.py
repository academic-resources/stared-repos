"""Created by sgoswami on 8/8/17."""
"""You are a professional robber planning to rob houses along a street. Each house has a certain amount of money 
stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security system 
connected and it will automatically contact the police if two adjacent houses were broken into on the same night.

Given a list of non-negative integers representing the amount of money of each house, determine the maximum amount 
of money you can rob tonight without alerting the police."""


class Solution(object):
    def rob(self, nums):
        """
        :type nums: List[int]
        :rtype: int
        """
        if not nums or len(nums) == 0:
            return 0
        memo = [0 for _ in range(len(nums) + 1)]
        memo[0] = 0
        memo[1] = nums[0]
        for i in range(2, len(memo)):
            memo[i] = max(memo[i-1], memo[i-2] + nums[i - 1])
        return memo[-1]


if __name__ == '__main__':
    solution = Solution()
    print(solution.rob([2, 1, 1, 2]))
