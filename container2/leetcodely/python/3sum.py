"""Created by sgoswami on 7/7/17."""
"""Given an array S of n integers, are there elements a, b, c in S such that a + b + c = 0? Find all unique triplets in 
the array which gives the sum of zero."""

class Solution(object):
    def threeSum(self, nums):
        """
        :type nums: List[int]
        :rtype: List[List[int]]
        """
        if len(nums) < 3:
            return []
        if all(n == 0 for n in nums):
                return [[0, 0, 0]]

        sorted_nums = sorted(nums)
        results = set()
        for i, v in enumerate(sorted_nums):
            if i > len(sorted_nums) - 2:
                break
            j, k = i+1, len(sorted_nums) - 1
            while j < k:
                total = sorted_nums[i] + sorted_nums[j] + sorted_nums[k]
                if total == 0:
                    results.add((sorted_nums[i], sorted_nums[j], sorted_nums[k]))
                    j += 1
                    k -= 1
                elif total > 0:
                    k -= 1
                else:
                    j += 1
        return list(results)


if __name__ == '__main__':
    solution = Solution()
    print(solution.threeSum([-1, 0, 1, 2, -1, -4]))

