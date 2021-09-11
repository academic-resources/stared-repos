""" Given a sorted integer array where the range of elements are in the inclusive range [lower, upper],
return its missing ranges.
For example, given [0, 1, 3, 50, 75], lower = 0 and upper = 99, return ["2", "4->49", "51->74", "76->99"]. """


class Solution(object):
    def findMissingRanges(self, nums, lower, upper):
        """
        :type nums: List[int]
        :type lower: int
        :type upper: int
        :rtype: List[str]
        """
        if len(nums) == 0:
            return [str(Range(lower, upper))]
        res = []
        curr = lower
        for i in range(len(nums)):
            if nums[i] > curr:
                res.append(Range(curr, nums[i] - 1))
            curr = nums[i] + 1
        if upper > nums[-1]:
            res.append(Range(curr, upper))
        return [str(v) for i, v in enumerate(res)]


class Range:
    def __init__(self, lower=None, upper=None):
        self.lower = lower
        self.upper = upper

    def __str__(self):
        if self.lower and not self.upper or self.lower == self.upper:
            return str(self.lower)
        else:
            return ''.join([str(self.lower), '->', str(self.upper)])


if __name__ == '__main__':
    solution = Solution()
    print(solution.findMissingRanges([], 1, 1))