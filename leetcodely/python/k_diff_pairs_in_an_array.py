"""Created by sgoswami on 8/7/17."""
"""Given an array of integers and an integer k, you need to find the number of unique k-diff pairs in the array.
 Here a k-diff pair is defined as an integer pair (i, j), where i and j are both numbers in the array and their 
 absolute difference is k."""


class Pair:
    def __init__(self, first, second):
        self.first = first
        self.second = second

    def __eq__(self, other):
        return (self.first == other.first and self.second == other.second) or (self.first == other.second and self.second == other.first)

    def __hash__(self):
        return hash((self.first, self.second))


class Solution(object):
    def findPairs(self, nums, k):
        """
        :type nums: List[int]
        :type k: int
        :rtype: int
        """
        res = set()
        for i in range(len(nums)):
            for j in range(i, len(nums)):
                if nums[j] - nums[i] == k:
                    res.add(Pair(nums[i], nums[i-1]))
        return len(res)


if __name__ == '__main__':
    solution = Solution()
    print(solution.findPairs([3, 1, 4, 1, 5], 2))
