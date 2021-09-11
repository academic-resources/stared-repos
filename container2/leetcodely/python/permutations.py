"""Created by sgoswami on 8/8/17."""
"""Given a collection of distinct numbers, return all possible permutations."""


class Solution(object):
    def permute(self, nums):
        """
        :type nums: List[int]
        :rtype: List[List[int]]
        """
        result = []
        self.helper(nums, 0, result)
        return result

    def helper(self, nums, start, results):
        if start == len(nums):
            results.append(nums[:])
            return
        for i in range(start, len(nums)):
            nums[i], nums[start] = nums[start], nums[i]
            self.helper(nums, start+1, results)
            nums[i], nums[start] = nums[start], nums[i]


if __name__ == '__main__':
    solution = Solution()
    print(solution.permute([1, 2, 3]))
