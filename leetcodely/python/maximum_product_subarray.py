"""Created by sgoswami on 8/9/17."""
"""Find the contiguous subarray within an array (containing at least one number) which has the largest product.
For example, given the array [2,3,-2,4],
the contiguous subarray [2,3] has the largest product = 6."""
import sys


class Solution(object):
    def maxProduct(self, nums):
        """
        :type nums: List[int]
        :rtype: int
        """
        max_prod = min_prod = overall = nums[0]
        for i in range(1, len(nums)):
            if nums[i] < 0:
                max_prod, min_prod = min_prod, max_prod
            max_prod = max(nums[i], max_prod*nums[i])
            min_prod = min(nums[i], min_prod*nums[i])
            overall = max(overall, max_prod)
        return overall
    

if __name__ == '__main__':
    solution = Solution()
    print(solution.maxProduct([-2]))

