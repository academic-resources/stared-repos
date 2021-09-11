"""Given an array of n integers nums and a target, find the number of index triplets i, j, k with
0 <= i < j < k < n that satisfy the condition nums[i] + nums[j] + nums[k] < target."""


class Solution(object):
    def threeSumSmaller(self, nums, target):
        """
        :type nums: List[int]
        :type target: int
        :rtype: int
        """
        if not nums or len(nums) < 3:
            return 0
        nums = sorted(nums)
        count = 0
        for i in range(len(nums)):
            l, h = i + 1, len(nums) - 1
            while l < h:
                if (nums[i] + nums[l] + nums[h]) >= target:
                    h -= 1
                else:
                    count += h - l
                    l += 1
        return count


if __name__ == '__main__':
    solution = Solution()
    print(solution.threeSumSmaller([0, 0, 0], 0))
